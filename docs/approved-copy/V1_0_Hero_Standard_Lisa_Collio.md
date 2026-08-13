# Hero Standard

*Lisa Collio, Real Estate Agent · 11 August 2026 · v1.0*

**Status: DRAFT — pending Lisa's approval. Not built.**
Supersedes the discussion record in `V1_0_Hero_Standard_Handoff_Lisa_Collio.md` (29 July 2026), which was explicitly not a spec. Where the two differ, this document governs; §9 records what changed and why.

**Governing documents:** the current Website Master Plan · the current Pre-Launch Punch List · `content/source/rejected-assets.txt` · `docs/SPANISH_STYLE_DECISIONS.md`

---

## 1. What a hero is

A hero is a **layered component**, not an image.

Background photograph → dark gradient scrim → (Home only: cutout portrait) → display headline → supporting line → optional CTAs. Everything after the scrim is real HTML text.

**Text is never baked into a hero image.** Not the headline, not the supporting line, not the page name. Four reasons, each independently sufficient:

- Google and AI answer engines cannot read text inside an image; the H1 would be lost on every page
- Screen readers cannot read it, contradicting the commitments on `/accessibility/`
- It breaks on phones — text sized for a 2400px canvas is unreadable at 390px
- Every wording change becomes an image re-export instead of a one-line edit

**This is the opposite of the Featured-Image Standard, and the two must never be conflated.** Featured images are the 1200×630 `og:image` that social platforms render; those platforms cannot execute HTML, so text is baked in for the Buyers/Sellers clusters. Heroes are rendered by a browser, which can. Both rules are correct because they serve different consumers. A future session finding "text on images" in one place must not propagate it to the other.

---

## 2. The three tiers

### Tier 1 — Signature hero

**Pages: Home (`/`) and its Spanish twin (`/es/`). Two pages. No others.**

Full-bleed background photograph, dark gradient scrim, Lisa's cutout portrait at right, large display headline in white, supporting line, two CTA buttons.

**The cutout portrait appears on these two pages and nowhere else on the site** (ruling, Lisa, 11 August 2026). This is what makes the treatment signature: it is the only page carrying it.

**One background photograph serves both homepages** (ruling, Lisa, 11 August 2026). EN and ES currently use different photographs — `hero-twilight-1.jpg` and `hero-twilight-2.jpg`. Both are replaced by a single new file, `hero-twilight-3.jpg`, bringing Home into line with every other page pair on the site, where one image serves both languages and only the alt text differs.

Locked copy, already approved:

| | |
| --- | --- |
| EN display headline | Your Next Chapter Starts with a Smart Move. |
| ES display headline | Su próximo capítulo comienza con una decisión inteligente. |
| EN supporting line | Lisa Collio, Real Estate Agent in Goshen and Elkhart, Indiana |
| ES supporting line | Lisa Collio, Agente de Bienes Raíces en Goshen y Elkhart, Indiana |

The locked SEO H1 remains the actual `<h1>` tag, styled as the supporting line. The display headline is styled text above it, not a competing H1.

### Tier 2 — Page hero

**Pages: the eleven remaining main pages and their Spanish twins. Twenty-two pages.**

Full-bleed background photograph, dark gradient scrim, page headline in white, supporting line. No portrait. Same structural treatment as Tier 1 minus the cutout — one component, one set of dimensions, one contrast rule.

| Page | Spanish twin |
| --- | --- |
| `/buyers/` | `/es/compradores/` |
| `/sellers/` | `/es/vendedores/` |
| `/moving-to-goshen/` | `/es/mudarse-a-goshen/` |
| `/living-in-goshen/` | `/es/viviendo-en-goshen/` |
| `/moving-to-elkhart/` | `/es/mudarse-a-elkhart/` |
| `/living-in-elkhart/` | `/es/viviendo-en-elkhart/` |
| `/about/` | `/es/conozca-a-lisa/` |
| `/next-chapter-method/` | `/es/tu-proximo-capitulo/` |
| `/market-stats/` | `/es/estadisticas-del-mercado/` |
| `/blog/` | `/blog/spanish/` |
| `/contact/` | `/es/contacto/` — confirm the live Spanish twin URL before building |

**Variety comes from the photograph, not from breaking the layout.** Eleven different photographs, one treatment. A visitor moving between pages should recognise the site immediately and see somewhere new.

### Tier 3 — Article banner

