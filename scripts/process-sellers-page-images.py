#!/usr/bin/env python3
"""
process-sellers-page-images.py -- processes the Sellers page's body images
(why-homeowners-choose-lisa-cards, process, preparing-your-home-for-sale,
key-steps, and the Section A "most-people" marketing composite), and records
their build jobs (Build Record Standard).

First batch, 18 August 2026: 27 images supplied on branch
lisa/sellers-page-images (GitHub web upload, flat -- moved into
assets/images/sellers/{process,preparing-your-home-for-sale,key-steps,
why-homeowners-choose-lisa-cards/{en,es}}/ via git mv, same convention as the
Buyers batch). 26 of the 27 ship in this batch; the 27th,
la-mayoria-de-las-personas.jpg, is withheld -- its baked-in CTA banner text
("LIST YOUR / HOME WITH ME TODAY!") is English, left untranslated on what was
meant to be the Spanish "Just Sold" composite. Same bilingual-purity gap
already logged once for the Buyers batch (get-pre-approved-first-es.png) --
this is a second instance, not a new open item. Lisa's ruling, 18 August
2026: /es/vendedores/'s Section A intro ships without an image for now; a
Spanish re-export is a follow-up.

Processing convention matches process-home-body-images.py: the 25
illustration PNGs (why-homeowners cards, process, preparing-your-home,
key-steps) carry an alpha channel (rounded-corner cutouts) and are re-saved
as optimized PNG in place (Pillow, optimize=True) -- NOT converted to JPEG,
since that would lose the alpha -- matching the Buyers precedent. WEBP
siblings generated for all 26 shipped files (Pillow, quality 82), matching
the Buyers batch's WEBP-for-all-new-files convention (not the JPEG-only
.local-card__img pattern, since these are full-size section/card
illustrations, not small path-card thumbnails).

most-people.jpg is the one non-illustration file -- a photographic "Just
Sold" composite (Lisa's cutout + the 1765 N Bay Drive twilight hero photo +
generated text/logo elements). Re-saved as JPEG q88 optimize+progressive,
matching the .section-figure convention used elsewhere on this site, plus a
WEBP sibling.
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SELLERS_DIR = os.path.join(ROOT, "assets", "images", "sellers")
WEBP_QUALITY = 82

# SELLERS_JOBS -- Build Record Standard: every generated/placed asset gets a
# recorded source, parameters, and reproduction path. "source" is the raw
# upload's original flat-upload filename on lisa/sellers-page-images, before
# this script's PNG-optimize/WEBP-generate pass.
SELLERS_JOBS = {
    "why-homeowners-choose-lisa-cards/en/strategic-pricing-from-the-start": {
        "source": "lisa/sellers-page-images raw upload 'strategic-pricing-from-the-start.png' -> "
                   "git mv into assets/images/sellers/why-homeowners-choose-lisa-cards/en/ -> "
                   "process-sellers-page-images.py (PNG re-optimize, optimize=True; WEBP q82)",
        "placement": "'Why Homeowners Choose Lisa Collio' info-card, H3 'Strategic Pricing From the Start' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- UNDER the 1200px floor. Same shortfall pattern as the "
                                "Buyers why-work-with-lisa-cards batch; shipped per the same standing "
                                "exception (phone-majority traffic).",
    },
    "why-homeowners-choose-lisa-cards/en/professional-marketing": {
        "source": "lisa/sellers-page-images raw upload 'professional-marketing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Why Homeowners Choose Lisa Collio' info-card, H3 'Professional Marketing That Creates Exposure' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/en/clear-communication": {
        "source": "lisa/sellers-page-images raw upload 'clear-communication.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Why Homeowners Choose Lisa Collio' info-card, H3 'Clear Communication Throughout the Process' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/en/strong-negotiation-skills": {
        "source": "lisa/sellers-page-images raw upload 'strong-negotiation-skills.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Why Homeowners Choose Lisa Collio' info-card, H3 'Strong Negotiation Skills' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/en/guidance-to-closing": {
        "source": "lisa/sellers-page-images raw upload 'guidance-to-closing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Why Homeowners Choose Lisa Collio' info-card, H3 'Guidance to Closing' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/es/precio-estrategico": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/precio-estrategico.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Por qué los propietarios eligen a Lisa Collio' info-card, H3 'Precio estratégico desde el primer día' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/es/mercadeo-profesional": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/mercadeo-profesional.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Por qué los propietarios eligen a Lisa Collio' info-card, H3 'Mercadeo profesional que genera exposición' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/es/comunicacion-clara": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/comunicacion-clara.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Por qué los propietarios eligen a Lisa Collio' info-card, H3 'Comunicación clara durante todo el proceso' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/es/negociacion-firme": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/negociacion-firme.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Por qué los propietarios eligen a Lisa Collio' info-card, H3 'Negociación firme' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "why-homeowners-choose-lisa-cards/es/acompanamiento-hasta-el-cierre": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/acompanamiento-hasta-el-cierre.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Por qué los propietarios eligen a Lisa Collio' info-card, H3 'Acompañamiento hasta el cierre' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor, same exception as above.",
    },
    "process/1-consultation": {
        "source": "lisa/sellers-page-images raw upload ' 1-Consultation.png' (leading-space filename, "
                   "corrected in the move) -> git mv -> process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 01, 'Consultation' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/2-pricing": {
        "source": "lisa/sellers-page-images raw upload '2-Pricing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 02, 'Pricing' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/3-preparation": {
        "source": "lisa/sellers-page-images raw upload '3-Preparation.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 03, 'Preparation' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/4-marketing": {
        "source": "lisa/sellers-page-images raw upload '4-Marketing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 04, 'Marketing' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/5-showing": {
        "source": "lisa/sellers-page-images raw upload '5-Showing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 05, 'Showing' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/6-negotiation": {
        "source": "lisa/sellers-page-images raw upload '6-Negotiation.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 06, 'Negotiation' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "process/7-closing": {
        "source": "lisa/sellers-page-images raw upload '7-Closing.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'What the process actually looks like' process-step 07, 'Closing' (.process-step__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "preparing-your-home-for-sale/declutter-and-simplify": {
        "source": "lisa/sellers-page-images raw upload 'Declutter and Simplify.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Preparing Your Home for Sale' info-card, H3 'Declutter and Simplify' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "preparing-your-home-for-sale/deep-clean-the-property": {
        "source": "lisa/sellers-page-images raw upload 'Deep Clean the Property.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Preparing Your Home for Sale' info-card, H3 'Deep Clean the Property' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "preparing-your-home-for-sale/improve-curb-appeal": {
        "source": "lisa/sellers-page-images raw upload 'Improve Curb Appeal.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Preparing Your Home for Sale' info-card, H3 'Improve Curb Appeal' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "preparing-your-home-for-sale/address-minor-repairs": {
        "source": "lisa/sellers-page-images raw upload 'Address Minor Repairs.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Preparing Your Home for Sale' info-card, H3 'Address Minor Repairs' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "key-steps/price-it-right": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/price-it-right.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Key Steps to Selling Your Home' info-card, H3 'Price It Right From the Start' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3240x3240 -- well over the 1200px floor.",
    },
    "key-steps/get-your-home-ready": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/get-your-home-ready.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Key Steps to Selling Your Home' info-card, H3 'Get Your Home Ready Without Going Overboard' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "key-steps/get-it-in-front": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/get-it-in-front.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Key Steps to Selling Your Home' info-card, H3 'Get It in Front of the Right People' (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "key-steps/when-offers-come": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/when-offers-come.png' -> git mv -> "
                   "process-sellers-page-images.py (PNG re-optimize; WEBP q82)",
        "placement": "'Key Steps to Selling Your Home' info-card, H3 \"When Offers Come In, Know What You're Looking At\" (.info-card__img)",
        "type": "AI-generated illustration",
        "deliveredDimensions": "3375x3375 -- well over the 1200px floor.",
    },
    "most-people": {
        "source": "lisa/sellers-page-images raw upload 'assets/images/most-people.jpg' -> git mv -> "
                   "process-sellers-page-images.py (JPEG re-encode q88 optimize+progressive; WEBP q82)",
        "placement": "Section A intro, EN only (.section-figure) -- Spanish counterpart withheld, see module docstring.",
        "type": "AI-generated composite (Lisa's own cutout portrait + the 1765 N Bay Drive twilight hero photo "
                "+ generated text/logo elements)",
        "deliveredDimensions": "1080x1080 -- under the 1200px floor; same standing exception.",
        "provenance": "See content/source/licensed-assets.txt -- new entry cross-referencing the "
                       "twilight-front-1.jpg hero-photo license and content/source/sold-listing-consent.txt "
                       "(1765 N Bay Drive, Elkhart).",
    },
}


def process_png(path):
    img = Image.open(path)
    img.save(path, "PNG", optimize=True)
    webp_path = os.path.splitext(path)[0] + ".webp"
    img.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    return img.size, os.path.getsize(path)


def process_jpg(path):
    img = Image.open(path).convert("RGB")
    img.save(path, "JPEG", quality=88, optimize=True, progressive=True)
    webp_path = os.path.splitext(path)[0] + ".webp"
    img.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)
    return img.size, os.path.getsize(path)


def process_all():
    for slug in SELLERS_JOBS:
        png_path = os.path.join(SELLERS_DIR, f"{slug}.png")
        jpg_path = os.path.join(SELLERS_DIR, f"{slug}.jpg")
        if os.path.exists(png_path):
            size, out_bytes = process_png(png_path)
            print(f"{slug}: {size[0]}x{size[1]}  {out_bytes/1024:.0f}KB  -> {png_path} (+.webp)")
        elif os.path.exists(jpg_path):
            size, out_bytes = process_jpg(jpg_path)
            print(f"{slug}: {size[0]}x{size[1]}  {out_bytes/1024:.0f}KB  -> {jpg_path} (+.webp)")
        else:
            print(f"SKIP {slug}: no source found at {png_path} or {jpg_path}")


if __name__ == "__main__":
    process_all()
