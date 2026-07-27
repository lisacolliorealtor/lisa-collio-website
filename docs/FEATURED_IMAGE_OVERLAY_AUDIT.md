# Featured-image text-overlay audit — images outside the Buyers/Sellers exception

**Status: FOR LISA'S REVIEW.** Four images have been cleaned at Lisa's explicit
direction (27 July) and are marked **CLEANED** below. Everything else on this
list is flagged only — not regenerated, not deleted.
Produced 27 July 2026 by Claude Code, per step 1 of
`docs/drafts/V1_0_Claude_Code_Instructions_Text_Overlay_Exception_Lisa_Collio.md`
and the Featured-Image Standard added in Master Plan v2.10 (§8, Images).

## What the new rule says

Text overlay **and** Lisa's cutout portrait on blog/article featured images are a
scoped exception, kept only for `/buyers/`, `/sellers/`, `/es/compradores/`,
`/es/vendedores/` and the authority articles linked from those four hubs.
Every other page and article — both languages — gets a clean photo with nothing
overlaid: no text, no cutout. The title renders as normal HTML on the page.

This does **not** touch the Tier 1 page-hero component, which layers real HTML
text over a photo and was never a baked-in-text image.

## How the scope line was drawn

The instructions define the exception as "the articles linked from the four hub
pages." Extracting the `/blog/` links actually present on those four pages gives
**8 + 10 + 7 + 10 = 35 articles**, which matches the Master Plan §11 drafted
inventory exactly (Buy a Home set = 8, Sell a Home set = 10, Cluster 1
Compradores = 7, plus the Spanish seller set = 10). That agreement is what the
scope line below is based on, not the folder an article happens to sit in.

## Headline numbers

| | Slugs | Image files on disk |
| --- | --- | --- |
| Every generated featured image in `assets/images/blog-headers/` | 88 | 360 |
| **In scope — keep the overlay, no action** | 35 | 140 |
| **Out of scope — cleaned in this PR** | 4 | 16 (+8 `-og` files deleted) |
| **Out of scope — still needs a clean re-export or reshoot** | **49** | **196** |

Of the 49 still outstanding, **45 have baked-in title text AND Lisa's cutout
portrait** (Template A: house photo, solid RE/MAX Blue or Red band across the
top, cutout bottom-left or bottom-right), and **4 have baked-in title text
only, no cutout** (Templates B and C: people photos with a solid color band
below or a color panel beside them). Five of the 49 are listed in their own
table at the end because they need a ruling from you before they're counted
in or out.

**Nearly every slug also has a matching `-thumb.jpg` / `-thumb.webp`** (800×420)
used on blog cards and hub grids. The thumbnails are derived from the header, so
they carry the same band and the same cutout — replacing a header means
replacing its thumbnail too. Four out-of-scope slugs are the exception and have
no thumbnail at all today: `living-in-elkhart-guide`, `moving-to-elkhart`,
`mudarse-a-elkhart`, `viviendo-en-elkhart`. Worth generating theirs from the
clean replacement photo while you're at it.

Apart from the four you named, nothing here has been regenerated. Per step 2 of
the instructions the rest are flagged for your sign-off on the replacement photo
itself, not silently re-exported from the text-bearing versions.

## The audit list

### Community & city pillar pages — English (4)

| Page | Image file(s) | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/living-in-elkhart/` | `living-in-elkhart-guide-header.jpg` | A | "Living in Elkhart, Indiana: A Local Agent's Guide to the City" | Yes |
| `/living-in-goshen/` | `living-in-goshen-guide-header.jpg` | A | "Living in Goshen, Indiana: A Local Agent's Guide to the City" | Yes |
| `/moving-to-elkhart/` | `moving-to-elkhart-header.jpg` | A | "Moving to Elkhart, Indiana: What to Know Before You Move" | Yes |
| `/moving-to-goshen/` | `moving-to-goshen-header.jpg` | A | "Moving to Goshen, Indiana: What to Know Before You Move" | Yes |

### Community & city pillar pages — Spanish (4)

| Page | Image file(s) | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/es/mudarse-a-elkhart/` | `mudarse-a-elkhart-header.jpg` | A | "Mudarse a Elkhart, Indiana: Lo que debe saber antes de dar el paso" | Yes |
| `/es/mudarse-a-goshen/` | `mudarse-a-goshen-header.jpg` | A | "Mudarse a Goshen, Indiana: Lo que debe saber antes de dar el paso" | Yes |
| `/es/viviendo-en-elkhart/` | `viviendo-en-elkhart-header.jpg` | A | "Vivir en Elkhart, Indiana: Guía local de la ciudad" | Yes |
| `/es/viviendo-en-goshen/` | `viviendo-en-goshen-header.jpg` | A | "Vivir en Goshen, Indiana: Guía local de la ciudad" | Yes |

