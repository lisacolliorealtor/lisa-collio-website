#!/usr/bin/env node
/*
 * audit.js — standing site audit, run with `npm run audit`.
 *
 * Codifies the checks in docs/approved-copy/V1_4_Audit_Checklist_Lisa_Collio.md
 * (Parts B and the automated-checks appendix) that a machine can settle, so
 * regressions are caught before review instead of during it. Every check here
 * exists because something actually slipped through: a school-count that said
 * "fourteen" on one page and "thirteen" on five others, blog-card blurbs left
 * pointing at retired copy, an English CTA band on 43 Spanish pages, FAQPage
 * schema on pages that rendered no FAQ.
 *
 * ERRORS fail the run (exit 1). WARNINGS report and pass — they flag drift that
 * needs a human judgement call rather than a fix.
 *
 * Judgement calls, compliance nuance, and anything needing Lisa's or the
 * broker's approval stay OUT of here on purpose. A green run means the
 * mechanical invariants hold, not that the copy is approved.
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const IGNORE = new Set([".git", "node_modules", "assets", "docs", "content", "scripts"]);

const errors = [];
const warnings = [];
const err = (check, msg) => errors.push({ check, msg });
const warn = (check, msg) => warnings.push({ check, msg });

function walk(dir, filter, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (IGNORE.has(e.name)) continue;
      walk(path.join(dir, e.name), filter, acc);
    } else if (filter(e.name)) acc.push(path.join(dir, e.name));
  }
  return acc;
}

// Full-tree walk (assets included) for resolving link targets.
function walkAll(dir, filter, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === "node_modules") continue;
      walkAll(path.join(dir, e.name), filter, acc);
    } else if (filter(e.name)) acc.push(path.join(dir, e.name));
  }
  return acc;
}

const htmlFiles = walk(ROOT, (n) => n.endsWith(".html"));
const pageFiles = htmlFiles.filter((f) => path.basename(f) === "index.html");
const read = (f) => fs.readFileSync(f, "utf8");
const rel = (f) => path.relative(ROOT, f);
const urlOf = (f) => {
  const d = path.dirname(rel(f));
  return d === "." ? "/" : `/${d}/`;
};
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
// Stripping an inline <a> leaves a space before punctuation ("livability , not"),
// so tidy that before comparing.
const fileFor2 = (url) =>
  path.join(ROOT, url === "/" ? "index.html" : path.join(url.replace(/^\/|\/$/g, ""), "index.html"));
const strip = (s) =>
  decode(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
// Schema answers carry no links, so they sometimes spell out a URL the visible
// copy renders as an anchor, or drop a trailing "read the full article" line.
// Treat one being a prefix of the other as a match.
const sameText = (a, b) => {
  const t = (x) => x.replace(/[.\s]+$/, "");
  const [x, y] = [t(a), t(b)];
  return x === y || x.startsWith(y) || y.startsWith(x);
};

/* 1. Sitemap parity ------------------------------------------------------- */
{
  const sm = new Set(
    [...read(path.join(ROOT, "sitemap.xml")).matchAll(/<loc>https:\/\/lisacolliorealtor\.com([^<]*)<\/loc>/g)]
      .map((m) => m[1])
  );
  // Thank-you pages are intentionally excluded (noindex conversion endpoints).
  const exempt = new Set(["/contact/thank-you/", "/es/contacto/gracias/"]);
  const pages = new Set(pageFiles.map(urlOf));
  for (const p of pages) if (!sm.has(p) && !exempt.has(p)) err("sitemap", `page not in sitemap: ${p}`);
  for (const u of sm) if (!pages.has(u)) err("sitemap", `sitemap lists a page that does not exist: ${u}`);
}

/* 2. Internal links and assets resolve ------------------------------------ */
{
  const pages = new Set(pageFiles.map(urlOf));
  const files = new Set(walkAll(ROOT, () => true).map((f) => "/" + rel(f)));
  const redirects = new Set(
    [...read(path.join(ROOT, "netlify.toml")).matchAll(/from\s*=\s*"([^"]+)"/g)].map((m) => m[1])
  );
  for (const f of htmlFiles) {
    for (const m of read(f).matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
      const u = m[1];
      if (u === "/" || pages.has(u) || files.has(u) || redirects.has(u)) continue;
      err("links", `${rel(f)} -> ${u} (no page, file, or redirect)`);
    }
  }
}

