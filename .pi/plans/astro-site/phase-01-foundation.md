# Phase 1: Foundation

## Objective

Stand up the `astro/` package and the two things everything else depends on: the design system
(one stylesheet with every colour, type and spacing token) and the content layer (both corpus
roots loaded as Astro collections with the corpus's own ids, plus the graph helpers the site's
navigation is built from). After this phase `npm run build` succeeds and the corpus is provably
untouched.

## Prerequisites

- Node ≥ 22 (present: v24.14.1) and npm ≥ 10 (present: 11.11.0)
- Network access for `npm install` and for Astro's Fonts API at build time
- Repository is clean: `git status --porcelain` prints nothing (or only `.tmp/`-ignored entries)

## Shared Context

**The corpus is frozen.** `lessons/` contains 698 files per root (177 `index.md`, 224 children,
297 examples) plus `INDEX.md`, `AUTHORING.md` and, under `ru/`, `GLOSSARY.md`. Nothing in this plan
writes to `lessons/`, `seed/`, or the two existing validators. Two mechanical facts protect that:

```bash
git status --porcelain lessons/    # must print nothing, at the end of every phase
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
```

**Where the site reads from.** `astro/` is the project root for Astro, so the corpus is one level
up: `../lessons`. Astro's `glob()` loader takes `base` relative to the Astro project root.

**Ids.** The corpus's canonical id is `<NN-topic>/<NN-slug>` for an entry and
`<NN-topic>/<NN-slug>/<NN-child-slug>` for a child — note there is **no `/index` segment**. Astro's
`glob()` would generate `02-frontend/03-html/index` by default, so both collections pass an
explicit `generateId` to strip `.md` and a trailing `/index`.

---

## Work Packages

### WP-1: Scaffold the Astro package

**Context:**
The repository has no `package.json` at its root and must never gain one — `tools/validate-content.mjs`
must keep running on a clean checkout with nothing but Node ≥ 22. Everything therefore lives in a
new `astro/` directory with its own package. `/D:/coding/apps/2learn/.gitignore` is four lines today — a
comment and the three patterns `.tmp/`, `.ruff_cache/`, `node_modules/` — so `node_modules/` is already
ignored at any depth, but Astro's `dist/`, `.astro/` and `.wrangler/` output directories are not.

Astro 7 is the current major. It runs on Vite 8, uses the Rust compiler by default, has stable
advanced routing, and treats `src/fetch.ts` as a reserved filename. Tailwind 4 is added through the
Vite plugin `@tailwindcss/vite`, **not** an Astro integration. Code fences are highlighted by Shiki,
which is built into Astro with no extra package; dual light/dark themes are configured with
`markdown.shikiConfig.themes` plus `defaultColor: false`.

**Task:**
Create the `astro/` package with a build that succeeds and a placeholder home page, then install
dependencies with the versions pinned in `_index.md`.

**Files:**
- `astro/package.json` — CREATE — name `2learn-site`, `private`, `type: module`, `engines.node`
  `>=22`, the five scripts below, and the exact dependency pins from `_index.md`
- `astro/astro.config.mjs` — CREATE — `site`, `compressHTML: false`, `trailingSlash: "always"`,
  the Tailwind Vite plugin, the `@astrojs/sitemap` integration with `i18n`, and
  `markdown.shikiConfig`
- `astro/tsconfig.json` — CREATE — extends `astro/tsconfigs/strict`, includes `.astro/types.d.ts`
  and `**/*`, excludes `dist`
- `astro/src/pages/index.astro` — CREATE — a deliberate placeholder: a single `<h1>2learn</h1>` and
  nothing else. WP-14 replaces it with the real home page. It exists so that every phase in this
  plan ends with a green build.
- `.gitignore` — MODIFY — append `astro/dist/`, `astro/.astro/`, `astro/.wrangler/`, `.lighthouseci/`

**Constraints:**
- DO: pin exactly these versions in `dependencies`: `astro@7.4.0`, `@astrojs/sitemap@3.7.4`,
  `@astrojs/rss@4.0.19`, `tailwindcss@4.3.3`, `@tailwindcss/vite@4.3.3`
- DO: put `typescript@7.0.2` in `devDependencies`, plus `@astrojs/check` and `wrangler` at the
  version npm resolves today
- DO: use these five scripts — `dev: "astro dev"`, `build: "astro build"`,
  `preview: "astro preview"`, `check: "astro check"`,
  `deploy: "npm run build && wrangler pages deploy dist --project-name 2learn"`
