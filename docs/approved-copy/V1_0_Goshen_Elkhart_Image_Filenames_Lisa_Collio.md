# Goshen & Elkhart — Section & FAQ Image Filenames

*Prepared for Lisa Collio, Real Estate Agent · July 2026*
*Maps every section/FAQ title from "titles for Elkhart and Goshen photos.docx" to one exact filename. Same image is used on the EN and ES twin pages — only the alt text differs per language, per Master Plan §7.*

> **COMMITTED TO THE REPO 29 July 2026.** This document had been driving the
> entire Goshen image build while existing only as a chat upload — the exact
> failure CLAUDE.md build-procedure rule 3 exists to prevent. It is the
> authoring record; the live site is the verification record.

---

> ## ⛔ REJECTED ASSETS — RULING (Lisa, 29 July 2026)
>
> **Four filenames in this manifest must NOT be wired to any page, in either
> language:**
>
> - `goshen-living-why-lisa.jpg`
> - `goshen-moving-cta-closing.jpg`
> - `goshen-moving-location-commute.jpg`
> - `goshen-moving-faq-moving-from-out-of-state.jpg`
>
> These four are **not Lisa's original photography.** They are composite
> graphics with circular photo insets, supplied with the July 2026 Goshen
> batch. They stay unused until Lisa uploads real replacement photographs
> under the same filenames.
>
> **The slots they were meant to fill are therefore empty ON PURPOSE.** A
> future session that notices "a missing FAQ image on /moving-to-goshen/" or
> "a section with no photo" is looking at a deliberate gap. Do not fill it.
> This ruling is recorded because that mistake was one day from being made:
> the missing sixth FAQ image on `/moving-to-goshen/` was written up as a
> manifest gap worth closing before Lisa caught it.
>
> **Enforced mechanically** by `audit.js` check 15, against
> `content/source/rejected-assets.txt`. Referencing any of the four in any
> variant (`.jpg`, `.webp`, `-thumb`, `-header`) fails the build.
>
> When a replacement arrives: same filename, delete the line from
> `rejected-assets.txt`, process it, wire it normally.

---

> ## ⛔ REJECTED ASSETS — SECOND RULING (Lisa, 2 August 2026)
>
> **Two Elkhart filenames must NOT be wired to any page, in either language:**
>
> - `elkhart-moving-elkhart-or-goshen.jpg`
> - `elkhart-living-rivers-parks-outdoors.jpg`
>
> **Different reason from the Goshen four above — do not conflate them.** These
> two ARE Lisa's original photography and both pass provenance and integrity.
> Each carries text that is legible in the delivered 1200×630 crop: the first
> shows **"NEW LIFE COMMUNITY CHURCH"** on a building face, and it sits on a
> where-should-I-live comparison section — religion is a Fair Housing protected
> class, and Lisa's ruling is that this is a steering risk alt text cannot cure.
> The second shows **"BRASS ELK BREWING"** on a storefront; retail and dining
> names come off evergreen pillar pages, and a legible sign is the same
> violation as naming the business in copy.
>
> A re-crop fixes neither. `_cover_focal()` crops these sources vertically only,
> so `focal_y` cannot move text sideways out of frame, and on the first the
> church sign sits immediately beside the brick turret that anchors the
> composition.
>
> **The two sections they were meant to fill are therefore image-free ON
> PURPOSE** — "Elkhart or Goshen?" on `/moving-to-elkhart/` + `/es/mudarse-a-elkhart/`,
> and "Rivers, parks, and outdoor spaces" on `/living-in-elkhart/` +
> `/es/viviendo-en-elkhart/`. Precedent already exists for an intentionally
> image-free section: "Where people work" on `/living-in-goshen/`.
>
> **Enforced mechanically** by `audit.js` check 15, against
> `content/source/rejected-assets.txt`, which carries both rulings separately.
>
> When a replacement arrives it needs to be a **different photograph of the same
> subject with no legible business or religious signage in frame** — not a
> replacement for a non-photograph. Same filename; delete the line from
> `rejected-assets.txt`, process it, wire it normally.
>
> **SUPERSEDED IN PART — see the third ruling below.**

---

