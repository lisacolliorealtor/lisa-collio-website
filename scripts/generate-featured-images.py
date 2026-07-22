#!/usr/bin/env python3
"""
Blog featured-image generator for lisacolliorealtor.com
=======================================================

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


if __name__ == "__main__":
    # Smoke test: one image
    bc, ls = variant_for(0)
    p = generate_header("hero-twilight-2.jpg",
                        "Is It a Good Time to Buy a Home in Goshen, Indiana?",
                        bc, ls, "_smoketest")
    print("wrote", p)
