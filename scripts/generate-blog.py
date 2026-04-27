#!/usr/bin/env python3
"""
Weekly blog generator for standrewsflats.uk
- Reads the market intel report as the data source
- Scans existing posts so it never repeats an audience/angle combo
- Calls Claude to write a fresh, SEO-optimised post
- Writes a Next.js App Router page.tsx into app/blog/<slug>/
- Updates the blog index (app/blog/page.tsx) with the new post entry
"""

import os
import re
import json
import time
import datetime
import anthropic
import requests
from pathlib import Path

# ── Paths ─────────────────────────────────────────────────────────────────────
REPO_ROOT  = Path(__file__).parent.parent
INTEL_FILE = Path(__file__).parent / "market-intel.md"
BLOG_DIR   = REPO_ROOT / "app" / "blog"
IMAGES_DIR = REPO_ROOT / "public" / "images" / "blog"

# ── Content rotation matrix ───────────────────────────────────────────────────
AUDIENCE_ANGLE_MATRIX = [
    ("second-year undergraduates",          "practical how-to guide"),
    ("parents of prospective students",     "rights and legal protections"),
    ("international students",              "cost comparison and budgeting"),
    ("postgraduate students",               "practical how-to guide"),
    ("students considering commuting",      "cost comparison and budgeting"),
    ("second-year undergraduates",          "investigative deep dive"),
    ("parents of prospective students",     "cost comparison and budgeting"),
    ("international students",              "practical how-to guide"),
    ("postgraduate students",               "rights and legal protections"),
    ("students considering commuting",      "rights and legal protections"),
    ("second-year undergraduates",          "rights and legal protections"),
    ("landlords thinking about listing",    "practical how-to guide"),
    ("care-experienced students",           "rights and legal protections"),
    ("students on a tight budget",          "cost comparison and budgeting"),
    ("final-year students",                 "practical how-to guide"),
]

# ── Helpers ───────────────────────────────────────────────────────────────────

def read_intel() -> str:
    if not INTEL_FILE.exists():
        raise FileNotFoundError(
            f"Market intel file not found at {INTEL_FILE}. "
            "Copy your market-intel.md into scripts/market-intel.md"
        )
    return INTEL_FILE.read_text(encoding="utf-8")


def get_existing_posts() -> list[dict]:
    """
    Walk app/blog/ and extract metadata from each page.tsx.
    Generated posts have a BLOG_META comment; manual posts fall back to
    the Next.js metadata export title.
    """
    posts = []
    if not BLOG_DIR.exists():
        return posts

    for tsx_file in sorted(BLOG_DIR.glob("*/page.tsx")):
        slug = tsx_file.parent.name
        content = tsx_file.read_text(encoding="utf-8")

        # Generated posts: read the embedded BLOG_META JSON comment
        match = re.search(r"/\* BLOG_META (\{.*?\}) \*/", content, re.DOTALL)
        if match:
            try:
                meta = json.loads(match.group(1))
                meta["slug"] = slug
                posts.append(meta)
                continue
            except json.JSONDecodeError:
                pass

        # Manual posts: extract title from the Next.js metadata export so
        # Claude knows not to repeat those topics
        title_match = re.search(r'title:\s*["\']([^"\']+?)(?:\s*\||["\'])', content)
        if title_match:
            posts.append({
                "slug": slug,
                "title": title_match.group(1).strip(),
                "audience": "",
                "angle": "",
            })

    return posts


def pick_next_combo(existing_posts: list[dict]) -> tuple[str, str]:
    used = {(p.get("audience", ""), p.get("angle", "")) for p in existing_posts}

    for audience, angle in AUDIENCE_ANGLE_MATRIX:
        if (audience, angle) not in used:
            return audience, angle

    print("All matrix combos used — cycling from the top.")
    return AUDIENCE_ANGLE_MATRIX[len(existing_posts) % len(AUDIENCE_ANGLE_MATRIX)]


def slugify(title: str) -> str:
    title = title.lower()
    title = re.sub(r"[''']", "", title)
    title = re.sub(r"[^a-z0-9]+", "-", title)
    title = title.strip("-")
    return title[:80]


