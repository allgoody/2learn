# Phase 4: Discovery and extras

## Objective

Add the pages that sit around the reader: a filterable index of all 177 entries, an about page, a
Russian glossary rendered from `lessons/ru/GLOSSARY.md`, RSS feeds for both locales, and full-text
search over both trees with Pagefind. After this phase the site is feature-complete; Phase 5 adds
video references and Phase 6 verifies and ships.

## Prerequisites

- Phase 3 complete: all 1396 corpus pages and 16 topic pages build, both home pages exist, and the
  404, robots and sitemap endpoints work.
- `astro/src/lib/lessons.ts` exports `allEntries`, `allLessons`, `classify`, `entryById`.
- `astro/src/lib/urls.ts` exports `entriesUrl`, `aboutUrl`, `glossaryUrl`, `searchUrl`, `feedUrl`.
- `dictionary.ts` has both label blocks for every new key this phase adds.

## Shared Context

**Reading is not modifying.** This phase reads `lessons/ru/GLOSSARY.md` at build time with `node:fs`
to render the glossary page. That is allowed and expected. What is forbidden is writing to it, or to
any other file under `lessons/`. Re-run `git status --porcelain lessons/` at the end of every WP here.

**Both locales, always.** Except for the glossary, which exists only in Russian because the
terminology table maps English words to Russian ones and is meaningless to an English reader, every
page in this phase exists twice. The `_index.md` route map is the authority on which URL belongs to
which locale.

**Filtering without a framework.** The entry index filters client-side over markup that is already in
the page: every row carries `data-topic`, `data-tier` and `data-type`, and the filter script toggles
the `hidden` attribute. The unfiltered list is what ships in the HTML, so the page is complete and
crawlable with JavaScript switched off.

---

## Work Packages

### WP-16: The entry index, filterable

**Context:**
This is where a reader who does not know what they are looking for lands. All 177 entries exist as
data in `lessons.ts`, and each has a topic, a tier and a type (`skill` or `area`) from
`tools/inventory.json`. There is no full-text blurb available for all of them — a `landing` or `area`
entry has prose but no single-line summary field — so rows carry the title, the topic, the tier and
the type, and nothing invented. `EntryList` accepts an optional `blurb`; this page passes none.

**Task:**
Create `astro/src/components/EntryFilter.astro` with the filter controls and their script, and the
two entry index pages.

**Files:**
- `astro/src/components/EntryFilter.astro` — CREATE — controls plus client-side filtering
- `astro/src/pages/entries.astro` — CREATE — English index
- `astro/src/pages/ru/entries.astro` — CREATE — Russian index

**Constraints:**
- DO: render all 177 entries as a `<ul>` of links to `lessonUrl(locale, id)`, each `<li>` carrying
  `data-topic`, `data-tier` and `data-type` attributes
- DO: render topic as a `<select>` with an "all" option, and tier and type as `<select>`s, each with a
  `<label>` that is visually present — not `aria-label` alone, and not a placeholder
- DO: put a live count of visible rows in the page, in an `aria-live="polite"` region, so a screen
  reader user learns the filter worked
- DO: keep the controls in a real `<form>` with `method="get"` so the markup is meaningful, and call
  `event.preventDefault()` in the script
- DO: do the filtering by toggling the `hidden` attribute on `<li>` elements. No re-rendering, no
  framework, no innerHTML
- DO: make the controls and the rows usable at 360px wide. The `<select>`s stack
- DO: render the entry count per topic as a small heading group if the list is long, so a reader
  scanning 177 rows has landmarks
- DO: sort rows by topic order then by id, matching `TOPICS` order — not alphabetically
- DO NOT: fetch anything. The filter reads the DOM it is in
- DO NOT: hide rows with `display: none` in CSS only — use the `hidden` attribute so assistive
  technology is told as well
- DO NOT: add a search box here. WP-20 owns search
- DO NOT: invent a blurb for an entry that has none

**Success:**
- [ ] Files exist: `test -f astro/src/components/EntryFilter.astro && test -f astro/src/pages/entries.astro && test -f astro/src/pages/ru/entries.astro` → exit 0
- [ ] Every entry is listed: `grep -o 'href="/0[1-8]-[a-z0-9-]*/[a-z0-9-]*/"' astro/dist/entries/index.html | wc -l` → 177
- [ ] Every entry is listed in Russian: `grep -o 'href="/ru/0[1-8]-[a-z0-9-]*/[a-z0-9-]*/"' astro/dist/ru/entries/index.html | wc -l` → 177
- [ ] Rows carry filter data: `grep -o 'data-topic=' astro/dist/entries/index.html | wc -l` → 177
- [ ] Controls are labelled: `grep -o '<label' astro/dist/entries/index.html | wc -l` → at least 3
- [ ] Live count exists: `grep -c 'aria-live="polite"' astro/dist/entries/index.html` → 1
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual with JavaScript disabled: every entry is visible and every link works
- [ ] Manual: choose a topic and confirm the count updates and only that topic's rows remain. Tab
      through the controls and confirm every focus ring is visible.