### Meet Lisa / brand articles — 4 cleaned, 4 outstanding (8)

The four Lisa named on 27 July are done and are marked **CLEANED** below; the
other four in this group are unchanged and still need a decision.

| Page | Image file(s) | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/blog/community/does-lisa-collio-speak-spanish/` | `does-lisa-collio-speak-spanish-header.jpg` + `-og.jpg` | B | "Does Lisa Collio Speak Spanish? A Bilingual Real Estate Agent in Goshen and Elkhart, Indiana" | No |
| `/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` | **CLEANED** — `how-many-homes-lisa-collio-sold-goshen-elkhart-header.jpg` (1200×630) + `-thumb`; `-og` deleted | C | "How Many Homes Has Lisa Collio Sold in Goshen and Elkhart, Indiana?" | No |
| `/blog/community/lisa-collio-helps-seniors-families-downsize/` | `lisa-collio-helps-seniors-families-downsize-header.jpg` + `-og.jpg` | B | "How Does Lisa Collio Help Seniors and Families Downsize in Goshen and Elkhart, Indiana?" | No |
| `/blog/community/what-is-it-like-to-work-with-lisa-collio/` | **CLEANED** — `what-is-it-like-to-work-with-lisa-collio-header.jpg` (1200×630) + `-thumb`; `-og` deleted | B | "What Is It Like to Work with Lisa Collio as a Buyer or Seller in Goshen and Elkhart, Indiana?" | No |
| `/blog/community/what-makes-lisa-collio-different/` | **CLEANED** — `what-makes-lisa-collio-different-header.jpg` (1200×630) + `-thumb`; `-og` deleted | C | "What Makes Lisa Collio Different from Other Real Estate Agents in Goshen and Elkhart, Indiana?" | No |
| `/blog/community/why-clients-choose-lisa-collio/` | **CLEANED** — `why-clients-choose-lisa-collio-header.jpg` (1200×630) + `-thumb`; `-og` deleted | B | "Why Do Clients Choose Lisa Collio as Their Real Estate Agent in Goshen and Elkhart, Indiana?" | No |
| `/blog/community/why-lisa-collio-became-real-estate-agent/` | `why-lisa-collio-became-real-estate-agent-header.jpg` + `-og.jpg` | C | "Why Did Lisa Collio Become a Real Estate Agent in Goshen and Elkhart, Indiana?" | No |
| `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/` | `moving-to-goshen-indiana-from-out-of-state-header.jpg` + `-og.jpg` | B | "Moving to Goshen, Indiana from Out of State: A Step-by-Step Timeline" | No |

### Community + relocation authority articles — English (20)

| Page | Image file(s) | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/blog/community/buying-an-older-home-in-elkhart-indiana/` | `buying-an-older-home-in-elkhart-indiana-header.jpg` | A | "Buying an Older Home in Elkhart, Indiana: What to Check First" | Yes |
| `/blog/community/community-events-in-elkhart-indiana/` | `community-events-in-elkhart-indiana-header.jpg` | A | "Community Events in Elkhart, Indiana: A Year-Round Calendar" | Yes |
| `/blog/community/community-events-in-goshen-indiana/` | `community-events-in-goshen-indiana-header.jpg` | A | "Community Events in Goshen, Indiana: A Year-Round Calendar" | Yes |
| `/blog/community/cost-of-living-in-elkhart-indiana/` | `cost-of-living-in-elkhart-indiana-header.jpg` | A | "Cost of Living in Elkhart, Indiana" | Yes |
| `/blog/community/cost-of-living-in-goshen-indiana/` | `cost-of-living-in-goshen-indiana-header.jpg` | A | "Cost of Living in Goshen, Indiana" | Yes |
| `/blog/community/downtown-elkhart-indiana/` | `downtown-elkhart-indiana-header.jpg` | A | "Downtown Elkhart, Indiana" | Yes |
| `/blog/community/downtown-goshen-indiana/` | `downtown-goshen-indiana-header.jpg` | A | "Downtown Goshen, Indiana" | Yes |
| `/blog/community/elkhart-indiana-industries-employers/` | `elkhart-indiana-industries-employers-header.jpg` | A | "Elkhart, Indiana Industries and Employers" | Yes |
| `/blog/community/elkhart-indiana-landmarks-amenities/` | `elkhart-indiana-landmarks-amenities-header.jpg` | A | "Elkhart, Indiana Landmarks and Amenities" | Yes |
| `/blog/community/elkhart-indiana-school-districts/` | `elkhart-indiana-school-districts-header.jpg` | A | "Elkhart, Indiana School Districts" | Yes |
| `/blog/community/goshen-indiana-industries-employers/` | `goshen-indiana-industries-employers-header.jpg` | A | "Goshen, Indiana Industries and Employers" | Yes |
| `/blog/community/goshen-indiana-landmarks-amenities/` | `goshen-indiana-landmarks-amenities-header.jpg` | A | "Goshen, Indiana Landmarks and Amenities" | Yes |
| `/blog/community/goshen-indiana-school-district/` | `goshen-indiana-school-district-header.jpg` | A | "Goshen, Indiana School District" | Yes |
| `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | `moving-to-elkhart-indiana-from-out-of-state-header.jpg` | A | "Moving to Elkhart, Indiana from Out of State: A Step-by-Step Timeline" | Yes |
| `/blog/community/things-to-do-in-elkhart-indiana/` | `things-to-do-in-elkhart-indiana-header.jpg` | A | "Things to Do in Elkhart, Indiana" | Yes |
| `/blog/community/things-to-do-in-goshen-indiana/` | `things-to-do-in-goshen-indiana-header.jpg` | A | "Things to Do in Goshen, Indiana" | Yes |
| `/blog/community/what-is-elkhart-indiana-known-for/` | `what-is-elkhart-indiana-known-for-header.jpg` | A | "What Elkhart, Indiana Is Known For" | Yes |
| `/blog/community/what-is-goshen-indiana-known-for/` | `what-is-goshen-indiana-known-for-header.jpg` | A | "What Goshen, Indiana Is Known For" | Yes |
| `/blog/community/working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana/` | `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana-header.jpg` | A | "Working in the RV Industry and Buying a Home in Elkhart, Indiana" | Yes |
| `/blog/relocation/rv-industry-buying-a-home-goshen-indiana/` | `rv-industry-buying-a-home-goshen-indiana-header.jpg` | A | "Working in the RV Industry and Buying a Home in Goshen, Indiana" | Yes |

### Community authority articles — Spanish (12)

| Page | Image file(s) | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/blog/spanish/centro-de-elkhart-indiana/` | `centro-de-elkhart-indiana-header.jpg` | A | "El centro de Elkhart, Indiana" | Yes |
| `/blog/spanish/comprar-casa-antigua-elkhart-indiana/` | `comprar-casa-antigua-elkhart-indiana-header.jpg` | A | "Comprar una casa antigua en Elkhart, Indiana: qué revisar primero" | Yes |
| `/blog/spanish/costo-de-vida-elkhart-indiana/` | `costo-de-vida-elkhart-indiana-header.jpg` | A | "Costo de vida en Elkhart, Indiana" | Yes |
| `/blog/spanish/costo-de-vida-goshen-indiana/` | `costo-de-vida-goshen-indiana-header.jpg` | A | "Costo de vida en Goshen, Indiana" | Yes |
| `/blog/spanish/eventos-comunitarios-elkhart-indiana/` | `eventos-comunitarios-elkhart-indiana-header.jpg` | A | "Eventos comunitarios en Elkhart, Indiana: un calendario anual" | Yes |
| `/blog/spanish/eventos-comunitarios-goshen-indiana/` | `eventos-comunitarios-goshen-indiana-header.jpg` | A | "Eventos comunitarios en Goshen, Indiana: calendario de todo el año" | Yes |
| `/blog/spanish/industria-rv-comprar-casa-goshen-indiana/` | `industria-rv-comprar-casa-goshen-indiana-header.jpg` | A | "Trabajar en la industria RV y comprar casa en Goshen, Indiana" | Yes |
| `/blog/spanish/mudarse-a-elkhart-indiana-desde-otro-estado/` | `mudarse-a-elkhart-indiana-desde-otro-estado-header.jpg` | A | "Mudarse a Elkhart, Indiana desde otro estado: cronología paso a paso" | Yes |
| `/blog/spanish/mudarse-a-goshen-desde-otro-estado/` | `mudarse-a-goshen-desde-otro-estado-header.jpg` | A | "Mudarse a Goshen, Indiana desde otro estado: guía paso a paso" | Yes |
| `/blog/spanish/que-hacer-en-elkhart-indiana/` | `que-hacer-en-elkhart-indiana-header.jpg` | A | "Qué hacer en Elkhart, Indiana" | Yes |
| `/blog/spanish/que-hacer-en-goshen-indiana/` | `que-hacer-en-goshen-indiana-header.jpg` | A | "Qué hacer en Goshen, Indiana" | Yes |
| `/blog/spanish/trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana/` | `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana-header.jpg` | A | "Trabajar en la industria de RV y comprar casa en Elkhart, Indiana" | Yes |

