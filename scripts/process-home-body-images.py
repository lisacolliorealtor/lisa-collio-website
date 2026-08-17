#!/usr/bin/env python3
"""
process-home-body-images.py — processes the Home page's body images (both
Tier 1 sections and the Buyers/Sellers path cards), and records their build
jobs (Build Record Standard).

First batch, 17 August 2026: five images supplied on branch
lisa/home-body-images. Two real photographs (Lisa's own) and three
AI-generated illustrations — the first AI-generated imagery on this site,
approved by Lisa's managing broker (verbal approval, recorded by Lisa,
August 2026 -- see content/source/licensed-assets.txt for the three
illustration entries) and permitted under the amended Master Plan Images
policy. Heroes remain original-photography-only, unaffected (Hero Standard
SS6).

Source-location note, worth a permanent record here since it will recur:
the raw upload branch did not actually contain assets/images/home/ -- GitHub's
web "create file" flow produced a single blob file literally named "home"
(not a directory; git does not track empty directories), and the five images
landed at the repo root instead. Moved into a real assets/images/home/ by
this build; the stray root-level blob was not carried over.

Same processing convention as process-hero-images.py: EXIF-transpose, RGB,
downsize only if wider than MAX_WIDTH (never upscale), JPEG q88
optimize+progressive. WEBP siblings are generated ONLY for the three images
used in the .section-figure (picture+webp) placement -- the two path-card
images use the sitewide .local-card__img pattern, which is JPEG-only on this
site (matches the existing Goshen/Elkhart path-card images on this same
page), so no WEBP is generated for those two.
"""
import os

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOME_DIR = os.path.join(ROOT, "assets", "images", "home")
MAX_WIDTH = 3200

