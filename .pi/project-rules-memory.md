# Project Rules: 2learn

## Tech Stack
- Content repo is Markdown only. Node 24.14.1 and npm 11.11.0 are available, but there is deliberately **no `package.json` and no dependencies** in this repo.
- The content validator is plain Node ESM with zero dependencies: `tools/validate-content.mjs`.
- Planned site (a separate plan, in `astro/`): Astro 7.3.8, @astrojs/react 7.0.1, Tailwind CSS 4.3.3, TypeScript 7.0.2, Pagefind 1.5.2. Verified on npm 2026-02-14 — re-verify before installing.
- Astro 7 content layer: `glob({ base: './lessons', pattern: '**/*.md' })`, entry ids derived from the path, served through `getCollection()` and `getStaticPaths()`. Hide `/pagefind/pagefind.js` from Vite at runtime with `new Function("s","return import(s)")`, because Vite rewrites variable imports into its preload helper.

## Architecture
- **Content first.** The lesson corpus is written and validated before any site code exists.
- `lessons/<topic>/<slug>/index.md` is the unit of content; `NN-<slug>.md` children exist only where the tier calls for them.
- `seed/` is the read-only archive of the original skill list (8 topic files plus `skills.md`). It is never edited.
- The 8 topics are: frontend, cs-fundamentals, cloud-devops, backend-data, design-ux, product-process, security, soft-skills.
- The website lives in `astro/` at the repo root and consumes `lessons/` through the content layer, so the corpus stays liftable into its own repository.
- Index files are **generated** from metadata (`node tools/validate-content.mjs --write-index`), never hand-maintained. Hand-written index counts are what drifted in the original seed list.

## Content Rules
Defined in `lessons/AUTHORING.md` and enforced by `tools/validate-content.mjs` (checks V1 to V13):
- Three body shapes only: full lesson (6 headings, 450-950 words), track landing (5 headings, 200-400 words), area page (4 headings, 120-300 words).
- Tier determines the child count and is fixed: small 0, medium 2, large 4, area 0.
- Frontmatter field order: title, type, topic, tier, status, aliases, prereqs, related. `prereqs` must equal the inventory exactly — the graph is given, not chosen.
- Prose uses British English; titles are verbatim from `tools/inventory.json`, including `Javascript`, `Restful API` and `Prioritization`.
- **No external URLs anywhere under `lessons/`.** "Go deeper" bullets point at other entries only.
- Batch writers always write `status: drafted`; only the user promotes an entry to `reviewed`.

## Active Constraints
- Temp/working files MUST be created in `.tmp/` under the repo root, never in a system temp directory or outside the workspace. Delete them when the task is done.
- Never edit `.pi/plans/**` while executing a plan, and never edit `seed/**`.
- Do not commit, and never publish to a remote — the user handles all git history.
- No new dependencies in this repo. The validator must run on a clean checkout with nothing but Node.
- The 10 merged umbrella seed entries (cloud six, UI/UX four, software-development three) exist only as `aliases` on 3 area pages. Do not create directories for them.

## Lessons
- **Recompute file counts per work package; never estimate them.** The first draft of the plan carried 4 wrong "create these N files" counts and 4 wrong per-topic totals (53 against 63, 44 against 59, 44 against 53, 96 against 88). The formula is entries plus medium times 2 plus large times 4.
- The pi path guard rejects bash commands containing regex escape sequences (the whitespace and digit character-class shorthands). Plan checks therefore use the `grep -cE 'https?://'` form and avoid BRE `\?` escapes entirely.
- The pi guard also denies a bash command whose text merely *contains* the push-to-remote command string, even inside a heredoc payload. Write files with the file tools when their content mentions it.
- Writing any Python file into this repo makes ruff create `.ruff_cache/`; remove it before staging.
- A one-off scripted edit sweep must read and write files in binary so line endings are preserved; a naive text-mode rewrite turns a CRLF file into a whole-file diff.

## Dependencies
- None installed. Planned for the site plan only: astro, @astrojs/react, tailwindcss, pagefind, typescript.
