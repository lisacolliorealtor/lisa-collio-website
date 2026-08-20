#!/usr/bin/env python3
"""Build record + processor for the Meet Lisa page image batch (19 August 2026).

Every artifact this batch ships has a row in MEET_LISA_JOBS below, stating its
source, its crop box in SOURCE pixels, its delivery size, and its destination.
Re-running this script reproduces every delivered file exactly. That is the
Build Record Standard: no asset ships without a record of how it was made.

Why a separate table rather than SECTION_JOBS or CLEAN_JOBS: `audit.js` check 22
reconciles SECTION_JOBS against assets/images/sections/ by set difference, per
source folder. These artifacts live in lisa/, client-general/ and
about/why-clients-trust-cards/, so adding them to SECTION_JOBS would make that
check compare two unrelated sets and fail. Check 23 reads both tables as its
source of truth for "same photograph"; this table follows the same shape so it
can be added there if that check is ever widened.

Sources stay in assets/images/meet-lisa/ under their uploaded names, unreferenced
by any page — the same arrangement as assets/images/goshen/ and elkhart/, whose
sources sit beside the derived files in assets/images/sections/.

Crop policy for this batch, decided by Lisa 19 August 2026 after reviewing
rendered proofs: a crop must keep every face fully visible AND every object the
approved alt text names (the "Best Realtor Ever" sign, the "Guiding Seniors with
Experience and Care" banner, the RE/MAX Results yard sign). The second half of
that rule was added mid-review — a crop that drops a named object leaves the alt
text describing something absent from the picture, which passes every wording
check and fails correspondence.

Delivery widths are set from MEASURED rendered slot widths, not from the
file-size conventions already in the repo:
    FAQ image (.faq-item__media img)   350px max (mobile) -> 2x needs  700px
    body photo (.media-row__media img) 419px max          -> 2x needs  838px
    below-hero (.section-figure)       740px max          -> 2x needs 1480px
    card illustration (.info-card__img) 358px max         -> 2x needs  716px
Two files are delivered at their native size on Lisa's instruction because they
already clear 2x at their slot and upscaling them buys nothing:
`family-and-community.jpg` (960x640, 2.29x at 419px) and the working-with-Lisa
FAQ crop (700x368, 2.00x at 350px).

Client photographs go in a meet-lisa/ SUBFOLDER of client-general/, not in
client-general/ itself. That is not tidiness: build-reviews.js:83 enumerates
every .webp sitting directly in assets/images/client-general/ and uses that
sorted list as the pool for review-block Box 3, the standalone client photo
that ships on 104 pages. Three files dropped into the folder root silently
joined that pool and shifted the rotation everywhere — caught by
`node build-reviews.js --check`, invisible to every other check and to the
diff. readdirSync is not recursive and the filter is .endsWith(".webp"), so a
subdirectory is excluded by construction while the files still live under
client-general/ as instructed.
"""

import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "images", "meet-lisa")

JPEG_Q = 88
WEBP_Q = 82

