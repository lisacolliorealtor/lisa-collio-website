#!/usr/bin/env node
/*
 * hash-util.js — single source of truth for the content-hash used in
 * cache-busting query strings (?v=HASH) across the site.
 *
 * Two independent scripts need to produce the SAME hash for the SAME file
 * bytes: hash-assets.js (which rewrites every hand-authored and marker-JSON
 * reference site-wide) and build-reviews.js (which generates review-card and
 * client-general img/source markup programmatically from a directory
 * listing, on every run). They get the same answer for free as long as both
 * call this function instead of each rolling their own — never duplicate
 * this logic in either script.
 *
 * sha256, first 8 hex characters. 8 hex chars = 32 bits = 1-in-4-billion
 * collision odds for two DIFFERENT files on a site with ~1,200 assets —
 * negligible. Short enough to stay unobtrusive in a URL.
 */

const fs = require("fs");
const crypto = require("crypto");

function hashFile(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 8);
}

module.exports = { hashFile };
