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

**The complete 49-slug / 196-file manifest is the appendix at the end of this
document**, with the source photograph behind every one and a reshoot-vs-
re-export grouping. Headline: **43 of the 45 need no reshoot** — their source is
a clean decorative photo already in the repo.

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

### The 5 that needed a ruling — now evidenced, confirm rather than decide (5)

When this audit was first written these five looked genuinely undecidable: each
sits in `/blog/buyers/`, `/blog/sellers/` or the Spanish set, but none is linked
from `/buyers/`, `/sellers/`, `/es/compradores/` or `/es/vendedores/`. Checking
the hubs' link counts against Master Plan §11 settles all five.

**The counting evidence.** `/blog/buyers/` holds 10 articles but `/buyers/` links
8 — and §11 says the Buy a Home set is 8. `/blog/sellers/` holds 12 but
`/sellers/` links 10 — and §11 says the Sell a Home set is 10. Each folder
carries exactly two articles beyond its set. Those four extras are not orphans:
**the homepage FAQ links exactly four articles, and three of them are these.**
§11 describes the Home Page set as "hub FAQ section + 4 articles." The homepage's
fourth is `what-makes-lisa-collio-different` — one of the four Lisa already
directed be cleaned as out of scope.

So the folder an article sits in reflects its topic, not its set. All five fall
outside the Buyers/Sellers exception.

| Page | What it actually belongs to | Question for Lisa |
| --- | --- | --- |
| `/blog/buyers/good-time-to-buy-home-goshen-indiana/` | **Home Page set** — one of the homepage FAQ's 4 articles | Confirm out of scope. Its 3 set-mates are already out; leaving this one in would split the homepage FAQ row across two visual styles. |
| `/blog/sellers/sell-home-elkhart-indiana-best-price/` | **Home Page set** | Same. Note its Goshen twin `sell-home-goshen-indiana-best-price` **is** in scope (linked from `/sellers/`), so the pair will legitimately look different. Confirm that's acceptable, or add the Elkhart one to `/sellers/` and it becomes in-scope. |
| `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` | **Home Page set**, also linked from the Meet Lisa cluster | Confirm out of scope. |
| `/blog/buyers/buying-an-older-home-in-goshen-indiana/` | **Goshen relocation cluster** — §11 names "Buying an Older Home" as one of its 6. Linked from `/moving-to-goshen/`. | Confirm out of scope. Its Elkhart sibling `buying-an-older-home-in-elkhart-indiana` is already out, as is the Spanish Elkhart twin. |
| `/blog/spanish/comprar-casa-antigua-goshen-indiana/` | Spanish twin of the row above | Must match whatever the row above gets — English and Spanish change together. |

**Recommendation: all five out of scope.** That is the reading the link counts,
§11, and the already-cleaned homepage article all point to. The one genuine
judgement call is the second row: whether `/sellers/` is *missing* a link to
`sell-home-elkhart-indiana-best-price`. If it should be linked, say so and the
right fix is to add the link — which changes its scope as a side effect, rather
than deciding its image style in isolation.

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

---

# Appendix — the complete file manifest (49 slugs · 196 files)

Every file still carrying baked-in text, with the source photograph each was
built from. **Source photos were identified by pixel-matching the composite's
photo region against every image in the repo**, with the cutout area masked out,
not by guessing from filenames. `exact` means the match scored under 8 mean
absolute difference per channel against a next-best of ~50 — i.e. the same
photograph. `likely` (8–25) is the same photograph with a slightly different
crop or re-encode.

**This is what decides reshoot vs. re-export.** 43 of the 45 Template A images
were built from clean, decorative photos already in `assets/images/homes-general/`
— those need no reshoot at all, just a re-export through `generate_clean()`.
The exceptions are called out in their own group below.


## Group 1 — clean re-export, no reshoot needed (43 slugs · 164 files)

