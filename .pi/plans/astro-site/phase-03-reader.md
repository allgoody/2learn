# Phase 3: Reader

## Objective

Turn the corpus into pages. This phase adds the markdown transform that makes the corpus's
id-bearing bullets into working links, the data-access layer, the reader's presentational
components, one router that enumerates every corpus URL in both locales, the home pages, and the
404/robots/sitemap plumbing. After this phase the site is a complete reading experience for all
1396 corpus files; Phases 4–5 only add extra pages around it.

## Prerequisites

- Phase 2 complete: `BaseLayout.astro` exists with `header` and `footer` slots, `urls.ts` and
  `dictionary.ts` are exported, and the header, footer and consent banner render.
- `astro/src/lib/corpus.ts` exports `TOPICS`, `TOPIC_TITLES`, `topicTitle`, `topicBlurb`, `Locale`,
  `shape`, `isEntryId`, `isChildId`, `entryIdOf`.
- `astro/src/lib/graph.ts` exports `childrenOf`, `prereqsOf`, `relatedOf`, `prevNextInEntry`,
  `prevNextInTopic`, `entriesOfTopic`.
- Both content gates are green.

## Shared Context

**How the corpus's links work.** Four of the corpus's sections carry references to other entries,
and **all four write the id in backticks**. Measured across both roots: 177 of 177 entry files use
the backticked form, 0 use a bare `(<id>)`.

| Section | Bullet shape |
| --- | --- |
| `Go deeper` / `Что читать дальше` | `- **<Title>** (\`<id>\`) — <why>` |
| `In this track` / `Что в этом треке` | `1. **<Title>** (\`<id>\`) — <line>` |
| `Included skills` / `Входящие навыки` | `- **<Title>** (\`<id>\`) — <line>` |
| `Prerequisites` / `Предварительные требования` | `- **<Title>** (\`<id>\`)` |

Navigation on this site depends entirely on turning those ids into anchors. That is WP-10's job and
it is the highest-value code in the plan. `tools/validate-content.mjs` V12 already guarantees every
such id resolves, so the transform may assume the ids are valid — but it still validates, because a
silent dead link is worse than a loud missing one.

**Where the locale comes from in a markdown plugin.** A rehype plugin runs once per file and receives
the VFile as its second argument. The file paths are under `lessons/` and `lessons/ru/`, so `file.path`
tells the plugin which prefix a link needs. This is build-time only and deterministic. If
`file.path` turns out to be empty at runtime, **stop and report it** — do not improvise another
mechanism.

**One router, not four.** Astro cannot express `src/pages/[...path]/examples.astro`, because a rest
parameter must be the last segment. So the corpus is enumerated in exactly one `getStaticPaths()`
per locale, which tags each generated page with a `kind` of `topic`, `lesson` or `examples`. Routing
every corpus URL from one place also means there is one place where the corpus is walked — which is
what makes the "did every file get a page?" check trivial.

The site-page routes from later phases (`/entries/`, `/about/`, `/search/`) are static routes and
therefore have higher priority than a rest parameter, so they cannot be shadowed.

**Prev/next has two kinds.** Inside an entry, children page in filename order. Inside a topic, entries
page in directory order. Both come from `graph.ts`; do not recompute them in a component.

---

## Work Packages

### WP-10: The markdown transform — ids into links, `Done when:` into a callout

**Context:**
Rendered markdown arrives as a hast tree. Inside a list item, an id always appears as
`<code>02-frontend/05-css</code>` — the backticked form, measured in 177 of 177 entry files in both
roots. No file writes a bare `(02-frontend/05-css)`, so that case is not handled. The paragraph that
ends a `## Practice` exercise begins with the literal `Done when:` — or `Готово, когда:` in the
Russian tree.

The valid-id set is built exactly the way `tools/validate-content.mjs` builds it for its V12 check:
every `id` from `tools/inventory.json`, plus every `NN-<slug>.md` filename under each
`lessons/<topic>/<slug>/` directory, taken from the English tree, which is authoritative.

**Task:**
Create `astro/src/lib/rehype-content.mjs` — a zero-dependency rehype plugin — and wire it into
`astro/astro.config.mjs` as `markdown.rehypePlugins`.

