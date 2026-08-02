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

---

# Addendum — 2 August 2026, after Lisa's decisions

## Verbatim text requested for the copy edit (Option B)

Pasted exactly as it appears in the page source. Nothing changed.

**`/moving-to-elkhart/` ¶2 — line 215**

> US-20 (the St. Joseph Valley Parkway) bypasses the south side of the city; State Road 19 runs through it; US-33 terminates here. Amtrak's Capitol Limited and Lake Shore Limited both stop at the Elkhart station, and the Interurban Trolley — a regional public bus service — connects Elkhart to Goshen, Dunlap, Osceola, and Mishawaka daily except Sundays and major holidays. South Bend International Airport, the nearest commercial service, is about 30 minutes away.

**`/moving-to-elkhart/` ¶3 — line 217**

> For most residents, the commute story is simple: it's short, and there are more ways to get around than the car alone.

**`/es/mudarse-a-elkhart/` ¶2 — line 233**

> La US-20 (el St. Joseph Valley Parkway) bordea el lado sur de la ciudad; la carretera estatal 19 la atraviesa; la US-33 termina aquí mismo. Los trenes Amtrak Capitol Limited y Lake Shore Limited paran en la estación de Elkhart, y el Interurban Trolley — un servicio de autobús público regional — conecta Elkhart con Goshen, Dunlap, Osceola y Mishawaka todos los días excepto domingos y días festivos importantes. El aeropuerto comercial más cercano, South Bend International, queda a unos 30 minutos.

**`/es/mudarse-a-elkhart/` ¶3 — line 235**

> Para la mayoría de los residentes, el trayecto diario es sencillo: es corto, y hay más de una manera de moverse además del carro.

**One thing to know before drafting.** Lisa's instruction was to "remove the
'budget for a car' line from the transportation section and leave the one under
'The honest trade-offs.'" **There is no budget-for-a-car line in the
transportation section today** — ¶2 and ¶3 above are its full text, and neither
mentions a car. The only such line on the page is the trade-offs one, at EN 263 /
ES 281, which is staying. So the instruction reads as a constraint on the *new*
copy: keep the car-dependency framing out of the replacement, so the point is
made once, in trade-offs. Noted so the draft is written against what is actually
there.

Also carried forward for the draft: keep US-20, State Road 19, US-33 and South
Bend International; restore daily southbound service toward Washington DC
alongside Chicago and New York. The Interurban Trolley currently appears in ¶2
and again in the trade-offs paragraph — worth deciding whether it survives in the
replacement or lives only in trade-offs, for the same reason as the car line.

## Drive-time sweep — Goshen ↔ Elkhart, both languages

**Not fixed. Reported only, per Lisa.**

There are **three** different claims in circulation, not two, and
`docs/VERIFIED_FACTS.md` contains two of them in consecutive sentences.

### The canonical record contradicts itself

`docs/VERIFIED_FACTS.md`, §"Elkhart — location", lines 106–108, verbatim:

> East of South Bend and Mishawaka, near the Indiana–Michigan state line. About
> **25 minutes northeast of Goshen**. South Bend, Mishawaka, and Goshen are all
> within roughly 20 minutes.
> · **Sources:** Wikipedia, "Elkhart, Indiana" · STATS Indiana

Sentence two says 25; sentence three sweeps Goshen into a 20-minute group. Both
carry the same two sources. **This is the file to settle first** — the build
procedure says correct `VERIFIED_FACTS.md`, then check each page against it,
never page against page.

### Live pages — 23 occurrences

| Claim | Count | Where |
|---|---|---|
| **25 min**, Elkhart ↔ Goshen | **17** | `/blog/community/elkhart-indiana-location-nearby-cities/` ×5 (meta description :11, schema description :29, FAQ schema answer :102, body :207, visible FAQ answer :227) · `/blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/` ×5 (:11, :29, :97, :202, :215) · FAQ-block echoes on `/blog/community/elkhart-indiana-industries-employers/`:248, `/blog/spanish/industrias-empleadores-elkhart-indiana/`:249, `/blog/spanish/distrito-escolar-elkhart-indiana/`:256, `/blog/spanish/lugares-emblematicos-elkhart-indiana/`:245 · hub cards on `/blog/`:317, `/blog/community/`:247, `/blog/spanish/`:376 |
| **20 min**, Elkhart ↔ Goshen | **4** | `/moving-to-elkhart/`:213 · `/es/mudarse-a-elkhart/`:231 · `/living-in-elkhart/`:213 · `/es/viviendo-en-elkhart/`:215 |
| **"all within about 20 minutes"** — South Bend, Mishawaka **and** Goshen as one group | **2** | `/blog/community/elkhart-indiana-industries-employers/`:209 · `/blog/spanish/industrias-empleadores-elkhart-indiana/`:208 |