def build_prompt(intel: str, existing_posts: list[dict], audience: str, angle: str) -> str:
    existing_summary = "\n".join(
        f"- \"{p.get('title', p['slug'])}\" (audience: {p.get('audience','?')}, angle: {p.get('angle','?')})"
        for p in existing_posts
    ) or "None yet."

    today = datetime.date.today().strftime("%B %d, %Y")

    return f"""You are a senior content strategist and copywriter for StAndrewsFlats.uk, \
an independent student letting resource for the University of St Andrews, Scotland.

## Your task

Write a complete, publication-ready blog post for the website.

- **Target audience:** {audience}
- **Editorial angle:** {angle}
- **Publication date:** {today}

## Rules

1. Base ALL facts, statistics, and claims strictly on the Market Intelligence Report below. \
Do not invent figures or cite external sources.
2. Write in a confident, authoritative editorial voice — not corporate, not chatty. \
Think long-form journalism meets practical guide.
3. The post must be **1,000–1,400 words** (body text, not counting the title).
4. Optimise naturally for SEO: use the target audience's likely search phrases in the \
H1, at least two H2s, and the opening paragraph. Do not keyword-stuff.
5. End every post with a call to action linking to https://www.standrewsflats.uk
6. Do NOT repeat topics already covered. Posts already published:
{existing_summary}

## Output format

Return ONLY a JSON object — no preamble, no markdown fences — with exactly these keys:

{{
  "title": "Full blog post title",
  "slug": "url-safe-slug-no-spaces",
  "metaDescription": "150–160 character SEO meta description",
  "audience": "{audience}",
  "angle": "{angle}",
  "body": "FULL BLOG POST BODY IN MARKDOWN"
}}

The body must use standard Markdown: ## for H2, ### for H3, **bold**, bullet lists where \
appropriate. Do not include the H1 title in the body — it is rendered separately by the \
page template.

## Market Intelligence Report

{intel}
"""


