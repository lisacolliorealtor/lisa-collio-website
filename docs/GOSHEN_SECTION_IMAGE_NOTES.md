# Goshen Section & FAQ Images — Processing Notes and Open Flags

*Claude, 29 July 2026. Companion to
`docs/approved-copy/V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md`.*

All 31 Goshen section/FAQ images are processed and web-ready: 1200×630 JPEG
(q88, progressive) with a WebP (q85) beside each, matching the geometry and
encoder settings used everywhere else on the site. They are clean photos — no
band, no title, no cutout — per the Master Plan v2.10 default for everything
outside `OVERLAY_SCOPE`.

Regenerate at any time with:

```
python3 scripts/generate-featured-images.py --sections
```

The job table is `SECTION_JOBS_GOSHEN` in that script. Each entry records the
git blob SHA of the untouched original camera file, so the script always reads
from history rather than from whatever is on disk — re-running is byte-for-byte
repeatable, and any original can be recovered with:

```
git cat-file blob <sha> > original.jpg
```

---

## Flag 1 — one portrait crop clips its subject — STILL OPEN

`goshen-living-faq-known-for.jpg` is the carved "GOSHEN — THE MAPLE CITY"
emblem, shot in portrait. The 1.9:1 band keeps the maple leaves but **clips
both words**: the top of "GOSHEN" and the bottom of "THE MAPLE CITY" are cut
off, so the emblem reads as fragments.

No focal point fixes this — the words sit at opposite ends of a tall circular
emblem, and the band is only about 46% of the source height. At `focal_y` 0.5
the band spans 27%–73% of the source, and the two words sit outside that range
at roughly 12%–28% and 72%–88%.

**Re-upload attempt, 29 July — no change.** A replacement "uncropped version"
was uploaded to `main` (commit `9a588b3`). That commit is **empty**: its tree
is identical to its parent's, and the file at that path is still blob
`0de49f09…`, byte-identical to the original already in `SECTION_JOBS_GOSHEN`.
The same 3583×4048 portrait went in, so the same fragmented crop came out —
confirmed by re-running `--sections` and diffing (output hash unchanged).

Worth knowing for the next attempt: `main` never held a cropped version. The
crop exists only on the PR branch, so the file on `main` *was* already the
uncropped original — re-uploading it changes nothing. A genuinely different
photo is needed.

Options, all still needing Lisa's call:

1. Shoot or supply the emblem **in landscape**, framed so the full circle
   fits within a 1.9:1 band.
2. Use a different photo for the "What is Goshen known for?" FAQ slot.
3. Accept the leaves-only crop as decorative texture, knowing the wordmark is
   not legible.

The other six portrait sources crop cleanly and need no action.

## Flag 2 — visible business names on evergreen pillar pages

Several photos carry legible business signage. The compliance checklist in
CLAUDE.md bars "specific business, restaurant, or shop names on evergreen
pillar pages," allowing them only on dated blog articles that carry a
verify-current-details disclaimer. `/living-in-goshen/` and
`/moving-to-goshen/` are evergreen pillar pages.

| image | visible signage |
|---|---|
| `goshen-living-downtown.jpg` | "FOUND" storefront, plus street number 208 |
| `goshen-living-arts-culture.jpg` | "Goshen Historical Museum", "LUGGAGE", "JEWELRY" |
| `goshen-living-known-for.jpg` | "Electric Brew", "Goshen's Original Coffee House" |

**Decision (Lisa, 29 July 2026): keep all three photos, no swap. Alt text is
written generically, without naming the business.** That closes the image
question. The alt text below is locked for these three and must be used
verbatim when the images are wired into a page:

| image | approved EN alt text |
|---|---|
| `goshen-living-downtown.jpg` | `A restored downtown storefront with large display windows in Goshen, Indiana.` |
| `goshen-living-arts-culture.jpg` | `A historic museum building with an awning on a downtown street in Goshen, Indiana.` |
| `goshen-living-known-for.jpg` | `Lisa Collio standing on a downtown street corner in Goshen, Indiana, with a coffee shop exterior behind her.` |

Spanish twins share the same image files but take their own alt text per Master
Plan §7; adapt these culturally rather than translating them, and keep them
equally generic. Alt text for the other 28 images is drafted at wiring time,
against the page each one lands on.

No business name may appear in a caption, `title` attribute, `figcaption`, or
surrounding sentence for these three either.

---

## Flag 3 — the pillar pages already name businesses in body copy — NEW, NEEDS A DECISION

Checking that no *other* copy on these pages names the three businesses turned
up something larger: **`/living-in-goshen/` already names eleven businesses in
a single paragraph of body copy**, including two of the three in question.

`living-in-goshen/index.html:231` and its Spanish twin
`es/viviendo-en-goshen/index.html:232` name: The Nut Shoppe, Olympia Candy
Kitchen, Woldruff's Footwear, Fables Books, The Electric Brew, Found, Ten
Thousand Villages, The Soapy Gnome, Jules Boutique, and Twice as Nice.

Under the compliance checklist as written — "no specific business, restaurant,
or shop names on evergreen pillar pages" — this is the exact pattern the rule
bars, and it is far more prominent than a business name appearing incidentally
in a photograph. Generic alt text on three images sits oddly beside a paragraph
that names ten shops outright.

**Not actioned.** This is broker-approved page copy, and rewriting it is a
content change requiring Lisa's approval and broker sign-off, not an image-batch
side effect. Recorded here for a decision.

Two related observations, offered as facts rather than conclusions:

- **Other named entities on these pages are arguably a different category.**
  `/moving-to-goshen/` names employers (Jayco, Thor Industries, Lippert
  Components, Keystone RV, Forest River), public institutions (Goshen College,
  IU Health Goshen Hospital, Goshen Community Schools), parks, and events. The
  rule's wording — "business, restaurant, or shop" — reads as aimed at retail
  and dining recommendations that go stale, not at naming an employer in an
  employment context. Worth confirming that reading.
- **The blog exemption's condition may not be met.** The rule permits business
  names on "dated blog articles carrying a verify-current-details disclaimer."
  `/blog/community/things-to-do-in-goshen-indiana/` names businesses and
  carries only the standard site-wide footer stack — there is no distinct
  verify-current-details snippet anywhere in the repo. Either the content
  reliability disclaimer in the footer is intended to serve that purpose, in
  which case it is on the pillar pages too and the exemption does not
  distinguish them, or the snippet the rule anticipates was never built.

## Not a flag — orientation

Seven of the 31 sources are portrait. Lisa chose (29 July) to hold all 31 to
the standard 1200×630 rather than introduce a second aspect ratio for section
images. Per-image `focal_y` values in `SECTION_JOBS_GOSHEN` were set by eye to
hold each subject in the band; six of the seven land well, and the seventh is
Flag 1 above.

## Still outstanding

- `assets/images/elkhart/` is empty. The 26 Elkhart images in the manifest are
  not yet uploaded, so no Elkhart section jobs exist yet.
- Four references to `assets/images/elkhart/downtown-lerner-theatre.jpg` remain
  in `docs/approved-copy/`, two of them inside photo-slot lists naming six
  legacy landmark filenames the manifest proposes retiring as a group. One
  decision, pending the Elkhart photos.
- None of the 31 images is referenced by a page yet. Wiring them into
  `/living-in-goshen/` and `/moving-to-goshen/` (and their Spanish twins, which
  share the same files per Master Plan §7) is separate work.
