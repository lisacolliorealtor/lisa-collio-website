#!/usr/bin/env node
/*
 * build-blog-listing.js — renders the "Browse by topic" grid and the flat
 * all-articles list on /blog/ and /blog/spanish/ from a shared data source,
 * so a topic (or a cross-posted article) is authored once and appears
 * everywhere it needs to, instead of being hand-duplicated per page.
 *
 * Data sources (content/):
 *   blog-articles.json  — one entry per article, both languages. Each entry
 *     carries a `categories` array — usually one value, but an article can
 *     list more than one to be cross-posted (it renders once per category
 *     it belongs to). Deliberately does NOT store thumbnail existence or alt
 *     text: both already have exactly one canonical home (the article's own
 *     page), and storing a third copy here would be exactly the field-class
 *     duplication this project's Alt-Text Correspondence Standard exists to
 *     prevent. This script reads each article's own page for its
 *     `blog-featured` alt text, and checks the filesystem for its thumbnail,
 *     every run — so there is one source of truth for each fact, not three.
 *   blog-topics.json    — topic metadata (label, description, category-card
 *     image) per language. A topic's article COUNT is always computed from
 *     blog-articles.json, never hand-typed here. A topic whose computed
 *     count is zero is omitted from the rendered grid — a general rule, not
 *     a Market-Updates-specific special case, so it also self-corrects if a
 *     populated topic is ever emptied out later.
 *
 * Modes:
 *   node build-blog-listing.js --preview   (default if no flag given)
 *     Renders both languages' output to docs/drafts/blog-listing-preview-*.html
 *     for review. Does NOT touch blog/index.html or blog/spanish/index.html.
 *   node build-blog-listing.js --apply
 *     Injects the rendered sections into the live pages, between markers
 *     <!-- blog-topics:start/end --> and <!-- blog-articles:start/end -->.
 *     Idempotent — re-running with no data change produces no diff.
 *
 * PR-staging note (Report-Before-Build, this build): this script ships in
 * --preview-only use for its first PR. --apply is not invoked until the
 * manifest and this generator have been reviewed and approved separately —
 * see the punch list for the two-stage plan.
 */

const fs = require("fs");
const path = require("path");
const { hashFile } = require("./hash-util");

const ROOT = __dirname;
const ARTICLES = JSON.parse(fs.readFileSync(path.join(ROOT, "content/blog-articles.json"), "utf8"));
const TOPICS = JSON.parse(fs.readFileSync(path.join(ROOT, "content/blog-topics.json"), "utf8"));
const BLOG_HEADERS_DIR = path.join(ROOT, "assets/images/blog-headers");

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function urlToPageFile(url) {
  // "/blog/buyers/slug/" -> "<root>/blog/buyers/slug/index.html"
  const clean = url.replace(/^\//, "").replace(/\/$/, "");
  return path.join(ROOT, clean, "index.html");
}

function readFeaturedAlt(url) {
  const file = urlToPageFile(url);
  if (!fs.existsSync(file)) return { exists: false, alt: null };
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/<img class="blog-featured"[^>]*alt="([^"]*)"/);
  return { exists: true, alt: m ? m[1] : null };
}

function thumbHrefFor(slug) {
  const jpg = path.join(BLOG_HEADERS_DIR, `${slug}-thumb.jpg`);
  const webp = path.join(BLOG_HEADERS_DIR, `${slug}-thumb.webp`);
  if (!fs.existsSync(jpg)) return null;
  return {
    jpgSrc: `/assets/images/blog-headers/${slug}-thumb.jpg${fs.existsSync(jpg) ? `?v=${hashFile(jpg)}` : ""}`,
    webpSrc: fs.existsSync(webp) ? `/assets/images/blog-headers/${slug}-thumb.webp?v=${hashFile(webp)}` : null,
  };
}

function imgSrcWithHash(assetPath) {
  if (!assetPath) return null;
  const abs = path.join(ROOT, assetPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) throw new Error(`blog-topics.json references a missing image: ${assetPath}`);
  return `${assetPath}?v=${hashFile(abs)}`;
}

// Group articles by category, preserving each language's topics.json order.
// An article with N categories appears once in each of the N groups.
function groupByTopic(lang) {
  const byKey = new Map();
  for (const t of TOPICS[lang]) byKey.set(t.key, []);
  for (const a of ARTICLES[lang]) {
    for (const cat of a.categories) {
      if (!byKey.has(cat)) {
        throw new Error(`${lang} article "${a.slug}" references unknown category "${cat}" — add it to blog-topics.json first.`);
      }
      byKey.get(cat).push(a);
    }
  }
  return byKey;
}

