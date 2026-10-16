# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site now built over it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D is in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-16

## Current Task
**The Astro site (Plan D) is COMPLETE — all 6 phases and 25 work packages executed and verified.** `.pi/plans/astro-site/` has been implemented into `astro/`, plus `content/`, `tools/check-videos.mjs` and `lighthouserc.json` at the repo root. It builds 1424 pages, both content gates are green, `lessons/` is byte-identical, and Lighthouse exits 0. **Nothing is deployed and nothing is committed** — the user owns git history.

The next action belongs to the user: set the real domain, then `/skill:deploy`.

**The Russian prose recast (Plan C) is still PAUSED at 550 of 698 files.** Resume at Phase 7 / WP-58 (`06-cloud-devops`). Nothing is mid-file, and both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Executed Plan D end to end** — 6 phases, 25 WPs: scaffold, design tokens, self-hosted fonts, content layer + nav graph, the shell (header/drawer/toggle/footer/consent), the corpus router, home pages, 404/robots/sitemap, the filterable entry index, about, the Russian glossary, both RSS feeds, Pagefind search, the video tool + card, and the verification phase.
- [x] **Fixed two real bugs found by testing, not by the plan's own checks.** WP-11's `allExamples` rule contradicted its own `classify`, which cost **127 child-example pages** (the build produced 581 pages instead of 708). And the lesson/ToC grid's implicit column let one long code line widen the whole page at 400px — fixed with `grid-template-columns: minmax(0, 1fr)`.
- [x] **Fixed two accessibility failures that no automated gate caught.** The footer language switch violated WCAG **2.5.3** (visible `Русский` was not in its `aria-label` — on all 7 routes, which still scored a perfect 1.00), and ToC links measured **67×18**, under the plan's own **2.5.8** 24×24 criterion.
- [x] **Proved the corpus is byte-frozen** — `git status --porcelain lessons/ seed/` and `git diff --stat HEAD -- lessons/ seed/` both print nothing.
- [x] **Ran every gate and recorded the evidence** in `astro/README.md` (`## Verified`) and, per work package, in `.tmp/astro-site-exec-log.md` (D1–D24). **`.tmp/` is scratch** — the durable facts are in the rules index and `.pi/memory/lessons.md`.

## In Progress
- Nothing is mid-file. Every work package is closed.

## Blocked / Needs Decision
- [?] **`site` in `astro/astro.config.mjs` is still the placeholder `https://2learn.example.com`**, and it is load-bearing — canonical URLs, hreflang, the sitemap, both feeds and `robots.txt` all derive from it. **Supply the real domain before deploying.**
- [?] **Four `TODO: confirm` lines are visible on the site** and need the user's words: `astro/src/pages/about.astro:56` and `ru/about.astro:56` (reuse and licensing terms), `astro/src/pages/privacy.astro:69` and `ru/privacy.astro:68` (who is responsible for the site, how a reader reaches them). `astro/astro.config.mjs:7` marks the domain.
- [?] **Deliberate deviations, all recorded and none of them silent** — `typescript@6.0.3` rather than 7; the Markdown link transform is a **Sätteri** HAST plugin (Astro 7 replaced rehype); `/privacy/` + `/ru/privacy/` were added; the glossary is Russian-only at `/ru/glossary/`; the feeds carry no dates; the video strip sits after the lesson body; `--border` is 1.34:1 (decorative and WCAG 1.4.11-exempt — the one open contrast item).
- [?] **No favicon.** The home route loses 0.04 of best practices to a single `/favicon.ico` 404. That tier warns rather than fails and passes, so it was left to the user — adding one means inventing a brand mark nobody asked for.
- [?] **The Russian tree's topic names are English** (`Frontend`, `Design & UX`, `Soft Skills`). Every work package prescribes locale-independent `topicTitle(topic)`, and the corpus has no Russian topic names to draw from, so nothing was invented.
- [?] **The rules index is still over its 11 KB Stage B budget** (~17.5 KB / ~98 lines), trimmed again this session but not solved. What remains is almost entirely `## Active Constraints`, which must not be moved to a chunk.

## Next Steps
1. Set `site` to the real domain in `astro/astro.config.mjs`, then `/skill:deploy`.
2. Resolve the four visible `TODO: confirm` lines and review the `/about` + `/privacy` copy.
3. Optionally add a favicon (one file) to clear the last Lighthouse warning.
4. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files. It owns the corpus's **last blacklist hit** and 10 of the 14 remaining `[S1]` warnings.
5. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.

