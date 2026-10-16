# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site built over it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D is in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-16

## Current Task
The site is **live in production at https://2learn.pages.dev** (deployment `ba088794`, commit `2793d52`). One more round of **style work is built, `astro check` clean, and UNCOMMITTED** — card hover and card-sized focus rings, `/entries/` rows made clickable, entry rows unified as cards, drawer link rows, the footer cut down to About + Privacy, and a **sticky header that hides on scroll down and returns on scroll up**.

**Nothing is pushed**, and the live site does not have this round.

**The Russian prose recast (Plan C) is still PAUSED at 550 of 698 files.** Resume at Phase 7 / WP-58 (`06-cloud-devops`). Nothing is mid-file, and both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Earlier:** created the Pages project, set `SITE`, committed and deployed; then clickable cards and the burger-anchored menu with its RU/EN switch, committed and deployed. (Both in `.pi/memory/lessons.md`.)
- [x] **Closed the eight holes the earlier changes opened or left** — card hover affordance, card-sized focus rings, clickable `/entries/` rows, entry rows unified as cards, drawer link rows with a current-page accent bar, the count/tier pill, the sticky reveal-on-scroll header, and the footer cut to About + Privacy.
- [x] **Fixed two knock-ons from making the header sticky that nothing else covered** — the lesson ToC would have slid under the bar, and a ToC jump would have landed its heading behind it. Both now hang off one new `--sticky-offset: 5rem` token.
- [x] **Repaired two of my own errors, neither caught by a gate** — see Gotchas. Both were found by re-reading the file, not by `astro check`.
- [x] **Verified the whole set in the built output** — every rule present in the emitted CSS, counts unchanged (8 topic cards, 31 rows on `/02-frontend/`, 177 on `/entries/`), `astro check` 0 errors, build green.

## In Progress
- Nothing is mid-file. Eleven source files carry uncommitted, undeployed changes.

## Blocked / Needs Decision
- [?] **Eleven changed files are uncommitted and the live site is behind them.** Committing and deploying are both the user's call.
- [?] **The sticky header's hide/reveal is NOT visually verified.** The CSS and JS are in place and type-check, but whether the scroll *feels* right needs a real browser. This is the one item in the round most likely to need a tweak.
- [?] **`/entries/` is now 177 bordered cards.** That is a large visual change at that scale. If it reads as noise, the fallback is to keep those rows flat inside a bordered **group** card — a revert of the `EntryFilter.astro` half only.
- [?] **Lighthouse has not been re-run** since the shell work began. The navigation and layout changed twice since the last measurement.
- [?] **No focus trap and no backdrop** on the menu — deliberate, so the burger stays clickable. A keyboard user can Tab out of the panel.
- [?] **`Footer.astro` still takes a `path` prop it has never used**, passed by 14 call sites. Dead before this session; removing it means editing all 14.
- [?] **Four `TODO: confirm` lines remain visible** on `/about` + `/ru/about` and `/privacy` + `/ru/privacy`.
- [?] **No favicon** (one `/favicon.ico` 404, 0.04 of best practices).
- [?] **The rules index is further over its 11 KB budget** (~24 KB / ~110 lines); the overflow is almost entirely `## Active Constraints`, which must not move to a chunk.
- [?] `astro/README.md`'s `## Verified` section predates the deploy and both style rounds.

## Next Steps
1. Look at the sticky header, the focus rings and `/entries/` in a browser; adjust or veto.
2. Commit the eleven files, then redeploy if the user wants the live site current.
3. Re-run Lighthouse (the Windows `EPERM` workaround is in `astro/README.md`; never run it unprompted).
4. Resolve the four `TODO: confirm` lines; optionally add a favicon.
5. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files.
6. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.

## Key Decisions
- **The focus ring moved onto the card's `::after` overlay** rather than `:focus-within` on the card. `:focus-within` fires on mouse clicks too, so it would flash a ring on every click; drawing the ring on the overlay keeps it keyboard-only and outlines the whole card.
- **Entry rows became cards** (`border` + `radius` + `gap`, hairlines deleted) so the topic grid, topic lists and `/entries/` share one card language. Accepted cost: `/entries/` is visually much taller.
- **The header hides on the way down and returns on the smallest upward scroll** — a 200px floor before it may hide, a 4px delta so sub-pixel jitter cannot flicker it, and it never hides while its own menu is open.
- **The footer dropped its 8 topic links.** They were the third copy of the same list (burger, home cards, footer); the footer now carries About + Privacy + rights + credit. Known trade-off: fewer internal links into the topic pages.
- **One `--sticky-offset` token** serves both the ToC's sticky top and the heading `scroll-margin-top`, so the header height is stated once.

