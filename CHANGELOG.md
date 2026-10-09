# Redesign change log

Base: commit `76f8598` (the live site as of the redesign). Direction: "Instrument panel" (B)
structure with the weight of "Survey sheet" (C), chosen by Harraz after three working prototypes.

Each change names the principle behind it.

## 1. Structure and content model

**One content file plus a build script.** `src/site.json` now holds every shared fact: the
person, nav, footer, phases, the four projects, notes, credentials, page copy, and per-page
metadata. `tools/build.mjs` (plain Node, no dependencies) writes the root HTML and the sitemap.
*Principle: model the domain.* Before this, each project card existed in three places and
had drifted: the Work page descriptions no longer matched Home. Now there is one summary per
project and both pages read it.

**The build checks its own boundaries.** It fails on a missing page fragment, a project link
or accent that doesn't exist, an em dash in site.json, or an in-page `#anchor` with no target.
Each failure mode was tested by feeding it bad input. *Principle: prove it works.*

**Generated pages:** Home, Work, Notes, and the new How I work page are built entirely from
site.json. The other ten pages keep their unique bodies in `src/pages/`.

**`_config.yml`** keeps `src/`, `tools/`, and the docs out of the published site.

## 2. Subtractions

| Removed | Why | Principle |
|---|---|---|
| Duplicated project copy in three places | Replaced by one entry per project in site.json | Subtract before you add |
| Full capability map on the phone home page | It was the main reason Home was 11,833px tall on a phone. Phones now get four phase tabs; the full map moved to How I work | Experience first |
| Uppercase eyebrows ("SELECTED WORK", "WORK · SELECTED CASE STUDIES", "NOTES · FIELD LOG") | Shouting labels above headings that already say the same thing | Subtract before you add |
| "Data viz" tag on the popups card | It is a topic, not a tool. Cards now list tools only | Model the domain |
| Credentials `<template>` in about.html | Replaced by `credentials.show: false` in site.json. Same content, one switch | Model the domain |
| Old fonts (Anton, Hanken Grotesk, Space Mono) | Replaced by two families: Archivo and Azeret Mono | Subtract before you add |
| `styles.css` | 43.3KB to 35.2KB while covering more components | Subtract before you add |
| Hex colors hard-coded inside mindmap.js | The map now takes every color from CSS | Model the domain |

Home on a 375px phone went from 11,833px to 5,162px.

## 3. Design

- **Palette from the deck, all five colors used.** Bone, ink, aqua, heat, rust, plus iron
  panels for readouts. Every text and background pair was checked for WCAG AA. Raw rust and
  aqua fail as text on the light background, so text uses darker variants (`#A8361A`,
  `#1E6E6F`) and the bright ones stay as fills. *Principle: prove it works.*
- **B's structure:** rounded panels, pill nav, readout strips on cards, a phone phase
  selector. **C's weight:** heavy expanded Archivo, 2px ink rules, hard offset shadows.
  *Principle: exhaust the design space* (three directions built and judged in the browser
  before one was chosen).
- **Original geospatial texture.** A contour field generated from synthetic terrain, at 7%
  opacity behind every page. No stock imagery.
- **Card widgets with icons.** Each project card has a line icon, its tools as pills, and a
  two-stat readout.
- **New mark.** The favicon, nav mark, and share card were redrawn in the new system
  (aqua tile, contour line, rust point). The ESTD badge and year were left out, as asked.
- **Case-study components re-skinned**, not rewritten: consoles, flows, code blocks,
  outcomes, the popup demo. The priority dashboard tiers now use the palette (aqua, heat,
  light rust, stop) with bordered inactive states instead of faded ones, which had failed contrast.
- **The moonshot page** got the new shell and type. Its copy is unchanged. Its section
  labels moved from tracked capitals to sentence case to match the rest of the site.

## 4. New page: How I work

The full interactive capability map now lives here, with the phase outline for phones.
Home keeps a compact map on desktop and phase tabs on phones, with a link to the full page.
*Principle: experience first.* The map is the most distinctive thing on the site, but on a
phone it was a long accordion between the hero and the work.

The map gained a proof node for the Priority dashboard (case 04), which was missing.
**Its copy is a draft written during the redesign and needs Harraz's review** (`p_priority`
in mindmap.js).

## 5. Accessibility and behavior