**Files:**
- `astro/src/lib/rehype-content.mjs` — CREATE — the plugin
- `astro/astro.config.mjs` — MODIFY — add `markdown.rehypePlugins: [rehypeContent]`

**Constraints:**
- DO: read the valid-id set with `node:fs` from `tools/inventory.json` and by listing
  `lessons/<topic>/<slug>/` for filenames matching `/^\d{2}-.*\.md$/`. Resolve both paths relative to
  the plugin file (`import.meta.url`), *not* the current working directory
- DO: accept a `{ root }` option defaulting to the repository root, so the plugin can be exercised
  from a script
- DO: write two rules over the same tree walk:
  1. A `<code>` element whose parent is an `<li>` and whose text is a valid id → replace it with an
     `<a>` carrying the same text and `href` equal to `"/" + id + "/"` (prefixed with `/ru` in the
     Russian tree). This is the only form the corpus uses — all 177 entry files in each root write
     the id in backticks, and none writes a bare `(<id>)`, so there is no second rule to write
  2. A `<p>` whose first text node begins with `Done when:` or `Готово, когда:` → add
     `class="done-when"` to the paragraph
- DO: determine the locale prefix from the VFile path — `/ru` when `file.path` contains
  `/lessons/ru/`, otherwise `""`
- DO: never touch a `<code>` inside a `<pre>`, and never touch a `<code>` whose parent is anything
  other than an `<li>`. Block code must come through byte-identical
- DO: leave any id that is not in the valid set alone — produce no link and no warning
- DO: write the plugin as ESM with a default-exported function, so it can be imported directly in
  `astro.config.mjs`
- DO NOT: add a dependency. `unist-util-visit` is not installed and must not be added; write the
  small recursive walk yourself
- DO NOT: use `file.path` for anything except choosing the `/ru` prefix
- DO NOT: make the plugin throw on an unexpected tree shape. Bail out of the rule and leave the node
  alone
- DO NOT: rewrite anything inside a fence, a table cell, or a heading

**Success:**
- [ ] File exists: `test -f astro/src/lib/rehype-content.mjs` → exit 0
- [ ] No new dependencies: `grep -c 'unist-util-visit\|hastscript' astro/src/lib/rehype-content.mjs` → 0
- [ ] Wired into markdown: `grep -c 'rehypePlugins' astro/astro.config.mjs` → 1
- [ ] Both rules present: `grep -c 'done-when' astro/src/lib/rehype-content.mjs` → at least 1 and
      `grep -c 'Готово, когда' astro/src/lib/rehype-content.mjs` → at least 1
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] **Ids became links in the English tree.** `02-frontend/03-html/index.md` has a `Go deeper`
      bullet naming `02-frontend/05-css`:
      `grep -o 'href="/02-frontend/05-css/"' astro/dist/02-frontend/03-html/index.html | head -1` → 1 match
- [ ] **Ids became links in the Russian tree, with the prefix.** The same entry mirrored at
      `lessons/ru/02-frontend/03-html/index.md`:
      `grep -o 'href="/ru/02-frontend/05-css/"' astro/dist/ru/02-frontend/03-html/index.html | head -1` → 1 match
- [ ] **The `## Prerequisites` bullet links.** `02-frontend/06-javascript/index.md` lists
      `02-frontend/03-html` in backticks inside its `## Prerequisites` section:
      `grep -o 'href="/02-frontend/03-html/"' astro/dist/02-frontend/06-javascript/index.html | head -1` → 1 match
- [ ] **Child ids link.** `02-frontend/06-javascript/index.md`'s `In this track` names children:
      `grep -o 'href="/02-frontend/06-javascript/01-syntax-and-semantics/"' astro/dist/02-frontend/06-javascript/index.html | head -1` → 1 match
- [ ] **`Done when:` is marked.** `02-frontend/03-html/index.md` has two of them:
      `grep -o 'class="done-when"' astro/dist/02-frontend/03-html/index.html | wc -l` → 2
