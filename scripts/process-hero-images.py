#!/usr/bin/env python3
"""
process-hero-images.py — converts and optimizes Lisa's twelve hero
photographs for delivery, and (also) generates the shared placeholder used
before real photos exist. Formerly generate-hero-placeholder.py; renamed and
extended 13 August 2026 when the real photos landed, rather than splitting
hero-image generation across two scripts.

Real-photo pipeline (RAW_JOBS below):
  - Reads each source photo (some are Apple MPO containers — Pillow reads the
    primary JPEG frame transparently; re-saving strips the trailing MPO data).
  - Applies EXIF-orientation transpose so a rotated phone photo isn't shipped
    sideways.
  - Downsizes anything wider than MAX_WIDTH (3200px) — comfortably clears the
    Hero Standard's 2400px floor with margin while cutting multi-MB originals
    down for delivery; never upscales a file already narrower than that.
  - Saves plain JPEG (quality 88, optimize, progressive) + WEBP (quality 85,
    method 6) — the same encode settings scripts/generate-featured-images.py
    already uses, so the site's image pipeline stays consistent.

Usage:
  python3 scripts/process-hero-images.py            # process all real photos
  python3 scripts/process-hero-images.py --placeholder   # (re)build the placeholder only
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERO_DIR = os.path.join(ROOT, "assets", "images", "hero")
MAX_WIDTH = 3200

# ---------------------------------------------------------------------------
# Real-photo processing
# ---------------------------------------------------------------------------
# RAW_JOBS: slug -> (source path relative to repo root, output path relative
# to repo root, output basename without extension). The homes-elkhart file
# keeps its address-folder convention rather than living in assets/images/hero/.
RAW_JOBS = {
    "home": ("_raw/home.jpg", "assets/images/hero", "home"),
    "buyers": ("_raw/buyers.jpg", "assets/images/hero", "buyers"),
    "moving-to-goshen": ("_raw/moving-to-goshen.jpg", "assets/images/hero", "moving-to-goshen"),
    "living-in-goshen": ("_raw/living-in-goshen.jpg", "assets/images/hero", "living-in-goshen"),
    "moving-to-elkhart": ("_raw/moving-to-elkhart.jpg", "assets/images/hero", "moving-to-elkhart"),
    "living-in-elkhart": ("_raw/living-in-elkhart.jpg", "assets/images/hero", "living-in-elkhart"),
    "about": ("_raw/about.jpg", "assets/images/hero", "about"),
    "next-chapter-method": ("_raw/next-chapter-method.jpg", "assets/images/hero", "next-chapter-method"),
    "market-stats": ("_raw/market-stats.jpg", "assets/images/hero", "market-stats"),
    "blog": ("_raw/blog.jpg", "assets/images/hero", "blog"),
    "contact": ("_raw/contact.jpg", "assets/images/hero", "contact"),
    "sellers": ("_raw/twilight-front-1.jpg",
                "assets/images/homes-elkhart/1765-n-bay-drive-elkhart-in-46514",
                "twilight-front-1"),
}


def process_one(src_path, out_dir, out_name):
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)  # normalize rotation before anything else
    img = img.convert("RGB")
    w, h = img.size
    if w > MAX_WIDTH:
        new_h = round(h * MAX_WIDTH / w)
        img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
    os.makedirs(os.path.join(ROOT, out_dir), exist_ok=True)
    jpg_path = os.path.join(ROOT, out_dir, f"{out_name}.jpg")
    webp_path = os.path.join(ROOT, out_dir, f"{out_name}.webp")
    img.save(jpg_path, "JPEG", quality=88, optimize=True, progressive=True)
    img.save(webp_path, "WEBP", quality=85, method=6)
    return img.size, os.path.getsize(jpg_path)


def process_all(raw_dir):
    for slug, (rel_src, out_dir, out_name) in RAW_JOBS.items():
        src_path = os.path.join(raw_dir, os.path.basename(rel_src))
        if not os.path.exists(src_path):
            print(f"SKIP {slug}: source not found at {src_path}")
            continue
        size, jpg_bytes = process_one(src_path, out_dir, out_name)
        print(f"{slug}: {size[0]}x{size[1]}  {jpg_bytes/1024:.0f}KB  -> {out_dir}/{out_name}.jpg (+.webp)")


# ---------------------------------------------------------------------------
# Placeholder generation (unchanged from generate-hero-placeholder.py)
# ---------------------------------------------------------------------------
WIDTH, HEIGHT = 2400, 1000
STRIPE_WIDTH = 90
AMBER = (255, 176, 0)
BLACK = (20, 18, 14)
OVERLAY_ALPHA = 150

FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def load_font(size):
    for candidate in FONT_CANDIDATES:
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default(size=size)


def build_placeholder_image():
    img = Image.new("RGB", (WIDTH, HEIGHT), BLACK)
    draw = ImageDraw.Draw(img)
    diagonal = WIDTH + HEIGHT
    for i, x in enumerate(range(-HEIGHT, diagonal, STRIPE_WIDTH)):
        color = AMBER if i % 2 == 0 else BLACK
        draw.polygon(
            [(x, 0), (x + STRIPE_WIDTH, 0), (x + STRIPE_WIDTH + HEIGHT, HEIGHT), (x + HEIGHT, HEIGHT)],
            fill=color,
        )
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


def build_placeholder():
    os.makedirs(HERO_DIR, exist_ok=True)
    img = build_placeholder_image()
    jpg_path = os.path.join(HERO_DIR, "_placeholder.jpg")
    webp_path = os.path.join(HERO_DIR, "_placeholder.webp")
    img.save(jpg_path, "JPEG", quality=85)
    img.save(webp_path, "WEBP", quality=85)
    print(f"wrote {jpg_path}")
    print(f"wrote {webp_path}")



# ---------------------------------------------------------------------------
# HERO_JOBS — Build Record Standard: every generated/placed asset gets a
# recorded source, parameters, and reproduction path. Twelve hero SLOTS
# (Home = Tier 1, plus the eleven Tier 2 pages), not twelve files — each slot
# is ONE photograph shared by its English and Spanish page.
#
# Updated 13 August 2026 when Lisa's real photographs replaced the shared
# placeholder on all twelve slots (Phase 1 of the Hero Standard photo build,
# approved after the Phase 0 measurement report). Every "source" below is the
# RAW upload's git blob SHA on the lisa/hero-photos branch, before this
# script's resize/re-encode — reproduce a slot exactly by fetching that blob
# and re-running process_one() with today's MAX_WIDTH/quality constants.
#
# provenance points at content/source/licensed-assets.txt for the three
# stripped-EXIF listing photos and the third-party-shot Sellers photo, per
# Lisa's 13 August ruling — missing/foreign EXIF on those four is expected
# and explained there, not a rejection signal (Verification Standard: the
# gap is confirmed against the actual check artifact, not assumed).
HERO_JOBS = {
    "home": {
        "tier": 1,
        "en_file": "index.html", "es_file": "es/index.html",
        "heroImg": "assets/images/hero/home.jpg",
        "deliveredDimensions": "3200x2135",
        "source": "lisa/hero-photos raw upload, blob c183f016bb4a696673f5028714fd590d7dde4df4 "
                   "-> process-hero-images.py (resize to 3200w max, JPEG q88 + WEBP q85)",
        "provenance": "Lisa's own listing photo, authorization held. Stripped EXIF confirmed by Lisa "
                       "13 August 2026 as expected for this file — see content/source/licensed-assets.txt.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "buyers": {
        "tier": 2,
        "en_file": "buyers/index.html", "es_file": "es/compradores/index.html",
        "heroImg": "assets/images/hero/buyers.jpg",
        "deliveredDimensions": "3200x2135",
        "source": "lisa/hero-photos raw upload, blob 06b8d4223e8b1375b3392504d2ef95c5cf85dcbe "
                   "-> process-hero-images.py (resize to 3200w max, JPEG q88 + WEBP q85)",
        "provenance": "Lisa's own listing photo, authorization held. Stripped EXIF confirmed by Lisa "
                       "13 August 2026 as expected for this file — see content/source/licensed-assets.txt. "
                       "Same property as next-chapter-method.jpg (Lisa confirmed, 13 August 2026).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "sellers": {
        "tier": 2,
        "en_file": "sellers/index.html", "es_file": "es/vendedores/index.html",
        "heroImg": "assets/images/homes-elkhart/1765-n-bay-drive-elkhart-in-46514/twilight-front-1.jpg",
        "deliveredDimensions": "2038x1359 (native — under the 2400px floor; Lisa's ruling 13 August 2026: "
                                "ship as-is, log as a post-launch replacement candidate, do not block)",
        "source": "lisa/hero-photos raw upload, blob de7bf1d91f5d37699d171f7690825d51f919df7f "
                   "-> process-hero-images.py (native width kept, not upscaled; JPEG q88 + WEBP q85)",
        "provenance": "Third-party licensed — shot by a photographer Lisa hired. She holds the license "
                       "and the sellers' agreement for 1765 N Bay Drive, Elkhart. See "
                       "content/source/licensed-assets.txt and content/source/sold-listing-consent.txt "
                       "(address already listed). Nikon D7500 EXIF is expected, not a rejection signal.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "moving-to-goshen": {
        "tier": 2,
        "en_file": "moving-to-goshen/index.html", "es_file": "es/mudarse-a-goshen/index.html",
        "heroImg": "assets/images/hero/moving-to-goshen.jpg",
        "deliveredDimensions": "3200x2400",
        "source": "lisa/hero-photos raw upload, blob b22bce653f44152066f40b2fefeef0cbb1245940 "
                   "(originally Apple MPO container — process-hero-images.py re-saves the primary frame "
                   "as plain JPEG, stripping the trailing MPO data) -> resize to 3200w max, JPEG q88 + WEBP q85",
        "provenance": "Lisa's own phone photography (Apple iPhone 16 Pro EXIF intact, 2026-07-22).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "living-in-goshen": {
        "tier": 2,
        "en_file": "living-in-goshen/index.html", "es_file": "es/viviendo-en-goshen/index.html",
        "heroImg": "assets/images/hero/living-in-goshen.jpg",
        "deliveredDimensions": "3200x2400",
        "source": "lisa/hero-photos raw upload, blob df1076eef5763557f677d008e2342e1232e4d78e "
                   "-> process-hero-images.py (resize to 3200w max, JPEG q88 + WEBP q85)",
        "provenance": "Lisa's own phone photography (Apple iPhone 16 Pro EXIF intact, 2026-07-22).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "moving-to-elkhart": {
        "tier": 2,
        "en_file": "moving-to-elkhart/index.html", "es_file": "es/mudarse-a-elkhart/index.html",
        "heroImg": "assets/images/hero/moving-to-elkhart.jpg",
        "deliveredDimensions": "3200x2400",
        "source": "lisa/hero-photos raw upload, blob ddf54ff7bc61bba7db71365ec215080358814e37 "
                   "(originally Apple MPO container, re-saved as plain JPEG) -> resize to 3200w max, "
                   "JPEG q88 + WEBP q85",
        "provenance": "Lisa's own phone photography (Apple iPhone 16 Pro EXIF intact, 2026-07-23).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "living-in-elkhart": {
        "tier": 2,
        "en_file": "living-in-elkhart/index.html", "es_file": "es/viviendo-en-elkhart/index.html",
        "heroImg": "assets/images/hero/living-in-elkhart.jpg",
        "deliveredDimensions": "3200x2400",
        "source": "lisa/hero-photos raw upload, blob d73a1e39642392c4ee2f70b472c192c87551a201 "
                   "(originally Apple MPO container, re-saved as plain JPEG) -> resize to 3200w max, "
                   "JPEG q88 + WEBP q85",
        "provenance": "Lisa's own phone photography (Apple iPhone 16 Pro EXIF intact, 2026-07-23).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "about": {
        "tier": 2,
        "en_file": "about/index.html", "es_file": "es/conozca-a-lisa/index.html",
        "heroImg": "assets/images/hero/about.jpg",
        "deliveredDimensions": "3200x2400",
        "source": "lisa/hero-photos raw upload, blob e33aa2e64344a90be12e094992f5cf52899791ae "
                   "(originally Apple MPO container, re-saved as plain JPEG) -> resize to 3200w max, "
                   "JPEG q88 + WEBP q85",
        "provenance": "Lisa's own phone photography (Apple iPhone 16 Pro EXIF intact, 2026-08-13). "
                       "Door decal phone number (574-903-5966) confirmed by Lisa as her broker's number.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "next-chapter-method": {
        "tier": 2,
        "en_file": "next-chapter-method/index.html", "es_file": "es/tu-proximo-capitulo/index.html",
        "heroImg": "assets/images/hero/next-chapter-method.jpg",
        "deliveredDimensions": "3200x2135",
        "source": "lisa/hero-photos raw upload, blob 0e5fded1e4e7fb10afa77c9317e88b8890350000 "
                   "-> process-hero-images.py (resize to 3200w max, JPEG q88 + WEBP q85)",
        "provenance": "Lisa's own listing photo, authorization held. Stripped EXIF confirmed by Lisa "
                       "13 August 2026 as expected for this file — see content/source/licensed-assets.txt. "
                       "Same property as buyers.jpg; visible house number \"117\" is this listing's own, "
                       "approved by Lisa.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "market-stats": {
        "tier": 2,
        "en_file": "market-stats/index.html", "es_file": "es/estadisticas-del-mercado/index.html",
        "heroImg": "assets/images/hero/market-stats.jpg",
        "deliveredDimensions": "2418x1360 (native — clears the 2400px floor by 18px, essentially no margin)",
        "source": "lisa/hero-photos raw upload, blob 705f520ae3504d4cc36bb1fc291500c1a1b1ed90 "
                   "-> process-hero-images.py (native width kept, already near MAX_WIDTH; JPEG q88 + WEBP q85)",
        "provenance": "DJI drone photo (FC7303 EXIF intact, 2024-06-06, Photoshop-processed).",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "blog": {
        "tier": 2,
        "en_file": "blog/index.html", "es_file": "blog/spanish/index.html",
        "heroImg": "assets/images/hero/blog.jpg",
        "deliveredDimensions": "1813x1360 (native — under the 2400px floor; Lisa's ruling 13 August 2026: "
                                "ship as-is, log as a post-launch replacement candidate, do not block)",
        "source": "lisa/hero-photos raw upload, blob 3527d3b3b2e8a0eb6a22441830f3c169c2c2c9e1 "
                   "-> process-hero-images.py (native width kept, not upscaled; JPEG q88 + WEBP q85)",
        "provenance": "Aerial photo, no EXIF (drone/export details not confirmed). Not flagged by Lisa as a "
                       "concern; not covered by licensed-assets.txt since no rejection-signal EXIF pattern applies.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
    "contact": {
        "tier": 2,
        "en_file": "contact/index.html", "es_file": "es/contacto/index.html",
        "heroImg": "assets/images/hero/contact.jpg",
        "deliveredDimensions": "2038x1359 (native — under the 2400px floor; Lisa's ruling 13 August 2026: "
                                "ship as-is, log as a post-launch replacement candidate, do not block)",
        "source": "lisa/hero-photos raw upload, blob a45103101966cf5d62bde86df95e262470f72790 "
                   "-> process-hero-images.py (native width kept, not upscaled; JPEG q88 + WEBP q85)",
        "provenance": "Canon EOS M50m2 EXIF intact, 2023-12-29, Photoshop-processed.",
        "cropBehavior": "full-bleed cover, dead-center, no focal-point control",
        "placeholder": False,
    },
}


if __name__ == "__main__":
    if "--placeholder" in sys.argv:
        build_placeholder()
    else:
        raw_dir = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "_raw"
        process_all(raw_dir)