> ## ⏸ THIRD RULING (2 August 2026) — two reversals and one new hold
>
> **1. `elkhart-living-rivers-parks-outdoors.jpg` — REINSTATED.** Lisa's
> "do not use" message crossed with her decision to keep it. Removed from
> `content/source/rejected-assets.txt`; the "Rivers, parks, and outdoor spaces"
> section is wired normally in both languages. **The alt-text constraint
> stands:** name neither the brewery nor any other business visible in frame.
>
> **2. `elkhart-moving-faq-older-home-checklist.jpg` — HOLD RELEASED.** Lisa
> confirmed on 2 Aug that she holds **written consent to publish**, which
> answers the 876 IAC 8-1-8(f) question about the legible house number "916".
> Processed and wired normally. It was never on the rejected list and must not
> be added to it.
>
> **3. `elkhart-moving-elkhart-or-goshen.jpg` — NEW PHOTO, NEW HOLD.** Lisa
> replaced the church-signage streetscape with a playground photo (blob
> `054ec148` → `72383bc5`), same filename. Re-validated in full: it passes
> filename, provenance (Apple iPhone 16 Pro, 2026:07:24 20:59:12, 49 EXIF tags,
> Orientation 1) and integrity (5712×4284 landscape, clean full decode, 4.76×
> the target width), and **it carries no legible business or religious
> signage** — both signs in frame are illegible at output size.
>
> **But it contains at least five children and one adult**, several recognisable
> in the delivered 1200×630 crop, confirmed at 6× zoom. Two problems alt text
> cannot cure: identifiable minors with no release on file, and familial status
> — a Fair Housing protected class — illustrating a where-should-I-live
> comparison, which is the same category of risk the church signage was rejected
> for.
>
> **No crop fixes it**, verified by rendering: `_cover_focal()` crops these
> sources vertically only, the people and the play equipment share the same
> horizontal band, and the only `crop_box` that excludes everyone —
> `(0, 0, 1, 0.60)` — returns tree canopy and sky with a sliver of equipment,
> which does not illustrate the section.
>
> **This is a guard, not a ruling.** Lisa asked for the frame to be checked
> before clearing and the check found this. Her call: accept with consent for
> the minors, supply a third photo, or leave the section image-free. The slug
> stays in `rejected-assets.txt` under Ruling 3 meanwhile so the slot cannot be
> filled by accident.

---

## ⚠️ UPDATED INSTRUCTION (July 2026) — NO TEXT ON BLOG/ARTICLE IMAGES

**Lisa has reversed her earlier instruction.** She previously wanted the article title/headline placed as text directly on each image. **This is now cancelled** — the words were getting cut off in practice, so **no article title, headline, or any other text should ever be baked into these images.**

