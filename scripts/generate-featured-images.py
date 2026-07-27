#!/usr/bin/env python3
"""
Blog featured-image generator for lisacolliorealtor.com
=======================================================

SCOPE RULE (Master Plan v2.10, July 2026) — read before adding an image
----------------------------------------------------------------------
Text overlay and Lisa's cutout portrait are a SCOPED EXCEPTION, not the default.
They belong ONLY to the Buyers/Sellers content clusters: /buyers/, /sellers/,
/es/compradores/, /es/vendedores/ and the authority articles linked from those
four hub pages (the OVERLAY_SCOPE set below).

Everything else — Communities/Goshen/Elkhart, Meet Lisa, Next Chapter Method,
Market Stats, Contact, the homepage, and every future post outside the Buy/Sell
clusters, in both languages — gets a CLEAN photo: no band, no text, no cutout.
Use generate_clean(). The page's own H1 renders the title as normal HTML.

The overlay entry points enforce this: they raise on an out-of-scope slug rather
than compositing one. There is no rotation to track outside the exception —
with no color band there is no variant.

Separately, the Tier 1 page-hero component also uses Lisa's cutout. That is the
hero standard, not this one; the two are independently scoped and this file has
nothing to do with the hero.

Retroactive cleanup of already-built out-of-scope images is FLAGGED, never
auto-applied — see docs/FEATURED_IMAGE_OVERLAY_AUDIT.md. Do not regenerate a
clean image from a text-bearing one without Lisa's sign-off on the photo itself.

Composites a 1200x630 (Open Graph) social/featured image from three inputs:
  1. A house photo (from assets/images/homes-general/)
  2. An article title (rendered in Bricolage Grotesque to match the site)
  3. Lisa's cutout portrait (assets/images/lisa/lisa-collio-red-blazer-transparent.png)

Design (from Lisa's approved mockup):
  - Solid title bar across the TOP, article title in white, centered, bold.
      Two color variants alternating per article: RE/MAX Blue #003DA5 / Red #E60E16.
  - House photo fills the area below the title bar (object-fit: cover).
  - Lisa's cutout anchored to the bottom edge, ~55-65% of image height,
      alternating RIGHT / LEFT.
  - Titles wrap to 2-3 lines and auto-shrink so they never overflow/truncate.

Runs fully offline with Pillow — no paid services, no CDN calls.
Fonts: scripts/fonts/bricolage-grotesque-latin.ttf (converted from the site's
own self-hosted woff2; SIL OFL, see scripts/fonts/OFL.txt).

Usage:
  Called programmatically via generate_header(...) from the batch driver
  (see the __main__ block for a single-image smoke test).
"""
import os
from PIL import Image, ImageDraw, ImageFont

# ---- Paths ------------------------------------------------------------------
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_PATH = os.path.join(ROOT, "scripts", "fonts", "bricolage-grotesque-latin.ttf")
LISA_PATH = os.path.join(ROOT, "assets", "images", "lisa",
                         "lisa-collio-red-blazer-transparent.png")
HOMES_DIR = os.path.join(ROOT, "assets", "images", "homes-general")
OUT_DIR = os.path.join(ROOT, "assets", "images", "blog-headers")

# ---- Design constants -------------------------------------------------------
W, H = 1200, 630
BLUE = (0, 61, 165)      # #003DA5 RE/MAX Blue
RED = (230, 14, 22)      # #E60E16 RE/MAX Red
WHITE = (255, 255, 255)
BAR_PAD_X = 70           # horizontal padding inside the title bar
BAR_PAD_Y = 34           # vertical padding above/below the wrapped title
LINE_SPACING = 1.08      # line-height multiple
MAX_TITLE_LINES = 3
FONT_MAX = 62
FONT_MIN = 34
LISA_HEIGHT_FRAC = 0.62  # cutout height as fraction of image height

