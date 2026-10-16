# Phase 6: Verify and ship

## Objective

Prepare the deployment and prove the two things this plan promised and has not yet tested together:
that the site passes WCAG 2.2 AA and the performance budget, and that the content corpus is provably
untouched. This phase produces no new features. It produces evidence.

## Prerequisites

- Phases 1–5 complete. `cd astro && npm run build` succeeds and produces `dist/` with a Pagefind
  index, 1030+ pages, a sitemap and both feeds.
- `astro/dist` exists and is up to date.
- The operator has supplied the real production domain — or the plan is explicitly reporting it as a
  blocker, not inventing one.

## Shared Context

**This phase does not deploy.** The operator owns git history and runs deploys deliberately. This
phase writes the deployment configuration, documents it, and verifies the build; it never runs
`wrangler pages deploy`, never creates a Cloudflare project, and never runs `git commit` or
`git push`.

**Lighthouse is the accessibility and performance gate.** The operator already has a Lighthouse loop
in their skill set that reads a `lighthouserc.json`; this phase creates the one for this project so
that gate works. It lives at the repository root, not inside `astro/`, because the repo has no root
`package.json` and `npx` needs no manifest.

**The content gates are the regression test for the corpus.** The entire promise of this plan is that
`lessons/` is byte-identical after it runs. That is checkable exactly, and this phase checks it.

---

## Work Packages

### WP-23: Cloudflare deployment configuration and documentation

**Context:**
Cloudflare Pages serves a static directory. Two routes exist: a Git integration that builds in
Cloudflare on every push, and a direct upload with `wrangler pages deploy`. The direct-upload script
already exists in `astro/package.json` from WP-1. What is missing is the Pages manifest, a pinned Node
version, and documentation.

One value is load-bearing and currently a placeholder: `site` in `astro/astro.config.mjs`. It is the
source of every canonical URL, every hreflang alternate, the sitemap's absolute URLs, both feeds'
links and the `Sitemap:` line in `robots.txt`. If it is wrong, every one of those is wrong. The real
domain is not in this repository. Do not invent one.

**Task:**
Create the Pages manifest and `.nvmrc`, create `astro/README.md`, and either set the real domain or
report it as a blocker.

**Files:**
- `astro/wrangler.toml` — CREATE — the Pages manifest
- `astro/.nvmrc` — CREATE — `22`
- `astro/README.md` — CREATE — how to run, build, verify and deploy this site
- `astro/astro.config.mjs` — MODIFY — replace the placeholder `site` **only** if the real domain is known

**Constraints:**
- DO: write `astro/wrangler.toml` as exactly:

  ```toml
  name = "2learn"
  pages_build_output_dir = "./dist"
  compatibility_date = "2026-10-16"
  ```

- DO: write `astro/.nvmrc` containing `22` on its own line. Cloudflare Pages reads it when the
  project's root directory is set to `astro`
- DO: document both deployment routes in `astro/README.md`:
  - **Git integration:** root directory `astro`, build command `npm run build`, output directory
    `dist`, Node 22
  - **Direct upload:** `cd astro && npm run deploy`, which runs the build and then
    `wrangler pages deploy dist --project-name 2learn`
- DO: note in `astro/README.md` that `.nvmrc` pins Node 22 while the local machine runs Node 24, and
  that Astro 7 requires Node ≥ 22 either way
- DO: note in `astro/README.md` that the corpus is read from `../lessons` and is never written to, and
  that `node tools/validate-content.mjs --strict --lang en|ru` is the corpus's own gate
- DO: document every command the site has: `npm run dev`, `npm run build`, `npm run preview`,
  `npm run check`, `npm run deploy`, and `node tools/check-videos.mjs [--online|--add <url>]`
- DO: state plainly in `astro/README.md` that `npm run dev` does not have search, because the Pagefind
  index only exists after a build, and that search must be tested against `npm run preview`
- DO: if the real domain is unknown, leave `https://2learn.example.com` in place, add nothing to it,
  and **report it as a blocker** in the completion report with the sentence
  `BLOCKER: astro/astro.config.mjs site is still the placeholder; canonical, hreflang, sitemap, feeds and robots.txt are all wrong until it is set.`