/* 3. FAQ: visible copy and FAQPage schema must match word for word --------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    // <nav class="faq-item"> is the related-articles block, not an FAQ entry.
    const visible = [...s.matchAll(/<div class="faq-item[^"]*">\s*<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs)]
      .map((m) => [strip(m[1]), strip(m[2])]);
    let schema = [];
    for (const m of s.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      let data;
      try { data = JSON.parse(m[1]); } catch { continue; }
      for (const node of data["@graph"] || [data]) {
        if (node["@type"] === "FAQPage") {
          schema = (node.mainEntity || []).map((q) => [
            strip(q.name || ""), strip(q.acceptedAnswer?.text || ""),
          ]);
        }
      }
    }
    if (!visible.length && !schema.length) continue;
    if (visible.length !== schema.length) {
      err("faq-sync", `${rel(f)}: ${visible.length} visible vs ${schema.length} in schema`);
      continue;
    }
    visible.forEach(([q, a], i) => {
      if (!sameText(q, schema[i][0])) err("faq-sync", `${rel(f)} Q${i + 1} text differs from schema`);
      else if (!sameText(a, schema[i][1])) err("faq-sync", `${rel(f)} A${i + 1} text differs from schema`);
    });
  }
}

/* 4. JSON-LD parses ------------------------------------------------------- */
{
  for (const f of htmlFiles) {
    for (const m of read(f).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try { JSON.parse(m[1]); } catch (e) { err("json-ld", `${rel(f)}: ${e.message}`); }
    }
  }
}

/* 5. Locked identity rules ------------------------------------------------ */
{
  const banned = [
    [/574[.\-\s]?975[.\-\s]?0141/, "superseded phone number"],
    [/\b100\+\s+(families|homes)/i, 'superseded "100+" track-record claim'],
    [/Northern Indiana/i, '"Northern Indiana" as a service-area descriptor'],
    [/Lisa Collio Real Estate\b(?!,)/, 'business name without the locked comma'],
    [/\bREMAX\b/, 'slash-free "REMAX" in prose'],
    [/Alford/i, '"Alford-Collio" name variant'],
    // Fair Housing: ambulatory-ability phrasing was stripped sitewide (c2b0d9f)
    // and came back once via FAQ copy, so guard the term itself. Idiomatic
    // "walking into a negotiation" is fine; "walkable"/"walkability" is not.
    [/walkab/i, 'ambulatory phrasing ("walkable"/"walkability") — Fair Housing'],
  ];
  // Method brands must always carry the mark.
  const marks = ["Next Chapter Method", "Smart Move Framework", "Tu Próximo Capítulo", "Unlocking Smart Moves"];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const [re, label] of banned) if (re.test(s)) err("locked-identity", `${rel(f)}: ${label}`);
    for (const brand of marks) {
      const re = new RegExp(`${brand}(?!™)`, "g");
      if (re.test(s)) err("locked-identity", `${rel(f)}: "${brand}" without ™`);
    }
  }
}

/* 6. Footer signature on every page --------------------------------------- */
{
  for (const f of pageFiles) {
    if (!/RB21002460/.test(read(f))) err("footer", `${rel(f)}: missing the locked footer signature`);
  }
}

/* 7. One language per page: no English CTA band on a Spanish page ---------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    if (!/<html lang="es"/.test(s)) continue;
    if (/build:talk-to-lisa\s*-->/.test(s))
      err("bilingual", `${rel(f)}: injects the English CTA band (needs talk-to-lisa-es)`);
  }
}

/* 8. Blog index counts match reality -------------------------------------- */
{
  const idx = path.join(ROOT, "blog", "index.html");
  if (fs.existsSync(idx)) {
    const s = read(idx);
    const dirs = {
      Buyers: "buyers", Sellers: "sellers", Community: "community",
      Relocation: "relocation", "Market Updates": "market-updates", "En Español": "spanish",
    };
    for (const [label, dir] of Object.entries(dirs)) {
      const base = path.join(ROOT, "blog", dir);
      if (!fs.existsSync(base)) continue;
      const actual = fs.readdirSync(base, { withFileTypes: true })
        .filter((e) => e.isDirectory() && fs.existsSync(path.join(base, e.name, "index.html"))).length;
      const m = s.match(new RegExp(`${label}[^]{0,400}?(\\d+)\\s+articles?`));
      if (m && Number(m[1]) !== actual)
        err("blog-counts", `blog/index.html says ${label} = ${m[1]}, actual ${actual}`);
    }
  }
}