# ---- Overlay scope (Master Plan v2.10) --------------------------------------
# The ONLY slugs allowed to carry baked-in title text and/or Lisa's cutout.
# Derived from the /blog/ links actually present on the four hub pages:
#   /buyers/ (8) + /sellers/ (10) + /es/compradores/ (7) + /es/vendedores/ (10)
# which matches the Master Plan §11 drafted inventory exactly. When an article
# is added to or removed from one of those hubs, update this set in the same PR.
OVERLAY_SCOPE = {
    # /buyers/ — Buy a Home set
    "are-homes-goshen-indiana-competitive-to-buy",
    "elkhart-indiana-good-place-invest-real-estate",
    "how-to-compete-with-other-buyers-elkhart-indiana",
    "what-makes-goshen-indiana-desirable-place-to-live",
    "what-to-look-for-buying-home-elkhart-indiana",
    "what-to-prioritize-buying-house-goshen-indiana",
    "why-buy-home-elkhart-indiana-lisa-collio",
    "why-buy-home-goshen-indiana-lisa-collio",
    # /sellers/ — Sell a Home set
    "good-time-to-sell-home-elkhart-indiana",
    "how-long-to-sell-house-goshen-indiana",
    "how-much-is-my-home-elkhart-indiana-worth",
    "how-to-prepare-goshen-indiana-home-to-sell",
    "how-will-my-elkhart-indiana-home-be-marketed",
    "mistakes-to-avoid-selling-home-goshen-indiana",
    "sell-home-elkhart-indiana-best-price",   # added to /sellers/ 27 Jul (Lisa)
    "sell-home-goshen-indiana-best-price",
    "why-homes-elkhart-indiana-sit-on-market",
    "why-sell-home-elkhart-indiana-lisa-collio",
    "why-sell-home-goshen-indiana-lisa-collio",
    # /es/compradores/ — Cluster 1, Compradores Hispanohablantes
    "como-comprar-una-casa-en-indiana",
    "costos-de-cierre-que-son",
    "cuanto-dinero-necesito-para-comprar-una-casa",
    "errores-comunes-al-comprar-casa",
    "no-se-si-califico-credito-y-preaprobacion",
    "prestamos-fha-y-usda-en-espanol",
    "renta-o-compra-como-decidir",
    # /es/vendedores/ — Spanish seller set
    "buen-momento-vender-casa-elkhart",
    "como-se-promociona-mi-casa-elkhart",
    "cuanto-tiempo-vender-casa-goshen",
    "cuanto-vale-mi-casa-elkhart",
    "errores-evitar-vender-casa-goshen",
    "por-que-casas-elkhart-tardan-venderse",
    "preparar-casa-goshen-para-vender",
    "como-vender-casa-elkhart-mejor-precio",   # added to /es/vendedores/ 27 Jul (Lisa)
    "vender-casa-elkhart-lisa-collio",
    "vender-casa-goshen-lisa-collio",
    "vender-casa-goshen-mejor-precio",
}


def _require_overlay_scope(out_slug):
    """Overlay templates are Buyers/Sellers-only. Refuse anything else so the
    clean-photo default holds by construction, not by remembering.
    A leading underscore marks a throwaway dev/smoke-test slug and is allowed."""
    if out_slug.startswith("_") or out_slug in OVERLAY_SCOPE:
        return
    raise ValueError(
        f"'{out_slug}' is outside the Buyers/Sellers overlay scope "
        "(Master Plan v2.10). Featured images outside /buyers/, /sellers/, "
        "/es/compradores/, /es/vendedores/ and their linked authority articles "
        "carry no text and no cutout portrait — use generate_clean() instead. "
        "If this article really is linked from one of those four hubs, add its "
        "slug to OVERLAY_SCOPE in the same PR that links it."
    )


def _load_font(size):
    return ImageFont.truetype(FONT_PATH, size)


def _wrap(draw, text, font, max_width):
    """Greedy word-wrap; returns list of lines."""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _fit_title(draw, title, max_width):
    """Find the largest font size that wraps title into <= MAX_TITLE_LINES."""
    for size in range(FONT_MAX, FONT_MIN - 1, -2):
        font = _load_font(size)
        lines = _wrap(draw, title, font, max_width)
        if len(lines) <= MAX_TITLE_LINES:
            # also confirm the widest line actually fits
            if all(draw.textlength(ln, font=font) <= max_width for ln in lines):
                return font, lines, size
    # fell through: use smallest size, accept the wrap it gives
    font = _load_font(FONT_MIN)
    return font, _wrap(draw, title, font, max_width), FONT_MIN


