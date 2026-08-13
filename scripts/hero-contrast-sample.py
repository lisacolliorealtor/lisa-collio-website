#!/usr/bin/env python3
"""
hero-contrast-sample.py — average RGB of a hero image's TEXT ZONE.

Invoked by audit.js's hero contrast sampler (check 28). Takes one hero image
path and prints `{"r":.., "g":.., "b":..}` (JSON) for the average pixel color
of the zone under the headline/H1 text.

Why this exact zone and not the whole image: .hero--photo's background is a
left-to-right gradient — rgba(0,6,46,.82) at 0%, .66 at 52%, .38 at 100% —
over the photo, and .hero__text / .hero--tier2 .wrap sit in the LEFT column
(max-width 780px within the wrap; the wrap itself is left-aligned in the
hero). That places the text inside the 0%-52% span, i.e. the darkest,
82%-opacity stop, not the lighter stop on the right where a Tier 1 portrait
sits. Averaging the whole image would grade the photo on a zone the text
never actually occupies.

Sampled as the left 40% of the image width (a conservative subset of the
0-52% span, staying clear of the gradient's transition band) by the full
image height, since background-position:center / cover means the visible
crop is centered but the left-right proportions are preserved regardless of
source aspect ratio.
"""
import sys
import json
import warnings

warnings.filterwarnings("ignore")

try:
    from PIL import Image
except ImportError:
    print(json.dumps({"error": "Pillow not installed"}), file=sys.stderr)
    sys.exit(1)

if len(sys.argv) != 2:
    print(json.dumps({"error": "usage: hero-contrast-sample.py <image-path>"}), file=sys.stderr)
    sys.exit(1)

path = sys.argv[1]
try:
    img = Image.open(path).convert("RGB")
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)

w, h = img.size
zone = img.crop((0, 0, max(1, int(w * 0.4)), h))
pixels = list(zone.getdata())
n = len(pixels)
r = sum(p[0] for p in pixels) / n
g = sum(p[1] for p in pixels) / n
b = sum(p[2] for p in pixels) / n

print(json.dumps({"r": r, "g": g, "b": b}))
