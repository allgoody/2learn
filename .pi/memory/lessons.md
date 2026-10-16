# Lessons — 2learn

Append-only, newest entry first. Read on demand — the always-read index is `.pi/project-rules-memory.md`.

- **[Session 2026-10-16 · Plan D executed: the Astro site is built and verified]**: Ran
  `/skill:implement` on `.pi/plans/astro-site/` — all 6 phases, 25 WPs, in one session. `astro/` now builds
  **1424 pages** (711 EN + 712 RU `index.html`, plus `404.html`); both root content gates report
  `0 error(s)`; `npm run check` and `npm run build` exit 0; Lighthouse over 7 routes exits 0 with
  **accessibility 1.00 and SEO 1.00 on every route**, performance 0.96–1.00, best practices 0.96–1.00, and
  mobile LCP **1.5–2.0 s** — so **no font preload was added**. `lessons/` and `seed/` are byte-identical:
  both `git status --porcelain` and `git diff --stat HEAD` are clean over them. Nothing deployed, nothing
  committed. The site ships with an English home, `/entries/`, `/about/`, `/search/`, `/privacy/`, an
  entry/topic/child/examples router, a Russian mirror plus `/ru/glossary/`, both RSS feeds, `robots.txt`
  and a 1424-page Pagefind index.

  Durable deviations and findings — the full D1–D24 evidence lived in `.tmp/astro-site-exec-log.md`, which
  is scratch and will be deleted, so the ones that outlive it are in the rules index and repeated here:

  - **`typescript@6.0.3`, not 7.** `@astrojs/check@0.9.10` peers `^5||^6` and `astro check` hard-refuses TS 7;
    a plain `npm install` also ERESOLVEs on 7. The user chose the pin.
  - **Astro 7 replaced the Markdown pipeline with Sätteri**, so `markdown.rehypePlugins` is gone (it needs
    `@astrojs/markdown-remark`, no longer installed). WP-10's link transform was rewritten as a **Sätteri
    HAST plugin** (`@astrojs/markdown-satteri@0.4.4`, wired as `markdown.processor: satteri({ hastPlugins })`),
    taking the file URL from the plugin factory's context rather than `file.path`.
  - **Astro 7 stamps `data-astro-cid-*` on every element of a component that has a `<style>` block**, so the
    plan's literal `grep '<tr>'` checks return 0. Grep `<tr` instead; `scopedStyleStrategy: "where"` only
    swaps the attribute for a class.
  - **Pagefind 1.5's UI has no `filters` option.** Unrecognised keys survive the constructor's `delete`
    list and are forwarded wholesale as `pagefind_options`, so the working form is
    `pagefind_options: { filters: { lang } }`. Its input also ships no accessible name
    (`translations.search_label` is unused), and `import()` of `/pagefind/` is still the Vite trap.
  - **On Windows `lhci autorun` aborts with `EPERM` inside `chrome-launcher` after the audit finishes**, so
    the run is lost. Start Chrome with `--remote-debugging-port=9333` and add `"port": 9333` to
    `ci.collect.settings` in a copy of the config; never commit that port.

  Two bugs the plan's own checks could never have caught, both found by testing: WP-11's `allExamples` rule
  contradicted its own `classify`, silently costing **127 child-example pages** (581 built instead of 708);
  and the lesson/ToC grid's implicit column let one long code line widen the entire page at 400px, fixed
  with `grid-template-columns: minmax(0, 1fr)`. Two accessibility failures likewise scored a perfect
  Lighthouse 1.00 and were caught only by the manual checklist the plan required: the footer's language
  switch violated **WCAG 2.5.3** (`aria-label="Switch to Russian"` while the visible text was `Русский` —
  the accessible name must contain the visible text), and table-of-contents links measured **67×18** against
  **2.5.8**'s 24×24 minimum. Both fixed. **The manual WCAG half of the gate is not ceremony.**

  Four plan-internal contradictions were resolved by following the checks' evident intent and recording a
  deviation, never by editing the plan: WP-13's `LessonNav` prerequisites duplicate the content's own
  `## Prerequisites` block on landings; WP-11's `allExamples` wording vs its `classify`; WP-15's `Astro.site`
  is a namespace in a plain `.ts` endpoint (use the endpoint context's `site` parameter); and WP-10's
  `import.meta.url` is unusable because pages bundle into `dist/.prerender/` (the cwd-walk root resolver in
  `graph.ts` is the working pattern, now exported as `LESSONS_DIR`).

  Still open for the user: `site` in `astro/astro.config.mjs` is the placeholder
  `https://2learn.example.com` and is load-bearing for canonical URLs, hreflang, the sitemap, both feeds and
  `robots.txt`; four visible `TODO: confirm` lines need the user's words (reuse/licensing on the two about
  pages, site responsibility/contact on the two privacy pages); there is no favicon, which costs the home
  route 0.04 of best practices; and the Russian tree's topic names are English because every WP prescribes
  locale-independent `topicTitle(topic)` and the corpus has no Russian topic names.
