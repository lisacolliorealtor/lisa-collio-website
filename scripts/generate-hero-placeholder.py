#!/usr/bin/env python3
"""
generate-hero-placeholder.py — reproduces assets/images/hero/_placeholder.jpg
and _placeholder.webp (Build Record Standard: every generated artifact needs
a recorded, reproducible source).

Hero Standard v1.0: no real hero photographs exist yet for any of the twelve
hero slots. This placeholder ships in their place so the component build
could go live before Lisa's photography does. It is deliberately NOT
brand-styled (no RE/MAX blue/red, no Bricolage Grotesque) so it cannot be
mistaken for a real, approved hero image at a glance or in a screenshot.

Two independent placeholder signals live outside this image (the leading-
underscore filename convention and the data-hero-placeholder="true" DOM
attribute — see audit.js check 26); this script only produces the pixels.

Uses DejaVu Sans Bold (fonts-dejavu-core, commonly preinstalled on Linux/CI —
NOT one of this repo's own self-hosted fonts, again so nothing about this
image resembles real site typography) with a fallback to Pillow's built-in
bitmap font if that package isn't present, so the script never hard-fails on
a missing font.

Usage: python3 scripts/generate-hero-placeholder.py
"""
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "images", "hero")
WIDTH, HEIGHT = 2400, 1000
STRIPE_WIDTH = 90
AMBER = (255, 176, 0)
BLACK = (20, 18, 14)
OVERLAY_ALPHA = 150  # out of 255

FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def load_font(size):
    for candidate in FONT_CANDIDATES:
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default(size=size)


def build_image():
    img = Image.new("RGB", (WIDTH, HEIGHT), BLACK)
    draw = ImageDraw.Draw(img)

    # Diagonal warning stripes (amber/black), full bleed.
    diagonal = WIDTH + HEIGHT
    for i, x in enumerate(range(-HEIGHT, diagonal, STRIPE_WIDTH)):
        color = AMBER if i % 2 == 0 else BLACK
        draw.polygon(
            [(x, 0), (x + STRIPE_WIDTH, 0), (x + STRIPE_WIDTH + HEIGHT, HEIGHT), (x + HEIGHT, HEIGHT)],
            fill=color,
        )

    # Dark overlay so the warning text stays legible over the stripes.
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, OVERLAY_ALPHA))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    lines = [
        ("PLACEHOLDER", load_font(140)),
        ("HERO PHOTO PENDING — DO NOT SHIP TO PRODUCTION", load_font(46)),
        ("assets/images/hero/_placeholder.jpg", load_font(34)),
    ]
    gap = 28
    heights = []
    for text, font in lines:
        bbox = draw.textbbox((0, 0), text, font=font)
        heights.append(bbox[3] - bbox[1])
    total_h = sum(heights) + gap * (len(lines) - 1)
    y = (HEIGHT - total_h) / 2
    for (text, font), h in zip(lines, heights):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        x = (WIDTH - w) / 2
        draw.text((x, y), text, font=font, fill=(255, 255, 255))
        y += h + gap

    return img


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    img = build_image()
    jpg_path = os.path.join(OUT_DIR, "_placeholder.jpg")
    webp_path = os.path.join(OUT_DIR, "_placeholder.webp")
    img.save(jpg_path, "JPEG", quality=85)
    img.save(webp_path, "WEBP", quality=85)
    print(f"wrote {jpg_path}")
    print(f"wrote {webp_path}")



# ---------------------------------------------------------------------------
# HERO_JOBS — Build Record Standard: every generated/placed asset gets a
# recorded source, parameters, and reproduction path. Twelve hero SLOTS
# (Home = Tier 1, plus the eleven Tier 2 pages), not twelve files — each slot
# is ONE photograph shared by its English and Spanish page, matching how the
# Hero Standard scopes photography (one shoot per slot, not per language).
#
# Every slot below is on the placeholder today — no real hero photography
# exists yet (Hero Standard v1.0, 12 August 2026). "source" records how
# _placeholder.jpg/.webp were made: this script, deterministic, no external
# inputs beyond the DejaVu Sans Bold system font (falls back to Pillow's
# built-in bitmap font if that package is absent — see load_font() above).
#
# When a real photo replaces a slot's placeholder: update that slot's
# "source" to the real photo's path + git blob SHA, "provenance" to how it
# was obtained/consent status (Hero Standard §5), and flip its page(s)'
# --hero-img / data-hero-placeholder in the actual HTML — audit.js check 26
# will then stop warning on that slot specifically, since both signals
# change together.
#
# cropBehavior is identical for all twelve by design: the Hero Standard
# gives no focal-point control. background-size:cover / position:center on
# .hero--photo always full-bleed crops dead-center, regardless of the source
# photo's own composition.
HERO_JOBS = {
    "home": {
        "tier": 1,
        "en_file": "index.html", "es_file": "es/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (this script) — synthetic warning graphic, not a photograph",
        "provenance": "n/a — placeholder, no photography consent question applies",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "buyers": {
        "tier": 2,
        "en_file": "buyers/index.html", "es_file": "es/compradores/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "sellers": {
        "tier": 2,
        "en_file": "sellers/index.html", "es_file": "es/vendedores/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder. NOTE: Hero Standard §5 records this slot's eventual photo as "
                       "THIRD-PARTY LICENSED, not Lisa's own photography — when it lands, provenance must "
                       "point to content/source/licensed-assets.txt, not a consent-on-file note.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "moving-to-goshen": {
        "tier": 2,
        "en_file": "moving-to-goshen/index.html", "es_file": "es/mudarse-a-goshen/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "living-in-goshen": {
        "tier": 2,
        "en_file": "living-in-goshen/index.html", "es_file": "es/viviendo-en-goshen/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "moving-to-elkhart": {
        "tier": 2,
        "en_file": "moving-to-elkhart/index.html", "es_file": "es/mudarse-a-elkhart/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "living-in-elkhart": {
        "tier": 2,
        "en_file": "living-in-elkhart/index.html", "es_file": "es/viviendo-en-elkhart/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "about": {
        "tier": 2,
        "en_file": "about/index.html", "es_file": "es/conozca-a-lisa/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "next-chapter-method": {
        "tier": 2,
        "en_file": "next-chapter-method/index.html", "es_file": "es/tu-proximo-capitulo/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "market-stats": {
        "tier": 2,
        "en_file": "market-stats/index.html", "es_file": "es/estadisticas-del-mercado/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "blog": {
        "tier": 2,
        "en_file": "blog/index.html", "es_file": "blog/spanish/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
    "contact": {
        "tier": 2,
        "en_file": "contact/index.html", "es_file": "es/contacto/index.html",
        "heroImg": "assets/images/hero/_placeholder.jpg",
        "source": "scripts/generate-hero-placeholder.py (shared placeholder)",
        "provenance": "n/a — placeholder",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "targetResolution": "2400x1000 min (12:5, landscape) — Hero Standard §3",
        "placeholder": True,
    },
}


if __name__ == "__main__":
    main()
