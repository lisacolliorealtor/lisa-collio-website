#!/usr/bin/env node
/*
 * hash-assets.js — content-hashed cache-busting for CSS and images.
 *
 * WHY THIS EXISTS (tracked in the punch list since PR #71): Netlify serves
 * this repo's committed files directly — there is no build-time render step
 * (netlify.toml has no [build] command). So every reference to an image or
 * CSS file is either hand-authored literal HTML/CSS or generated OFFLINE and
 * committed as real bytes. Nothing is content-addressed. A visitor with a
 * cached CSS file or image keeps seeing the old bytes after Lisa updates one,
 * until the cache header expires (short max-age + must-revalidate is the
 * interim fix already in netlify.toml).
 *
 * THE DURABLE FIX, chosen over renaming files on disk (Report-Before-Build
 * Phase 0 report, 17 August 2026 — see the punch list for the full
 * reasoning): append a content-hash query string (?v=HASH) to every
 * reference instead of renaming the physical file. `Cache-Control: immutable`
 * treats the query string as part of the cache key, so this gets the exact
 * same correctness guarantee as a hashed filename, but:
 *   - physical filenames never change, so HERO_JOBS/SECTION_JOBS/OVERLAY_JOBS/
 *     CLEAN_JOBS (all keyed by canonical slug) need no changes;
 *   - audit.js checks 15, 22, and 23 (all of which match bare filenames on
 *     disk or in HTML) need no changes — confirmed against their actual
 *     regexes before choosing this approach, not assumed;
 *   - check 2's own href/src regex already stops capturing at "?", so it
 *     validates the base path underneath any ?v= with zero changes either.
 *
 * WHAT THIS SCRIPT COVERS — every reference pattern found in the Phase 0
 * inventory, not just href/src:
 *   1. href="..."  and  src="..."   (CSS <link>, <img>, favicons)
 *   2. srcset="..."                  (<source> inside <picture>)
 *   3. content="..." on og:image / twitter:image meta tags (absolute URLs)
 *   4. "image": "..." inside inline JSON-LD <script type="application/ld+json">
 *      (absolute URLs)
 *   5. the --hero-img:url('...') CSS custom property (Home inline style,
 *      and the heroImg value inside each Tier 2 page's build:hero-tier2
 *      marker JSON comment)
 *
 * SCOPE: CSS (tokens.css, site.css) and images (assets/images/**, plus the
 * four referenced root favicon/touch-icon files). Fonts are deliberately
 * OUT of scope — they are referenced only from inside site.css/tokens.css
 * (@font-face url()), not from any of the five patterns above, and the
 * existing netlify.toml comment already documents that fonts "genuinely do
 * not change in practice." icon-192.png/icon-512.png are also excluded —
 * confirmed via repo-wide grep that nothing references them (no web
 * manifest exists); hashing an orphan file would be inert.
 *
 * WHY THIS RUNS AFTER build.js, NOT BEFORE (per Lisa's Phase 1 instruction):
 * this script rewrites every LITERAL occurrence of an asset path anywhere in
 * a file's text — including inside a page's build:hero-tier2 marker JSON
 * comment, not just the marker's rendered output. That makes the marker
 * JSON source itself hash-bearing, so a LATER, solo `node build.js` re-run
 * (e.g. after an unrelated copy edit) re-renders from an already-hashed
 * source and reproduces the identical hashed output — this script does not
 * need to run again for build.js's own re-renders to stay correct. The same
 * logic covers components/header.html, footer.html, header-es.html,
 * footer-es.html: hashing the PARTIAL SOURCE (not just the 156 rendered
 * pages) means a future `node build.js` re-run keeps the hash.
 *
 * build-reviews.js is a SEPARATE, independent code path (it generates its
 * <picture> markup programmatically from a directory listing on every run,
 * not from static text this script can pre-hash) — it computes its own
 * hashes via hash-util.js, the same algorithm this script uses. Run it
 * before or after this script; the result is identical either way, because
 * hashFile() always returns the same hash for the same bytes.
 *
 * Usage:
 *   node hash-assets.js          # rewrite in place, report counts
 *   node hash-assets.js --check  # verify nothing is stale (CI-friendly)
 */