- **[Session 2026-10-16 · Pivot: Plan C paused, the Astro site planned as Plan D]**: The user chose
  to stop the Russian prose recast and build the site instead — the corpus is usable now, and a site
  is worth more than 148 more recast files. **Plan C is PAUSED at 550 of 698** (nothing half-written,
  `git status` clean at `b86c489`); resume at Phase 7 / WP-58 (`06-cloud-devops`). **The site plan is
  written and NOT started**: `.pi/plans/astro-site/` — 6 phases, 25 WPs, 2381 lines across 7 files,
  every WP with all five CTCS+ fields and at least one command-based Success check. Durable lessons:
  (1) **Pausing a per-file-atomic content pass costs almost nothing, and that is checkable rather than
  a matter of nerve.** The recast writes one file at a time, so no file is ever half-done; and prose
  style is not a content gate, so both root gates report `0 error(s)` no matter how much prose has been
  recast. Before treating a pause as risky, look for (a) partially written artifacts and (b) whether any
  gate reads the thing you are pausing. Here both answers were no, so the pause is free. The only cost
  is re-reading the Phase 7 brief later.
  (2) **A question about why a rule exists turned out to answer a design problem.** "How did this
  decision happen?" — about `lessons/` banning external URLs — produced the fact that the rule predates
  the site by eight months, comes from the first plan's Global Constraints, and that the whole link
  graph is **id-based** (V12 resolves ids; a URL is not an id, so it cannot participate). That is why
  the video feature must live in `content/videos.json` **outside** `lessons/` rather than as a
  frontmatter key: adding a field would break V3 across 1396 files in two roots, and a URL in the prose
  is already a V6 error. Prefer answering "why is this rule here" from the repo's own record over
  designing around a rule you have not read.
  (3) **The font question for this project is a *Cyrillic* question, and the expert review rejects the
  defaults.** The site ships Russian, so every family needs real Cyrillic. `type.today`'s panel of
  Cyrillic type designers (Strukov, Ruderman, Ostromentsky) reviewed the Google Fonts library and:
  **Inter "lacks attention to details … should not be used"; Noto Serif "is not usable"; Roboto
  "questionable"**; and Merriweather, Vollkorn, Tinos, Arimo, Manrope, Overpass and Alumni Sans are all
  broken in Cyrillic. The ones judged good: **Literata "no questions to structures, design, rhythm"**,
  Source Serif 4, PT Serif, Lora, Golos Text, IBM Plex Sans. Chosen: **Literata (body) + Golos Text
  (UI)**. Never reach for Inter or Noto for a bilingual Latin+Cyrillic site without checking.
  (4) **Astro's Fonts API has been stable since `astro@6.0` and is the lazy correct answer to
  "self-host the woff2".** It downloads from a provider at **build time** and self-hosts into our own
  origin, so there is no runtime request to `fonts.googleapis.com` — which is what also makes the
  consent banner coherent instead of theatre. That is ~15 lines of config versus hand-downloading and
  vendoring a dozen woff2 files. Related: the pins in the rules index were stale (astro `7.3.8` is now
  `7.4.0`), and the old note recommending `new Function("s","return import(s)")` to hide
  `/pagefind/pagefind.js` from Vite is now **superseded** — loading the built UI with an ordinary
  `<script src>` from `dist/pagefind/` avoids Vite entirely and sidesteps the trap rather than working
  around it.
  (5) **Run the plan skill's review pass, because it caught three real defects in a plan I had just
  written and believed.** (a) The page-count arithmetic ignored the pages a *later* phase adds, so the
  parity checks would have failed against a **correct** build — the fix is to write the arithmetic into
  the Success check (`706 = 8 + 177 + 224 + 297`) instead of stating a bare number. (b) A `find` glob
  that did not unambiguously select what it claimed. (c) **A Success check testing a
  `data-lesson-prereqs` attribute the plan never told anyone to write** — a verification that could
  never pass and would have been blamed on the implementation. Every Success check must name something
  the plan itself instructed, and the arithmetic behind a count belongs next to the count.
  (6) **Two facts about `tools/inventory.json` that a site author would otherwise guess wrong:** it has
  **no `related` key** (that field is frontmatter-only and non-empty in exactly 3 of 177 files) and **no
  topic display titles**, so the eight topic names are site-authored labels. And **`07-security` and
  `08-soft-skills` contain no `type: area` entry at all** (`02-frontend` has two), so a topic page must
  be generated from the inventory and must not assume an area page exists.
  (7) **Two of my own tooling mistakes, both already in global memory and both repeated anyway:**
  `find -maxdepth 2` over `lessons/` returns nothing because the real depth is 3; and `curl -o /tmp/...`
  is blocked by the shell path guard, which reports it as `Access to D:\tmp\...` — scratch files go in
  the repo's `.tmp/`.
