# Elkhart images — PHASE 2 validation + expanded-scope confirmation

*Lisa Collio, Real Estate Agent · 2 August 2026 · Claude Code*

Phase 2 of `docs/drafts/V1_0_Claude_Code_Instructions_Elkhart_Images_Lisa_Collio.md`,
plus the scope confirmation for reusing FAQ images as article featured images.

**Report only. Nothing processed, renamed, wired, or generated.** Measured
against `origin/main` at `8fbe704`; branch was re-cut from that commit because
PR #99 (Phase 0) merged and a merged PR ends its branch.

**Verdict: all 27 files pass. One file needs Lisa's provenance ruling before
processing. The expanded scope is buildable and adds 22 article pages.**

---

## 1. FILENAMES — 27 files, zero defects, and the "28" explained

### The 28th file does not exist

`assets/images/elkhart/` holds **28 tracked entries: 27 `.jpg` files and
`.gitkeep`.** The prior session's "28" counted the placeholder. Verified against
git rather than the working tree (`git ls-tree origin/main assets/images/elkhart/`
→ 28 lines, one of which is `.gitkeep`), and `git status` is clean, so the
working tree and `main` agree.

There is no unidentified 28th image and nothing is being held back for
confirmation on that basis.

### All 27 expected filenames present, none extra

Compared against the 26 approved manifest rows plus the approved addition
`elkhart-living-faq-downtown.jpg`:

- **Missing from disk: none.**
- **On disk but not expected: none.**
- Exact set match, 27/27.

### Goshen defect scan — clean

Scanned every directory entry for the patterns that cost 14 renames on the
Goshen batch, rather than working from a list:

| Defect | Goshen | Elkhart |
|---|---|---|
| Stray space after a hyphen (`elkhart-living-city- resources.jpg`) | 12 | **0** |
| `.jpeg` extension | 1 | **0** |
| Double dot (`..jpg`) | 1 | **0** |
| Uppercase character | — | **0** |
| Underscore instead of hyphen | — | **0** |
| Leading/trailing whitespace | — | **0** |

**No renames needed.** This batch was named correctly on upload.

Also checked: **no two files are byte-identical** (SHA-256 over all 27). All 27
are distinct images, so nothing is an accidental duplicate upload.

---

## 2. PROVENANCE — 26 of 27 carry camera EXIF; one needs Lisa's ruling

| # | File | Make / model | Captured |
|---|---|---|---|
| 1 | `elkhart-moving-location-commute.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:11:45 |
| 2 | `elkhart-moving-employers.jpg` | Apple iPhone 16 Pro | 2026:07:24 19:48:46 |
| 3 | `elkhart-moving-schools.jpg` | Apple iPhone 16 Pro | 2026:07:23 16:20:26 |
| 4 | `elkhart-moving-housing-stock.jpg` | **Canon EOS M50m2** | **2023:12:28 13:12:32** |
| 5 | `elkhart-moving-cost-of-living.jpg` | Apple iPhone 16 Pro | 2026:07:23 16:43:57 |
| 6 | `elkhart-moving-trade-offs.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:12:30 |
| 7 | `elkhart-moving-elkhart-or-goshen.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:43:57 |
| 8 | `elkhart-moving-cta-closing.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:47:27 |
| 9 | `elkhart-moving-faq-things-to-do.jpg` | Apple iPhone 16 Pro | 2026:07:23 20:21:53 |
| 10 | `elkhart-moving-faq-community-events.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:42:18 |
| 11 | `elkhart-moving-faq-cost-of-living.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:05:27 |
| 12 | `elkhart-moving-faq-moving-from-out-of-state.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:10:21 |
| 13 | `elkhart-moving-faq-older-home-checklist.jpg` | **— none —** | **— none —** (file date 2025:12:05) |
| 14 | `elkhart-moving-faq-rv-industry-job.jpg` | Apple iPhone 16 Pro | 2026:07:24 20:39:27 |
| 15 | `elkhart-living-city-at-a-glance.jpg` | Apple iPhone 16 Pro | 2026:07:23 18:45:06 |
| 16 | `elkhart-living-downtown.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:43:25 |
| 17 | `elkhart-living-rivers-parks-outdoors.jpg` | Apple iPhone 16 Pro | 2026:07:23 16:46:21 |
| 18 | `elkhart-living-museums-arts.jpg` | Apple iPhone 16 Pro | 2026:07:23 19:42:11 |
| 19 | `elkhart-living-annual-events.jpg` | Apple iPhone 16 Pro | 2026:07:23 16:43:06 |
| 20 | `elkhart-living-history.jpg` | Apple iPhone 16 Pro | 2026:07:23 19:08:20 |
| 21 | `elkhart-living-why-lisa.jpg` | Apple iPhone 16 Pro | 2026:07:23 18:42:28 |
| 22 | `elkhart-living-cta-closing.jpg` | Apple iPhone 16 Pro | 2026:07:23 20:27:22 |
| 23 | `elkhart-living-faq-known-for.jpg` | Apple iPhone 16 Pro | 2026:07:30 21:14:10 |
| 24 | `elkhart-living-faq-school-district.jpg` | Apple iPhone 16 Pro | 2026:07:24 20:19:01 |
| 25 | `elkhart-living-faq-downtown.jpg` | Apple iPhone 16 Pro | 2026:07:23 17:11:01 |
| 26 | `elkhart-living-faq-employers.jpg` | Apple iPhone 16 Pro | 2026:07:24 19:49:19 |
| 27 | `elkhart-living-faq-landmarks.jpg` | Apple iPhone 16 Pro | 2026:07:23 20:29:31 |

