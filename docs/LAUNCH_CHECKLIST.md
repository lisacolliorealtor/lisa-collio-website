# Launch Checklist — lisacolliorealtor.com

Everything that must happen around DNS cutover, split into what Lisa does in a
dashboard and what can be done in the repo.

**Last updated 21 August 2026.**

---

## ⚠️ What changed since this file was first written (July 2026)

Read this before trusting any row below. Four things landed after the original
draft, and they invalidate assumptions the July version was built on:

1. **Analytics is no longer Netlify-only.** Google Analytics (Google tag) and the
   Meta pixel went live on 18 August 2026, behind a cookie consent banner
   (`assets/js/consent.js`). Netlify server-side Analytics is still wanted
   **alongside** them, not instead of them.
2. **The Privacy Policy was revised and re-approved** to disclose advertising
   cookies, retargeting and optional automated follow-up messaging
   (`docs/approved-copy/V1_4_Legal_Revisions_CRM_Analytics_Lisa_Collio.md`),
   effective 19 August 2026, with a change notice on the page itself.
3. **The CSP was widened** in `netlify.toml` for the two tags.
4. **The managing broker approved all of it**, verbally, in office, 19 August 2026.

The July file's Section C told a future session that adding Google Analytics
would contradict the policy, require loosening the CSP, and require new broker
sign-off. **All three of those things have since happened, deliberately.** That
warning is replaced below. If you are reading an older copy of this file
anywhere, it is stale — this repo path is the only current one.

---

## 🚩 Launch blockers

Neither of these is a "nice to have before launch." Both block.

| # | Blocker | Why it blocks |
|---|---|---|
| **BL1** | **Two of the four forms have no route in.** `#home-value` on `/sellers/` and `#valor-de-su-casa` on `/es/vendedores/` exist and work, but **zero links anywhere on the site point at either fragment** — measured across all 157 pages, both fragments, both languages. Nobody who does not type a URL fragment can reach the home-valuation forms. | Launching with a lead-capture form nobody can find is launching without it. Tracked as its own punch-list item; placement (nav / homepage / seller cluster) is Lisa's decision and gets its own PR. |
| **BL2** | **Broker sign-off on any advertising copy shipped since 19 August.** The 19 August pass covered the cookie banner, the Fair Housing ad-targeting practice and the Privacy change notice. Page copy merged after that date has not been through the Section 13 gate. | Advertising content cannot publish without it. |

---

## A. Lisa does these (dashboard / account actions — not code)

| # | Task | Where | Notes |
|---|---|---|---|
| A1 | DNS cutover to lisacolliorealtor.com | Domain registrar → Netlify | Netlify → Domains → add custom domain, follow DNS instructions. Everything marked "after cutover" below depends on this. |
| A2 | Enable Netlify Forms email notifications | Netlify → Forms → Settings | Notify `lisacolliorealtor@gmail.com`. **Form detection was enabled 18 August 2026 and all four forms are detected**; a live submission tested successfully with the correct thank-you page. |
| A3 | **Enable Netlify server-side Analytics** | Netlify → Analytics → Enable | Paid add-on. Log-based and cookieless. **Runs alongside Google Analytics, not instead of it** — it measures the traffic that consent declines never reach, which is the whole reason to keep both. |
| A4 | Verify the domain in Google Search Console | search.google.com/search-console | Then submit `https://lisacolliorealtor.com/sitemap.xml` and request indexing on the priority pages (home, buyers, sellers, about, both communities, market-stats, and the `/es/` equivalents). GSC is cookieless — no privacy impact. |
| A5 | **Update Google Business Profile** | business.google.com — sign in as **liskids1@gmail.com** | Add the website URL. Confirm NAP matches the site **character for character**: `Lisa Collio, Real Estate Agent` · `(574) 370-5410` · `1918 Elkhart Rd, Goshen, IN 46526`. Mismatched NAP is the most common local-SEO own-goal. The comma in the business name is not optional (876 IAC 8-1-8). |
| A6 | **Re-test all four forms end-to-end on the real domain** | https://lisacolliorealtor.com | `contact-en` (`/contact/`), `contacto-es` (`/es/contacto/`), `home-valuation` (`/sellers/#home-value`), `valor-vivienda-es` (`/es/vendedores/#valor-de-su-casa`). For each: consent box blocks submit when unchecked · submission arrives by email · the **correct-language** thank-you page loads. Passing on `lisacolliorealtor.netlify.app` does not carry over — the domain, the redirect and the notification address are all different. |
| A7 | **Verify both tags fire on the real domain, after cutover** | Browser devtools / GA Realtime / Meta Events Manager | Load a page, accept consent, confirm the Google tag reports in GA Realtime and the Meta pixel registers a PageView. Tag configuration is domain-scoped; a tag that fired on the netlify.app preview is not evidence about the live domain. |
| A8 | **Verify a DECLINE actually suppresses both tags** | Same tools, fresh browser profile | Decline in the banner, reload, confirm **neither** tag fires. This is the specific thing the broker approved — that the tags are consent-gated — so it is the specific thing to verify on the real domain, not the happy path. |
| A9 | **Re-test the consent banner on the real origin** | https://lisacolliorealtor.com | Consent is stored per-origin, so nothing tested on `netlify.app` carries over: accept, decline, and the footer's Cookie Preferences reopen link all need one pass each on the live domain. |
| A10 | Section 13 broker review of advertising copy shipped since 19 August | Managing broker | See **BL2**. |
| A11 | Bing Webmaster Tools (optional) | bing.com/webmasters | Import from GSC in one click. Feeds some AI answer engines. |

