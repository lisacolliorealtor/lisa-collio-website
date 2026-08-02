# Elkhart images — PR 1 pre-flight report

*Lisa Collio, Real Estate Agent · 2 August 2026 · Claude Code*

Report-before-processing for PR 1, per
`docs/drafts/V1_0_Claude_Code_Instructions_Elkhart_Images_Lisa_Collio.md`.

**Nothing processed, cropped, resized, renamed, or wired. No page edited.**
Measured against `origin/main` at `182b466`; the branch was rebased onto that
commit so the Phase 2 report rides on the new head rather than stacking on
merged history.

**Two things need Lisa before PR 1 can proceed:**
1. **The copy edit is not a clean swap.** Section (b) below. Stopped as instructed.
2. **Four focal-point decisions.** Section (d).

---

## (a) Phase 2 re-validation — `elkhart-moving-location-commute.jpg`

Re-run from scratch on the replaced file. **Nothing from the earlier report was
reused**; the old blob is `dbb35b5`, the new one is `37d06d1`, so they are
different files and the earlier row is void.

### Filename
`elkhart-moving-location-commute.jpg` — exact match to the manifest. No space, no
`.jpeg`, no double dot, no uppercase, no underscore. **No rename needed.**
Subject-vs-filename divergence noted as intentional and left alone.

### Provenance — PASS

| Field | Value |
|---|---|
| Make / Model | **Apple / iPhone 16 Pro** |
| Lens | iPhone 16 Pro back triple camera 6.765mm f/1.78 |
| DateTimeOriginal | **2026:07:23 19:05:09** |
| Orientation | 1 |
| Exposure / aperture / ISO | 1/5208 s · f/1.78 · ISO 64 |
| EXIF tags present | 50 |
| **Camera EXIF** | **YES — no hold** |

Same camera and same shoot day as the rest of the July batch, an hour and a half
after the photo it replaces (17:11:45 → 19:05:09).

### Integrity — PASS

| Check | Result |
|---|---|
| Full pixel decode | **OK** — every scanline, truncation errors enabled |
| Format / mode | MPO / RGB |
| Stored size | 4032 × 3024 |
| Size after EXIF orientation | 4032 × 3024 |
| Orientation tag | 1 (no transform needed) |
| Aspect | 1.333 — **landscape** |
| Clears 1200 × 630 without upscaling | **YES** — 3.36× wide, 4.80× tall |
| SHA-256 | `5ef645497511f9f5…` |
| Git blob | `37d06d102e84` |

The two faults that failed the old photo are both gone: the frame is landscape
with room to spare, and there is no LED board or dated event text anywhere in it.
The only text in frame is the permanent **ELKHART** lettering on the station
canopy fascia, which survives the crop (§d, image 1).

**All 27 files now pass all three Phase 2 checks**, with one provenance hold
cleared by Lisa and the other never having had one.

---

## (b) The transportation copy — STOPPED, this is not a clean swap

Lisa asked to see the current paragraph and to be told rather than guessed at if
it differs from expectation. **It differs in three ways.** Nothing was changed.

### What is actually on `/moving-to-elkhart/` — three paragraphs, not one

Section `<h2>Where Elkhart sits, and what that means for getting around</h2>`:

> **¶1 (line 213)** — Elkhart is the largest city in the Elkhart–Goshen
> metropolitan area, part of the broader South Bend–Elkhart–Mishawaka region — the
> area locals call Michiana. South Bend is about 20 minutes away; Goshen, the
> county seat, is another 20 minutes south. Chicago is roughly two hours by the
> Indiana Toll Road, which runs directly through the city with exits at 92 and 96
> — worth knowing that Elkhart runs on Eastern time while Chicago runs on Central,
> which quietly costs you an hour heading west and buys one back on the return.
>
> **¶2 (line 215)** — US-20 (the St. Joseph Valley Parkway) bypasses the south
> side of the city; State Road 19 runs through it; US-33 terminates here.
> **Amtrak's Capitol Limited and Lake Shore Limited both stop at the Elkhart
> station**, and the Interurban Trolley — a regional public bus service — connects
> Elkhart to Goshen, Dunlap, Osceola, and Mishawaka daily except Sundays and major
> holidays. South Bend International Airport, the nearest commercial service, is
> about 30 minutes away.
>
> **¶3 (line 217)** — For most residents, the commute story is simple: it's short,
> and **there are more ways to get around than the car alone.**

