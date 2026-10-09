# CLAUDE.md: project context for Harraz Mohd Reza's portfolio

This file orients Claude Code (or any developer) working on this site. Read it
before making changes.

## What this is
The personal portfolio of **Harraz Mohd Reza**, a GIS and data-systems technologist.
Positioning: *"Location Intelligence is Business Intelligence."* He connects the
geographic, operational, and market data an organization already has into decisions
they can act on. Voice: confident, precise, warm, never hypey.

Site goals: land work (employment and consulting), establish presence, grow toward
his own business.

## How the site is built (read this first)
Content lives in one place. The root `*.html` files are **generated**. Never edit them by hand.

```
src/site.json        THE content model: person, nav, footer, phases, projects, notes,
                     credentials, page copy, and per-page metadata (title, description,
                     OG, robots, footnote). Project cards on Home and Work both read from here.
src/pages/*.html     Unique page bodies (case studies, about, contact, notes, moonshot, 404).
                     Home, Work, Notes, and How I work are generated entirely from site.json.
tools/build.mjs      Plain Node, zero dependencies. Writes root *.html and sitemap.xml.
tools/check-classes.mjs  Reports CSS classes used but unstyled (should be 0).
```

Workflow for any content or page change:
1. Edit `src/site.json` or the fragment in `src/pages/`.
2. Run `node tools/build.mjs`. It fails loudly on: a missing fragment, an unknown project
   link or accent, an em dash in site.json, or an in-page `#anchor` with no matching id.
3. If you changed `styles.css`, `main.js`, or `mindmap.js`, bump `site.assetVersion` in
   site.json so browsers fetch the new file.
4. Commit the source **and** the regenerated root files together.

Fragment `<style>` blocks are moved into the page head and `<script>` blocks are placed
after the shared scripts. `mindmap.js` loads only on pages with `"mindmap": true`.

`_config.yml` keeps `src/`, `tools/`, and the docs out of the published site. Do not delete it.

## Tech stack
- Plain HTML, CSS, JavaScript on GitHub Pages. The build script is the only tooling and
  needs nothing but Node. Do not add npm packages, bundlers, or frameworks.
- External dependency: Google Fonts (Archivo, Azeret Mono).

## Pages
```
index.html                 Home (hero, capability map, project cards, about, CTA)
work.html                  Case-study index
how-i-work.html            Full capability map on desktop, phase outline on phones
about.html, contact.html   About, contact (Formspree form)
notes.html + note-*.html   Field notes
case-study-*.html          Four case studies (routing, popups, cog, priority)
moonshot.html              Unlisted page for the X application (see voice exception)
404.html, robots.txt, sitemap.xml, CNAME, favicons, og-image.png
assets/contour.webp        Original contour texture behind every page (7% opacity)
```

## Design system
Tokens live in `:root` at the top of `styles.css`. Structure from "Instrument panel",
weight from "Survey sheet": rounded panels, pill nav, 2px ink rules, hard offset shadows,
heavy expanded Archivo headlines, Azeret Mono readouts.

- **Palette** (from the redesign deck): bg `#EAE6DA`, panel `#F4F1E8`, sink `#E2DDCF`,
  ink `#222A2A`, aqua `#4FBBBC`, heat `#F39120`, rust `#EC4624`, iron panels `#222A2A`.
- **Text on light backgrounds uses the text-safe accents** `--rust-text #A8361A` and
  `--aqua-text #1E6E6F`. Raw rust and aqua are fills only; they fail contrast as text.
  Every text/background pair passes WCAG AA. Re-check contrast if you add a pair.
- Old token names (`--bone`, `--orange`, `--screen-*`, `--c-a`...) are aliased to the
  new palette so inline styles in case-study fragments still resolve.
- **Hit areas:** every standalone control is at least 44px tall. Inline links in prose are exempt.
- Focus is a visible 2px+ outline everywhere. Keep it.
- `prefers-reduced-motion` is respected. Keep it.

## Common tasks
**Change copy on Home, Work, Notes, or How I work:** edit `src/site.json`, then build.

**Add a case study:** add an entry to `projects` and `pages` in site.json, write the body
in `src/pages/case-study-<slug>.html` (copy an existing one), add an icon in `ICONS` in
build.mjs if needed, then build. The card appears on Home and Work automatically.
Add a matching proof node to `mindmap.js` if it belongs on the capability map.

**Add a note:** add to `notes` and `pages` in site.json, write `src/pages/note-<slug>.html`, build.

## Contact details and email privacy (IMPORTANT)
- GitHub: `https://github.com/HMR88`. LinkedIn: `https://www.linkedin.com/in/harraz-mohd-reza-303634b6/`.
- **Email is PRIVATE. It must NEVER appear anywhere in this repo**: not in HTML, JS,
  comments, or commit messages. It lives only in the Formspree dashboard.
- The contact form posts to `https://formspree.io/f/xaqgrzqy`. Do not change it.
  Anti-spam: `_gotcha` honeypot, length caps, Formspree filtering.
- Resume is never downloadable. Available on request through the contact form.

## Content rules
- **No employer names.** Case studies are genericized. Keep it that way.
- Sample data is fictional and labeled as such in case-study footers. Keep those notes.
- Describe real outcomes. Don't inflate.

## Security posture
- Static site, no server, no database, no auth. Keep it that way.
- CSP meta tag on every page (written by build.mjs `head()`). Contact's connect-src adds
  formspree.io only. A new external resource needs a CSP change in build.mjs.
- External links get `rel="noopener noreferrer"` from main.js.
- GitHub Pages cannot send real headers. For HSTS or frame-ancestors, front with Cloudflare later.

## Hidden content
- **Credentials:** `credentials` in site.json has `"show": false`. Flip to `true` only when
  Harraz has substantial credentials to report (not consumer certificates).
- **moonshot.html:** `"unlisted": true`. noindex, absent from nav and sitemap. Keep it that way.

## Copy voice rules (all site text)
- NO em dashes anywhere: visible text, titles, labels, code comments. The build rejects
  them in site.json. Use commas, periods, colons, or "·".
- No "not X, but Y" constructions. No punchy fragments for drama. No clever aphorisms.
- Light contractions (it's, I'll); keep "I am" for weightier statements.
- Direct and confident. Hedging undersells.
- Harraz's idiom: "rest assured", "head on", "tried and true", "one and done",
  rhetorical questions, longer connected sentences, plain verbs.
- Locked phrases, never alter: "Location Intelligence is Business Intelligence." /
  "See the whole picture." / "Clarity from complexity."
- Most capability-map text in mindmap.js is Harraz's own writing. Only fix real typos,
  and confirm with him first. Exception: the `p_priority` node copy was drafted during
  the redesign and is awaiting his review.
- **EXCEPTION: `moonshot.html`.** Its copy is approved verbatim and is exempt from every
  rule above. Do not normalize or voice-pass it.

## Analytics (not enabled)
Privacy-friendly option: GoatCounter. Add its script tag and CSP entries in build.mjs
`head()` (script-src `https://gc.zgo.at`, connect-src `https://harrazmohdreza.goatcounter.com`).

## Open items
- [ ] Review the drafted `p_priority` capability-map copy in mindmap.js.
- [ ] Restore credentials once there is something substantial to show.
- [ ] Enable analytics.
- [ ] Review the drafted field note (`note-cog-iterations`).
