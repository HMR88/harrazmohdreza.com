# CLAUDE.md — Project context for Harraz Mohd Reza's portfolio

This file orients Claude Code (or any developer) working on this site. Read it
before making changes.

## What this is
The personal portfolio of **Harraz Mohd Reza** — a GIS / data-systems technologist.
Positioning: *"Location Intelligence is Business Intelligence."* He connects the
geographic, operational, and market data an organization already has into decisions
they can act on. Voice: confident, precise, warm; not hypey.

Site goals: land work (employment + consulting), establish presence, grow toward
his own business.

## Tech stack — deliberately minimal
- **Plain HTML + CSS + JavaScript. No build tools, no framework, no bundler.**
- Only external dependency: Google Fonts (Anton, Hanken Grotesk, Space Mono).
- Static hosting (GitHub Pages / Cloudflare Pages). See `DEPLOY.md`.
- Keep it dependency-free unless there's a strong reason. Don't add npm/build steps.

## File structure
```
index.html                          Home
about.html                          About + working principles
work.html                           Case-study index
contact.html                        Contact (methods + mailto form)
case-study-routing-automation.html  Case 01 — Power Automate (live routing console)
case-study-arcgis-popups.html       Case 02 — ArcGIS Arcade popups (live population demo)
case-study-cog-tool.html            Case 03 — Network Center of Gravity tool
styles.css                          THE shared design system (single source of truth)
main.js                             Mobile nav toggle + footer year
mindmap.js                          Home-page capability map — RADIAL layout (center hub, expandable phases, hover-traced connections; self-renders into #capmap; phone outline fallback)
moonshot.html                       Unlisted campaign page for the X (moonshot factory) application
notes.html                          Notes/field-log index
note-directing-ai.html              Field note: directing AI (judgment & governance)
note-cog-iterations.html            Field note: thirteen iterations (COG build)
404.html, robots.txt, sitemap.xml   Infrastructure
favicon.svg / favicon-*.png         Brand favicons
og-image.png                        1200x630 social share card
DEPLOY.md                           Publishing guide
CLAUDE.md                           This file
```
Every page links `styles.css` and `main.js`. Change the look in **one** place: `styles.css`.

> Note: any `*_standalone.html` files or `harraz-site.zip` are **generated artifacts**
> for previewing/handoff — not the real site. The nine files above are the site.
> Don't hand-edit standalones; regenerate them if needed.

## Design system (the rules that matter)
Tokens live in `:root` at the top of `styles.css`.

- **Palette:** bone paper `#ECE6DA`, near-black ink `#17150F`, one vivid orange
  accent `#F26A1B` (deep `#C24B08`). That's it. Green/red/blue appear **only inside
  data visualizations** where they carry meaning — never as decoration.
- **Type:**
  - `--font-display` = **Anton** (heavy condensed). **Rationed on purpose.** Used only
    for the big hero headline on each page. Do NOT spread it across section headings.
  - `--font-head` = **Hanken Grotesk 600** for section headings and card titles
    (medium weight, restrained — this restraint is a hard-won decision, keep it).
  - `--font-body` = Hanken Grotesk for prose.
  - `--font-mono` = **Space Mono** for labels, eyebrows, coordinates, breadcrumbs, code.
- **Signature devices:** cartographic — faint coordinate grid (`.gridfield`),
  registration marks (`.xmark`), the hero graticule globe, monospace locator
  breadcrumbs (`.crumb`). Hard edges (no rounded corners) is intentional and technical.
- **Editorial restraint > visual noise.** Whitespace and hierarchy carry the design.
  If a change makes it louder or heavier, it's probably wrong.

## Common tasks

**Change a color or font:** edit the token in `:root` in `styles.css`. It propagates everywhere.

**Change the hero tagline/headline:** `index.html`, the `.hero` block near the top of `<main>`.

**Add a new case study:**
1. Copy an existing `case-study-*.html` as a template (routing = has an interactive
   console; cog = static narrative with stats; popups = live data demo).
2. Keep the shared header/nav, breadcrumb (`.crumb`), `.hero.study` (restrained title),
   stats band (`.stats`), and footer.
3. Add a matching card (`<a class="workcard">…`) to **both** `index.html` (Selected work)
   and `work.html`. Bump the index number.

**Reusable components in `styles.css`:** `.workcard`, `.stats/.stat`, `.steps/.step`,
`.principles/.principle` (editorial numbered rows), `.outcomes/.oc`, `.codeblock`,
`.meta`, `.marks`, `.skills/.skill`, `.crumb`, `.ctaband`, `.console` (routing),
`.popup-demo` (arcgis). Prefer reusing these over inventing new patterns.

