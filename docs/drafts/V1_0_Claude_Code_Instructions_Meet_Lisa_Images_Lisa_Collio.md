# Claude Code Instructions — Meet Lisa Page Images (EN + ES)

**For Lisa Collio's website build · 19 August 2026**
**Version:** v1.0
**Scope:** one PR, both languages. 11 photographs + 6 illustrations across `/about/` and `/es/acerca-de/`.

---

## GATE

**PR only. Do not merge.** Lisa merges. The managing broker's review of the site happened 18 August and covered the site as it stood after PR #141 — these images are new content he has not seen. Flag in the PR description that these images are pending his next look.

---

## STEP 1 — REPORT ONLY. BUILD NOTHING YET.

Per the standing Report-Before-Build SOP, report and stop.

1. **Confirm the Spanish page path.** This document assumes `/es/acerca-de/`. If the actual slug differs, report it — do not guess.
2. **Confirm every named section exists on both pages**, with its current heading text, and report which currently have no image. The placement map below names sections by heading; if a heading doesn't match what's live, stop and report rather than picking the nearest thing.
3. **Confirm the FAQ questions exist** on both pages, in both languages, with their current wording, and report which currently carry an image and which don't. **The Spanish FAQ is reported as having no images at all** — confirm that.
4. **Report the current images** on `/about/` for: the awards slot, and the five English FAQ items named below. These are being replaced, so name what's there now.
5. **Confirm all 17 files uploaded correctly** and report actual dimensions and file size for each.
6. **Surface conflicts** — in particular whether `audit.js` checks 22 (batch reconciliation), 23 (alt-text correspondence), or 25 (screen-reader text language) will fire against this set.
7. **Stop and wait for sign-off.**

---

## STEP 2 — IMAGE PREPARATION

### 2.1 Format and sizing

- **The six PNG illustrations are 1.5–2 MB each. Convert to WebP.** They are flat-color illustrations and should compress to roughly 100–250 KB with no visible loss. Report before-and-after sizes.
- **Photographs:** convert to WebP with a JPEG fallback, consistent with existing site practice. Report what the existing pipeline does and match it rather than inventing a new approach.
- **Target delivery width** should match the existing body-image convention on the page. Report what that is before resizing.
- Several photographs are 3024×4032 or larger. Resize to delivery dimensions; do not ship camera-native files.

### 2.2 The awards crop

`awards.jpeg` (2316×3088) replaces the current awards image. **Use Lisa's uploaded framing as-is — do not crop further.** She confirmed the framing sent is the framing wanted.

### 2.3 Language sharing rule (NEW STANDARD — see §5)

Every photograph in this set is used on **both** the English and Spanish pages. Only the six illustrations are language-specific, because they carry baked-in text.

**A shared photograph still needs its own alt text per language.** Same file, two strings. This is the existing Alt-Text Correspondence standard.

---

## STEP 3 — PLACEMENT MAP

### 3.1 Below the hero — both pages

| File | Placement |
| --- | --- |
| `updated-meet-lisa-hero.jpg` | Directly below the hero section, top of page. **Not the hero itself** — the hero remains original photography under the Hero Standard and is not touched by this task. |

### 3.2 Body sections — both pages, alternating left/right on desktop

Three photographs, in page order, alternating image-left / image-right / image-left on desktop and stacking on mobile. Section names below are English; match to the Spanish equivalents and report the mapping.

| File | Section |
| --- | --- |
| `english-real-estate-professional.jpeg` | The professional-background section |
| `family-and-community.jpg` | The family-and-community section |
| `real-estate-experience.jpeg` | The real-estate-experience section |

**Note:** `spanish-una-profesional-construida.jpg` was superseded. `english-real-estate-professional.jpeg` (the SOLD-sign photo) now serves **both** languages. **Do not use `spanish-una-profesional-construida.jpg`** — report it as unused rather than deleting it.

### 3.3 "Why clients trust Lisa Collio" / "Por qué los clientes confían en Lisa Collio"

Three illustrations per language, paired:

| English page | Spanish page |
| --- | --- |
| `client-focused-guidance.png` | `orientacion-centrada-en-el-cliente.png` |
| `long-term-relationships.png` | `relaciones-a-largo-plazo.png` |
| `strategic-real-estate-expertise.png` | `experiencia-estrategica-en-bienes-raices.png` |

Each pair is the same artwork with translated text. Keep the same order on both pages.

### 3.4 FAQ images — both pages

Five FAQ items. English replaces existing images; Spanish is receiving images for the first time.