def _cover(img, box_w, box_h):
    """object-fit: cover — scale+center-crop img to exactly box_w x box_h."""
    src_w, src_h = img.size
    scale = max(box_w / src_w, box_h / src_h)
    new_w, new_h = int(round(src_w * scale)), int(round(src_h * scale))
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - box_w) // 2
    top = (new_h - box_h) // 2
    return img.crop((left, top, left + box_w, box_h + top))


def generate_header(house_filename, title, bar_color, lisa_side, out_slug):
    """
    house_filename : file in assets/images/homes-general/ (jpg)
    title          : overlay text (article H1)
    bar_color      : 'blue' or 'red'
    lisa_side      : 'right' or 'left'
    out_slug       : output base name -> {out_slug}-header.jpg / .webp
    Returns the output .jpg path.
    """
    _require_overlay_scope(out_slug)
    color = BLUE if bar_color == "blue" else RED

    canvas = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(canvas)

    # --- Title bar height depends on wrapped line count ---
    max_text_w = W - 2 * BAR_PAD_X
    font, lines, size = _fit_title(draw, title, max_text_w)
    line_h = int(size * LINE_SPACING)
    bar_h = 2 * BAR_PAD_Y + line_h * len(lines)

    # --- House photo fills area below the bar (cover) ---
    house = Image.open(os.path.join(HOMES_DIR, house_filename)).convert("RGB")
    photo_h = H - bar_h
    house = _cover(house, W, photo_h)
    canvas.paste(house, (0, bar_h))

    # --- Lisa cutout, bottom-anchored, alternating side ---
    lisa = Image.open(LISA_PATH).convert("RGBA")
    target_h = int(H * LISA_HEIGHT_FRAC)
    scale = target_h / lisa.height
    lisa = lisa.resize((int(lisa.width * scale), target_h), Image.LANCZOS)
    margin = 24
    if lisa_side == "right":
        lx = W - lisa.width - margin
    else:
        lx = margin
    ly = H - lisa.height  # anchored to bottom edge
    canvas.paste(lisa, (lx, ly), lisa)

    # --- Title bar drawn LAST-but-under-text so it sits above the photo top ---
    draw.rectangle([0, 0, W, bar_h], fill=color)
    y = BAR_PAD_Y
    for ln in lines:
        tw = draw.textlength(ln, font=font)
        draw.text(((W - tw) / 2, y), ln, font=font, fill=WHITE)
        y += line_h

    os.makedirs(OUT_DIR, exist_ok=True)
    jpg_path = os.path.join(OUT_DIR, f"{out_slug}-header.jpg")
    webp_path = os.path.join(OUT_DIR, f"{out_slug}-header.webp")
    canvas.save(jpg_path, "JPEG", quality=88, optimize=True, progressive=True)
    canvas.save(webp_path, "WEBP", quality=85, method=6)
    return jpg_path


LISA_DIR = os.path.join(ROOT, "assets", "images", "lisa")


def _cover_focal(img, box_w, box_h, focal_y=0.5):
    """object-fit: cover, but choose the vertical crop window via focal_y
    (0.0 = keep the top, 0.5 = center, 1.0 = keep the bottom)."""
    src_w, src_h = img.size
    scale = max(box_w / src_w, box_h / src_h)
    new_w, new_h = int(round(src_w * scale)), int(round(src_h * scale))
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - box_w) // 2
    top = int(round((new_h - box_h) * focal_y))
    top = max(0, min(top, new_h - box_h))
    return img.crop((left, top, left + box_w, top + box_h))


