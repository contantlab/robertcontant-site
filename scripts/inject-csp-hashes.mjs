#!/usr/bin/env node
/**
 * Verify (and optionally sync) the inline-script SHA-256 hashes in
 * `public/_headers` against what `astro build` actually emits into dist/*.html.
 *
 * Why bake into public/ instead of injecting into dist/ post-build:
 *   wrangler's static-asset deploy step on Cloudflare re-copies files at
 *   deploy time, which silently undoes any post-`astro build` modifications
 *   to `dist/_headers`. Baking the hashes into the source file (`public/_headers`)
 *   sidesteps that. The trade-off is that hashes drift when inline scripts
 *   change — this script's job is to catch that drift loudly.
 *
 * Modes:
 *   (default — runs from `npm run build`)
 *       Verify mode. Walk dist/*.html, compute SHA-256 of every inline
 *       <script>, confirm each one is listed in public/_headers' CSP.
 *       Exit non-zero on drift with a clear diff and remediation hint.
 *
 *   --sync (from `npm run headers:sync`)
 *       Re-bake mode. Same hash computation, but rewrite the CSP line in
 *       public/_headers with the freshly computed list. Commit the result.
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const HEADERS_SRC = join(ROOT, 'public', '_headers');

const INLINE_SCRIPT_RE =
  /<script(?![^>]*\bsrc=)(?![^>]*\btype="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;
const HASH_TOKEN_RE = /'sha256-[A-Za-z0-9+/=]+'/g;

const isSync = process.argv.includes('--sync');

async function* walkHtml(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    const s = await stat(path);
    if (s.isDirectory()) yield* walkHtml(path);
    else if (name.endsWith('.html')) yield path;
  }
}

// Compute the set of hashes actually present in the built HTML.
const actual = new Set();
let occurrences = 0;
try {
  for await (const file of walkHtml(DIST)) {
    const html = await readFile(file, 'utf8');
    for (const m of html.matchAll(INLINE_SCRIPT_RE)) {
      occurrences++;
      const sha = createHash('sha256').update(m[1], 'utf8').digest('base64');
      actual.add(`'sha256-${sha}'`);
    }
  }
} catch (err) {
  if (err.code === 'ENOENT') {
    console.warn(`[csp-hashes] no dist/ to verify against — skipping (run \`astro build\` first).`);
    process.exit(0);
  }
  throw err;
}

const headers = await readFile(HEADERS_SRC, 'utf8');
const baked = new Set(headers.match(HASH_TOKEN_RE) ?? []);

const missing = [...actual].filter((h) => !baked.has(h)).sort();
const extra   = [...baked].filter((h) => !actual.has(h)).sort();
const inSync  = missing.length === 0 && extra.length === 0;

if (isSync) {
  if (inSync) {
    console.log(`[csp-hashes] already in sync (${actual.size} unique hash${actual.size === 1 ? '' : 'es'} across ${occurrences} inline-script occurrence${occurrences === 1 ? '' : 's'}). No changes.`);
    process.exit(0);
  }
  // Replace the run of 'sha256-...' tokens on the CSP line with the freshly computed list.
  const sorted = [...actual].sort();
  const newList = sorted.join(' ');
  // Find the line containing Content-Security-Policy and rewrite script-src.
  const next = headers.replace(
    /(script-src 'self')((?:\s+'sha256-[A-Za-z0-9+/=]+')*)/,
    `$1 ${newList}`
  );
  if (next === headers) {
    console.error(`[csp-hashes] could not find script-src self section in ${relative(ROOT, HEADERS_SRC)} — aborting.`);
    process.exit(1);
  }
  await writeFile(HEADERS_SRC, next, 'utf8');
  console.log(`[csp-hashes] synced ${sorted.length} hash${sorted.length === 1 ? '' : 'es'} into ${relative(ROOT, HEADERS_SRC)}:`);
  for (const h of sorted) console.log(`  ${h}`);
  console.log(`\nReview the diff and commit ${relative(ROOT, HEADERS_SRC)}.`);
  process.exit(0);
}

// Default: verify mode.
if (inSync) {
  console.log(`[csp-hashes] OK — ${actual.size} unique hash${actual.size === 1 ? '' : 'es'} match across ${occurrences} inline-script occurrence${occurrences === 1 ? '' : 's'}.`);
  process.exit(0);
}

console.error(`[csp-hashes] DRIFT — public/_headers is out of date with the built scripts.`);
if (missing.length) {
  console.error(`\n  Missing from public/_headers (HTML has them, header doesn't allow them):`);
  for (const h of missing) console.error(`    + ${h}`);
}
if (extra.length) {
  console.error(`\n  Stale in public/_headers (header allows them, no inline script matches):`);
  for (const h of extra) console.error(`    - ${h}`);
}
console.error(`\n  Fix: run \`npm run headers:sync\`, review the change, commit it.`);
process.exit(1);
