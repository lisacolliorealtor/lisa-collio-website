#!/usr/bin/env node
/*
 * build-reviews.js — renders the per-page client-review block.
 *
 * Layout on every content page (Lisa, July 2026):
 *   Box 1 — one verbatim review WITH that client's own matched photo
 *   Box 2 — one verbatim review WITHOUT a photo (text-only card)
 *   Box 3 — one standalone client photo from assets/images/client-general/
 *            (celebration photo, no quote attached)
 *
 * Rotation (Batch 2b, July 2026): least-recently-used assignment over the full
 * eligible pool, constrained by a real site ADJACENCY GRAPH so no reviewer
 * repeats on the same page or on any adjacent page. Adjacency is the union of:
 *   - in-content links (hrefs inside <main>, so header/footer chrome does not
 *     make every page adjacent to every other) — this is what makes a hub page
 *     and the FAQ articles it links adjacent to one another;
 *   - the primary-navigation clique (every href in components/header*.html);
 *   - hierarchy: a page and its immediate parent directory page;
 *   - hreflang alternates, so an EN page and its ES twin never carry the same
 *     person's words (once as the original, once as a translation).
 * De-duplication is by PERSON, never by row id — the same human appears on more
 * than one platform (Naun Cerrato / Naun Lucoer Cerrato, leani lopez / Leani
 * Lopez). Married couples and immediate family carry a `household` key and are
 * never placed on the same page.
 *
 * Language rules (locked):
 *   - EN pages quote English originals verbatim, and may additionally use
 *     English translations of Spanish reviews, ALWAYS labelled
 *     "Translated from Spanish".
 *   - ES pages quote Spanish originals verbatim, and may additionally use
 *     Spanish translations of English reviews, ALWAYS labelled
 *     "Traducido del inglés".
 *   - A translation is never passed off as an original. A null translation
 *     means that review may not appear on the other language's pages at all.
 *   - A client photo appears only beside that same client's own review.
 *
 * Attribution (Lisa, 24 July 2026): reviewer names render exactly as they
 * appear on the source platform — no truncation, no case normalization.
 *
 * Excluded pages: legal pages (privacy/terms/accessibility/fair-housing and
 * their Spanish counterparts), disclaimers/sources, thank-you/gracias, 404.
 *
 * Idempotent: only rewrites the region between the markers.
 *   <!-- reviews:start --> ... <!-- reviews:end -->
 *
 * Usage: node build-reviews.js   |   node build-reviews.js --check
 */

const fs = require("fs");
const path = require("path");
const { hashFile } = require("./hash-util");

const ROOT = __dirname;
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "content/reviews.json"), "utf8"));
const GENERAL_DIR = path.join(ROOT, "assets/images/client-general");
const REVIEW_PHOTO_DIR = path.join(ROOT, "assets/images/client-reviews");
const COMPONENTS_DIR = path.join(ROOT, "components");

const EXCLUDE_RE = /(^|\/)(privacy|terms|accessibility|fair-housing|disclaimers|sources|404)\/|(^|\/)es\/(privacidad|terminos|accesibilidad|vivienda-justa)\/|thank-you\/|gracias\//;

// Photo files with no permission on file. They must never exist in the repo.
const FORBIDDEN_PHOTOS = [/^review-jordi/i, /^review-yaquelin-lozano-[12]$/i];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- Asset guards -----------------------------------------------------------
const reviewPhotos = new Set(
  fs.readdirSync(REVIEW_PHOTO_DIR).filter((f) => f.endsWith(".webp")).map((f) => f.replace(/\.webp$/, ""))
);
for (const f of reviewPhotos) {
  if (FORBIDDEN_PHOTOS.some((re) => re.test(f))) {
    throw new Error(`Hard-excluded photo present in assets/images/client-reviews: ${f} — delete it (no permission on file).`);
  }
}
for (const r of [...DATA.reviews, ...DATA.photoOnly]) {
  if (r.photo && !reviewPhotos.has(r.photo)) {
    throw new Error(`reviews.json references a missing photo: ${r.photo} (reviewer: ${r.name})`);
  }
}

const generalPhotos = fs
  .readdirSync(GENERAL_DIR)
  .filter((f) => f.endsWith(".webp"))
  .map((f) => f.replace(/\.webp$/, ""))
  .sort();

