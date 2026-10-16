# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site now planned around it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D now lives in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-16

## Current Task
**The site plan is written and ready to execute.** `.pi/plans/astro-site/` — 6 phases, 25 work packages, 2381 lines across 7 files. **No code has been written.** Start with `.pi/plans/astro-site/_index.md`.

**The Russian prose recast (Plan C) is PAUSED, deliberately, at 550 of 698 files.** Nothing is mid-file. Resume at Phase 7 / WP-58 (`06-cloud-devops`) whenever you like; the pause costs nothing, because the recast is per-file atomic and both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Pivoted from Plan C to the site.** The corpus is usable now; Plan C is token-heavy with a usable end state only after 148 more files.
- [x] **Settled the requirements** — public site; both languages at launch, English unprefixed and Russian at `/ru/`; Cloudflare Pages; mobile-first; burger under 1024px; cookie banner as a real consent gate; scroll-to-top; dark/light with system default; placeholder GA; WCAG 2.2 AA; no React.
- [x] **Typography research, and the finding that changed the answer.** The font question is a *Cyrillic* question, because the site ships Russian. Settled on **Literata** (body) + **Golos Text** (UI), both self-hosted. An expert Cyrillic review rejects the obvious defaults — **Inter "should not be used", Noto Serif "not usable", Roboto "questionable"** — so never substitute them.
- [x] **Spacing spec fixed** — measure `65ch` (a `ch` unit, so the character count holds across both scripts), body 17px → 18px at 1024px, line-height 1.5 → 1.6 at 1024px, headings 1.1/1.2, 4px rhythm.
- [x] **Established why the corpus bans external URLs**, asked as a question about its history: the rule predates the site by eight months, comes from the first plan's Global Constraints, and the whole link graph is id-based (V12 resolves ids; a URL is not an id). That is exactly why video data must live in `content/videos.json`, outside `lessons/`.
- [x] **Investigated the real corpus and the real Astro 7 APIs rather than assuming.** Per root: 177 `index.md` + 224 children + 297 examples = **698**. `tools/inventory.json` has **no `related` key** and **no topic display titles**. `07-security` and `08-soft-skills` have **no area entry**; `02-frontend` has two. Verified every npm pin against the registry and read the Astro docs for the Fonts API, `glob`/`generateId`, Shiki dual themes and the sitemap's `i18n` option.
- [x] **Wrote the plan** — `.pi/plans/astro-site/{_index,phase-01…phase-06}.md`. 25 WPs; every one carries all five CTCS+ fields and at least one command-based Success check.
- [x] **Reviewed the plan and fixed three real defects in it** — page-count arithmetic that ignored the Phase 2 privacy pages (the parity checks would have failed a *correct* build); a fragile `find` glob; and a Success check testing a `data-lesson-prereqs` attribute the plan never told anyone to write. Verified every cited path exists, and that the corpus facts behind the checks are true (`02-frontend/05-css` really is in `03-html`'s *Go deeper*; `Done when:` really occurs twice there).

## In Progress
- Nothing is mid-file. `astro/` has not been created and no site code exists.

## Blocked / Needs Decision
- [?] **`site` in `astro/astro.config.mjs` is still the placeholder `https://2learn.example.com`**, and it is load-bearing — canonical URLs, hreflang, the sitemap, both RSS feeds and `robots.txt` all derive from it. WP-23 treats this as a hard `BLOCKER` rather than inventing a domain. **Supply the real domain before deploying.**
- [?] **Six deliberate deviations from what was approved**, all flagged in the plan and none of them silent: `/privacy/` + `/ru/privacy/` were **added** (GA plus a consent banner with no privacy statement is a real gap); the glossary ships as **`/ru/glossary/`, Russian-only** (its terminology table maps English→Russian, so it is meaningless to an English reader); the theme toggle is **two-state** (system default on first visit; no way back to "follow the system" without clearing site data — recorded as a `shortcut:` comment); the video strip sits **after** the lesson body; the RSS feeds carry **no dates**, because the corpus records none and a fabricated `pubDate` is worse than a missing one; and the `/about` + `/privacy` copy needs your review — WP-17 requires every unknown to become a visible `TODO: confirm` rather than a guess.
- [?] **The rules index is over its own size budget — 17.6 KB / 99 lines against a stated 11 KB Stage B target.** Two rounds of the prescribed remedy are done: the long-form Plan A–D status moved to `.pi/memory/plan-a-b-c-history.md`, and the corpus contract's detail moved to `.pi/memory/content-rules.md` (the index keeps only the rules that have actually bitten). What remains is almost entirely `## Active Constraints`, which must **not** be moved to a chunk. Getting to 11 KB needs a judgement call on which constraints are no longer live — your call, not a mechanical move.

## Next Steps
1. Execute the site plan: `Read .pi/plans/astro-site/_index.md, then execute the plan phase by phase.`
2. Supply the production domain, then `/skill:deploy`.
3. Resolve the `TODO: confirm` lines WP-17 produces, and review the privacy copy.
4. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files. It owns the corpus's **last blacklist hit** and 10 of the 14 remaining `[S1]` warnings.
5. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.

## Key Decisions
- **The site is Plan D and is independent of Plans A–C.** Each plan minds its own features. It needed a new plan because all four existing plan directories explicitly forbid creating `astro/`, `package.json` or any site code.
- **The corpus stays byte-frozen.** `astro/` reads `lessons/` through the content layer and writes nothing. Every phase ends with `git status --porcelain lessons/ seed/` printing nothing.
- **No UI framework.** The burger drawer is a native `<dialog>` (which supplies the focus trap, Escape-to-close and background inerting for free), and the theme toggle and scroll-to-top are ~30 lines of vanilla `<script>` each. No React, no MDX, no typography plugin, no Partytown.
- **Dependencies live only in `astro/`.** No root `package.json`, ever — `tools/validate-content.mjs` must keep running on bare Node ≥ 22.
- **Video data lives outside `lessons/`** in `content/videos.json`, keyed by corpus entry id, storing the 11-character `videoId` and **never the URL**. Thumbnails are downloaded at ingest, never hotlinked, so no visitor's IP reaches Google.
- **Theming is `light-dark()` + `color-scheme`**, with `data-theme` written by the project's **only** `<script is:inline>` (the pre-paint boot). No duplicated per-theme tokens, and no white flash on load.
- **The gate is Lighthouse plus a manual WCAG 2.2 AA checklist.** `lighthouserc.json` is created at the repo root, so your existing Lighthouse skills read the same file.
- **Fonts download at build time and self-host.** No runtime third-party request — which is also what makes the consent banner coherent rather than theatre.

## File Map
- `.pi/plans/astro-site/_index.md` — CREATE — objective, global context and constraints, the route map, the route→WP table, the file map. **Read this first.**
- `.pi/plans/astro-site/phase-01-foundation.md` — CREATE — WP-1–4: scaffold, design tokens, fonts, content layer + graph.
- `.pi/plans/astro-site/phase-02-shell.md` — CREATE — WP-5–9: urls + dictionary, base layout, header/nav/toggle, footer/scroll-top, consent + privacy.
- `.pi/plans/astro-site/phase-03-reader.md` — CREATE — WP-10–15: rehype link transform, data access, presentational components, the corpus router, home pages, 404/robots/sitemap.
- `.pi/plans/astro-site/phase-04-discovery.md` — CREATE — WP-16–20: `/entries/`, about, `/ru/glossary/`, feeds, Pagefind search.
- `.pi/plans/astro-site/phase-05-videos.md` — CREATE — WP-21–22: `content/videos.json`, `tools/check-videos.mjs`, the video card.
- `.pi/plans/astro-site/phase-06-verify-ship.md` — CREATE — WP-23–25: Cloudflare config, WCAG/perf verification, corpus regression + acceptance.
- `.pi/memory/plan-a-b-c-history.md` — CREATE — long-form status of Plans A–D, moved out of the rules index.
- `.pi/memory/content-rules.md` — CREATE — the corpus contract's detail (shapes, word bands, field order, examples sidecars, Russian overrides), moved out of the rules index.
- `.pi/CONTEXT.md` — MODIFY — this file.
- `.pi/project-rules-memory.md` — MODIFY — site stack, new constraints, condensed architecture.
- `.pi/memory/lessons.md` — MODIFY — one appended session entry.
- `lessons/**`, `seed/**`, `tools/validate-content.mjs` — **UNTOUCHED** (verified: `git status --porcelain lessons/ seed/` prints nothing).

## Gotchas / Warnings
- **`site` is a placeholder, so everything derived from it is wrong until it is set.** WP-23 reports it as a blocker rather than quietly shipping wrong canonicals.
- **The one genuinely uncertain mechanism in the plan is WP-10's rehype plugin reading `file.path`** to choose the `/ru` link prefix. WP-10 fails loudly at the earliest possible point — a grep for `href="/ru/…"` in the built Russian output — rather than silently mis-prefixing ~700 Russian links. If it fails, **stop and report**; do not improvise a replacement mechanism.
- **Astro's default `generateId` produces `…/index`, which breaks every corpus id.** The plan passes an explicit `generateId`; never remove it.
- **The Fonts API downloads at build time**, so a build needs network. The fonts land as 4+ files under `dist/_astro/*.woff2`; that assertion belongs to WP-6, not WP-3, because nothing references the fonts until the layout exists.
- **The Pagefind index only exists after a build.** Search must be tested against `npm run preview`, never `npm run dev`, where the search page correctly shows a "built site only" message.
- **Page-count arithmetic for verification, per tree:** 706 corpus pages (8 topic + 177 entry + 224 child + 297 examples) → **708** at the end of Phase 3 (+ home + privacy) → **711 EN / 712 RU** at the end, the Russian extra being `/ru/glossary/`.
- **Two documented GA traps must not be reintroduced:** `gtag.js` silently ignores array-form `dataLayer.push(['config', …])`, and Partytown loses the landing pageview. Use the canonical `gtag()` function form, and verify with a real `g/collect` request — "no error and no request" is a fail, not a pass.
- **Never use `opacity` to mute the footer credit** (opacity-60 measured 2.26:1, failing WCAG AA). The `--fg-muted` token alone passes in both themes.
- **The corpus's own traps are unchanged** and apply again if Plan C resumes: `--diff` does **not** check `###` subheadings (so the `git diff -U0` grep is load-bearing), a fence's *contents* are frozen and not just its delimiters, and `--lang ru` is never optional.