- [ ] **Fences are untouched.** `02-frontend/03-html/index.md` contains a fence with `<article>`:
      `grep -c '&lt;article&gt;' astro/dist/02-frontend/03-html/index.html` → at least 1, and
      `grep -c 'href="/02-frontend/03-html/' astro/dist/02-frontend/03-html/index.html` → 0 (no
      self-link was invented inside code)
- [ ] If `file.path` was empty, `href="/ru/…"` will be missing above. **If that check fails, stop and
      report it** — do not swap in a different mechanism
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing

---

### WP-11: Data access for the reader

**Context:**
Phase 1's `corpus.ts` and `graph.ts` are deliberately free of `astro:` imports. Something has to
join them to the collections. That is this file: the only module that imports from `astro:content`,
so the rest of the site can ask plain questions and get plain answers.

An entry's rendered content comes from `render(entry)`, which returns `{ Content, headings }`.
`headings` is the tree the table of contents is built from, so do not parse headings out of the HTML.

**Task:**
Create `astro/src/lib/lessons.ts` exposing the reader's lookups.

**Files:**
- `astro/src/lib/lessons.ts` — CREATE — collection-backed lookups

**Constraints:**
- DO: export `type Kind = "topic" | "lesson" | "examples"`
- DO: export `allEntries(locale)` returning every index entry, keyed by corpus id, sorted by id
- DO: export `allLessons(locale)` returning every entry whose id is not an examples file
- DO: export `allExamples(locale)` returning every examples file keyed by the **lesson id it belongs
  to** — strip a trailing `/examples` **or** `/examples.NN-<slug>`. Child examples are named
  `examples.NN-<slug>` beside `NN-<slug>.md`, not `NN-<slug>/examples`, so a `$`-anchored `/examples`
  test silently misses 224 of the 297 files per root
- DO: export `entryById(locale, id)`, `childrenOf(locale, entryId)`, `topicEntries(locale, topic)`
- DO: export `examplesFor(locale, lessonId)` returning the examples entry or `undefined`
- DO: export `classify(locale, id)` returning `{ kind: Kind; lessonId: string }` — `"examples"` when
  the id's **last segment** starts with `examples` (so both `<entry>/examples` and
  `<entry>/examples.NN-<slug>` match), `"topic"` when the id has one segment, otherwise `"lesson"`.
  For a topic id the `lessonId` equals the id itself; for an examples id it is the parent **lesson**
  id, which for a child's examples is that child lesson
- DO: export `describe(locale, id)` returning a plain-text page description, and make it the **only**
  place a description is derived: for a topic id, `topicBlurb(topic)`; for an examples id,
  `describe(locale, parentLessonId)`; for a lesson, the first paragraph of the entry body after its
  first `## ` heading, with inline code and emphasis markers stripped, cut at the first sentence end
  (`. `, `! `, `? `) and truncated to 155 characters at a word boundary. WP-13 and WP-19 both call it
  rather than each building their own
- DO: export `renderLesson(entry)` as a thin wrapper over `render(entry)` from `astro:content`,
  returning `{ Content, headings }`
- DO: keep every export either pure or collection-backed. No component, no markup, no CSS in this file
- DO NOT: import `graph.ts`'s pure helpers into a component directly — go through this module, so
  there is one place that touches the collection API
- DO NOT: sort or renumber anything. Corpus order is directory order, and `graph.ts` already returns
  it
- DO NOT: read `lessons/INDEX.md`, `lessons/ru/INDEX.md`, or `lessons/ru/GLOSSARY.md`

**Success:**
- [ ] File exists: `test -f astro/src/lib/lessons.ts` → exit 0
- [ ] Only one module imports the content API: `grep -rl "astro:content" astro/src | sort` → lists
      `astro/src/content.config.ts` and `astro/src/lib/lessons.ts` only
- [ ] `classify` and `describe` exist once each:
      `grep -cE 'export (function|const) classify' astro/src/lib/lessons.ts` → 1 and
      `grep -cE 'export (function|const) describe' astro/src/lib/lessons.ts` → 1
- [ ] Examples detection covers both naming shapes: `grep -c 'examples\.' astro/src/lib/lessons.ts` → at least 1
- [ ] Type check: `cd astro && npm run check` → exit 0
- [ ] Build green: `cd astro && npm run build` → exit 0

---

### WP-12: The reader's presentational components