/* 8b. Every article is actually LINKED from its hub ------------------------
 * The count above was right while seven English Elkhart articles were missing
 * from the "All articles" list entirely — a correct number over an incomplete
 * list. Counting is not the same as listing, so check the links themselves.  */
{
  const hubs = [
    { hub: path.join(ROOT, "blog", "index.html"),
      dirs: ["buyers", "sellers", "community", "relocation", "market-updates"] },
    { hub: path.join(ROOT, "blog", "spanish", "index.html"), dirs: ["spanish"] },
  ];
  for (const { hub, dirs } of hubs) {
    if (!fs.existsSync(hub)) continue;
    const s = read(hub);
    for (const dir of dirs) {
      const base = path.join(ROOT, "blog", dir);
      if (!fs.existsSync(base)) continue;
      for (const e of fs.readdirSync(base, { withFileTypes: true })) {
        if (!e.isDirectory() || !fs.existsSync(path.join(base, e.name, "index.html"))) continue;
        if (!s.includes(`/blog/${dir}/${e.name}/`))
          err("blog-hub", `${rel(hub)} does not link /blog/${dir}/${e.name}/`);
      }
    }
  }
}

/* 9. Images carry alt text ------------------------------------------------ */
{
  for (const f of htmlFiles) {
    for (const tag of read(f).match(/<img\b[^>]*>/g) || []) {
      if (!/\balt=/.test(tag)) err("a11y", `${rel(f)}: <img> without alt`);
    }
  }
}

/* 10. hreflang pairing (hard) -------------------------------------------- */
{
  // Pages with no twin in the other language. Each is here because the twin does
  // not exist, not because the tag was forgotten — see
  // docs/EN_ES_DIVERGENCE_INVENTORY.md for the ones that are meant to gain one.
  const exempt = new Set([
    "/404/",
    // Section indexes with no per-language counterpart
    "/blog/buyers/", "/blog/sellers/", "/blog/community/",
    "/blog/relocation/", "/blog/market-updates/",
    // English-only at launch (documented exception)
    "/blog/market-updates/elkhart-county-mid-year-market-update-2026/",
    // NOTE: the seven English Elkhart articles were exempt here while they had
    // no Spanish twin. Wave 2 (July 2026) built all seven, so the exemptions
    // were removed and those pages are now checked for real. An exemption that
    // outlives its reason silently stops auditing the thing it named.
    // English buyer/seller articles with no Spanish counterpart written
    "/blog/buyers/are-homes-goshen-indiana-competitive-to-buy/",
    "/blog/buyers/elkhart-indiana-good-place-invest-real-estate/",
    "/blog/buyers/how-to-compete-with-other-buyers-elkhart-indiana/",
    "/blog/buyers/is-goshen-indiana-good-place-to-buy-home/",
    "/blog/buyers/what-to-look-for-buying-home-elkhart-indiana/",
    "/blog/buyers/what-to-prioritize-buying-house-goshen-indiana/",
    "/blog/buyers/why-buy-home-elkhart-indiana-lisa-collio/",
    "/blog/buyers/why-buy-home-goshen-indiana-lisa-collio/",
    // Spanish-only buyer cluster (cluster-1-compradores), no English twin
    "/blog/spanish/como-comprar-una-casa-en-indiana/",
    "/blog/spanish/costos-de-cierre-que-son/",
    "/blog/spanish/cuanto-dinero-necesito-para-comprar-una-casa/",
    "/blog/spanish/errores-comunes-al-comprar-casa/",
    "/blog/spanish/no-se-si-califico-credito-y-preaprobacion/",
    "/blog/spanish/prestamos-fha-y-usda-en-espanol/",
    "/blog/spanish/renta-o-compra-como-decidir/",
  ]);
  const pairs = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "hreflang-pairs.json"), "utf8"));
  const paired = new Set(pairs.flatMap((p) => [p.en, p.es]));
  for (const f of pageFiles) {
    const u = urlOf(f);
    const s = read(f);
    const has = /rel="alternate" hreflang="es"/.test(s) && /rel="alternate" hreflang="en"/.test(s);
    if (paired.has(u)) {
      if (!has) err("hreflang", `${u} is in the pair map but carries no alternate tags (run npm run hreflang)`);
    } else if (!exempt.has(u)) {
      err("hreflang", `${u} is neither paired nor listed as exempt — add a pair or document why it has no twin`);
    }
  }
  // Both halves of a pair must agree, or Google ignores the annotation.
  for (const { en, es } of pairs) {
    for (const url of [en, es]) {
      const f = fileFor2(url);
      if (!fs.existsSync(f)) continue;
      const s = read(f);
      const e = s.match(/hreflang="en" href="https:\/\/lisacolliorealtor\.com([^"]+)"/);
      const p = s.match(/hreflang="es" href="https:\/\/lisacolliorealtor\.com([^"]+)"/);
      if (!e || !p) continue;
      if (e[1] !== en || p[1] !== es)
        err("hreflang", `${url} points at ${e[1]} / ${p[1]}, expected ${en} / ${es} (not reciprocal)`);
    }
  }
}