The third framing is the one most likely to be missed by a sweep looking for a
number: it never states a Goshen-specific figure, it folds Goshen into a group
with two cities that are genuinely closer. Fixing 25↔20 without touching it
would leave the contradiction alive in a different shape, in both languages.

Note `/blog/community/elkhart-indiana-industries-employers/` and its Spanish twin
carry **both** the 20-minute group claim (body) and the 25-minute claim (FAQ
block) on the same page.

### Generated — 2 occurrences

`llms.txt`:81 (EN) and :176 (ES), both 25 min. Regenerated by `npm run llms`, so
these follow the pages rather than needing separate edits — listed so the count
is complete.

### Authoring sources and records — 17 occurrences

| Claim | Count | Where |
|---|---|---|
| **25 min** | 10 | `content/approved/communities-elkhart.md`:23,:87 · `content/approved/communities-elkhart-es.md`:23,:87 · `docs/FAQ_GAP_PAGE_CONTENT.md`:123,:136,:964,:977 · `docs/approved-copy/V1_0_FAQ_Gap_Blocks_EN_15_Pages_Lisa_Collio.md`:85 · `…ES_21_Pages…`:322 |
| **20 min** | 4 | `docs/approved-copy/V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md`:79 · `V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md`:65 · `V1_0_Living_in_Elkhart_Page_EN_Lisa_Collio.md`:55 · `V1_0_ES_Viviendo_en_Elkhart_Page_Lisa_Collio.md`:45 |
| **20 grouped** | 2 | `docs/approved-copy/V1_0_Elkhart_Living_Authority_Articles_1-5_EN_Lisa_Collio.md`:149 · `V1_0_ES_Adaptation_9_Articles_Wave1_Lisa_Collio.md`:105 |
| **both** | 1 | `docs/VERIFIED_FACTS.md`:107 |

These matter because of build-procedure failure 4: the "13 vs 14 elementary
schools" regression happened when a correction landed on a page while an approved
source still held the old number, so the wrong figure kept regenerating. **All 17
have to move with the pages**, or the next rebuild reintroduces whichever number
Lisa retires.

`content/approved/communities-elkhart.md` and `-es.md` are the sources for the
retired `/communities/elkhart/` pages, which now 301 to `/living-in-elkhart/`.
They are still in the repo and still state 25.

### Excluded, deliberately

`content/source/Goshen-Elkhart-Reference-Data-Sheet.md`:16 and
`content/approved/goshen-elkhart-data-sheet.md`:16 both contain "the median
commute is about 19 minutes" — inside a sentence giving examples of how to
phrase a fact, not a claim about the Goshen–Elkhart drive, and a different metric
(median commute to work, not city-to-city). Not counted; recorded so it does not
look like a missed hit.

**Total: 42 occurrences** — 23 live, 2 generated, 17 authoring — across three
mutually inconsistent claims in two languages.

## Decisions applied this turn

| Decision | Applied |
|---|---|
| Crops — clock tower B (0.15), portrait B (0.66), school B (0.30) | Recorded in the plan above; **not yet processed** |
| Deer sculpture crop | **Held** — tracked in the punch list |
| Church signage — do not use, leave slot image-free | **`elkhart-moving-elkhart-or-goshen` rejected**, both languages |
| Brass Elk Brewing — do not use | **`elkhart-living-rivers-parks-outdoors` rejected**, both languages |
| Fair crowd — approved | `elkhart-living-faq-known-for` stays in the build |
| "916" — holding pending consent check | **Held, not rejected**; explicitly kept out of `rejected-assets.txt` |

Both rejections are recorded in `content/source/rejected-assets.txt` under a
separate **Ruling 2** with their own grounds, marked ⛔ in the manifest, and
enforced by `audit.js` check 15.

**One defect found and fixed while recording them.** Check 15's failure message
was hardcoded to Ruling 1's rationale — "not Lisa's photography (ruling 29 Jul
2026)" — so it would have said that about two photographs that *are* Lisa's. The
list now takes an optional `slug | reason` and the message quotes it. Verified in
both directions: a deliberately-broken page produces the correct per-ruling text
for a Goshen slug and for an Elkhart slug, and the run returns clean once
reverted.