# HOME_BODY_JOBS -- Build Record Standard: every generated/placed asset gets a
# recorded source, parameters, and reproduction path. "source" is the raw
# upload's git blob SHA on lisa/home-body-images, before this script's
# resize/re-encode -- reproduce a slot exactly by fetching that blob and
# re-running process_one() with today's MAX_WIDTH/quality constants.
HOME_BODY_JOBS = {
    "lisa-collio-knows": {
        "outName": "lisa-collio-knows",
        "makeWebp": True,
        "placement": "Tier 1 section 'Lisa Collio knows this market' / 'Lisa Collio conoce este mercado' (.section-figure)",
        "type": "photograph",
        "source": "lisa/home-body-images raw upload, blob 3976d0a090904173b99775fd6720f3c4d9c6ad20 "
                   "-> process-home-body-images.py (resize to 3200w max -- source is 3024w, under the "
                   "ceiling, so NOT resized; JPEG q88 + WEBP q85)",
        "deliveredDimensions": "3024x4032 (native, well over the 1200px floor)",
        "provenance": "Lisa's own photograph. EXIF intact: Apple iPhone 14 Pro, 2025:02:20 11:28:53.",
    },
    "next-chapter-method": {
        "outName": "next-chapter-method",
        "makeWebp": True,
        "placement": "Tier 1 section 'A plan built around the life you're moving toward' / "
                     "'Un acompañamiento paso a paso' (.section-figure)",
        "type": "AI-generated illustration",
        "source": "lisa/home-body-images raw upload, blob 0d923d1ac926e8ab9d4e1bc93f0435f99f50591c "
                   "-> process-home-body-images.py (1536w, under the 3200px ceiling, NOT resized; "
                   "JPEG q88 + WEBP q85)",
        "deliveredDimensions": "1536x1024 (clears the 1200px floor)",
        "provenance": "AI-generated illustration, not a photograph. Broker-approved -- see "
                       "content/source/licensed-assets.txt.",
        "collisionNote": "Same base filename as assets/images/hero/next-chapter-method.jpg (Lisa's own "
                          "listing photo, the Next Chapter Method page's hero). Different folder, different "
                          "content, different purpose -- not the same asset. Never cross-reference the two.",
    },
    "real-estate-guidance": {
        "outName": "real-estate-guidance",
        "makeWebp": True,
        "placement": "Tier 1 section 'Real Estate Guidance You Can Trust' / "
                     "'Acompañamiento en el que puede confiar' (.section-figure)",
        "type": "photograph",
        "source": "lisa/home-body-images raw upload, blob ae3a60bb480b113f5fdd001cdfa8b6750eef144d "
                   "-> process-home-body-images.py (957w, under the 3200px ceiling, NOT resized; "
                   "JPEG q88 + WEBP q85)",
        "deliveredDimensions": "957x958 -- UNDER the 1200px floor in both dimensions. Shipped anyway, "
                                "Lisa's ruling (17 August 2026), made knowing the shortfall: will read "
                                "slightly soft on a large monitor, fine on the phone traffic that is most "
                                "of her visitors. Logged as a post-launch replacement candidate in the "
                                "punch list.",
        "provenance": "Lisa's own photograph. No EXIF present.",
    },
    "transforming-dreams": {
        "outName": "transforming-dreams",
        "makeWebp": False,
        "placement": "Buyers path card, H3 'Transforming dreams into homes' / "
                     "'Transformando sueños en casas' (.local-card__img -- JPEG only, matches the "
                     "existing Goshen/Elkhart path-card images on this same page)",
        "type": "AI-generated illustration",
        "source": "lisa/home-body-images raw upload, blob fd3809b225a48a78274c95254537303c42065b2c "
                   "-> process-home-body-images.py (1536w, under the 3200px ceiling, NOT resized; JPEG q88 only)",
        "deliveredDimensions": "1536x1024 (clears the 1200px floor)",
        "provenance": "AI-generated illustration, not a photograph. Broker-approved -- see "
                       "content/source/licensed-assets.txt.",
    },
    "unlocking-smart-moves": {
        "outName": "unlocking-smart-moves",
        "makeWebp": False,
        "placement": "Sellers path card, H3 'Unlocking smart moves' / "
                     "'Tu llave hacia decisiones inteligentes.' (.local-card__img -- JPEG only, matches "
                     "the existing Goshen/Elkhart path-card images on this same page)",
        "type": "AI-generated illustration",
        "source": "lisa/home-body-images raw upload, blob de6edb12bc979760d98793b9ad9b303f73bbd4e1 "
                   "-> process-home-body-images.py (1536w, under the 3200px ceiling, NOT resized; JPEG q88 only)",
        "deliveredDimensions": "1536x1024 (clears the 1200px floor)",
        "provenance": "AI-generated illustration, not a photograph. Broker-approved -- see "
                       "content/source/licensed-assets.txt.",
    },
}


def process_one(src_path, out_name, make_webp):
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    w, h = img.size
    if w > MAX_WIDTH:
        new_h = round(h * MAX_WIDTH / w)
        img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
    os.makedirs(HOME_DIR, exist_ok=True)
    jpg_path = os.path.join(HOME_DIR, f"{out_name}.jpg")
    img.save(jpg_path, "JPEG", quality=88, optimize=True, progressive=True)
    if make_webp:
        webp_path = os.path.join(HOME_DIR, f"{out_name}.webp")
        img.save(webp_path, "WEBP", quality=85, method=6)
    return img.size, os.path.getsize(jpg_path)


def process_all(raw_dir):
    for slug, job in HOME_BODY_JOBS.items():
        src_path = os.path.join(raw_dir, f"{slug}.jpg")
        if not os.path.exists(src_path):
            print(f"SKIP {slug}: source not found at {src_path}")
            continue
        size, jpg_bytes = process_one(src_path, job["outName"], job["makeWebp"])
        webp_note = " (+.webp)" if job["makeWebp"] else ""
        print(f"{slug}: {size[0]}x{size[1]}  {jpg_bytes/1024:.0f}KB  -> assets/images/home/{job['outName']}.jpg{webp_note}")


if __name__ == "__main__":
    import sys
    raw_dir = sys.argv[1] if len(sys.argv) > 1 else "_raw"
    process_all(raw_dir)
