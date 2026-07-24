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
 * Rotation: pages are walked in a stable sorted order and each slot cycles
 * through its own pool with a different stride, so no review repeats on the
 * same page or on adjacent pages. Pools are language-scoped.
 *
 * Language rules (locked):
 *   - EN pages quote English originals verbatim.
 *   - ES pages quote Spanish originals verbatim, and may additionally use
 *     Spanish translations of English reviews, ALWAYS labelled
 *     "Traducido del inglés" so a translation is never passed off as an
 *     original.
 *   - A client photo appears only beside that same client's own review.
 *
 * Excluded pages: legal pages (privacy/terms/accessibility/fair-housing and
 * their Spanish counterparts), thank-you/gracias pages, and 404.
 *
 * Idempotent: only rewrites the region between the markers.
 *   <!-- reviews:start --> ... <!-- reviews:end -->
 *
 * Usage: node build-reviews.js   |   node build-reviews.js --check
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "content/reviews.json"), "utf8"));
const GENERAL_DIR = path.join(ROOT, "assets/images/client-general");

const EXCLUDE_RE = /(^|\/)(privacy|terms|accessibility|fair-housing|disclaimers|sources|404)\/|(^|\/)es\/(privacidad|terminos|accesibilidad|vivienda-justa)\/|thank-you\/|gracias\//;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- Build language-scoped pools -------------------------------------------
const generalPhotos = fs
  .readdirSync(GENERAL_DIR)
  .filter((f) => f.endsWith(".webp"))
  .map((f) => f.replace(/\.webp$/, ""))
  .sort();

function poolsFor(lang) {
  const withPhoto = [];
  const textOnly = [];
  for (const r of DATA.reviews) {
    if (lang === "en") {
      if (r.lang !== "en") continue; // EN pages: English originals only
      if (r.photo) withPhoto.push({ ...r, translated: false });
      textOnly.push({ ...r, translated: false });
    } else {
      if (r.lang === "es") {
        if (r.photo) withPhoto.push({ ...r, translated: false });
        textOnly.push({ ...r, translated: false });
      } else if (r.es_translation) {
        const t = { ...r, text: r.es_translation, translated: true };
        if (r.photo) withPhoto.push(t);
        textOnly.push(t);
      }
    }
  }
  // photo-only star cards (no quote) widen the photo slot
  for (const p of DATA.photoOnly) withPhoto.push({ ...p, text: null, translated: false });
  return { withPhoto, textOnly };
}

const POOLS = { en: poolsFor("en"), es: poolsFor("es") };

// ---- Rendering --------------------------------------------------------------
function stars() {
  return `<span class="review-stars" aria-label="5 de 5 estrellas">★★★★★</span>`;
}

function photoCard(r, lang) {
  const src = `/assets/images/client-reviews/${r.photo}`;
  const alt =
    lang === "es"
      ? `Cliente de Lisa Collio en Goshen y Elkhart, Indiana`
      : `Client of Lisa Collio in Goshen and Elkhart, Indiana`;
  const label = r.translated
    ? `<span class="review-card__note">Traducido del inglés</span>`
    : "";
  const src5 = `<span class="review-card__note">${esc(r.source)}</span>`;
  if (!r.text) {
    // photo-only star card — image + name + rating, never a quote
    return `        <figure class="review-card review-card--photoonly">
          <picture><source srcset="${src}.webp" type="image/webp"><img class="review-card__photo" src="${src}.jpg" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote></blockquote>
          <figcaption>${stars()}${esc(r.name)}${src5}</figcaption>
        </figure>`;
  }
  return `        <figure class="review-card">
          <picture><source srcset="${src}.webp" type="image/webp"><img class="review-card__photo" src="${src}.jpg" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption>${stars()}${esc(r.name)}${src5}${label}</figcaption>
        </figure>`;
}

function textCard(r) {
  const label = r.translated
    ? `<span class="review-card__note">Traducido del inglés</span>`
    : "";
  return `        <figure class="review-card review-card--textonly">
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption>${stars()}${esc(r.name)}<span class="review-card__note">${esc(r.source)}</span>${label}</figcaption>
        </figure>`;
}

function generalCard(name, lang) {
  const src = `/assets/images/client-general/${name}`;
  const alt =
    lang === "es"
      ? "Clientes de Lisa Collio celebrando la compra de su casa en Goshen y Elkhart, Indiana"
      : "Clients of Lisa Collio celebrating a home purchase in Goshen and Elkhart, Indiana";
  return `        <figure class="review-card review-card--photoonly">
          <picture><source srcset="${src}.webp" type="image/webp"><img class="review-card__photo" src="${src}.jpg" alt="${alt}" width="800" height="600" loading="lazy"></picture>
          <blockquote></blockquote>
          <figcaption>${lang === "es" ? "Clientes de Lisa" : "Lisa's clients"}</figcaption>
        </figure>`;
}