**Context:**
Four small components carry the whole reading experience. All of them are pure presentation — they
receive data as props and render markup; none of them fetches anything.

- `Prose` is the wrapper that applies the `.prose` class from `global.css` (WP-2). It also passes the
  locale through as a `lang` attribute so a screen reader announces Russian code comments correctly.
- `TableOfContents` builds from the `headings` array that `render()` returns. Only headings with
  depth 2 and 3 are listed; the corpus never uses depth 4 (verified: zero `####` in 1396 files).
- `LessonNav` renders previous/next and the prerequisite and related lists. Prerequisites and
  related are **already rendered by WP-10** when they appear in the prose; `LessonNav` exists for the
  entries where they do not — a `small` skill and a child lesson have no `## Prerequisites` section
  at all, and 174 of 177 entries have an empty `related`.
- `EntryList` renders a list of entries with their title, tier and one-line blurb.

Astro scopes component styles by default. `TableOfContents` and `LessonNav` need to style markup that
`Prose` renders, so they must use `:global()` where they reach outside their own subtree — or,
simpler, target only their own elements.

**Task:**
Create the four components.

**Files:**
- `astro/src/components/Prose.astro` — CREATE — the reading column wrapper
- `astro/src/components/TableOfContents.astro` — CREATE — heading list
- `astro/src/components/LessonNav.astro` — CREATE — prev/next, prerequisites, related
- `astro/src/components/EntryList.astro` — CREATE — entry list with titles and blurbs

**Constraints:**
- DO: make `Prose` render `<div class="prose" lang={locale}><slot /></div>` and nothing else
- DO: make `TableOfContents` accept `{ headings, locale }`, filter to `depth >= 2 && depth <= 3`, and
  link each item to `#${heading.slug}`. If no heading qualifies it renders nothing at all — not an
  empty list, not an empty `<nav>`
- DO: give `TableOfContents` an accessible name from `dict.tocTitle` and a real `<nav>` element, and
  put `data-toc` on that `<nav>`. The attribute carries no styling and is not read by assistive
  technology; WP-13's verification uses it to tell whether a table of contents rendered at all
- DO: make `LessonNav` accept `{ locale, entryId, prev, next, prereqs, related }` where each list is
  an array of `{ id, title }`, and render each list only when non-empty. Prev/next is a pair of links
  labelled `dict.prevLabel` and `dict.nextLabel`; render a disabled-looking `<span>` when an end is
  reached rather than a dead link
- DO: make `EntryList` accept `{ locale, items }` where each item is
  `{ id, title, tier, blurb? }`, and link each to `lessonUrl(locale, id)`
- DO: resolve every link through `urls.ts`. Never build a path with a template literal in a component
- DO: give every link visible, sufficient contrast and a visible focus ring
- DO: put the `prev`/`next` controls in their own `<nav aria-label>` so a screen reader can jump to them
- DO: wrap `LessonNav`'s prerequisite list in `<nav data-lesson-prereqs>` so the plan's verification can tell
  whether it was rendered. The attribute carries no styling and is not read by assistive technology
- DO NOT: render `status`. Every entry is `drafted`
- DO NOT: render the corpus's heading strings from a dictionary key. If a heading must be displayed,
  it came from the content
- DO NOT: add a table of contents to an examples page, a topic page or a home page
- DO NOT: import from `astro:content` in any of these four components

**Success:**
- [ ] Files exist: `test -f astro/src/components/Prose.astro && test -f astro/src/components/TableOfContents.astro && test -f astro/src/components/LessonNav.astro && test -f astro/src/components/EntryList.astro` → exit 0
- [ ] No content-API imports in components: `grep -rl "astro:content" astro/src/components` → prints nothing
- [ ] No hardcoded paths: `grep -rnE 'href="/0[1-8]-' astro/src/components` → prints nothing
- [ ] ToC is depth-limited: `grep -c 'depth' astro/src/components/TableOfContents.astro` → at least 1
- [ ] Labels come from the dictionary: `grep -c 'dict\.' astro/src/components/LessonNav.astro` → at least 2
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual: navigate to a full lesson, confirm its `Core ideas` subheadings appear in the table of
      contents and that clicking one scrolls to that heading and puts the focus there