### Needs your ruling — in a Buy/Sell folder but not linked from a hub (5)

These five live under `/blog/buyers/`, `/blog/sellers/` or the Spanish set, but
none of them is linked from `/buyers/`, `/sellers/`, `/es/compradores/` or
`/es/vendedores/`. By the "linked from the four hub pages" test they fall
outside the exception; by folder they look like they're inside it. What they
actually appear to be: `buying-an-older-home-in-goshen-indiana` and its Spanish
twin are Goshen relocation-cluster articles (Master Plan §11), and the other
three are linked from the homepage and the Meet Lisa cluster.

**Default if you don't say otherwise: treat all five as out of scope** and add
them to the reshoot list. Say the word and they move the other way instead.

| Page | Image file | Template | Baked-in text | Cutout portrait |
| --- | --- | --- | --- | --- |
| `/blog/buyers/buying-an-older-home-in-goshen-indiana/` | `buying-an-older-home-in-goshen-indiana-header.jpg` | A | "Buying an Older Home in Goshen, Indiana: What to Check First" | Yes |
| `/blog/buyers/good-time-to-buy-home-goshen-indiana/` | `good-time-to-buy-home-goshen-indiana-header.jpg` | A | "Is Now a Good Time to Buy a Home in Goshen, Indiana?" | Yes |
| `/blog/sellers/sell-home-elkhart-indiana-best-price/` | `sell-home-elkhart-indiana-best-price-header.jpg` | A | "How Do I Sell My Home in Elkhart, Indiana for the Best Price?" | Yes |
| `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` | `what-is-an-sres-seniors-real-estate-specialist-header.jpg` | A | "What Is a Seniors Real Estate Specialist (SRES®) and How Can One Help in Goshen and Elkhart, Indiana?" | Yes |
| `/blog/spanish/comprar-casa-antigua-goshen-indiana/` | `comprar-casa-antigua-goshen-indiana-header.jpg` | A | "Comprar una casa antigua en Goshen, Indiana: qué revisar primero" | Yes |