25 files are iPhone 16 Pro captures from the 23–24 July shoot (one, #23, from
30 July). That is a far cleaner provenance picture than Goshen, where 11 of 31
had no camera EXIF and four turned out not to be photographs.

### The one file with no camera EXIF — **HOLD**

**`elkhart-moving-faq-older-home-checklist.jpg`** — no `Make`, no `Model`, no
`DateTimeOriginal`. 16 EXIF tags survive; `Software` reads
**"Adobe Photoshop CC (Windows)"** and `DateTime` is 2025:12:05 16:53:28.

Per the instructions this is a hold, not a rejection: **do not process or wire it
until Lisa confirms it is her original photography.** Missing EXIF is not proof
of anything — Photoshop export strips camera tags routinely.

**What the evidence actually suggests, so Lisa is not ruling blind.** There is a
strong signal this one is genuine:

| | `elkhart-moving-housing-stock.jpg` (#4) | `elkhart-moving-faq-older-home-checklist.jpg` (#13) |
|---|---|---|
| Dimensions | **2038 × 1359** | **2038 × 1359** |
| Aspect | 1.50 | 1.50 |
| Software | Adobe Photoshop CC (Windows) | Adobe Photoshop CC (Windows) |
| Camera | Canon EOS M50m2 | — stripped — |
| EXIF tags | 49 | 16 |
| Capture | 2023:12:28 | — (file date 2025:12:05) |

Both are the only two files in the batch at 2038 × 1359, both went through the
same Photoshop version, and neither dimension is a native camera output (the
EOS M50 II shoots 6000 × 4000) — so both are exports from the same pipeline, one
of which kept its camera tags and one of which did not. The most economical
reading is that #13 is a Canon photograph from the same library as #4, exported
with metadata stripped.

That is inference from file metadata, not proof of authorship, so it stays a
hold. But it is a materially different situation from the Goshen holds, which
turned out to be stylised illustrations, a composite graphic and a map with
baked-in text.

### Two files predate the July 2026 shoot — worth a look, not a hold

`elkhart-moving-housing-stock.jpg` (Canon, **December 2023**) and
`elkhart-moving-faq-older-home-checklist.jpg` (file date **December 2025**) are
older library images, not from this shoot. Both have full camera EXIF or a
credible pipeline match, so neither is a provenance problem on its own — the
standing rule is Lisa's original photography, not recency. Flagged because they
are also the two lowest-resolution files in the batch (§3) and because "it came
from somewhere else" is the question that mattered on Goshen.

---

## 3. INTEGRITY — full pixel decode, all 27 pass

Decoded every file scanline-by-scanline with truncation errors left enabled
(`ImageFile.LOAD_TRUNCATED_IMAGES = False`), not a header read. Dimensions
reported below are after applying EXIF Orientation, so they are what will
actually be cropped.

| Result | Count |
|---|---|
| **Decode failures / truncated files** | **0** |
| **Below 1200 × 630** | **0** |
| **Portrait-orientation sources** | **0** |
| **Non-1 EXIF Orientation** (the Goshen sideways-person bug) | **0** |

All 27 are landscape. Resolution breakdown:

| Native size | Aspect | Files | Headroom over 1200 wide |
|---|---|---|---|
| 5712 × 4284 | 1.33 | 17 | 4.8× |
| 4032 × 3024 | 1.33 | 5 | 3.4× |
| 3088 × 2316 | 1.33 | 2 | 2.6× |
| 2038 × 1359 | 1.50 | 2 | **1.7×** |

**No upscaling required anywhere.** The two 2038 × 1359 files (#4 and #13) are
the tightest, and still clear 1200 × 630 comfortably — and being 1.50 rather than
1.33, they lose *less* to a 1.9:1 crop than the rest of the batch, not more.

Every EXIF Orientation value is 1, so `_open_oriented()` will be a no-op here.
It should still be used — the convention exists so the next batch is safe, not
because this one needs it.

**Focal-point concerns are a Phase 3 output, not a Phase 2 one.** Every source
here is 1.33 or 1.50 and the target is 1.90, so all 27 lose vertical framing in
the crop. Which subjects survive that — a wordmark, a face near the frame edge —
is judged per photo at processing time and reported then, per the instructions.

---

## 4. FAQ image → article mapping (expanded scope)

### How each mapping was derived

**Not by matching titles or guessing.** Each FAQ block on the live page already
contains its own `faq-more` "Read the full article" link naming the exact EN
article; the corresponding block on the Spanish twin names the ES article. Both
were read out of the page source with a block-scoped parser (`<div class="faq-item…>`
to its closing tag) so nothing spans a block boundary — the failure that attached
two Goshen images to the wrong questions.

Every EN↔ES pair was then cross-checked against `content/hreflang-pairs.json`.
All 11 pairs are present and agree with the on-page links. Two independent
sources, no inference.

### `/moving-to-elkhart/` ↔ `/es/mudarse-a-elkhart/` — 6 images

| FAQ image | EN article | ES twin |
|---|---|---|
| `elkhart-moving-faq-things-to-do` | `/blog/community/things-to-do-in-elkhart-indiana/` | `/blog/spanish/que-hacer-en-elkhart-indiana/` |
| `elkhart-moving-faq-community-events` | `/blog/community/community-events-in-elkhart-indiana/` | `/blog/spanish/eventos-comunitarios-elkhart-indiana/` |
| `elkhart-moving-faq-cost-of-living` | `/blog/community/cost-of-living-in-elkhart-indiana/` | `/blog/spanish/costo-de-vida-elkhart-indiana/` |
| `elkhart-moving-faq-moving-from-out-of-state` | `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | `/blog/spanish/mudarse-a-elkhart-indiana-desde-otro-estado/` |
| `elkhart-moving-faq-older-home-checklist` ⚠ | `/blog/community/buying-an-older-home-in-elkhart-indiana/` | `/blog/spanish/comprar-casa-antigua-elkhart-indiana/` |
| `elkhart-moving-faq-rv-industry-job` | `/blog/community/working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana/` | `/blog/spanish/trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana/` |

⚠ = the provenance hold from §2. It blocks two article pages as well as its FAQ slot.

### `/living-in-elkhart/` ↔ `/es/viviendo-en-elkhart/` — 5 images

| FAQ image | EN article | ES twin |
|---|---|---|
| `elkhart-living-faq-known-for` | `/blog/community/what-is-elkhart-indiana-known-for/` | `/blog/spanish/por-que-es-conocido-elkhart-indiana/` ★ |
| `elkhart-living-faq-school-district` | `/blog/community/elkhart-indiana-school-districts/` | `/blog/spanish/distrito-escolar-elkhart-indiana/` ★ |
| `elkhart-living-faq-downtown` | `/blog/community/downtown-elkhart-indiana/` | `/blog/spanish/centro-de-elkhart-indiana/` |
| `elkhart-living-faq-employers` | `/blog/community/elkhart-indiana-industries-employers/` | `/blog/spanish/industrias-empleadores-elkhart-indiana/` ★ |
| `elkhart-living-faq-landmarks` | `/blog/community/elkhart-indiana-landmarks-amenities/` | `/blog/spanish/lugares-emblematicos-elkhart-indiana/` ★ |

★ = **this Spanish article has no featured image at all today.** See §4b.

This mapping is only possible because PR #103 synced the Spanish Living FAQ to
the English five topics (Option A from the Phase 0 report). Before that merge,
four of these five had no Spanish counterpart question and the mapping could not
have been made.

### 4a. FAQ images with no article match — **none**

All 11 resolve to a live EN article and a live ES twin. Every target directory
exists on disk.

### 4b. Articles with no matching FAQ image

**One place article is uncovered:**

| Article | ES twin | Note |
|---|---|---|
| `/blog/community/elkhart-indiana-location-nearby-cities/` | `/blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/` | Not linked from any Elkhart FAQ, so no FAQ image maps to it |

Worth Lisa knowing: the **section** image `elkhart-moving-location-commute.jpg`
("Where Elkhart sits, and what that means for getting around") is an exact
subject match for this article. Extending the reuse to that one section image
would cover it and bring the Elkhart place-article set to complete. **Not
proposed and not built** — Lisa scoped this to FAQ images, and it is one of the
four high-risk slots from §7 of the Phase 0 report. Flagging it as an option.

`/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` is also
uncovered; it is a track-record article, not a place article, and no FAQ image
belongs on it.

**A second, larger gap this exposes.** Four Spanish articles (★ above) currently
have **no featured image and no `og:image` at all** — verified by parsing each
page. They are the Wave 1 Spanish set, and they are exactly the four pairs sitting
in `content/image-parity-baseline.json` at `enImages 6 / esImages 5`. The missing
image *is* that gap. Lisa's expanded scope closes four recorded EN/ES defects as a
side effect, which is the strongest argument for doing it.

That also makes a mechanical consequence unavoidable, and it is easy to miss:
**those four baseline entries must be deleted in the same PR.** Audit check 14
errors when a baselined pair reaches parity — "the gap is resolved, delete this
pair" — so leaving them behind turns a fix into a failing build.

---

## 5. Expanded scope — pages and images

### Pages: 26

| | Pages |
|---|---|
| Community pillar pages (4) — `/moving-to-elkhart/`, `/living-in-elkhart/`, `/es/mudarse-a-elkhart/`, `/es/viviendo-en-elkhart/` | 4 |
| EN authority articles | 11 |
| ES authority articles | 11 |
| **Total** | **26** |

### Source photographs: 27 — unchanged

No new photography. 11 of the 27 do double duty as both a section/FAQ image and
an article featured image.

### Derived files: 196

| Output | Naming | Slugs/names | Files each | Files |
|---|---|---|---|---|
| `assets/images/sections/` | `{name}.jpg` 1200×630 · `{name}-thumb.jpg` 800×420 · `.webp` beside each | 27 | 4 | **108** |
| `assets/images/blog-headers/` | `{slug}-header.jpg` 1200×630 · `{slug}-thumb.jpg` 800×420 · `.webp` beside each | 22 | 4 | **88** |
| **Total** | | | | **196** |

Of the 88 featured-image files, **72 overwrite existing clean images** (the 18
articles that already have one) and **16 are new** (the four ★ Spanish articles).

### Per-page image counts after wiring, by class

| Page | `section-figure` | `faq-item--media` | total `<img>` |
|---|---|---|---|
| `/moving-to-elkhart/` | 8 | 6 | 6 → **20** |
| `/es/mudarse-a-elkhart/` | 8 | 6 | 6 → **20** |
| `/living-in-elkhart/` | 8 | 5 | 6 → **19** |
| `/es/viviendo-en-elkhart/` | 8 | 5 | 6 → **19** |
| 18 articles with an existing header | — | — | unchanged (6 each) |
| 4 ★ Spanish articles | — | — | 5 → **6** |

Neither Elkhart pillar pair is in `image-parity-baseline.json`, so check 14
enforces strict parity on them: 20/20 and 19/19. Both hold.

### One structural note on the reuse

Section images and featured images are **different classes with different
directories and different naming**, and the generator says so explicitly: section
images "never appear in `og:image`, `twitter:image`, the schema `image` field, or
a page hero, and they are not keyed by page slug."

So "reuse the FAQ image as the featured image" means generating a **second
derived set from the same camera original** into `blog-headers/` under the
article slug — not pointing an article at the `sections/` file. Pointing at
`sections/` would break the invariant that every slug in `blog-headers/` is
classified as overlay-or-clean, which `npm run check:images` asserts.

Consequence worth stating: EN and ES article slugs differ, so the same photo
produces two identically-framed files under two names. That is already the
existing convention in `blog-headers/` — verified on three EN/ES pairs — so this
introduces nothing new.

---

## 6. Featured-image standard — confirmed clean, with one trap

**Confirmed: nothing in the build config would apply an overlay to any of these
22 articles.** Checked three independent ways.

1. **`OVERLAY_SCOPE` has 37 entries and none of the 22 slugs is among them.**
   All 37 are Buyers/Sellers cluster slugs. Enumerated and compared
   programmatically, not read by eye.
2. **The guard refuses out-of-scope slugs rather than compositing them.**
   `_require_overlay_scope()` raises `ValueError` for any slug not in
   `OVERLAY_SCOPE`, and every overlay entry point calls it. An accidental overlay
   call on these slugs cannot produce a file — it errors.
3. **Section images have no overlay code path at all.** `generate_section()` only
   crops and resizes; the file states Communities pages sit outside the exception
   so "there is no overlay variant of this function and no rotation to track."

Cross-checked against `docs/FEATURED_IMAGE_OVERLAY_AUDIT.md` (status: RESOLVED,
PR #71): **none of the 22 slugs appears in the flagged list**, so no existing
header among them carries baked-in text or the cutout. The 18 that already have
images are in `CLEAN_JOBS` — already clean, and being replaced with clean.

`npm run check:images` passes on `main` today: 89 slugs, 37 in scope, 52 clean,
27 section images — "every variant matches its scope." `npm run audit` passes all
hard checks (1 SEO warning, pre-existing, unrelated).

### The trap — `CLEAN_JOBS` must be edited, not just overwritten

`CLEAN_JOBS` records the source photo and crop behind every clean image so they
can be rebuilt byte-for-byte with `--clean`. **18 of the 22 slugs are in it,
pointing at their current source photos.**

Overwriting the output files without updating those entries would leave the
script able to silently revert all 18 to the old photos on the next `--clean`
run. Two things Phase 3 must do in the same PR:

- **Repoint the 18 existing `CLEAN_JOBS` entries** to their Elkhart source photos.
- **Add the 4 ★ Spanish slugs to `CLEAN_JOBS`**, which currently classifies 52
  slugs against 89 in `blog-headers/`; adding four images without four entries
  breaks the partition that `check:images` asserts.

And `SECTION_JOBS` holds 27 Goshen entries and **zero Elkhart entries** today —
all 27 Elkhart names get added there, each with source, focal point, crop and the
original's git blob SHA per the Phase 3 convention.

---

## 7. What Lisa needs to decide before Phase 3

1. **`elkhart-moving-faq-older-home-checklist.jpg` — is it your photograph?**
   The only blocker. No camera EXIF; strong circumstantial match to the Canon
   file (§2). It gates one FAQ slot plus two article pages. If it is not yours,
   it goes to `rejected-assets.txt` and those three slots stay empty on purpose.
2. **Approve the 11-image → 22-article mapping** in §4.
3. **`/blog/community/elkhart-indiana-location-nearby-cities/` and its ES twin** —
   leave uncovered, or extend the reuse to `elkhart-moving-location-commute.jpg`?
4. **Confirm the two pre-2026 library images** (#4 Canon Dec 2023, #13 Dec 2025)
   are intended for this batch.

Everything else is measured and clear: filenames need no renames, 26 of 27 have
camera EXIF, all 27 decode cleanly and clear 1200 × 630 in landscape, and the
clean-photo standard is enforced by construction.

## 8. Not done, on purpose

No image processed, cropped, resized, converted, renamed, or wired. No page
edited. `SECTION_JOBS`, `CLEAN_JOBS`, `image-parity-baseline.json` and
`rejected-assets.txt` all untouched. Phase 3 not started.