- **[Session 2026-10-16 · Phase 6 — `05-backend-data` COMPLETE]**: Ran the 91 files of
  `05-backend-data` as **10 `worker` children in three waves** — wave 1 p6a (6) / p6b (9) / p6c (9) /
  p6d (10) = 34, wave 2 p6e (9) / p6f (9) / p6g (10) / p6h (10) = 38, wave 3 p6i (9) / p6j (10) = 19.
  The disk was verified against a fresh `.tmp/p6-baseline.txt` → `91 of 91 COMPLETE`; exactly 91 paths
  changed under the topic, no strays, nothing touched outside it. **Phase 6 is done.**
  `--diff --topic 05-backend-data` → 0 structural differences; `--strict --topic` → **exit 0**;
  `validate-content --topic 05-backend-data --lang ru` → 0 error(s), 19 present / 38 examples; the
  plan's 19 per-entry-dir counts match exactly. Topic metrics: corr 0.898→**0.215**, same-count
  90.2%→**0.0%**, ratio 1.047→**1.099**, `однако` 0.00→**1.79**, `— это` 2.82→**0.30**, participles
  2.03→**0.55**, blacklist **0**. Whole corpus **550 of 698**. Durable lessons:
  (1) **`tools/check-ru-style.mjs --diff` does not check `###` subheadings — and that is a real hole,
  not a nitpick.** `[D2]` compares `/^## /`, which matches `## ` and not `### `; `[D6]` covers
  `## Пример` only. The p6d writer had two `###` headings drift on a first pass, restored them by
  hand, and reported that `--diff` had stayed green throughout. **The compensating control is the diff
  grep and it is load-bearing: `git diff -U0 -- <files> | grep -E '^[+-](---|##|```)'` matches `###`
  because `###` starts with `##`, and it must print nothing.** Every Phase 6/7/8 brief now carries this
  warning plus the explicit `grep -E '^[+-]### '` line. Never call a recast structurally verified on a
  green `--diff` alone. Fixing the gate itself is a `tools/**` change and needs the user's say-so.
  (2) **Repack the plan's oversized work packages into entry-dir-whole packages rather than splitting a
  WP arbitrarily.** WP-53/54/56/57 are 11–12 files each, over the 10-file child cap. The *entry
  directory* is the plan's real contract (its Success blocks `ls` it, and `--topic` and the manifest
  work at that grain), so keeping every entry dir whole matters more than keeping WP numbers intact.
  The repack produced 10 packages of 6–10 files, and the plan's own `wp49…wp57-files.txt`
  (6,9,9,10,11,12,10,12,12) were still emitted and still verify `91 of 91` against the same manifest —
  so nothing was lost by departing from the WP boundaries.
  (3) **Regenerate briefs with a script separate from the file lists and the manifest.** Re-running the
  combined setup generator after wave 1 would re-hash the already-recast wave-1 files and silently
  destroy the phase baseline. The manifest is taken **once, before the first write**, and nothing may
  rewrite it. The p6a check that still reads `changed 6 of 6` is what proves it survived.
  (4) **`+604 / −604` with zero imbalanced files across 91 files is the tightest structural result of
  any phase** — a recast is a whole-paragraph rewrite, so balance is the expected shape. An imbalanced
  numstat is not automatically a defect (a paragraph split shifts the line count by one), but a run of
  them, or one larger than the file's prose-line count, means structure moved.
  (5) **The corpus blacklist blocker was one file, and it is now gone.** `05-backend-data/14-database-
  design/index.md` was one of the corpus's two remaining hits; p6h took it to 0, so the whole-corpus
  row went **2 in 2 files → 1 in 1 file**. The survivor
  (`06-cloud-devops/06-docker/02-running-containers-and-persisting-data.md`) is Phase 7's, which makes
  the blacklist target a Phase-7 dependency rather than a Phase-8 cleanup.
  (6) **Two Plan-B defects sit inside *frozen* fences and were recorded, not fixed.** (a) "client timed
  out" rendered as «клиент дождался тайм-аута» — wrong sense. (b) Three `text` fences in
  `07-sql-relational-databases` hold translated Russian prose, one with an English `-- the report:`
  comment left inside. Fence contents are frozen against `b713de1d`, so fixing either fails `--diff`;
  both go to the WP-74/WP-75 audit. A frozen fence is where a translator's error can hide from every
  automated check the plan has.
  (7) **The children's own `.tmp` cleanup is unreliable.** Two of the ten reported that their `rm`
  command was blocked by the shell path guard, so 18 scratch files (`p6d-fencechk.mjs`,
  `p6d-body-test.md`, `p6h-metrics.cjs`, `p6j-sents.js`, `p6e-part.js`…) were left for the parent to
  sweep centrally. Expect this every phase and do not count on a child's tidy-up.
  (8) **`однако` at 1.79 per 1000 is the highest any phase has delivered** (floor 0.80) and is what
  carried the 698-file corpus row to 1.11. The density is a property of the brief plus the writers, not
  of the topic — count it from the `--file` lines each phase rather than assuming it.

- **[Session 2026-10-16 · Phase 5 — `04-product-process` COMPLETE]**: Ran the 61 files of
  `04-product-process` as **8 `worker` children in two waves of 4** — wave 1 WP-46b (7) / WP-44 (10) /
  WP-45 (10) / WP-43 (9) = 36, wave 2 WP-46a (5) / WP-47 (8) / WP-42 (6) / WP-48 (6) = 25. Both waves
  verified on the **disk** against a fresh `.tmp/wp42-48-baseline.txt` → `61 of 61 COMPLETE`;
  `git status --porcelain lessons/ru/04-product-process/` listed exactly those 61 paths and nothing
  else; `GLOSSARY.md` untouched. **Phase 5 is done.** `--diff --topic 04-product-process` → 0 structural
  differences; `--strict --topic` → exit 0 with **no `[S1]` line at all**; `validate-content --topic
  04-product-process --lang ru` → 0 error(s), 17 present / 26 examples; the topic is still 61 files.
  Topic metrics: corr 0.898→**0.183**, same-count 90.2%→**0.0%**, ratio 1.047→**1.138**, `однако`
  0.00→**2.11**, `— это` 2.82→**0.48**, participles 2.03→**0.59**, blacklist **0**. Both topic `[S1]`s
  cleared (`03-product-management/01-the-decision-role.md` ×6→0 via WP-43;
  `17-estimation-story-points/index.md` ×4→1 via WP-48). Whole corpus **459 of 698**; both root gates
  still `177 present / 297 examples / 0 error(s)`; whole-corpus `--diff` → 0 structural differences.
  **Three of the four previously-short corpus numbers crossed this session**: `однако` 0.70→**0.86**
  (≥0.80), same-count 38.7%→**30.8%** (≤40%), copula 1.44→**1.25** (≤1.50); corr 0.457, participles
  1.71. Only the **blacklist is still short** (2 hits in 2 files, both in untouched topics), and 17
  `[S1]` warnings remain, **none in `04-product-process`**. Durable lessons:
  (1) **Split any work package larger than 10 files before it goes to a child.** WP-46 (12 files)
  became 46a (5) + 46b (7), and the two halves are still verified as *one* package against WP-46's own
  list file — so the plan's contract survives the split. Twelve files is the size at which a fan-out
  child truncated silently in the earlier session's lesson; the cheap move is to spend one extra
  child rather than re-run a dead one.
  (2) **A fence's *contents* are frozen, not just its delimiters.** `--diff` compares the bytes between
  the opening and closing fence lines, so the *translated* tables and `text` blocks Plan B produced are
  untouchable. A writer who decides to reword a "formulaic line" will almost always find it inside one
  — `Reach × Impact × Confidence / Effort` lives in a paragraph, but the table under it does not.
  (3) **`git diff -U0 -- <files> | grep -E '^[+-](---|##|```)'` returning nothing is the cheapest
  structural regression check in the repo** — cheaper than reasoning about numstat, and it names the
  offending line. Phase 5 was +396/−398 over 61 files with one file off by 2 lines (a paragraph split)
  and zero structural hits. Run it before reading any child's report; it takes a second.
  (4) **The children overshot the `однако` floor on purpose, and that overshoot is the only reason the
  corpus row crossed.** Topic `однако` 0.00→2.11 against a 0.80 floor; the brief's "roughly one per
  file" produced ≈1.3 per file because unpicking `— это` forces real connective work. **Count the
  delivered density from the `--file` lines every phase** — a light phase reverses the corpus number,
  and a crossing is never permanent while 239 mirrors are still in the denominator.
  (5) **Declare `lessons/ru/GLOSSARY.md` off-limits *in the brief* during a fan-out.** Four writers,
  one shared file. No row needed changing this phase, but the collision was avoided by instruction,
  not by luck. A child that finds a calque row reports the exact before/after line; the parent applies
  it once, after every writer has stopped.
  (6) **Both spot-reads held.** `15-prioritization-frameworks-rice-moscow/index.md` and
  `03-product-management/examples.01-the-decision-role.md` matched their English twins fact-for-fact
  (numbers, ids, claims, table rows) while the prose was genuinely rebuilt — the "failure mode"
  sentence moved to the end of *Why it matters*, and `— это` survived only in the opening definition,
  exactly where R4 permits it. Read two files every phase; it is the only check `--diff` cannot make.
  (7) **The eight children left 22 scratch files** (`wp42-lens.mjs`, `wp42-median.mjs`, `med.mjs`,
  `flow-dump.mjs`, `wp43-sents.mjs`, `wp44-scan.mjs`, `wp46b-sents.mjs`, `wp48-o1.txt`…). Swept at the
  boundary; briefs, file lists, manifests, the verifier and the `wp*-report.md` evidence kept.

