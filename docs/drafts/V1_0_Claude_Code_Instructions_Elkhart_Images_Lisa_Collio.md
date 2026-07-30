# Claude Code Instructions — Elkhart Section & FAQ Images

*Lisa Collio, Real Estate Agent · 29 July 2026 · v1.0*

**Read first:** `V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md` (the manifest), Master Plan v2.11 §8, `content/source/rejected-assets.txt`, `docs/SPANISH_STYLE_DECISIONS.md`, `V2.1 Pre Launch Punch List Lisa Collio.md`.

> **As-built corrections, 30 July 2026** (Claude, at Lisa's direction — recorded
> here rather than rewritten into the body copy above, per the standing
> convention):
>
> - The "Read first" punch-list reference read **v2.0**; corrected to **v2.1**,
>   which is the version committed at `docs/V2.1 Pre Launch Punch List Lisa
>   Collio.md`. No v2.0 exists in the repo.
> - Repo paths for the other "Read first" items, verified present on `main`:
>   `docs/approved-copy/V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md` ·
>   `content/source/rejected-assets.txt` · `docs/SPANISH_STYLE_DECISIONS.md`.
> - **Scope line (`26 images`) is wrong: the measured figure is 27.** One live
>   FAQ slot — "What is downtown Elkhart like?" on `/living-in-elkhart/` — has no
>   filename in the manifest. See `docs/ELKHART_IMAGE_PHASE_0_RECONCILIATION.md`
>   for the measurement and the proposed manifest row.
> - This file was uploaded to `docs/` and moved to `docs/drafts/` with its name
>   normalised to the repo's underscore convention (matching the sibling
>   `V1_0_Claude_Code_Instructions_Text_Overlay_Exception_Lisa_Collio.md`).
>   Content is otherwise byte-identical to Lisa's upload apart from the two
>   edits above.

**Workflow:** commit this file to `docs/drafts/` as your first step. Build on a PR branch. Lisa approves at merge; the managing broker signs off once, comprehensively, before launch — not per PR. Lisa's merge is the only publish trigger.

**Scope:** 26 images across four pages — `/moving-to-elkhart/`, `/living-in-elkhart/`, `/es/mudarse-a-elkhart/`, `/es/viviendo-en-elkhart/`.

---

## Why this file is detailed

The Goshen batch took roughly a dozen rounds. Almost none of that was the photography — it was drift between the manifest and the live pages, filename mismatches, a whole image class that went unmeasured, and provenance problems found after processing. Every phase below exists because something went wrong in that order on Goshen. Follow the sequence; don't compress it.

---

## PHASE 0 — Reconcile before Lisa shoots anything

**Do this first and report back. Lisa is not shooting until this returns.**

On Goshen, the manifest had drifted from the live pages: `/moving-to-goshen/` had an RV-industry FAQ with no filename, and `/living-in-goshen/` had a "Where people work" section with no slot at all. Both were found *after* the photos were taken.

1. Confirm `V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md` is committed on `main`. It drove the entire Goshen build while existing only as a chat upload; that must not repeat.
2. Reconcile the Elkhart half of the manifest against all four live Elkhart pages. Report:
   - Sections or FAQ items on a live page with **no** manifest filename
   - Manifest filenames with **no** matching section on any page
   - Any **EN/ES structural difference** — a section or FAQ item present in one language but not the other
3. Count both image classes separately and say so explicitly: `section-figure` (body sections) and `faq-item--media` (FAQ blocks). On Goshen, PR #81 measured only `section-figure`, reported "images," and the Spanish FAQ gap went undetected for days. **Count every `<img>`, and name the class when you report a number.**
4. Flag the abstract titles that no literal photograph fits — e.g. "Where Elkhart sits, and what that means for getting around," "The honest trade-offs," "Elkhart or Goshen?" Lisa decides per title: representative photo, or intentionally image-free like `/living-in-goshen/`'s "Where people work."

**Deliverable: a final, confirmed shot list with a real count, for Lisa's sign-off before she shoots.**