- **Phase tabs** follow the WAI-ARIA tabs pattern: arrow keys, Home, End.
- **Menu** closes with Escape and returns focus to the toggle.
- **Visible 2px focus outline** on every focusable element.
- **44px hit areas** on every standalone control (nav, footer, breadcrumbs, tabs, selects,
  demo buttons). Inline links in prose are exempt, as WCAG 2.5.8 allows.
- **Reduced motion: bug fixed.** The old `prefers-reduced-motion` block was malformed and
  disabled transitions for everyone, not only for people who asked. It now applies correctly.
- **Heading order** fixed on How I work (phone): added a screen-reader heading so the page
  no longer jumps from h1 to h3.
- **Skip link** to main content on every page.

## 6. Bugs found in the live site and fixed

- **`#logic` links went nowhere.** The routing and priority case studies linked to `#logic`
  but no element had that id. Ids added, and the build now rejects any in-page link without a target.
- **Reduced motion** (above).
- **Work card descriptions had drifted** from the Home versions (above).

## 7. Correction to my own Phase 1 report

I said `.DS_Store` was still tracked in the repo. That was wrong. Commit `c76f6fe` had
already removed it. I misread the command output.

## 8. Content removed or reworded (from the automated text diff)

A script read every visible sentence on the old site and searched for it on the new one.
13 are absent. All are deliberate:

| Old text | What happened |
|---|---|
| "How I deliver." | Kept as the heading "How I deliver" (no period) |
| "Click a phase to expand it, and hover any capability to trace its connections." | Same instruction now on How I work: "Click a phase to expand it, then hover any capability to trace what it connects to across the others." |
| "Every project I take on runs through four phases: Discover, Design, Build, and Operate." | Now "Every project I take on runs through four phases." The tabs name the phases |
| "Expand any one of them, then hover over a capability to see everything it connects to across the others." | Home desktop now says "Hover any capability on the map to see what it connects to across the others." |
| "SELECTED WORK", "WORK · SELECTED CASE STUDIES", "NOTES · FIELD LOG" | Uppercase eyebrows removed (section 2) |
| Four Work page card descriptions (routing, router line, popups, cog) | Replaced by the single canonical summary per project |
| "Data viz" | Tag removed (section 2) |
| "© 2026 Harraz Mohd Reza · Built to connect." (moonshot) | Both parts still present in the shared footer, on separate lines |

Nothing else from the old site was dropped. "Built to connect." was briefly lost during the
build and the diff caught it; it is restored.

## 9. Deck items marked keep

| Deck item | Where it is |
|---|---|
| Five-color palette | All five in use (section 3) |
| Subtle, original geospatial background | Contour texture at 7% |
| Thermostat-style panels and readouts | Iron readout panels on cards and consoles |
| Card widgets with icons | Project, note, and phase cards |
| Neo-brutalist rules: visible focus, 44px hit areas, consistent spacing, limited radii | All applied and tested |
| Paper grain and the round badge | **Not carried.** They belonged to prototype A. B was chosen, and its nav mark fills the badge's role. Say the word and the grain can be added at low opacity |

## 10. Credentials

Kept in site.json with `"show": false`. Nothing renders. Flip it when there is something
substantial to show.

## 11. Evidence (run on the final build)

- **Crawl:** 14 pages at 375px and 1280px, 28 runs. 0 console errors, 0 failed requests,
  0 horizontal scroll, one h1 per page, 0 heading skips, 0 broken internal links,
  0 images without alt, 0 axe WCAG 2 A/AA violations.
- **Behavior:** 25 of 25 checks pass. Keyboard order and focus, skip link, map expand and
  detail panel, phone tabs by keyboard, menu by keyboard, How I work map and outline,
  routing console, priority classifier (all four tiers), popup demo, moonshot risk ledger
  and noindex, contact form posting to the unchanged Formspree endpoint (intercepted, nothing sent).
- **Hit areas:** all 14 pages, every standalone control at 44px or taller at 375px.
- **CSS coverage:** 0 classes used without a style.
- **Privacy:** no email address anywhere in the build except example.com demo data.
- **Em dashes:** none in site copy. The only ones left are placeholder dashes inside the
  demo scripts (shown before a value loads).

## 12. Not verified

- Jekyll honoring `_config.yml` exclude on the live GitHub Pages build. Check that
  `harrazmohdreza.com/src/site.json` returns 404 after deploy.
- Real Formspree delivery. The form was tested against an intercepted request only.
- Safari, Firefox, and real phones. All testing used Chromium.
- How LinkedIn and other platforms render the new share card.