**Pages: 90+ authority articles, both languages.**

A slim banner: photo thumbnail plus the H1 on a solid band. Deliberately compact. Full-bleed heroes on 90+ article pages would hurt Core Web Vitals and make the blog read as a hall of mirrors.

Tier 3's detailed treatment is **deferred** — it is a distinct build touching every article page and should not ride along with the eleven-page hero build. Recorded here so the tier exists in the spec; specified when it is built.

---

## 3. Dimensions and photography

**Target: 2400 × 1000 px minimum, landscape, 12:5.** Larger is better; the file is downscaled at build, never upscaled.

The current homepage background is 1600×1067, already thin for a full-bleed background on a wide monitor. CSS `cover` will upscale past it and soften.

**There is no focal-point control on this slot.** Unlike the section-image pipeline's `focal_y`, the hero background crops dead-centre at every viewport. An off-centre subject will be cut on some screens with no way to bias it.

Consequences for shooting:

- **Landscape only.** A wide crop cannot recover a portrait source. This is why the Maple City emblem is still unusable.
- **Subject centred, generous margin on all four sides.** Assume the outer edges may be lost.
- **Nothing important near the top or bottom.** The scrim is heaviest there and the crop is tightest.
- **No legible house numbers.** An identifiable private residence requires a consent record (§6).
- **No legible signage carrying a name** — for-sale signs, business names, church names.
- **No people** unless Lisa rules on them individually. Every people-photo rejection on this site to date has been a Fair Housing call, not an aesthetic one.

---

## 4. Contrast and legibility

**The scrim exists to make white text readable, not to darken the photo for style.** Every hero must clear **WCAG AA (4.5:1)** for the display headline, the supporting line, and any CTA label, measured against the scrimmed photograph at its lightest point — not against a flat colour sample.

**Supporting lines are white or near-white.** The current homepage subline is grey over a dark photograph and may fail AA; it is corrected in this build rather than carried forward.

Contrast is measured per page after the real photograph is in place. A photograph that cannot be made to clear AA at a reasonable scrim opacity is the wrong photograph — replace it rather than deepening the scrim until the image disappears.

---

## 5. Mobile

At desktop width the Home cutout sits right. On a phone it crops in half.

**Tier 1 mobile behaviour: the scrim deepens and the portrait moves below the text block.** Not dropped — it is the signature element and the Spanish and English homepages are the site's two most-visited pages.

**Tier 2 mobile behaviour: unchanged structurally** — background, scrim, text. Type scales down; the layout does not reflow.

**RE/MAX prominence (876 IAC 8-1-8) must survive at every breakpoint.** A hero must never push the brokerage lockup off-screen on mobile. Verified at 390px, not assumed.

---

## 6. Provenance and consent

**Original photography only.** No stock, no AI-generated places or people.

**One documented exception exists:** `/sellers/`'s hero is a twilight exterior of 1765 N Bay Drive, Elkhart, shot by a photographer Lisa hired. She holds the license and the sellers' agreement. It is the site's first third-party image.

Two records are required before it ships:

1. **Address-keyed path**, matching the sold-listing convention rather than sidestepping it:
   `assets/images/homes-elkhart/1765-n-bay-dr/twilight-front-1.jpg`
   with an entry in `content/source/sold-listing-consent.txt` per 876 IAC 8-1-8(f).

2. **A positive-provenance record.** `content/source/rejected-assets.txt` records what is banned; nothing records what is legitimately licensed. This file will likely carry no camera EXIF, or EXIF naming a camera that is not Lisa's — **the exact signal that triggered the four Goshen rejections.** A new `content/source/licensed-assets.txt` records: filename, photographer, license type, where the license document is filed, the consent reference, and an explicit line stating that missing or foreign EXIF is expected for this file and is not a rejection signal. Any future provenance check consults this allowlist before flagging, the same way check 15 consults the rejection list.

**The current homepage background shows a legible house number (1927).** It is being replaced for other reasons, but the replacement is recorded as a compliance correction, not a preference — so a future session does not restore it.

---

## 7. Fair Housing

Applies to hero copy and hero alt text, both languages. Headlines, supporting lines, and alt attributes all count.

Banned throughout: movement and ambulatory phrasing (*walkable*, *walking distance*, *walk to*); familial-status, age, religion and national-origin framing; coded qualitative terms (*quiet*, *desirable*, *tranquila*, *safe*).