| FAQ question (EN) | File | Action |
| --- | --- | --- |
| How many homes has Lisa Collio sold? | `how-many-homes.jpeg` | Replace — same image, better quality |
| Why do clients choose Lisa Collio as their real estate agent? | `why-do-clients-choose-lisa-collio-as-their-real-estate-agent.jpeg` | Replace with client photo |
| How does Lisa Collio help seniors? | `how-does-lisa-collio-help-seniors.jpeg` | Replace — same image, better quality |
| Does Lisa Collio speak Spanish? | `does-lisa-collio-speak-spanish.jpg` | Replace with client photo |
| What is it like to work with Lisa Collio as a buyer or seller? | `what-is-it-like-to-work-with-lisa-collio-as-a-buyer-or-seller.jpg` | Replace |
| Why did Lisa Collio become a real estate agent? | **existing image, unchanged** | Keep EN as-is; **add the same image to the Spanish FAQ** |

**Spanish FAQ receives all six** — the five above plus the existing "why did Lisa become an agent" image. Match each to its Spanish question equivalent and report the mapping before building.

---

## STEP 4 — ALT TEXT

Verbatim. Do not paraphrase, shorten, or "improve."

### Photographs

| File | English | Spanish |
| --- | --- | --- |
| `updated-meet-lisa-hero.jpg` | Lisa Collio with her family at a graduation. | Lisa Collio con su familia en una graduación. |
| `awards.jpeg` | Lisa Collio holding her RE/MAX 100% Club award medal at a RE/MAX recognition event. | Lisa Collio sosteniendo su medalla del 100% Club de RE/MAX en un evento de reconocimiento. |
| `english-real-estate-professional.jpeg` | Lisa Collio with a title company representative holding a SOLD sign. | Lisa Collio con una representante de la compañía de títulos sosteniendo un letrero que dice SOLD. |
| `family-and-community.jpg` | Lisa Collio holding an open picture book at a community event. | Lisa Collio sosteniendo un libro ilustrado abierto en un evento comunitario. | **REVISED by Lisa, 19 August 2026** — supersedes the original approved string (*"reading a picture book aloud to a group at a community event"* / *"leyendo un libro ilustrado en voz alta a un grupo…"*), which described a group and a reading action that are not visible in the frame. Surfaced by the crop review before wiring; corrected at the source rather than on the page, so a future rebuild from this file cannot reintroduce it. |
| `real-estate-experience.jpeg` | Lisa Collio with two clients after a closing. | Lisa Collio con dos clientes después de un cierre. |
| `how-many-homes.jpeg` | Lisa Collio receiving recognition on stage at a RE/MAX Results awards event. | Lisa Collio recibiendo un reconocimiento en el escenario de un evento de premiación de RE/MAX Results. |
| `why-do-clients-choose-lisa-collio-as-their-real-estate-agent.jpeg` | Lisa Collio with two clients holding a "Best Realtor Ever" sign after closing. | Lisa Collio con dos clientes sosteniendo un letrero que dice "Best Realtor Ever" después del cierre. |
| `how-does-lisa-collio-help-seniors.jpeg` | Lisa Collio at her RE/MAX Results, The Viruez Team information table at a seniors event, with a banner reading "Guiding Seniors with Experience and Care." | Lisa Collio en su mesa informativa de RE/MAX Results, The Viruez Team en un evento para personas mayores, con un letrero que dice "Guiding Seniors with Experience and Care." |
| `does-lisa-collio-speak-spanish.jpg` | Lisa Collio with two clients holding a "Best Realtor Ever" sign after closing. | Lisa Collio con dos clientes sosteniendo un letrero que dice "Best Realtor Ever" después del cierre. |
| `what-is-it-like-to-work-with-lisa-collio-as-a-buyer-or-seller.jpg` | Lisa Collio standing beside a RE/MAX Results, The Viruez Team for-sale sign in front of a listed home. | Lisa Collio junto a un letrero de venta de RE/MAX Results, The Viruez Team frente a una vivienda en venta. |

**Note on two identical strings:** `why-do-clients-choose…` and `does-lisa-collio-speak-spanish` carry the same alt text because both show Lisa with two clients holding the same sign. They are different photographs of different people. **This is correct, not a duplication error** — if `audit.js` check 23 flags it, report rather than "fixing" it.

**Note on untranslated quoted text:** "Best Realtor Ever" and "Guiding Seniors with Experience and Care" stay in English inside the Spanish alt text, because that is what the physical signs say. Do not translate them.

### Illustrations

Per Master Plan v2.23, alt text must convey the baked-in message, not describe the artwork generically.

