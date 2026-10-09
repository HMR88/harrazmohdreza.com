// Builds the static site from src/site.json + src/pages/*.html.
// Usage (from the repo root): node tools/build.mjs
// Output: one .html per page in the repo root, plus sitemap.xml. No dependencies.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const D = JSON.parse(readFileSync(join(ROOT, 'src/site.json'), 'utf8'));
const V = D.site.assetVersion;

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fail = (msg) => { console.error('build: ' + msg); process.exit(1); };

// ---- boundary checks: catch content mistakes before they ship ----
const slugs = new Set(D.pages.map((p) => p.slug));
for (const p of D.pages) {
  if (p.template === 'fragment' && !existsSync(join(ROOT, 'src/pages', p.slug + '.html'))) fail(`missing src/pages/${p.slug}.html`);
  if (!p.title) fail(`page ${p.slug} has no title`);
}
for (const pr of D.projects) {
  if (!slugs.has(pr.href.replace('.html', ''))) fail(`project ${pr.id} links to unknown page ${pr.href}`);
  if (!['aqua', 'heat', 'rust', 'ink'].includes(pr.accent)) fail(`project ${pr.id} has unknown accent ${pr.accent}`);
}
const dash = JSON.stringify(D).match(/[^\x00-\x7F]*—[^\x00-\x7F]*/);
if (dash) fail('em dash found in site.json (voice rule)');

// ---- icons: original line icons, 24x24, stroke = currentColor ----
const ICONS = {
  routing: '<path d="M2.5 12h6.5l4.5-6h8M9 12l4.5 6h8M18.5 3l3 3-3 3M18.5 15l3 3-3 3"/>',
  popups: '<path d="M8 21s-5.5-5-5.5-9.5a5.5 5.5 0 0 1 11 0C13.5 16 8 21 8 21z"/><circle cx="8" cy="11.5" r="2"/><path d="M17 15v-4M19.5 15V7M22 15v-6"/>',
  cog: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4"/><circle cx="4.5" cy="5" r=".9"/><circle cx="19.5" cy="6" r=".9"/><circle cx="5.5" cy="19" r=".9"/><circle cx="18.5" cy="18.5" r=".9"/>',
  priority: '<path d="M4 6h16M4 10.5h12M4 15h8M4 19.5h4"/>',
  discover: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l6 6M8 10.5h5M10.5 8v5"/>',
  design: '<path d="M4 20V4l16 16z"/><path d="M8 16v-3.5l3.5 3.5z"/>',
  build: '<rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/><rect x="8" y="3" width="8" height="8"/>',
  operate: '<path d="M3.5 16.5a8.5 8.5 0 0 1 17 0"/><path d="M12 16.5l4-6"/><path d="M3.5 20h17"/>',
  note: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>'
};
const icon = (k) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;
const MARK = `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="1.5" y="1.5" width="29" height="29" rx="8"/><path d="M7 21c3-1.5 4-6 8.5-6S21 19 25 17"/><circle cx="16" cy="10" r="2.6"/></svg>`;

// ---- shared chrome ----
function head(p, extraHead) {
  const url = p.canonical || `${D.site.origin}/${p.slug === 'index' ? '' : p.slug + '.html'}`;
  const connect = p.formspree ? "'self' https://formspree.io" : "'self'";
  const csp = `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src ${connect}; object-src 'none'; base-uri 'self'; form-action 'self'`;
  const robots = p.noindex ? 'noindex' : (p.unlisted ? 'noindex,follow' : p.robots);
  const ogTitle = p.ogTitle || p.title;
  const ogDesc = p.ogDescription || p.description;
  const social = p.noindex ? '' : `
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${esc(p.ogType || 'website')}">
<meta property="og:site_name" content="${esc(D.person.name)}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(D.site.ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(D.site.ogImage)}">
<meta name="twitter:title" content="${esc(ogTitle)}">
<meta name="twitter:description" content="${esc(ogDesc)}">`;
  const jsonld = p.jsonld ? `
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: D.person.name, url: D.site.origin, ...D.person.jsonld, sameAs: [D.person.github, D.person.linkedin] })}</script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
${p.description ? `<meta name="description" content="${esc(p.description)}">\n` : ''}<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
${robots ? `<meta name="robots" content="${esc(robots)}">\n` : ''}<meta name="theme-color" content="#EAE6DA">${social}
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="favicon-48.png" type="image/png">
<link rel="apple-touch-icon" href="favicon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Azeret+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css?v=${V}">${jsonld}${extraHead}
</head>`;
}