---

### WP-13: The corpus router

**Context:**
One `getStaticPaths()` per locale enumerates **every** corpus URL: the 8 topic pages, the 177 entry
pages, the 224 child lesson pages, and the 297 examples pages. That is **706 pages per locale, 1412
in total** — 177 + 224 + 297 = 698 corpus pages, plus the 8 topic pages per locale.

The three body shapes render through one code path because they differ only in which `##` headings
the content contains, and the content is already rendered. What differs is the surrounding chrome:
a topic page gets an entry list, an entry page gets a table of contents and prev/next, an examples
page gets neither.

The `## Prerequisites` section is present only on landing-shaped entries. For the other shapes the
prerequisites are already linked inside the `Go deeper` prose by WP-10, so `LessonNav` must render
the prereq list only when the content does **not** already contain one — otherwise the page shows
the same list twice.

**Task:**
Create `astro/src/pages/[...path].astro` and `astro/src/pages/ru/[...path].astro`, each enumerating
its locale's corpus and rendering a topic page, a lesson page or an examples page.

**Files:**
- `astro/src/pages/[...path].astro` — CREATE — English corpus router
- `astro/src/pages/ru/[...path].astro` — CREATE — Russian corpus router

**Constraints:**
- DO: in `getStaticPaths()`, emit one entry per corpus id, with `params: { path: id }` and props
  `{ locale, id, kind, title, path }`. `path` is the locale-neutral EN path used for hreflang, e.g.
  `/02-frontend/06-javascript/`
- DO: cover all four kinds — topic ids (one segment), entry ids (two), child ids (three), and
  examples ids
- DO: for an examples page, derive the title from the parent lesson's title plus `dict.examplesTitle`,
  using `entryIdOf(id)` for the parent — for `…/examples.01-syntax-and-semantics` that is the child
  lesson `…/01-syntax-and-semantics`, whose frontmatter carries the title. Pass `noAlternates` only
  if the parent lesson has no counterpart — which never happens, so always pass the real `path`
- DO: render, in order: `<BaseLayout>` with the page's title and description, a breadcrumb back to the
  topic, the lesson heading as an `<h1>`, the alias line when `frontmatter.aliases` is non-empty, then
  for a lesson page a `<TableOfContents>` beside the `<Prose>` content, then `<LessonNav>`, then a
  link to the examples file when one exists
- DO: place the table of contents in a sticky rail at `>= 64rem` and above the content below that
  breakpoint
- DO: render `<LessonNav>`'s prerequisite list only for landing-shaped entries, whose content carries
  a `## Prerequisites` section. For every other shape pass an empty prerequisite list, because WP-10
  already linked the prereqs inside `Go deeper`
- DO: take the page description from `describe(locale, id)` in `lessons.ts` (WP-11) — the topic blurbs,
  the examples passthrough and the 155-character first-sentence rule all live there. Do not build a
  second description in the route and do not invent copy
- DO: put the table of contents **after** the `<h1>` in DOM order, so a keyboard user reaches it before
  the body text
- DO NOT: read the three RU heading strings from the dictionary. Use them only when checking, in
  `constraints`, whether content contains a `## Prerequisites` section — and do that by testing the
  rendered content for the heading element rather than matching a literal where avoidable
- DO NOT: render an `<h1>` from the frontmatter `title` on an examples page. Examples files have no
  frontmatter
- DO NOT: generate a page for `INDEX.md`, `AUTHORING.md` or `GLOSSARY.md`. They are excluded by the
  collection patterns in WP-4
- DO NOT: add a route for `/` here. `src/pages/index.astro` owns it

**Success:**
- [ ] Files exist: `test -f 'astro/src/pages/[...path].astro' && test -f 'astro/src/pages/ru/[...path].astro'` → exit 0
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] **Every corpus file got a page, and the two trees are in exact parity.** Count both:
      `find astro/dist -name index.html -not -path 'astro/dist/ru/*' | wc -l` → **708** and
      `find astro/dist/ru -name index.html | wc -l` → **708**.
      The arithmetic, so you can check it rather than trust it: 8 topic pages + 177 entry pages +
      224 child pages + 297 examples pages = **706**, plus the home page = 707, plus the privacy page
      from WP-9 = **708**
