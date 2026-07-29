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
| Elkhart or Goshen? | `elkhart-moving-elkhart-or-goshen.jpg` |
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
| FAQ: What industries and employers are in Elkhart? | `elkhart-living-faq-employers.jpg` |
| FAQ: What landmarks and amenities does Elkhart have? | `elkhart-living-faq-landmarks.jpg` |
| Thinking about Elkhart? (closing CTA) | `elkhart-living-cta-closing.jpg` |

---

## Total: 57 images (16 + 15 + 14 + 12)

**Note:** the Moving to Goshen FAQ list above now includes "I'm moving to Goshen for an RV industry job..." — this title wasn't in the original source document (only the Elkhart version was) but was found live on the page. Worth double-checking with Claude Code whether any other titles have drifted from this list since it was built, before finalizing the full photo shoot.

> **As-built note, 29 July 2026:** the "56 unique shoots" figure in upload
> instruction 3 below is inconsistent with the 57 total above; 57 is correct.
> Of the 31 Goshen images, 27 are wired to pages and 4 are rejected per the
> ruling at the top of this file. The 26 Elkhart images have not been uploaded.

## Upload instructions for Lisa
1. Name each photo exactly as shown above before uploading (case-sensitive, hyphens not underscores or spaces).
2. Upload to the matching folder: `assets/images/goshen/` or `assets/images/elkhart/` in the repo (or hand off to Claude Code with a note on which filename is which — per your standing workflow rule, Claude Code should commit these into the repo itself, you shouldn't have to upload to GitHub manually).
3. One photo can honestly serve double duty in a few spots (e.g., the same downtown streetscape could work for both "Downtown Goshen" and "What Goshen is known for") — you don't need 56 *unique* shoots if a photo genuinely fits two slots. Just don't reuse the same file back-to-back on the same page (breaks the visual rhythm) or as two different articles' featured image (that's the separate rotation rule).
4. Fair Housing note carries over here too: avoid images that suggest who "belongs" in a neighborhood — landscapes, buildings, and public spaces are always safe; be thoughtful with any people-inclusive shots.