### Revised counts — 24 images processed, not 27

| | Was | Now |
|---|---|---|
| Source photos to process | 27 | **24** (2 rejected, 1 held) |
| `sections/` files | 108 | **96** |
| Sections wired later, `/moving-to-elkhart/` + ES | 8 figure + 6 FAQ | **7 figure + 5 FAQ** |
| Sections wired later, `/living-in-elkhart/` + ES | 8 figure + 5 FAQ | **7 figure + 5 FAQ** |
| Article pages (PR 4) | 24 | **22** — the two older-home articles are held with their image |
| `blog-headers/` files | 96 | **88** |

EN/ES parity is unaffected: every rejection and the hold apply to both languages
of a pair, so the counts move together and `audit.js` check 14 stays satisfied.
The four Wave 1 baseline deletions in PR 4 are unchanged.

## Still awaiting Lisa

1. **The Option B replacement copy**, both languages, once drafted from the
   verbatim text above.
2. **The deer sculpture crop** — `focal_y` 0.50 or 0.28.
3. **The "916" consent check.**
4. **The drive-time number** — 20, 25, or a different figure, and whether the
   "all within about 20 minutes" grouping stands.

---

# Addendum 2 — 2 August 2026: decisions applied, images processed

## The image swap — re-validated, and NOT cleared

`elkhart-moving-elkhart-or-goshen.jpg`, blob `054ec148` → `72383bc5`.

| Check | Result |
|---|---|
| Filename | exact manifest match; no space, `.jpeg`, double dot, uppercase or underscore |
| Make / Model | **Apple / iPhone 16 Pro** |
| DateTimeOriginal | **2026:07:24 20:59:12** · 49 EXIF tags · Orientation 1 |
| Full pixel decode | **OK** |
| Size (stored = oriented) | **5712 × 4284**, aspect 1.333, **landscape** |
| Clears 1200 × 630 | **YES** — 4.76× wide, 6.80× tall |
| Legible business or religious signage | **NONE.** Both signs in frame are illegible at output size — verified at 6× zoom on the delivered crop, not on the original |
| **Identifiable people** | **AT LEAST FIVE CHILDREN AND ONE ADULT**, several recognisable |

The church problem is solved. **A different one replaced it.** Two issues alt
text cannot cure: identifiable minors with no release on file, and familial
status — a Fair Housing protected class — as the illustration for a
where-should-I-live comparison, which is the same category of risk the church
signage was rejected for.

**No crop fixes it**, verified by rendering three candidates rather than assumed:
`_cover_focal()` crops these sources vertically only, and the people and the play
equipment occupy the same horizontal band. The only `crop_box` that excludes
everyone — `(0, 0, 1, 0.60)` — returns tree canopy and sky with a sliver of
equipment, which does not illustrate the section.

The slug therefore stays in `rejected-assets.txt` under a **Ruling 3 marked
PENDING** — a guard so the slot cannot be filled by accident, not a ruling.
Lisa's call: accept with consent for the minors, supply a third photo, or leave
the section image-free.

## Applied without qualification

| Decision | State |
|---|---|
| Brass Elk reinstated | Removed from `rejected-assets.txt`, un-marked in the manifest, processed. Alt-text constraint recorded in all three places: name no business in frame |
| "916" cleared | Hold released, processed. Kept **out** of `rejected-assets.txt`; consent noted in the `SECTION_JOBS` build record |
| Deer crop | `focal_y` **0.28** — full antlers, pedestal lost |
| Clock tower / portrait / school | `focal_y` **0.15 / 0.66 / 0.30** |

**On "restore that section's image slot in both languages":** there was nothing
to restore in the HTML. No Elkhart section or FAQ image has ever been wired —
all four pages still sit at 0 `section-figure` and 0 `faq-item--media`. The
rejections only ever blocked the build plan, so reinstating means removing the
guard and processing the file, which is done. Wiring is PRs 2–4.

## Processing — done

| Output | Files | Verified |
|---|---|---|
| `assets/images/sections/elkhart-*` | **100** (25 names × jpg/webp × full/thumb) | every variant present at 1200×630 / 800×420 |
| `assets/images/blog-headers/` for the 24 article slugs | **96** | every variant present at 1200×630 / 800×420 |
| `SECTION_JOBS` | +25 entries | source, focal point, crop (`None` throughout), blob SHA |
| `CLEAN_JOBS` | 18 repointed, 6 added | all 24 confirmed pointing at `assets/images/elkhart/` |