| File | English | Spanish |
| --- | --- | --- |
| `client-focused-guidance.png` | Illustration reading "Client-Focused Guidance," showing Lisa Collio welcoming two clients into a home. | — (EN page only) |
| `long-term-relationships.png` | Illustration reading "Long-Term Relationships," showing Lisa Collio shaking hands with a graduate at a family celebration. | — (EN page only) |
| `strategic-real-estate-expertise.png` | Illustration reading "Strategic Real Estate Expertise," showing Lisa Collio reviewing documents at a table with a family of four. | — (EN page only) |
| `orientacion-centrada-en-el-cliente.png` | — (ES page only) | Ilustración que dice "Orientación centrada en el cliente," donde Lisa Collio recibe a dos clientes en una vivienda. |
| `relaciones-a-largo-plazo.png` | — (ES page only) | Ilustración que dice "Relaciones a largo plazo," donde Lisa Collio saluda de mano a una graduada en una celebración familiar. |
| `experiencia-estrategica-en-bienes-raices.png` | — (ES page only) | Ilustración que dice "Experiencia estratégica en bienes raíces," donde Lisa Collio revisa documentos en una mesa con una familia de cuatro. |

---

## STEP 5 — PROVENANCE AND RECORDED DECISIONS

### 5.1 `licensed-assets.txt`

Record all 17. Photographs as **photographs**; the six illustrations as **AI-generated illustrations**, per the Master Plan's requirement that AI images are recorded as illustrations, not photographs.

### 5.2 Consent and approval — confirmed by Lisa, 19 August 2026

- All client photographs are covered by signed pre-shoot consent forms.
- The AI illustrations are broker-approved for illustration purposes.
- `updated-meet-lisa-hero.jpg` shows **Lisa's own family, all four adults** — no minors, confirmed explicitly.
- `real-estate-experience.jpeg` — clients, signed consent on file, confirmed as the intended image for that section.
- "Best Realtor Ever" sign template in client photos: previously broker-approved.

### 5.3 Recorded decision — brokerage naming in photographed signage

`what-is-it-like-to-work-with-lisa-collio-as-a-buyer-or-seller.jpg` shows a yard sign reading **"RE/MAX Results"** with the slash — compliant. An earlier version of this photograph showed "REMAX Results" without the slash and was replaced.

**Standing clarification to record:** the brokerage naming rule governs site copy. Text appearing on a photographed physical object is a record of that object, not site copy. Should a slashless instance ever appear in a photograph, it is not a naming-rule violation — but flag it to Lisa rather than deciding silently.

### 5.4 Unused file

`spanish-una-profesional-construida.jpg` is **not used**. Superseded by `english-real-estate-professional.jpeg` serving both languages. Report it; do not delete without Lisa's word.

---

## STEP 6 — BEFORE OPENING THE PR

- `npm run audit` — report every failure. Do not fix a failure by altering approved alt text; report and stop.
- `npm run check:images`
- **Batch reconciliation:** ~~17 files uploaded, 1 unused, **16 placed**.~~ **Corrected 19 August 2026 by set difference against the branch, per the standard this line invokes: 16 uploaded, 0 unused, 16 placed.** `spanish-una-profesional-construida.jpg` was never uploaded to `meet-lisa-images` and is absent from the whole repo history — it is the retired file, so nothing is missing, but 17/1/16 was never the true arithmetic. Verify by set difference, not running total.
- **Alt-text correspondence:** every shared photograph carries one EN string and one ES string, both from the table above.
- EN/ES parity: every English placement has its Spanish counterpart in this same PR.
- Report page weight before and after for both pages.
- **Fair Housing check on all alt text:** no "walkable," "quiet," "desirable," no ambulatory phrasing, no volunteered neighborhood characteristics. The strings above were drafted to this standard; verify rather than assume.

## STEP 7 — PR DESCRIPTION MUST STATE

- **"DO NOT MERGE — Lisa reviews and merges."**
- That these images are **new content the managing broker has not reviewed**; his 18 August approval covered the site as it stood after PR #141.
- Before-and-after file sizes for the six illustrations.
- The batch reconciliation figures (17 / 1 / 16).
- The two-identical-alt-strings note from Step 4, so it isn't read as a defect.
- Page weight before and after.

---

## STANDING REQUIREMENTS

- Commit this instructions file to `docs/drafts/` as the first commit on the branch.
- **Check whether a referenced document is actually in the repo before relying on it.** If missing, ask Lisa.
- When given an updated document, add the new version **and delete the superseded one**.
- Flag any new document created here for addition to Lisa's Claude Project.
- Never rely on a hardcoded version number cited in another document; use the highest-numbered version actually present, and flag stale citations.
- **Check whether a PR is still open before pushing to its branch.** A merged PR will not pick up new commits.
- Lisa deletes branches and clicks merge herself in the GitHub UI.
- WIP may be committed to a feature branch to prevent session-reclaim data loss — never to `main`, never by opening a PR unasked.

---

## FOR LISA — NEW STANDARD TO RECORD

This session established a rule not yet in the governing documents:

> **Bilingual image sharing.** The same image is used on both the English and Spanish versions of a page. A language-specific variant is generated **only** when the image carries text. Each shared image still carries its own alt text in each language.

Worth adding to the Master Plan's Images section. It is already how the Goshen and Elkhart clusters were built; this session is the first time it was stated explicitly.
