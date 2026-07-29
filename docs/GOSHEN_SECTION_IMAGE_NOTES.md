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

## Flag 1 — one portrait crop clips its subject

`goshen-living-faq-known-for.jpg` is the carved "GOSHEN — THE MAPLE CITY"
emblem, shot in portrait. The 1.9:1 band keeps the maple leaves but **clips
both words**: the top of "GOSHEN" and the bottom of "THE MAPLE CITY" are cut
off, so the emblem reads as fragments.

No focal point fixes this — the words sit at opposite ends of a tall circular
emblem, and the band is only about 46% of the source height. Options, all
needing Lisa's call:

1. Reshoot or re-crop the emblem in landscape so the full circle fits.
2. Use a different photo for the "What is Goshen known for?" FAQ slot.
3. Accept the leaves-only crop as a decorative texture, knowing the wordmark
   is not legible.

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

The rule as written governs copy, and it is Lisa's and the managing broker's
call whether a photograph of a public streetscape falls under it. Two things
make it worth deciding before these go live rather than after:

- **Alt text is unambiguously copy.** Describing these images accurately will
  put the business name into page text unless the alt text is written to avoid
  it. Alt text should be drafted with this decision already made.
- **A named business can close or rebrand,** which is the reason the evergreen
  rule exists at all.

If the photos are approved as-is, the safe pattern is alt text that describes
the scene generically — "A restored storefront on Main Street in downtown
Goshen, Indiana" — rather than naming the tenant.

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
