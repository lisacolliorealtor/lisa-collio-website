# Claude Code Instructions — Text Overlay Reversal (Scoped Exception)

*Prepared for Lisa Collio, Real Estate Agent · July 2026*
*Priority: run this BEFORE the new Goshen/Elkhart images are wired in, so those ship correctly the first time.*

**STATUS: APPROVED BY LISA — 27 July 2026.** (Per current workflow, the managing broker's sign-off happens once, comprehensively, at the end of the whole site build — not per document.)

**Workflow reminder (standing rule):** commit this instructions file into `docs/drafts/` as your first step. Build on a PR branch so Lisa can review a deploy preview. The approval gate is at MERGE — Lisa approves, and per her current workflow the managing broker's sign-off happens once, comprehensively, at the end of the whole site build, not per PR. Do not merge without Lisa's explicit go-ahead.

---

## What changed

The featured-image standard is reversed from "text overlay by default" to **"text overlay only in one scoped exception."**

## The exception — KEEP text overlay here only

- `/buyers/`
- `/sellers/`
- `/es/compradores/`
- `/es/vendedores/`
- Every authority article that belongs to the Buy a Home set, the Sell a Home set, and Cluster 1 (Compradores Hispanohablantes) — i.e., the articles linked from the four hub pages above.

For this scope only: keep the existing Templates A/B/C system, the four-variant rotation tracking (photo left/right × RE/MAX Blue/Red), the "text matches the article H1 exactly" rule, and the "never place text over a person's face" caution. These are house/property photos and the text pairs intentionally with Lisa's cutout portrait — no change needed here.

**Explicit clarification — the cutout portrait is scoped the same way as the text.** Lisa's cutout portrait on a blog/article featured image appears ONLY on `/buyers/`, `/sellers/`, `/es/compradores/`, `/es/vendedores/`, and their linked authority articles. It is not a site-wide element for blog images. Every other blog/article image — Communities, Meet Lisa, Market Stats, Next Chapter Method, and all future posts outside Buy/Sell/Compradores/Vendedores — is the **house/place/topic photo alone: no text, no cutout, nothing overlaid on it at all.**

**Do not confuse this with the Tier 1 page hero system.** Separately, the Tier 1 signature hero (full-height header at the top of Home, Buyers, Sellers, Meet Lisa, Next Chapter Method, and Contact) also uses Lisa's cutout portrait — but that's the page hero, not a blog/article featured image, and it's governed by the hero standard, not this one. A page can have the cutout in its Tier 1 hero at the top AND, if it's a Buyers/Sellers-cluster article, also have the cutout in its featured image — those are two separate, independently-scoped uses of the same portrait asset, not one rule bleeding into the other.

## Everywhere else — REMOVE text overlay

This applies to every other page and every other blog/authority article on the site, both languages, including but not limited to:

- Homepage
- Meet Lisa
- Next Chapter Method / Tu Próximo Capítulo
- Communities: Moving to Goshen, Living in Goshen, Moving to Elkhart, Living in Elkhart (EN + ES) — **this includes the ~56 new section/FAQ images Lisa is about to upload per `V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md`; those should never receive baked-in text**
- Market Stats
- Contact
- Any future blog post that doesn't belong to the Buy/Sell/Compradores/Vendedores clusters

For this scope:

1. **Audit first.** Find every existing featured/og:image and in-article image outside the exception scope that currently has baked-in text (Templates A/B/C applied). Produce a list before touching anything.
2. **Flag, don't silently fix.** For each one found, flag it for Lisa: it needs a clean re-export or reshoot without text. Do not auto-generate replacement text-free images from the existing text-bearing ones without her sign-off on the photo itself.
3. **Going forward:** all new images outside the exception scope are clean photos only. No color band, no overlay, no baked text. The page's own H1/heading renders the title as normal HTML — that was already true site-wide, this just stops duplicating it into the image.
4. **Retire the rotation tracking outside the exception scope.** The four-variant left/right × blue/red rotation log only needs to keep tracking Buyers/Sellers/Compradores/Vendedores content going forward. Don't burn time rotating variants for images that no longer have a color band.

## One clarification — this does NOT touch the hero system

The Tier 1 signature hero (homepage, and the other five Tier 1 pages once built) already renders its headline as real HTML text layered over the photo — it was never a baked-in-text image to begin with. Nothing changes there. This instruction is specifically about **featured/og:images and in-article illustration images**, not the hero component.

## Output needed back from Claude Code

- The audit list from step 1 (which existing images outside the exception have baked-in text)
- Confirmation that the Goshen/Elkhart image slots per the filenames document are set up to receive clean photos with no overlay
- Confirmation the Buyers/Sellers/Compradores/Vendedores pipeline is untouched and still expects Templates A/B/C + rotation

---

## Master Plan replacement language

Lisa is updating the Master Plan document itself (not just this instructions file) so the rule doesn't drift back. Suggested replacement text for the "Featured-image standard" section:

> **Featured-image standard (updated July 2026):** Text overlay AND Lisa's cutout portrait on blog/article featured images are a scoped exception, not the default. They apply ONLY to the Buyers/Sellers content clusters — `/buyers/`, `/sellers/`, `/es/compradores/`, `/es/vendedores/` and their linked authority articles — where house/property photos carry the article title in a solid RE/MAX Blue or Red band alongside Lisa's cutout, per the original Template A/B/C system (1200×630 or 1200×900 per template, four-variant left/right × blue/red rotation, text matches the H1 exactly, never over a person's face). Every other page and article, in both languages — including Communities, Market Stats, Meet Lisa, the homepage, and all future blog posts outside the Buy/Sell clusters — uses a clean photo with nothing overlaid on it at all: no text, no cutout. The title displays as normal HTML text on the page itself. (Separate from this: the Tier 1 page-hero component on Home, Buyers, Sellers, Meet Lisa, Next Chapter Method, and Contact also uses Lisa's cutout, but that's governed by the hero standard, not the featured-image standard.)