/* 11. SEO field lengths (warn) -------------------------------------------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    // Measure what a search engine RENDERS, not the raw markup. "&amp;" is one
    // character on screen and five in the source, so counting the raw string
    // overstated six titles by four characters each and flagged them as
    // over-length when they were not. Same decode() the identity checks use.
    const t = s.match(/<title>(.*?)<\/title>/s);
    const d = s.match(/name="description" content="(.*?)"/s);
    const tLen = t ? decode(t[1]).length : 0;
    const dLen = d ? decode(d[1]).length : 0;
    if (t && tLen > 60) warn("seo", `${urlOf(f)} title ${tLen} chars (target <=60)`);
    if (d && (dLen < 145 || dLen > 160))
      warn("seo", `${urlOf(f)} meta description ${dLen} chars (target 145-160)`);
  }
}

/* 12. llms.txt coverage (hard) --------------------------------------------
 * llms.txt is generated by `npm run llms` and covers every published page in
 * both languages. It was a hand-written 18-page entry-point file until July
 * 2026; hand-maintained indexes go stale the moment a batch ships, so this is
 * now a hard check rather than a warning. If it fails, run `npm run llms`.  */
{
  const p = path.join(ROOT, "llms.txt");
  if (fs.existsSync(p)) {
    const listed = new Set(
      [...read(p).matchAll(/https:\/\/lisacolliorealtor\.com(\/[^\s)\]]*)/g)].map((m) => m[1])
    );
    const missing = pageFiles.map(urlOf).filter((u) => !listed.has(u));
    for (const u of missing.slice(0, 10)) err("llms", `${u} absent from llms.txt — run \`npm run llms\``);
    if (missing.length > 10)
      err("llms", `...and ${missing.length - 10} more absent from llms.txt — run \`npm run llms\``);
  }
}

