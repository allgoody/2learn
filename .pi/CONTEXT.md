# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site built over it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D is in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-17

## Current Task
The site is **live in production at https://2learn.pages.dev** (deployment `ba088794`, commit `2793d52`). The style round (cards, focus rings, drawer rows, trimmed footer, sticky header) is **committed locally** through `d4b97bb` — **nothing is pushed**, so the live site still does not have it.

**A small committed-favicon-and-navigation round is UNCOMMITTED** (5 paths): a real favicon, and prev/next now walks a topic in reading order.

**The Russian prose recast (Plan C) is still PAUSED at 550 of 698 files.** Resume at Phase 7 / WP-58 (`06-cloud-devops`). Nothing is mid-file, and both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Added the favicon** — `astro/public/favicon.svg` is the first thing ever to live in `astro/public/`, declared with `<link rel="icon" type="image/svg+xml">`. A declared icon suppresses the browser's automatic `/favicon.ico` request, so the standing 404 is gone without shipping an `.ico`.
- [x] **Rewrote prev/next as one flat topic reading order** — `prevNextInOrder(id)` **replaced** both `prevNextInEntry` and `prevNextInTopic`, so an entry leads into its first lesson and an entry's last lesson leads into the next entry. Both `[...path].astro` call sites collapsed to one line. Verified by walking the emitted chain in `dist/` (77 pages on `02-frontend`, spot-checked `ru/`), not by the report.
- [x] **Recorded the content-refactor brief** at Next Steps #7 with the user's own examples kept verbatim, so the next session does not have to re-derive them.
- [x] **Earlier:** created the Pages project, set `SITE`, committed and deployed; then clickable cards and the burger-anchored menu with its RU/EN switch, committed and deployed. (Both in `.pi/memory/lessons.md`.)
- [x] **Closed the eight holes the earlier changes opened or left** — card hover affordance, card-sized focus rings, clickable `/entries/` rows, entry rows unified as cards, drawer link rows with a current-page accent bar, the count/tier pill, the sticky reveal-on-scroll header, and the footer cut to About + Privacy.
- [x] **Fixed two knock-ons from making the header sticky that nothing else covered** — the lesson ToC would have slid under the bar, and a ToC jump would have landed its heading behind it. Both now hang off one new `--sticky-offset: 5rem` token.
- [x] **Repaired two of my own errors, neither caught by a gate** — see Gotchas. Both were found by re-reading the file, not by `astro check`.
- [x] **Verified the whole set in the built output** — every rule present in the emitted CSS, counts unchanged (8 topic cards, 31 rows on `/02-frontend/`, 177 on `/entries/`), `astro check` 0 errors, build green.

## In Progress
- Nothing is mid-file. The favicon + prev/next round is built, `astro check` clean (0 errors) and verified in `dist/`, but **uncommitted and undeployed**.

## Blocked / Needs Decision
- [?] **The favicon + prev/next round is uncommitted and the live site is behind it (and behind the committed style round too).** Committing and deploying are both the user's call.
- [?] **Prev/next is now topic reading order** — entry → its first lesson, last lesson → next entry. Cross-topic paging does *not* happen: the first entry of a topic still has no Previous and the last entry no Next. Say so if paging should continue into the neighbouring topic.
- [?] **The sticky header's hide/reveal is NOT visually verified.** The CSS and JS are in place and type-check, but whether the scroll *feels* right needs a real browser. This is the one item in the round most likely to need a tweak.
- [?] **`/entries/` is now 177 bordered cards.** That is a large visual change at that scale. If it reads as noise, the fallback is to keep those rows flat inside a bordered **group** card — a revert of the `EntryFilter.astro` half only.
- [?] **Lighthouse has not been re-run** since the shell work began. The navigation and layout changed twice since the last measurement.
- [?] **No focus trap and no backdrop** on the menu — deliberate, so the burger stays clickable. A keyboard user can Tab out of the panel.
- [?] **`Footer.astro` still takes a `path` prop it has never used**, passed by 14 call sites. Dead before this session; removing it means editing all 14.
- [?] **Four `TODO: confirm` lines remain visible** on `/about` + `/ru/about` and `/privacy` + `/ru/privacy`.
- [?] **The favicon is a declared SVG only** — no `/favicon.ico` fallback is shipped. Browsers and Lighthouse use the declared link, so the 404 is gone; a very old client that ignores `<link rel="icon">` would still get a 404.
- [?] **The rules index is over its 11 KB / 100-line budget** (now 28 KB / 107 lines) and this round added two more constraints to it. The overflow is almost entirely `## Active Constraints`, which must not move to a chunk — so the fix is to move *reference detail* (the Astro/Sätteri/Fonts/Shiki/Pagefind wiring in `## Tech Stack`, the page census) into a chunk, and that decision is the user's.
- [?] `astro/README.md`'s `## Verified` section predates the deploy and both style rounds.