- DO NOT: run `wrangler pages deploy`, `wrangler pages project create`, or any command that talks to
  the Cloudflare API
- DO NOT: run `git commit`, `git push`, or create a branch
- DO NOT: invent a domain, a project name other than `2learn`, or a Cloudflare account id
- DO NOT: add a `_headers` or `_redirects` file. Nothing in this site needs either

**Success:**
- [ ] Files exist: `test -f astro/wrangler.toml && test -f astro/.nvmrc && test -f astro/README.md` → exit 0
- [ ] Manifest is well-formed: `grep -c 'pages_build_output_dir = "./dist"' astro/wrangler.toml` → 1
- [ ] Node pinned: `cat astro/.nvmrc` → `22`
- [ ] Both routes documented: `grep -c 'wrangler pages deploy' astro/README.md` → at least 1 and
      `grep -c 'root directory' astro/README.md` → at least 1
- [ ] The dev-mode search caveat is documented:
      `grep -c 'npm run preview' astro/README.md` → at least 1
- [ ] No deployment was performed: `git log --oneline -1` → unchanged from before this WP
- [ ] Build is still green and reproducible from the documented commands:
      `cd astro && npm run build && cd ..` → exit 0
- [ ] The domain blocker is either resolved or explicitly reported. Check with
      `grep -c '2learn.example.com' astro/astro.config.mjs` → `1` means still a placeholder and the
      blocker must appear in the report; `0` means a real domain was set

---

### WP-24: Accessibility and performance verification

**Context:**
The site has been built to WCAG 2.2 Level AA throughout, but nothing has measured it. This WP does.
It also closes the loop opened in WP-3: the fonts were deliberately configured without `preload`, on
the grounds that preloading is a measured decision. Here the measurement happens.

Two facts shape the checks:

- The body font is the likely largest-contentful-paint element on a lesson page, since these pages
  are almost entirely text. If LCP comes in at or above 2.5 seconds on the mobile preset, preloading
  the correct subset is the cheapest possible fix.
- The two locales need **different** subsets. Preloading `cyrillic` on an English page downloads tens
  of kilobytes nobody will read. The layout already knows the locale, so the preload can be
  locale-specific.

Lighthouse runs against `astro/dist` as a static directory, which needs no server. Because the build
contains over a thousand pages, an explicit URL list is required — letting LHCI discover every HTML
file would take hours.

**Task:**
Create `lighthouserc.json` at the repository root with an explicit route list and the accessibility
budget, run it, fix every accessibility failure, then measure LCP and decide about font preloading
from the number that comes back.

**Files:**
- `lighthouserc.json` — CREATE — the Lighthouse CI configuration
- `astro/src/layouts/BaseLayout.astro` — MODIFY — only if the measurement requires preload
- `astro/README.md` — MODIFY — document the command and the measured numbers

**Constraints:**
- DO: configure `ci.collect` with `staticDistDir: "./astro/dist"`, `numberOfRuns: 1`, mobile form
  factor (this site is mobile-first, so mobile throttling is the meaningful test), and an explicit
  `url` list of exactly these seven routes, all as `http://localhost/...`:
  `/index.html`, `/02-frontend/03-html/index.html`, `/02-frontend/06-javascript/index.html`,
  `/ru/02-frontend/03-html/index.html`, `/entries/index.html`, `/ru/glossary/index.html`,
  `/search/index.html`
- DO: assert `categories:accessibility` at `minScore: 0.95` and `categories:seo` at `minScore: 0.95`
  as **errors**, and `categories:performance` at `minScore: 0.9` and `categories:best-practices` at
  `minScore: 0.9` as **warnings**. Performance is a warning because a single throttled run is noisy;
  accessibility is not, because it is deterministic