- **[Session 2026-10-16 · Phase 4 batch B — Phase 4 COMPLETE]**: Ran WP-38…WP-41 as 4 parallel
  `worker` children — the remaining 39 files of `03-design-ux` across 12 entry dirs (11 / 12 / 9 / 7).
  All 39 verified changed on disk with `node .tmp/verify-wp.mjs` against `.tmp/wp34-41-baseline.txt`
  → `39 of 39 COMPLETE`, and `git status --porcelain` showed exactly 39 modified files. **Phase 4 is
  done.** `--diff --topic 03-design-ux` → 0 structural differences; `--strict --topic` → exit 0 with
  **zero** warnings (the live `[S1]` on `37-lean-ux/index.md`, `— это ×5`, is now 0);
  `validate-content --topic 03-design-ux --lang ru` → 0 error(s); both roots still
  `177 present / 297 examples / 0 error(s)`; the topic is still 156 files. Topic 03-design-ux moved
  corr 0.398→0.208, same-count 23.1%→**0.0%**, ratio 1.150→1.181, `однако` 1.73→2.17,
  `— это` 0.91→0.48, participles 1.21→0.89, blacklist 0. Durable lessons:
  (1) **`git diff --numstat` is the cheapest structural proof that a recast happened.** Prose lines
  are whole paragraph lines and the gate has already frozen everything else, so every file must show
  a *balanced* small diff — this batch was +218/−218 over 39 files, 2–10 lines each, and 9 changed
  lines in a file with 6 headings and 9 prose paragraphs means every prose line was rewritten.
  An asymmetric numstat, or one larger than the file's heading+prose line count, means a heading,
  fence or frontmatter line moved. Read this before reading any child's report.
  (2) **Per-file `corr` is noise in *both* directions.** Batch A's lesson was that an *untouched*
  mirror can score 0.154; batch B adds the converse — a genuinely recast file scored **0.909**
  (`33-usability-testing/examples.02-analysis-and-severity.md`). Short files (9–18 sentences) have too
  few points for the statistic to mean anything. Only the topic-level mean is a signal.
  (3) **The `однако` density a child actually delivers varies by 4×.** WP-40 delivered exactly one per
  file across all 9; WP-39 delivered 3 across its 12 (0.62/1000, below the 0.80 rate). Both received
  the identical brief. Never assume a child honoured "roughly one `однако` per file" — count it from
  the `--file` lines in its report and state it in the batch summary.
  (4) **The whole-corpus numbers lag the topic numbers by design.** `03-design-ux` clears every
  target while the 698-file corpus still reads `однако` **0.70** (≥0.80), same-count **38.7%** (≤40%),
  copula 1.44 (≤1.50) and blacklist 2 in 2 files — because 301 untouched files are still in the
  denominator. Do not "fix" these by weakening a target; they move when phases 5–8 run.
  (5) **`--topic --strict` is the right acceptance command only once every writer has stopped.**
  Run mid-fan-out it names files other writers are still holding; run at the batch boundary it exits 0.
  (6) **The children left twelve scratch files** (`sent.mjs`, `sent2.mjs`, `part.mjs`, `base-fid.md`,
  `cmp-fence.mjs`, `dump-wp40.mjs`, `wp38-scan.mjs`, `wp38-spans.mjs`, `wp38-med.mjs`, `wp38-eol.mjs`).
  Swept at the batch boundary; the briefs, file lists, manifest, verifiers and `wp*-report.md`
  evidence were kept.
  (7) **CRLF integrity held.** No recast file's line endings diverged from `HEAD` — worth checking
  after any scripted sweep, but the `write`-per-file pattern does not disturb them.