---

## PHASE 1 — Lisa uploads

Lisa uploads originals to `assets/images/elkhart/` via the GitHub web UI. Your clone will predate that — fetch and rebuild your branch off the new `main` before looking. On Goshen you reported the folder empty when the files were already on `main`.

Guidance already given to Lisa: shoot landscape (a 1.9:1 crop cannot recover a portrait source — the Maple City emblem is still unusable for this reason); her original photography only; exact filenames from the manifest.

---

## PHASE 2 — Validate before processing

Run all three. Report before doing anything else.

**Filenames.** Compare every file to the manifest, exactly. Goshen needed 14 renames: 12 with a stray space after a hyphen (`elkhart-living-city- resources.jpg`), one `.jpeg`, one double dot (`..jpg`). Scan for the pattern yourself — don't rely on a list from a screenshot.

**Provenance.** Read EXIF on every file. Report camera make/model and capture timestamp, and list any file with **no camera EXIF at all**. On Goshen, 11 of 31 had none; four turned out to be stylised illustrations, a composite graphic, and a map with baked-in text. Missing EXIF is not proof of anything — editing strips it — but it is the flag that triggers Lisa's ruling. **Do not process or wire anything with no camera EXIF until Lisa confirms it is hers.** Anything she rejects goes into `content/source/rejected-assets.txt`, gets marked ⛔ REJECTED in the manifest, and is enforced by `audit.js` check 15.

**Integrity.** Full pixel-level decode on every file, not a header read. Report dimensions and confirm each clears 1200×630 without upscaling.

---

## PHASE 3 — Process

Use the established `SECTION_JOBS` convention from the Goshen run. Do not invent a new one.

| | |
| --- | --- |
| Source library | `assets/images/elkhart/` — originals |
| Derived output | `assets/images/sections/` — page-ready |
| Sizes | `{name}.jpg` 1200×630 · `{name}-thumb.jpg` 800×420 |
| Formats | JPEG q88 progressive optimized · WebP q85 method 6 beside each |
| Overlay | **None.** Communities pages are outside `OVERLAY_SCOPE` — clean photo, no text, no cutout |
| Tracking | `SECTION_JOBS` with source, focal point, crop, and the original's **git blob SHA** so every image stays regenerable from history |

Use `_open_oriented()`, not plain `Image.open()`. A Goshen photo with EXIF Orientation 6 rendered a person lying sideways.

Report focal-point concerns rather than shipping a bad crop silently — a wordmark cut into fragments, a face at the frame edge, a subject that doesn't survive 1.9:1.

---

## PHASE 4 — Wire EN and ES in the same PR

**This is the single most important instruction in this file.**

On Goshen the English pages were wired and the Spanish pages sat at zero images, surfacing only because Lisa happened to look at a page. Per the build procedure, EN/ES divergence is the most serious failure mode in this project.

- Wire all four pages in one PR. Never ship one language and follow with the other.
- EN and ES share the **same image file** per §7. Only the alt text differs.
- Use **block-scoped** matching when inserting. On Goshen a regex spanned a block boundary and attached two images to the wrong questions — the images were fine, the alt text described a different question, which is an accessibility defect as much as an editorial one.
- After wiring, report **measured** per-page counts by class for all four pages. Not assumed.
- `audit.js` check 14 enforces EN/ES image-count parity via `content/hreflang-pairs.json`, and check 16 enforces FAQ image↔question-link agreement. Both must pass.

---

## PHASE 5 — Alt text (Lisa approves before merge)

Alt text is **copy** under the Section 13 gate. It has been the source of more compliance findings than any other element in this project. Draft it, list every string in full, and wait.

**Fair Housing — absolute.** No banned term in either language. "Quiet"/"tranquila" reached live pages in both languages before check 17 existed. Check 17 now scans alt attributes against `content/source/fair-housing-terms.txt`; it must pass. The banned categories: movement/ambulatory, familial status, age, religion/national origin, coded qualitative.