- DO: run it with `npx --yes @lhci/cli@latest autorun --config=lighthouserc.json`
- DO: fix every accessibility failure it reports. Do not lower the threshold to make a failure go away
- DO: after the run, extract the mobile LCP for the lesson route. If LCP is **at or above 2.5 s**:
  - add `preload={[{ subset: locale === "ru" ? "cyrillic" : "latin" }]}` to the Literata `<Font />` in
    `BaseLayout.astro`
  - re-run and record the before/after LCP numbers
  - do not preload Golos Text; it is not the LCP element
  If LCP is **below 2.5 s**, add no preload at all, and record the measured number in
  `astro/README.md` so the decision is documented rather than silent
- DO: record the six Lighthouse category scores and the LCP number in the completion report
- DO: run a manual WCAG 2.2 AA checklist and record the result of each item:
  - **2.1.1 Keyboard** — complete a reading, a topic change and a search with the keyboard only
  - **2.4.7 Focus visible** — every focus ring is visible against its own background in both themes
  - **2.4.1 Bypass blocks** — the skip link moves focus to `<main>`
  - **1.4.3 Contrast** — body, muted and link text each ≥ 4.5:1 in both themes
  - **1.4.4 Resize text** — the site is usable at 200% zoom with no clipped content
  - **1.4.12 Text spacing** — injecting `line-height: 1.5; margin-block: 2em; letter-spacing: 0.12em; word-spacing: 0.16em` into the prose does not clip or overlap anything
  - **2.5.8 Target size** — burger, theme toggle, back-to-top and a table-of-contents link each measure at least 24×24 CSS pixels, and the burger at least 44×44
  - **3.1.1 Language of page** — `<html lang="ru">` on the Russian tree, `en` on the English
  - **1.2.x** — nothing in this site has audio or video content, so the media criteria do not apply.
    Confirm that, since the video feature stores links only and embeds nothing
  - **2.4.2 Page titled** — every page type in both locales has a distinct, meaningful title
- DO NOT: change any colour token to make a contrast check pass without re-verifying the other theme
- DO NOT: reduce the accessibility threshold, or add `.lighthouseci` output to git
- DO NOT: run Lighthouse against `npm run dev`. The Pagefind index does not exist there, so the
  search route scores against a broken page
- DO NOT: preload a font on a guess. Either the measurement says so or it does not

**Success:**
- [ ] Config exists and is valid JSON: `node -e "JSON.parse(require('fs').readFileSync('lighthouserc.json','utf8'));console.log('ok')"` → `ok`
- [ ] Exactly seven routes: `grep -c 'index.html' lighthouserc.json` → 7
- [ ] Accessibility is an error, not a warning:
      `grep -c '"categories:accessibility"' lighthouserc.json` → 1 and
      `grep -A1 '"categories:accessibility"' lighthouserc.json | grep -c 'error'` → 1
- [ ] Build is current first: `cd astro && npm run build && cd ..` → exit 0
- [ ] Lighthouse runs: `npx --yes @lhci/cli@latest autorun --config=lighthouserc.json` → exit 0,
      with zero accessibility assertion failures across all seven routes
- [ ] SEO passes on the lesson route and the home route at ≥ 0.95
- [ ] The preload decision is recorded: `grep -c 'LCP' astro/README.md` → at least 1, with the measured
      number and whether preload was added
- [ ] If preload was added, it is locale-specific:
      `grep -c 'subset: locale === "ru" ? "cyrillic" : "latin"' astro/src/layouts/BaseLayout.astro` → 1
- [ ] No preload was added to Golos Text: `grep -c 'font-golos.*preload' astro/src/layouts/BaseLayout.astro` → 0
- [ ] Lighthouse output is not tracked: `git status --porcelain | grep -c lighthouseci` → 0
- [ ] The manual checklist is complete, with a recorded result for all ten items

---

### WP-25: Content-gate regression and final acceptance

**Context:**
Everything in this plan is reversible except one thing: if the site build touched `lessons/`, the
frozen corpus is broken and 1396 files may need re-verifying, including the two Plan B defects that
cannot be fixed without failing `check-ru-style.mjs --diff`. Nothing in the plan writes there. This
WP proves it rather than assuming it.

The second half of this WP is a short acceptance pass: count what was built, confirm the constraints
held, and hand back a report.

**Task:**
Run the full regression over the corpus, then walk the acceptance checklist and write the report.