- **[Session 2026-10-16 · Phase 4 batch A]**: Ran WP-34…WP-37 as 4 parallel `worker` children —
  batch A of Phase 4. All 44 assigned files changed on disk; `--diff --topic 03-design-ux` → 0 structural
  differences, `validate-content --topic 03-design-ux --lang ru` → 0 error(s), global `--strict --lang ru` →
  177 present / 297 examples / 0 error(s). Topic metrics corr 0.595→0.398, same-count 50.0%→23.1%,
  `однако` 1.10→1.73, `— это` 1.52→0.91, participles 1.32→1.21, blacklist 0. Stopped before batch B
  (WP-38…WP-41, 39 files) at the user's request. Durable lessons from this run:
  (1) **The per-file `corr` row is not a quality signal.** `pearson()` truncates both arrays to
  `Math.min(a.length, b.length)`, so an *untouched* mirror file whose sentence count is off by one
  (45 vs 46) scores `corr 0.154`. Judge a file by `same sentence count` plus reading it, never by `corr`.
  (2) **Verify the disk with a sha256 manifest taken before the fan-out** (`.tmp/wp34-41-baseline.txt`),
  compared after. Unlike `git diff` it survives a commit made by the user mid-run.
  (3) **`--strict --topic` proves almost nothing on a partially recast topic**: it exits 1 on the
  corpus-level rows and names only files that break a *per-file* rule (the `— это ×N` cap). Four of the
  five warnings it printed before batch A belonged to files the batch had not started. The manifest is
  what proves the work happened.
  (4) **The honest `однако` density is ~1 per file**, and it is what the corpus target needs: the
  topic rate rose 1.10→1.73 while 83 of its 156 files were still untouched.
  (5) **Clean-sweep the workers' scratch scripts in `.tmp/` at every batch boundary** — four children left
  ten helper `.mjs` files (`sent.mjs`, `nums.mjs`, `wp36-*.mjs`, `wp37-*.mjs`). The parent deleted them;
  the reports, the brief and the manifest were kept for the next batch.