- [ ] Spot-check a small skill: `test -f astro/dist/02-frontend/03-html/index.html` → exit 0
- [ ] Spot-check a child lesson: `test -f astro/dist/02-frontend/06-javascript/01-syntax-and-semantics/index.html` → exit 0
- [ ] Spot-check an entry's examples: `test -f astro/dist/02-frontend/03-html/examples/index.html` → exit 0
- [ ] Spot-check a child's examples: `test -f astro/dist/02-frontend/06-javascript/examples.01-syntax-and-semantics/index.html` → exit 0
- [ ] A lesson page renders a table of contents: `grep -c 'data-toc' astro/dist/02-frontend/03-html/index.html` → 1
- [ ] A child's examples page does not, which proves those ids classified as examples rather than as
      lessons: `grep -c 'data-toc' astro/dist/02-frontend/06-javascript/examples.01-syntax-and-semantics/index.html` → 0
- [ ] Spot-check a topic page: `test -f astro/dist/01-cs-fundamentals/index.html` → exit 0
- [ ] Spot-check the Russian mirror: `test -f astro/dist/ru/02-frontend/03-html/index.html` → exit 0
- [ ] No duplicated prerequisite list on a small skill, because WP-10 already linked them inside
      `Go deeper`: `grep -c 'data-lesson-prereqs' astro/dist/02-frontend/03-html/index.html` → 0
- [ ] The prerequisite list **is** rendered on a landing shape, which has no `Go deeper` prereq bullets:
      `grep -c 'data-lesson-prereqs' astro/dist/02-frontend/06-javascript/index.html` → 1
- [ ] Russian `lang` is correct: `grep -o 'html lang="[^"]*"' astro/dist/ru/02-frontend/03-html/index.html` → `html lang="ru"`
- [ ] hreflang pairs the two trees: `grep -c 'hreflang="ru" href="https://[^"]*/ru/02-frontend/03-html/"' astro/dist/02-frontend/03-html/index.html` → 1
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing

---

### WP-14: Home pages

**Context:**
`astro/src/pages/index.astro` still holds the Phase 1 placeholder. The home page is site-authored,
not corpus-derived: it introduces the corpus and lists the 8 topics with their titles and blurbs from
`TOPIC_TITLES`. The Russian home page at `astro/src/pages/ru/index.astro` is the same page with the
Russian labels.

Note that `/` is the only page that has no corpus equivalent, so it is the only page where the
Russian and English versions legitimately differ in more than strings — and even here they do not.

**Task:**
Replace the placeholder with the real English home page and create its Russian counterpart, both
listing the 8 topics.

**Files:**
- `astro/src/pages/index.astro` — MODIFY — real English home page
- `astro/src/pages/ru/index.astro` — CREATE — Russian home page

**Constraints:**
- DO: render the site name as an `<h1>`, the tagline from `dict.siteTagline`, and a grid of the 8
  topics as links to `topicUrl(locale, topic)` with `topicTitle(topic)` and `topicBlurb(topic)`
- DO: include the entry count per topic beside each link, computed from `entriesOfTopic(topic).length`
- DO: pass `path: "/"` so the two homes pair through hreflang
- DO: render the topic grid as a plain `<ul>` of links, so it works at 200% zoom and with no CSS
- DO: keep both home pages identical except for the `locale` prop and the dictionary lookup. Do not
  write the Russian page as a separate design
- DO NOT: add a hero image, a carousel, a newsletter form, a stats band, testimonials, or a call to
  action. This plan builds a reading site
- DO NOT: hardcode a topic title in the page. It comes from `TOPIC_TITLES`
- DO NOT: list all 177 entries on the home page. `/entries/` does that in Phase 4

**Success:**
- [ ] Both files exist: `test -f astro/src/pages/index.astro && test -f astro/src/pages/ru/index.astro` → exit 0
- [ ] Placeholder is gone: `grep -c 'placeholder' astro/src/pages/index.astro` → 0
- [ ] All 8 topics present in the output:
      `grep -o 'href="/0[1-8]-[a-z0-9-]*/"' astro/dist/index.html | sort -u | wc -l` → 8. A raw count is
      not usable here: the header nav and the footer also link all 8 topics, so the page contains 24+
      such hrefs and `grep -c` would report a line count, not a topic count