/* 13. Retail/dining business names -----------------------------------------
 * The compliance checklist bars specific business, restaurant, and shop names
 * on evergreen pillar pages, allowing them ONLY on dated blog articles that
 * carry the verify-current-details disclaimer.
 *
 * That exemption sat unenforced for months: the disclaimer did not exist, and
 * a pillar page named ten businesses in one paragraph without anything
 * catching it. Both halves are mechanical, so both are checked here.
 *
 * Names live in content/source/retail-business-names.txt so the list can be
 * edited without touching this file. A few real businesses are deliberately
 * absent because their names are ordinary words — see the header of that file.
 * The check therefore reduces the human-review surface; it does not remove it.
 */
{
  const listPath = path.join(ROOT, "content", "source", "retail-business-names.txt");
  if (!fs.existsSync(listPath)) {
    err("business-names", "content/source/retail-business-names.txt is missing — check 13 cannot run");
  } else {
    const names = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (const f of pageFiles) {
      const s = read(f);
      const text = strip(s);
      const hits = names.filter((n) => new RegExp(`(^|[^\\w])${esc(n)}([^\\w]|$)`).test(text));
      if (!hits.length) continue;
      const url = urlOf(f);
      const isBlogArticle = url.startsWith("/blog/") && url !== "/blog/";
      if (!isBlogArticle) {
        err("business-names",
          `${url} is an evergreen page naming: ${hits.join(", ")} — these belong only on dated blog articles`);
      } else if (!/build:verify-details(-es)?[\s{]/.test(s)) {
        err("business-names",
          `${url} names ${hits.join(", ")} without the verify-current-details disclaimer — add the build:verify-details marker`);
      }
    }
  }
}

/* 14. EN/ES image parity ---------------------------------------------------
 * Spanish twins share the English page's image FILES (Master Plan §7) — only
 * the alt text differs. So a difference in image count between a pair is
 * always a gap, never a design choice.
 *
 * This has now surfaced three times, each caught only because someone looked
 * at the page: the Spanish community pages shipped with no section images at
 * all, and then with body images but no FAQ images. Counting by one class and
 * calling it "images" is exactly how the second one hid — so this counts every
 * content <img>, and reports the per-class split when it fails.
 *
 * Chrome (header, footer, logos, review photos) is identical on both sides of
 * a pair, so a raw <img> count is comparable without excluding it.
 */
{
  const pairPath = path.join(ROOT, "content", "hreflang-pairs.json");
  const basePath = path.join(ROOT, "content", "image-parity-baseline.json");
  if (fs.existsSync(pairPath)) {
    const pairs = JSON.parse(read(pairPath));
    // Known pre-existing gaps, recorded with their exact counts when the check
    // was introduced. They are a worklist, not an exemption: a baselined pair
    // errors if its gap CHANGES in either direction — worse means a regression,
    // better means the entry is stale and should be deleted. The baseline can
    // only shrink.
    const baseline = new Map(
      (fs.existsSync(basePath) ? JSON.parse(read(basePath)) : []).map((r) => [r.en, r])
    );
    const countImgs = (s) => (s.match(/<img\b/g) || []).length;
    const countClass = (s, c) => (s.match(new RegExp(c, "g")) || []).length;
    for (const { en, es } of pairs) {
      const fe = fileFor2(en), fs_ = fileFor2(es);
      if (!fe || !fs_ || !fs.existsSync(fe) || !fs.existsSync(fs_)) continue;
      const a = read(fe), b = read(fs_);
      const na = countImgs(a), nb = countImgs(b);
      const known = baseline.get(en);
      if (na === nb) {
        if (known)
          err("image-parity",
            `${en} / ${es} now match at ${na} images — the gap is resolved. ` +
            `Delete this pair from content/image-parity-baseline.json.`);
        continue;
      }
      const split = (s) =>
        `section-figure ${countClass(s, "section-figure")}, ` +
        `faq-item--media ${countClass(s, "faq-item--media")}`;
      if (known && known.enImages === na && known.esImages === nb) continue; // unchanged known gap
      err("image-parity",
        `${en} has ${na} images, ${es} has ${nb} — twins share image files, so this is a gap. ` +
        `EN: ${split(a)}. ES: ${split(b)}.` +
        (known ? ` (baselined at ${known.enImages}/${known.esImages} — this changed.)` : ""));
    }
  }
}

/* 15. Rejected image assets ------------------------------------------------
 * Four files in the July 2026 Goshen batch are composite graphics with
 * circular photo insets, not Lisa's original photography (her ruling,
 * 29 July 2026). They must not appear on any page until she supplies real
 * replacements.
 *
 * The point of this check is the FALSE NEGATIVE it prevents. The slots those
 * files were meant to fill are legitimately empty, so they read as oversights
 * — one was already written up as a manifest gap worth closing. Without a
 * mechanical guard, some future session helpfully "fixes" it and puts a
 * rejected asset on a live page.
 *
 * List: content/source/rejected-assets.txt.
 */
{
  const listPath = path.join(ROOT, "content", "source", "rejected-assets.txt");
  if (!fs.existsSync(listPath)) {
    err("rejected-assets", "content/source/rejected-assets.txt is missing — check 15 cannot run");
  } else {
    // Line format: "slug" or "slug | short reason". The reason is optional and
    // exists because this list now carries TWO rulings with different grounds —
    // the Goshen four are not Lisa's photography, the Elkhart two are hers and
    // were rejected for signage legible in the delivered crop. A single
    // hardcoded message asserted the first reason about every slug, which would
    // have told a future reader that one of Lisa's own photographs was not hers.
    const slugs = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [slug, ...rest] = l.split("|");
        return { slug: slug.trim(), reason: rest.join("|").trim() };
      })
      .filter((r) => r.slug);
    for (const f of htmlFiles) {
      const s = read(f);
      for (const { slug, reason } of slugs) {
        // any variant: slug.jpg, slug.webp, slug-thumb.jpg, slug-header.webp …
        if (new RegExp(`${slug}(-thumb|-header)?\\.(jpg|jpeg|png|webp)`).test(s))
          err("rejected-assets",
            `${rel(f)} references ${slug} — a rejected asset` +
            (reason ? ` (${reason})` : "") + `. ` +
            `This slot stays empty on purpose until Lisa supplies a replacement; ` +
            `see content/source/rejected-assets.txt for the ruling and its grounds.`);
      }
    }
  }
}