<!-- imported verbatim from the index 2026-10-16 -->
- **Recompute file counts per work package; never estimate them.** The first draft of the plan carried 4 wrong "create these N files" counts and 4 wrong per-topic totals (53 against 63, 44 against 59, 44 against 53, 96 against 88). The formula is entries plus medium times 2 plus large times 4.
- **`present` counts inventory entries, not files.** Children (`NN-*.md`) are not entries, so writing a 3-file entry raises `present` by 1. Reading `26 present` as 4 short of 30 was a miscount on my part, not a validator bug — verify with a script before reporting a discrepancy.
- **Budget a full lesson at ~850 words, not 950.** Across Phase 3, most substantial child lessons came in 5–15% over the ceiling on first write and needed a trim sweep; the worst (`git/02-the-daily-workflow.md`) was 1101 words and lost a whole core idea. Writing shorter costs less than trimming, and trimming risks the two formatting mistakes below.
- **A trim edit whose `oldText` ends with a newline can join the last bullet to the following `##` heading.** Symptom: `V7`/`V4` still passes but the file renders wrong, and the blank line before the next heading is gone. Always `tail` a file after a trim sweep.
- **Success checks written as `grep '^- .+ (`id`)'` over a landing page also match the `## Prerequisites` bullets**, because those use the same shape. A plan expecting `2` such bullets in each of three testing entries is arithmetically wrong: the two landings whose prereq is a testing entry score 3, and only the one whose prerequisites read `None.` scores 2. Print the matching lines before treating a mismatch as a defect.
- **The no-external-URL rule catches even illustrative examples — it has now bitten three times.** Phase 2 lost a `schema.org` context value and a canonical-URL example; Phase 3 lost an `export API_BASE=https://api.example.test` shell example. Where an example genuinely needs a URL, use placeholder text and say why in one line. Always grep before declaring a work package done.
- **Area and landing word budgets are tight.** Five `Included skills` bullets cost ~80 words before any prose; three area/landing files exceeded 300/400 words on first write and had to be trimmed. Target ~270 words for an area page.
- **Plan expected values can be arithmetically wrong.** Confirmed errata so far: WP-5 expected `2 present, 29 pending` where only `1 present, 30 pending` is correct; WP-3 expected a "title mismatch" diagnostic no unknown directory can produce; Phase 3's verification expected a global `58 present, 119 pending` where the correct value is `59, 118`; WP-14's cross-reference grep expects `2` where the correct values are `2 / 3 / 3`; Phase 4's verification expects `81 present, 96 pending` where the correct value is `82, 95`; **Phase 5's `100, 77` / `101, 76` erratum was itself WRONG** — verified in Phase 5, no phase file contains `58 present`, `81 present`, `100 present`, `119 pending` or `118 pending`, and Phase 5's verification block has no global count line at all. The real global after Phase 5 is `196 examples, 101 examples pending`, which matches Phase 6's own prerequisite ("the remaining 101 examples files") exactly. What did hold exactly: Phase 3's `45` and Phase 4's `55/56` per-topic counts, and Phase 6's `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`. Run the check, do the arithmetic, and report the erratum rather than bending the code to match it.
- **The single most common first-draft defect is a seventh `###` subheading in `## Core ideas`** — 14 of the 17 validator errors raised across Phases 4 and 5 were `[V7] Core ideas has 7 subheadings, expected 3-6`. The fix is to delete the heading line so the paragraph joins the neighbouring section, which must be chosen to read as a continuation. Two further errors were `[V5]` bodies of 974 and 991 words against a 950 ceiling; both were trimmed by deleting a heading plus one redundant sentence per overrun.
- **Take every directory slug from `tools/inventory.json`, never from memory or from a paraphrase of the title.** A Phase-5 index was written to `message-queues-kafka-mq/` instead of `message-queues-kafka-rabbitmq/`; V14 reports an unknown directory as an error, so it was caught before the WP check passed, but a rename is cheaper than debugging a missing entry.
- **The validator's Go-deeper bullet pattern does not require a trailing period** (`- **Title** (\`id\`) — text`). A local audit regex that demands a full stop flags bullets ending in `?` as malformed — a false positive. Use the validator's own pattern when sweeping, or verify each hit against `tools/validate-content.mjs`.
- Go-deeper bullet format is only partly enforced: the validator counts bullets that match the pattern and ignores ones that do not, so a malformed bullet silently reduces the count instead of failing. Audit with an `awk` sweep over the `## Go deeper` sections rather than trusting a 0-error run.
- The pi path guard rejects bash commands containing regex escape sequences (the whitespace and digit character-class shorthands), and also rejects any string that parses as a path outside the working directory — including `'lessons/' + id + '/index.md'` built by string concatenation, and a `node -e` snippet containing a newline escape (reported as `Access to D:\n is blocked`). Use `path.join`, write a `.tmp/` script, or avoid backslashes entirely.
- Writing any Python file into this repo makes ruff create `.ruff_cache/`; remove it before staging.
- A one-off scripted edit sweep must read and write files in binary so line endings are preserved; a naive text-mode rewrite turns a CRLF file into a whole-file diff.
- **The validator does not track fenced code blocks.** A line starting with `## ` inside a fence is parsed as a real `##` heading and breaks V4/V7 — it happened in `product-process/technical-writing/01`, where a README example contained section headings. Indent those lines inside the fence or use a non-`##` marker; `#` alone is safe, because only `^## ` is matched.
- **Every fenced block needs a language tag.** The validator does not check this but markdownlint reports MD040. Audit it with a script that tracks fence state, not with a grep for the bare fence — every closing fence matches that pattern too. Three blocks were written bare across Phases 6 and 8.
- **Avoid inline HTML placeholders in prose.** Writing a user-story shape as `"As a <role>, I want <capability>"` tripped MD033 three times in one file; use `*role*` or plain words instead.
- **Verify every cross-reference id against `tools/inventory.json` before writing it.** `frontend/accessibility` does not exist (the real id is `frontend/accessibility-wcag-a11y`) and `cs-fundamentals/documentation` does not exist at all; two invented ids produced five V7 errors.
- **V6 catches `https://` inside code examples.** A redirect example in `security/https-tls/02` naming an explicit scheme and host was rejected; describe the redirect without the scheme, for example `301 <same host, secure scheme><same path>`.
- **The area-page ceiling is 300 words and it is tight.** `product-process/software-development` landed at 302 on the first draft and needed a targeted trim. Budget about 270 words for an area page; landings (~270) and full lessons (~700-850) were comfortable.
- **Phase 8's `grep -rni 'pending' lessons/*/` check is a substring proxy with false positives.** It matches "depending" and legitimate technical senses of the word — Kubernetes pods left "pending forever", a JavaScript promise's pending state. Read the hits before treating a non-empty result as a defect.
- **The prereq graph is 127 within-topic edges and only 9 cross-topic ones.** A dependency ordering is therefore *derivable*, not a judgement call: the per-topic topological sort resolves 177/177, and areas go first (inventory order), ties broken by inventory order. Only one of the nine cross-topic edges constrains the topic order in each direction tested — `backend-data/sql-relational-databases` → `cs-fundamentals/database-internals` is what makes the fundamentals-first order need a one-line prereq demotion.
- **Do not add a `##` heading to a lesson file to carry new content.** The three body shapes are exact and V4 rejects any extra heading; 297 files would fail at once. A new content type belongs in a separate file whose name the validator's child regex cannot match.
- **`examples.NN-slug.md` does not match the validator's `/^\d{2}-/` child filter**, which is exactly why the naming rule was chosen — `01-x.examples.md` *would* match the filter and corrupt V8's child count. The child filter still ignores examples files; V15/V16 pair each one with its lesson explicitly instead.
- **`id === topic/slug` survives numeric prefixes for free**, because the validator builds ids from directory names; `01-css` already satisfies the existing slug regex. Only the `TOPICS` constant has to change. The `--topic` flag then expects the prefixed name, so `--topic design-ux` starts failing and `--topic 03-design-ux` works.
- **`legacy-ru` in the knowledge bases is the paradise-education blog, not lesson material** — it is not a translation source for this corpus. A quick semantic search confirms it before anyone plans around it.
- **Russian word bands for this corpus are an estimate, not a measurement** (full 400–1100, landing 180–460, area 100–340, examples 100–500). Russian technical prose carries the same content in fewer words than English, but the exact ratio was not measured — tighten the bands only from real counts.
- **The plan's "five id shapes" list was one short: the frontmatter `topic:` scalar.** V3 requires `topic` to equal `inventory.topic`, so WP-3's inventory rewrite broke all 177 `index.md` files at once (`[V3] topic is 'cs-fundamentals', expected '01-cs-fundamentals'`, on top of 177 V1 `unknown topic` errors = 354). The id sweep had to be extended to rewrite that bare topic value — approved by the user mid-run. Any future renumber must treat `topic:` as id-bearing.
- **The 120–450 word band counts fenced code, so a file that reads like ~400 words measures 450–510.** Budget ~380 words in the first draft; by the end of Phase 4 that was 21 of 71 examples files needing a trim sweep. Trim the least load-bearing sentence of each Solution explanation, then re-measure with the validator rather than by eye (`node tools/validate-content.mjs --topic <dir>` reports the exact count).
- **Budget ~330 words for an examples file whose artefact is an observation rather than code** — DevTools panel states, Core Web Vitals diagnostic readings, Lighthouse report tables, GEO restructures. Each `text` fence of observations carries 30–60 whitespace tokens on its own, so Phase 4 needed four consecutive trim sweeps in exactly those files (24–62 words over). Code-fence files in the same work packages came in under budget.
- **A trim edit whose `oldText` ends with a newline can swallow the line break before a closing fence tag, not only before a `##` heading.** In `28-generative-engine-optimization-geo/examples.md` a fence line became `…)``` ` and the fence silently broke — `V15` still counted the words, so only a `sed`/`read` of the edited region showed it. The 2026-10-15 repair pattern is: after any trim sweep, re-read the region (or `sed -n '<range>p'`), then re-run the validator.
- **The phase-verification blocks are not uniform — read each one rather than assuming a global count check.** As verified at the end of Phase 4, Phase 3's and Phase 4's verification blocks ask only for the topic run, the `find` count, the URL grep and that no lesson file changed; neither carries a global present/pending line. Phase 4's does carry a stale parenthetical — "(`--strict` still exits 0 with `177 present`)" — where `--strict` in fact exits 1 with one `[V16]` per missing examples file (195 after Phase 4). The two global expectations that did hold exactly: WP-16's "global examples pending is 45 lower" (measured 295 → 250) and WP-24's topic run of `56 examples, 0 examples pending, 0 error(s)`.
- **MD041 fires on every examples file and is expected.** §12 forbids frontmatter and requires the file to begin at `## Example 1 — …`, so there is no top-level `#` heading to add. It is a deliberate, plan-verified deviation — do not "fix" it.
- **The pi path guard rejects `^` followed by a character inside a bash command string**, not only backslash escapes: a `node -e` with `.match(/^## Example/gm)` or a `sed -n '/^## 1\./,/^## 2\./p'` fails with `Access to D:\^## is blocked`. The error looks like a bad regex but is the path guard. Avoid the caret (use `split()` + `startsWith()`), or write the script to `.tmp/`; `String.fromCharCode(10)` substitutes for a rejected `\n`.
- **Keep `--strict` out of the loop during Phases 3–6.** It reports one `[V16]` error per missing examples file (195 remaining after Phase 4, by design). The signal to watch is the five-part summary's `W examples pending`, which must fall by exactly the number of files the work package creates.