def generate_lisa_header(photo_filename, title, bar_color, out_slug,
                         crop_box=None, focal_y=0.35):
    """Second template: a photo of Lisa fills the whole 1200x630 frame, with the
    title in a solid color band across the BOTTOM. No cutout overlay.

    photo_filename : file in assets/images/lisa/
    crop_box       : optional (l, t, r, b) as 0-1 fractions, pre-cropped before cover
    focal_y        : vertical focal point for the cover crop (keep Lisa's face high
                     so the bottom band never covers it). 0=top, 1=bottom.
    """
    _require_overlay_scope(out_slug)
    color = BLUE if bar_color == "blue" else RED
    canvas = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(canvas)

    max_text_w = W - 2 * BAR_PAD_X
    font, lines, size = _fit_title(draw, title, max_text_w)
    line_h = int(size * LINE_SPACING)
    band_h = 2 * BAR_PAD_Y + line_h * len(lines)

    photo = Image.open(os.path.join(LISA_DIR, photo_filename)).convert("RGB")
    if crop_box:
        w, h = photo.size
        l, t, r, b = crop_box
        photo = photo.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
    # photo fills the FULL frame; the band is drawn on top of the bottom edge
    photo = _cover_focal(photo, W, H, focal_y)
    canvas.paste(photo, (0, 0))

    # bottom band
    band_top = H - band_h
    draw.rectangle([0, band_top, W, H], fill=color)
    y = band_top + BAR_PAD_Y
    for ln in lines:
        tw = draw.textlength(ln, font=font)
        draw.text(((W - tw) / 2, y), ln, font=font, fill=WHITE)
        y += line_h

    os.makedirs(OUT_DIR, exist_ok=True)
    jpg_path = os.path.join(OUT_DIR, f"{out_slug}-header.jpg")
    canvas.save(jpg_path, "JPEG", quality=88, optimize=True, progressive=True)
    canvas.save(os.path.join(OUT_DIR, f"{out_slug}-header.webp"), "WEBP", quality=85, method=6)
    return jpg_path


# Variant rotation: no two consecutive articles identical.
# art0=blue+right, art1=red+left, art2=blue+left, art3=red+right, repeating.
VARIANTS = [("blue", "right"), ("red", "left"), ("blue", "left"), ("red", "right")]


def variant_for(index):
    return VARIANTS[index % len(VARIANTS)]


# =====================================================================
# PR 24 — Featured-image standard (three templates, never cover a face)
# ---------------------------------------------------------------------
# Template A = generate_header() above (houses; 1200x630 overlay).
# Template B = LANDSCAPE/square people photos (1200x900: photo 1200x700 on
#   top, solid color band 1200x200 at bottom — nothing overlaps the photo).
# Template C = PORTRAIT people photos (1200x900: photo 600x900 on one side,
#   solid color panel 600x900 with the title on the other).
# Every B/C article also gets a 1200x630 "-og.jpg" for social meta.
# =====================================================================

def _cover_focal2(img, box_w, box_h, focal_x=0.5, focal_y=0.5):
    """object-fit: cover with independent horizontal + vertical focal points."""
    sw, sh = img.size
    scale = max(box_w / sw, box_h / sh)
    nw, nh = int(round(sw * scale)), int(round(sh * scale))
    img = img.resize((nw, nh), Image.LANCZOS)
    left = max(0, min(int(round((nw - box_w) * focal_x)), nw - box_w))
    top = max(0, min(int(round((nh - box_h) * focal_y)), nh - box_h))
    return img.crop((left, top, left + box_w, top + box_h))


def _fit_box(draw, title, max_w, max_h, size_max=FONT_MAX, size_min=26):
    """Largest font size whose wrapped title fits BOTH max_w and max_h."""
    for size in range(size_max, size_min - 1, -2):
        font = _load_font(size)
        lines = _wrap(draw, title, font, max_w)
        line_h = int(size * LINE_SPACING)
        if line_h * len(lines) <= max_h and all(
                draw.textlength(ln, font=font) <= max_w for ln in lines):
            return font, lines, size
    font = _load_font(size_min)
    return font, _wrap(draw, title, font, max_w), size_min


def _load_people(photo_filename, crop_box):
    photo = Image.open(os.path.join(LISA_DIR, photo_filename)).convert("RGB")
    if crop_box:
        w, h = photo.size
        l, t, r, b = crop_box
        photo = photo.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
    return photo