function header(p) {
  const links = D.nav.map((n) => `<a href="${n.href}"${p.section === n.section ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('\n      ');
  return `<body>
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <div class="wrap"><div class="topbar__inner">
    <a href="index.html" class="wordmark">${MARK}<span>${esc(D.person.name)}</span></a>
    <button class="navtoggle" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Primary">
      ${links}
      <a href="${D.cta.href}" class="nav__cta">${esc(D.cta.label)}</a>
    </nav>
  </div></div>
</header>`;
}

function footer(p) {
  const links = [...D.nav.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`),
    `<a href="${D.person.github}">GitHub</a>`, `<a href="${D.person.linkedin}">LinkedIn</a>`].join('');
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__inner">
      <div class="foot__brand"><p class="foot__name">${esc(D.person.name)}</p><p class="foot__line">${esc(D.footer.line)}</p></div>
      <nav class="foot__nav" aria-label="Footer">${links}</nav>
    </div>
    <div class="foot__base">
      <span>© <span data-year>2026</span> ${esc(D.person.name)} · ${esc(D.footer.domain)}</span>
      ${p.footnote ? `<span>${esc(p.footnote)}</span>` : ''}
      <span>${esc(D.footer.signoff)}</span>
    </div>
  </div>
</footer>`;
}

// ---- shared components ----
const statsDl = (stats) => `<dl class="readout">${stats.map((s) => `<div><dt>${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`).join('')}</dl>`;

function projectCard(pr, level = 3) {
  return `<li><a class="pcard" href="${pr.href}">
    <span class="pcard__top">${icon(pr.id)}<span class="dot dot--${pr.accent}" aria-hidden="true"></span></span>
    <h${level} class="pcard__title">${esc(pr.title)}</h${level}>
    <p class="pcard__desc">${esc(pr.summary)}</p>
    <span class="pills" aria-label="Tools">${pr.tools.map((t) => `<span>${esc(t)}</span>`).join('')}</span>
    <span class="pcard__foot">${statsDl(pr.stats)}<span class="pcard__go">Read the case study</span></span>
  </a></li>`;
}

const ctaPanel = (title, body, button, id) => `
  <section class="section" aria-labelledby="${id}"><div class="wrap"><div class="ctapanel">
    <div><h2 id="${id}">${esc(title)}</h2><p>${esc(body)}</p></div>
    <a class="btn btn--accent" href="${D.cta.href}">${esc(button)}</a>
  </div></div></section>`;

const pageHero = (kicker, title, intro) => `
  <section class="phero"><div class="wrap">
    <p class="kicker">${esc(kicker)}</p>
    <h1>${esc(title)}</h1>
    <p class="deck">${esc(intro)}</p>
  </div></section>`;

// ---- page templates ----
const T = {
  home(p) {
    const H = D.home;
    const tabs = D.phases.map((ph, i) => `<button type="button" role="tab" id="tab-${ph.id}" aria-controls="panel-${ph.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(ph.name)}</button>`).join('');
    const panels = D.phases.map((ph, i) => `<div class="phasesel__panel" role="tabpanel" id="panel-${ph.id}" aria-labelledby="tab-${ph.id}"${i ? ' hidden' : ''}>${icon(ph.id)}<div><p class="phasesel__n">Phase ${i + 1} of ${D.phases.length}</p><h3>${esc(ph.name)}</h3><p>${esc(ph.text)}</p></div></div>`).join('');
    return `
  <section class="hero"><div class="wrap"><div class="hero__panel">
    <p class="kicker">${esc(D.person.roles)}</p>
    <h1>${esc(H.lead)} <span class="o">${esc(H.rest)}</span></h1>
    <div class="hero__foot">
      <div><p class="hero__tag">${esc(H.tagline)}</p><p class="hero__support">${esc(H.support)}</p></div>
      <div class="actions"><a class="btn btn--solid" href="${H.primary.href}">${esc(H.primary.label)}</a><a class="btn btn--ghost" href="${H.secondary.href}">${esc(H.secondary.label)}</a></div>
    </div>
  </div></div></section>

  <section class="section" aria-labelledby="h-phases"><div class="wrap">
    <h2 id="h-phases">${esc(H.phasesTitle)}</h2>
    <p class="lede"><span class="only-wide">${esc(H.phasesIntro)}</span><span class="only-narrow">${esc(H.phasesPhoneIntro)}</span></p>
    <div class="capmap capmap--home" id="capmap"><noscript><p class="noscript">The interactive map needs JavaScript. The four phases are listed on the How I work page.</p></noscript></div>
    <div class="phasesel only-narrow">
      <div class="phasesel__tabs" role="tablist" aria-label="Delivery phases">${tabs}</div>
      ${panels}
    </div>
    <p class="maplink"><a href="how-i-work.html">${esc(H.mapLink)}</a></p>
  </div></section>

  <section class="section" aria-labelledby="h-work"><div class="wrap">
    <div class="sechead"><h2 id="h-work">${esc(H.workTitle)}</h2><a class="textlink" href="work.html">${esc(H.workLink)}</a></div>
    <ul class="pgrid">${D.projects.map((pr) => projectCard(pr)).join('')}</ul>
  </div></section>

  <section class="section" aria-labelledby="h-about"><div class="wrap"><div class="aboutpanel">
    <h2 id="h-about">${esc(H.aboutTitle)}</h2>
    <div><p>${esc(H.aboutBody)}</p><a class="textlink" href="about.html">${esc(H.aboutLink)}</a></div>
  </div></div></section>
${ctaPanel(H.ctaTitle, H.ctaBody, H.ctaButton, 'h-cta')}`;
  },

  work() {
    const W = D.workPage;
    return `${pageHero(W.kicker, W.title, W.intro)}
  <section class="section section--tight" aria-label="Case studies"><div class="wrap">
    <ul class="pgrid">${D.projects.map((pr) => projectCard(pr, 2)).join('')}</ul>
    <p class="outro">${esc(W.outro)}</p>
  </div></section>
${ctaPanel(W.ctaTitle, W.ctaBody, W.ctaButton, 'h-cta')}`;
  },

  notes() {
    const N = D.notesPage;
    return `${pageHero(N.kicker, N.title, N.intro)}
  <section class="section section--tight" aria-label="Field notes"><div class="wrap">
    <ul class="nlist">${D.notes.map((n) => `<li><a class="ncard" href="${n.href}">${icon('note')}<span><h2 class="ncard__title">${esc(n.title)}</h2><span class="ncard__meta">${esc(n.topics)}</span><span class="ncard__desc">${esc(n.summary)}</span></span><span class="pcard__go">Read the note</span></a></li>`).join('')}</ul>
    <p class="outro">${esc(N.outro)}</p>
  </div></section>
${ctaPanel(N.ctaTitle, N.ctaBody, N.ctaButton, 'h-cta')}`;
  },

  how() {
    const P = D.howPage;
    return `
  <section class="phero"><div class="wrap">
    <p class="kicker">${esc(P.kicker)}</p>
    <h1>${esc(P.title)}</h1>
    <p class="deck"><span class="only-wide">${esc(P.intro)}</span><span class="only-narrow">${esc(P.phoneIntro)}</span></p>
  </div></section>
  <section class="section section--tight" aria-labelledby="h-map"><div class="wrap">
    <h2 class="sr" id="h-map">Capability map</h2>
    <div class="capmap capmap--full" id="capmap"><noscript><p class="noscript">The interactive map needs JavaScript.</p></noscript></div>
    <ol class="phaselist">${D.phases.map((ph) => `<li>${icon(ph.id)}<div><h2>${esc(ph.name)}</h2><p>${esc(ph.text)}</p></div></li>`).join('')}</ol>
  </div></section>
${ctaPanel(D.home.ctaTitle, D.home.ctaBody, D.home.ctaButton, 'h-cta')}`;
  },

  fragment(p) {
    return readFileSync(join(ROOT, 'src/pages', p.slug + '.html'), 'utf8');
  }
};

