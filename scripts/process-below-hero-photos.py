#!/usr/bin/env python3
"""
process-below-hero-photos.py -- processes the four "below-hero" photographs
of Lisa for the community pages (moving-to-goshen, living-in-goshen,
moving-to-elkhart, living-in-elkhart, EN+ES), and records their build jobs
(Build Record Standard).

First batch, 18 August 2026: five photos supplied on branch
lisa/below-hero-photos (GitHub web upload, landed flat at repo root, no
stray blob this time). Four are processed here; the fifth,
lisa-hero-meet-lisa.jpg, is moved into assets/images/sections/ alongside
them but NOT processed or wired -- it is under the 1200px floor (960x717)
and out of scope for this PR (see the punch list / /about/ parity note).

DELIVERY FORMAT -- 1200x800 (1.5:1), NOT the sitewide .section-figure
1200x630 (1.9:1) used elsewhere on these same pages. Lisa's deliberate
ruling, 18 August 2026: these are people photos in a new above-the-lead
position, not part of the existing H2 section-figure sequence, and a
1.9:1 crop from a 4:3 (1.333) source would discard 31% of frame height and
cut her off. .section-figure is width:100%/height:auto, so a taller image
renders correctly in the same class. This is a recorded departure, not an
unexplained one-off -- see each job entry below.

CROP -- all four use the identical crop box (0, 336, 4032, 3024): trims
336px off the TOP only (sky/headroom), leaves the existing bottom edge
untouched. This was verified per-photo, not assumed uniform by coincidence:
each source has generous headroom above Lisa's head (768-1303px) and a
tight or nonexistent margin below (each photo's bottom edge already frames
her at the torso/hip, or -- for the two full-body shots -- her feet sit
within ~95px of the original frame's bottom edge). Trimming only from the
top is the only crop that avoids cutting into her in all four cases.

lisa-moving-to-goshen.jpg carries a deliberate, recorded exception: the
Goshen Theater marquee (dated show listing + "Interra" sponsor credit)
falls inside the region common to every possible top-trim crop position
(marquee bottom ~y990, Lisa's head top ~y1078 -- only 88px apart in a
3024px-tall source), so no top-trim crop can exclude it. Lisa's ruling,
18 August 2026: accept the marquee as visible rather than use the only
alternative (a crop starting at y>=990, leaving ~35px of delivered
headroom, risking clipping hair on export, and discarding roughly half
the frame's width/context). Condition of that ruling: the alt text names
none of it -- no show title, no dates, no "Interra," no storefront names.
Verified against the approved alt string before wiring (see licensed-assets
entry and the HTML diff).
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECTIONS_DIR = os.path.join(ROOT, "assets", "images", "sections")
CROP_BOX = (0, 336, 4032, 3024)
DELIVER_SIZE = (1200, 800)
WEBP_QUALITY = 82

# BELOW_HERO_JOBS -- Build Record Standard: every generated/placed asset gets
# a recorded source, parameters, and reproduction path. "source" is the raw
# upload's git blob SHA on lisa/below-hero-photos, before this script's
# crop/resize/re-encode pass.
BELOW_HERO_JOBS = {
    "lisa-living-in-elkhart": {
        "source": "lisa/below-hero-photos raw upload 'lisa-living-in-elkhart.jpg', "
                   "blob ae028ba3c2ec41d318525857eaf15231935dd7ce",
        "placement": "/living-in-elkhart/ and /es/viviendo-en-elkhart/, inserted immediately after "
                     "<!-- endbuild:hero-tier2 --> inside wrap--narrow, above <p class=\"lead\"> "
                     "(.section-figure)",
        "cropBox": "(0, 336, 4032, 3024) -- trims 336px off the top; this source has no feet in "
                   "frame at all (torso-up shot) with ~768px of headroom above her head, so the "
                   "existing bottom edge is untouched",
        "deliveredDimensions": "1200x800 -- see module docstring for why 1.5:1, not the sitewide "
                               "1200x630 .section-figure ratio",
        "provenance": "Lisa's own photograph. Full EXIF: Apple iPhone 16 Pro, 2026-07-23 20:19:09.",
    },
    "lisa-moving-to-elkhart": {
        "source": "lisa/below-hero-photos raw upload 'lisa-moving-to-elkhart.jpg', "
                   "blob 3f763c0445bee3faaae7d51ae2747d31ca63908f",
        "placement": "/moving-to-elkhart/ and /es/mudarse-a-elkhart/, same insertion point "
                     "(.section-figure)",
        "cropBox": "(0, 336, 4032, 3024) -- trims 336px off the top; head has ~1303px of headroom, "
                   "feet/shoes sit within ~95px of the original bottom edge, so the bottom is left "
                   "untouched to avoid cutting her feet",
        "deliveredDimensions": "1200x800",
        "provenance": "Lisa's own photograph. Full EXIF: Apple iPhone 16 Pro, 2026-07-23 17:22:09.",
    },
    "lisa-living-in-goshen": {
        "source": "lisa/below-hero-photos raw upload 'lisa-living-in-goshen.jpg', "
                   "blob 4528459872fc882100c8178a4382107eacb368d9",
        "placement": "/living-in-goshen/ and /es/viviendo-en-goshen/, same insertion point "
                     "(.section-figure)",
        "cropBox": "(0, 336, 4032, 3024) -- trims 336px off the top; same torso-up framing as "
                   "lisa-living-in-elkhart.jpg. NOTE: this trims the very top of the Elkhart "
                   "County Courthouse dome's spire finial -- Lisa's own framing is unaffected; "
                   "approved by Lisa, 18 August 2026, no change needed.",
        "deliveredDimensions": "1200x800",
        "provenance": "Lisa's own photograph. Full EXIF: Apple iPhone 16 Pro, 2026-07-22 19:55:45.",
    },
    "lisa-moving-to-goshen": {
        "source": "lisa/below-hero-photos raw upload 'lisa-moving-to-goshen.jpg', "
                   "blob 327a23258590943df0836bcd23d7aae982f9ae16",
        "placement": "/moving-to-goshen/ and /es/mudarse-a-goshen/, same insertion point "
                     "(.section-figure)",
        "cropBox": "(0, 336, 4032, 3024) -- same top-trim as the other three. DELIBERATE EXCEPTION: "
                   "this crop leaves the Goshen Theater marquee visible (dated show listing + "
                   "\"Interra\" sponsor credit). No top-trim crop can exclude it -- the marquee's "
                   "bottom edge (~y990) sits only 88px above Lisa's head top (~y1078) in the "
                   "3024px-tall source, so any crop that starts low enough to exclude the marquee "
                   "would also crop into her hair. Lisa's ruling, 18 August 2026: accept the "
                   "marquee as visible rather than use the only alternative (starting the crop at "
                   "y>=990, leaving ~35px of delivered headroom and discarding roughly half the "
                   "frame's width). RESPA governs copy and referral arrangements, not what is "
                   "legible in a background photograph -- the condition of this ruling is that the "
                   "alt text names none of it (no show title, no dates, no \"Interra,\" no "
                   "storefront names), verified against the approved alt string before wiring.",
        "deliveredDimensions": "1200x800",
        "provenance": "Lisa's own photograph. Full EXIF: Apple iPhone 16 Pro, 2026-07-22 20:19:35.",
    },
}


def process_one(slug, job):
    src_path = os.path.join(ROOT, f"{slug}.jpg")
    img = Image.open(src_path)
    img = img.crop(CROP_BOX)
    img = img.resize(DELIVER_SIZE, Image.LANCZOS)
    out_path = os.path.join(SECTIONS_DIR, f"{slug}.jpg")
    img.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    webp_path = os.path.join(SECTIONS_DIR, f"{slug}.webp")
    img.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    os.remove(src_path)
    return img.size, os.path.getsize(out_path)


def process_all():
    for slug, job in BELOW_HERO_JOBS.items():
        size, out_bytes = process_one(slug, job)
        print(f"{slug}: {size[0]}x{size[1]}  {out_bytes/1024:.0f}KB  -> assets/images/sections/{slug}.jpg (+.webp)")


if __name__ == "__main__":
    process_all()