def _save(canvas, out_slug, suffix):
    os.makedirs(OUT_DIR, exist_ok=True)
    jpg = os.path.join(OUT_DIR, f"{out_slug}-{suffix}.jpg")
    canvas.save(jpg, "JPEG", quality=88, optimize=True, progressive=True)
    canvas.save(os.path.join(OUT_DIR, f"{out_slug}-{suffix}.webp"), "WEBP", quality=85, method=6)
    return jpg


def generate_template_b(photo_filename, title, color_name, out_slug,
                        crop_box=None, focal_y=0.0):
    """Landscape/square people photo. 1200x900: photo top 1200x700 (cover,
    anchored high), solid color band bottom 1200x200 with the title."""
    _require_overlay_scope(out_slug)
    color = BLUE if color_name == "blue" else RED
    BW, BH, PHOTO_H = 1200, 900, 700
    canvas = Image.new("RGB", (BW, BH), color)   # bottom band shows through
    draw = ImageDraw.Draw(canvas)
    photo = _load_people(photo_filename, crop_box)
    canvas.paste(_cover_focal(photo, BW, PHOTO_H, focal_y), (0, 0))
    font, lines, size = _fit_box(draw, title, BW - 2 * BAR_PAD_X, (BH - PHOTO_H) - 30)
    line_h = int(size * LINE_SPACING)
    y = PHOTO_H + ((BH - PHOTO_H) - line_h * len(lines)) // 2
    for ln in lines:
        tw = draw.textlength(ln, font=font)
        draw.text(((BW - tw) / 2, y), ln, font=font, fill=WHITE)
        y += line_h
    return _save(canvas, out_slug, "header")


def generate_template_c(photo_filename, title, color_name, side, out_slug,
                        crop_box=None, focal_x=0.5, focal_y=0.5):
    """Portrait people photo. 1200x900: photo 600x900 on `side`, solid color
    panel 600x900 on the other side with the vertically-centered title."""
    _require_overlay_scope(out_slug)
    color = BLUE if color_name == "blue" else RED
    BW, BH, HALF = 1200, 900, 600
    canvas = Image.new("RGB", (BW, BH), color)
    draw = ImageDraw.Draw(canvas)
    photo = _load_people(photo_filename, crop_box)
    photo = _cover_focal2(photo, HALF, BH, focal_x, focal_y)
    photo_x = 0 if side == "left" else HALF
    panel_x = HALF if side == "left" else 0
    canvas.paste(photo, (photo_x, 0))
    pad = 44
    font, lines, size = _fit_box(draw, title, HALF - 2 * pad, BH - 2 * 60)
    line_h = int(size * LINE_SPACING)
    y = (BH - line_h * len(lines)) // 2
    for ln in lines:
        tw = draw.textlength(ln, font=font)
        draw.text((panel_x + (HALF - tw) / 2, y), ln, font=font, fill=WHITE)
        y += line_h
    return _save(canvas, out_slug, "header")