---

### WP-17: About pages

**Context:**
There is no existing about copy to reuse. This page is short and factual: what the corpus is, how it
is organised, and how to read it. It must not invent facts about the project's owner, purpose,
contact details, licensing or hosting. Where such a detail is genuinely required, write the sentence
with a visible `TODO: confirm` and report it rather than guessing.

The corpus's own facts are safe to state, and they are the interesting part: 177 entries across 8
topics, each entry a skill or an area, a prerequisite graph, worked examples in a sidecar file, and a
full Russian mirror.

**Task:**
Create the two about pages.

**Files:**
- `astro/src/pages/about.astro` — CREATE — English about page
- `astro/src/pages/ru/about.astro` — CREATE — Russian about page

**Constraints:**
- DO: state the corpus shape from `tools/inventory.json` and the measured file counts, computed at
  build time rather than typed as literals — 177 entries, 8 topics, 297 examples per locale
- DO: explain the reading order in one short paragraph: each entry lists prerequisites, and `Go
  deeper` names what to read next
- DO: explain the two languages in one sentence, and link to the other locale with the language
  switch
- DO: keep it under 400 words. If the content is longer than a screen and a half on a phone, it is
  too long
- DO: write the Russian page in Russian, in the corpus's vocabulary
- DO: mark every unknown with a visible `TODO: confirm` and list them in the WP's completion report
- DO NOT: claim a licence, an affiliation, a company, a contact address, or a publication date
- DO NOT: describe the site's own technology. The reader does not need to know it is built with Astro
- DO NOT: add a `## Prerequisites`-style heading set. This is not a corpus entry; use plain prose
  headings

**Success:**
- [ ] Files exist: `test -f astro/src/pages/about.astro && test -f astro/src/pages/ru/about.astro` → exit 0
- [ ] Counts are computed, not typed: `grep -cE '177|297' astro/src/pages/about.astro` → 0
- [ ] Russian page is in Russian: `grep -o '[А-Яа-я]' astro/dist/ru/about/index.html | wc -l` → at least 20
- [ ] No invented facts: the WP report lists every `TODO: confirm` line added
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] hreflang pairs them: `grep -c 'hreflang="ru"' astro/dist/about/index.html` → 1

---

### WP-18: The Russian glossary

**Context:**
`lessons/ru/GLOSSARY.md` is the Russian corpus's single source of truth for terminology. It has three
sections: `## Правила заголовков` (rules, prose bullets), `## Терминология` (a 43-row
English↔Russian table), and `## Названия записей` (a table of all 177 entry titles). It is **read-only
for this plan** — the page renders it, nothing more.

The file is deliberately excluded from the `ru` collection (WP-4), so read it from disk. Resolve its
path from the page's own location with `node:fs`, not from the current working directory.

**Task:**
Create `astro/src/pages/ru/glossary.astro`, rendering the terminology table and the entry-title table
as real HTML tables.

**Files:**
- `astro/src/pages/ru/glossary.astro` — CREATE — the glossary page

**Constraints:**
- DO: read `lessons/ru/GLOSSARY.md` with `node:fs` at build time and parse the two tables by splitting
  the file on its `## ` headings, then splitting rows on `|`
- DO: render both tables as `<table>` with `<thead>`, `<th scope="col">` and `<tbody>`. A table of
  comparable values is a table; do not turn it into a definition list
- DO: strip the leading and trailing pipes and whitespace from every cell, keep cell contents as
  text, and render inline code backticks as `<code>`
- DO: wrap each table in a container that scrolls horizontally on narrow screens instead of
  overflowing the page
- DO: pass `noAlternates` to the layout, because this page has no English counterpart
- DO: give the page headings in Russian from `dict.glossaryTitle` and the file's own section headings
- DO: link an entry title in the `Названия записей` table to its Russian entry page where the id
  resolves, and render it as plain text where it does not
- DO NOT: modify `lessons/ru/GLOSSARY.md`, or any other file under `lessons/`
- DO NOT: hardcode a term, a translation or a title. Everything comes from the file
- DO NOT: render the `## Правила заголовков` prose section. It is an instruction to writers, not to
  readers
- DO NOT: add a dependency for markdown table parsing. Split on `|`

