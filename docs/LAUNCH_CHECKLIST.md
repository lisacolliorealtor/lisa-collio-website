# Launch Checklist — lisacolliorealtor.com

Everything that must happen around DNS cutover, split into what Lisa does in a
dashboard and what can be done in the repo. Last updated July 2026.

---

## A. Lisa does these (dashboard / account actions — not code)

| # | Task | Where | Notes |
|---|---|---|---|
| A1 | Merge the two patch branches to `main` | GitHub | Batch 1 (brand/compliance) then Batch 2a (forms/CTA/tagline). |
| A2 | DNS cutover to lisacolliorealtor.com | Domain registrar → Netlify | Netlify Domains → add custom domain, follow DNS instructions. |
| A3 | **Enable Netlify Forms notifications** | Netlify → Forms → Settings → Form notifications | Add email notification → `lisacolliorealtor@gmail.com`. Netlify auto-detects the four forms on first deploy of the committed HTML. |
| A4 | **Enable Netlify server-side Analytics** | Netlify → Analytics → Enable | Paid add-on. Log-based and cookieless — already covered by the approved Privacy Policy. **This is the approved analytics tool. See warning in Section C about Google Analytics.** |
| A5 | Set the Privacy Policy effective date | Repo (Lisa approves date, Claude Code edits) | `privacy/index.html` still reads `Effective date: [inserted at publication]`. Same placeholder check on `terms/`. |
| A6 | Verify the domain in Google Search Console | search.google.com/search-console | Then submit `https://lisacolliorealtor.com/sitemap.xml` and request indexing on the priority pages (home, buyers, sellers, about, both communities, market-stats, and the `/es/` equivalents). GSC is cookieless — no privacy policy impact. |
| A7 | Update Google Business Profile | business.google.com | Add the website URL. Confirm NAP matches the site **character for character**: `Lisa Collio, Real Estate Agent` · `(574) 370-5410` · `1918 Elkhart Rd, Goshen, IN 46526`. Mismatched NAP is the most common local-SEO own-goal. |
| A8 | End-to-end test both forms, both languages | Live site | Submit `/contact/`, `/es/contacto/`, `/sellers/#home-value`, `/es/vendedores/#valor-de-su-casa`. Confirm: consent box blocks submit when unchecked, email arrives, correct thank-you page loads. |
| A9 | Section 13 broker review of new advertising copy | Managing broker | The new CTA band, both form intros, and the valuation copy are client-facing advertising. Broker sign-off before or at launch. |
| A10 | Bing Webmaster Tools (optional) | bing.com/webmasters | Import from GSC in one click. Feeds some AI answer engines. |

---

## B. Can be done in the repo (Claude Code work)

| # | Task | Status |
|---|---|---|
| B1 | Reviews rotation — 62 reviews across all pages, 3-box layout | **Batch 2b — next up** |
| B2 | "What's my home worth?" entry points (nav + homepage + seller cluster) pointing to `/sellers/#home-value` | Pending |
| B3 | Set effective dates once Lisa supplies the publication date | Pending A5 |
| B4 | Post-launch: validate schema in Google Rich Results Test; fix anything flagged | After A2 |
| B5 | Post-launch: crawl for 404s and verify every hreflang pair resolves | After A2 |
| B6 | Quarterly MLS data refresh (Market Stats is the canonical source) | Recurring |
| B7 | Swap remaining community photos as they are gathered | Recurring |

---

## C. Warnings

**Google Analytics is NOT a drop-in.** The approved Privacy Policy states the
Site "does not set tracking or advertising cookies," and `netlify.toml` enforces
a Content-Security-Policy that blocks third-party scripts. Adding GA4 would
(1) contradict the broker-approved policy, (2) require loosening the CSP, and
(3) require new broker sign-off. **Netlify server-side Analytics (A4) is the
approved substitute** and needs no policy or CSP change. Google Search Console
(A6) is unrelated to GA and is safe — it uses a DNS/HTML verification, sets no
cookies, and is required for indexing.

**Do not publish before A9.** New advertising copy shipped in Batch 2a.

**`build.js` is the single source for header/footer/CTA.** Never hand-edit the
regions between `<!-- build:name -->` and `<!-- endbuild:name -->`. Edit the file
in `components/` and run `npm run build`.