## Two things found alongside the audit, neither needing a reshoot

- **`assets/images/lisa/lisa-collio-avatar.jpg`** is a branded illustrated
  avatar with heavy baked-in text (tagline, name, credentials, phone number).
  It is **not referenced by any page, stylesheet, or script** in the repo, so
  it isn't a live featured image and the new rule doesn't reach it. Left
  untouched; noted here only so it isn't mistaken for a miss on a later pass.
- **`assets/images/client-reviews/review-ana-gabriela.jpg`** has a solid blue
  bar along its bottom edge. That is letterbox padding from the source crop,
  not an overlay — no text, no band, no cutout. No action under this rule,
  though it is a cosmetic artifact worth fixing whenever that photo is next
  touched.

Every other image in `assets/images/` was scanned for a full-width RE/MAX Blue
or Red band; the only hits were the two above and the `blog-headers/` set. In-
article illustration images outside `blog-headers/` are plain photographs.

## The two confirmations the instructions asked for

**1. The Goshen/Elkhart section/FAQ image slots will receive clean photos.**
Partly confirmable, and here is exactly how far it goes. The filenames document
(`V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md`) is **not in this repo and
was not supplied**, so the ~56 planned filenames could not be checked one by one.
What is confirmed: the four Goshen/Elkhart pillar pages and their articles carry
no section or FAQ images today — the only in-article images on them are the
header logos, the featured image, client review photos, and the Equal Housing
logo — so there are no existing slots to clean up, and every one of those images
will be new. And because `generate_clean()` is now the only path that will accept
those slugs (the overlay functions raise on anything outside `OVERLAY_SCOPE`),
a clean photo is what they will get whether or not anyone remembers the rule.
Send the filenames document over and it can be checked name by name.