**Success:**
- [ ] File exists: `test -f astro/src/pages/ru/glossary.astro` → exit 0
- [ ] Reads the file rather than embedding it: `grep -c 'GLOSSARY.md' astro/src/pages/ru/glossary.astro` → 1
- [ ] File is untouched: `git status --porcelain lessons/ru/GLOSSARY.md` → prints nothing
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Page exists: `test -f astro/dist/ru/glossary/index.html` → exit 0
- [ ] Terminology rendered: `grep -o '<th scope="col"' astro/dist/ru/glossary/index.html | wc -l` → at
      least 2 (two tables' worth of headers)
- [ ] Row counts are right: `grep -o '<tr>' astro/dist/ru/glossary/index.html | wc -l` → at least 220
      (43 terminology rows plus 177 title rows)
- [ ] No English counterpart was generated: `test ! -f astro/dist/glossary/index.html` → exit 0
- [ ] Manual: open the page at 360px wide. The tables scroll sideways rather than pushing the page
      wider, and no cell text is clipped.

---

### WP-19: RSS feeds

**Context:**
Two feeds, one per locale. `@astrojs/rss` is already installed (WP-1) and needs nothing else.

The corpus has **no dates**. Every entry is `status: drafted` and nothing records when it was
written. So these are not news feeds: they are "what exists in this corpus" feeds, one item per
entry. RSS permits items without a `pubDate`, but some readers will then show no date. Say so in the
plan's report rather than inventing a timestamp — a fabricated date is worse than a missing one.

**Task:**
Create the two feed endpoints.

**Files:**
- `astro/src/pages/feed.xml.ts` — CREATE — English feed
- `astro/src/pages/ru/feed.xml.ts` — CREATE — Russian feed

**Constraints:**
- DO: export a `GET` that returns `rss({ … })` from `@astrojs/rss`, with `title` from
  `dict.siteName`, `description` from `dict.siteTagline`, `site: Astro.site` and `items`
- DO: emit one item per entry — 177 of them — with `title` equal to the entry's own title, `link`
  equal to the absolute URL from `lessonUrl(locale, id)`, and `description` equal to
  `describe(locale, id)` from `lessons.ts` — the same function the lesson page uses. Do not write a
  second description builder here
- DO: set `categories: [topicTitle(topic)]` on each item, so the topic title is the item's RSS
  category. Do not use `customData`; it does not exist in `@astrojs/rss`'s item type
- DO: omit `pubDate` on every item, and add a comment in both files reading
  `// Dates are deliberately absent: the corpus records no dates, and a fabricated one is worse.`
  Keep the field name out of the comment — the Success check below greps the source for it, and a
  comment that contains it would fail the check it is meant to explain
- DO: emit an `xmlns:atom` self-link so readers can discover the feed
- DO: keep the endpoint path free of a trailing slash — `/feed.xml` and `/ru/feed.xml`
- DO NOT: run git commands at build time to obtain dates. A Cloudflare Pages build may be a shallow
  clone with no history to read
- DO NOT: include topic pages, examples files or site pages. Entries only
- DO NOT: include the corpus's raw markdown in `description` — the derived one-sentence description
  is the right length

**Success:**
- [ ] Files exist: `test -f astro/src/pages/feed.xml.ts && test -f astro/src/pages/ru/feed.xml.ts` → exit 0
- [ ] No invented dates: `grep -c 'pubDate' astro/src/pages/feed.xml.ts astro/src/pages/ru/feed.xml.ts` → `0` for each
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Both feeds exist at the right paths: `test -f astro/dist/feed.xml && test -f astro/dist/ru/feed.xml` → exit 0
- [ ] Item counts are complete: `grep -o '<item>' astro/dist/feed.xml | wc -l` → 177 and
      `grep -o '<item>' astro/dist/ru/feed.xml | wc -l` → 177
- [ ] Russian feed links into the Russian tree: `grep -o '<link>https://[^<]*/ru/0[1-8]-' astro/dist/ru/feed.xml | wc -l` → 177
- [ ] Well-formed XML: `node -e "const s=require('fs').readFileSync('astro/dist/feed.xml','utf8');if(!/^<\?xml/.test(s))throw new Error('no xml decl');if(s.split('<item>').length-1!==177)throw new Error('item count');console.log('ok')"` → `ok`
- [ ] No trailing-slash variant exists: `test ! -f astro/dist/feed.xml/index.html` → exit 0

---

### WP-20: Full-text search with Pagefind

**Context:**
Pagefind indexes the **built** site, not the source, so it runs as a step after `astro build`. It
writes its index and its UI assets into `dist/pagefind/`, which means the search UI is a plain file
served from our own origin and **imported by nothing**. That matters: this project has a documented
trap where `import('/pagefind/pagefind.js')` is rewritten by Vite into its preload helper and throws
at runtime, making the feature look permanently unavailable. Loading the UI with an ordinary
`<script src="/pagefind/pagefind-ui.js" defer>` from the built output avoids Vite entirely and sidesteps
the trap. Do not use a dynamic `import()` of any path under `/pagefind/`.

Pagefind indexes both languages from the one build. To keep a Russian reader out of English results,
the layout tags each page with a filter and the search page passes the matching filter.

**Task:**
Install Pagefind, add the indexing step to the build script, tag the layout for indexing and for the
language filter, exclude the search pages from the sitemap, and create the two search pages.

**Files:**
- `astro/package.json` — MODIFY — `build` becomes `astro build && pagefind --site dist`
- `astro/src/layouts/BaseLayout.astro` — MODIFY — add `data-pagefind-filter="lang:…"` on `<html>`,
  `data-pagefind-body` on `<main>`, and `data-pagefind-ignore` on the table of contents
- `astro/astro.config.mjs` — MODIFY — extend the sitemap `filter` to exclude `/search/`
- `astro/src/pages/search.astro` — CREATE — English search page
- `astro/src/pages/ru/search.astro` — CREATE — Russian search page

**Constraints:**
- DO: add `data-pagefind-filter={`lang:${locale}`}` to the `<html>` element in `BaseLayout.astro`
- DO: add `data-pagefind-body` to the `<main id="main">` element, so navigation, the footer and the
  consent banner are not indexed as page content
- DO: add `data-pagefind-ignore` to `TableOfContents`'s wrapper, so a table of contents does not
  pollute an entry's indexed text with its own heading list
- DO: load the UI with `<link rel="stylesheet" href="/pagefind/pagefind-ui.css">` and
  `<script src="/pagefind/pagefind-ui.js" defer></script>`, then initialise it in a normal `<script>`
  with `new PagefindUI({ element: "#search", showSubResults: true, showImages: false, ... })` passing
  `filters: [{ id: "lang", values: [locale] }]` and the strings from the dictionary
- DO: guard the initialisation. After the deferred script loads, if `typeof PagefindUI === "undefined"`
  reveal the message from `dict.searchBuiltOnly` instead of throwing. This is the normal state in
  `npm run dev`, because the index only exists after a build
- DO: give the search input an accessible name from `dict.searchPlaceholder`, and check that the
  Pagefind UI renders a label or add one
- DO: add `--site dist` explicitly so the index location never depends on a working directory
- DO: keep the sitemap filter excluding both `/404/` and any path containing `/search/`
- DO NOT: `import()` anything from `/pagefind/`. Not with a variable specifier, not with
  `/* @vite-ignore */`, not wrapped in `new Function`. Use the `<script src>` above
- DO NOT: add a second Pagefind index per language. One index with a filter
- DO NOT: index the whole `<body>` — the shell would match on every page
- DO NOT: commit the index. It is inside `dist/`, which `.gitignore` already covers

**Success:**
- [ ] Build step wired: `grep -c 'pagefind --site dist' astro/package.json` → 1
- [ ] Full build produces an index: `cd astro && npm run build && cd ..` → exit 0, then
      `test -d astro/dist/pagefind` → exit 0
- [ ] The index is substantial: `du -sk astro/dist/pagefind | cut -f1` → at least 200 (KB)
- [ ] Language filter is emitted per locale:
      `grep -c 'data-pagefind-filter="lang:en"' astro/dist/index.html` → 1 and
      `grep -c 'data-pagefind-filter="lang:ru"' astro/dist/ru/index.html` → 1
- [ ] Only the main content is indexed: `grep -c 'data-pagefind-body' astro/dist/index.html` → 1
- [ ] Search pages exist: `test -f astro/dist/search/index.html && test -f astro/dist/ru/search/index.html` → exit 0
- [ ] No dynamic import of the index: `grep -rn "import(.*pagefind" astro/src astro/astro.config.mjs` → prints nothing
- [ ] Sitemap excludes search: `grep -c '/search' astro/dist/sitemap-0.xml` → 0
- [ ] Manual, against `npm run preview` (not `npm run dev`): search a distinctive English phrase from
      an English entry. English results only. Then on `/ru/search/` search a distinctive Russian
      phrase. Russian results only. Confirm results link to the right pages.
- [ ] Manual: in `npm run dev`, the search page shows the "available in the built site" message and
      throws nothing in the console

## Phase Verification

After all five work packages are complete, run:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git status --porcelain lessons/
```

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0 and `astro/dist/pagefind` exists afterwards
- [ ] Both content gates report `0 error(s)` and exit 0
- [ ] `git status --porcelain lessons/` prints nothing — including `lessons/ru/GLOSSARY.md`
- [ ] Locale page parity holds, shifted by exactly one:
      `find astro/dist -name index.html -not -path 'astro/dist/ru/*' | wc -l` → **711** and
      `find astro/dist/ru -name index.html | wc -l` → **712**. The arithmetic: 708 at the end of
      Phase 3, plus `/entries/`, `/about/` and `/search/` in both trees = 711 each, plus
      `/ru/glossary/` which exists only in Russian = 712
- [ ] Manual: complete a full pass of the five new page types in both locales, keyboard only