- **WP-48's prose-integrity recipe is two rules, not one.** "Apply the same single-pass longest-first id replacement used in WP-4" is not enough: every key in `tools/renumber-map.json` contains a slash, so the recipe misses the bare frontmatter `topic:` scalar (the fifth id shape, rewritten mid-run in WP-3 with the user's approval) and reports all 177 entry `index.md` files as changed at line 4. The audit must also rewrite a line that starts with `topic: ` when its value is an old topic name. With both rules the Phase 7 audit compared 402 files with 0 unexplained differences.
- **`find lessons -mindepth 3 -name '*.md' | wc -l` counts examples files too**: it returns 698, not the `401` WP-48 expects, because `examples*.md` also sits at depth 3. Add `-not -name 'examples*'` for the lesson-file proof — both the file count and the total line count then match the backup's 401 (which remains the only usable volume signal, since an unstaged rename is never reported as one).
- **WP-37's Java DO bullet asks for something the lesson cannot give.** It says to "name the tool" for `04-java/03-builds-and-dependencies`, but that lesson never names a build product anywhere — it says "a build tool", "the build tool's own version", "a wrapper". The corpus rule that a work package may not name a tool the lesson does not mention wins, and WP-37's Success criteria never test tool naming, so the file keeps the lesson's own term. Expect this class of conflict whenever a plan bullet asks for specificity the source lesson deliberately avoided.
- **The pre-renumber backup is gone; nothing else holds the old ids' prose.** `.tmp/lessons-backup/` was deleted in WP-50 as designed, so the "only ids changed" proof cannot be re-run without rewriting the script. `tools/renumber-map.json` (177 entries, 224 children) is the surviving record of the mapping.
- **Plan A's remaining 195 examples files were written by fan-out batches of four `worker` subagents**, one work package each in disjoint entry directories, 8–10 files per run, `write` once per file. They resolved to `ollama/deepseek-v4.1-flash:cloud` at thinking `high` (from `subagents.defaultModel` and `subagents.agentOverrides.worker.thinking`). No run aborted, each took roughly 2–6 minutes, and the per-file discipline held. Transient `[V15]` errors naming another writer's in-flight file were routine mid-batch and cleared by that writer before its own boundary — verify only your own files, then re-run the topic validator once all writers have stopped.
- **Plan B ran the same fan-out pattern at 8× the scale: 41 WPs in 8 phases, ~18 async `worker` runs of ≤4 children each, one work package per child in disjoint entry directories.** Workers translated 8–14 files each, `write` once per file. The parent never wrote a Russian lesson itself; it owned the brief (`.tmp/brief-ru.md`), the terminology decisions, every validator run and every cross-worker conflict. No run aborted. This is the pattern to reuse for any large, uniformly-shaped content job.
- **`grep '(https\|http)'` is a NO-OP in this repo's grep, and every plan URL check uses that pattern.** The build does not implement BRE `\|` alternation, so it searches for the literal string `(https|http)` and always prints nothing — those "URL grep empty" checks across both plans verified nothing. Use `grep -rnE 'https?://'` instead; the authoritative check is the validator's V6. Do not report a clean URL grep as evidence until the pattern has been probed once (`echo http | grep -c '<pattern>'` must print 1).
- **A bare substring check for `http` will never be empty in this corpus** — 68 Russian lines contain it legitimately (`http_requests_total` in PromQL, `HttpClient` in the Angular example, `http/handler.ts`, the id `…networking-fundamentals-http-dns-tls`, the title `HTTPS и TLS`). Distinguish substring hits from real URLs; only `https?://` is the rule.
- **`grep -r` matches file *contents*, not paths**, so a plan check like "`grep http` over `07-security` must be empty" is not invalidated by the directory `02-https-tls` existing. Read the hits before calling a grep a defect.
- **V17 validates cross-references against the target file's own `title`, and skips a target that does not exist yet.** That makes it safe during a fan-out (partial corpora) but also means the only real title contract is "parent bullet == child file". `GLOSSARY.md` deliberately holds **entry titles only**, so child lesson titles are internally consistent, never centrally locked — a cross-worker mismatch is fixed by letting the child file win and editing the parent bullet. Expect this to be the main class of Russian review finding.
- **A worker will invent its own child titles, so make the parent wait for the child file it cross-links to.** In `07-security/06-content-security-policy-csp` the sibling's child title had to match the bullet verbatim; it did only because the parent re-checked after the sibling landed. Give one worker the whole entry when its prose cross-links into another worker's entry.
- **The `--lang` flag is not optional.** Running the validator with no flag over a Russian corpus silently validates `en` and reports a green line that says nothing about the new files. Every Russian boundary check is `--topic <prefixed-dir> --lang ru`; the global is `--strict --lang ru`.
- **Russian entry and topic counts**: `07-security` is 23 files (7 entries, 10 examples), `08-soft-skills` is 24 files (9 entries, 11 examples); each `lessons/ru/NN-<topic>` must hold exactly the same `*.md` set as its English twin — that identity is audit check 1 and the cheapest real proof the mirror is complete (`698 Russian files, 698 English files, 0 missing, 0 orphans`).
- **The Russian bands were an estimate, and the 698-file audit found 0 out-of-band bodies.** They can be tightened only from real counts; until then treat full 400–1100, landing 180–460, area 100–340, examples 100–500 as the definition rather than a target.
- **A structure audit that greps for HTML comments or `##` inside fences must be fence-aware.** The Plan B audit's check 2 initially flagged inline HTML that sat inside a `text` fence; a simple line grep cannot tell a code sample from prose. Track fence state (a `^\x60\x60\x60` toggle) and only test lines outside fences, exactly as the validator does for headings.
- **Mirror drift is real and cheap to catch: two `text` fences in `05-backend-data/03-python-programming/` had been changed to `py`.** A translation sweep touches prose, but a fence *tag* is part of the structure contract; compare fence-tag order against the English file (audit check 2), not just heading counts.
- **Workers leave scratch scripts in `.tmp/` — the parent must sweep the directory, not just its own files.** Plan B's WP-41 found `count.cjs`, `count-en.cjs` and `ids.cjs` left behind after the workers reported "deleted". Verify with `ls .tmp` before declaring the cleanup done.
- **Plan B errata, reported but not applied**: WP-5's `2 examples` is really `1`; Phase 1's `find … = 3` is really `4` (`INDEX.md` matches `*.md`); WP-2's "skip V17 when the target is not yet Russian" had to be implemented as skip-on-missing-target; Phase 5 writes `стори-поинт` where `GLOSSARY.md` says `story points`; and **`Что это такое` is full/landing only** — the plan's "all three shapes" reading is wrong, an area page keeps the English four headings (`Что охватывает`, `Почему это важно`, `Входящие навыки`, `С чего начать`).
- **The Russian root skips V3's `title` check (`currentLang === "ru"`), and that is required, not a loophole.** Russian titles are authored per file and the English title is not the contract for them; V3 still compares type/tier/topic/prereqs/aliases/related/status, and the `en` root still compares titles. Never remove that guard to "make a check stricter" — it would fail all 177 Russian entries at once.
- **Plan B's objective line and Plan A's are the same five-part summary**, so `--lang all` prints two identical-looking lines; read the root, not the numbers, before concluding anything about a new corpus.
- **Plan C added a style gate; its two modes prove different things, and `--strict` on a topic proves least of all.** `node tools/check-ru-style.mjs` prints the nine corpus signals plus the per-file rules; `node tools/check-ru-style.mjs --diff` compares `[D1]`–`[D10]` against the recorded baseline blob read back with `git show b713de1d:<path>`. `--strict` exits 1 whenever any corpus target is missed, so over a single topic it exits 1 on the corpus-level rows even when no per-file line names your files — judge a topic by its per-file lines plus `--diff`, never by `--strict`'s exit code alone. A missing baseline blob is an error, never a pass.
- **`--topic <dir>` is a topic score, not a work-package score, and it dilutes while other work packages in the same topic are untouched or in flight.** A worker must judge its own output with `--file <path>`. `03-design-ux` read far below target right across WP-27…WP-33 purely because dirs `22-`…`44-` had not been touched yet.
- **The `однако` metric is case-sensitive, so sentence-initial `Однако` is invisible to it — and `однако` is Plan C's binding target.** `grep -o 'однако'` undercounts what a Russian reader perceives; use `grep -rio` when investigating density, and treat the gate's lowercase-only figure as the conservative one.
- **The attributive-participle metric over-counts, because `-ющий` also ends ordinary agent nouns.** It flags `вызывающий` ("caller") and similar substantivized forms, not calqued `-ing` clauses. Expect one or two false positives per topic; the 2.00/1000 budget has room for them, and the regex is a proxy, not a verdict.
- **`--diff` maps any child lesson to shape `full`, mirroring `validate-content` — both read `type`/`tier` from frontmatter, which child lessons do not carry.** A `NN-slug.md` child with a single fence is still `full` to both tools. If the two tools ever disagree on a file's shape, that is a gate bug, not a corpus bug.
- **Plan C's sentence-level baselines do not reproduce; its per-file pins do.** Sentence splitting is version-sensitive: the planner's `0.926 / 95.7% / 1.046` come out as `0.924 / 89.5% / 1.046` on the untouched corpus, while every per-file correlation pin in the plan reproduces exactly. The ratio row was also measured in **words** by the planner while the written definition says **characters**, which makes R2's ≥0.95 target already satisfied at baseline — a floor guard, not a driver. All three were recorded in `BASELINE_METRICS` and reported; no target was weakened and the script was never tuned to the plan's numbers.
- **A worker's OK status is not evidence, and it will report plausible metrics for files it never wrote.** One returned success having written 3 of its 12 files, with a per-file metric line for each of the 12. Count changed paths on disk with `git diff --quiet -- <path>` per assigned file at every batch boundary: a work package that reports 12 writes can really be 3.