**2. The Buyers/Sellers/Compradores/Vendedores pipeline is untouched.** Templates
A/B/C, the four-variant rotation (`VARIANTS` / `variant_for`), the title-matches-
H1 rule, and the never-over-a-face rule are all unchanged for the 35 in-scope
articles and their four hub pages. The only edit to those functions is a single
scope-guard call at the top of each. Verified by regenerating an in-scope overlay
after the change — same templates, same rotation, same output shape.

## What WAS changed (the four you named, 27 July)

Each was rebuilt from its **original source photograph**, never from the
text-bearing composite. Source, framing, and crop are recorded in `CLEAN_JOBS`
in `scripts/generate-featured-images.py`, so `--clean` reproduces them exactly.

| Slug | Source photo | Note on framing |
| --- | --- | --- |
| `what-makes-lisa-collio-different` | `lisa/lisa-collio-red-blazer.jpg` | Straight cover-crop, framed to keep the blazer in shot |
| `how-many-homes-lisa-collio-sold-goshen-elkhart` | `lisa/lisa-collio-remax-awards-100-club.jpg` | **Cropped to the centre panel only.** The source is a three-panel collage whose right panel is a "100% CLUB / 2023 RE/MAX AWARDS" graphic — baked-in text in the photo itself. The RE/MAX banner still in frame is real event signage, not an overlay. |
| `why-clients-choose-lisa-collio` | `lisa/lisa-collio-headshot-remax-branded.jpg` | Framed **below** the source's own RE/MAX lockup and "Lisa Collio REALTOR®" script logo, so neither appears |
| `what-is-it-like-to-work-with-lisa-collio` | `lisa/lisa-collio-open-house-flag-summer.jpg` | Straight cover-crop |

Two of those four source photos carry text of their own. Framing keeps it out of
frame — a clean image means no text in the final frame, whether this script put
it there or the photograph already had it. **Both are worth a proper reshoot
when you get the chance**; the crops are a correct fix, not an ideal photo.

Each is now a single clean 1200×630 `-header` (plus the 800×420 `-thumb`, plus
`.webp` beside each). The separate 1200×630 `-og` file the B/C templates needed
is redundant now that the header is already OG-sized, so the eight `-og` files
were deleted and `og:image` / `twitter:image` repointed at the header. The
on-page `<img>` height went 900 → 630 to match.

## What was NOT changed

- No other image regenerated, overwritten, or deleted.
- No other page markup changed.
- The Buyers/Sellers/Compradores/Vendedores pipeline is untouched.
