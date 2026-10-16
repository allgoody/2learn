# Project Rules: 2learn

Last updated: 2026-10-16

## Tech Stack
- Content repo is Markdown only. Node 24.14.1 and npm 11.11.0 are available, but there is deliberately **no `package.json` and no dependencies** in this repo.
- The content validator is plain Node ESM with zero dependencies: `tools/validate-content.mjs` (checks **V1–V17** after Plan A's WP-10 and Plan B's WP-1/WP-2; `node --check` clean). It runs on a clean checkout with nothing but Node ≥ 22. `TOPICS` holds the eight **prefixed** directory names, so `--topic` needs `03-design-ux` and an unprefixed name silently selects nothing (`0 present`). It now takes **`--lang en|ru|all`** (default `en`) and validates either `lessons/` or `lessons/ru/` through the same `runRoot()`; `--lang all` prints one five-part summary line per root. **V17** compares every `**Title**` bullet against the target file's frontmatter `title` and skips a target whose file does not exist yet.
- **The site stack, decided and version-verified against the npm registry 2026-10-16 (Plan D)**: `astro@7.4.0`, `@astrojs/sitemap@3.7.4`, `@astrojs/rss@4.0.19`, `tailwindcss@4.3.3` through the `@tailwindcss/vite` **Vite plugin** (not an Astro integration), `pagefind@1.5.2`, `typescript@6.0.3` (**not 7** — `@astrojs/check@0.9.10` peers TS `^5||^6` and `astro check` hard-refuses 7), plus `@astrojs/check` and `wrangler`. **No React/Preact/Vue/Svelte, no `@astrojs/mdx`, no `@tailwindcss/typography`, no Partytown** — the three interactive widgets are vanilla `<script>` blocks.
- **Astro 7 content layer.** Two collections: `glob({ base: "../lessons", pattern: ["**/*.md", "!ru/**", "!INDEX.md", "!AUTHORING.md"], generateId })` and a second on `../lessons/ru`. The **explicit `generateId` is required** — Astro's default yields `…/index`, which breaks every corpus id; strip `.md` and a trailing `/index`.
- **Astro 7's Markdown pipeline is Sätteri, not remark/rehype.** `markdown.rehypePlugins` needs `@astrojs/markdown-remark`, which is no longer installed. The site's link transform is therefore a **Sätteri HAST plugin** (`@astrojs/markdown-satteri@0.4.4`, wired as `markdown.processor: satteri({ hastPlugins: [...] })`), and it takes the file URL from the plugin factory's context, not from `file.path`.
- **Astro 7 Fonts API** (stable since `astro@6.0`) downloads a family at **build time** and self-hosts it into our own origin, so there is no runtime request to `fonts.googleapis.com`. Configured as `fonts: [{ provider: fontProviders.google(), name, cssVariable, weights, styles, subsets, display, fallbacks }]`, then referenced by `<Font cssVariable="--font-literata" />` in the head.
- **Shiki is built into Astro.** Light/dark code blocks are `markdown.shikiConfig.themes` plus `defaultColor: false`, styled once in CSS with `light-dark()`. The old `new Function("s","return import(s)")` workaround for `/pagefind/pagefind.js` is **superseded** — load the built Pagefind UI from `dist/pagefind/` with an ordinary `<script src>`, which avoids Vite entirely instead of working around it.

## Architecture
- **Content first.** The lesson corpus is written and validated before any site code exists.
- `lessons/<topic>/<slug>/index.md` is the unit of content; `NN-<slug>.md` children exist only where the tier calls for them.
- `seed/` is the read-only archive of the original skill list (8 topic files plus `skills.md`). It is never edited.
- The 8 topics are: frontend, cs-fundamentals, cloud-devops, backend-data, design-ux, product-process, security, soft-skills.
- The website lives in `astro/` at the repo root and consumes `lessons/` through the content layer, so the corpus stays liftable into its own repository.
- Index files are **generated** from metadata (`node tools/validate-content.mjs --write-index`), never hand-maintained. Hand-written index counts are what drifted in the original seed list.
- `lessons/` (403 files) and `tools/` (2 files) **are tracked in git** — committed through `b362edd`, so `git status`, `git diff --numstat` and `git checkout` all work inside the corpus. The older note that they were untracked is obsolete. The one-off per-WP plan files live outside the repo's review surface: `.pi/plans/**` is tracked too, so a new plan directory shows up as untracked until the user commits it.
- **Plan status, one line each — detail and per-topic counts live in `.pi/memory/plan-a-b-c-history.md`.** A (corpus order + examples), B (Russian mirror) and **D (this site) are COMPLETE**; **C (Russian prose) is PAUSED at 550 of 698 files**, resuming at Phase 7 / WP-58 (`06-cloud-devops`), gate `tools/check-ru-style.mjs`, contract `AUTHORING.md` §14, baseline `b713de1d`. Plan D built `astro/`, `content/`, `tools/check-videos.mjs` and `lighthouserc.json`, and **changed nothing under `lessons/`** — verified.