# slug -> dict(src, dest, crop, width, kind)
#   crop:  (left, top, right, bottom) in SOURCE pixels, or None for no crop
#   width: delivered width in px, or None to keep the source width unchanged
#   kind:  "photo" (.jpg + .webp) or "illustration" (.png + .webp)
MEET_LISA_JOBS = {
    # --- below the hero, both languages. NO CROP: .section-figure is
    # height:auto and existing uses run 1200x630 through 1080x1080, so nothing
    # forces an aspect on it. Four faces, none at risk. 1600px wide gives 2.16x
    # at the measured 740px slot; the repo's usual 1200 would be only 1.62x.
    "meet-lisa-family-graduation": dict(
        src="updated-meet-lisa-hero.jpg", dest="lisa",
        crop=None, width=1600, kind="photo"),

    # --- Awards & Recognition. Replaces lisa-collio-executive-club-medal.jpg
    # (414x414) in the stacked media slot; the trophy-wall photo above it stays.
    # Lisa's framing used as-is per instruction 2.2 — no crop.
    "lisa-collio-100-club-medal": dict(
        src="awards.jpeg", dest="lisa",
        crop=None, width=900, kind="photo"),

    # --- three body photographs, media-row, alternating via .media-row--flip
    "lisa-collio-title-rep-sold-sign": dict(
        src="english-real-estate-professional.jpeg", dest="lisa",
        crop=None, width=1200, kind="photo"),
    # native 960x640: 2.29x at the 419px slot, so no resize (Lisa, 19 Aug)
    "lisa-collio-community-picture-book": dict(
        src="family-and-community.jpg", dest="lisa",
        crop=None, width=None, kind="photo"),
    "lisa-collio-clients-after-closing": dict(
        src="real-estate-experience.jpeg", dest="client-general/meet-lisa",
        crop=None, width=1200, kind="photo"),

    # --- five FAQ images, 1.9:1. NEW FILES, not replacements: the slots
    # previously pointed at assets/images/blog-headers/*-thumb.jpg, which the
    # /blog/ listing cards also use. Repointing /about/ at these leaves the blog
    # untouched (Lisa, 19 Aug) — replacing under the old filenames would have
    # changed the blog with no diff to show for it.
    #
    # The only horizontally-cropped job in the batch. A full-width 1.9:1 crop of
    # this 3024x4032 portrait keeps 39% of the height and leaves both subjects
    # unreadable at the 350px the slot actually renders at — verified on a
    # rendered proof, not assumed. "B-tight" keeps both RE/MAX banners in frame,
    # which the alt text's "RE/MAX Results awards event" needs; a tighter variant
    # was rejected for cutting them to slivers.
    "meet-lisa-faq-homes-sold": dict(
        src="how-many-homes.jpeg", dest="lisa",
        crop=(550, 1004, 2424, 1988), width=800, kind="photo"),
    # vertical-only crop, full source width kept — no face can be lost sideways
    "meet-lisa-faq-why-clients-choose": dict(
        src="why-do-clients-choose-lisa-collio-as-their-real-estate-agent.jpeg",
        dest="client-general/meet-lisa",
        crop=(0, 272, 4032, 2389), width=800, kind="photo"),
    "meet-lisa-faq-seniors": dict(
        src="how-does-lisa-collio-help-seniors.jpeg", dest="lisa",
        crop=(0, 393, 4032, 2510), width=800, kind="photo"),
    "meet-lisa-faq-spanish": dict(
        src="does-lisa-collio-speak-spanish.jpg", dest="client-general/meet-lisa",
        crop=(0, 351, 2726, 1782), width=800, kind="photo"),
    # native 700x368 after crop: 2.00x at the 350px slot, so no upscale
    # (Lisa, 19 Aug). Rendered against an upscaled-to-800 variant first; the two
    # were indistinguishable at slot size.
    "meet-lisa-faq-working-with-lisa": dict(
        src="what-is-it-like-to-work-with-lisa-collio-as-a-buyer-or-seller.jpg",
        dest="lisa",
        crop=(0, 60, 700, 428), width=None, kind="photo"),

    # --- six AI-generated illustrations for the "Why Clients Trust Lisa Collio"
    # info-cards, three per language. Same artwork, translated baked-in text.
    # Folder and treatment follow the Buyers page precedent exactly
    # (assets/images/buyers/why-work-with-lisa-cards/{en,es}/): PNG kept as the
    # <picture> fallback, WebP beside it, 1080px wide.
    "client-focused-guidance": dict(
        src="client-focused-guidance.png", dest="about/why-clients-trust-cards/en",
        crop=None, width=1080, kind="illustration"),
    "strategic-real-estate-expertise": dict(
        src="strategic-real-estate-expertise.png", dest="about/why-clients-trust-cards/en",
        crop=None, width=1080, kind="illustration"),
    "long-term-relationships": dict(
        src="long-term-relationships.png", dest="about/why-clients-trust-cards/en",
        crop=None, width=1080, kind="illustration"),
    "orientacion-centrada-en-el-cliente": dict(
        src="orientacion-centrada-en-el-cliente.png", dest="about/why-clients-trust-cards/es",
        crop=None, width=1080, kind="illustration"),
    "experiencia-estrategica-en-bienes-raices": dict(
        src="experiencia-estrategica-en-bienes-raices.png", dest="about/why-clients-trust-cards/es",
        crop=None, width=1080, kind="illustration"),
    "relaciones-a-largo-plazo": dict(
        src="relaciones-a-largo-plazo.png", dest="about/why-clients-trust-cards/es",
        crop=None, width=1080, kind="illustration"),
}