function schemaFor(items) {
  const revs = items
    .filter((r) => r && r.text)
    .map(
      (r) =>
        `      {"@type":"Review","author":{"@type":"Person","name":${JSON.stringify(r.name)}},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"},"reviewBody":${JSON.stringify(r.text)}}`
    );
  if (!revs.length) return "";
  return `    <script type="application/ld+json">
{"@context":"https://schema.org","@type":"RealEstateAgent","@id":"https://lisacolliorealtor.com/#agent","aggregateRating":{"@type":"AggregateRating","ratingValue":"${DATA.aggregate.ratingValue}","reviewCount":"${DATA.aggregate.reviewCount}"},"review":[
${revs.join(",\n")}
]}
    </script>`;
}

// Pick the first candidate whose PERSON (not row id) isn't banned. Some people
// appear more than once in the corpus across platforms — e.g. Naun C. has both
// a Google review and a Facebook recommendation — so de-duplication is by
// display name, never by row id.
function pick(pool, start, banned) {
  for (let i = 0; i < pool.length; i++) {
    const c = pool[(start + i) % pool.length];
    if (!banned.has(c.name)) return c;
  }
  return pool[start % pool.length];
}

function block(idx, lang, prevNames) {
  const P = POOLS[lang];
  const a = pick(P.withPhoto, idx, prevNames);
  const b = pick(P.textOnly, idx * 3 + 1, new Set([...prevNames, a.name]));
  const g = generalPhotos[idx % generalPhotos.length];
  const heading = lang === "es" ? "Lo que dicen sus clientes" : "What Lisa's clients say";
  const more =
    lang === "es"
      ? `<p class="reviews__meta">5.0 ★ · ${DATA.aggregate.reviewCount} reseñas en Google</p>`
      : `<p class="reviews__meta">5.0 ★ · ${DATA.aggregate.reviewCount} Google reviews</p>`;
  const html = `<!-- reviews:start -->
  <section class="section section--tint">
    <div class="wrap">
      <h2>${heading}</h2>
      ${more}
      <div class="review-grid review-grid--three">
${photoCard(a, lang)}
${textCard(b)}
${generalCard(g, lang)}
      </div>
    </div>
${schemaFor([a, b])}
  </section>
  <!-- reviews:end -->`;
  return { html, names: new Set([a.name, b.name]) };
}

// ---- Walk pages -------------------------------------------------------------
function findHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if ([".git", "node_modules", "components", "assets"].includes(e.name)) continue;
      findHtml(path.join(dir, e.name), acc);
    } else if (e.name.endsWith(".html")) acc.push(path.join(dir, e.name));
  }
  return acc;
}

function main() {
  const check = process.argv.includes("--check");
  const files = findHtml(ROOT)
    .map((f) => path.relative(ROOT, f))
    .filter((f) => !EXCLUDE_RE.test("/" + f))
    .sort();

  let touched = 0;
  const stale = [];
  let prevNames = new Set();
  files.forEach((rel, idx) => {
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, "utf8");
    const lang = /^es\/|^blog\/spanish\//.test(rel) ? "es" : "en";
    const built = block(idx, lang, prevNames);
    const rendered = built.html;
    prevNames = built.names;

    let out;
    if (/<!--\s*reviews:start\s*-->[\s\S]*?<!--\s*reviews:end\s*-->/.test(html)) {
      out = html.replace(/<!--\s*reviews:start\s*-->[\s\S]*?<!--\s*reviews:end\s*-->/, rendered);
    } else if (/<!--\s*build:talk-to-lisa(-es)?\s*-->/.test(html)) {
      out = html.replace(/(<!--\s*build:talk-to-lisa(-es)?\s*-->)/, `${rendered}\n\n  $1`);
    } else {
      return; // no anchor on this page
    }

    if (out !== html) {
      if (check) stale.push(rel);
      else {
        fs.writeFileSync(file, out);
        touched++;
      }
    }
  });

  if (check) {
    if (stale.length) {
      console.error(`Review blocks out of date (run \`node build-reviews.js\`):\n  - ${stale.slice(0, 10).join("\n  - ")}${stale.length > 10 ? `\n  ...and ${stale.length - 10} more` : ""}`);
      process.exit(1);
    }
    console.log("All review blocks are up to date.");
  } else {
    console.log(`Done. ${touched} page(s) updated. Pools — EN: ${POOLS.en.withPhoto.length} photo / ${POOLS.en.textOnly.length} text; ES: ${POOLS.es.withPhoto.length} photo / ${POOLS.es.textOnly.length} text; ${generalPhotos.length} client-general photos.`);
  }
}

main();