def generate_post(audience: str, angle: str, intel: str, existing_posts: list[dict]) -> dict:
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

    prompt = build_prompt(intel, existing_posts, audience, angle)

    print(f"Calling Claude API for: [{audience}] / [{angle}]...")

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()

    # Strip accidental markdown fences if the model adds them
    raw = re.sub(r"^```json\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print("ERROR: Claude returned invalid JSON.")
        print("Raw output:", raw[:500])
        raise e

    return data


def escape_tsx(text: str) -> str:
    text = text.replace("\\", "\\\\")
    text = text.replace("`", "\\`")
    text = text.replace("${", "\\${")
    return text


def render_tsx(post: dict, published_date: str, cover_image: str | None = None) -> str:
    meta = json.dumps({
        "title":       post["title"],
        "audience":    post["audience"],
        "angle":       post["angle"],
        "date":        published_date,
        "cover_image": cover_image or "",
    })

    escaped_body = escape_tsx(post["body"])

    title_ts   = post["title"].replace("'", "\\'")
    desc_ts    = post["metaDescription"].replace("'", "\\'")
    title_jsx  = post["title"].replace('"', '\\"')
    slug       = post["slug"]

    og_image_line = (
        f"\n    images: [{{ url: 'https://www.standrewsflats.uk{cover_image}' }}],"
        if cover_image else ""
    )

    cover_image_prop = (
        f'\n      coverImage="{cover_image}"\n      coverImageAlt="{title_jsx}"'
        if cover_image else ""
    )

    return f"""/* BLOG_META {meta} */
import type {{ Metadata }} from 'next'
import BlogPost from '@/components/BlogPost'

export const metadata: Metadata = {{
  title: '{title_ts} | StAndrewsFlats.uk',
  description: '{desc_ts}',
  alternates: {{ canonical: 'https://www.standrewsflats.uk/blog/{slug}' }},
  openGraph: {{
    title: '{title_ts}',
    description: '{desc_ts}',
    url: 'https://www.standrewsflats.uk/blog/{slug}',
    siteName: 'StAndrewsFlats.uk',
    type: 'article',
    publishedTime: '{published_date}',{og_image_line}
  }},
}}

const body = `{escaped_body}`

export default function Page() {{
  return (
    <BlogPost
      title="{title_jsx}"
      date="{published_date}"
      body={{body}}{cover_image_prop}
    />
  )
}}
"""


def _unsplash_query(title: str) -> str:
    """Derive a short Unsplash search query from the post title."""
    stop = {
        "st", "andrews", "scotland", "scottish", "standrews",
        "the", "a", "an", "and", "or", "for", "to", "in", "of", "on", "at",
        "how", "what", "your", "every", "when", "why", "which", "who", "with", "without",
        # family/age terms that pull in nursery/child imagery
        "child", "children", "parent", "parents", "family", "kid", "kids",
        "know", "needs", "need", "guide", "complete",
    }
    words = [w for w in re.findall(r"[a-z]+", title.lower()) if w not in stop]
    # Anchor to student housing so results stay on-topic
    return " ".join(words[:5]) + " university student"


def generate_cover_image(title: str, slug: str) -> str | None:
    """Fetch a cover image from Unsplash and return the public path, or None on failure."""
    access_key = os.environ.get("UNSPLASH_ACCESS_KEY")
    if not access_key:
        print("  [image] UNSPLASH_ACCESS_KEY not set — skipping image")
        return None

    out_path = IMAGES_DIR / f"{slug}-cover.png"
    if out_path.exists():
        print(f"  [image] {out_path.name} already exists — reusing")
        return f"/images/blog/{slug}-cover.png"

    query = _unsplash_query(title)
    print(f"  [image] Searching Unsplash for '{query}' …")
    try:
        resp = requests.get(
            "https://api.unsplash.com/search/photos",
            params={"query": query, "orientation": "landscape", "per_page": 1, "client_id": access_key},
            timeout=15,
        )
        resp.raise_for_status()
        results = resp.json().get("results", [])
        if not results:
            print(f"  [image] No Unsplash results for '{query}'")
            return None

        photo = results[0]
        # Required by Unsplash API guidelines
        requests.get(photo["links"]["download_location"],
                     params={"client_id": access_key}, timeout=10)

        img = requests.get(photo["urls"]["regular"], timeout=30)
        img.raise_for_status()
        IMAGES_DIR.mkdir(parents=True, exist_ok=True)
        out_path.write_bytes(img.content)
        print(f"  [image] Saved {out_path.name} ({out_path.stat().st_size // 1024} KB)"
              f" — photo by {photo['user']['name']} on Unsplash")
        return f"/images/blog/{slug}-cover.png"
    except Exception as e:
        print(f"  [image] Unsplash error: {e}")
    return None


def write_post(post: dict, published_date: str) -> tuple[Path, str | None]:
    slug = post.get("slug") or slugify(post["title"])
    post_dir = BLOG_DIR / slug
    post_dir.mkdir(parents=True, exist_ok=True)

    cover_image = generate_cover_image(post["title"], slug)

    tsx_path = post_dir / "page.tsx"
    tsx_path.write_text(render_tsx(post, published_date, cover_image), encoding="utf-8")

    print(f"Written: {tsx_path}")
    return tsx_path, cover_image


def update_blog_index(post: dict, published_date: str, cover_image: str | None = None) -> None:
    """Prepend the new post to the hardcoded posts array in app/blog/page.tsx."""
    index_path = BLOG_DIR / "page.tsx"
    content = index_path.read_text(encoding="utf-8")

    date_obj     = datetime.date.fromisoformat(published_date)
    display_date = date_obj.strftime("%B %Y")

    # Escape values for embedding in TypeScript double-quoted strings
    def ts_escape(s: str) -> str:
        return s.replace("\\", "\\\\").replace('"', '\\"')

    new_entry = (
        f'  {{\n'
        f'    slug: "{ts_escape(post["slug"])}",\n'
        f'    title: "{ts_escape(post["title"])}",\n'
        f'    date: "{display_date}",\n'
        f'    excerpt:\n'
        f'      "{ts_escape(post["metaDescription"])}",\n'
        f'    cover_image: "{cover_image or ""}",\n'
        f'    cover_image_alt: "{ts_escape(post["title"])}",\n'
        f'  }},\n'
    )

    marker = "const posts = [\n"
    if marker not in content:
        print("WARNING: Could not find posts array in app/blog/page.tsx — skipping index update.")
        return

    content = content.replace(marker, marker + new_entry, 1)
    index_path.write_text(content, encoding="utf-8")
    print(f"Updated blog index: {index_path}")


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    published_date = datetime.date.today().isoformat()

    intel           = read_intel()
    existing_posts  = get_existing_posts()
    audience, angle = pick_next_combo(existing_posts)

    print(f"Existing posts found: {len(existing_posts)}")
    print(f"Selected combo → audience: [{audience}] | angle: [{angle}]")

    post = generate_post(audience, angle, intel, existing_posts)
    _, cover_image = write_post(post, published_date)
    update_blog_index(post, published_date, cover_image)

    print("Done. Vercel will deploy on the next git push.")


if __name__ == "__main__":
    main()