function renderTopicGrid(lang, groups) {
  const nonEmpty = TOPICS[lang].filter((t) => groups.get(t.key).length > 0);
  let firstImg = true;
  const cards = nonEmpty.map((t) => {
    const count = groups.get(t.key).length;
    const countLabel = lang === "es"
      ? `${count} ${count === 1 ? "artículo" : "artículos"}`
      : `${count} ${count === 1 ? "article" : "articles"}`;
    const href = t.hubUrl || `#${t.key}`;
    const loading = firstImg ? "eager" : "lazy";
    firstImg = false;
    const imgBlock = t.image
      ? `          <a href="${esc(href)}" tabindex="-1" aria-hidden="true">
            <img class="local-card__img" src="${esc(imgSrcWithHash(t.image))}" width="${t.imageWidth}" height="${t.imageHeight}" alt="${esc(t.imageAlt || "")}" loading="${loading}" decoding="async">
          </a>\n`
      : "";
    const descBlock = t.description ? `          <p>${esc(t.description)}</p>\n` : "";
    return `        <article class="blog-card">
${imgBlock}          <h3><a href="${esc(href)}">${esc(t.label)}</a></h3>
${descBlock}          <p class="blog-card__cat">${countLabel}</p>
        </article>`;
  });
  return cards.join("\n");
}

function renderFlatList(lang, groups) {
  const nonEmpty = TOPICS[lang].filter((t) => groups.get(t.key).length > 0);
  let firstThumb = true;
  const blocks = [];
  for (const t of nonEmpty) {
    const arts = groups.get(t.key);
    arts.forEach((a, i) => {
      const anchorId = i === 0 ? ` id="${esc(t.key)}"` : "";
      const { exists, alt } = readFeaturedAlt(a.url);
      if (!exists) {
        throw new Error(`Article page missing on disk for slug "${a.slug}" (url ${a.url}) — manifest/disk mismatch.`);
      }
      const thumb = thumbHrefFor(a.slug);
      let thumbBlock = "";
      let textOpen = "";
      let textClose = "";
      if (thumb) {
        const loading = firstThumb ? "eager" : "lazy";
        firstThumb = false;
        const source = thumb.webpSrc
          ? `\n            <source type="image/webp" srcset="${esc(thumb.webpSrc)}">` : "";
        thumbBlock = `          <a class="blog-card__thumb" href="${esc(a.url)}" tabindex="-1" aria-hidden="true">
            <picture>${source}
              <img src="${esc(thumb.jpgSrc)}" width="800" height="420" alt="${esc(alt || "")}" loading="${loading}" decoding="async">
            </picture>
          </a>\n`;
        textOpen = "          <div class=\"blog-card__text\">\n";
        textClose = "          </div>\n";
      }
      const catLabel = lang === "es"
        ? `<p class="blog-card__cat">En Español</p>`
        : `<p class="blog-card__cat"><a href="${esc(TOPICS.en.find((x) => x.key === t.key).hubUrl)}">${esc(t.label)}</a></p>`;
      const heading = lang === "es"
        ? `<h2><a href="${esc(a.url)}">${esc(a.title)}</a></h2>`
        : `<h3><a href="${esc(a.url)}">${esc(a.title)}</a></h3>`;
      blocks.push(`        <article class="blog-card"${anchorId}>
${thumbBlock}${textOpen}          ${catLabel}
          ${heading}
          <p>${esc(a.description)}</p>
${textClose}        </article>`);
    });
  }
  return blocks.join("\n");
}

function renderLanguage(lang) {
  const groups = groupByTopic(lang);
  return {
    topicGrid: renderTopicGrid(lang, groups),
    flatList: renderFlatList(lang, groups),
  };
}

function injectBetweenMarkers(html, name, replacement) {
  const re = new RegExp(
    `(<!--\\s*${name}:start\\s*-->\\n)([\\s\\S]*?)(\\n?\\s*<!--\\s*${name}:end\\s*-->)`
  );
  if (!re.test(html)) {
    throw new Error(`Markers ${name}:start/end not found — cannot inject.`);
  }
  return html.replace(re, (_, open, _old, close) => `${open}${replacement}\n${close}`);
}

function main() {
  const apply = process.argv.includes("--apply");
  const outputs = { en: renderLanguage("en"), es: renderLanguage("es") };

  if (!apply) {
    const draftsDir = path.join(ROOT, "docs", "drafts");
    fs.mkdirSync(draftsDir, { recursive: true });
    for (const lang of ["en", "es"]) {
      const preview =
        `<!-- PREVIEW ONLY — not injected into a live page. Generated by build-blog-listing.js --preview. -->\n\n` +
        `<!-- ===== Browse by topic ===== -->\n${outputs[lang].topicGrid}\n\n` +
        `<!-- ===== All articles ===== -->\n${outputs[lang].flatList}\n`;
      const outPath = path.join(draftsDir, `blog-listing-preview-${lang}.html`);
      fs.writeFileSync(outPath, preview);
      console.log(`Wrote ${path.relative(ROOT, outPath)}`);
    }
    console.log("\nPreview only — blog/index.html and blog/spanish/index.html were not touched.");
    return;
  }

  const targets = { en: path.join(ROOT, "blog", "index.html"), es: path.join(ROOT, "blog", "spanish", "index.html") };
  for (const lang of ["en", "es"]) {
    let html = fs.readFileSync(targets[lang], "utf8");
    html = injectBetweenMarkers(html, "blog-topics", outputs[lang].topicGrid);
    html = injectBetweenMarkers(html, "blog-articles", outputs[lang].flatList);
    fs.writeFileSync(targets[lang], html);
    console.log(`Applied to ${path.relative(ROOT, targets[lang])}`);
  }
}

main();
