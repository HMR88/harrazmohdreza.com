// Lists classes used in the built pages that no stylesheet rule mentions,
// and stylesheet classes no page uses. Usage: node tools/check-classes.mjs
// Classes created at runtime by scripts are scanned from main.js, mindmap.js, and inline scripts.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const html = pages.map((f) => readFileSync(join(ROOT, f), 'utf8'));
const scripts = ['main.js', 'mindmap.js'].map((f) => readFileSync(join(ROOT, f), 'utf8'));

let css = readFileSync(join(ROOT, 'styles.css'), 'utf8');
for (const h of html) for (const m of h.matchAll(/<style>([\s\S]*?)<\/style>/g)) css += m[1];
css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, '');
const styled = new Set([...css.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)].map((m) => m[1]));

const used = new Set();
const grab = (s) => { for (const m of s.matchAll(/class=\\?["']([^"'\\]+)/g)) m[1].split(/\s+/).forEach((c) => c && used.add(c)); };
html.forEach(grab); scripts.forEach(grab);
for (const s of scripts) for (const m of s.matchAll(/classList\.(?:add|toggle|remove)\(\s*['"]([\w-]+)/g)) used.add(m[1]);
for (const h of html) for (const m of h.matchAll(/classList\.(?:add|toggle|remove)\(\s*['"]([\w-]+)/g)) used.add(m[1]);

// Hooks for scripts or semantics only, deliberately unstyled.
const hooks = new Set(['js-content', 'n-', 'nodes', 'links', 'box', 'chip', 'ln', 'cross', 'hidden', 'hl', 'peeking', 'peekshow', 'open', 'active', 'on', 'cur', 'now', 'cm-biz', 'cm-body', 'cm-desc', 'cm-kind', 'cm-title', 'foot__brand', 'is-mine', 'ms-st']);
const unstyled = [...used].filter((c) => !styled.has(c) && !hooks.has(c) && !/^n-/.test(c)).sort();
const unused = [...styled].filter((c) => !used.has(c)).sort();
console.log(`used ${used.size} classes, styled ${styled.size}`);
console.log(`used but unstyled (${unstyled.length}): ${unstyled.join(' ') || 'none'}`);
console.log(`styled but unused (${unused.length}): ${unused.join(' ') || 'none'}`);
process.exitCode = 0;