const fs = require("fs");
const path = require("path");
const { hashFile } = require("./hash-util");

const ROOT = __dirname;
const DOMAIN = "https://lisacolliorealtor.com";
const IGNORE_DIRS = new Set([".git", "node_modules", "__pycache__"]);

function findFiles(dir, test, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      findFiles(path.join(dir, entry.name), test, acc);
    } else if (entry.isFile() && test(entry.name)) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

// ---- 1. Build the asset manifest: root-relative path -> hash ---------------
const IMAGE_EXT = /\.(jpe?g|png|webp|svg)$/i;
const manifest = new Map(); // "/assets/images/hero/home.jpg" -> "a1b2c3d4"

for (const f of ["tokens.css", "site.css"]) {
  const abs = path.join(ROOT, "assets", "css", f);
  manifest.set(`/assets/css/${f}`, hashFile(abs));
}

for (const abs of findFiles(path.join(ROOT, "assets", "images"), (n) => IMAGE_EXT.test(n))) {
  const rel = "/" + path.relative(ROOT, abs).split(path.sep).join("/");
  manifest.set(rel, hashFile(abs));
}

// Root favicon/touch-icon files — only the four actually referenced anywhere
// (icon-192.png/icon-512.png are orphans, confirmed unreferenced, excluded).
for (const f of ["favicon.svg", "favicon-16.png", "favicon-32.png", "apple-touch-icon.png"]) {
  const abs = path.join(ROOT, f);
  if (fs.existsSync(abs)) manifest.set(`/${f}`, hashFile(abs));
}

console.log(`Manifest: ${manifest.size} asset files hashed.`);

// ---- 2. Pattern-specific rewrite rules --------------------------------------
// Each rule matches its own attribute/context shape and looks the captured
// path up in the manifest; a path not in the manifest (e.g. an internal page
// link that happens to start with /assets/ some other way) is left untouched.
const HASH_RE = "[0-9a-f]{8}";

// href="..." and src="..." — CSS <link>, <img src>, favicon <link>. Root-
// relative paths only (this repo never uses protocol-relative or absolute
// href/src for its own assets).
const hrefSrcRe = /(href|src)="(\/(?:assets\/[^"?#]+|favicon(?:-16|-32)?\.(?:svg|png)|apple-touch-icon\.png))(\?v=[0-9a-f]{8})?"/g;

// srcset="..." on <source> inside <picture>.
const srcsetRe = /srcset="(\/assets\/[^"?#]+)(\?v=[0-9a-f]{8})?"/g;

// og:image / twitter:image meta content — absolute URL form.
const metaContentRe = new RegExp(`content="(${DOMAIN.replace(/\./g, "\\.")}\\/assets\\/[^"?#]+)(\\?v=${HASH_RE})?"`, "g");

// "image": "..." inside inline JSON-LD — absolute URL form.
const jsonImageRe = new RegExp(`("image"\\s*:\\s*")(${DOMAIN.replace(/\./g, "\\.")}\\/assets\\/[^"?#]+?)(\\?v=${HASH_RE})?(")`, "g");

