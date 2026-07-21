#!/usr/bin/env node
/*
 * build.js — single-source partial injector for the static site.
 *
 * Every page keeps the shared header/footer inline (so Netlify serves plain
 * committed HTML with no deploy-time build). This script expands the partials
 * in `components/` into each page between marker comments, in place. It is
 * IDEMPOTENT: re-running only refreshes the region between the markers, so you
 * edit a partial once and rebuild to update every page.
 *
 * Markers in a page:
 *   <!-- build:header {"esHref":"/es/terminos/"} -->
 *   ...(generated header — do not edit by hand)...
 *   <!-- endbuild:header -->
 *
 *   <!-- build:footer -->
 *   ...(generated footer)...
 *   <!-- endbuild:footer -->
 *
 * The JSON object after the partial name (optional) supplies template params.
 * Templates use {{key}} placeholders; unknown keys fall back to DEFAULTS.
 *
 * Usage:
 *   node build.js          # expand markers in all *.html pages
 *   node build.js --check  # verify pages are up to date (CI-friendly, no write)
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const COMPONENTS_DIR = path.join(ROOT, "components");

// Per-partial default template params.
const DEFAULTS = {
  esHref: "/es/", // "Hablo español" badge target; overridden per page via marker JSON
};

// Directories never scanned for pages.
const IGNORE_DIRS = new Set([".git", "node_modules", "components", "assets"]);

function loadPartials() {
  const partials = {};
  for (const name of ["header", "footer"]) {
    partials[name] = fs.readFileSync(
      path.join(COMPONENTS_DIR, `${name}.html`),
      "utf8"
    ).trimEnd();
  }
  return partials;
}

function render(template, params) {
  return template.replace(/\{\{\s*([\w]+)\s*\}\}/g, (_, key) => {
    if (params[key] != null) return String(params[key]);
    if (DEFAULTS[key] != null) return String(DEFAULTS[key]);
    return "";
  });
}

function expand(html, partials, file) {
  let changed = false;
  for (const name of Object.keys(partials)) {
    // <!-- build:NAME {json?} --> ... <!-- endbuild:NAME -->
    const re = new RegExp(
      `<!--\\s*build:${name}\\s*(\\{[\\s\\S]*?\\})?\\s*-->[\\s\\S]*?<!--\\s*endbuild:${name}\\s*-->`,
      "g"
    );
    html = html.replace(re, (match, jsonRaw) => {
      let params = {};
      if (jsonRaw) {
        try {
          params = JSON.parse(jsonRaw);
        } catch (e) {
          throw new Error(
            `Invalid JSON params for build:${name} in ${file}: ${e.message}`
          );
        }
      }
      const jsonComment = jsonRaw ? ` ${jsonRaw.trim()}` : "";
      const body = render(partials[name], params);
      const rebuilt =
        `<!-- build:${name}${jsonComment} -->\n` +
        `${body}\n` +
        `<!-- endbuild:${name} -->`;
      if (rebuilt !== match) changed = true;
      return rebuilt;
    });
  }
  return { html, changed };
}

function findHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      findHtmlFiles(path.join(dir, entry.name), acc);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

function main() {
  const check = process.argv.includes("--check");
  const partials = loadPartials();
  const files = findHtmlFiles(ROOT);
  let touched = 0;
  const stale = [];

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    if (!/<!--\s*build:(header|footer)/.test(original)) continue; // no markers
    const { html, changed } = expand(original, partials, file);
    const rel = path.relative(ROOT, file);
    if (html !== original) {
      if (check) {
        stale.push(rel);
      } else {
        fs.writeFileSync(file, html);
        touched++;
        console.log(`  updated ${rel}`);
      }
    }
  }

  if (check) {
    if (stale.length) {
      console.error(
        `Out of date (run \`npm run build\`):\n  - ${stale.join("\n  - ")}`
      );
      process.exit(1);
    }
    console.log("All pages are up to date.");
  } else {
    console.log(touched ? `Done. ${touched} file(s) updated.` : "Done. No changes.");
  }
}

main();