- Every filename in the tables below should be a **clean photo only** — no overlay text, no color band with wording, no caption burned into the image file.
- The article/section **title displays as normal on-page HTML text** (an H1 or heading), rendered by the site itself — never as pixels inside the image.
- This supersedes the earlier locked "Featured-image standard" (Templates A/B/C with text overlay and the four-variant rotation). That system is retired.
- **This applies retroactively too:** if any images were already built with text baked in, flag them for Claude Code to re-export clean, without text.
- The "never place text over a person's face" caution is now moot for these files (there's no text at all) — but any person-photo Fair Housing considerations otherwise still apply.

**Folder convention:** `assets/images/goshen/` and `assets/images/elkhart/` — lowercase, hyphens, `.jpg`, matches Photo Shot List format.

> **As-built note, 29 July 2026:** the web-ready versions of these files live in
> `assets/images/sections/` (1200×630 plus an 800×420 `-thumb` for FAQ blocks).
> `assets/images/goshen/` holds the unprocessed camera originals and is not
> referenced by any page.

**Note on the old Photo Shot List entries:** the 6 landmark-based filenames previously reserved for `/living-in-goshen/` and `/living-in-elkhart/` (`old-bag-factory.jpg`, `lerner-theatre.jpg`, etc.) predate this section list and no longer map 1:1 to the current headings. Recommend retiring those 6 in favor of the list below, or repurposing a couple as the actual photo *content* for a matching new filename (e.g. the Old Bag Factory photo could BE `goshen-living-arts-culture.jpg`). Your call — flag which you want and I'll update the Photo Shot List doc to match.

**Note on FAQ images:** these are separate from the article's own social-share (og:image) photo. This list covers the small illustration next to each FAQ answer/section on the page itself. Per the updated instruction above, **neither this in-body image nor the article's og:image should carry any text** — both are clean photos only, title text lives in the page's HTML, not the image.

---

## 1. Moving to Goshen — `/moving-to-goshen/`

| Title | Filename |
|---|---|
| Where Goshen sits, and what that means for getting around | `goshen-moving-location-commute.jpg` ⛔ REJECTED |
| What daily life actually looks like here | `goshen-moving-daily-life.jpg` |
| Where people work | `goshen-moving-employers.jpg` |
| Schools | `goshen-moving-schools.jpg` |
| The housing stock | `goshen-moving-housing-stock.jpg` |
| What it costs to live here | `goshen-moving-cost-of-living.jpg` |
| The honest trade-offs | `goshen-moving-trade-offs.jpg` |
| Goshen or Elkhart? | `goshen-moving-goshen-or-elkhart.jpg` |
| One thing worth knowing about buying here from a distance | `goshen-moving-buying-from-distance.jpg` |
| Thinking about a move to Goshen? (closing CTA) | `goshen-moving-cta-closing.jpg` ⛔ REJECTED |
| FAQ: What is there to do in Goshen, Indiana? | `goshen-moving-faq-things-to-do.jpg` |
| FAQ: What community events happen in Goshen during the year? | `goshen-moving-faq-community-events.jpg` |
| FAQ: What does it cost to live in Goshen, Indiana? | `goshen-moving-faq-cost-of-living.jpg` |
| FAQ: How do I move to Goshen from another state? | `goshen-moving-faq-moving-from-out-of-state.jpg` ⛔ REJECTED |
| FAQ: What should I check before buying an older home in Goshen? | `goshen-moving-faq-older-home-checklist.jpg` |
| FAQ: I'm moving to Goshen for an RV industry job. What should I know before buying? | `goshen-moving-faq-rv-industry-job.jpg` |

## 2. Living in Goshen — `/living-in-goshen/`

| Title | Filename |
|---|---|
| What Goshen is known for | `goshen-living-known-for.jpg` |
| Downtown Goshen | `goshen-living-downtown.jpg` |
| Arts, culture, and gathering places | `goshen-living-arts-culture.jpg` |
| Parks and outdoor spaces | `goshen-living-parks-outdoors.jpg` |
| Schools | `goshen-living-schools.jpg` |
| The housing, by ZIP | `goshen-living-housing-by-zip.jpg` |
| Water, weather, and what the city has done about it | `goshen-living-water-weather.jpg` |
| City resources worth knowing about | `goshen-living-city-resources.jpg` |
| Why Lisa works this market | `goshen-living-why-lisa.jpg` ⛔ REJECTED |
| FAQ: What is Goshen, Indiana known for? | `goshen-living-faq-known-for.jpg` |
| FAQ: What school district serves Goshen, Indiana? | `goshen-living-faq-school-district.jpg` |
| FAQ: What is downtown Goshen like? | `goshen-living-faq-downtown.jpg` |
| FAQ: What industries and employers are in the Goshen area? | `goshen-living-faq-employers.jpg` |
| FAQ: What landmarks and amenities does Goshen have? | `goshen-living-faq-landmarks.jpg` |
| Have questions about Goshen? (closing CTA) | `goshen-living-cta-closing.jpg` |

## 3. Moving to Elkhart — `/moving-to-elkhart/`

| Title | Filename |
|---|---|
| Where Elkhart sits, and what that means for getting around | `elkhart-moving-location-commute.jpg` |
| Where people work | `elkhart-moving-employers.jpg` |
| Schools | `elkhart-moving-schools.jpg` |
| The housing stock | `elkhart-moving-housing-stock.jpg` |
| What it costs to live here | `elkhart-moving-cost-of-living.jpg` |
| The honest trade-offs | `elkhart-moving-trade-offs.jpg` |
| Elkhart or Goshen? | `elkhart-moving-elkhart-or-goshen.jpg` ⏸ HELD — replacement photo, see Ruling 3 |
| FAQ: What is there to do in Elkhart, Indiana? | `elkhart-moving-faq-things-to-do.jpg` |
| FAQ: What community events happen in Elkhart during the year? | `elkhart-moving-faq-community-events.jpg` |
| FAQ: What does it cost to live in Elkhart, Indiana? | `elkhart-moving-faq-cost-of-living.jpg` |
| FAQ: How do I move to Elkhart from another state? | `elkhart-moving-faq-moving-from-out-of-state.jpg` |
| FAQ: What should I check before buying an older home in Elkhart? | `elkhart-moving-faq-older-home-checklist.jpg` |
| FAQ: I'm moving to Elkhart for an RV industry job. What should I know before buying? | `elkhart-moving-faq-rv-industry-job.jpg` |
| Thinking about a move to Elkhart? (closing CTA) | `elkhart-moving-cta-closing.jpg` |

## 4. Living in Elkhart — `/living-in-elkhart/`

| Title | Filename |
|---|---|
| The city at a glance | `elkhart-living-city-at-a-glance.jpg` |
| Downtown Elkhart | `elkhart-living-downtown.jpg` |
| Rivers, parks, and outdoor spaces | `elkhart-living-rivers-parks-outdoors.jpg` |
| Museums and the arts | `elkhart-living-museums-arts.jpg` |
| Annual events | `elkhart-living-annual-events.jpg` |
| A brief history | `elkhart-living-history.jpg` |
| What Lisa sees working this market | `elkhart-living-why-lisa.jpg` |
| FAQ: What is Elkhart, Indiana known for? | `elkhart-living-faq-known-for.jpg` |
| FAQ: What school district serves Elkhart, Indiana? | `elkhart-living-faq-school-district.jpg` |
| FAQ: What is downtown Elkhart like? | `elkhart-living-faq-downtown.jpg` ★ ADDED 2 Aug 2026 |
| FAQ: What industries and employers are in Elkhart? | `elkhart-living-faq-employers.jpg` |
| FAQ: What landmarks and amenities does Elkhart have? | `elkhart-living-faq-landmarks.jpg` |
| Thinking about Elkhart? (closing CTA) | `elkhart-living-cta-closing.jpg` |

---

## Total: 58 images (16 + 15 + 14 + 13)

**Note:** the Moving to Goshen FAQ list above now includes "I'm moving to Goshen for an RV industry job..." — this title wasn't in the original source document (only the Elkhart version was) but was found live on the page. Worth double-checking with Claude Code whether any other titles have drifted from this list since it was built, before finalizing the full photo shoot.

> **As-built note, 29 July 2026:** the "56 unique shoots" figure in upload
> instruction 3 below was inconsistent with the total above. Corrected 2 Aug
> 2026 — both now read 58.
>
> **As-built note, 2 August 2026.** Two corrections and a status update:
>
> - **`elkhart-living-faq-downtown.jpg` added** to section 4. The FAQ "What is
>   downtown Elkhart like?" is live on `/living-in-elkhart/` and its Spanish
>   twin and always had been, but the Elkhart half of this manifest listed only
>   four FAQ rows and skipped it — while the Goshen half correctly carries
>   `goshen-living-faq-downtown.jpg` for the identical question. Found in the
>   Phase 0 reconciliation, approved by Lisa, photographed in the July batch.
>   **This is why the total moves 57 → 58**, not because a new slot was
>   invented.
> - **The Elkhart batch has been uploaded.** All 27 Elkhart files are in
>   `assets/images/elkhart/` on `main` and pass filename, EXIF-provenance and
>   full-decode integrity checks. Of the 27: **24 cleared**, 2 rejected per the
>   second ruling above, 1 held pending a consent check.
> - **Of the 31 Goshen images, 27 are wired and 4 are rejected**, unchanged.

## Upload instructions for Lisa
1. Name each photo exactly as shown above before uploading (case-sensitive, hyphens not underscores or spaces).
2. Upload to the matching folder: `assets/images/goshen/` or `assets/images/elkhart/` in the repo (or hand off to Claude Code with a note on which filename is which — per your standing workflow rule, Claude Code should commit these into the repo itself, you shouldn't have to upload to GitHub manually).
3. One photo can honestly serve double duty in a few spots (e.g., the same downtown streetscape could work for both "Downtown Goshen" and "What Goshen is known for") — you don't need 58 *unique* shoots if a photo genuinely fits two slots. Just don't reuse the same file back-to-back on the same page (breaks the visual rhythm) or as two different articles' featured image (that's the separate rotation rule).
4. Fair Housing note carries over here too: avoid images that suggest who "belongs" in a neighborhood — landscapes, buildings, and public spaces are always safe; be thoughtful with any people-inclusive shots.