`npm run audit` all hard checks pass · `npm run check:images` "every variant
matches its scope" (95 slugs, 37 in scope, 58 clean, 52 section images) ·
**re-running `--sections` reproduces all 100 files byte-for-byte.**

EN/ES twins are now byte-identical files under two names — spot-checked on three
pairs. That is new: the old headers differed because each baked in its own
language's title.

**Contact sheets:** `docs/CONTACT-1-moving.png`, `-2-living.png`,
`-3-faq-thumbs.png`, `-4-articles-en.png`, `-5-articles-es.png`.

### One pre-existing defect found, not introduced and not fixed

`python3 scripts/generate-featured-images.py --clean` **cannot complete**, and
could not before this work either. `generate_clean_from_composite("does-lisa-collio-speak-spanish")`
raises: it expects a 1200×900 Template B composite and the file on disk is the
derived 1200×630, so its true source no longer exists. Verified pre-existing by
running the unmodified pre-Elkhart script from the repo root and getting the
identical error. The 24 Elkhart slugs were built by iterating their own
`CLEAN_JOBS` entries through `generate_clean()` — same function, same
convention, scoped past the broken row. Recorded in the punch list.

## The copy edit — BLOCKED, the replacement text did not arrive

The instruction reads "[paste the two revised ¶2 paragraphs above]". **That
placeholder was never filled in** — no revised English or Spanish paragraph came
through. Nothing was changed on either page; both still carry the original ¶2 and
¶3 quoted earlier in this report.

Everything else about the copy edit is settled and recorded: revise ¶2 only, ¶3
unchanged in both languages, trolley stays in ¶2, trade-offs paragraph untouched,
US-20 / SR-19 / US-33 and South Bend International retained.

## Amtrak — verified, and the live pages are wrong today

Lisa's suspicion is correct, and it is worse than a staleness risk.

- **The Capitol Limited no longer exists.** It was merged with the Silver Star
  into the **Floridian** on **10 November 2024**.
- **Elkhart station (EKH) is at 131 Tyler Avenue** — the Tyler Avenue detail
  checks out.
- Today it is served by the **Lake Shore Limited** (Chicago ↔ New York
  City / Boston) and the **Floridian** (Chicago ↔ Miami, running via
  Washington DC).
- The station sits **across the tracks** from the National New York Central
  Railroad Museum — so "across from" is defensible; "across the street" would
  not be.

Sources: Amtrak's EKH station page, Wikipedia "Elkhart station" and
"Floridian (train)", plus the November 2024 Floridian timetable.

**No route name has been put back into the copy.** Two things follow:

1. **Both live pages currently name a train that has not run since November
   2024**, in both languages. That is independent of the ¶2 rewrite and is now
   on the punch list.
2. **Daily southbound service toward Washington DC does still exist** — as the
   Floridian, which continues on to Miami. Describing it as reaching Washington
   DC is accurate but stops short of where the train actually goes.

**One phrasing warning.** Sources describing the museum's proximity to the
station use "within walking distance". That is banned ambulatory phrasing under
the Fair Housing checklist and must not travel from a source note into the copy.

## Open

1. **The revised ¶2 text**, both languages — the placeholder was empty.
2. **`elkhart-moving-elkhart-or-goshen`** — accept with consent, third photo, or
   image-free.
3. **Drive time** — inventory of 42 occurrences held, awaiting the number.
4. **The stale Capitol Limited reference** on both live pages, whether or not it
   rides along with the ¶2 rewrite.

---

# Addendum 3 — 2 August 2026: copy applied, rejection finalised

## ¶2 replaced, both languages. ¶3 untouched.

`moving-to-elkhart/index.html:215` and `es/mudarse-a-elkhart/index.html:233` —
**one line changed in each file, nothing else.** Verified by diffing both against
their pre-edit copies: a single `215c215` / `233c233` hunk, so ¶1, ¶3, the
trade-offs paragraph and every other line are byte-identical to before.

Compliance-checked on the inserted text itself, both languages:

| Check | EN | ES |
|---|---|---|
| Ambulatory / proximity-by-foot (incl. "within walking distance", "a pie", "caminando") | none | none |
| Parking claim | none | none |
| Route names (Capitol Limited, Lake Shore Limited, Floridian, Silver Star) | none | none |
| National New York Central Railroad Museum retained | yes | yes |
| Tyler Avenue | yes | yes |

The Spanish went in exactly as supplied — usted register (`Consulte el sitio
web…`), `trenes de cercanías`, `visitar familia` — with no drift toward the
English. `npm run audit` passes all hard checks, including check 5 (`walkab`
sitewide) and check 17 (Fair Housing terms in alt text).

**One factual note, not a change.** The approved text names Chicago and New York
and stops there. The earlier instruction had asked to restore southbound service
toward Washington DC; the final approved copy does not include it. That service
does exist — as the Floridian, which continues to Miami — so the copy is accurate
as written and simply narrower. Recorded so the omission is visibly a decision.

## Ruling 3 — now final, not pending

`elkhart-moving-elkhart-or-goshen` is a **final rejection** in
`content/source/rejected-assets.txt`, the manifest, and the punch list. The
recorded grounds, per Lisa: her own photography, rejected for **identifiable
minors with no release on file** and for **familial status appearing as the
illustration on a where-should-I-live comparison page** — the same category as
the church-signage rejection, explicitly **not** the Goshen "not Lisa's
photography" ruling.

Lisa's supporting point is recorded with it: this is the same standard that
permanently excludes all Jordi B photos and the Yaquelin Lozano pair for showing
minors without permission, and strangers are a weaker position than family, not a
stronger one.

**The "Elkhart or Goshen?" section is image-free in both languages**, following
"Where people work" on `/living-in-goshen/`. The per-slug reason in
`rejected-assets.txt` means `audit.js` check 15 now reports the correct grounds
for this slug rather than Ruling 1's.

Final Elkhart tally: **27 uploaded · 26 cleared · 25 processed · 1 rejected.**
(The 26th cleared file is `elkhart-living-faq-downtown`, which is processed; the
count differs from 25 only because `elkhart-moving-elkhart-or-goshen` is the one
rejection.)

## Capitol Limited — full sweep, both languages

Searched every `.html`, `.md`, `.txt` and `.json` in the repo for both route
names.

### Live pages — **now zero**

| Page | Before | After |
|---|---|---|
| `/moving-to-elkhart/`:215 | "Amtrak's **Capitol Limited** and Lake Shore Limited both stop at the Elkhart station" | fixed by this PR — names no route |
| `/es/mudarse-a-elkhart/`:233 | "Los trenes Amtrak **Capitol Limited** y Lake Shore Limited paran en la estación de Elkhart" | fixed by this PR — names no route |

Those were the **only two live pages** naming it. Verified after the edit by
grepping every HTML file: **no live page names the Capitol Limited.** Nothing in
`llms.txt`, no hub card, no schema field, no meta description carried it.

### Authoring sources — **two, deliberately not fixed**

| File | Line | Content |
|---|---|---|
| `docs/approved-copy/V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md` | 81 | the pre-rewrite English ¶2 |
| `docs/approved-copy/V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md` | 67 | the pre-rewrite Spanish ¶2 |

Left alone as instructed — reported first, and they may fold into the drive-time
PR. Worth being blunt about the risk while they sit there: **this is
build-procedure failure 4 exactly.** A correction lands on the page while the
approved source still holds the retired fact, and the next rebuild from that
source reintroduces it. That is how the "13 vs 14 elementary schools" regression
happened.

Two other pages mention Amtrak without naming a route and need no change:
`/moving-to-goshen/`:291 and `/es/mudarse-a-goshen/`:294, both describing trolley
connections "onward toward Elkhart's Amtrak station".

## Drive-time numbers — untouched

Not a single one of the 42 occurrences was modified in this PR. The inventory
stands as recorded above, awaiting Lisa's number and its own PR.

## Open after this PR

1. **Drive time** — the number, then one PR across live pages, authoring sources
   and `VERIFIED_FACTS.md`, including the "all within about 20 minutes" grouping.
2. **The two authoring sources still naming the Capitol Limited.**
3. **`--clean` cannot complete** — pre-existing, unrelated to Elkhart.
4. **PRs 2–4** — wiring, with alt text to Lisa in both languages before merge.

---

# Addendum 4 — 2 August 2026: the review gate

## Contact sheet — six sheets, 98 renderings, 49 image names