## Content Rules
`lessons/AUTHORING.md` is the authoritative contract and `tools/validate-content.mjs` enforces it (V1–V17).
Full detail — the three body shapes and their word bands, frontmatter field order, tier → child count, the
examples-sidecar contract, and the Russian mirror's overrides — is in `.pi/memory/content-rules.md`.

The rules below have each bitten at least once. They hold even if that chunk goes unread:

- **No external URLs anywhere under `lessons/`.** V6 (lessons) and V15 (examples) reject any `https?://`.
  This is also why video references live in `content/videos.json` and not in a lesson file.
- **Worked examples live in sidecar files, never in a lesson body** — `examples.md` beside `index.md`,
  `examples.NN-slug.md` beside `NN-slug.md`. A pointer line inside `## Practice` fails V5, because 20
  full-shape lessons already sit at 930–950 of the 950-word ceiling and four are at exactly 950.
- **`## Core ideas` takes 3–6 `###` subheadings, and a seventh is the single most common defect.**
  Budget five.
- **The 120–450-word examples band counts fenced code**, so a file that reads like ~400 words measures
  450–510. Budget ~380 words in the first draft.
- **`tools/check-ru-style.mjs --diff` does not check `###` subheadings**, so a green `--diff` is not
  structural proof. The `git diff -U0` grep in `## Active Constraints` is the compensating control.