## Contact details & email privacy (IMPORTANT)
- GitHub: `https://github.com/HMR88` ✓
- LinkedIn: `https://www.linkedin.com/in/harraz-mohd-reza-303634b6/` ✓
- **Email: PRIVATE by design. It must NEVER appear anywhere in this repo** — not in HTML, JS, comments, or commit messages. It lives only in the Formspree dashboard.
- The contact form POSTs to Formspree (`FORM_ENDPOINT` in contact.html's inline script), which forwards to Harraz's inbox. The endpoint ID is anonymous and reveals nothing.
- Anti-spam layers: hidden `_gotcha` honeypot (client-side check + Formspree server-side drop), input length caps, and Formspree's own filtering.
- **Status: LIVE.** Endpoint `https://formspree.io/f/xaqgrzqy` is wired into contact.html. The ID is anonymous (safe in a public repo); the destination email is configured only in the Formspree dashboard.

## Content rules
- **No employer names.** All case studies are genericized (e.g. "a global commercial
  real estate firm"). Keep it that way.
- Sample data is fictional and labeled as such in case-study footers. Keep those notes.
- Child-simple truth in copy: describe real outcomes, don't inflate.

## Accessibility / performance (keep these)
- `prefers-reduced-motion` is respected in `styles.css` — don't remove it.
- Interactive demos (routing console, population popup) must keep working with keyboard
  and have sensible fallbacks. Test after edits.
- No heavy assets; keep the site fast and self-contained.


## Security posture (keep these intact)
- Static site = minimal attack surface: no server code, no database, no auth. Keep it that way.
- **CSP meta tag** on every page restricts scripts/styles/fonts to self + Google Fonts. If adding a new external resource, extend the CSP or it will be blocked.
- **Email privacy**: the address appears NOWHERE in this repo (see Contact details section). All contact flows through the Formspree form. Never add a mailto: link or write the address anywhere.
- **Contact form**: POSTs privately to Formspree. Honeypot `_gotcha` (client + server side), length caps, inline status messaging. CSP connect-src on contact.html allows https://formspree.io only.
- **External links** get `rel="noopener noreferrer"` automatically via `main.js`.
- **HTTPS**: enforce in GitHub Pages settings (see DEPLOY.md). Note: GitHub Pages cannot send real HTTP response headers; meta-CSP is the practical maximum. For full headers (HSTS, X-Frame-Options / frame-ancestors), front the site with Cloudflare later.
- `robots.txt`, `sitemap.xml`, branded `404.html` present. `index.html` carries JSON-LD Person schema + OG/Twitter cards on all pages.

## Hidden sections
- **Credentials roadmap** (About page) is wrapped in `<template id="credentials-hidden">` — inert, not rendered. To restore when certifications are earned: delete the `<template>` and `</template>` wrapper lines.

## Analytics (to enable in Claude Code)
Privacy-friendly, no cookies, no consent banner needed. Recommended: GoatCounter (free) or Plausible (paid).
GoatCounter setup: (1) create account at goatcounter.com, pick a code e.g. `harrazmohdreza`;
(2) before `</body>` on every page add:
`<script data-goatcounter="https://harrazmohdreza.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`
(3) extend the CSP meta on every page: add `https://gc.zgo.at` to script-src and `https://harrazmohdreza.goatcounter.com` to connect-src.


## Copy voice rules (IMPORTANT: all site text must follow these)
Written to sound like Harraz, not AI-generated. Hard rules:
- NO em dashes anywhere in visible text, titles, labels, or code comments. Use commas, periods, colons, or the mono separator "·".
- No "not X, but Y" constructions. No punchy sentence fragments for drama. No clever aphorisms.
- Light contractions (it's, I'll); keep "I am" for weightier statements.
- Direct and confident. The site sells Harraz's services; hedging undersells.
- Harraz's natural idiom (from his own writing, use it): "rest assured", "head on", "tried and true", "one and done", rhetorical questions, longer connected sentences, plain verbs like leverage, incorporate, stress.
- Locked phrases, never alter: "Location Intelligence is Business Intelligence." / "See the whole picture." / "Clarity from complexity."
- Much of the capability-map (mindmap.js) text is Harraz's own writing from his review deck. Do not "improve" it; only fix real typos, and confirm with Harraz first.
- **EXCEPTION: `moonshot.html`.** This is a deliberate, intentional exception to every voice rule above (campaign page written for the X, the Moonshot Factory application). Its copy is approved verbatim and must NOT be normalized, softened, or voice-passed in future edits, including its "not X, but Y" constructions and short punchy sentences. The page is `noindex`, absent from the nav and from `sitemap.xml`; keep it that way.

## Current status / open items
- [x] GitHub, LinkedIn confirmed and applied; email fully private (form-only contact).
- [x] Contact form activated (Formspree endpoint wired in).
- [ ] Restore the credentials section (About) once first certification lands.
- [ ] Enable analytics (see Analytics section above).
- [ ] Review/approve the drafted field note (`note-cog-iterations.html`) — written in Harraz's voice from real project material; edit freely.
- [x] Favicons (favicon.svg + PNG fallbacks), OG share image (og-image.png, linked on all pages).
- [x] Notes section live (`notes.html` + first note); nav updated on all pages.
- [x] ALIC traits section on About (Adaptability · Learning · Ideation · Change).
- [x] Resume policy: never downloadable — available on request via contact (card on contact.html).
- [ ] Final tagline is set to "I bring clarity to the complexity." — open to riffing.
- [ ] Publish to harrazmohdreza.com (see `DEPLOY.md`).
- [x] Interactive capability map embedded on the home page (`mindmap.js`, `#capmap`); edit nodes/links in the data objects at the top of `mindmap.js`.
- [ ] Possible future: graticule/contour background texture applied more widely;
      more case studies; a real form backend (Formspree/Netlify Forms) instead of mailto.