---

## B. Repo work (Claude Code)

| # | Task | Status |
|---|---|---|
| B1 | **Home-valuation entry points, both languages** — nav, homepage and/or seller cluster, pointing at `/sellers/#home-value` and `/es/vendedores/#valor-de-su-casa` | **BLOCKER (BL1)** — placement is Lisa's decision, own PR |
| B2 | **GoHighLevel integration, with consent-flag migration** | Post-launch, deliberately. GoHighLevel is **not** configured for outbound texting today and nothing is set up yet. When it is: the per-contact consent flags captured by the site's forms (marketing consent, automated-messaging consent) must migrate as **separate** fields, not collapsed into one — a contact who agreed to email and declined automated messaging must arrive that way. Consent captured under the V1_4 policy does not retroactively cover channels that policy did not disclose. |
| B3 | Post-launch: validate schema in Google Rich Results Test; fix anything flagged | After A1 |
| B4 | Post-launch: crawl for 404s and verify every hreflang pair resolves | After A1 |
| B5 | **Post-launch: run the full check suite against production**, not just locally — `npm run audit` (32 checks), `npm run hreflang -- --check`, `npm run llms -- --check`, `node build-reviews.js --check`, plus real HTTP status checks on every redirect | After A1 |
| B6 | **Remove the Privacy Policy change notice on or about 17 November 2026** (90 days) | Scheduled. Both languages together. The `.change-notice` CSS component stays for the next revision. |
| B7 | Quarterly MLS data refresh (Market Stats is the canonical source) | Recurring |
| B8 | Swap remaining community photos as they are gathered | Recurring |

---

## C. Standing rules

**Both analytics tools are approved, and they are not alternatives.** Netlify
server-side Analytics is log-based and cookieless; Google Analytics and the Meta
pixel are cookie-based and **consent-gated**. The Privacy Policy discloses the
latter two; the CSP in `netlify.toml` allows exactly the hosts they need and
nothing more.

**The rule that replaced the old prohibition:** the tags are permitted *because
the consent gate exists*. Never ship a tag that fires before consent, and never
widen the CSP without re-reading the Privacy Policy in the same change. Adding a
third-party script is a legal change before it is a technical one.

**Google Search Console is unrelated to Google Analytics** and is safe — DNS/HTML
verification, no cookies, required for indexing.

**`build.js` is the single source for header/footer/CTA and the Tier 2 hero.**
Never hand-edit the regions between `<!-- build:name -->` and
`<!-- endbuild:name -->`, and never edit rendered markup whose source is a marker
JSON — edit `components/` or the marker, then run `npm run build`. A fix applied
only to rendered markup is reverted by the next build, silently.

**Testing before cutover goes to `https://lisacolliorealtor.netlify.app`.** Until
DNS moves, `lisacolliorealtor.com` does not point at this codebase and returns
false 404s. After cutover, that reverses — anything in Section A marked "real
domain" must be redone there.
