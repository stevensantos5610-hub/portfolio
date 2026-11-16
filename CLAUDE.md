# Steven Santos — Portfolio (second site, new layout)

**This is the user's SECOND website. It does not replace the original.**

- **Live URL:** https://stevensantos5610-hub.github.io/portfolio/ (the user puts this link on resumes)
- **Repo:** github.com/stevensantos5610-hub/portfolio (SSH remote `origin`). GitHub Pages serves the `main` branch root, so pushing to `main` is the whole deploy. Takes about 30 to 90 seconds.
- **History:** started on 2026-11-15 as a local-only copy of the original site to try a new layout. The same day the user asked for a link "to use this on resume" and to keep the original up, so it was published as its own repo. The local folder is still named `personal-website-test`.
- **The original site is separate and stays up:** repo `personal-website`, live at https://stevensantos5610-hub.github.io/personal-website/, local folder `Desktop/personal-website/`. That folder's `CLAUDE.md` is the source of truth for it. Never overwrite it with this layout unless the user asks.
- **Which site an edit goes to:** the user has two sites now. If a request says "my website" without saying which, ask or go by context. Content edits are not mirrored between the two automatically; offer to apply them to both.
- **Pushing:** on 2026-11-15 the user said to check that things work and then push to go live, and to make sure the original site still works and is never deleted. So: verify an edit locally, push to `main`, confirm the live page updated, and confirm the original site still returns 200.
- **Old resume PDF is deliberately not in this repo** (the user tailors a resume per job). Don't add it back.
- **Local-only branch `local-history`** holds the pre-publish commits, including the baseline copy of the original site with the bird feature. Don't push it: it contains the old resume PDF.

Personal CV/portfolio site for Steven Santos (CS student at UMass Boston).
Plain HTML/CSS/JS, no build step, no framework, no dependencies.

## Local dev

```bash
python3 -m http.server 8421 --directory .
```
Then preview at `http://localhost:8421` (the live site's copy uses 8420, so both can
run side by side). **Known gotcha:** this server sends no cache headers, so the browser aggressively caches `js/main.js` and `css/styles.css` across reloads even when the files change on disk — a plain reload can silently serve stale JS/CSS. Cache-bust with a query string (`?v=timestamp`) or hard-reload; when testing via automated tooling, fetch with `cache: 'no-store'` and `eval()` the result if a reload alone doesn't pick up changes. This is purely a local-server artifact — real visitors and GitHub Pages' CDN don't have this problem.

## File structure

- `index.html` — single page, all sections
- `css/styles.css` — single stylesheet, organized in commented sections matching page sections (search for `/* ---------- SectionName ---------- */`)
- `js/main.js` — single IIFE, one concern per named block (footer year, nav toggle, header hairline, photo lightbox)
- `assets/images/` — photos + custom SVGs. `hero.jpg` (Lake Coatepeque), `topo-pattern.svg` and `mountain-hero.svg` are not used by this layout; they are kept in case the user wants them back.
- `assets/video/` — two muted, controls-enabled `<video>` clips

## Design system (test layout, built 2026-11-15)

The user supplied a PDF of a corporate landing page as the layout reference (dark page, bold
two-line headline, grid of cards with a blue title bar over a dark body, a slanted button,
then a light band of image cards and a dark footer) and asked for a similar layout with the
same contents as the live page. Only the layout was borrowed: no names, logos or copy.