**Business names.** Evergreen pillar pages name no specific retail or dining businesses, in copy or alt text. Rulings already made and binding here:
- **Landmarks stay named** — Old Bag Factory, Lerner Theatre, Ruthmere, Wellfield Botanic Gardens
- **Employers stay named** in an employment context — Thor, Forest River, Keystone, Lippert, Jayco
- **Institutions and parks stay** — schools, hospitals, colleges, county parks
- **Retail and dining names come out**, including tenants of a named landmark
- Shopping-centre place names are outside the rule

**Describe what is visible.** Two Goshen strings had to be corrected for asserting things the photograph doesn't establish: a material ("cast-iron") and an architectural classification ("American Foursquare"). Open the image and describe the frame.

**Spanish.** Native, usted register, never translated from the English. Equal descriptiveness to its English twin — a Spanish screen-reader user gets the same information as an English one. `docs/SPANISH_STYLE_DECISIONS.md` holds the standing rulings; "maple" not "arce."

**Check the English too.** Every alt-text defect Lisa flagged in Spanish on the Goshen run existed identically in English on `main`. When you fix one language, check its twin.

---

## PHASE 6 — Retire the legacy Elkhart filenames

Six landmark-based filenames predate the manifest and appear across four documentation lines. They point at files that do not exist. Nothing in built HTML references them, so nothing is broken today — but a page rebuilt from those sources would produce broken images.

Files: `downtown-lerner-theatre.jpg`, `island-park.jpg`, `wellfield-botanic-gardens.jpg`, `riverwalk.jpg`, `ruthmere-museum.jpg`, `neighborhood-street-elkhart.jpg`

References: `V1_0_Living_in_Elkhart_Page_EN_Lisa_Collio.md` lines 28 and 30 · `V1_0_ES_Viviendo_en_Elkhart_Page_Lisa_Collio.md` lines 29 and 31 (lines 30/31 are "Photo slots" lists naming all six)

Retire the block and repoint to the current manifest filenames. Add a dated as-built correction rather than editing approved body copy — the same convention used when the Spanish Goshen authoring record was found still holding retired copy.

---

## Standing rules

- **Branch discipline.** Never stack a PR on unmerged work; PR #67 stranded seven Spanish articles that way. Delete a branch when its PR merges. The git proxy blocks ref deletion — tell Lisa which branches to delete in the GitHub UI, with exact names.
- **Preserving work.** Committing WIP to a feature branch to survive container reclaim is fine and encouraged. Never to `main`, never opening a PR without asking.
- **Report before acting** when Lisa says so, but flag anything that looks like a deliberate gap before "fixing" it. A rejected asset reads exactly like an oversight; that is why check 15 exists.
- **Verify, don't assert.** State what you measured and how. Several Goshen reports were true about what they measured and wrong about what they claimed. When Lisa's premise is wrong, say so — three of her framings on the Goshen run were corrected by checking, and each correction improved the outcome.
- **Caching.** `/assets/` now runs `max-age=86400, must-revalidate`. New paths under `assets/images/sections/` have never been served, so nothing is cached against them. If Lisa reports a stale image, have her check a private window before investigating.

## Elkhart page facts already established

- **Concord Community Schools** is headquartered in Dunlap and its boundary crosses city lines, serving parts of southern Elkhart and northern Goshen. An Elkhart mailing address does not guarantee Elkhart Community Schools assignment. Mirror the Goshen-side caveat, including bus service not being guaranteed, directing confirmation to the district's enrollment office.
- **RV/MH Hall of Fame** has relocated to a facility along the toll road; it is not downtown. The legacy citation is retired.
- **"The northern part of the state"** and similar plain geographic phrasing is accepted fact, not a service-area violation.

## What needs Lisa's sign-off

1. Phase 0 reconciliation result and the final shot list — **before she shoots**
2. Any file with no camera EXIF
3. Every alt-text string, both languages
4. Any focal-point compromise
5. The merge itself