# Uploaded to the branch but deliberately not placed. Recorded rather than
# deleted, so a future reconciliation does not read the absence as a gap.
UNPLACED = {}


def build(check_only=False):
    rows, problems = [], []
    for slug, job in MEET_LISA_JOBS.items():
        src_path = os.path.join(SRC, job["src"])
        if not os.path.exists(src_path):
            problems.append(f"{slug}: source missing — {job['src']}")
            continue
        im = Image.open(src_path)
        sw, sh = im.size
        if job["crop"]:
            l, t, r, b = job["crop"]
            if r > sw or b > sh:
                problems.append(f"{slug}: crop {job['crop']} exceeds source {sw}x{sh}")
                continue
            im = im.crop(job["crop"])
        w0, h0 = im.size
        if job["width"] and job["width"] != w0:
            im = im.resize((job["width"], round(h0 * job["width"] / w0)), Image.LANCZOS)
        w, h = im.size

        out_dir = os.path.join(ROOT, "assets", "images", job["dest"])
        ext = "jpg" if job["kind"] == "photo" else "png"
        jpg_p = os.path.join(out_dir, f"{slug}.{ext}")
        web_p = os.path.join(out_dir, f"{slug}.webp")
        if not check_only:
            os.makedirs(out_dir, exist_ok=True)
            if job["kind"] == "photo":
                im.convert("RGB").save(jpg_p, "JPEG", quality=JPEG_Q, optimize=True)
            else:
                im.save(jpg_p, "PNG", optimize=True)
            im.save(web_p, "WEBP", quality=WEBP_Q, method=6)
        rows.append((slug, job, f"{sw}x{sh}", f"{w}x{h}", jpg_p, web_p))

    print(f"{'slug':<42} {'source':<12} {'delivered':<11} {'primary':>9} {'webp':>9}")
    tot_p = tot_w = 0
    for slug, job, ssz, dsz, jp, wp in rows:
        p = os.path.getsize(jp) if os.path.exists(jp) else 0
        w = os.path.getsize(wp) if os.path.exists(wp) else 0
        tot_p += p
        tot_w += w
        print(f"{slug:<42} {ssz:<12} {dsz:<11} {p/1024:8.1f}K {w/1024:8.1f}K")
    print(f"\n{len(rows)} artifact(s) x 2 formats = {len(rows)*2} files")
    print(f"primary total {tot_p/1024/1024:.2f} MB · webp total {tot_w/1024/1024:.2f} MB")

    # Batch reconciliation by set difference, never a running total (check 22's rule).
    srcs = {f for f in os.listdir(SRC) if not f.startswith(".")}
    used = {j["src"] for j in MEET_LISA_JOBS.values()}
    print(f"\nReconciliation — sources {len(srcs)}, referenced by a job {len(used)}, "
          f"recorded unplaced {len(UNPLACED)}, artifacts {len(rows)}")
    for f in sorted(srcs - used - set(UNPLACED)):
        problems.append(f"source in folder but in no job and not recorded unplaced: {f}")
    for f in sorted(used - srcs):
        problems.append(f"job references a source not in the folder: {f}")

    if problems:
        print("\nPROBLEMS:")
        for p in problems:
            print("  -", p)
        return 1
    print("Reconciliation clean: sources - unplaced = jobs = artifacts, by set difference.")
    return 0


if __name__ == "__main__":
    sys.exit(build(check_only="--check" in sys.argv))