- [ ] Russian home links into the Russian tree:
      `grep -o 'href="/ru/0[1-8]-[a-z0-9-]*/"' astro/dist/ru/index.html | sort -u | wc -l` → 8
- [ ] Titles are not hardcoded: `grep -c 'CS Fundamentals\|Frontend\|Design' astro/src/pages/index.astro` → 0
- [ ] hreflang pairs the homes: `grep -c 'hreflang="ru" href="https://[^"]*/ru/"' astro/dist/index.html` → 1
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual: load the home page at 400px wide and at 1440px. The topic grid is usable at both, with
      no horizontal scrolling.

---

### WP-15: 404, robots and the sitemap

**Context:**
Astro generates a 404 page from `src/pages/404.astro`. The sitemap integration was configured in
WP-1 with an `i18n` block, which is what makes it emit `xhtml:link` alternates pairing each English
page with its Russian counterpart. That only works if the sitemap's `locales` keys actually appear in
the paths, which they do — `/ru/…`.

The sitemap must not list the 404 page; WP-1's `filter` already excludes it.

**Task:**
Create the 404 page and a `robots.txt` endpoint, and confirm the sitemap's output.

**Files:**
- `astro/src/pages/404.astro` — CREATE — not-found page
- `astro/src/pages/robots.txt.ts` — CREATE — a text endpoint

**Constraints:**
- DO: make the 404 page English by default — it is served for both trees — and give it a link home and
  a link to the topic list. Use the English labels
- DO: make `robots.txt.ts` export a `GET` returning
  `new Response("User-agent: *\nAllow: /\nSitemap: " + new URL("sitemap-index.xml", Astro.site).href + "\n", { headers: { "Content-Type": "text/plain" } })`
- DO: keep the sitemap's `filter` excluding the 404 page, and add the search pages to the filter in
  Phase 4 when they exist
- DO NOT: use `trailingSlash`-style URLs for these two — an endpoint with a file extension is never
  reachable with a trailing slash
- DO NOT: disallow anything in `robots.txt`. Every page on this site is meant to be indexed

**Success:**
- [ ] Files exist: `test -f astro/src/pages/404.astro && test -f astro/src/pages/robots.txt.ts` → exit 0
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] 404 was generated: `test -f astro/dist/404.html` → exit 0
- [ ] robots exists without a trailing-slash problem: `test -f astro/dist/robots.txt` → exit 0
- [ ] robots points at the sitemap: `grep -c 'Sitemap: https://' astro/dist/robots.txt` → 1
- [ ] Sitemap exists: `ls astro/dist/sitemap-index.xml astro/dist/sitemap-0.xml` → both listed
- [ ] Sitemap pairs locales: `grep -c 'hreflang="ru"' astro/dist/sitemap-0.xml` → at least 500
- [ ] Sitemap excludes 404: `grep -c '/404' astro/dist/sitemap-0.xml` → 0
- [ ] Sitemap covers the corpus: `grep -o '<loc>' astro/dist/sitemap-0.xml | wc -l` → at least 1410
      (708 English + 708 Russian pages at the end of this phase)
- [ ] Manual: visit a URL that does not exist and confirm the 404 page renders inside the site shell,
      not as a bare Astro error page

## Phase Verification

After all six work packages are complete, run:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git status --porcelain lessons/
```

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] **Page parity between the two trees is exact.**
      `find astro/dist -name index.html -not -path 'astro/dist/ru/*' | wc -l` → 708 and
      `find astro/dist/ru -name index.html | wc -l` → 708. Every English URL has a Russian twin, and
      vice versa. A mismatch means a corpus id was skipped in one tree
- [ ] Both content gates report `0 error(s)` and exit 0
- [ ] `git status --porcelain lessons/` prints nothing
- [ ] Manual: read one full lesson end to end in each locale on a phone. The measure is comfortable,
      the code blocks scroll rather than overflow the page, and every link in `Go deeper` navigates
      to the entry it names.
