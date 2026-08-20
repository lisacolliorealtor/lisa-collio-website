# Claude Code Instructions — Goshen Page Images (EN + ES)

**For Lisa Collio's website build · 19 August 2026**
**Version:** v1.0
**Scope:** one PR, both languages. Six photographs across `/moving-to-goshen/` ↔
`/es/mudarse-a-goshen/` and `/living-in-goshen/` ↔ `/es/viviendo-en-goshen/`, plus one
recrop of an existing source.

Delivered as chat instructions rather than an uploaded file; committed here at build time
so a future rebuild, audit or session has the source, per the standing rule that approved
content is committed the moment it is used.

---

## GATE

**PR only. Do not merge.** These images are new content the managing broker has not
reviewed. His 19 August pass covered the cookie banner, the Fair Housing targeting
practice and the Privacy change notice — none of it reached this batch.

---

## MOVING TO GOSHEN (EN + ES)

### 1. ADD — section "Where Goshen sits, and what that means for getting around"

Source `where-goshen-sits.jpg` → manifest slug **`goshen-moving-location-commute`**.

- EN: `Traffic on the US-33 corridor between Elkhart and Goshen, Indiana, on a rainy day.`
- ES: `Tráfico en el corredor de la US-33 entre Elkhart y Goshen, Indiana, en un día lluvioso.`

**Alt corrected by Lisa, 19 August 2026.** The first draft read "a multi-lane commercial
corridor in Goshen, Indiana." Recon flagged that the only legible place name in the frame
is an ELKHART billboard and that the location could not be confirmed from the photograph.
Lisa: the road is US-33, the traffic is coming into Goshen from Elkhart, and the section is
about the connection between the two cities — so describe the corridor rather than claiming
one city.

### 2. ADD — section "Thinking about a move to Goshen?"

Source `thinking-about-a-move-to-goshen.jpg` → manifest slug **`goshen-moving-cta-closing`**.

- EN: `Lisa Collio outside a historic brick factory building in Goshen, Indiana, with painted Chase Bag Company signage on the facade.`
- ES: `Lisa Collio frente a un antiguo edificio industrial de ladrillo en Goshen, Indiana, con el rótulo pintado de Chase Bag Company en la fachada.`

**"Chase Bag Company" stands (Lisa, 19 August 2026).** Recon raised it because the
evergreen-pillar rule bars business names and this one appears nowhere else in the repo.
Ruling: historic ghost signage on a defunct manufacturer is not a going concern that can
close, and the evergreen rule exists because businesses shut down. Architectural fact, not
a business listing.

### 3. REPLACE — section "The honest trade-offs"

Source `the-honest-trade-offs.jpg` → new slug **`goshen-moving-trade-offs-bridge`**, repointed
from `goshen-moving-trade-offs`.

- EN: `The Fort Wayne Street Bridge in Goshen, Indiana, an 1890s truss bridge listed on the National Register of Historic Places.`
- ES: `El puente de Fort Wayne Street en Goshen, Indiana, un puente de armadura de la década de 1890, inscrito en el Registro Nacional de Lugares Históricos.`