- DO: set `trailingSlash: "always"` so every page URL ends in `/`. Endpoints with a file extension
  (`/feed.xml`, `/robots.txt`, `/sitemap-index.xml`) are the exception — since Astro 6 they are
  never reachable with a trailing slash
- DO: set `site` to the placeholder `https://2learn.example.com` and add the comment
  `// TODO: replace with the real domain before deploy (WP-24)` immediately above it
- DO: set `compressHTML: false`. Astro 7's default (`'jsx'`) removes whitespace and line breaks
  around elements and collapses component markup onto a single line, which quietly invalidates the
  line-based `grep` verification every later WP relies on. `false` preserves whitespace and costs a
  few kilobytes of HTML
- DO: configure sitemap as
  `sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", ru: "ru" } }, filter: (page) => !page.endsWith("/404/") })`
- DO: configure markdown as
  `shikiConfig: { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }`
- DO NOT: create a `package.json`, `node_modules/` or lockfile at the repository root
- DO NOT: add React, Preact, Vue, Svelte, `@astrojs/mdx`, `@tailwindcss/typography`, Partytown, or
  any UI framework
- DO NOT: enable `i18n` in the Astro config. Locales are passed explicitly as a prop from each
  route; Astro's i18n middleware adds redirect behaviour this site does not need
- DO NOT: name any file `src/fetch.ts`

**Success:**
- [ ] `test -f astro/package.json && test -f astro/astro.config.mjs && test -f astro/tsconfig.json` → exit 0
- [ ] No root package: `test ! -f package.json` → exit 0
- [ ] Pins are exact: `grep -c '"astro": "7.4.0"' astro/package.json` → 1
- [ ] Five scripts exist: `node -e "const p=require('./astro/package.json');['dev','build','preview','check','deploy'].forEach(k=>{if(!p.scripts[k])throw new Error(k)});console.log('ok')"` → `ok`
- [ ] Pin the compression mode: `grep -c 'compressHTML: false' astro/astro.config.mjs` → 1
- [ ] Dependencies install: `cd astro && npm install` → exit 0
- [ ] Type check: `cd astro && npm run check` → exit 0
- [ ] Build: `cd astro && npm run build` → exit 0
- [ ] Output exists: `test -d astro/dist` → exit 0
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing
- [ ] Gates still green: `node tools/validate-content.mjs --strict --lang en` → `0 error(s)`, exit 0

---

### WP-2: Design system — tokens, base styles and the prose block

**Context:**
No stylesheet exists yet. This WP creates the single CSS file the whole site is styled from:
`astro/src/styles/global.css`. Tailwind 4 is already wired through the Vite plugin (WP-1), so
`@import "tailwindcss"` in this file is all that is needed to get utilities.

The values below are the agreed result of research into reading typography. Do not substitute your
own numbers.

- **Measure:** 60–70 characters. Baymard's large-scale testing puts the optimum at 50–75; Bringhurst
  says 45–75 with 66 ideal; Butterick allows 45–90; WCAG 1.4.8 caps at 80. Use `65ch` — a `ch` unit,
  not `rem`, so the *character count* stays constant between English and Russian, whose average
  glyph widths differ.
- **Line height:** longer lines need looser leading. 1.5 on a narrow phone column, 1.6 once the
  column reaches the desktop measure.
- **Body size:** 17px on mobile, 18px from 1024px up. Never below 16px.
- **Headings:** line-height 1.1 for h1, 1.2 for h2/h3, with negative tracking so large text does not
  fall apart.
- **Rhythm:** a 4px base unit. Tailwind's default spacing scale is already 4px-based, so do not
  redefine it.
- **Never fix a height on a text container.** WCAG 1.4.12 requires content to survive the reader
  forcing line-height 1.5, paragraph spacing 2em, letter-spacing 0.12em and word-spacing 0.16em.

Theming uses CSS `light-dark()` (Baseline 2024) rather than duplicating every token per theme.
`color-scheme` selects the variant, which means the *system* default works with no JavaScript at
all, and the manual toggle (WP-7) only has to override `color-scheme` on `:root`.

`@theme inline` is required — without `inline`, Tailwind resolves the `var()` reference at build
time and the font variables that Astro's Fonts API defines at runtime come out empty.