/* 16. FAQ image must match its own question -------------------------------
 * An FAQ block with an image has two links: the decorative image wrapper and
 * the "Read the full article" link in the body. They must point at the same
 * article — otherwise the image illustrates a different question than the one
 * it sits beside, and its alt text describes the wrong thing to a screen
 * reader.
 *
 * This exists because it happened: a block-spanning regex attached two Spanish
 * FAQ images to the wrong questions, and it was caught only by listing every
 * alt string by hand for review. Nothing else would have flagged it — counts
 * matched, both languages had five images, every file existed.
 */
{
  for (const f of pageFiles) {
    const s = read(f);
    const blocks = s.match(/<div class="faq-item faq-item--media[\s\S]*?\n      <\/div>/g) || [];
    for (const blk of blocks) {
      const media = blk.match(/faq-item__media" href="([^"]+)"/);
      const body = blk.match(/faq-more"><a href="([^"]+)"/);
      if (!media || !body) continue;
      if (media[1] !== body[1]) {
        const q = (blk.match(/<h3>([\s\S]*?)<\/h3>/) || [, "?"])[1].trim();
        err("faq-pairing",
          `${urlOf(f)}: FAQ image links to ${media[1]} but the question "${q}" links to ${body[1]} — ` +
          `the image belongs to a different question`);
      }
    }
  }
}

/* 17. Fair Housing terms in alt text --------------------------------------
 * Alt attributes are copy, but they sit inside a tag — so prose greps and
 * human read-throughs both skip them, and every previous Fair Housing sweep
 * on this site missed them. "a quiet Goshen street" and "una calle tranquila
 * de Goshen" both reached production that way.
 *
 * Terms: content/source/fair-housing-terms.txt, English and Spanish. Scoped to
 * alt text rather than whole pages on purpose — several terms are legitimate
 * elsewhere ("tranquilidad" about peace of mind is fine, "una calle tranquila"
 * is not), and a noisy check gets switched off. Check 5 still guards
 * "walkab" sitewide.
 */
{
  const listPath = path.join(ROOT, "content", "source", "fair-housing-terms.txt");
  if (!fs.existsSync(listPath)) {
    err("fair-housing-alt", "content/source/fair-housing-terms.txt is missing — check 17 cannot run");
  } else {
    const terms = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [cat, term] = l.split("|").map((x) => x.trim());
        return { cat, term };
      });
    for (const f of htmlFiles) {
      const s = read(f);
      for (const m of s.matchAll(/\balt="([^"]*)"/g)) {
        const alt = decode(m[1]);
        if (!alt.trim()) continue;
        for (const { cat, term } of terms) {
          const re = new RegExp(`(^|[^\\p{L}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\p{L}]|$)`, "iu");
          if (re.test(alt))
            err("fair-housing-alt",
              `${rel(f)}: alt text contains "${term}" (${cat}) — "${alt.slice(0, 80)}"`);
        }
      }
    }
  }
}

/* Shared identity ruleset — used by checks 18 and 19. Hoisted out of check 18
 * so the <title> check (19) can apply the exact same rules instead of drifting
 * into its own near-duplicate list. */
// "Elkhart County" is barred as a service-area descriptor but is correct
// inside proper names, or the one dated market-update page that reports
// county-level MLS stats. Allow those explicitly rather than dropping the rule.
const IDENTITY_COUNTY_OK = [
  "Elkhart County 4-H Fair",
  "Elkhart County Board of REALTORS®",
  "Elkhart County Mid-Year Market Update",
];
const IDENTITY_RULES = [
  [/\bREALTORS?\b(?!®)/i, "REALTOR® without the ® mark"],
  [/\b(Realtor|REALTOR)\s+Lisa Collio\b/,
   'leads with the designation — use "Lisa Collio, Real Estate Agent"'],
  [/Lisa Collio,\s*Realtor\b/i,
   'wrong title form — use "Lisa Collio, Real Estate Agent"'],
  [/\bREMAX\b/, 'slash-free "REMAX"'],
  [/RE\/MAX(?!\s*(?:Results,\s*The Viruez Team|®))/,
   'brokerage not written in full ("RE/MAX Results, The Viruez Team")'],
  [/Northern Indiana/i, '"Northern Indiana" as a service-area descriptor'],
  [/Elkhart County/i, '"Elkhart County" as a service-area descriptor'],
  [/Lisa Collio Real Estate\b(?!,)/, "business name without the locked comma"],
  [/574[.\-\s]?975[.\-\s]?0141/, "superseded phone number"],
];
// The domain contains "realtor"; so does Lisa's email. Neither is the term.
function checkIdentityText(raw, f, field, checkName) {
  let v = decode(raw)
    .replace(/lisacolliorealtor\.com/gi, " ")
    .replace(/lisacolliorealtor@[\w.]+/gi, " ");
  for (const ok of IDENTITY_COUNTY_OK) v = v.split(ok).join(" ");
  for (const [rule, label] of IDENTITY_RULES)
    if (rule.test(v))
      err(checkName, `${rel(f)} [${field}]: ${label} — "${decode(raw).slice(0, 90)}"`);
}

/* 18. Locked identity rules in description fields --------------------------
 * Meta and schema descriptions are advertising copy: they render in search
 * results and, because this site sets no og:description or twitter:description
 * anywhere, they are also what Facebook and LinkedIn display when a page is
 * shared. Four buyer articles ran "Realtor Lisa Collio" in that slot — REALTOR®
 * without the mark, and leading with the designation instead of "Lisa Collio,
 * Real Estate Agent" — until July 2026.
 *
 * SCOPED TO DESCRIPTION FIELDS ON PURPOSE, not sitewide. Measured before
 * building: the same REALTOR-® rule applied to whole pages produces 238 hits
 * across 93 pages, and essentially none are real —
 *   222 are lowercase "realtor" inside VERBATIM client reviews, which must
 *       never be edited (reviews ship as written, typos and all); and
 *    16 are "REALTOR®" in JSON-LD, where the mark is correctly escaped.
 * Scoped to descriptions the same rule found exactly the four real ones, with
 * no noise. A check that cries wolf gets switched off — same reasoning that
 * scoped check 17 to alt text.
 *
 * Check 5 already scans whole files for its own banned list; these rules are
 * additions to the ruleset, not a second pass over the same ground.
 */
{
  const FIELDS = [
    [/<meta name="description" content="([^"]*)"/g, "meta description"],
    [/<meta property="og:description" content="([^"]*)"/g, "og:description"],
    [/<meta name="twitter:description" content="([^"]*)"/g, "twitter:description"],
    [/"description":\s*"((?:[^"\\]|\\.)*)"/g, "schema description"],
  ];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const [re, field] of FIELDS)
      for (const m of s.matchAll(re)) checkIdentityText(m[1], f, field, "identity-descriptions");
  }
}