**Alt neutralised by Lisa, 19 August 2026**, from "an iron truss bridge dating to about
1896." Verification found: the plaque in the photograph reads FORT WAYNE STREET BRIDGE,
c. 1896, National Register of Historic Places; public sources confirm the name (also known
as Indiana Avenue Bridge and Elkhart County Bridge #403), the Goshen location over the
Elkhart River, and the 15 September 2005 listing. Two things did not hold: sources describe
a Pennsylvania through truss with a steel grate deck, so **iron could not be confirmed** —
the builder's name, Bellefontaine Bridge & Iron Co., is not evidence about the structure —
and the build year is **contested, 1896 vs 1898**, across sources. "An 1890s truss bridge"
sidesteps both. Verification was through search results only; the egress proxy blocks
Wikipedia, HistoricBridges and in.gov, so no primary source was fetched.

The photograph's second plaque is an "Outstanding Contribution / Heritage" award plaque,
not the "Indiana Avenue — Iron Trussed Bridge" plaque described from memory — though
Indiana Avenue Bridge is a genuine alternate name for this bridge.

### 4. RECROP — FAQ "What does it cost to live in Goshen, Indiana?"

No new file. `SECTION_JOBS["goshen-moving-faq-cost-of-living"]` **focal_y 0.35 → 0.50**.

At 1.9:1 a 2316×3088 portrait keeps 39% of its height; focal 0.35 put the crop bottom at
54.7% of the frame while the mouth sits at about 60%, cutting it off. 0.50 clears the chin.
Proofs of 0.35 / 0.47 / 0.50 were rendered and reviewed before wiring; 0.47 worked but sat
tight. The approved alt text names snow-covered shrubs, and the new crop retains them.

---

## LIVING IN GOSHEN (EN + ES)

### 5. REPLACE — FAQ "What is Goshen, Indiana known for?"

Source `what-is-goshen.jpg` → new slug **`goshen-living-faq-known-for-welcome-sign`**.

- EN: `A wooden Goshen welcome sign with gold lettering and maple leaf accents, set in a brick planter.`
- ES: `Un letrero de bienvenida a Goshen, de madera con letras doradas y hojas de arce, sobre una jardinera de ladrillo.`

### 6. REPLACE — FAQ "What landmarks and amenities does Goshen have?"

Source `what-landmarks-amenities.jpg` → new slug **`goshen-living-faq-landmarks-bag-factory`**.

- EN: `The Old Bag Factory in Goshen, Indiana, a restored brick industrial building with painted signage on its upper walls.`
- ES: `The Old Bag Factory en Goshen, Indiana, un edificio industrial de ladrillo restaurado con rótulos pintados en sus muros superiores.`

Note: items 2 and 6 are the same building — the Old Bag Factory is the former Chase Bag
Company plant — photographed from different distances and described differently. Two
photographs, so `audit.js` check 23 does not group them.

### 7. REPLACE — section "Downtown Goshen"

Source `downtown.jpg` → new slug **`goshen-living-downtown-storefronts`**.

- EN: `A row of storefronts along a downtown Goshen, Indiana street, with trees along the sidewalk.`
- ES: `Una fila de comercios a lo largo de una calle del centro de Goshen, Indiana, con árboles en la acera.`

The replaced image was a single storefront with a business name filling the frame; the
section describes the district as a whole. **No business named in the alt text** — evergreen
pillar pages keep shop names out, since businesses close.

---

## RULINGS RECORDED AT BUILD TIME

### Rejected-slug remedy (Lisa, 19 August 2026)

Items 1 and 2 fill two of the four slots left deliberately empty by the 29 July 2026
ruling in `content/source/rejected-assets.txt` — sources that were "not Lisa's original
photography… composite graphics with circular photo insets."

That file prescribes the remedy: *"When a replacement photo arrives, Lisa uploads it under
the SAME manifest filename; delete the line here, process it, and wire it normally."*
Taken as written. The two uploads are renamed to `goshen-moving-location-commute` and
`goshen-moving-cta-closing`, their lines deleted from the rejected list, and both wired
normally. This stops `audit.js` check 15 guarding slots that are now filled.

**Two of the four July rejections remain open and their slots stay empty on purpose:**
`goshen-moving-faq-moving-from-out-of-state` (FAQ "How do I move to Goshen from another
state?") and `goshen-living-why-lisa` ("Why Lisa works this market"). A future session
finding those gaps is looking at a deliberate decision, not an oversight.

### Standing decision — the Goshen Theater marquee (Lisa, 19 August 2026)

`downtown.jpg` shows the Goshen Theater marquee carrying a dated announcement. Recon
flagged it against the evergreen-page reasoning that dated content ages.

**Ruling: permitted, and this is not to be re-raised.** A marquee always carries a dated
announcement — that is what a marquee is. The no-dated-content rule cannot apply to a
building whose function is displaying dated content. Photographs of the Goshen Theater are
permitted on evergreen pages with the marquee visible.

---

## HEADING VERIFICATION (checked before building)

Every named section and FAQ heading was confirmed against the live pages. Two notes:

- Item 3 was given as "The Honest Trade-Offs"; the live heading is **"The honest trade-offs"**
  (sentence case). Same section.
- Spanish counterparts are cultural adaptations, not translations, and were mapped
  individually: item 3 → **"Lo que nadie pone en los folletos"**; item 5 →
  **"¿Por qué es conocido Goshen, Indiana?"**. All others match verbatim.

---

## BUILD NOTES

- Same file serves both languages; only the alt text differs. No overlay or baked-in text
  on any of the six.
- Sources live in `assets/images/goshen/`, jobs in `SECTION_JOBS`, artifacts built into
  `assets/images/sections/`. One job emits four files: `{slug}.jpg/.webp` at 1200×630 and
  `{slug}-thumb.jpg/.webp` at 800×420.
- `downtown.jpg` was uploaded to `assets/` rather than `assets/images/` — corrected.
- **None of the five replacement targets is shared with another page**; each is referenced
  only by its EN page and ES twin, so these are straight repoints with no collateral.
- **No `image-parity-baseline.json` change.** Both pairs are at exact parity (moving 19/19,
  living 20/20) and unbaselined; items 1–2 take the moving pair to 21/21. Adding a baseline
  row for a pair at parity would itself fail check 14.
- **Pool-folder check:** `assets/images/goshen/` is a guarded selector under the
  Pool-Folder Standard — a source with no job entry fails check 22 by set difference.
  `assets/images/sections/` is verification-only. Neither is a silent pool.
- Compliance run **before** building, not after: 46-term Fair Housing list, the `walkab`
  guard, `audit.js` check 25's language classifier, and the check 13 business-name list,
  against all 12 alt strings — **zero hits on all four**.
- `node build-reviews.js --check` runs as part of verification, per the standing reminder.