## File Map
Changed this session. Everything else in `astro/` is from Plan D and untouched.
- `astro/src/components/Header.astro` — MODIFY — sticky + opaque + `z-index: 40`, `is-hidden` transform, scroll direction handler with a `menuOpen` guard.
- `astro/src/components/NavDrawer.astro` — MODIFY — link rows with hover background and an inset accent bar on `aria-current="page"`.
- `astro/src/components/EntryList.astro` — MODIFY — rows are cards; `entry-head` row; tier pill; hover, overlay and overlay focus ring.
- `astro/src/components/EntryFilter.astro` — MODIFY — `/entries/` rows: card language, overlay, hover, overlay focus ring.
- `astro/src/components/Footer.astro` — MODIFY — topic links replaced by About + Privacy; `.footer-links` replaces `.footer-topics` and `.footer-heading`; credit WCAG comment preserved.
- `astro/src/components/ConsentBanner.astro`, `astro/src/layouts/BaseLayout.astro` — MODIFY (earlier this session) — deployed.
- `astro/src/pages/index.astro`, `astro/src/pages/ru/index.astro` — MODIFY — card hover, overlay focus ring, `topic-head` with the count pill.
- `astro/src/pages/[...path].astro`, `astro/src/pages/ru/[...path].astro` — MODIFY — ToC sticky `top` uses `--sticky-offset`.
- `astro/src/styles/global.css` — MODIFY — `--content-max`, `--sticky-offset`, `body` flex column, `scroll-margin-top` on `.prose h2/h3/h4`.
- `astro/src/lib/dictionary.ts` — MODIFY — `homeTitle` added; `consentPrivacy` and `footerTopics` removed; both blocks edited together.
- `astro/astro.config.mjs` — MODIFY (earlier) — `SITE` = the Pages URL; deployed.
- `.pi/CONTEXT.md`, `.pi/project-rules-memory.md`, `.pi/memory/lessons.md` — this wrap-up. **Uncommitted.**
- `.tmp/check-*.mjs`, `.tmp/verify-*.mjs`, `.tmp/chunk-table.mjs`, `.tmp/kill-9333.mjs`, `.tmp/commit-*.txt`, `.tmp/create-2learn.log`, `.tmp/live*.html`, `.tmp/lighthouserc.port.json` — scratch, safe to delete.

## Gotchas / Warnings
- **An undefined CSS custom property is a silent no-op, and `astro check` cannot see it.** A batch of edits was partly rejected, so `scroll-margin-top: var(--sticky-offset)` landed while `--sticky-offset` did not exist. Nothing failed; the rule just did nothing. When a change spans a token and its consumers, verify **both** landed.
- **Re-read a file after editing it, especially near a `/* why */` comment.** An edit whose `oldText` was a comment and whose `newText` omitted it deleted the WCAG note above the footer credit and left a duplicate rule. Both slips this session were the same shape: correct new text, wrong old text.
- **Verify built CSS with the scope attribute stripped.** Astro stamps `data-astro-cid-*` on **every** compound selector, so `.entry-group[…] li[…] a[…]:after` is the real shape. My first checker reported 8 false failures against CSS that was correct — and stripping all `"` characters while normalising broke `content:""` too.
- **The consent banner must stay the last child of `<body>`**, or `position: sticky; bottom: 0` stops riding the viewport bottom.
- **The menu panel is absolutely positioned inside `.bar`** and `.bar` must keep `position: relative`; the header carries `z-index: 40` so the menu inside it still paints above the banner (20) and the scroll-to-top button (auto).
- **The header must never hide while the menu is open** — the menu is inside it.
- **Lighthouse on Windows needs the port-9333 workaround**; the plain command dies with `EPERM` after finishing the audit.
- **A `.pages.dev` name is free iff its DNS returns NXDOMAIN**, and `wrangler pages project create` needs `--force` exactly once on 4.151.1.
- **The shell work is not deployed.** `https://2learn.pages.dev` still serves `2793d52`, without this round of style changes.
- **`.tmp/` is scratch**; none of the evidence above lives there.
