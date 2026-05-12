#!/usr/bin/env python3
"""
Fetch site images from Unsplash and save to public/images/.

Run once from the repo root:
    pip install requests
    UNSPLASH_ACCESS_KEY=<key> python scripts/generate-images.py

Existing files are skipped. Delete a file to force re-fetch.
"""

import os
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("requests not installed. Run: pip install requests")

REPO_ROOT  = Path(__file__).parent.parent
PUBLIC_DIR = REPO_ROOT / "public" / "images"
API_BASE   = "https://api.unsplash.com"

# path: relative to public/images/
# query: Unsplash search terms

IMAGES = [
    # ── Site-wide ─────────────────────────────────────────────────────────────
    {
        "path":  "site/og-image.png",
        "query": "St Andrews Scotland cathedral town aerial",
    },
    {
        "path":  "site/hero.png",
        "query": "St Andrews Scotland cobblestone street historic",
    },
    {
        "path":  "site/guide-hero.png",
        "query": "St Andrews Scotland university rooftops",
    },

    # ── Blog covers ───────────────────────────────────────────────────────────
    {
        "path":  "blog/rental-scams-cover.png",
        "query": "rental contract lease document signing desk",
    },
    {
        "path":  "blog/parents-guide-cover.png",
        "query": "St Andrews Scotland town scenic",
    },
    {
        "path":  "blog/second-year-scramble-cover.png",
        "query": "apartment interior living room bright modern",
    },
    {
        "path":  "blog/best-streets-cover.png",
        "query": "residential street Victorian terraced houses autumn",
    },
    {
        "path":  "blog/housing-timeline-cover.png",
        "query": "planner diary desk key organised planning",
    },
    {
        "path":  "blog/international-student-rights-cover.png",
        "query": "university campus international students diverse",
    },
    {
        "path":  "blog/how-to-read-student-letting-contract-st-andrews-cover.png",
        "query": "lease contract document pen annotating closeup",
    },
    {
        "path":  "blog/student-renter-legal-rights-st-andrews-parents-guide-cover.png",
        "query": "legal rights renting tenant university student",
    },
    {
        "path":  "blog/st-andrews-student-housing-costs-international-students-budget-guide-cover.png",
        "query": "student housing costs budget international university",
    },
]


def fetch_image(access_key: str, item: dict) -> None:
    out_path = PUBLIC_DIR / item["path"]

    if out_path.exists():
        print(f"  skip  {item['path']} (already exists)")
        return

    out_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"  fetch {item['path']} …")

    # Search Unsplash
    search_resp = requests.get(
        f"{API_BASE}/search/photos",
        params={
            "query":       item["query"],
            "orientation": "landscape",
            "per_page":    1,
            "client_id":   access_key,
        },
        timeout=15,
    )
    search_resp.raise_for_status()
    results = search_resp.json().get("results", [])

    if not results:
        print(f"  WARN  no results for query: {item['query']}")
        return

    photo = results[0]

    # Required by Unsplash API guidelines: trigger download tracking
    requests.get(
        photo["links"]["download_location"],
        params={"client_id": access_key},
        timeout=10,
    )

    # Download the image at regular resolution (1080px wide)
    img_resp = requests.get(photo["urls"]["regular"], timeout=30)
    img_resp.raise_for_status()

    out_path.write_bytes(img_resp.content)
    size_kb = out_path.stat().st_size // 1024
    photographer = photo["user"]["name"]
    print(f"  saved {item['path']} ({size_kb} KB) — photo by {photographer} on Unsplash")


def main() -> None:
    access_key = os.environ.get("UNSPLASH_ACCESS_KEY")
    if not access_key:
        sys.exit("UNSPLASH_ACCESS_KEY environment variable not set.")

    print(f"Fetching {len(IMAGES)} images from Unsplash\n")

    for i, item in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {item['path']}")
        try:
            fetch_image(access_key, item)
        except Exception as e:
            print(f"  ERR   {item['path']}: {e}")
        if i < len(IMAGES):
            time.sleep(1)

    print("\nDone.")


if __name__ == "__main__":
    main()