## Key Decisions
- **The corpus stays byte-frozen; the site only reads it.** Verified rather than assumed: `git status` and `git diff --stat` are both clean over `lessons/ seed/`.
- **No UI framework, and no root `package.json`.** Every dependency lives in `astro/package.json`.
- **Video data lives in `content/videos.json`** — outside `lessons/`, which bans `https?://` — storing the 11-character `videoId` and never a URL. Thumbnails download at ingest into `astro/public/videos/`, which does not exist yet because the data ships empty.
- **Theming is `light-dark()` + `color-scheme`**, with `data-theme` written by the project's only `<script is:inline>` (the pre-paint boot).
- **Accessibility is verified by Lighthouse *and* a manual WCAG 2.2 AA checklist.** The manual half is not ceremony: it found the 2.5.8 failure that scores a perfect 1.00.
- **No font preload was added.** Mobile LCP measured **1.5–2.0 s** on all seven routes (lesson: 1.8 s English / 2.0 s Russian), under the 2.5 s threshold. The recipe if that ever regresses is in `astro/README.md`.

## File Map
Everything below is new this session unless marked MODIFY.
- `astro/{package.json,astro.config.mjs,tsconfig.json,wrangler.toml,.nvmrc,README.md}` — scaffold, config, Pages manifest, Node pin, documentation with `## Verified`.
- `astro/src/content.config.ts`, `astro/src/lib/{corpus,graph,urls,dictionary,lessons,analytics,videos}.ts`, `astro/src/lib/rehype-content.mjs` — content layer, nav graph, i18n, data access, video access, the Sätteri link plugin.
- `astro/src/layouts/BaseLayout.astro` — head, canonical, hreflang + x-default, Pagefind markers, theme boot.
- `astro/src/components/` — `Header`, `NavDrawer` (a native `<dialog>`), `ThemeToggle`, `Footer`, `ScrollToTop`, `ConsentBanner`, `Prose`, `TableOfContents`, `LessonNav`, `EntryList`, `EntryFilter`, `VideoList`.
- `astro/src/pages/` — `[...path].astro` (the corpus router, 1416 pages), `index`, `entries`, `about`, `privacy`, `search`, `404`, `robots.txt.ts`, `feed.xml.ts`, plus the `ru/` mirror including `ru/glossary.astro`.
- `content/videos.json` (`{}`), `content/README.md`, `tools/check-videos.mjs` — the video data contract and its zero-dependency tool.
- `lighthouserc.json` — MODIFY — 7 routes, mobile; a11y and SEO asserted as errors at 0.95, performance and best practices as warnings at 0.9.
- `.gitignore` — MODIFY — `.tmp/`, `.lighthouseci/`, `astro/dist/`, `astro/.astro/`, `astro/.wrangler/`.
- `lessons/**`, `seed/**`, `tools/validate-content.mjs`, `tools/check-ru-style.mjs`, `tools/inventory.json`, `tools/renumber-map.json` — **UNTOUCHED** (verified).

## Gotchas / Warnings
- **`site` is a placeholder, so every canonical URL, hreflang pair, feed link and the `robots.txt` `Sitemap:` line is wrong until it is set.**
- **`npm run build` is `astro build && pagefind --site dist`.** The search index exists only after a build, so test search against `npm run preview`, never `npm run dev`, where the page correctly shows a "built site only" message.
- **`.tmp/astro-site-exec-log.md` holds the full D1–D24 evidence, and `.tmp/` is scratch.** The durable facts now live in `.pi/project-rules-memory.md` and `.pi/memory/lessons.md`.
- **Astro 7 stamps `data-astro-cid-*` onto every element of a component that has a `<style>` block**, so a literal `grep '<tr>'` finds nothing. Grep `<tr` instead.
- **Pagefind 1.5's UI has no `filters` option.** Unrecognised keys are forwarded as `pagefind_options`, so the working form is `pagefind_options: { filters: { lang } }`.
- **The corpus's own traps are unchanged** and apply again when Plan C resumes: `--diff` does not check `###` subheadings, a fence's *contents* are frozen, and `--lang ru` is never optional.