`docs/CONTACT-1…6-*.png`. Every derived image at its **delivered crop**, at
**both sizes**, with its focal point printed beneath it.

| Sheet | Contents | Tiles |
|---|---|---|
| 1 | Section images, `/moving-to-elkhart/` + `/es/mudarse-a-elkhart/`, 1200×630 | 12 |
| 2 | Section images, `/living-in-elkhart/` + `/es/viviendo-en-elkhart/`, 1200×630 | 13 |
| 3 | All section images at the 800×420 `faq-item--media` / card size | 25 |
| 4 | Article featured images, 12 EN, 1200×630, with source photo named | 12 |
| 5 | Article featured images, 12 ES, 1200×630 | 12 |
| 6 | Article thumbnails, all 24 slugs, 800×420 | 24 |
| | **Total** | **98** |

98 renderings = 49 image names × 2 sizes. The 196 files on disk are these 98
renderings in `.jpg` and `.webp`.

Lisa's four crop decisions are visible on sheets 1 and 2 and all landed:
`elkhart-living-downtown` at 0.15 with the full clock-tower spire,
`elkhart-living-faq-school-district` at 0.30 with the building filling the frame,
`elkhart-living-why-lisa` at 0.66, and `elkhart-moving-cost-of-living` at 0.28
with the antlers intact.

## The Washington DC omission — recorded as a deliberate scope decision

Lisa's ruling, 2 August 2026: **accepted as a decision, not a slip.** The
southbound service is the Floridian, which runs to Miami via Washington DC.
"Reaches Washington DC" would be technically accurate and quietly misleading
about what the route actually is. **Chicago and New York describe the station
honestly**, so the approved copy names those two and stops.

Recorded in the as-built note in both approved-copy sources, so a future reader
finds the reasoning at the point where the omission is visible rather than
having to reconstruct it.

## The two stale approved sources — fixed in this PR

Not deferred to the drive-time PR.

| File | Line | State |
|---|---|---|
| `docs/approved-copy/V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md` | 81 | **updated** — ¶2 replaced, dated as-built note added |
| `docs/approved-copy/V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md` | 67 | **updated** — ¶2 replaced, dated as-built note added |

Both notes follow the convention already used in
`V1_0_ES_Adaptation_9_Articles_Wave1_Lisa_Collio.md`: a dated
`⚠️ AS-BUILT CORRECTION` block at the top, recorded so a rebuild from the file
cannot regress the live site, rather than a silent edit to approved body copy.
Each records what the paragraph used to say, that the Capitol Limited was merged
into the Floridian on 10 November 2024, what serves Elkhart today, why the
replacement names no route at all, and the Washington DC decision above.

**Verified, not assumed:** the ¶2 text in each source is now **byte-identical**
to the paragraph on its live page — compared programmatically after stripping the
`<p>` wrapper. Both return `True`.

**Repo-wide, "Capitol Limited" now appears only inside the as-built notes and
this project's own tracking documents** — never in body copy, never on a live
page, and never in a source a rebuild would draw from. The regression path is
closed.

### Also needs doing outside the repo

**Both updated files should go into Lisa's Claude Project**, replacing the
copies there, so the Project and the repo do not diverge. Claude Code has no
tool access to the Project panel — this is the Audit Checklist Part C1 boundary,
and it is Lisa's action, not something this PR can complete.

## PR 1 — final state

| | |
|---|---|
| Source photographs uploaded | 27 |
| Cleared | 26 |
| **Processed** | **25** — 100 files in `assets/images/sections/` |
| Rejected | 1 — `elkhart-moving-elkhart-or-goshen`, Ruling 3, final |
| Article featured images rebuilt | 24 slugs — 96 files in `assets/images/blog-headers/` |
| Build records | `SECTION_JOBS` +25 with blob SHAs · `CLEAN_JOBS` 18 repointed, 6 added |
| Copy | ¶2 replaced on 2 live pages + 2 approved sources, both languages |
| Reproducibility | `--sections` re-run reproduces all 100 files byte-for-byte |
| Gates | `npm run audit` all hard checks · `npm run check:images` every variant in scope |
| **Wired to a page** | **nothing** — that is PRs 2–4 |

Next: PR 2 wires `/moving-to-elkhart/` + `/es/mudarse-a-elkhart/` — 12 section
images and their alt text, **28 strings** across the pair, to Lisa for approval
in both languages before merge under the Section 13 gate.
