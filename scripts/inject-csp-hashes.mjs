#!/usr/bin/env node
/**
 * Post-build step: walk every dist/*.html, compute SHA-256 of each inline
 * <script> (anything without a `src` attribute), then rewrite the
 * `{{SCRIPT_HASHES}}` token inside dist/_headers with a space-joined list of
 * 'sha256-XXX' source expressions.
 *
 * Why: a CSP that only allows external scripts via 'self' will block the
 * inline theme-init script (which has to run pre-paint to avoid FOUC) and the
 * tiny inline modules Astro emits for small component scripts. Hardcoding a
 * hash list rots whenever those scripts change; this keeps CSP self-healing.
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const HEADERS = join(DIST, '_headers');

const INLINE_SCRIPT_RE = /<script(?![^>]*\bsrc=)(?![^>]*\btype="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;

async function* walkHtml(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    const s = await stat(path);
    if (s.isDirectory()) yield* walkHtml(path);
    else if (name.endsWith('.html')) yield path;
  }
}

const hashes = new Set();
let scriptCount = 0;

for await (const file of walkHtml(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const m of html.matchAll(INLINE_SCRIPT_RE)) {
    scriptCount++;
    const body = m[1];
    const sha = createHash('sha256').update(body, 'utf8').digest('base64');
    hashes.add(`'sha256-${sha}'`);
  }
}

const sorted = [...hashes].sort();
const token = sorted.join(' ');

let headers;
try {
  headers = await readFile(HEADERS, 'utf8');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.warn(`[inject-csp-hashes] no ${relative(ROOT, HEADERS)} found — skipping. Add public/_headers to enable CSP.`);
    process.exit(0);
  }
  throw err;
}

if (!headers.includes('{{SCRIPT_HASHES}}')) {
  console.warn(`[inject-csp-hashes] {{SCRIPT_HASHES}} token not found in _headers; CSP is unchanged.`);
  process.exit(0);
}

const next = headers.replaceAll('{{SCRIPT_HASHES}}', token);
await writeFile(HEADERS, next, 'utf8');

console.log(
  `[inject-csp-hashes] injected ${sorted.length} unique script hash${sorted.length === 1 ? '' : 'es'} ` +
  `(found ${scriptCount} inline <script> occurrence${scriptCount === 1 ? '' : 's'} across pages).`
);
for (const h of sorted) console.log(`  ${h}`);