- **Palette** (tokens at the top of `styles.css`): `--ink #17191E` page, `--panel #272A31` card body, `--blue #1B52C4` (Salvadoran flag blue, lifted slightly so it reads on dark), `--blue-deep #1749B0` for headings on light bands, `--sky #BCD8F8` for labels, underlines and markers, `--paper #F5F7FB` light bands. The old green accent is not used here.
- **Typography:** Red Hat Display (800 for the hero, 500 for card titles, 400 for the large section headings) + Source Sans 3 (body). Sentence case everywhere; no uppercase tracked-out kickers.
- **Signature motif: the slant** (`--slant: -20deg`). Hero bars are blue / white / blue, the stripes of El Salvador's flag. The same slant is reused for `.btn` (skewed `::before` so the label stays upright) and the `.ticks` list markers. Don't add other decoration.
- **Layout rule:** cards span the full `.wrap` container; headings and text blocks add `.narrow`, which indents them further on desktop (`--inset`). That stagger comes from the reference.
- **Page order and zones:** hero → about cards → experience → testimonial (all dark) → "Some of our work" (light band, `.zone-light`) → skills (dark) → projects (light band) → contact + footer (dark). Dark sections that follow another dark section use `.flush-top` and start with an `<hr class="rule">`.
- **Content mapping from the live page:** the old intro statement is the hero lede; the old intro paragraph became the "Where I come from" card; About copy and the fact sheet became the "A little about me" and "Education" cards; experience entries are four brief `.card`s in `.grid-roles` (role title in the blue bar, org line, a two or three sentence summary, dates pinned to the bottom; the user asked on 2026-11-15 for short cards like the reference instead of full bullet lists, so the resume bullets are NOT on this page, only on the live site); skills are `.card`s with `.ticks` lists; project tags are square `.tags` chips. New copy written for this layout: the "Where I come from" card title, the hero meta line (old eyebrow + "Boston, MA"), and the four photo/video captions (written from what the media shows; the user has not reviewed them yet).
- **Brand mark:** the Torogoz line-art mark is inlined as SVG in the header (so it can be white on dark); `torogoz-mark.svg` is still the favicon.
- **Bird feature removed "for now"** at the user's request: the hero cursor bird, the traveling bird and the branches are gone from this copy. The full implementation still exists in the live repo (`js/main.js` "Traveling bird" block + `/* Section branches + traveling bird */` in `css/styles.css`) and in this folder's local-only `local-history` branch (baseline commit `b9f157e`), if the user wants it back.
- **Reusable patterns:** `.card` (+ `.card-head`, `.card-body`, `.card-link` underlined action pinned to the card bottom), `.media-card`, `.btn` / `.btn-outline`, `.ticks`, `.tags`, `.label` + `.heading` section intro, modal pattern (`hidden` attribute + `[data-close]` close handlers + Escape key, focus moves to the close button and back to the trigger — see `photoLightbox` in main.js).
- **No scroll-reveal animations** in this layout on purpose; the only motion is the hero bars drawing in on load (skipped under `prefers-reduced-motion`) and hover states.

## Content facts (avoid re-asking the user for these)

- Contact: Steven.Santos5610@gmail.com · +1 (857) 272-7314 · Boston, MA
- LinkedIn: linkedin.com/in/steven-santos-8b6182276
- Handshake: app.joinhandshake.com/profiles/558u2bbw
- Newest role (top of Experience): Incoming IT Intern, WinnCompanies, Boston MA — Nov 2026–Present; supports technology implementations, system integrations, and IT asset tracking during property onboarding/offboarding. Intro cites the 2026 NMHC Top 50 Managers (#9, 122,183 units) and the 2026 NAHMA Affordable 100 (#2, 96,833 subsidized units), so recheck both yearly, plus the 30 states + D.C. + Puerto Rico footprint from winncompanies.com/about. One bullet on the role. Don't use "5th largest multi-family manager" from Winn's About page: it's undated and NMHC now has them at #9.
- Past role: Administrative Operations Intern, ABCD (Action for Boston Community Development), IT Services — Jun 2026–Nov 2026, end date given by the user on 2026-11-06. About section copy is in past tense.
- Other experience: Santos Hardwood Floors and Construction (family business, 20+ years, Everett MA) · Digital Ready tech apprenticeship (Roxbury, MA, Jun–Aug 2023)
- Credential: ADAGE Grant Certificate (verified badge linked in About section)

## Voice/tone conventions (established through heavy iteration — don't regress)

The user explicitly asked to "humanize" the copy at one point — the site had drifted toward AI-polished marketing phrasing (rule-of-three constructions, "built to last," "let's build something together," X-raised-Y-rooted parallelism) and was rewritten to sound like the user actually talking: plain, first-person, concrete, contractions okay. **Keep new copy in that register** — avoid corporate-smooth phrasing, clichéd portfolio-site lines, and overly poetic headline constructions. Resume-derived bullet lists (STAR format) are the one exception — those intentionally stay in formal resume register since that's what recruiters expect from an accomplishments list.

## Mobile/cross-browser notes

- Photo "fullscreen" uses a custom lightbox modal, **not** the Fullscreen API — iOS Safari doesn't support `requestFullscreen()` on `<img>` elements (only `<video>`), so the raw API silently fails on iPhones. Don't revert this to `element.requestFullscreen()`. In this layout the trigger is the "View full photo" button (`[data-lightbox]`) in each photo card; clicking the photo also opens it.
- Touch targets should stay ≥44×44px (Apple/Google minimum). Text links get this from the `/* Touch targets */` `@media (pointer: coarse)` block at the end of `styles.css`; add new link styles there. Checked at 375px on 2026-11-15: nothing under 44px.
- `html { scroll-behavior: smooth }` is on. When scripting scroll positions in the preview pane, use `behavior: 'instant'` (or set `scrollBehavior = 'auto'` first) and wait ~2s before a screenshot, otherwise the screenshot shows the previous position.
- Checked with no horizontal overflow at 375, 768, 1280 and 1680px wide.