def generate_og(photo_filename, title, color_name, out_slug,
                crop_box=None, focal_y=0.5):
    """1200x630 social version (Template A-style top band overlay) for the
    B/C people articles, so og:image/twitter:image never crop off the band."""
    _require_overlay_scope(out_slug)
    color = BLUE if color_name == "blue" else RED
    canvas = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(canvas)
    photo = _load_people(photo_filename, crop_box)
    canvas.paste(_cover_focal(photo, W, H, focal_y), (0, 0))
    font, lines, size = _fit_box(draw, title, W - 2 * BAR_PAD_X, H // 2)
    line_h = int(size * LINE_SPACING)
    band_h = 2 * BAR_PAD_Y + line_h * len(lines)
    draw.rectangle([0, 0, W, band_h], fill=color)
    y = BAR_PAD_Y
    for ln in lines:
        tw = draw.textlength(ln, font=font)
        draw.text(((W - tw) / 2, y), ln, font=font, fill=WHITE)
        y += line_h
    return _save(canvas, out_slug, "og")


# =====================================================================
# THE DEFAULT — clean photos (everything outside OVERLAY_SCOPE)
# ---------------------------------------------------------------------
# Master Plan v2.10: no band, no title, no cutout. The page's own H1 is the
# title. Nothing here composites anything onto the photograph; it only crops
# and resizes, so a clean source photo stays a clean photo.
# =====================================================================

THUMB_W, THUMB_H = 800, 420   # 1.9:1, matches the existing card/grid ratio


def generate_clean(photo_path, out_slug, focal_y=0.5, crop_box=None, thumb=True):
    """Clean featured image: 1200x630 cover-crop of the source photo, plus the
    800x420 card thumbnail. .webp beside every .jpg. No overlay of any kind.

    photo_path : path to the source photo, absolute or relative to the repo root
                 (any assets/images/ subfolder — houses, places, people alike)
    focal_y    : vertical focal point for the crop, 0=keep the top, 1=keep the
                 bottom. On people photos, keep faces in frame.
    crop_box   : optional (l, t, r, b) as 0-1 fractions, applied before the cover
                 crop. Use it when the source itself carries text that must stay
                 out of frame — a branded headshot's logo strip, or one panel of
                 a marketing collage. A clean image means no text in the final
                 frame, whether that text was composited by this script or was
                 already burned into the photograph.
    """
    src = photo_path if os.path.isabs(photo_path) else os.path.join(ROOT, photo_path)
    photo = Image.open(src).convert("RGB")
    if crop_box:
        w, h = photo.size
        l, t, r, b = crop_box
        photo = photo.crop((int(l * w), int(t * h), int(r * w), int(b * h)))

    header = _cover_focal(photo, W, H, focal_y)
    jpg = _save(header, out_slug, "header")
    if thumb:
        _save(_cover_focal(photo, THUMB_W, THUMB_H, focal_y), out_slug, "thumb")
    return jpg


# Clean replacements built so far, recorded so the mapping is reproducible
# rather than living in one session's scrollback. slug -> (source photo,
# focal_y, crop_box). Run `python3 scripts/generate-featured-images.py --clean`
# to rebuild them byte-for-byte.
#
# Note on crop_box here: two of these source photos carry text of their own —
# the branded headshot has a RE/MAX lockup and a "Lisa Collio REALTOR®" script
# logo across the top, and the awards photo is a three-panel collage whose right
# panel is a "100% CLUB / 2023 RE/MAX AWARDS" graphic. Framing crops that text
# out. A clean image means no text in the final frame, wherever it came from.
# Sentinel for a job whose framing is taken from the existing Template B
# composite rather than re-derived from the source photo. Legitimate only for
# B/C, where the colour band sits beside or below the photo and never overlaps
# it — so the photo region is the untouched photograph, not a flattened overlay.
FROM_COMPOSITE = "<from-composite>"


def generate_clean_from_composite(out_slug, thumb=True):
    """Rebuild a clean image from the photo region of an existing Template B
    composite (top 1200x700 of a 1200x900 file). Used where the original crop
    was hand-framed and guessing it would change the composition."""
    comp = Image.open(os.path.join(OUT_DIR, f"{out_slug}-header.jpg")).convert("RGB")
    if comp.size != (1200, 900):
        raise ValueError(f"{out_slug}: expected a 1200x900 Template B composite, "
                         f"got {comp.size} — do not use FROM_COMPOSITE here.")
    photo = comp.crop((0, 0, 1200, 700))
    jpg = _save(_cover_focal(photo, W, H, 0.5), out_slug, "header")
    if thumb:
        _save(_cover_focal(photo, THUMB_W, THUMB_H, 0.5), out_slug, "thumb")
    return jpg


CLEAN_JOBS = {
    # --- Group 1: Template A house photos, source already clean in homes-general/
    "buying-an-older-home-in-elkhart-indiana":
        ("assets/images/homes-general/exterior-ranch-rear-leafy-yard-fence.jpg", 0.5, None),
    "buying-an-older-home-in-goshen-indiana":
        ("assets/images/homes-general/exterior-covered-porch-framing-rural-view.jpg", 0.5, None),
    "centro-de-elkhart-indiana":
        ("assets/images/homes-general/twilight-exterior-split-level-green-shutters.jpg", 0.5, None),
    "community-events-in-elkhart-indiana":
        ("assets/images/homes-general/exterior-backyard-privacy-fence-chairs.jpg", 0.5, None),
    "community-events-in-goshen-indiana":
        ("assets/images/homes-general/exterior-two-story-rear-covered-porch.jpg", 0.5, None),
    "comprar-casa-antigua-elkhart-indiana":
        ("assets/images/homes-general/exterior-ranch-rear-leafy-yard-fence.jpg", 0.5, None),
    "comprar-casa-antigua-goshen-indiana":
        ("assets/images/homes-general/exterior-red-wood-deck-backyard.jpg", 0.5, None),
    "cost-of-living-in-elkhart-indiana":
        ("assets/images/homes-general/interior-kitchen-oak-cabinets-open-layout.jpg", 0.5, None),
    "cost-of-living-in-goshen-indiana":
        ("assets/images/homes-general/exterior-single-story-ranch-driveway.jpg", 0.5, None),
    "costo-de-vida-elkhart-indiana":
        ("assets/images/homes-general/exterior-single-story-ranch-driveway.jpg", 0.5, None),
    "costo-de-vida-goshen-indiana":
        ("assets/images/homes-general/exterior-backyard-playset-shed-winter.jpg", 0.5, None),
    "downtown-elkhart-indiana":
        ("assets/images/homes-general/exterior-home-side-wood-deck-lawn.jpg", 0.5, None),
    "downtown-goshen-indiana":
        ("assets/images/homes-general/exterior-wooded-backyard-swing-set-fire-pit.jpg", 0.5, None),
    "elkhart-indiana-industries-employers":
        ("assets/images/homes-general/exterior-open-acreage-field-trees.jpg", 0.5, None),
    "elkhart-indiana-landmarks-amenities":
        ("assets/images/homes-general/exterior-backyard-shrub-lawn-trees.jpg", 0.5, None),
    "elkhart-indiana-school-districts":
        ("assets/images/homes-general/exterior-large-lawn-mature-trees.jpg", 0.5, None),
    "eventos-comunitarios-elkhart-indiana":
        ("assets/images/homes-general/exterior-covered-brick-porch-hanging-chair.jpg", 0.5, None),
    "eventos-comunitarios-goshen-indiana":
        ("assets/images/homes-general/exterior-backyard-privacy-fence-chairs.jpg", 0.5, None),
    "good-time-to-buy-home-goshen-indiana":
        ("assets/images/homes-general/exterior-covered-brick-porch-hanging-chair.jpg", 0.5, None),
    "goshen-indiana-industries-employers":
        ("assets/images/homes-general/exterior-red-wood-deck-backyard.jpg", 0.5, None),
    "goshen-indiana-landmarks-amenities":
        ("assets/images/homes-general/interior-living-room-stone-fireplace-wall.jpg", 0.5, None),
    "goshen-indiana-school-district":
        ("assets/images/homes-general/exterior-home-rear-deck-stairs-fenced.jpg", 0.5, None),
    "industria-rv-comprar-casa-goshen-indiana":
        ("assets/images/homes-general/exterior-backyard-deck-fenced-trees.jpg", 0.5, None),
    "living-in-elkhart-guide":
        ("assets/images/homes-general/exterior-covered-brick-porch-hanging-chair.jpg", 0.5, None),
    "living-in-goshen-guide":
        ("assets/images/homes-general/hero-twilight-1.jpg", 0.5, None),
    "moving-to-elkhart":
        ("assets/images/homes-general/twilight-exterior-two-story-brick-garage.jpg", 0.5, None),
    "moving-to-elkhart-indiana-from-out-of-state":
        ("assets/images/homes-general/hero-twilight-2.jpg", 0.5, None),
    "mudarse-a-elkhart":
        ("assets/images/homes-general/twilight-exterior-two-story-brick-garage.jpg", 0.5, None),
    "mudarse-a-elkhart-indiana-desde-otro-estado":
        ("assets/images/homes-general/twilight-exterior-two-story-brick-garage.jpg", 0.5, None),
    "mudarse-a-goshen-desde-otro-estado":
        ("assets/images/homes-general/exterior-home-rear-deck-stairs-fenced.jpg", 0.5, None),
    "que-hacer-en-elkhart-indiana":
        ("assets/images/homes-general/exterior-large-lawn-mature-trees.jpg", 0.5, None),
    "que-hacer-en-goshen-indiana":
        ("assets/images/homes-general/exterior-backyard-shrub-lawn-trees.jpg", 0.5, None),
    "rv-industry-buying-a-home-goshen-indiana":
        ("assets/images/homes-general/exterior-ranch-rear-leafy-yard-fence.jpg", 0.5, None),
    "things-to-do-in-elkhart-indiana":
        ("assets/images/homes-general/exterior-backyard-deck-fenced-trees.jpg", 0.5, None),
    "things-to-do-in-goshen-indiana":
        ("assets/images/homes-general/exterior-large-lawn-mature-trees.jpg", 0.5, None),
    "trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana":
        ("assets/images/homes-general/exterior-home-side-wood-deck-lawn.jpg", 0.5, None),
    "viviendo-en-elkhart":
        ("assets/images/homes-general/exterior-covered-brick-porch-hanging-chair.jpg", 0.5, None),
    "viviendo-en-goshen":
        ("assets/images/homes-general/hero-twilight-1.jpg", 0.5, None),
    "what-is-an-sres-seniors-real-estate-specialist":
        ("assets/images/homes-general/interior-kitchen-cherry-cabinets-stainless.jpg", 0.5, None),
    "what-is-elkhart-indiana-known-for":
        ("assets/images/homes-general/exterior-two-story-rear-covered-porch.jpg", 0.5, None),
    "what-is-goshen-indiana-known-for":
        ("assets/images/homes-general/exterior-backyard-playset-shed-winter.jpg", 0.5, None),
    "working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana":
        ("assets/images/homes-general/exterior-backyard-lawn-metal-shed.jpg", 0.5, None),

    # --- Group 2: Meet Lisa / brand people photos
    "why-lisa-collio-became-real-estate-agent":
        ("assets/images/lisa/lisa-collio-holiday-lights-portrait-2.jpg", 0.30, None),
    "moving-to-goshen-indiana-from-out-of-state":
        ("assets/images/lisa/lisa-collio-for-sale-sign-summer.jpg", 0.35, None),
    # These two were framed by hand in the original composite. Rather than guess
    # the crop, take the photo region straight out of the Template B composite:
    # in B the colour band sits BELOW the photo and never overlaps it, so that
    # region is the untouched photograph. Source noted for a future hi-res redo.
    "does-lisa-collio-speak-spanish":
        (FROM_COMPOSITE, 0.5, None),   # lisa/lisa-collio-headshot-red-top.jpg
    "lisa-collio-helps-seniors-families-downsize":
        (FROM_COMPOSITE, 0.5, None),   # lisa/lisa-collio-seniors-expo-booth.jpg

    # --- Group 3: Goshen pillars. Lisa's decision, 27 July: swap off the
    # address-folder sold-property photo onto a decorative homes-general one,
    # sidestepping the consent-recordkeeping question rather than verifying it.
    "moving-to-goshen":
        ("assets/images/homes-general/exterior-open-acreage-field-trees.jpg", 0.5, None),
    "mudarse-a-goshen":
        ("assets/images/homes-general/exterior-open-acreage-field-trees.jpg", 0.5, None),
}


def build_clean_jobs():
    for slug, (src, focal_y, crop_box) in CLEAN_JOBS.items():
        if src is FROM_COMPOSITE or src == FROM_COMPOSITE:
            print(generate_clean_from_composite(slug))
        else:
            print(generate_clean(src, slug, focal_y=focal_y, crop_box=crop_box))


if __name__ == "__main__":
    import sys
    if "--clean" in sys.argv:
        build_clean_jobs()
        raise SystemExit(0)

    # Smoke test: one image
    bc, ls = variant_for(0)
    p = generate_header("hero-twilight-2.jpg",
                        "Is It a Good Time to Buy a Home in Goshen, Indiana?",
                        bc, ls, "_smoketest")
    print("wrote", p)
