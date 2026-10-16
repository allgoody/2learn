---
plan: astro-site
title: "2learn — Astro reading site (bilingual, static, Cloudflare)"
created: 2026-10-16
status: draft
planner-model: claude-opus-4.5 (pi)
---

# Plan: 2learn — Astro reading site

## Objective

Build the public reading site for the `lessons/` corpus: a static, bilingual (English at `/`,
Russian at `/ru/`), mobile-first Astro 7 site that renders all 698 files of each root through the
content layer without modifying one of them, and adds site-level chrome the corpus cannot carry —
navigation, table of contents, theme switching, analytics consent, full-text search and YouTube
video references. The site is deployable to Cloudflare Pages and is built to WCAG 2.2 Level AA.

The corpus is frozen. This plan **adds** `astro/`, `content/` and one file under `tools/`, and
changes nothing that the two existing content gates read.

## Global Context

**Repository:** `D:/coding/apps/2learn`. Currently **content only**: `lessons/` (the corpus),
`seed/` (read-only archive), `tools/` (two validators + two JSON data files), `.pi/`, `.tmp/`.
There is **no root `package.json`** and that must remain true — all dependencies live in
`astro/package.json`, and `tools/validate-content.mjs` must keep running on a clean checkout with
nothing but Node ≥ 22.

**Runtime:** Node v24.14.1, npm 11.11.0. Astro 7 requires Node ≥ 22.

**The corpus, measured 2026-10-16** (per root — EN at `lessons/`, RU mirrored at `lessons/ru/`):

| Kind | Count | Naming |
| --- | --- | --- |
| Entry `index.md` | **177** | `lessons/<NN-topic>/<NN-slug>/index.md` |
| Child lesson | **224** | `lessons/<NN-topic>/<NN-slug>/<NN>-<child-slug>.md` |
| Examples sidecar | **297** | `examples.md` beside `index.md`; `examples.NN-<slug>.md` beside `NN-<slug>.md` |
| **Total** | **698** | |

Plus, outside the 698: `lessons/INDEX.md` (generated, repo-facing, links to `.md` files — **never
a source for the site**), `lessons/AUTHORING.md` (the contract), `lessons/ru/GLOSSARY.md`
(Russian terminology + entry titles), `lessons/ru/INDEX.md`.

**Topics** (8, prefixed, in learning order) with entry counts:

| Topic | Entries | Area entry? |
| --- | --- | --- |
| `01-cs-fundamentals` | 27 | yes (1) |
| `02-frontend` | 31 | yes (2) |
| `03-design-ux` | 44 | yes (1) |
| `04-product-process` | 17 | yes (1) |
| `05-backend-data` | 19 | yes (1) |
| `06-cloud-devops` | 23 | yes (1) |
| `07-security` | 7 | **no** |
| `08-soft-skills` | 9 | **no** |

`07-security` and `08-soft-skills` have **no** `type: area` entry, so a topic page must be
generated from `tools/inventory.json` alone and must not assume an area page exists.

**`tools/inventory.json`** — 177 objects, 49 KB, keys exactly:
`id, topic, slug, title, type, tier, prereqs, aliases`. It has **no `related` key** and **no topic
display title**. 119 entries have a non-empty `prereqs`. `type` is `skill` (170) or `area` (7).
`tier` is `small` (80), `medium` (82), `large` (15).

**Frontmatter is fixed and enforced by `tools/validate-content.mjs` V3/V4.** Do not add fields.

- `index.md` keys, in this order: `title, type, topic, tier, status, aliases, prereqs, related`
- child keys, in this order: `title, prereqs`
- examples files have **no frontmatter** at all
- every one of the 177 entries is `status: drafted`; `related` is non-empty in exactly 3 entries per
  root — `02-frontend/16-motion-design`, `03-design-ux/06-google-analytics-4-ga4` and
  `03-design-ux/25-hotjar` — each mirrored in the Russian tree

**Body shapes and headings** (`lessons/AUTHORING.md` §4–§6, mirrored in Russian per §13). The site
ships **both** locales, so no heading string may be hardcoded in a component:

| Shape | EN headings | RU headings |
| --- | --- | --- |
| full (small skill index + every child) | `What it is`, `Why it matters`, `Core ideas`, `Practice`, `Common mistakes`, `Go deeper` | `Что это такое`, `Почему это важно`, `Ключевые идеи`, `Практика`, `Частые ошибки`, `Что читать дальше` |
| landing (medium/large skill index) | `What it is`, `Why it matters`, `In this track`, `Prerequisites`, `Go deeper` | `Что это такое`, `Почему это важно`, `Что в этом треке`, `Предварительные требования`, `Что читать дальше` |
| area | `What it covers`, `Why it matters`, `Included skills`, `Where to start` | `Что охватывает`, `Почему это важно`, `Входящие навыки`, `С чего начать` |

Locale-specific literals the site must also handle: `Done when:` / `Готово, когда:`;
`None.` / `Нет.`; `; fix: ` / `; исправить: `; `## Example N — ` / `## Пример N — `;
`### Solution` / `### Решение`.

**The link graph is id-shaped, and always backticked.** All four referencing sections carry
`- **<Title>** (\`<id>\`) …` — `Go deeper`, `Included skills` and `Prerequisites` as bullets,
`In this track` as a numbered list. Measured across both roots: 177 of 177 entry files use the
backticked form, 0 use a bare `(<id>)`. Navigation on the site depends on turning those ids into
links — see WP-10.

**Markdown features actually used by the corpus** (measured): `##`, `###`, paragraphs, bullet and
numbered lists, nested lists, tables (349 lines), fenced code with a language tag, inline code,
bold, em dash. **Not used:** `####`, images, footnotes, raw HTML outside fences. So the renderer
needs nothing beyond CommonMark + GFM tables.

**Content gates that must stay green** (they read `lessons/` only — never `astro/`):

```bash
node tools/validate-content.mjs --strict --lang en   # 177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)
node tools/validate-content.mjs --strict --lang ru   # same
node tools/check-ru-style.mjs --strict --topic 05-backend-data
```

## Global Constraints

- **DO NOT** modify, create or delete anything under `lessons/`, `seed/`, or `.pi/plans/**`.
  Specifically do not touch `lessons/AUTHORING.md`, `lessons/INDEX.md`, `lessons/ru/GLOSSARY.md`,
  `lessons/ru/INDEX.md`, or any of the 1396 lesson/example files.
- **DO NOT** modify `tools/validate-content.mjs`, `tools/check-ru-style.mjs`,
  `tools/inventory.json` or `tools/renumber-map.json`. The only new file under `tools/` is
  `tools/check-videos.mjs` (WP-22).
- **DO NOT** create `package.json`, `node_modules/` or a lockfile at the repository root. Every
  dependency lives in `astro/package.json`. `tools/validate-content.mjs` must keep running with
  nothing but Node ≥ 22 — it must never import anything from `astro/`.
- **DO NOT** add React, Preact, Vue, Svelte, MDX, or any UI framework. Astro components plus
  vanilla `<script>` blocks only. No Partytown. No `@astrojs/mdx`. No `@tailwindcss/typography`.
- **DO NOT** load any asset from a third-party origin at runtime. Fonts are downloaded at build
  time by Astro's Fonts API and served from our own origin; video thumbnails are downloaded at
  ingest time into `astro/public/videos/`. At runtime the page must make zero requests to
  `fonts.googleapis.com`, `fonts.gstatic.com`, `i.ytimg.com` or `ytimg.com`.
- **DO NOT** introduce an external URL anywhere under `lessons/`. The site's own outbound links
  live only in `.astro` files and in `content/videos.json`, never in the corpus.
- **DO NOT** render `status`. All 177 entries are `drafted`, so it carries no information.
- **DO NOT** `git commit`, `git push`, or create a branch. The user owns git history.
- **DO** use British English in every string the site itself authors, matching the corpus.
- **DO** create every temporary or scratch file under `.tmp/` at the repository root, never in a
  system temp directory and never outside the workspace.
- **DO** keep the EN and RU dictionaries key-symmetric. The RU dictionary is typed
  `const ru: typeof en`, so a missing key is a `ts` error, not a silent gap. Add every new label to
  **both** blocks in the same edit.
- **DO** keep both content gates green after every phase. Re-run them in WP-25 before declaring the
  plan complete.