Source is a decorative photo already in `assets/images/homes-general/`, with no
text and no address in it. Re-exporting through `generate_clean()` gives a clean
image with the same photograph — visually identical to what is live today minus
the band and the cutout. **No new photography required for any of these.**

| Slug | Page | Source photo | Match | Files |
| --- | --- | --- | --- | --- |
| `buying-an-older-home-in-elkhart-indiana` | `/blog/community/buying-an-older-home-in-elkhart-indiana/` | `homes-general/exterior-ranch-rear-leafy-yard-fence.jpg` | exact | `buying-an-older-home-in-elkhart-indiana-header.jpg` · `buying-an-older-home-in-elkhart-indiana-header.webp` · `buying-an-older-home-in-elkhart-indiana-thumb.jpg` · `buying-an-older-home-in-elkhart-indiana-thumb.webp` |
| `buying-an-older-home-in-goshen-indiana` | `/blog/buyers/buying-an-older-home-in-goshen-indiana/` | `homes-general/exterior-covered-porch-framing-rural-view.jpg` | exact | `buying-an-older-home-in-goshen-indiana-header.jpg` · `buying-an-older-home-in-goshen-indiana-header.webp` · `buying-an-older-home-in-goshen-indiana-thumb.jpg` · `buying-an-older-home-in-goshen-indiana-thumb.webp` |
| `centro-de-elkhart-indiana` | `/blog/spanish/centro-de-elkhart-indiana/` | `homes-general/twilight-exterior-split-level-green-shutters.jpg` | exact | `centro-de-elkhart-indiana-header.jpg` · `centro-de-elkhart-indiana-header.webp` · `centro-de-elkhart-indiana-thumb.jpg` · `centro-de-elkhart-indiana-thumb.webp` |
| `community-events-in-elkhart-indiana` | `/blog/community/community-events-in-elkhart-indiana/` | `homes-general/exterior-backyard-privacy-fence-chairs.jpg` | likely | `community-events-in-elkhart-indiana-header.jpg` · `community-events-in-elkhart-indiana-header.webp` · `community-events-in-elkhart-indiana-thumb.jpg` · `community-events-in-elkhart-indiana-thumb.webp` |
| `community-events-in-goshen-indiana` | `/blog/community/community-events-in-goshen-indiana/` | `homes-general/exterior-two-story-rear-covered-porch.jpg` | likely | `community-events-in-goshen-indiana-header.jpg` · `community-events-in-goshen-indiana-header.webp` · `community-events-in-goshen-indiana-thumb.jpg` · `community-events-in-goshen-indiana-thumb.webp` |
| `comprar-casa-antigua-elkhart-indiana` | `/blog/spanish/comprar-casa-antigua-elkhart-indiana/` | `homes-general/exterior-ranch-rear-leafy-yard-fence.jpg` | likely | `comprar-casa-antigua-elkhart-indiana-header.jpg` · `comprar-casa-antigua-elkhart-indiana-header.webp` · `comprar-casa-antigua-elkhart-indiana-thumb.jpg` · `comprar-casa-antigua-elkhart-indiana-thumb.webp` |
| `comprar-casa-antigua-goshen-indiana` | `/blog/spanish/comprar-casa-antigua-goshen-indiana/` | `homes-general/exterior-red-wood-deck-backyard.jpg` | exact | `comprar-casa-antigua-goshen-indiana-header.jpg` · `comprar-casa-antigua-goshen-indiana-header.webp` · `comprar-casa-antigua-goshen-indiana-thumb.jpg` · `comprar-casa-antigua-goshen-indiana-thumb.webp` |
| `cost-of-living-in-elkhart-indiana` | `/blog/community/cost-of-living-in-elkhart-indiana/` | `homes-general/interior-kitchen-oak-cabinets-open-layout.jpg` | exact | `cost-of-living-in-elkhart-indiana-header.jpg` · `cost-of-living-in-elkhart-indiana-header.webp` · `cost-of-living-in-elkhart-indiana-thumb.jpg` · `cost-of-living-in-elkhart-indiana-thumb.webp` |
| `cost-of-living-in-goshen-indiana` | `/blog/community/cost-of-living-in-goshen-indiana/` | `homes-general/exterior-single-story-ranch-driveway.jpg` | likely | `cost-of-living-in-goshen-indiana-header.jpg` · `cost-of-living-in-goshen-indiana-header.webp` · `cost-of-living-in-goshen-indiana-thumb.jpg` · `cost-of-living-in-goshen-indiana-thumb.webp` |
| `costo-de-vida-elkhart-indiana` | `/blog/spanish/costo-de-vida-elkhart-indiana/` | `homes-general/exterior-single-story-ranch-driveway.jpg` | likely | `costo-de-vida-elkhart-indiana-header.jpg` · `costo-de-vida-elkhart-indiana-header.webp` · `costo-de-vida-elkhart-indiana-thumb.jpg` · `costo-de-vida-elkhart-indiana-thumb.webp` |
| `costo-de-vida-goshen-indiana` | `/blog/spanish/costo-de-vida-goshen-indiana/` | `homes-general/exterior-backyard-playset-shed-winter.jpg` | exact | `costo-de-vida-goshen-indiana-header.jpg` · `costo-de-vida-goshen-indiana-header.webp` · `costo-de-vida-goshen-indiana-thumb.jpg` · `costo-de-vida-goshen-indiana-thumb.webp` |
| `downtown-elkhart-indiana` | `/blog/community/downtown-elkhart-indiana/` | `homes-general/exterior-home-side-wood-deck-lawn.jpg` | exact | `downtown-elkhart-indiana-header.jpg` · `downtown-elkhart-indiana-header.webp` · `downtown-elkhart-indiana-thumb.jpg` · `downtown-elkhart-indiana-thumb.webp` |
| `downtown-goshen-indiana` | `/blog/community/downtown-goshen-indiana/` | `homes-general/exterior-wooded-backyard-swing-set-fire-pit.jpg` | exact | `downtown-goshen-indiana-header.jpg` · `downtown-goshen-indiana-header.webp` · `downtown-goshen-indiana-thumb.jpg` · `downtown-goshen-indiana-thumb.webp` |
| `elkhart-indiana-industries-employers` | `/blog/community/elkhart-indiana-industries-employers/` | `homes-general/exterior-open-acreage-field-trees.jpg` | exact | `elkhart-indiana-industries-employers-header.jpg` · `elkhart-indiana-industries-employers-header.webp` · `elkhart-indiana-industries-employers-thumb.jpg` · `elkhart-indiana-industries-employers-thumb.webp` |
| `elkhart-indiana-landmarks-amenities` | `/blog/community/elkhart-indiana-landmarks-amenities/` | `homes-general/exterior-backyard-shrub-lawn-trees.jpg` | exact | `elkhart-indiana-landmarks-amenities-header.jpg` · `elkhart-indiana-landmarks-amenities-header.webp` · `elkhart-indiana-landmarks-amenities-thumb.jpg` · `elkhart-indiana-landmarks-amenities-thumb.webp` |
| `elkhart-indiana-school-districts` | `/blog/community/elkhart-indiana-school-districts/` | `homes-general/exterior-large-lawn-mature-trees.jpg` | exact | `elkhart-indiana-school-districts-header.jpg` · `elkhart-indiana-school-districts-header.webp` · `elkhart-indiana-school-districts-thumb.jpg` · `elkhart-indiana-school-districts-thumb.webp` |
| `eventos-comunitarios-elkhart-indiana` | `/blog/spanish/eventos-comunitarios-elkhart-indiana/` | `homes-general/exterior-covered-brick-porch-hanging-chair.jpg` | exact | `eventos-comunitarios-elkhart-indiana-header.jpg` · `eventos-comunitarios-elkhart-indiana-header.webp` · `eventos-comunitarios-elkhart-indiana-thumb.jpg` · `eventos-comunitarios-elkhart-indiana-thumb.webp` |
| `eventos-comunitarios-goshen-indiana` | `/blog/spanish/eventos-comunitarios-goshen-indiana/` | `homes-general/exterior-backyard-privacy-fence-chairs.jpg` | exact | `eventos-comunitarios-goshen-indiana-header.jpg` · `eventos-comunitarios-goshen-indiana-header.webp` · `eventos-comunitarios-goshen-indiana-thumb.jpg` · `eventos-comunitarios-goshen-indiana-thumb.webp` |
| `good-time-to-buy-home-goshen-indiana` | `/blog/buyers/good-time-to-buy-home-goshen-indiana/` | `homes-general/exterior-covered-brick-porch-hanging-chair.jpg` | exact | `good-time-to-buy-home-goshen-indiana-header.jpg` · `good-time-to-buy-home-goshen-indiana-header.webp` · `good-time-to-buy-home-goshen-indiana-thumb.jpg` · `good-time-to-buy-home-goshen-indiana-thumb.webp` |
| `goshen-indiana-industries-employers` | `/blog/community/goshen-indiana-industries-employers/` | `homes-general/exterior-red-wood-deck-backyard.jpg` | exact | `goshen-indiana-industries-employers-header.jpg` · `goshen-indiana-industries-employers-header.webp` · `goshen-indiana-industries-employers-thumb.jpg` · `goshen-indiana-industries-employers-thumb.webp` |
| `goshen-indiana-landmarks-amenities` | `/blog/community/goshen-indiana-landmarks-amenities/` | `homes-general/interior-living-room-stone-fireplace-wall.jpg` | exact | `goshen-indiana-landmarks-amenities-header.jpg` · `goshen-indiana-landmarks-amenities-header.webp` · `goshen-indiana-landmarks-amenities-thumb.jpg` · `goshen-indiana-landmarks-amenities-thumb.webp` |
| `goshen-indiana-school-district` | `/blog/community/goshen-indiana-school-district/` | `homes-general/exterior-home-rear-deck-stairs-fenced.jpg` | likely | `goshen-indiana-school-district-header.jpg` · `goshen-indiana-school-district-header.webp` · `goshen-indiana-school-district-thumb.jpg` · `goshen-indiana-school-district-thumb.webp` |
| `industria-rv-comprar-casa-goshen-indiana` | `/blog/spanish/industria-rv-comprar-casa-goshen-indiana/` | `homes-general/exterior-backyard-deck-fenced-trees.jpg` | exact | `industria-rv-comprar-casa-goshen-indiana-header.jpg` · `industria-rv-comprar-casa-goshen-indiana-header.webp` · `industria-rv-comprar-casa-goshen-indiana-thumb.jpg` · `industria-rv-comprar-casa-goshen-indiana-thumb.webp` |
| `living-in-elkhart-guide` | `/living-in-elkhart/` | `homes-general/exterior-covered-brick-porch-hanging-chair.jpg` | exact | `living-in-elkhart-guide-header.jpg` · `living-in-elkhart-guide-header.webp` |
| `living-in-goshen-guide` | `/living-in-goshen/` | `homes-general/hero-twilight-1.jpg` | exact | `living-in-goshen-guide-header.jpg` · `living-in-goshen-guide-header.webp` · `living-in-goshen-guide-thumb.jpg` · `living-in-goshen-guide-thumb.webp` |
| `moving-to-elkhart` | `/moving-to-elkhart/` | `homes-general/twilight-exterior-two-story-brick-garage.jpg` | exact | `moving-to-elkhart-header.jpg` · `moving-to-elkhart-header.webp` |
| `moving-to-elkhart-indiana-from-out-of-state` | `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | `homes-general/hero-twilight-2.jpg` | exact | `moving-to-elkhart-indiana-from-out-of-state-header.jpg` · `moving-to-elkhart-indiana-from-out-of-state-header.webp` · `moving-to-elkhart-indiana-from-out-of-state-thumb.jpg` · `moving-to-elkhart-indiana-from-out-of-state-thumb.webp` |
| `mudarse-a-elkhart` | `/es/mudarse-a-elkhart/` | `homes-general/twilight-exterior-two-story-brick-garage.jpg` | exact | `mudarse-a-elkhart-header.jpg` · `mudarse-a-elkhart-header.webp` |
| `mudarse-a-elkhart-indiana-desde-otro-estado` | `/blog/spanish/mudarse-a-elkhart-indiana-desde-otro-estado/` | `homes-general/twilight-exterior-two-story-brick-garage.jpg` | exact | `mudarse-a-elkhart-indiana-desde-otro-estado-header.jpg` · `mudarse-a-elkhart-indiana-desde-otro-estado-header.webp` · `mudarse-a-elkhart-indiana-desde-otro-estado-thumb.jpg` · `mudarse-a-elkhart-indiana-desde-otro-estado-thumb.webp` |
| `mudarse-a-goshen-desde-otro-estado` | `/blog/spanish/mudarse-a-goshen-desde-otro-estado/` | `homes-general/exterior-home-rear-deck-stairs-fenced.jpg` | exact | `mudarse-a-goshen-desde-otro-estado-header.jpg` · `mudarse-a-goshen-desde-otro-estado-header.webp` · `mudarse-a-goshen-desde-otro-estado-thumb.jpg` · `mudarse-a-goshen-desde-otro-estado-thumb.webp` |
| `que-hacer-en-elkhart-indiana` | `/blog/spanish/que-hacer-en-elkhart-indiana/` | `homes-general/exterior-large-lawn-mature-trees.jpg` | exact | `que-hacer-en-elkhart-indiana-header.jpg` · `que-hacer-en-elkhart-indiana-header.webp` · `que-hacer-en-elkhart-indiana-thumb.jpg` · `que-hacer-en-elkhart-indiana-thumb.webp` |
| `que-hacer-en-goshen-indiana` | `/blog/spanish/que-hacer-en-goshen-indiana/` | `homes-general/exterior-backyard-shrub-lawn-trees.jpg` | exact | `que-hacer-en-goshen-indiana-header.jpg` · `que-hacer-en-goshen-indiana-header.webp` · `que-hacer-en-goshen-indiana-thumb.jpg` · `que-hacer-en-goshen-indiana-thumb.webp` |
| `rv-industry-buying-a-home-goshen-indiana` | `/blog/relocation/rv-industry-buying-a-home-goshen-indiana/` | `homes-general/exterior-ranch-rear-leafy-yard-fence.jpg` | exact | `rv-industry-buying-a-home-goshen-indiana-header.jpg` · `rv-industry-buying-a-home-goshen-indiana-header.webp` · `rv-industry-buying-a-home-goshen-indiana-thumb.jpg` · `rv-industry-buying-a-home-goshen-indiana-thumb.webp` |
| `sell-home-elkhart-indiana-best-price` | `/blog/sellers/sell-home-elkhart-indiana-best-price/` | `homes-general/interior-kitchen-dark-cabinets-island.jpg` | exact | `sell-home-elkhart-indiana-best-price-header.jpg` · `sell-home-elkhart-indiana-best-price-header.webp` · `sell-home-elkhart-indiana-best-price-thumb.jpg` · `sell-home-elkhart-indiana-best-price-thumb.webp` |
| `things-to-do-in-elkhart-indiana` | `/blog/community/things-to-do-in-elkhart-indiana/` | `homes-general/exterior-backyard-deck-fenced-trees.jpg` | exact | `things-to-do-in-elkhart-indiana-header.jpg` · `things-to-do-in-elkhart-indiana-header.webp` · `things-to-do-in-elkhart-indiana-thumb.jpg` · `things-to-do-in-elkhart-indiana-thumb.webp` |
| `things-to-do-in-goshen-indiana` | `/blog/community/things-to-do-in-goshen-indiana/` | `homes-general/exterior-large-lawn-mature-trees.jpg` | exact | `things-to-do-in-goshen-indiana-header.jpg` · `things-to-do-in-goshen-indiana-header.webp` · `things-to-do-in-goshen-indiana-thumb.jpg` · `things-to-do-in-goshen-indiana-thumb.webp` |
| `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana` | `/blog/spanish/trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana/` | `homes-general/exterior-home-side-wood-deck-lawn.jpg` | exact | `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana-header.jpg` · `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana-header.webp` · `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana-thumb.jpg` · `trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana-thumb.webp` |
| `viviendo-en-elkhart` | `/es/viviendo-en-elkhart/` | `homes-general/exterior-covered-brick-porch-hanging-chair.jpg` | exact | `viviendo-en-elkhart-header.jpg` · `viviendo-en-elkhart-header.webp` |
| `viviendo-en-goshen` | `/es/viviendo-en-goshen/` | `homes-general/hero-twilight-1.jpg` | exact | `viviendo-en-goshen-header.jpg` · `viviendo-en-goshen-header.webp` · `viviendo-en-goshen-thumb.jpg` · `viviendo-en-goshen-thumb.webp` |
| `what-is-an-sres-seniors-real-estate-specialist` | `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` | `homes-general/interior-kitchen-cherry-cabinets-stainless.jpg` | exact | `what-is-an-sres-seniors-real-estate-specialist-header.jpg` · `what-is-an-sres-seniors-real-estate-specialist-header.webp` · `what-is-an-sres-seniors-real-estate-specialist-thumb.jpg` · `what-is-an-sres-seniors-real-estate-specialist-thumb.webp` |
| `what-is-elkhart-indiana-known-for` | `/blog/community/what-is-elkhart-indiana-known-for/` | `homes-general/exterior-two-story-rear-covered-porch.jpg` | exact | `what-is-elkhart-indiana-known-for-header.jpg` · `what-is-elkhart-indiana-known-for-header.webp` · `what-is-elkhart-indiana-known-for-thumb.jpg` · `what-is-elkhart-indiana-known-for-thumb.webp` |
| `what-is-goshen-indiana-known-for` | `/blog/community/what-is-goshen-indiana-known-for/` | `homes-general/exterior-backyard-playset-shed-winter.jpg` | exact | `what-is-goshen-indiana-known-for-header.jpg` · `what-is-goshen-indiana-known-for-header.webp` · `what-is-goshen-indiana-known-for-thumb.jpg` · `what-is-goshen-indiana-known-for-thumb.webp` |
| `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana` | `/blog/community/working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana/` | `homes-general/exterior-backyard-lawn-metal-shed.jpg` | exact | `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana-header.jpg` · `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana-header.webp` · `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana-thumb.jpg` · `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana-thumb.webp` |

## Group 2 — people photos, re-export with framing to check (4 slugs · 24 files)

The rest of the Meet Lisa / brand group. Same treatment as the four already
cleaned: re-export from the source photo, but the framing needs a look because
these are people photos and two of the four sources were matched only
approximately (the original composites used a manual crop that has to be
re-derived).

| Slug | Page | Source photo | Match | Files |
| --- | --- | --- | --- | --- |
| `does-lisa-collio-speak-spanish` | `/blog/community/does-lisa-collio-speak-spanish/` | `lisa/lisa-collio-headshot-red-top.jpg` | likely | `does-lisa-collio-speak-spanish-header.jpg` · `does-lisa-collio-speak-spanish-header.webp` · `does-lisa-collio-speak-spanish-og.jpg` · `does-lisa-collio-speak-spanish-og.webp` · `does-lisa-collio-speak-spanish-thumb.jpg` · `does-lisa-collio-speak-spanish-thumb.webp` |
| `lisa-collio-helps-seniors-families-downsize` | `/blog/community/lisa-collio-helps-seniors-families-downsize/` | `client-general/clients-new-home-keys-newborn.jpg` | uncertain | `lisa-collio-helps-seniors-families-downsize-header.jpg` · `lisa-collio-helps-seniors-families-downsize-header.webp` · `lisa-collio-helps-seniors-families-downsize-og.jpg` · `lisa-collio-helps-seniors-families-downsize-og.webp` · `lisa-collio-helps-seniors-families-downsize-thumb.jpg` · `lisa-collio-helps-seniors-families-downsize-thumb.webp` |
| `moving-to-goshen-indiana-from-out-of-state` | `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/` | `lisa/lisa-collio-for-sale-sign-summer.jpg` | exact | `moving-to-goshen-indiana-from-out-of-state-header.jpg` · `moving-to-goshen-indiana-from-out-of-state-header.webp` · `moving-to-goshen-indiana-from-out-of-state-og.jpg` · `moving-to-goshen-indiana-from-out-of-state-og.webp` · `moving-to-goshen-indiana-from-out-of-state-thumb.jpg` · `moving-to-goshen-indiana-from-out-of-state-thumb.webp` |
| `why-lisa-collio-became-real-estate-agent` | `/blog/community/why-lisa-collio-became-real-estate-agent/` | `lisa/lisa-collio-holiday-lights-portrait-2.jpg` | exact | `why-lisa-collio-became-real-estate-agent-header.jpg` · `why-lisa-collio-became-real-estate-agent-header.webp` · `why-lisa-collio-became-real-estate-agent-og.jpg` · `why-lisa-collio-became-real-estate-agent-og.webp` · `why-lisa-collio-became-real-estate-agent-thumb.jpg` · `why-lisa-collio-became-real-estate-agent-thumb.webp` |

## Group 3 — needs your decision on the photograph itself (2 slugs · 8 files)

**These two are the only ones that may need a different photo, and there are two
separate issues.**

1. **They are the only two out-of-scope images not built from
   `homes-general/`.** Their source sits in `assets/images/homes-goshen/` — an
   address folder, i.e. a real identifiable sold property. The folder README
   records seller consent and broker approval on file, and the pages use plain
   decorative framing with no address and no "sold" claim, which is the
   conservative reading CLAUDE.md asks for. It is still worth your eye, because
   876 IAC 8-1-8(f) governs presenting a specific property, and a city pillar
   page is a more prominent placement than a decorative slot.

2. **The same file is filed under two different addresses.** Byte-identical
   (md5 `499fdb0f…`) in both
   `homes-goshen/22893-county-road-42-goshen-in-46526/` and
   `homes-goshen/715-lincolnway-e-goshen-in-46526/`. One of those is wrong, and
   since the folder name *is* the consent record, it is not currently possible
   to say which seller's consent covers this photo. Worth resolving on its own
   merits, separately from the image standard.

The simplest fix for both pages is to re-export from a `homes-general/` photo
instead, which sidesteps the question entirely — but that is a change of
photograph, so it is your call, not mine.

| Slug | Page | Source photo | Match | Files |
| --- | --- | --- | --- | --- |
| `moving-to-goshen` | `/moving-to-goshen/` | `homes-goshen/<address>/001_dsc02300.jpg-twilight_551.jpg` | exact | `moving-to-goshen-header.jpg` · `moving-to-goshen-header.webp` · `moving-to-goshen-thumb.jpg` · `moving-to-goshen-thumb.webp` |
| `mudarse-a-goshen` | `/es/mudarse-a-goshen/` | `homes-goshen/<address>/001_dsc02300.jpg-twilight_551.jpg` | exact | `mudarse-a-goshen-header.jpg` · `mudarse-a-goshen-header.webp` · `mudarse-a-goshen-thumb.jpg` · `mudarse-a-goshen-thumb.webp` |