**Task:**
Create `astro/src/styles/global.css` containing, in this order: the Tailwind import, an
`@theme inline` block mapping the font and colour variables to Tailwind names, the colour tokens
with their `light-dark()` pairs, the `color-scheme` overrides, base element styles, the
`.prose` reading block, the Shiki dual-theme rules, and a reduced-motion block. Then import it in
`astro/src/pages/index.astro` so the build exercises it.

**Files:**
- `astro/src/styles/global.css` — CREATE — the whole design system
- `astro/src/pages/index.astro` — MODIFY — add `import "../styles/global.css";` to the frontmatter

**Constraints:**
- DO: use exactly these colour tokens, all in `light-dark(light, dark)` form:
  `--bg: #ffffff | #131316`, `--bg-subtle: #f7f7f5 | #1b1b1f`, `--fg: #1b1b19 | #e9e7e4`,
  `--fg-muted: #57534e | #a9a5a0`, `--border: #e0dedb | #2e2e33`,
  `--accent: #1c4ed8 | #93b4fd`, `--accent-fg: #ffffff | #131316`,
  `--focus: #1c4ed8 | #93b4fd` (the accent pair, reused as the focus-ring colour — Phase 2's
  prerequisites and WP-6/WP-8 reference `var(--focus)`, so it must exist here)
- DO: verify every foreground/background pair these tokens create. Body and muted text must be at
  least **4.5:1** in both themes; borders, focus rings and large text at least **3:1**. Do not
  reach for opacity to soften anything — reduced opacity is how contrast fails
- DO: use exactly these type tokens: `--text-body: 1.0625rem`, `--text-body-lg: 1.125rem`,
  `--measure: 65ch`
- DO: apply `line-height: 1.5` to `.prose` and `1.6` inside
  `@media (min-width: 64rem)` (1024px), together with `font-size: var(--text-body-lg)`
- DO: set `.prose { max-width: var(--measure); font-family: var(--font-serif); }` and give
  headings, lists, tables, inline code and `pre` sensible rules within `.prose`
- DO: style the paragraph that WP-10 marks with `class="done-when"` — a left border in
  `var(--accent)` and a small left padding
- DO: include
  `.astro-code, .astro-code span { color: light-dark(var(--shiki-light), var(--shiki-dark)) !important; }`
  and `.astro-code { background-color: light-dark(var(--shiki-light-bg), var(--shiki-dark-bg)) !important; }`
- DO: include a `@media (prefers-reduced-motion: reduce)` block that neutralises animation,
  transition and `scroll-behavior`
- DO: set `:root { color-scheme: light dark; }`,
  `:root[data-theme="light"] { color-scheme: light; }` and
  `:root[data-theme="dark"] { color-scheme: dark; }`
- DO: give every focusable element a visible focus ring using `:focus-visible` and `var(--focus)`
- DO: define `--font-serif` on Literata, `--font-sans` on Golos Text, `--font-mono` on a system
  monospace stack, and map them in `@theme inline` as `--font-serif`, `--font-sans`, `--font-mono`
- DO NOT: import `@tailwindcss/typography` or add a `prose` plugin. Write the `.prose` rules by hand
  — the agreed spec is too specific for a preset
- DO NOT: define any colour as a bare hex outside the token block, and never define the same
  semantic token twice (once light, once dark)
- DO NOT: set `height`, `max-height` or `overflow: hidden` on any text container

**Success:**
- [ ] File exists: `test -f astro/src/styles/global.css` → exit 0
- [ ] Tailwind imported and fonts mapped: `grep -c '@import "tailwindcss"' astro/src/styles/global.css` → 1
      and `grep -c '@theme inline' astro/src/styles/global.css` → 1
- [ ] Theming is single-source: `grep -c 'light-dark(' astro/src/styles/global.css` → at least 8
      (one per colour token), and `grep -cE '^\s*--(bg|fg|border|accent|focus)[a-z-]*:' astro/src/styles/global.css`
      counts each token exactly once
- [ ] `grep -c 'color-scheme' astro/src/styles/global.css` → 3
- [ ] Measure is ch-based: `grep -c '65ch' astro/src/styles/global.css` → 1
- [ ] Both line heights present: `grep -c 'line-height: 1.5' astro/src/styles/global.css` → at least 1
      and `grep -c 'line-height: 1.6' astro/src/styles/global.css` → at least 1