// ---- Build language-scoped pools -------------------------------------------
// A review enters a pool either as its ORIGINAL (verbatim, no label) or as a
// LABELLED translation. Reviews whose translation field is null never cross.
function poolsFor(lang) {
  const withPhoto = [];
  const textOnly = [];
  for (const r of DATA.reviews) {
    let entry = null;
    if (r.lang === lang) {
      entry = { ...r, translated: false };
    } else {
      const t = lang === "es" ? r.es_translation : r.en_translation;
      if (t) entry = { ...r, text: t, translated: true };
    }
    if (!entry) continue;
    if (entry.photo) withPhoto.push(entry);
    textOnly.push(entry);
  }
  // photo-only star cards (no quote) widen the photo slot; they carry no text,
  // so they are language-neutral.
  for (const p of DATA.photoOnly) withPhoto.push({ ...p, text: null, translated: false });
  return { withPhoto, textOnly };
}

const POOLS = { en: poolsFor("en"), es: poolsFor("es") };

// ---- Rendering --------------------------------------------------------------
function stars(lang) {
  const label = lang === "es" ? "5 de 5 estrellas" : "5 out of 5 stars";
  return `<span class="review-stars" aria-label="${label}">★★★★★</span>`;
}

function transLabel(r, lang) {
  if (!r.translated) return "";
  const t = lang === "es" ? "Traducido del inglés" : "Translated from Spanish";
  return `<span class="review-card__note">${t}</span>`;
}

function photoCard(r, lang) {
  const src = `/assets/images/client-reviews/${r.photo}`;
  // Cache-busting hash (17 August 2026): computed from the actual file bytes
  // on every run, via the same hashFile() hash-assets.js uses, so this
  // second, independent code path never regresses to an unhashed reference
  // on a solo `node build-reviews.js` re-run.
  const jpgV = hashFile(path.join(ROOT, `assets/images/client-reviews/${r.photo}.jpg`));
  const webpV = hashFile(path.join(ROOT, `assets/images/client-reviews/${r.photo}.webp`));
  const alt =
    lang === "es"
      ? `Cliente de Lisa Collio en Goshen y Elkhart, Indiana`
      : `Client of Lisa Collio in Goshen and Elkhart, Indiana`;
  const label = transLabel(r, lang);
  const src5 = `<span class="review-card__note">${esc(r.source)}</span>`;
  if (!r.text) {
    // photo-only star card — image + name + rating, never a quote
    return `        <figure class="review-card review-card--photoonly">
          <picture><source srcset="${src}.webp?v=${webpV}" type="image/webp"><img class="review-card__photo" src="${src}.jpg?v=${jpgV}" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote></blockquote>
          <figcaption>${stars(lang)}${esc(r.name)}${src5}</figcaption>
        </figure>`;
  }
  return `        <figure class="review-card">
          <picture><source srcset="${src}.webp?v=${webpV}" type="image/webp"><img class="review-card__photo" src="${src}.jpg?v=${jpgV}" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption>${stars(lang)}${esc(r.name)}${src5}${label}</figcaption>
        </figure>`;
}

function textCard(r, lang) {
  return `        <figure class="review-card review-card--textonly">
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption>${stars(lang)}${esc(r.name)}<span class="review-card__note">${esc(r.source)}</span>${transLabel(r, lang)}</figcaption>
        </figure>`;
}

function generalCard(name, lang) {
  const src = `/assets/images/client-general/${name}`;
  const jpgV = hashFile(path.join(ROOT, `assets/images/client-general/${name}.jpg`));
  const webpV = hashFile(path.join(ROOT, `assets/images/client-general/${name}.webp`));
  const alt =
    lang === "es"
      ? "Clientes de Lisa Collio celebrando la compra de su casa en Goshen y Elkhart, Indiana"
      : "Clients of Lisa Collio celebrating a home purchase in Goshen and Elkhart, Indiana";
  return `        <figure class="review-card review-card--photoonly">
          <picture><source srcset="${src}.webp?v=${webpV}" type="image/webp"><img class="review-card__photo" src="${src}.jpg?v=${jpgV}" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote></blockquote>
          <figcaption>${lang === "es" ? "Clientes de Lisa" : "Lisa's clients"}</figcaption>
        </figure>`;
}

// Pages that hand-author their own complete RealEstateAgent node (name,
// address, etc.) earlier in the SAME document's main @graph — homepage pair
// and contact-page pair. Google's structured-data parser merges same-@id
// nodes only WITHIN one page, so on these four a bare incremental node
// would still be valid on its own (it merges into the page's own full
// definition). Every other page carries no such definition, so it needs a
// fully self-contained node or it renders as an invalid LocalBusiness with
// invalid child Reviews.
const FULL_AGENT_EXEMPT = new Set(["index.html", "es/index.html", "contact/index.html", "es/contacto/index.html"]);