- **DO** write `aria-label`, `alt`, and focus-visible styling on every interactive element. This
  site targets **WCAG 2.2 Level AA** — see WP-25.

## Conventions

| Thing | Convention |
| --- | --- |
| Site root | `astro/` — its own package, own `package.json`, own `tsconfig.json` |
| Pages | `astro/src/pages/**` — file-based routing; RU pages under `src/pages/ru/` |
| Layouts | `astro/src/layouts/` — `*.astro`, PascalCase |
| Components | `astro/src/components/` — `*.astro`, PascalCase |
| Pure logic | `astro/src/lib/` — `*.ts`, camelCase, no Astro imports so it is unit-testable |
| Markdown transform | `astro/src/lib/rehype-content.mjs` — a local rehype plugin, zero dependencies |
| Styles | `astro/src/styles/global.css` (one file: tokens, base, prose, widgets) |
| Client JS | `<script>` in `.astro` (Vite-processed, hoisted). `<script is:inline>` **only** for the theme boot in `BaseLayout.astro`, which must run before first paint |
| Theme | `data-theme="light"\|"dark"` on `<html>`, written by the boot script; all colours are `light-dark()` pairs selected by `color-scheme` |
| Locale | never inferred from CSS or JS — passed as an explicit `locale` prop from the route |
| Test commands | there is no unit-test runner in this repo. Verification is by `npm run build`, `npm run check`, `grep`, and `find` — every Success check is a shell command |

**Installed versions (verified against the npm registry 2026-10-16).** Pin exactly:

| Package | Version | Where |
| --- | --- | --- |
| `astro` | `7.4.0` | `dependencies` |
| `@astrojs/sitemap` | `3.7.4` | `dependencies` |
| `@astrojs/rss` | `4.0.19` | `dependencies` |
| `tailwindcss` | `4.3.3` | `dependencies` |
| `@tailwindcss/vite` | `4.3.3` | `dependencies` |
| `pagefind` | `1.5.2` | `dependencies` |
| `typescript` | `7.0.2` | `devDependencies` |
| `@astrojs/check` | latest at install | `devDependencies` |
| `wrangler` | latest at install | `devDependencies` |

## Phases

| # | Name | File | WPs | Depends On |
| --- | --- | --- | --- | --- |
| 1 | Foundation | `phase-01-foundation.md` | WP-1–WP-4 | — |
| 2 | Shell | `phase-02-shell.md` | WP-5–WP-9 | Phase 1 |
| 3 | Reader | `phase-03-reader.md` | WP-10–WP-15 | Phase 2 |
| 4 | Discovery and extras | `phase-04-discovery.md` | WP-16–WP-20 | Phase 3 |
| 5 | Video references | `phase-05-videos.md` | WP-21–WP-22 | Phase 3 |
| 6 | Verify and ship | `phase-06-verify-ship.md` | WP-23–WP-25 | Phases 4, 5 |

## Route map

Reserved top-level segments (a catch-all must 404 anything else). Topics are all `NN-<slug>`, so
none of these can collide with a topic directory.

| EN | RU | WP |
| --- | --- | --- |
| `/` | `/ru/` | WP-14 |
| `/about/` | `/ru/about/` | WP-17 |
| `/privacy/` | `/ru/privacy/` | WP-9 |
| `/entries/` | `/ru/entries/` | WP-16 |
| — | `/ru/glossary/` | WP-18 |
| `/search/` | `/ru/search/` | WP-20 |
| `/feed.xml` | `/ru/feed.xml` | WP-19 |
| `/<topic>/` | `/ru/<topic>/` | WP-13 |
| `/<topic>/<entry>/` | `/ru/<topic>/<entry>/` | WP-13 |
| `/<topic>/<entry>/<NN-child>/` | same | WP-13 |
| `/<topic>/<entry>/examples/` | same | WP-13 |
| `/<topic>/<entry>/examples.<NN-child-slug>/` | same | WP-13 |
| `/404` | — | WP-15 |
| `/robots.txt`, `/sitemap-index.xml` | — | WP-15 |

## File Map