/* 19. Locked identity rules in the <title> tag ------------------------------
 * <title> is a sibling of the description fields check 18 guards — same
 * search-result / social-share exposure — but check 18 never looked at it.
 * Result: three pages still carried "Realtor" unmarked or "Lisa Collio,
 * Realtor" in <title> after the July 2026 description-field fix, because the
 * fix touched only the field it was scoped to. Found during the July 2026
 * copy-field-gap sweep (see docs/AUDIT_CHECKLIST.md).
 *
 * og:title / twitter:title do not exist anywhere on this site (verified: 0
 * instances) — nothing to scope a check to there.
 */
{
  for (const f of htmlFiles) {
    const s = read(f);
    const m = s.match(/<title>(.*?)<\/title>/s);
    if (m) checkIdentityText(m[1], f, "title", "identity-title");
  }
}

/* 20. headline field must match the on-page <h1> ---------------------------
 * BlogPosting/Article `headline` is what search results and any script that
 * reads JSON-LD (not just Google) treat as the page's title — but nothing
 * compared it to the actual page. Found during the July 2026 copy-field-gap
 * sweep: currently in sync everywhere (124 headline fields checked, 0 real
 * mismatches), so this is a regression guard, not a fix for existing drift.
 */
{
  for (const f of pageFiles) {
    const s = read(f);
    const h1 = s.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (!h1) continue;
    const h1Text = strip(h1[1]);
    for (const m of s.matchAll(/"headline":\s*"((?:[^"\\]|\\.)*)"/g)) {
      let headline;
      try { headline = JSON.parse(`"${m[1]}"`); } catch { continue; }
      headline = strip(headline);
      if (headline !== h1Text)
        err("headline-sync",
          `${rel(f)}: headline "${headline}" does not match <h1> "${h1Text}"`);
    }
  }
}

/* 21. Sold-listing address consent manifest --------------------------------
 * 876 IAC 8-1-8(f) bars presenting a photo as a specific advertised/sold
 * listing without written seller consent on file. Two page patterns make that
 * claim — a figcaption reading "<address> — Sold by Lisa Collio" / "Vendida
 * por Lisa Collio", and a sold-quote-card's "Sold: <address>" span — and until
 * now nothing enforced that every address named that way has consent recorded
 * anywhere in the repo; docs/AUDIT_CHECKLIST.md carries the rule as a manual
 * read-through item only. Found during the July 2026 copy-field-gap sweep.
 *
 * The manifest does not itself certify consent — it forces a deliberate edit
 * (and, going forward, a deliberate confirmation) before a new address can
 * ship in "sold" framing. See content/source/sold-listing-consent.txt.
 */
{
  const listPath = path.join(ROOT, "content", "source", "sold-listing-consent.txt");
  if (!fs.existsSync(listPath)) {
    err("sold-listing-consent", "content/source/sold-listing-consent.txt is missing — check 21 cannot run");
  } else {
    const allowed = new Set(
      read(listPath).split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
    );
    const PATTERNS = [
      /<figcaption>([^—<]+?)\s*—\s*(?:Sold by Lisa Collio|Vendida por Lisa Collio)<\/figcaption>/g,
      /sold-(?:quote-)?card__addr">\s*(?:Sold|Vendida):\s*([^<]+?)\s*<\/span>/g,
    ];
    for (const f of htmlFiles) {
      const s = read(f);
      for (const re of PATTERNS) {
        for (const m of s.matchAll(re)) {
          const addr = decode(m[1]).trim();
          if (!allowed.has(addr))
            err("sold-listing-consent",
              `${rel(f)}: "${addr}" claimed as sold by Lisa Collio but not in ` +
              `content/source/sold-listing-consent.txt — confirm written seller consent is on file, then add it`);
        }
      }
    }
  }
}