// --hero-img:url('...') custom property — single-quoted, root-relative.
// Covers both the rendered style attribute AND the heroImg value inside a
// page's build:hero-tier2 marker JSON comment (which also uses this exact
// url('...') form) in one pass, since both are just text in the file.
// NOT hardcoded to assets/images/hero/ — Sellers' hero sources from its own
// sold-listing consent folder (assets/images/homes-elkhart/<address>/...),
// per HERO_JOBS. Caught by the verification pass below: expected 24 real
// hero-img references (12 slots x EN/ES), first got 22 because this regex
// was scoped to /hero/ only.
const heroImgRe = /(--hero-img:url\(')(\/assets\/images\/[^'?#]+)(\?v=[0-9a-f]{8})?('\))/g;

// The build:hero-tier2 MARKER JSON comment carries its own, separately-typed
// copy of the same path — a bare JSON string value ("heroImg": "/assets/...")
// used only to render the --hero-img:url(...) form above via build.js's
// {{heroImg}} substitution. Caught during verification: hashing only the
// rendered form left this one unhashed, which would have made a later solo
// `node build.js` re-run (e.g. for an unrelated copy edit) silently
// re-render from the stale, unhashed marker value and wipe the hash from
// the live page. Must be kept hash-bearing too, for the same reason the
// component partials must be.
const heroMarkerRe = /("heroImg":\s*")(\/assets\/images\/[^"?#]+)(\?v=[0-9a-f]{8})?(")/g;

function rewriteFile(text) {
  const counts = { hrefSrc: 0, srcset: 0, metaContent: 0, jsonImage: 0, heroImg: 0, heroMarker: 0 };

  let out = text.replace(hrefSrcRe, (full, attr, p) => {
    const hash = manifest.get(p);
    if (!hash) return full;
    counts.hrefSrc++;
    return `${attr}="${p}?v=${hash}"`;
  });

  out = out.replace(srcsetRe, (full, p) => {
    const hash = manifest.get(p);
    if (!hash) return full;
    counts.srcset++;
    return `srcset="${p}?v=${hash}"`;
  });

  out = out.replace(metaContentRe, (full, p) => {
    const key = p.slice(DOMAIN.length);
    const hash = manifest.get(key);
    if (!hash) return full;
    counts.metaContent++;
    return `content="${p}?v=${hash}"`;
  });

  out = out.replace(jsonImageRe, (full, pre, p, _oldV, post) => {
    const key = p.slice(DOMAIN.length);
    const hash = manifest.get(key);
    if (!hash) return full;
    counts.jsonImage++;
    return `${pre}${p}?v=${hash}${post}`;
  });

  out = out.replace(heroImgRe, (full, pre, p, _oldV, post) => {
    const hash = manifest.get(p);
    if (!hash) return full;
    counts.heroImg++;
    return `${pre}${p}?v=${hash}${post}`;
  });

  out = out.replace(heroMarkerRe, (full, pre, p, _oldV, post) => {
    const hash = manifest.get(p);
    if (!hash) return full;
    counts.heroMarker++;
    return `${pre}${p}?v=${hash}${post}`;
  });

  return { out, counts };
}

// ---- 3. Apply to every HTML file: 156 pages + 9 components/*.html partials -
const htmlFiles = findFiles(ROOT, (n) => n.endsWith(".html"));

const check = process.argv.includes("--check");
const totals = { hrefSrc: 0, srcset: 0, metaContent: 0, jsonImage: 0, heroImg: 0, heroMarker: 0 };
const stale = [];
let touched = 0;

for (const f of htmlFiles) {
  const original = fs.readFileSync(f, "utf8");
  const { out, counts } = rewriteFile(original);
  for (const k of Object.keys(totals)) totals[k] += counts[k];
  if (out !== original) {
    if (check) {
      stale.push(path.relative(ROOT, f));
    } else {
      fs.writeFileSync(f, out);
      touched++;
    }
  }
}

console.log(`\nReference counts rewritten this run, by pattern:`);
console.log(`  href/src (CSS links, <img>, favicons): ${totals.hrefSrc}`);
console.log(`  srcset (<source> in <picture>):         ${totals.srcset}`);
console.log(`  og:image / twitter:image meta content:  ${totals.metaContent}`);
console.log(`  JSON-LD "image" fields:                 ${totals.jsonImage}`);
console.log(`  --hero-img custom property:             ${totals.heroImg}`);
console.log(`  heroImg marker JSON (source of above):  ${totals.heroMarker}`);
console.log(`  TOTAL:                                  ${Object.values(totals).reduce((a, b) => a + b, 0)}`);

if (check) {
  if (stale.length) {
    console.error(`\nOut of date (run \`node hash-assets.js\`):\n  - ${stale.join("\n  - ")}`);
    process.exit(1);
  }
  console.log("\nAll asset references are correctly hashed.");
} else {
  console.log(touched ? `\nDone. ${touched} file(s) updated.` : "\nDone. No changes (already up to date).");
}