**Phase 1 — Foundation**
- `astro/package.json` — CREATE
- `astro/astro.config.mjs` — CREATE (MODIFY again in WP-3 and WP-10)
- `astro/tsconfig.json` — CREATE
- `astro/src/pages/index.astro` — CREATE (placeholder; replaced in WP-14)
- `astro/src/content.config.ts` — CREATE
- `astro/src/lib/corpus.ts` — CREATE
- `astro/src/lib/graph.ts` — CREATE
- `astro/src/styles/global.css` — CREATE
- `.gitignore` — MODIFY (add `astro/dist/`, `astro/.astro/`, `astro/.wrangler/`)

**Phase 2 — Shell**
- `astro/src/lib/urls.ts` — CREATE
- `astro/src/lib/dictionary.ts` — CREATE
- `astro/src/layouts/BaseLayout.astro` — CREATE
- `astro/src/components/Header.astro` — CREATE
- `astro/src/components/NavDrawer.astro` — CREATE
- `astro/src/components/ThemeToggle.astro` — CREATE
- `astro/src/components/Footer.astro` — CREATE
- `astro/src/components/ScrollToTop.astro` — CREATE
- `astro/src/components/ConsentBanner.astro` — CREATE
- `astro/src/lib/analytics.ts` — CREATE
- `astro/src/pages/privacy.astro` — CREATE
- `astro/src/pages/ru/privacy.astro` — CREATE

**Phase 3 — Reader**
- `astro/src/lib/rehype-content.mjs` — CREATE
- `astro/src/lib/lessons.ts` — CREATE
- `astro/src/components/Prose.astro` — CREATE
- `astro/src/components/TableOfContents.astro` — CREATE
- `astro/src/components/LessonNav.astro` — CREATE
- `astro/src/components/EntryList.astro` — CREATE
- `astro/src/pages/[...path].astro` — CREATE
- `astro/src/pages/ru/[...path].astro` — CREATE
- `astro/src/pages/index.astro` — MODIFY (real home page)
- `astro/src/pages/ru/index.astro` — CREATE
- `astro/src/pages/404.astro` — CREATE
- `astro/src/pages/robots.txt.ts` — CREATE

**Phase 4 — Discovery and extras**
- `astro/src/pages/entries.astro` — CREATE
- `astro/src/pages/ru/entries.astro` — CREATE
- `astro/src/components/EntryFilter.astro` — CREATE
- `astro/src/pages/about.astro` — CREATE
- `astro/src/pages/ru/about.astro` — CREATE
- `astro/src/pages/ru/glossary.astro` — CREATE
- `astro/src/pages/feed.xml.ts` — CREATE
- `astro/src/pages/ru/feed.xml.ts` — CREATE
- `astro/src/pages/search.astro` — CREATE
- `astro/src/pages/ru/search.astro` — CREATE
- `astro/package.json` — MODIFY (add `pagefind` script step)

**Phase 5 — Video references**
- `content/videos.json` — CREATE
- `content/README.md` — CREATE
- `tools/check-videos.mjs` — CREATE
- `astro/src/lib/videos.ts` — CREATE
- `astro/src/components/VideoList.astro` — CREATE
- `astro/src/pages/[...path].astro` — MODIFY (render `<VideoList />`)
- `astro/src/pages/ru/[...path].astro` — MODIFY (render `<VideoList />`)

**Phase 6 — Verify and ship**
- `astro/README.md` — CREATE
- `astro/wrangler.toml` — CREATE
- `astro/.nvmrc` — CREATE
- `astro/astro.config.mjs` — MODIFY (replace the placeholder `site` if the real domain is known)
- `lighthouserc.json` — CREATE

## Execution Instructions

Execute as follows:

1. Read this `_index.md` fully — it provides global context and constraints.
2. Read `phase-01-foundation.md` and execute each work package **in order**.
3. After all WPs in a phase, run the Phase Verification commands.
4. If verification passes, proceed to the next phase.
5. If verification fails, fix the issue before moving on. Do not skip phases.
6. Each work package is self-contained — you should not need to read other phase files.

**Critical rules for the executor:**

- Do exactly what each work package says. Do not add features not in the plan.
- If a constraint says DO NOT, respect it absolutely.
- If you believe the plan has an error, note it and ask — do not improvise.
- Run the Success checks after every work package, not just at the end.
- `lessons/` is frozen. If a Success check tells you to change a file under `lessons/`, the plan is
  wrong — stop and report it.