/* 22. Section-image batch reconciliation ------------------------------------
 * SOURCE FILES - REJECTED must equal SECTION_JOBS entries must equal names
 * built in assets/images/sections/. Differenced set against set, per source
 * folder — never a running total.
 *
 * This exists because a running total hid a real gap. The Elkhart batch was
 * reported as "27 uploaded, 25 processed, 1 rejected" across several rounds and
 * merged that way (PR #104). 27 - 1 is 26, not 25: elkhart-moving-cta-closing
 * was never added to SECTION_JOBS and never processed, so the closing-CTA slot
 * on /moving-to-elkhart/ and its Spanish twin would have rendered with no image
 * and read as another deliberate gap. Nobody subtracted; every report repeated
 * the same two numbers without differencing them.
 *
 * A missing image is invisible by construction — there is no broken link and no
 * failing build, just an absent picture that looks like a decision. That is the
 * same false negative check 15 exists for, from the opposite direction.
 */
{
  const srcRoots = ["goshen", "elkhart"];
  const jobsPath = path.join(ROOT, "scripts", "generate-featured-images.py");
  const sectionsDir = path.join(ROOT, "assets", "images", "sections");
  const rejPath = path.join(ROOT, "content", "source", "rejected-assets.txt");
  if (!fs.existsSync(jobsPath) || !fs.existsSync(sectionsDir)) {
    err("section-reconcile", "generate-featured-images.py or assets/images/sections/ is missing — check 22 cannot run");
  } else {
    const py = read(jobsPath);
    const block = py.slice(py.indexOf("SECTION_JOBS = {"));
    const jobs = new Set(
      [...block.slice(0, block.indexOf("\ndef ")).matchAll(/^\s{4}"([a-z0-9-]+)":/gm)].map((m) => m[1])
    );
    const rejected = new Set(
      (fs.existsSync(rejPath) ? read(rejPath) : "")
        .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
        .map((l) => l.split("|")[0].trim())
    );
    const built = new Set(
      fs.readdirSync(sectionsDir).map((f) => f.replace(/(-thumb)?\.(jpg|webp)$/, ""))
    );
    for (const root of srcRoots) {
      const dir = path.join(ROOT, "assets", "images", root);
      if (!fs.existsSync(dir)) continue;
      const sources = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).map((f) => f.replace(/\.jpe?g$/i, ""));
      const expected = sources.filter((n) => !rejected.has(n));
      const noJob = expected.filter((n) => !jobs.has(n));
      const noFile = expected.filter((n) => !built.has(n));
      const orphanJob = [...jobs].filter((n) => n.startsWith(root + "-") && !sources.includes(n));
      if (noJob.length)
        err("section-reconcile",
          `assets/images/${root}/: ${sources.length} source file(s), ${rejected.size ? sources.length - expected.length : 0} rejected, ` +
          `so ${expected.length} must be processed — but ${noJob.length} have no SECTION_JOBS entry: ${noJob.join(", ")}`);
      if (noFile.length)
        err("section-reconcile",
          `assets/images/${root}/: ${noFile.length} cleared source(s) have no built file in assets/images/sections/: ${noFile.join(", ")}`);
      if (orphanJob.length)
        err("section-reconcile",
          `SECTION_JOBS references ${orphanJob.length} ${root} name(s) with no source photo: ${orphanJob.join(", ")}`);
    }
  }
}

/* ------------------------------------------------------------------------- */
const group = (list) => {
  const by = {};
  for (const { check, msg } of list) (by[check] ||= []).push(msg);
  return by;
};

console.log(`Audited ${pageFiles.length} pages / ${htmlFiles.length} HTML files.\n`);

const w = group(warnings);
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}) — drift needing a judgement call, not failing the run:`);
  for (const [c, msgs] of Object.entries(w)) {
    console.log(`  [${c}] ${msgs.length}`);
    for (const m of msgs.slice(0, 5)) console.log(`      ${m}`);
    if (msgs.length > 5) console.log(`      ... and ${msgs.length - 5} more`);
  }
  console.log("");
}

const e = group(errors);
if (errors.length) {
  console.error(`ERRORS (${errors.length}):`);
  for (const [c, msgs] of Object.entries(e)) {
    console.error(`  [${c}] ${msgs.length}`);
    for (const m of msgs.slice(0, 12)) console.error(`      ${m}`);
    if (msgs.length > 12) console.error(`      ... and ${msgs.length - 12} more`);
  }
  process.exit(1);
}

console.log("All hard checks passed.");
