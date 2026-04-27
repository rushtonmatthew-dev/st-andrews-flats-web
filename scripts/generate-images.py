#!/usr/bin/env python3
"""
Generate all site images via the Gemini image generation API.

Run once from the repo root:
    pip install google-genai
    GOOGLE_API_KEY=<key> python scripts/generate-images.py

Images are saved to public/images/. Existing files are skipped.
Re-run any time to fill gaps or regenerate a specific image
(delete the file first to force regeneration).
"""

import os
import sys
import time
from pathlib import Path

try:
    from google import genai
except ImportError:
    sys.exit("google-genai not installed. Run: pip install google-genai")

REPO_ROOT   = Path(__file__).parent.parent
PUBLIC_DIR  = REPO_ROOT / "public" / "images"
MODEL       = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-3.1-flash-image-preview")

# ── Image definitions ─────────────────────────────────────────────────────────
# path: relative to public/images/
# prompt: what to generate

IMAGES = [
    # ── Site-wide ─────────────────────────────────────────────────────────────
    {
        "path": "site/og-image.png",
        "alt":  "St Andrews town — student letting alerts",
        "prompt": (
            "Cinematic ultra-wide aerial photograph of the historic coastal town of St Andrews, "
            "Scotland. The iconic cathedral ruins in the left foreground, St Salvator's Chapel "
            "tower visible, pale sandstone university buildings, cobblestone streets, slate rooftops, "
            "and the blue North Sea stretching to the horizon. Warm golden late-afternoon light, "
            "scattered clouds. Photorealistic, 1200×630 landscape. No people, no text."
        ),
    },
    {
        "path": "site/hero.png",
        "alt":  "St Andrews, Scotland — historic university town",
        "prompt": (
            "Wide-angle architectural street photograph of a quiet cobblestone lane in "
            "St Andrews, Scotland. Pale sandstone Georgian townhouses with sash windows and "
            "black iron railings on both sides, a church spire visible at the end of the street. "
            "Warm golden afternoon sunlight, long shadows, blue sky. Photorealistic, cinematic, "
            "ultra-high resolution. No people."
        ),
    },
    {
        "path": "site/guide-hero.png",
        "alt":  "St Andrews student housing guide",
        "prompt": (
            "Elevated view looking over the historic rooftops of St Andrews, Scotland. "
            "Pale sandstone university buildings, ancient church tower, slate rooftops and "
            "chimney pots, glimpse of the North Sea on the horizon. Warm morning light, "
            "clear blue sky. Professional architectural photography, photorealistic. No people."
        ),
    },

    # ── Blog covers ───────────────────────────────────────────────────────────
    {
        "path": "blog/rental-scams-cover.png",
        "alt":  "Rental contract on a desk",
        "prompt": (
            "Close-up editorial photograph: a printed rental tenancy agreement on a wooden desk, "
            "key clauses circled in red pen, reading glasses placed beside it, warm desk lamp "
            "casting golden light. Shallow depth of field, professional photography. No faces."
        ),
    },
    {
        "path": "blog/parents-guide-cover.png",
        "alt":  "St Andrews town viewed from above",
        "prompt": (
            "Panoramic view looking across the rooftops of St Andrews, Scotland toward the sea. "
            "Cathedral ruins on the left, stone university buildings, cobblestone streets, "
            "North Sea gleaming in the background. Warm golden evening light. "
            "Professional travel photography, photorealistic. No people."
        ),
    },
    {
        "path": "blog/second-year-scramble-cover.png",
        "alt":  "Bright student flat interior in St Andrews",
        "prompt": (
            "Interior of a well-maintained Scottish period student flat. High ceilings with "
            "original cornicing, large sash windows letting in bright natural daylight, "
            "stripped wooden floors, simple neutral furnishings. Clean and inviting. "
            "Professional interior architecture photography, photorealistic. No people."
        ),
    },
    {
        "path": "blog/best-streets-cover.png",
        "alt":  "Residential street in St Andrews",
        "prompt": (
            "Wide shot of a tree-lined residential street in St Andrews, Scotland. "
            "Stone Victorian terraced townhouses on both sides, black iron railings, "
            "mature trees with golden autumn foliage, warm afternoon sunlight casting "
            "dappled shadows on the pavement. Professional street photography. No people."
        ),
    },
    {
        "path": "blog/housing-timeline-cover.png",
        "alt":  "Diary planner with house key",
        "prompt": (
            "Flat lay still life on a wooden desk: an open monthly planner diary, "
            "a small brass house key resting on the January page, a steaming cup of tea "
            "in the corner, fountain pen beside the diary. Warm golden window light. "
            "Professional lifestyle photography, shallow depth of field."
        ),
    },
    {
        "path": "blog/international-student-rights-cover.png",
        "alt":  "University gate with international flags",
        "prompt": (
            "Historic Scottish university stone archway entrance gate, international flags "
            "on flagpoles in the forecourt, pale sandstone carved detail, blue sky above, "
            "warm morning sunlight. Professional architectural photography, photorealistic. "
            "No people, no visible text."
        ),
    },
    {
        "path": "blog/how-to-read-student-letting-contract-st-andrews-cover.png",
        "alt":  "Reviewing a lease contract",
        "prompt": (
            "Editorial close-up: hands carefully annotating a printed lease document on a "
            "wooden table, a pen making notes in the margin. Warm natural light from a nearby "
            "window. Shallow depth of field, professional photography. No faces visible."
        ),
    },
]

# ── Generator ─────────────────────────────────────────────────────────────────

def generate_image(client, item: dict) -> None:
    out_path = PUBLIC_DIR / item["path"]

    if out_path.exists():
        print(f"  skip  {item['path']} (already exists)")
        return

    out_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"  gen   {item['path']} …")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=item["prompt"],
        )
        for part in response.parts:
            if part.inline_data is not None:
                out_path.write_bytes(part.inline_data.data)
                size_kb = out_path.stat().st_size // 1024
                print(f"  saved {item['path']} ({size_kb} KB)")
                return
        print(f"  WARN  no image returned for {item['path']}")
    except Exception as e:
        print(f"  ERR   {item['path']}: {e}")


def main() -> None:
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        sys.exit("GOOGLE_API_KEY environment variable not set.")

    client = genai.Client(api_key=api_key)
    print(f"Generating {len(IMAGES)} images using {MODEL}\n")

    for i, item in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {item['path']}")
        generate_image(client, item)
        if i < len(IMAGES):
            time.sleep(3)  # avoid rate limits

    print("\nDone.")


if __name__ == "__main__":
    main()