// Of those four, the homepage pair ALSO hand-authors its own aggregateRating
// + review for #agent in that same main @graph. Emitting a second
// aggregateRating for the same @id from this reviews block — even in a
// separate <script> tag — reads to Google as "Review has multiple aggregate
// ratings" (same-page @id nodes are merged into one). So the homepage pair
// gets no reviews-block schema at all; their own hand-authored node is the
// sole source of truth. The contact pair's hand-authored node has no
// aggregateRating/review of its own, so it still needs the bare node below.
const NO_SCHEMA_EMIT = new Set(["index.html", "es/index.html"]);

function reviewList(items, lang) {
  return items
    .filter((r) => r && r.text)
    .map(
      (r) =>
        `      {"@type":"Review","inLanguage":${JSON.stringify(lang)},"author":{"@type":"Person","name":${JSON.stringify(r.name)}},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"reviewBody":${JSON.stringify(r.text)}}`
    );
}

function schemaFor(items, lang, rel) {
  const revs = reviewList(items, lang);
  if (!revs.length) return "";
  if (NO_SCHEMA_EMIT.has(rel)) return "";
  if (FULL_AGENT_EXEMPT.has(rel)) {
    return `    <script type="application/ld+json">
{"@context":"https://schema.org","@type":"RealEstateAgent","@id":"https://lisacolliorealtor.com/#agent","aggregateRating":{"@type":"AggregateRating","ratingValue":"${DATA.aggregate.ratingValue}","reviewCount":"${DATA.aggregate.reviewCount}"},"review":[
${revs.join(",\n")}
]}
    </script>`;
  }
  return `    <script type="application/ld+json">
{"@context":"https://schema.org","@type":"RealEstateAgent","@id":"https://lisacolliorealtor.com/#agent","name":"Lisa Collio, Real Estate Agent","url":"https://lisacolliorealtor.com/","telephone":"+1-574-370-5410","email":"lisacolliorealtor@gmail.com","address":{"@type":"PostalAddress","streetAddress":"1918 Elkhart Rd","addressLocality":"Goshen","addressRegion":"IN","postalCode":"46526","addressCountry":"US"},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"19:00"},"areaServed":[{"@type":"City","name":"Goshen","address":{"@type":"PostalAddress","addressLocality":"Goshen","addressRegion":"IN","addressCountry":"US"}},{"@type":"City","name":"Elkhart","address":{"@type":"PostalAddress","addressLocality":"Elkhart","addressRegion":"IN","addressCountry":"US"}}],"knowsLanguage":["en","es"],"memberOf":{"@type":"Organization","name":"RE/MAX Results, The Viruez Team"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${DATA.aggregate.ratingValue}","reviewCount":"${DATA.aggregate.reviewCount}","bestRating":"5"},"review":[
${revs.join(",\n")}
]}
    </script>`;
}

// ---- Page discovery ---------------------------------------------------------
function findHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if ([".git", "node_modules", "components", "assets"].includes(e.name)) continue;
      findHtml(path.join(dir, e.name), acc);
    } else if (e.name.endsWith(".html")) acc.push(path.join(dir, e.name));
  }
  return acc;
}

function urlOf(rel) {
  return "/" + rel.replace(/index\.html$/, "").replace(/\\/g, "/");
}

function mainOf(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  return m ? m[0] : "";
}

function internalLinks(fragment) {
  return [...fragment.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => {
    let u = m[1];
    if (!u.endsWith("/") && !/\.[a-z0-9]+$/i.test(u)) u += "/";
    return u;
  });
}

// Primary navigation: one clique PER header partial. header.html and
// header-es.html are separate menus — an EN nav item does not link to an ES one
// (the only EN→ES link is the per-page "Hablo español" badge, already covered
// by the hreflang-alternate edge), so they must not be merged into one clique.
function navCliques() {
  return fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => /^header.*\.html$/.test(f))
    .map((f) => [...new Set(internalLinks(fs.readFileSync(path.join(COMPONENTS_DIR, f), "utf8")))]);
}

function parentUrl(u) {
  if (u === "/") return null;
  const parts = u.replace(/\/$/, "").split("/");
  parts.pop();
  return (parts.join("/") || "") + "/";
}

