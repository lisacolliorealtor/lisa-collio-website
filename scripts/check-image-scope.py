#!/usr/bin/env python3
"""
Featured-image scope check — run with `npm run check:images`.
==============================================================

Asserts the Master Plan v2.10 featured-image standard mechanically, over EVERY
file variant rather than a sample:

  1. OVERLAY_SCOPE and CLEAN_JOBS partition every slug in blog-headers/ with no
     overlap and no slug left unclassified.
  2. Every in-scope slug's images DO carry a RE/MAX Blue or Red band.
  3. Every out-of-scope slug's images do NOT — checked on the header, the
     thumbnail, and any og variant, not just the header.
  4. Every blog-headers file referenced by any page actually exists.
  5. Every file in assets/images/sections/ is clean (section images are always
     clean under v2.10) and is accounted for by a SECTION_JOBS entry.

Point 3 exists because of a real gap: a verification pass reported "0
outstanding" after scanning only `-header.jpg`, leaving the `-thumb.jpg` files
that hub-page FAQ cards actually render unverified. The files happened to be
correct, but the evidence didn't cover them. This checks every variant.

Exit 0 = clean, exit 1 = at least one violation.
"""
import os
import re
import sys
import glob
import importlib.util

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HEADERS = os.path.join(ROOT, "assets", "images", "blog-headers")
SECTIONS = os.path.join(ROOT, "assets", "images", "sections")

_spec = importlib.util.spec_from_file_location(
    "gen", os.path.join(ROOT, "scripts", "generate-featured-images.py"))
gen = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gen)

BLUE, RED = (0, 61, 165), (230, 14, 22)
TOL = 45


def has_band(path):
    """A solid full-width RE/MAX Blue or Red run at the top, middle or bottom."""
    im = Image.open(path).convert("RGB")
    for y in (3, im.height // 2, im.height - 3):
        row = [im.getpixel((x, y)) for x in range(8, im.width - 8, 20)]
        for c in (BLUE, RED):
            if all(sum(abs(a - b) for a, b in zip(p, c)) < TOL for p in row):
                return True
    return False


def variants(slug):
    out = []
    for suffix in ("header", "og", "thumb"):
        p = os.path.join(HEADERS, f"{slug}-{suffix}.jpg")
        if os.path.exists(p):
            out.append(p)
    return out


def main():
    errors = []

    slugs = sorted({re.sub(r"-(header|og|thumb)\.jpg$", "", os.path.basename(p))
                    for p in glob.glob(os.path.join(HEADERS, "*.jpg"))})

    # 1. the two sets must partition every slug
    both = gen.OVERLAY_SCOPE & set(gen.CLEAN_JOBS)
    if both:
        errors.append(f"slug in both OVERLAY_SCOPE and CLEAN_JOBS: {sorted(both)}")
    unclassified = [s for s in slugs
                    if s not in gen.OVERLAY_SCOPE and s not in gen.CLEAN_JOBS]
    if unclassified:
        errors.append("slug in blog-headers/ but in neither OVERLAY_SCOPE nor "
                      f"CLEAN_JOBS: {unclassified}")

    # 2 + 3. every variant of every slug, not just the header
    checked = 0
    for slug in slugs:
        in_scope = slug in gen.OVERLAY_SCOPE
        for path in variants(slug):
            checked += 1
            band = has_band(path)
            name = os.path.basename(path)
            if in_scope and not band:
                errors.append(f"in-scope image has lost its band: {name}")
            if not in_scope and band:
                errors.append(f"OUT-OF-SCOPE image still carries a band: {name}")

    # 5. section images: a separate class, always clean, tracked by SECTION_JOBS
    sec_checked = 0
    if os.path.isdir(SECTIONS):
        for path in sorted(glob.glob(os.path.join(SECTIONS, "*.jpg"))):
            sec_checked += 1
            base = os.path.basename(path)
            name = re.sub(r"-thumb$", "", base[:-len(".jpg")])
            if name not in gen.SECTION_JOBS:
                errors.append(f"section image not recorded in SECTION_JOBS: {base}")
            if has_band(path):
                errors.append(f"section image carries a band (must be clean): {base}")

    # 4. no page may reference a blog-headers file that does not exist
    referenced = set()
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames
                       if d not in (".git", "node_modules", "assets", "docs", "scripts")]
        for fn in filenames:
            if not fn.endswith(".html"):
                continue
            html = open(os.path.join(dirpath, fn), encoding="utf-8").read()
            referenced.update(re.findall(
                r"assets/images/blog-headers/([a-z0-9-]+\.(?:jpg|webp))", html))
    for f in sorted(referenced):
        if not os.path.exists(os.path.join(HEADERS, f)):
            errors.append(f"page references a missing image: {f}")

    print(f"{len(slugs)} slugs · {checked} image files checked · "
          f"{len(referenced)} distinct references resolved")
    print(f"  in scope (band expected):  {len(gen.OVERLAY_SCOPE)}")
    print(f"  out of scope (clean):      {len(gen.CLEAN_JOBS)}")
    print(f"{len(gen.SECTION_JOBS)} section image(s) · {sec_checked} file(s) checked — separate class, always clean")
    if errors:
        print(f"\nFAILED — {len(errors)} problem(s):")
        for e in errors:
            print("  -", e)
        return 1
    print("\nOK — every variant matches its scope.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