// ---- assemble ----
for (const p of D.pages) {
  let body = T[p.template](p);
  // Page-scoped <style> belongs in <head>; page <script> runs after shared scripts.
  const styles = [], scripts = [];
  body = body.replace(/<style>[\s\S]*?<\/style>\n?/g, (m) => { styles.push(m.trim()); return ''; });
  body = body.replace(/<script>[\s\S]*?<\/script>\n?/g, (m) => { scripts.push(m.trim()); return ''; });
  const shared = [`<script src="main.js?v=${V}"></script>`];
  if (p.mindmap) shared.push(`<script src="mindmap.js?v=${V}"></script>`);
  const html = `${head(p, styles.length ? '\n' + styles.join('\n') : '')}
${header(p)}
<main id="main">
${body.trim()}
</main>
${footer(p)}
${[...shared, ...scripts].join('\n')}
</body>
</html>
`;
  if (/—/.test(html.replace(/<script>[\s\S]*?<\/script>/g, '').replace(/>—</g, '><'))) {
    console.warn(`warn: ${p.slug}.html contains an em dash outside script placeholders`);
  }
  for (const [, id] of html.matchAll(/href="#([\w-]+)"/g)) {
    if (!new RegExp(`id="${id}"`).test(html)) fail(`${p.slug}.html links to #${id}, but no element has that id`);
  }
  writeFileSync(join(ROOT, p.slug + '.html'), html);
}

// ---- sitemap from the same data ----
const urls = D.pages.filter((p) => p.sitemap && !p.unlisted && !p.noindex).map((p) =>
  `  <url><loc>${D.site.origin}/${p.slug === 'index' ? '' : p.slug + '.html'}</loc><priority>${p.sitemap.toFixed(1)}</priority></url>`);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`built ${D.pages.length} pages, ${urls.length} sitemap entries`);