## Active Constraints
- Temp/working files MUST be created in `.tmp/` under the repo root, never in system `/tmp/` or outside the workspace. `.tmp/` should be in `.gitignore`. Clean up with `rm -rf .tmp/` after use.
- Never edit `.pi/plans/**` while executing a plan, and never edit `seed/**`.
- Do not commit, and never publish to a remote — the user handles all git history.
- **`lessons/` and `seed/` are byte-frozen against Plan D.** `astro/` reads the corpus through the content layer and never writes to it. Every phase of the site plan ends with `git status --porcelain lessons/ seed/` printing nothing. The only new file under `tools/` is `check-videos.mjs`.
- **No `package.json`, `node_modules/` or lockfile at the repository root, ever.** `tools/validate-content.mjs` must keep running on a clean checkout with nothing but Node ≥ 22. Every dependency lives in `astro/package.json`.
- **Fonts are decided: Literata (body) + Golos Text (UI), self-hosted.** Do not substitute the common defaults — an expert Cyrillic review judged **Inter "should not be used", Noto Serif "not usable", Roboto "questionable"**, and Merriweather, Vollkorn, Tinos, Arimo, Manrope, Overpass and Alumni Sans broken in Cyrillic. Because the site ships Russian, both families need the `latin` **and** `cyrillic` subsets; Russian prose runs 10–15% longer than the English for the same content.
- **Zero third-party runtime requests.** Fonts download at build time; video thumbnails download at ingest time into `astro/public/videos/`. At runtime no page may reach `fonts.googleapis.com`, `fonts.gstatic.com`, `i.ytimg.com` or `googletagmanager.com` before the reader consents.
- **Video references live in `content/videos.json`, outside `lessons/`.** The corpus bans `https?://` (V6) and its frontmatter field set is fixed across 1396 files, so a `videos:` key is impossible and a URL in the prose is an error. Store the 11-character `videoId` and **never the URL** — both the watch URL and the thumbnail path derive from it, which also collapses the four shapes a YouTube link arrives in.
- **`site` in `astro/astro.config.mjs` is still the placeholder `https://2learn.example.com`**, and it is load-bearing: canonical URLs, hreflang, the sitemap, both RSS feeds and `robots.txt` all derive from it. Setting the real domain is a blocker before deploy — never invent one.
- **Locale scheme: English unprefixed (`/02-frontend/…`), Russian at `/ru/02-frontend/…`.** Astro's `i18n` config is deliberately **not** enabled — locale is an explicit prop, never inferred from the URL or the browser. The Russian dictionary is typed `const ru: typeof en`, so a missing label is a type error: add every new key to **both** blocks in one edit.
- **Theming is single-source.** `light-dark()` pairs selected by `color-scheme`; `data-theme` on `<html>` is the manual override, written by the project's **only** `<script is:inline>` (the pre-paint boot). Every other script is a normal `<script>`. Never duplicate a colour token per theme.
- **WCAG 2.2 Level AA is the target**, verified by Lighthouse (`lighthouserc.json` at the repo root: 7 routes, mobile, accessibility + SEO asserted as **errors** at 0.95, performance + best practices as **warnings** at 0.9) plus a manual checklist. Muted text needs ≥ 4.5:1 in **both** themes, and the footer credit must never use `opacity`. **The manual checklist is load-bearing:** Lighthouse scored a perfect 1.00 while the footer's language switch violated 2.5.3 (visible `Русский` absent from its `aria-label`) and the table-of-contents links measured 67×18 against 2.5.8's 24×24. Both are fixed — do not regress them. Lighthouse's `link-text` audit is an exact-match blocklist containing `go`, so entry links carry a visually-hidden ` — <topic>` suffix.
- **On Windows, `lhci autorun` aborts with `EPERM` inside `chrome-launcher` *after* finishing the audit** (while deleting its own temporary Chrome profile), so the run is lost. Start Chrome with `--remote-debugging-port=9333` and add `"port": 9333` to `ci.collect.settings` in a **copy** of the config — never commit that port. `astro/README.md` has the commands. The site is not at fault.
- **`npm run build` is `astro build && pagefind --site dist`.** The search index exists only after a build, so test search against `npm run preview`, never `npm run dev`.
- **Astro 7 stamps `data-astro-cid-*` onto every element of a component that has a `<style>` block**, so a literal `grep '<tr>'` finds nothing — grep `<tr` instead. `scopedStyleStrategy: "where"` does not help; it swaps the attribute for a class.
- **Pagefind 1.5's UI has no `filters` option.** Unrecognised keys survive the constructor's `delete` list and are forwarded as `pagefind_options`, so the working form is `pagefind_options: { filters: { lang } }`. Its input also ships no accessible name (`translations.search_label` is unused), so the page sets `aria-label` itself.
- **Site page census — BUILT AND VERIFIED:** 706 corpus pages (8 topic + 177 entry + 224 child + 297 examples) → **711 EN / 712 RU `index.html`**, plus `dist/404.html`, the only file that is not an `index.html`. The Russian extra is `/ru/glossary/`.
- No new dependencies in the content repo. The validator must run on a clean checkout with nothing but Node.
- The 13 merged umbrella seed entries (cloud six, UI/UX four, software-development three — a net reduction of 10) exist only as `aliases` on 3 area pages. Do not create directories for them.
- `.pi/` must stay tracked — context, rules memory, the plan directories and the memory chunks; it is deliberately not in `.gitignore`. Only `.tmp/`, `.ruff_cache/` and `node_modules/` are ignored.
- **A scripted id sweep must exclude `.pi/**` and `lessons/INDEX.md`.** `.pi/CONTEXT.md` and the older plan files contain backticked id-shaped tokens (`frontend/css`, `9/35`) that a naive sweep would corrupt; `INDEX.md` is regenerated instead of edited. Inside `lessons/`, every backticked id-shaped token is exactly one of the 177 entry ids or 224 child ids — verified, no strays.
- **A rename sweep over `lessons/` is reversible, but make a copy anyway.** The corpus is tracked in git, so `git checkout` restores it; a `.tmp/` copy is still worth making because it is what the byte-exact "only ids changed" audit compares against. The largest number of id-bearing lines in any single lesson file is 10, so `git diff --numstat` showing more than 15 changed lines in a file means prose moved, not just ids.
- **`tools/check-ru-style.mjs --diff` does NOT check `###` subheadings.** Its `[D2]` rule compares heading lines with `/^## /`, which matches `## ` and not `### `; `[D6]` covers `## Пример` in examples files only. A drifted `### ` subheading inside `## Ключевые идеи` therefore passes the gate silently — found in Phase 6, where two `###` headings drifted on a writer's first pass and `--diff` reported 0 differences. **The compensating control is the diff grep, and it is load-bearing, not merely cheap:** `git diff -U0 -- <files> | grep -E '^[+-](---|##|```)'` (which matches `###` because `###` starts with `##`) must print nothing, and the explicit `git diff -U0 -- <files> | grep -E '^[+-]### '` must print nothing. Never report a recast as structurally verified on the strength of a green `--diff` alone. Fixing the gate is a `tools/**` change and needs the user's say-so.
- **A fence's *contents* are frozen, not just its delimiters.** `--diff` compares the bytes between the opening and closing fence lines. The translated tables, SQL, JSON and `text` blocks the Russian mirror produced are untouchable, and the corpora's code-heaviest topics are full of them — a writer's urge to reword a "formulaic line" lands inside a fence almost every time. Two Plan-B defects found this way (a wrong-sense translation and an English comment inside a Russian fence) are recorded for the WP-74/WP-75 audit rather than fixed, because fixing them fails `--diff`. During Plan A's Phases 3–6 `--strict` exited 1 with one `[V16]` error per missing examples file, by design. `--topic` still needs the prefixed directory name (`03-design-ux`); an unprefixed name selects nothing and reports `0 present`. The `ru` root additionally needs `--lang ru` (the default is `en`); `--lang all` covers both roots in one run.- **Both root gates must stay green.** `node tools/validate-content.mjs --strict --lang en` and `--strict --lang ru` each report `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`; any change to a Russian file must be re-checked with `--lang ru`, never with the default.
- **`.tmp/` is scratch, and nothing in it is durable evidence.** Plan A's WP-50 deleted `.tmp/lessons-backup/` and `.tmp/audit.mjs`, and Plan B's WP-41 deleted `.tmp/ru-audit.mjs`, `.tmp/brief-ru.md` and the workers' leftover helper scripts (`count.cjs`, `count-en.cjs`, `ids.cjs`...). The pre-renumber corpus and the Plan B mirror audit have no copy anywhere and cannot be re-proved without rewriting those scripts (their recipes are in `.pi/memory/lessons.md`). **Sweep the directory at every batch boundary** — workers leave scratch behind, and two Phase 6 children reported they could not delete their own because the shell path guard blocked `rm`, so the parent sweeps centrally. Keep the current phase's manifest, the verifier and the `*-report.md` evidence; a superseded phase's briefs and per-WP file lists can go once that phase is committed.
- **Verify the disk, never a subagent's report.** A child reporting success is not proof. Before and after every fan-out, hash the assigned paths and count which differ from a pre-run sha256 manifest (`MANIFEST=<manifest> node .tmp/verify-wp.mjs <list-file>...` — the script defaults to the Phase 4 manifest), and run `git status --porcelain` — the modified-file count must equal the package contract exactly. Two extra mechanical checks, both cheap: `git status --porcelain <topic-dir>` must list exactly the assigned paths and nothing else, and `git diff -U0 -- <files> | grep -E '^[+-](---|##|```)'` must return **nothing** — any hit is a heading, fence or frontmatter line that moved. `git diff --numstat` is the same proof in aggregate: prose-only recasts show a *balanced* small diff, an asymmetric or oversized one means structure moved.
- **Split any work package over 10 files before handing it to a child.** A 12-file package is the size at which a fan-out child silently truncates and still reports success. Phase 5 split WP-46 (12 files) into 46a (5) and 46b (7); the two halves are still verified as one package against WP-46's own file list, so the plan's contract survives the split.
- **`lessons/ru/GLOSSARY.md` is off-limits during a fan-out.** It is one shared file and four writers hold it at once; a child that finds a calque terminology row (R7) reports the exact before/after line and the parent applies it once, after every writer has stopped. The R7 exception still applies to a single-writer package.

## Lessons

Session history: `.pi/memory/lessons.md` (append-only, newest first). Long-form Plans A–D status: `.pi/memory/plan-a-b-c-history.md`. Both are read on demand; neither is a rule set.

## Dependencies
- None in the content repo, and none may be added — it stays dependency-free.
- Plan D's set lives **inside `astro/` only**, pinned exactly; see `astro/package.json` and `## Tech Stack`. **`@astrojs/react` was dropped** — the burger drawer, theme toggle and scroll-to-top are vanilla `<script>` blocks.

## Reference Chunks

Chunks live in `.pi/memory/` and are read on demand. This table is **derived** — regenerate it, never hand-edit the counts.

| Chunk | Size | Lines | Entries | Newest |
| --- | --- | --- | --- | --- |
| `.pi/memory/content-rules.md` | 3 KB | 21 | 3 | 2026-10-16 |
| `.pi/memory/lessons.md` | 48 KB | 333 | 65 | 2026-10-16 |
| `.pi/memory/plan-a-b-c-history.md` | 5 KB | 114 | 2 | 2026-10-16 |

## Where New Knowledge Goes

| Kind of knowledge | Destination |
| --- | --- |
| Active constraint or user rule — changes behaviour | this index, `## Active Constraints` |
| Session history, investigation notes, superseded decisions | `.pi/memory/lessons.md` (append, newest first — one entry per session) |
| Ephemeral session state (current task, file map, blockers) | `.pi/CONTEXT.md` |
| Cross-project preference or lesson | global memory via pi-memory (`~/.pi/memory/memory.db`), not this repo |
