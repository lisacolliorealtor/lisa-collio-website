# Goshen ↔ Elkhart drive time — full inventory and proposed rewrites

*Lisa Collio, Real Estate Agent · 2 August 2026 · Claude Code*

**Report only. Not one character of drive-time text has been changed.**

Re-run against `main` at the PR #106 merge. **42 occurrences, three mutually
inconsistent claims, two languages.** Counts unchanged from the sweep recorded
during PR 1; this run excludes the project's own tracking documents, which quote
the claims rather than making them.

---

## The three claims

| Claim | Occurrences | Where it lives |
|---|---|---|
| **25 minutes**, Elkhart ↔ Goshen | **30** | the location article and everything echoing it |
| **20 minutes**, Elkhart ↔ Goshen | **8** | the four Elkhart pillar pages and their sources |
| **"all within about 20 minutes"** — South Bend, Mishawaka **and** Goshen as one group | **4** | the employers articles and their sources |

`docs/VERIFIED_FACTS.md` carries **two of the three in consecutive sentences**,
under the same two sources:

> East of South Bend and Mishawaka, near the Indiana–Michigan state line. About
> **25 minutes northeast of Goshen**. South Bend, Mishawaka, and Goshen are all
> within roughly **20 minutes**.

**The grouped claim is the one a number-based sweep misses.** It states no
Goshen-specific figure at all — it folds Goshen in with two cities that are
genuinely closer. Fixing 25 ↔ 20 without touching it leaves the contradiction
alive in a different shape, in both languages.


---

## LIVE PAGES — 23 occurrence(s)

### 25 minutes — 17

- `blog/community/elkhart-indiana-industries-employers/index.html:248`
  > Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen
- `blog/community/elkhart-indiana-location-nearby-cities/index.html:11`
  > meta name="description" content="Where is Elkhart, Indiana? Just east of South Bend and Mishawaka, near the Indiana-Michigan line, about 25 minutes from Goshen and 2 hours from Chicago
- `blog/community/elkhart-indiana-location-nearby-cities/index.html:29`
  > "description": "Where is Elkhart, Indiana? Just east of South Bend and Mishawaka, near the Indiana-Michigan line, about 25 minutes from Goshen and 2 hours from Chicago
- `blog/community/elkhart-indiana-location-nearby-cities/index.html:102`
  > "text": "About 25 minutes northeast of Goshen, the Elkhart County seat
- `blog/community/elkhart-indiana-location-nearby-cities/index.html:207`
  > Within Elkhart County itself, Elkhart is located about 25 minutes northeast of Goshen, the county seat, making it easy to move between the two cities for work, shopping, or visiting family
- `blog/community/elkhart-indiana-location-nearby-cities/index.html:227`
  > About 25 minutes northeast of Goshen, the Elkhart County seat
- `blog/community/index.html:247`
  > Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen
- `blog/index.html:317`
  > Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen
- `blog/spanish/distrito-escolar-elkhart-indiana/index.html:256`
  > ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/index.html:376`
  > ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/industrias-empleadores-elkhart-indiana/index.html:249`
  > ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/lugares-emblematicos-elkhart-indiana/index.html:245`
  > ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/index.html:11`
  > meta name="description" content="¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/index.html:29`
  > "description": "¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/index.html:97`
  > "text": "A unos 25 minutos al noreste de Goshen, la sede del condado
- `blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/index.html:202`
  > Dentro del condado de Elkhart mismo, Elkhart está ubicado a unos 25 minutos al noreste de Goshen, la sede del condado, facilitando el desplazamiento entre las dos ciudades por trabajo, compras, o para
- `blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/index.html:215`
  > A unos 25 minutos al noreste de Goshen, la sede del condado

### 20 minutes — 4

- `es/mudarse-a-elkhart/index.html:235`
  > South Bend queda a unos 20 minutos; Goshen, la sede del condado, a otros 20 minutos hacia el sur
- `es/viviendo-en-elkhart/index.html:219`
  > La sede del condado es Goshen, a unos 20 minutos al sur, pero Elkhart es la ciudad más grande y poblada del condado
- `living-in-elkhart/index.html:217`
  > The county seat is Goshen, about 20 minutes south, but Elkhart is the county's largest and most populous city
- `moving-to-elkhart/index.html:217`
  > South Bend is about 20 minutes away; Goshen, the county seat, is another 20 minutes south