- [ ] Shiki dual theme: `grep -c -- '--shiki-dark' astro/src/styles/global.css` → at least 1
- [ ] Reduced motion honoured: `grep -c 'prefers-reduced-motion' astro/src/styles/global.css` → 1
- [ ] No fixed heights on text: `grep -nE '\.prose[^{]*\{[^}]*height:' astro/src/styles/global.css` → prints nothing
- [ ] Build is green: `cd astro && npm run build` → exit 0
- [ ] Utilities emitted: `ls astro/dist/_astro/*.css | wc -l` → at least 1. Do not grep the built CSS
      for the string `tailwindcss` — its banner comment is not a reliable marker after minification,
      and Tailwind v4 emits no other self-identifying text
- [ ] Manual: paste each `light-dark(a, b)` pair into a contrast checker. Every body/muted pair ≥ 4.5:1,
      every border/focus pair ≥ 3:1, in **both** themes. Record the ratios in the commit message or a
      `.tmp/` note.

---

### WP-3: Self-hosted fonts via the Astro Fonts API

**Context:**
WP-1 created `astro/astro.config.mjs`. Astro's Fonts API has been stable since `astro@6.0.0`. It
downloads family files from a provider **at build time**, writes them into the build output and
serves them from our own origin — so there is no request to `fonts.googleapis.com` or
`fonts.gstatic.com` at runtime. This is the self-hosting requirement, satisfied without vendoring
files by hand or committing binaries.

Two families, chosen because every glyph the site needs must exist in **Cyrillic as well as Latin**.
An expert Cyrillic review by three type designers (`type.today`) judged Literata's Cyrillic
"quality… no questions to structures, design, rhythm" and rejected several popular alternatives —
Inter's Cyrillic "should not be used", Noto Serif's "is not usable", Roboto's "questionable". Do not
swap these families for Inter, Noto, Roboto, Manrope, Merriweather, Vollkorn, Tinos or Arimo.

- **Literata** — body text. Commissioned by Google Play Books as an e-reader face, so it is built
  for long-form reading at arbitrary screen sizes. Variable, weights 200–900.
- **Golos Text** — navigation, labels and metadata. Designed by Paratype for government and social
  service sites, "meant for continuous reading on screen". Variable, weights 400–900.

Both need `latin`, `latin-ext`, `cyrillic` and `cyrillic-ext`. Russian prose is 10–15% longer than
the English for the same content, and the corpus's Russian word bands are correspondingly wider, so
`latin` alone would fall back mid-page.

**Task:**
Add a `fonts` array to `astro/astro.config.mjs` with both families, correctly subsetted.

**Files:**
- `astro/astro.config.mjs` — MODIFY — add the `fonts` array and its `fontProviders` import

**Constraints:**
- DO: import `fontProviders` from `"astro/config"` alongside `defineConfig`
- DO: configure Literata as
  `{ provider: fontProviders.google(), name: "Literata", cssVariable: "--font-literata", weights: ["200 900"], styles: ["normal", "italic"], subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"], display: "swap", fallbacks: ["Georgia", "serif"] }`
- DO: configure Golos Text as
  `{ provider: fontProviders.google(), name: "Golos Text", cssVariable: "--font-golos", weights: ["400 900"], styles: ["normal"], subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"], display: "swap", fallbacks: ["system-ui", "sans-serif"] }`
- DO: pass `weights` as a range string (`"200 900"`), which is how a variable font is requested
- DO: leave `optimizedFallbacks` at its default (`true`). Astro generates metric-adjusted fallbacks,
  which is what keeps the layout from shifting while the real font loads
- DO NOT: add a `<link>` to any Google Fonts URL anywhere in the project
- DO NOT: set `preload` yet. Preloading is a measured decision — WP-24 decides it from an LCP
  measurement, not from preference
- DO NOT: put font files in `astro/public/`. Astro recommends against it, because the files are
  copied to the output twice
- DO NOT: add a `variationSettings` or `experimental.variableAxis` entry. Leave both variable axes
  (weight and optical size) free so CSS `font-optical-sizing: auto` can do its job

**Success:**
- [ ] Import present: `grep -c 'fontProviders' astro/astro.config.mjs` → at least 2
- [ ] Both families configured: `grep -c '"Literata"' astro/astro.config.mjs` → 1 and
      `grep -c '"Golos Text"' astro/astro.config.mjs` → 1
- [ ] Cyrillic requested for both: `grep -c '"cyrillic-ext"' astro/astro.config.mjs` → 2
- [ ] Variable ranges, not single weights: `grep -cE 'weights: \["[0-9]+ [0-9]+"\]' astro/astro.config.mjs` → 2
- [ ] No Google Fonts link anywhere: `grep -rn 'fonts.googleapis.com\|fonts.gstatic.com' astro/src astro/public astro/astro.config.mjs` → prints nothing
- [ ] Type check: `cd astro && npm run check` → exit 0
- [ ] Build: `cd astro && npm run build` → exit 0
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing

---

### WP-4: Content layer — both roots as collections, plus the graph helpers

**Context:**
This is the WP that defines how the site sees the corpus. `tools/inventory.json` holds 177 objects
with keys exactly `id, topic, slug, title, type, tier, prereqs, aliases`. It has **no `related` key**
and, importantly, **no topic display title** — so the eight topic names are site-authored and are
listed below. 119 entries have a non-empty `prereqs`. `type` is `skill` (170) or `area` (7);
`tier` is `small` (80), `medium` (82), `large` (15).

`related` exists only in frontmatter, and is non-empty in exactly three entries per root
(`02-frontend/16-motion-design`, `03-design-ux/06-google-analytics-4-ga4`,
`03-design-ux/25-hotjar`). Real navigation comes
from `prereqs` (frontmatter), the children (filenames), and the `Go deeper` / `Included skills` /
`In this track` bullets inside the prose (handled by WP-10).

The eight topic titles. The corpus has none, so these are site labels derived from the seed file
names and the seed's own "Covers" column. They live in one module so they are changeable in one place.

| topic | title | blurb |
| --- | --- | --- |
| `01-cs-fundamentals` | CS Fundamentals | Data structures, algorithms, OS and networks, code quality, testing, tooling |
| `02-frontend` | Frontend | HTML, CSS, JavaScript, frameworks, build tooling, performance, browser platform |
| `03-design-ux` | Design & UX | Research, IA, interaction, visual design, design systems, evaluation, design tools |
| `04-product-process` | Product & Process | Agile, Scrum, product management, requirements |
| `05-backend-data` | Backend & Data | Server languages, APIs, databases, caching, architecture |
| `06-cloud-devops` | Cloud & DevOps | Cloud providers, containers, CI/CD, operations |
| `07-security` | Security | Web security, secrets, privacy, data ethics |
| `08-soft-skills` | Soft Skills | Communication, collaboration, career |

Note: `07-security` (7 entries) and `08-soft-skills` (9) contain **no `type: area` entry**. A topic
page for those two must be built from `tools/inventory.json` alone. Never assume an area entry exists.

**Task:**
Create `astro/src/content.config.ts` with two collections (`en`, `ru`) over `../lessons` and
`../lessons/ru`, explicit `generateId`s that reproduce the corpus's ids, and a permissive schema;
create `astro/src/lib/corpus.ts` (topics, titles, shapes, id parsing) and `astro/src/lib/graph.ts`
(children, prereqs, related, previous/next within an entry and within a topic). Verify both with a
temporary page that prints the census, then delete that page.

**Files:**
- `astro/src/content.config.ts` — CREATE — the two collections
- `astro/src/lib/corpus.ts` — CREATE — topic table, shape detection, id helpers, type shapes
- `astro/src/lib/graph.ts` — CREATE — the navigation graph
- `astro/src/pages/__census.astro` — CREATE then DELETE in this WP — a temporary self-check page

**Constraints:**
- DO: define the collections as
  `en: glob({ pattern: ["**/*.md", "!ru/**", "!INDEX.md", "!AUTHORING.md"], base: "../lessons", generateId })`
  and
  `ru: glob({ pattern: ["**/*.md", "!INDEX.md", "!GLOSSARY.md"], base: "../lessons/ru", generateId })`
- DO: use exactly this `generateId`, so ids match the corpus:
  `({ entry }) => entry.replace(/\.md$/, "").replace(/\/index$/, "")`. Without it Astro produces
  `…/index` and every id in the corpus stops resolving
- DO: keep the schema permissive — every field **optional**, `prereqs` an array defaulting to `[]`,
  and `title` written `z.string().optional()`. Examples files have **no frontmatter at all** — 297 per
  root — so a required `title` fails Zod validation for 594 entries and stops the build at this WP.
  The corpus's field *order* is verified by `tools/validate-content.mjs`, not by Astro, so the schema
  must not demand fields a child lesson does not have; the site derives an examples title from the
  parent entry instead (WP-13)