And the Spanish twin, `/es/mudarse-a-elkhart/`, mirrors it exactly — ¶1 line 231,
¶2 line 233 (the Amtrak sentence), ¶3 line 235 ("hay más de una manera de moverse
además del carro").

### Problem 1 — the Amtrak material is not in a paragraph of its own

It is one sentence inside ¶2, which also carries **US-20 / State Road 19 / US-33**
and **South Bend International Airport**. Replacing ¶2 deletes the highways and
the airport, which the new paragraph does not mention. Nothing else on either page
states them.

### Problem 2 — ¶3 contradicts the replacement's opening sentence

The new copy opens "Elkhart is a **car-dependent city** — you'll want one for daily
life." ¶3 currently says "there are **more ways to get around than the car alone**."
If ¶2 is swapped and ¶3 is left, the section contradicts itself two paragraphs
apart, in both languages.

### Problem 3 — the replacement's car-dependency point already exists on the page

Roughly fifty lines further down, under `<h2>The honest trade-offs</h2>`
(EN line 263 / ES line 281):

> **Public transportation covers the basics, not everything.** The Interurban
> Trolley connects Elkhart to Goshen, Dunlap, Osceola, and Mishawaka, with onward
> connections toward South Bend — but the stops are limited, and Elkhart isn't a
> place you'd plan a daily life around transit alone. **If you're coming from a
> city where you got by without a car, budget for one here.**

This is the duplicate Lisa was right to ask about. Shipping the replacement as-is
makes the page tell a relocating buyer to budget for a car twice.

### The three ways to resolve it

| | What happens | Cost |
|---|---|---|
| **A — replace ¶2 **and** ¶3 with the new paragraph** *(recommended)* | Section becomes ¶1 (geography, unchanged) + the new Amtrak paragraph. Contradiction gone. | Loses US-20 / SR-19 / US-33 and South Bend airport from the site entirely. |
| **B — replace ¶2 only, and revise ¶3** | Keeps a place to restate the highways/airport if you want them. | ¶3 needs new approved wording in both languages — more copy to approve. |
| **C — replace ¶2 only** | Smallest diff. | **Not recommended** — leaves the contradiction live in both languages. |

Under A or B, the trade-offs paragraph should also be looked at: it is still
accurate and does not contradict anything, but it repeats the car point. Leaving
it is defensible (different section, different framing); Lisa's call.

**Route names.** The current text names *Capitol Limited* and *Lake Shore Limited*.
The replacement deliberately drops route names to stay evergreen, and also narrows
the eastbound destination to New York City — the Capitol Limited's Washington DC
end disappears. That is a deliberate content decision in approved copy, flagged
only so it is a decision and not a side effect.

### Every other page that discusses Elkhart transportation, commuting or rail

Searched the whole repo — HTML and Markdown — for Amtrak, rail, train, the two
route names, the trolley, and the railroad museum.

| Page | What it says | Conflict with the new copy? |
|---|---|---|
| `/moving-to-elkhart/` line 263 + `/es/mudarse-a-elkhart/` line 281 | Trolley; "budget for [a car] here" | **Duplicate** — problem 3 above |
| `/moving-to-goshen/` line 291 + `/es/mudarse-a-goshen/` line 294 | Trolley links "onward toward **Elkhart's Amtrak station**"; no routes, no destinations | **No.** Consistent — confirms the station exists, states nothing the new copy contradicts |
| `/blog/community/cost-of-living-in-goshen-indiana/` + ES twin | Trolley, few stops, budget for a car | No. Goshen-scoped, no rail claim |
| `/blog/community/what-is-elkhart-indiana-known-for/` + ES twin | Norfolk Southern **freight** classification yards | No. Freight, a different subject from passenger service |
| `/blog/community/elkhart-indiana-landmarks-amenities/` + ES twin | National New York Central Railroad Museum | No. The new copy names the same institution — consistent |
| `/blog/community/elkhart-indiana-location-nearby-cities/` + ES twin | Drive times only, no rail | No |

**No page contradicts the new paragraph.** The only interaction is the duplicate
within `/moving-to-elkhart/` itself.

One adjacent inconsistency, pre-existing and not created by this edit: the
paragraph directly above the one being replaced says Goshen is "another **20**
minutes south," while `/blog/community/elkhart-indiana-location-nearby-cities/`
(and `docs/VERIFIED_FACTS.md` line 107) say "about **25** minutes northeast of
Goshen." `VERIFIED_FACTS.md` is itself split — it says 25 in one sentence and
"all within roughly 20 minutes" in the next. Not blocking, not touched; flagged
because it sits one paragraph away and `VERIFIED_FACTS.md` is where it should be
settled first.

---

## (c) Processing plan — 27 images, file by file

### Conventions, unchanged from the Goshen run

| | |
|---|---|
| Source | `assets/images/elkhart/` — camera originals |
| Output | `assets/images/sections/` |
| Sizes | `{name}.jpg` 1200×630 · `{name}-thumb.jpg` 800×420 |
| Formats | JPEG q88 progressive optimized · WebP q85 method 6 beside each |
| Function | `generate_section()` via `SECTION_JOBS`, run with `--sections` |
| Orientation | `_open_oriented()`, not `Image.open()` |
| Overlay | none — see (e) |

### One structural fact that makes every decision simpler

`_cover_focal()` scales by the larger of the two ratios and then takes the crop
with `left = (new_w - box_w) // 2`. Every source here is 1.333 or 1.500 and the
target is 1.905, so scaling is always driven by **width** — `new_w` comes out at
exactly 1200 (or 800 for the thumb) and `left` is always **0**.

**Nothing is cropped horizontally. `focal_y` is the only knob**, and because the
thumbnail is the same 1.905 ratio, one `focal_y` serves both sizes. **No
`crop_box` is proposed for any of the 27** — none is needed to make a frame fit,
and it is left available as the deliberate tool it is meant to be.

Frame retained after crop: **70%** of source height on the 1.333 files, **79%** on
the two 1.500 files.

### How each focal point was derived

Rendered every source at the delivered 1200×630 window and looked at what falls
outside it. `focal_y` stays at 0.50 unless the default lost something that
matters or spent the frame on dead sky or asphalt. Anything where the fix costs
something else is in (d) as an option, not a decision.

### `/moving-to-elkhart/` — 14 images

| # | Name | Blob | `focal_y` | Why |
|---|---|---|---|---|
| 1 | `elkhart-moving-location-commute` | `37d06d102e84` | **0.50** | Station roofline and the ELKHART canopy lettering both sit inside the default window; below it is only road |
| 2 | `elkhart-moving-employers` | `e3fc81edffb0` | **0.50** | Lisa's face is centred; default keeps full head with headroom |
| 3 | `elkhart-moving-schools` | `71c72b333b15` | **0.65** | Default spends the top half on empty sky; 0.65 centres the field and bleachers |
| 4 | `elkhart-moving-housing-stock` | `a45103101966` | **0.50** | 1.500 source, 79% retained; house sits fully inside |
| 5 | `elkhart-moving-cost-of-living` | `5b7ab3cbd2b3` | **see (d)-1** | Antlers vs. pedestal — cannot keep both |
| 6 | `elkhart-moving-trade-offs` | `4a2d33ac1d66` | **0.50** | LERNER blade sign fully inside; only the building cornice and a street sign fall out |
| 7 | `elkhart-moving-elkhart-or-goshen` | `054ec148c6be` | **0.50** | Streetscape fits; see (d)-5 for a signage flag, not a crop issue |
| 8 | `elkhart-moving-cta-closing` | `df3142492100` | **0.45** | Slightly up from centre to keep more of the clock tower; Lisa's face stays well inside |
| 9 | `elkhart-moving-faq-things-to-do` | `8036d7763ab2` | **0.58** | Trades empty upper sky for the river reflection, which is the subject |
| 10 | `elkhart-moving-faq-community-events` | `667f14b488e3` | **0.58** | Keeps the planters at the mural base, which the default clips |
| 11 | `elkhart-moving-faq-cost-of-living` | `60b36325bd1b` | **0.50** | Pavilion and lawn both inside; no gain from moving |
| 12 | `elkhart-moving-faq-moving-from-out-of-state` | `dcec8a76b62d` | **0.50** | Building, flag and entrance sign all inside |
| 13 | `elkhart-moving-faq-older-home-checklist` | `687b8c35be01` | **0.50** | 1.500 source; house fully inside. See (d)-4 for a signage flag |
| 14 | `elkhart-moving-faq-rv-industry-job` | `5ecc95880b24` | **0.50** | Coach centred; the FOREST RIVER brand mark stays legible |

### `/living-in-elkhart/` — 13 images

| # | Name | Blob | `focal_y` | Why |
|---|---|---|---|---|
| 15 | `elkhart-living-city-at-a-glance` | `0f728f807214` | **0.50** | Full block of storefronts and the rooflines behind fit as-is |
| 16 | `elkhart-living-downtown` | `ddf54ff7bc61` | **see (d)-2** | Clock-tower spire vs. the bottom of the LERNER blade |
| 17 | `elkhart-living-rivers-parks-outdoors` | `46af5e70e4c9` | **0.50** | Riverwalk railing leads in from the bottom; default keeps it. See (d)-6 |
| 18 | `elkhart-living-museums-arts` | `c6d3fc559d65` | **0.50** | Ruthmere's full façade sits inside; overhanging branches frame the top |
| 19 | `elkhart-living-annual-events` | `33a846dc9cd8` | **0.52** | A hair down so the flower bed is not clipped at the bottom edge |
| 20 | `elkhart-living-history` | `2b27b038ac41` | **0.55** | Rail cars and signal gantry sit just below centre; 0.55 puts them on the middle line |
| 21 | `elkhart-living-why-lisa` | `f79c13dcca52` | **see (d)-3** | Default cuts Lisa mid-thigh over a large empty foreground |
| 22 | `elkhart-living-cta-closing` | `16dfd72bd425` | **0.50** | Portrait; face well inside with headroom |
| 23 | `elkhart-living-faq-known-for` | `20673bb0f1a2` | **0.50** | Rides and midway inside. See (d)-7 |
| 24 | `elkhart-living-faq-school-district` | `b0044a547314` | **see (d)-8** | Default gives half the frame to parking lot |
| 25 | `elkhart-living-faq-downtown` | `cb744a81621b` | **0.42** | Up from centre to favour the skyline and flags over the asphalt apron |
| 26 | `elkhart-living-faq-employers` | `4ba8e0db553f` | **0.58** | Keeps the fence line and the full row of coaches; the default spends the top on cloud |
| 27 | `elkhart-living-faq-landmarks` | `d73a1e396423` | **0.50** | Bridge deck, lamps and both riverbanks all inside |

### Build record

Every row above is a `SECTION_JOBS` entry carrying source path, `focal_y`,
`crop_box` (`None` throughout) and the git blob SHA, so any image can be
regenerated byte-for-byte from history. `SECTION_JOBS` holds 27 Goshen entries
and zero Elkhart entries today; all 27 get added.

### `CLEAN_JOBS` — the count changed, because of answer 3

Lisa's answer 3 adds `/blog/community/elkhart-indiana-location-nearby-cities/` and
`/blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/` to the reuse, fed by
`elkhart-moving-location-commute.jpg`. Checked both: **neither has a featured image
or an `og:image` today, and neither is in `CLEAN_JOBS`.**

So PR 1's `CLEAN_JOBS` work is **18 repointed + 6 new**, not 18 + 4:

| | Slugs |
|---|---|
| Repoint to the Elkhart sources | 18 |
| **New** — 4 Wave 1 Spanish articles | `por-que-es-conocido-elkhart-indiana` · `distrito-escolar-elkhart-indiana` · `industrias-empleadores-elkhart-indiana` · `lugares-emblematicos-elkhart-indiana` |
| **New** — the location pair | `elkhart-indiana-location-nearby-cities` · `ubicacion-elkhart-indiana-ciudades-cercanas` |
| **Total** | **24** |

Corrected scope totals:

| | Phase 2 report | Now |
|---|---|---|
| Article pages | 22 | **24** (12 EN + 12 ES) |
| Total pages | 26 | **28** |
| Source photographs feeding featured images | 11 | **12** |
| `blog-headers/` files | 88 | **96** (72 overwritten, **24** new) |
| `sections/` files | 108 | 108 |
| **Total derived files** | 196 | **204** |

**One thing that did not change:** the baseline deletions in PR 4 are still only
the **four** Wave 1 pairs. The location pair is not in
`content/image-parity-baseline.json` and sits at 5/5 today; adding a header to
both sides takes it to 6/6, still at parity, so check 14 never sees it.

---

## (d) Focal-point concerns and signage flags

Four crop decisions and four things visible in a frame. Options, not silent picks.
Side-by-side renders of the four crop decisions are attached to this report as
`CROP-OPTIONS-*.png`.

### Crop decisions

**(d)-1 · `elkhart-moving-cost-of-living` — the wire deer sculpture.**
The sculpture is taller than the crop window allows. At `focal_y` 0.50 the antler
tips are clipped; at 0.28 the full rack is intact but the pedestal and the tips of
the hooves go. There is no value that keeps both.
· **A — 0.50**, antlers clipped, sculpture grounded.
· **B — 0.28**, full antlers, sculpture appears to float.
· **C** — a different photo for this slot.
No recommendation — this is a taste call and neither is wrong.

**(d)-2 · `elkhart-living-downtown` — the clock tower and the LERNER blade.**
`focal_y` 0.50 clips the green spire cap off the clock tower, which is the
signature element of the frame. 0.15 keeps the whole tower; the LERNER blade sign
stays legible, losing only the smaller street sign beneath it.
· **A — 0.50** · **B — 0.15 (recommended)**.

**(d)-3 · `elkhart-living-why-lisa` — Lisa at the crossing.**
0.50 cuts her mid-thigh and gives roughly a third of the frame to empty pavement.
0.66 carries her to below the knee and keeps the whole streetscape behind her.
A full-length figure is not reachable at 1.9:1 from this framing either way.
· **A — 0.50** · **B — 0.66 (recommended)**.

**(d)-4 · `elkhart-living-faq-school-district` — Elkhart High School.**
0.50 spends half the frame on parking lot. 0.30 fills it with the building.
The **ELKHART HIGH SCHOOL** sign is legible at both, confirmed at output size.
· **A — 0.50** · **B — 0.30 (recommended)**.

### Signage and people visible in a delivered frame

Checked at the delivered 1200×630, not on the original — legibility is what
matters and it changes with the crop. None of these is a crop problem; all four
are alt-text and judgement questions for PR 2–4, raised now because the photograph
is what fixes or doesn't fix them.

**(d)-5 · `elkhart-moving-elkhart-or-goshen` — "NEW LIFE COMMUNITY CHURCH", clearly
legible** on a building face, plus retail awnings including "INTERIOR MOTIVES BY
321". Religion is a Fair Housing protected class and this is an evergreen page.
The rule governs copy and alt text rather than what a street photograph happens to
contain, and Goshen shipped comparable streetscapes — but a legible church name is
worth a deliberate decision, not an assumption. `crop_box` is not a clean fix:
the sign sits immediately left of the red-brick turret that anchors the frame, so
removing one removes the other.
· **A — keep, with alt text that names nothing** (recommended)
· **B — swap the photo.**

**(d)-6 · `elkhart-living-rivers-parks-outdoors` — "BRASS ELK BREWING", clearly
legible.** A dining/drinking business on an evergreen pillar page. Same reasoning
and same recommendation as (d)-5: keep, and let the alt text describe a riverwalk
and a row of awnings without naming the tenant.

**(d)-7 · `elkhart-living-faq-known-for` — a dense fair crowd.** The most
people-populated image in the batch by a wide margin, with many faces legible.
Public event in a public space, which the manifest's own guidance treats as the
safe end of the range, but §15 and the manifest both ask for deliberate care with
people-inclusive shots. Worth Lisa's explicit look at the photo itself. Alt text
must describe the midway, not the crowd.
Separately, and minor: a fair midway illustrates "annual events" more directly
than "what Elkhart is known for" (RVs, band instruments, rail). Both filenames are
approved and the location-commute precedent says loose subject fit is acceptable —
flagged once, not pressed.

**(d)-8 · `elkhart-moving-faq-older-home-checklist` — the house number "916" is
clearly legible** on the porch header. 876 IAC 8-1-8(f) governs presenting an image
as a specific advertised or sold listing; this is decorative framing on an FAQ
about inspecting older homes, and the alt text will not suggest otherwise. But a
legible street number makes the property identifiable, which is a different
question from authorship and is not answered by Lisa's provenance clearance.
The number sits centre-frame, so `crop_box` cannot remove it without destroying
the composition.
· **A — keep, decorative framing, alt text names nothing** (recommended)
· **B — swap the photo.**

**Checked and clear:** `FOREST RIVER` on images 14 and 26 is an employer in an
employment context, which the standing rulings permit; the IU South Bend Elkhart
Center sign on image 12 is an institution, also permitted; the ELKHART HIGH SCHOOL
sign on image 24 is an institution, and the FAQ beside it already names all three
applicable districts — Elkhart, Concord and Baugo — so there is no steering risk
in showing one building.

---

## (e) Overlay confirmation — clean, verified three ways

**Nothing in the build config would apply an overlay to any of the 24 article
slugs or to any of the 27 section images.**

1. **`OVERLAY_SCOPE` holds 37 slugs, all Buyers/Sellers. None of the 24 article
   slugs is among them** — compared programmatically, including the two new
   location slugs.
2. **`_require_overlay_scope()` raises `ValueError` on any slug outside that set**,
   and every overlay entry point calls it first. An accidental overlay call on
   these slugs cannot produce a file; it errors.
3. **`generate_section()` has no overlay code path at all.** The script states
   Communities pages sit outside the exception, so no overlay variant of the
   function exists and there is no rotation to track.

Cross-checked against `docs/FEATURED_IMAGE_OVERLAY_AUDIT.md` (status RESOLVED):
none of the 24 slugs is in the flagged list, so no existing header among them
carries baked-in text or the cutout. Both gates pass on this commit —
`npm run check:images` (89 slugs · 37 in scope · 52 clean · 27 section images,
"every variant matches its scope") and `npm run audit` (all hard checks).

---

## What PR 1 does once Lisa answers

1. Apply the transportation copy edit in both languages, per her choice of A/B/C.
2. Process 27 sources → 108 files in `assets/images/sections/` with the approved
   focal points.
3. Add 27 `SECTION_JOBS` entries with source, focal point, crop and blob SHA.
4. Repoint 18 `CLEAN_JOBS` entries, add 6, and rebuild 96 files in
   `blog-headers/`.
5. Produce the contact sheet of every derived image for Lisa's review before merge.

No image is wired to any page in PR 1.

## Awaiting Lisa

1. **Transportation copy — A, B or C** (§b).
2. **Four crop decisions** — (d)-1 through (d)-4.
3. **Four signage/people judgements** — (d)-5 through (d)-8.