**`audit.js` check 17 scans alt attributes only.** Hero body copy is not gated, and *"quiet"* reached the live homepage in both languages before it was caught by a person. **Extending banned-term scanning to hero headline and supporting-line copy is a requirement of this build, not an optional extra.**

**Across the hero set as a whole**, depicted people must not read as a single demographic — HUD's guidance on human models in advertising applies to a hero set as it does to a brochure. Largely moot when the set is Lisa, houses and places, but it governs.

---

## 8. Alt text

Hero alt text is **copy under the Section 13 gate**, drafted and approved like any other user-facing string. It has produced more compliance findings on this site than any other element.

- **Describe what is visible.** Two Goshen strings asserted a material and an architectural classification the photograph did not establish. Open the image and describe the frame.
- **Spanish is native, usted register, never translated from the English** — and equally descriptive, so a Spanish screen-reader user receives what an English one does.
- **The Home background is decorative** (a CSS background under an H1 that carries the same information) and correctly has no alt text. The cutout portrait does, in both languages.
- **A file used in two places carries the same alt text within a language**, per the Alt-Text Correspondence Standard.

---

## 9. What changed from the 29 July handoff, and why

| Handoff said | This spec says | Why |
| --- | --- | --- |
| Tier 1 is six pages carrying the cutout | Tier 1 is Home EN + ES only | Lisa's ruling, 11 August 2026 |
| Tier 1 vs Tier 2 distinguished by portrait presence | Tiers distinguished by page class; Tier 2 is one treatment across ten pages | With the cutout on Home only, the old distinction dissolved. Inventing a replacement difference to preserve three tiers would be decoration, not structure |
| Tier 2 headline sits in a solid Blue or Red band | Same scrim-and-white-text treatment as Tier 1 | Follows from the above; Lisa's stated preference is the dark-scrim, white-text look |
| Cutout is scoped twice — hero standard and featured-image standard | Cutout is scoped once, to the Home hero | `OVERLAY_SCOPE` was measured on 11 August: it contains blog-article slugs only and its own comment states it has nothing to do with heroes. The handoff's "locked" two-scope rule did not match the code |
| Tier 1 extracts the existing homepage hero component | Three pages have no image markup at all; the portrait slot on three others has no fixed aspect ratio | Measured 11 August. There is less to extract than the handoff assumed |

**Retained from the handoff unchanged:** the layered-component architecture, the never-bake-text rule and its four reasons, Tier 3's existence and rationale, the locked homepage copy, and the Goshen-run lessons in §11.

---

## 10. Open items

- **Eleven Tier 2 photographs** — Lisa is selecting these. Reconcile against `Lisa_Collio_Photo_Shot_List.docx` before shooting; it already reserves several hero slots and the Goshen batch drifted from its manifest at real cost.
- **Retiring `hero-twilight-1.jpg` and `-2.jpg`** — both are replaced on the homepages, but `-1` is also the recorded source for two other pages' featured images (`living-in-goshen-guide`, `viviendo-en-goshen`). Neither file is deleted without checking what else depends on it.
- **Tier 3** — deferred, specified when built.
- **Hero copy per Tier 2 page**, both languages — drafted and approved before the build.
- **Naming convention for Tier 2 photographs** — `hero-{page-slug}.jpg` would be a new prefix pattern for this repo. Decide before files are created, not after.

---

## 11. Lessons that transfer from the Goshen and Elkhart runs

Each of these cost real rounds. They apply directly here.

- **Reconcile against the live pages before shooting.** Manifests drift; both prior batches proved it.
- **Wire EN and ES in the same PR.** Spanish sat at zero images while English had seventeen, and it surfaced only because Lisa looked at a page.
- **Count what you claim to count.** A report said "images" while measuring one CSS class; the number was true and the claim was wrong.
- **Check EXIF provenance before processing.** Eleven of thirty-one Goshen photos had no camera metadata; four were not Lisa's work.
- **Shoot landscape.** A wide crop cannot recover a portrait source.
- **Fix both languages when fixing one.** Every alt-text defect flagged in Spanish existed identically in English.
- **Record a build job for every derived image.** The current homepage hero has none — if that file were lost, there is no documented way to regenerate it. Every hero built under this standard carries source, crop and blob SHA.

---

*Approved by Lisa — [pending]*
*Broker review: covered by the single comprehensive pre-launch review, not per document.*