- DO: export from `corpus.ts`: `TOPICS` (the 8 prefixed strings in order), `TOPIC_TITLES` (the table
  above), `topicTitle(topic)`, `topicBlurb(topic)`, `isEntryId(id)` (two segments),
  `isChildId(id)` (three segments), `entryIdOf(id)` (an entry id or a child id → its entry id),
  `shape(frontmatter, id)` returning `"full" | "landing" | "area"`, and `Locale = "en" | "ru"`
- DO: implement `shape` as: `type === "area"` → `area`; an id with three segments → `full`;
  `tier === "small"` → `full`; otherwise → `landing`. This mirrors the corpus's own rule that tiers
  `small`/`area` have no children and medium/large are landings
- DO: export from `graph.ts`: `childrenOf(entryId)` (child ids by filename order),
  `prereqsOf(entryId)`, `relatedOf(entryId)`, `prevNextInEntry(id)` (previous and next child inside
  the same entry, `undefined` at the ends), `prevNextInTopic(entryId)` (previous and next **entry**
  inside the same topic, so the reader can page through a topic), and `entriesOfTopic(topic)`
  (entry ids in directory order)
- DO: derive all graph functions from `tools/inventory.json` read with `node:fs` plus the collection
  entries — never from `lessons/INDEX.md`, which is generated for humans and links at `.md` files
- DO: keep `corpus.ts` and `graph.ts` free of any `astro:` import so they stay plain, unit-testable
  TypeScript
- DO NOT: modify `tools/inventory.json`, or add a `related` key to it. `related` is frontmatter-only
- DO NOT: put `lessons/INDEX.md`, `lessons/AUTHORING.md` or `lessons/ru/GLOSSARY.md` into a collection
- DO NOT: keep `astro/src/pages/__census.astro` after this WP. It is a self-check, not a page

**Success:**
- [ ] Collections configured: `grep -c 'glob(' astro/src/content.config.ts` → 2
- [ ] Explicit id generation: `grep -c '/index\$/' astro/src/content.config.ts` → 1
- [ ] Library files exist: `test -f astro/src/lib/corpus.ts && test -f astro/src/lib/graph.ts` → exit 0
- [ ] No Astro imports in the libraries: `grep -c 'astro:' astro/src/lib/corpus.ts astro/src/lib/graph.ts` → `0` for each
- [ ] All eight topics in order: `grep -c '01-cs-fundamentals\|02-frontend\|03-design-ux\|04-product-process\|05-backend-data\|06-cloud-devops\|07-security\|08-soft-skills' astro/src/lib/corpus.ts` → at least 8
- [ ] Six graph helpers exported: `grep -cE 'export function (childrenOf|prereqsOf|relatedOf|prevNextInEntry|prevNextInTopic|entriesOfTopic)' astro/src/lib/graph.ts` → 6
- [ ] Census is correct — in `astro/src/pages/__census.astro`, render a single line reading
      `entries=<n> children=<n> examples=<n> topics=<n> prereqs=<n>` computed from the collections and
      inventory. Then: `cd astro && npm run build` → exit 0, and
      `grep -o 'entries=177 children=224 examples=297 topics=8 prereqs=119' astro/dist/__census/index.html` → 1 match
- [ ] Ids round-trip: the census page also prints `firstEntry` and `lastEntry` of `01-cs-fundamentals`.
      `grep -o 'firstEntry=01-cs-fundamentals/01-computer-science' astro/dist/__census/index.html` → 1 match
- [ ] Child order is filename order: the census prints `childrenOf("02-frontend/06-javascript")`.
      `grep -o 'children=02-frontend/06-javascript/01-syntax-and-semantics,02-frontend/06-javascript/02-the-dom-and-events,02-frontend/06-javascript/03-asynchronous-javascript,02-frontend/06-javascript/04-modules-and-tooling' astro/dist/__census/index.html` → 1 match
- [ ] Type check: `cd astro && npm run check` → exit 0
- [ ] Temporary page removed: `rm astro/src/pages/__census.astro`, then
      `test ! -f astro/src/pages/__census.astro` → exit 0, then `cd astro && npm run build` → exit 0
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing
- [ ] Gates still green: `node tools/validate-content.mjs --strict --lang en` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0

## Phase Verification

After all four work packages are complete, run:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git status --porcelain lessons/
```

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0 and `astro/dist/index.html` exists
- [ ] Both content gates report `0 error(s)` and exit 0
- [ ] `git status --porcelain lessons/` prints nothing — the corpus is provably untouched
- [ ] `git status --porcelain` shows only additions: `astro/` and a modified `.gitignore`
- [ ] No root `package.json` was created: `test ! -f package.json` → exit 0