**Files:**
- `astro/README.md` — MODIFY — add a short "Verified" section with the final numbers

**Constraints:**
- DO: run all four gates and record their exact output lines:

  ```bash
  node tools/validate-content.mjs --strict --lang en
  node tools/validate-content.mjs --strict --lang ru
  node tools/check-ru-style.mjs --strict --topic 05-backend-data
  node tools/check-videos.mjs
  ```

- DO: prove the corpus is byte-identical. Against the commit that was `HEAD` before this plan started,
  `git diff --stat HEAD -- lessons/ seed/` must print nothing, and
  `git status --porcelain lessons/ seed/` must print nothing
- DO: prove the two existing validators were not modified:
  `git status --porcelain tools/validate-content.mjs tools/check-ru-style.mjs tools/inventory.json tools/renumber-map.json`
  → prints nothing
- DO: count the built pages and record the numbers, split by tree, using
  `find astro/dist -name index.html` and `find astro/dist/ru -name index.html`
- DO: confirm the constraint list held, each with a command:
  - no root `package.json` — `test ! -f package.json`
  - no UI framework — `grep -c 'react\|preact\|vue\|svelte' astro/package.json` → 0
  - no MDX, no typography plugin, no Partytown — `grep -c '@astrojs/mdx\|@tailwindcss/typography\|partytown' astro/package.json` → 0
  - every dependency is inside `astro/` — `test ! -f package.json && test ! -d node_modules`
  - no third-party request in the built HTML —
    `grep -rlc 'fonts.gstatic\|fonts.googleapis\|i.ytimg\|googletagmanager' astro/dist/index.html astro/dist/02-frontend/03-html/index.html` → prints nothing
  - `status` is never rendered — `grep -rc 'drafted' astro/dist/02-frontend/03-html/index.html` → 0
- DO: state in the report that the plan did **not** deploy, and that deployment is the operator's
  deliberate next step
- DO: list every `TODO: confirm` line added by WP-17 and WP-23, with its file and line, so the operator
  can resolve them
- DO: recommend the next action with one line: run `/skill:deploy` after the domain is set
- DO NOT: fix anything you find. This WP reports. A finding that requires a code change becomes a new
  task, not a quiet edit
- DO NOT: run `git add`, `git commit` or `git push`
- DO NOT: weaken a gate, re-run a gate with different arguments to get a green result, or omit a
  failing line from the report

**Success:**
- [ ] `node tools/validate-content.mjs --strict --lang en` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] `node tools/validate-content.mjs --strict --lang ru` → the same five figures, exit 0
- [ ] `node tools/check-ru-style.mjs --strict --topic 05-backend-data` → exit 0, zero `[S1]` lines
- [ ] `node tools/check-videos.mjs` → exit 0
- [ ] `git status --porcelain lessons/ seed/` → prints nothing
- [ ] `git diff --stat HEAD -- lessons/ seed/` → prints nothing
- [ ] The two existing validators and two data files are untouched — `git status --porcelain` over both
      validators, `tools/inventory.json` and `tools/renumber-map.json` → prints nothing
- [ ] Page counts recorded and both trees accounted for:
      `find astro/dist -name index.html -not -path 'astro/dist/ru/*' | wc -l` → **711** and
      `find astro/dist/ru -name index.html | wc -l` → **712**. Russian has exactly one more page —
      `/ru/glossary/` — and the 404 is the only HTML file that is not an `index.html`
- [ ] Every constraint check above ran and printed the expected value
- [ ] `astro/README.md` has a `## Verified` section with the gate output, the page counts and the
      Lighthouse scores
- [ ] The report lists every `TODO: confirm`, every `BLOCKER`, and the one-line next action

## Phase Verification

This phase *is* the verification. Run the whole thing once more, in order, and record it:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
node tools/check-ru-style.mjs --strict --topic 05-backend-data
node tools/check-videos.mjs
npx --yes @lhci/cli@latest autorun --config=lighthouserc.json
git status --porcelain lessons/ seed/
```

- [ ] Every command exits 0 except `git status`, which must print nothing
- [ ] The site is deployable and has not been deployed
- [ ] The report is written, including the blockers and the next action