### the grouped "all within about 20 minutes" claim — 2

- `blog/community/elkhart-indiana-industries-employers/index.html:209`
  > Many residents also commute to South Bend, Mishawaka, and Goshen, all within about 20 minutes — worth knowing if your job search isn't limited to Elkhart itself
- `blog/spanish/industrias-empleadores-elkhart-indiana/index.html:208`
  > Muchos residentes también se trasladan a South Bend, Mishawaka, y Goshen, todos a unos 20 minutos — vale la pena saberlo si su búsqueda de empleo no se limita a Elkhart


---

## GENERATED — 2 occurrence(s)

### 25 minutes — 2

- `llms.txt:81`
  > community/elkhart-indiana-location-nearby-cities/): Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen
- `llms.txt:176`
  > com/blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/): ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede


---

## AUTHORING SOURCES AND RECORDS — 17 occurrence(s)

### 25 minutes — 11

- `content/approved/communities-elkhart-es.md:23`
  > Elkhart se encuentra en el norte de Indiana, justo al este de South Bend y Mishawaka, y a unos 25 minutos al noreste de Goshen
- `content/approved/communities-elkhart-es.md:87`
  > Dentro del condado de Elkhart mismo, Elkhart está ubicado a unos 25 minutos al noreste de Goshen, la sede del condado, facilitando el desplazamiento entre las dos ciudades por trabajo, compras, o para
- `content/approved/communities-elkhart.md:23`
  > Elkhart sits just east of South Bend and Mishawaka, near the Indiana–Michigan state line, and about 25 minutes northeast of Goshen
- `content/approved/communities-elkhart.md:87`
  > Within Elkhart County itself, Elkhart is located about 25 minutes northeast of Goshen, the county seat, making it easy to move between the two cities for work, shopping, or visiting family
- `docs/FAQ_GAP_PAGE_CONTENT.md:123`
  > - **Meta description:** Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen
- `docs/FAQ_GAP_PAGE_CONTENT.md:136`
  > Within Elkhart County itself, Elkhart is located about 25 minutes northeast of Goshen, the county seat, making it easy to move between the two cities for work, shopping, or visiting family
- `docs/FAQ_GAP_PAGE_CONTENT.md:964`
  > - **Meta description:** ¿Dónde está ubicado Elkhart, Indiana? Justo al este de South Bend y Mishawaka, y a unos 25 minutos en auto al noreste de Goshen, la sede del condado
- `docs/FAQ_GAP_PAGE_CONTENT.md:977`
  > Dentro del condado de Elkhart mismo, Elkhart está ubicado a unos 25 minutos al noreste de Goshen, la sede del condado, facilitando el desplazamiento entre las dos ciudades por trabajo, compras, o para
- `docs/VERIFIED_FACTS.md:107`
  > **25 minutes northeast of Goshen**
- `docs/approved-copy/V1_0_FAQ_Gap_Blocks_EN_15_Pages_Lisa_Collio.md:85`
  > About 25 minutes northeast of Goshen, the Elkhart County seat
- `docs/approved-copy/V1_0_FAQ_Gap_Blocks_ES_21_Pages_Lisa_Collio.md:322`
  > A unos 25 minutos al noreste de Goshen, la sede del condado

### 20 minutes — 4

- `docs/approved-copy/V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md:96`
  > South Bend queda a unos 20 minutos; Goshen, la sede del condado, a otros 20 minutos hacia el sur
- `docs/approved-copy/V1_0_ES_Viviendo_en_Elkhart_Page_Lisa_Collio.md:45`
  > La sede del condado es Goshen, a unos 20 minutos al sur, pero Elkhart es la ciudad más grande y poblada del condado
- `docs/approved-copy/V1_0_Living_in_Elkhart_Page_EN_Lisa_Collio.md:55`
  > The county seat is Goshen, about 20 minutes south, but Elkhart is the county's largest and most populous city
- `docs/approved-copy/V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md:110`
  > South Bend is about 20 minutes away; Goshen, the county seat, is another 20 minutes south

### the grouped "all within about 20 minutes" claim — 2