## Next Steps
1. Commit the favicon + prev/next round, then redeploy if the user wants the live site current.
2. Look at the sticky header, the focus rings and `/entries/` in a browser; adjust or veto (the header's hide/reveal is still not visually verified).
3. Re-run Lighthouse (the Windows `EPERM` workaround is in `astro/README.md`; never run it unprompted).
4. Resolve the four `TODO: confirm` lines.
5. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files.
6. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.
7. **(New, corpus-wide) Content refactor — cut the water, lead with the example.** The lessons explain a concept in an abstract paragraph before any concrete case, and the paragraph often teaches nothing. Two shapes the user flagged on the first read: **(a) hot air that sounds authoritative** — "Most performance work that is not a network call comes down to a data structure chosen early and never revisited. A list scanned inside a loop is quadratic and looks harmless." and "The difference is not academic… Getting this wrong produces code that is functionally correct and mysteriously slow."; **(b) a definition where a worked example belongs** — "An array stores elements side by side in one block of memory and finds the nth one by arithmetic" should *show* that, immediately. The array / linked-list / hash-map comparison is the model to copy: **one numbered visual block per structure, simple wording, a concrete example in each, then one line** ("these three are the base of everything"). Rule of thumb: simple words + a small visual + a concrete number beats a clever sentence every time. Affects both roots, so every RU file touched needs `--lang ru` re-validation and the Plan C diff rules (`check-ru-style.mjs --diff` does not check `###` headings — use the `git diff -U0` grep). Decide first whether this runs before or after the paused Plan C, since both rewrite the same Russian files.

## Key Decisions
- **Prev/next follows one flat reading order per topic** — `graph.ts`'s `prevNextInOrder(id)` builds `entriesOfTopic(topic).flatMap((e) => [e, ...childrenOf(e)])`, replacing the separate `prevNextInEntry` and `prevNextInTopic`. Two rules fall out of it: an entry page leads into its **first lesson**, and the **last lesson of an entry leads into the next entry**. Entry pages previously paged entry→entry, which skipped their own lessons.
- **The focus ring moved onto the card's `::after` overlay** rather than `:focus-within` on the card. `:focus-within` fires on mouse clicks too, so it would flash a ring on every click; drawing the ring on the overlay keeps it keyboard-only and outlines the whole card.
- **Entry rows became cards** (`border` + `radius` + `gap`, hairlines deleted) so the topic grid, topic lists and `/entries/` share one card language. Accepted cost: `/entries/` is visually much taller.
- **The header hides on the way down and returns on the smallest upward scroll** — a 200px floor before it may hide, a 4px delta so sub-pixel jitter cannot flicker it, and it never hides while its own menu is open.
- **The footer dropped its 8 topic links.** They were the third copy of the same list (burger, home cards, footer); the footer now carries About + Privacy + rights + credit. Known trade-off: fewer internal links into the topic pages.
- **One `--sticky-offset` token** serves both the ToC's sticky top and the heading `scroll-margin-top`, so the header height is stated once.

## File Map
**Uncommitted (this round, 5 paths):**
- `astro/public/favicon.svg` — NEW — blue rounded square with a white "2" as a stroked path; declared in the head.
- `astro/src/layouts/BaseLayout.astro` — MODIFY — `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` after the viewport meta.
- `astro/src/lib/graph.ts` — MODIFY — `prevNextInEntry` and `prevNextInTopic` **deleted**, replaced by one `prevNextInOrder(id)` = `entriesOfTopic(topic).flatMap((e) => [e, ...childrenOf(e)])`.
- `astro/src/pages/[...path].astro`, `astro/src/pages/ru/[...path].astro` — MODIFY — `navPair` is now just `prevNextInOrder(id)`; the `isEntryPage`/`isTopic`/`isExamples` ternary is gone.
- `.pi/CONTEXT.md`, `.pi/project-rules-memory.md`, `.pi/memory/lessons.md` — this wrap-up.

**Committed earlier this session** (`d4b97bb` and the four commits before it):
- `astro/src/components/Header.astro` — sticky + opaque + `z-index: 40`, `is-hidden` transform, scroll direction handler with a `menuOpen` guard.
- `astro/src/components/NavDrawer.astro` — link rows with hover background and an inset accent bar on `aria-current="page"`.
- `astro/src/components/EntryList.astro` — rows are cards; `entry-head` row; tier pill; hover, overlay and overlay focus ring.
- `astro/src/components/EntryFilter.astro` — `/entries/` rows: card language, overlay, hover, overlay focus ring.
- `astro/src/components/Footer.astro` — topic links replaced by About + Privacy; `.footer-links` replaces `.footer-topics` and `.footer-heading`; credit WCAG comment preserved.
- `astro/src/pages/index.astro`, `astro/src/pages/ru/index.astro` — card hover, overlay focus ring, `topic-head` with the count pill.
- `astro/src/styles/global.css` — `--content-max`, `--sticky-offset`, `body` flex column, `scroll-margin-top` on `.prose h2/h3/h4`.
- `astro/src/lib/dictionary.ts` — `homeTitle` added; `consentPrivacy` and `footerTopics` removed; both blocks edited together.
- `astro/src/components/ConsentBanner.astro`, `astro/astro.config.mjs` — earlier still, deployed with `2793d52`.

Everything else in `astro/` is from Plan D and untouched.
- `.tmp/` scratch, safe to delete: `check-chain.mjs` (walks a topic's emitted prev/next chain), `chunk-table.sh`, `entry.md`, `check-*.mjs`, `verify-*.mjs`, `kill-9333.mjs`, `commit-*.txt`, `create-2learn.log`, `live*.html`, `lighthouserc.port.json`.

## Gotchas / Warnings
- **An undefined CSS custom property is a silent no-op, and `astro check` cannot see it.** A batch of edits was partly rejected, so `scroll-margin-top: var(--sticky-offset)` landed while `--sticky-offset` did not exist. Nothing failed; the rule just did nothing. When a change spans a token and its consumers, verify **both** landed.
- **Re-read a file after editing it, especially near a `/* why */` comment.** An edit whose `oldText` was a comment and whose `newText` omitted it deleted the WCAG note above the footer credit and left a duplicate rule. Both slips this session were the same shape: correct new text, wrong old text.
- **Verify built CSS with the scope attribute stripped — and the same trap catches HTML.** Astro stamps `data-astro-cid-*` on **every** compound selector, so `.entry-group[…] li[…] a[…]:after` is the real shape. My first checker reported 8 false failures against CSS that was correct — and stripping all `"` characters while normalising broke `content:""` too. The round after, the *same* attribute silently defeated a regex for the emitted `<a class="prev-next-link" rel="next">`, because Astro puts it **between** `rel="next"` and the `<span>`s. Strip ` data-astro-cid-\w+` before matching emitted HTML, not just CSS.
- **The consent banner must stay the last child of `<body>`**, or `position: sticky; bottom: 0` stops riding the viewport bottom.
- **The menu panel is absolutely positioned inside `.bar`** and `.bar` must keep `position: relative`; the header carries `z-index: 40` so the menu inside it still paints above the banner (20) and the scroll-to-top button (auto).
- **The header must never hide while the menu is open** — the menu is inside it.
- **Lighthouse on Windows needs the port-9333 workaround**; the plain command dies with `EPERM` after finishing the audit.
- **A `.pages.dev` name is free iff its DNS returns NXDOMAIN**, and `wrangler pages project create` needs `--force` exactly once on 4.151.1.
- **The shell work is still not deployed.** `https://2learn.pages.dev` serves `2793d52` — the style round (`d4b97bb`) and this favicon/nav round are both ahead of it.
- **`.tmp/` is scratch**; none of the evidence above lives there.