// ---- Least-recently-used picker --------------------------------------------
// Prefers the candidate whose PERSON has gone longest without appearing, so the
// rotation spreads across the whole pool before anyone is reused. `banned` is
// the set of persons/households already spoken for on this page or on an
// adjacent one.
function lru(pool, banned, lastUsed, keyOf) {
  let best = null;
  let bestSeen = Infinity;
  for (const c of pool) {
    if (banned.has(c.person) || (c.household && banned.has("household:" + c.household))) continue;
    const seen = lastUsed.get(keyOf(c)) ?? -1;
    if (seen < bestSeen) {
      bestSeen = seen;
      best = c;
    }
  }
  return best;
}

function lruRelaxed(pool, lastUsed, keyOf) {
  let best = pool[0];
  let bestSeen = Infinity;
  for (const c of pool) {
    const seen = lastUsed.get(keyOf(c)) ?? -1;
    if (seen < bestSeen) {
      bestSeen = seen;
      best = c;
    }
  }
  return best;
}

// ---- Main -------------------------------------------------------------------
function main() {
  const check = process.argv.includes("--check");

  const all = findHtml(ROOT)
    .map((f) => path.relative(ROOT, f).replace(/\\/g, "/"))
    .filter((f) => !EXCLUDE_RE.test("/" + f))
    .sort();

  // Only pages that opt in by carrying the markers take part in the rotation.
  const pages = [];
  const srcByRel = new Map();
  for (const rel of all) {
    const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
    if (!/<!--\s*reviews:start\s*-->[\s\S]*?<!--\s*reviews:end\s*-->/.test(html)) continue;
    srcByRel.set(rel, html);
    pages.push(rel);
  }

  const urlToRel = new Map(pages.map((rel) => [urlOf(rel), rel]));

  // ---- Adjacency graph ------------------------------------------------------
  const adj = new Map(pages.map((rel) => [rel, new Set()]));
  const link = (a, b) => {
    if (!a || !b || a === b || !adj.has(a) || !adj.has(b)) return;
    adj.get(a).add(b);
    adj.get(b).add(a);
  };

  // (a) in-content links + (d) hierarchy + (e) hreflang alternates
  for (const rel of pages) {
    const html = srcByRel.get(rel);
    for (const u of internalLinks(mainOf(html))) link(rel, urlToRel.get(u));
    link(rel, urlToRel.get(parentUrl(urlOf(rel))));
    for (const m of html.matchAll(/<link rel="alternate" hreflang="(?:en|es)" href="https:\/\/lisacolliorealtor\.com(\/[^"]*)"/g)) {
      link(rel, urlToRel.get(m[1]));
    }
  }

  // (b) primary-navigation clique — every nav destination links to every other
  for (const clique of navCliques()) {
    const rels = clique.map((u) => urlToRel.get(u)).filter(Boolean);
    for (let i = 0; i < rels.length; i++) {
      for (let j = i + 1; j < rels.length; j++) link(rels[i], rels[j]);
    }
  }

  // ---- Assignment -----------------------------------------------------------
  const lastUsed = new Map(); // person -> page index last placed
  const lastGeneral = new Map(); // client-general photo -> page index
  const assigned = new Map(); // rel -> { persons:Set, general:string }
  const overflow = [];
  const results = new Map();

  // Assign in largest-degree-first order (standard greedy-colouring heuristic):
  // hub pages are adjacent to dozens of others, so they must pick before the
  // leaves exhaust the pool around them. Ties break on path for determinism.
  const order = [...pages].sort((a, b) => adj.get(b).size - adj.get(a).size || (a < b ? -1 : a > b ? 1 : 0));

  order.forEach((rel, idx) => {
    const lang = /^es\/|^blog\/spanish\//.test(rel) ? "es" : "en";
    const P = POOLS[lang];

    // Adjacency bans are by PERSON only. Household separation is a same-page
    // rule (a married couple's two reviews never sit side by side), not a
    // neighbourhood rule.
    const banned = new Set();
    const bannedGeneral = new Set();
    for (const nb of adj.get(rel)) {
      const prev = assigned.get(nb);
      if (!prev) continue;
      for (const p of prev.persons) banned.add(p);
      bannedGeneral.add(prev.general);
    }

    let a = lru(P.withPhoto, banned, lastUsed, (c) => c.person);
    if (!a) {
      overflow.push({ rel, slot: "photo" });
      a = lruRelaxed(P.withPhoto, lastUsed, (c) => c.person);
    }

    const banned2 = new Set(banned);
    banned2.add(a.person);
    if (a.household) banned2.add("household:" + a.household);

    let b = lru(P.textOnly, banned2, lastUsed, (c) => c.person);
    if (!b) {
      overflow.push({ rel, slot: "text" });
      b = lruRelaxed(
        P.textOnly.filter((c) => c.person !== a.person),
        lastUsed,
        (c) => c.person
      );
    }

    let g = generalPhotos.find((p) => !bannedGeneral.has(p) && (lastGeneral.get(p) ?? -1) === -1);
    if (!g) {
      let bestSeen = Infinity;
      for (const p of generalPhotos) {
        if (bannedGeneral.has(p)) continue;
        const seen = lastGeneral.get(p) ?? -1;
        if (seen < bestSeen) {
          bestSeen = seen;
          g = p;
        }
      }
    }
    if (!g) g = generalPhotos[idx % generalPhotos.length];

    lastUsed.set(a.person, idx);
    lastUsed.set(b.person, idx);
    lastGeneral.set(g, idx);
    assigned.set(rel, { persons: new Set([a.person, b.person]), general: g });

    const heading = lang === "es" ? "Lo que dicen sus clientes" : "What Lisa's clients say";
    const more =
      lang === "es"
        ? `<p class="reviews__meta">5.0 ★ · ${DATA.aggregate.reviewCount} reseñas en Google</p>`
        : `<p class="reviews__meta">5.0 ★ · ${DATA.aggregate.reviewCount} Google reviews</p>`;
    const schema = schemaFor([a, b], lang, rel);
    results.set(
      rel,
      `<!-- reviews:start -->
  <section class="section section--tint">
    <div class="wrap">
      <h2>${heading}</h2>
      ${more}
      <div class="review-grid review-grid--three">
${photoCard(a, lang)}
${textCard(b, lang)}
${generalCard(g, lang)}
      </div>
    </div>${schema ? `\n${schema}` : ""}
  </section>
  <!-- reviews:end -->`
    );
  });

  // ---- Verify the no-repeat rule actually held ------------------------------
  const violations = [];
  for (const rel of pages) {
    for (const nb of adj.get(rel)) {
      if (nb <= rel) continue;
      const a = assigned.get(rel);
      const b = assigned.get(nb);
      for (const p of a.persons) if (b.persons.has(p)) violations.push(`${rel} ↔ ${nb}: ${p}`);
    }
  }

  // ---- Write ----------------------------------------------------------------
  let touched = 0;
  const stale = [];
  for (const rel of pages) {
    const html = srcByRel.get(rel);
    const out = html.replace(/<!--\s*reviews:start\s*-->[\s\S]*?<!--\s*reviews:end\s*-->/, results.get(rel));
    if (out === html) continue;
    if (check) stale.push(rel);
    else {
      fs.writeFileSync(path.join(ROOT, rel), out);
      touched++;
    }
  }

  const enPages = pages.filter((r) => !/^es\/|^blog\/spanish\//.test(r)).length;
  if (check) {
    if (violations.length) {
      console.error(`Adjacent-page review repeats:\n  - ${violations.join("\n  - ")}`);
      process.exit(1);
    }
    if (stale.length) {
      console.error(`Review blocks out of date (run \`node build-reviews.js\`):\n  - ${stale.slice(0, 10).join("\n  - ")}${stale.length > 10 ? `\n  ...and ${stale.length - 10} more` : ""}`);
      process.exit(1);
    }
    console.log("All review blocks are up to date; no adjacent-page repeats.");
  } else {
    console.log(`Done. ${touched} page(s) updated of ${pages.length} in the rotation (${enPages} EN / ${pages.length - enPages} ES).`);
    console.log(`Pools — EN: ${POOLS.en.withPhoto.length} photo / ${POOLS.en.textOnly.length} text; ES: ${POOLS.es.withPhoto.length} photo / ${POOLS.es.textOnly.length} text; ${generalPhotos.length} client-general photos.`);
    const used = new Set([...assigned.values()].flatMap((v) => [...v.persons]));
    console.log(`Distinct reviewers placed: ${used.size}. Adjacency edges: ${[...adj.values()].reduce((n, s) => n + s.size, 0) / 2}.`);
    if (overflow.length) {
      console.log(`Pool overflow (no non-adjacent candidate; nearest available reused) on ${overflow.length} slot(s):`);
      for (const o of overflow) console.log(`  - ${o.rel} [${o.slot}]`);
    } else {
      console.log("No overflow: every page filled without an adjacent repeat.");
    }
    if (violations.length) {
      console.log(`Adjacent-page repeats remaining: ${violations.length}`);
      for (const v of violations) console.log(`  - ${v}`);
    } else {
      console.log("Verified: no reviewer repeats on any adjacent page.");
    }
  }
}

main();