- `docs/approved-copy/V1_0_ES_Adaptation_9_Articles_Wave1_Lisa_Collio.md:105`
  > Muchos residentes también se trasladan a South Bend, Mishawaka, y Goshen, todos a unos 20 minutos — vale la pena saberlo si su búsqueda de empleo no se limita a Elkhart
- `docs/approved-copy/V1_0_Elkhart_Living_Authority_Articles_1-5_EN_Lisa_Collio.md:149`
  > Many residents also commute to South Bend, Mishawaka, and Goshen, all within about 20 minutes — worth knowing if your job search isn't limited to Elkhart itself


---

## Proposed rewrites — and the decision they depend on

**The brief says "the drive-time removal PR". That reads two ways, and they are
different pieces of work.** Nothing has been drafted against the wrong one.

### Reading A — REMOVE the drive-time figures (what "removal" says)

Drop the minute figure and keep the geography. No verified number is needed,
which is the practical attraction: the contradiction is resolved without anyone
having to settle whether it is 20 or 25.

| Now | Proposed |
|---|---|
| "about **25 minutes** northeast of Goshen, the county seat" | "northeast of Goshen, the county seat" |
| "South Bend is about 20 minutes away; Goshen, the county seat, is **another 20 minutes south**" | "South Bend is a short drive; Goshen, the county seat, sits just south" |
| "The county seat is Goshen, **about 20 minutes south**" | "The county seat is Goshen, just south" |
| "commute to South Bend, Mishawaka, and Goshen, **all within about 20 minutes**" | "commute to South Bend, Mishawaka, and Goshen" |

**Cost, stated plainly.** Eleven of the 30 "25 minutes" hits are in meta
descriptions, schema descriptions and FAQ schema answers — search-result copy.
"About 25 minutes from Goshen and 2 hours from Chicago" is a concrete,
useful answer to a real question, and removing the figure makes those
descriptions vaguer. A relocating buyer asking "how far apart are they" gets a
worse answer than before.

### Reading B — CORRECT to one verified figure

Every occurrence states the same number, `docs/VERIFIED_FACTS.md` is settled
first and each page checked against it, and the grouped claim is rewritten to
name Goshen separately from South Bend and Mishawaka. Keeps the SEO value.
**Blocked on the number, which has not been supplied.**

### Recommendation

**B, if a figure can be verified; A only if it cannot.** The figure is genuinely
useful copy on a page whose entire subject is "where is Elkhart relative to
nearby cities", and 11 of the occurrences are the copy Google shows. Removing it
solves the inconsistency by deleting the information rather than correcting it.

Under either reading, three things hold:

1. **`docs/VERIFIED_FACTS.md` is edited first**, then every page is checked
   against it — never page against page. That is build-procedure failure 4, and
   it is what caused the "13 vs 14 elementary schools" regression.
2. **All 15 authoring occurrences move with the pages.** A correction on a page
   while an approved source keeps the old figure is how that regression happened.
3. **The grouped claim is rewritten too**, in both languages, or the
   contradiction simply changes shape.

`llms.txt` needs no separate edit — `npm run llms` regenerates it from the pages.

---

## Also in scope: stale Master Plan version citations

`docs/approved-copy/V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md` and
`docs/approved-copy/V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md` both cite
**"Master Plan v2.8"** on line 4. The Master Plan in the repo is
**V2.15**, so both pointers are seven versions stale.

**Scanned the rest of `docs/approved-copy/` for the same pattern: 15 files carry
a hardcoded Master Plan version, all of them v2.8.** It is not a two-file
problem — it is the house style of that folder's header line, and it goes stale
the moment the Master Plan moves.

This is the exact stale-pointer pattern CLAUDE.md's own header avoids by design
("the highest-numbered Lisa_Collio_Website_Master_Plan version in Project
files", not a pinned number), and the same fix the Punch List v2.8 entry applied
to its own governing-documents line.

**Proposed:** replace the pinned version with the version-agnostic form in all
15, not just the two — a pinned number in 13 other files will drift for exactly
the same reason. Two of the 15 also cite specific sections (`§8, §9, §17`);
those stay, since section numbers are the durable part of the reference.

**Not applied. Confirm the 15-file scope before anything changes.**

---

## Awaiting Lisa

1. **Reading A or B** — remove the figures, or correct them to one number.
2. **If B: the number**, and whether the grouped claim keeps a figure.
3. **The version-citation scope** — the two Elkhart files, or all 15.

