# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site built over it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D is in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-17

## Current Task
The site is **live in production at https://2learn.pages.dev** (deployment `ba088794`, commit `2793d52`). Everything since — the style round, the favicon, the prev/next rewrite — is **committed locally** (`d4b97bb`, `4b9bbe7`, `8d8407d`); `origin/main` sits at `d4b97bb`, so the last two are unpushed. **The deployment is behind all of it: `wrangler pages deploy` is a separate step from `git push`.**

**A content-round is UNCOMMITTED**: `lessons/AUTHORING.md` (the new §9 rule, and every word band losing its ceiling), `tools/validate-content.mjs`, `tools/check-ru-style.mjs`, and the first refactored lesson.

**The Russian prose recast (Plan C) is still PAUSED at 550 of 698 files.** Resume at Phase 7 / WP-58 (`06-cloud-devops`). Both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Turned `ponytail` off for this repository** — it was the installed cause of the compressed, teaching-nothing prose, and the user diagnosed that themselves. Its mode is global-only (no per-project setting exists), so the opt-out is `.pi/APPEND_SYSTEM.md` (project instructions appended to the system prompt) plus an `## Active Constraints` entry.
- [x] **Made `AUTHORING.md` §9 checkable** — every symbol, abbreviation and number must be defined and given a value in the same block; a formula must be a **substitution** of those definitions; renaming to a plainer synonym is not explaining. The "delete any filler sentence" rule now says it never licenses deleting the explaining sentence — it was the rule that rewarded deleting explanation and keeping assertion.
- [x] **Removed the word-count ceilings** from the contract and from both gates — all five bands are **floors** now (`full` 450+, `landing` 200+, `area` 120+, examples 120+; `ru` 400+/180+/100+/100+). **Proved end-to-end**, not by reading the diff: the test lesson padded to 1039 words validates clean, where 951 was a `[V5]` error an hour earlier.
- [x] **Rewrote the first lesson from a fresh start** (`01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps.md`, now 1890 words) after the user's review of the live page: it still explained by assertion. The fresh version is beginner-first §9 throughout — memory/byte/address defined with values before anything uses them, `start`/`index`/`size` each defined before the substitution, `length`/`capacity`/allocating defined before the doubling trace, node/collision/remainder defined with the arithmetic shown (510 − 63×8 = 6), and a costs table where every number is grounded. Also removed the sidecar's undefined `O(n)`/`O(1)` (Big-O is the *next* lesson, linked from Go deeper), replacing them with the same claims as numbers. Gates: both roots strict-green, RU root byte-clean. **The Russian twin is still the old prose** and stays frozen against the `--diff` baseline — folding it in needs the pending re-baseline/Plan C decision.
- [x] **Earlier:** created the Pages project, set `SITE`, deployed; the burger-menu shell; the eight style changes (cards, focus rings, drawer rows, footer cut to About + Privacy, sticky header); the favicon; prev/next as one flat reading order. All in `.pi/memory/lessons.md`.

## In Progress
- Nothing is mid-file. The content round (contract + both gates + one lesson and its sidecar) is **uncommitted**, both root gates green, `--diff` at 0 structural differences.

## Blocked / Needs Decision
- [?] **The content round is uncommitted, and the deployment is behind everything since `2793d52`.** Committing and deploying are the user's call.
- [?] **The sidecar-examples rule lost its justification.** "Worked examples live in sidecar files, never in a lesson body" was argued *from* the 950-word ceiling — any added line failed V5. That argument died with the ceilings on 2026-10-17. The rule still stands as a **shape** rule (§12, V15/V16) and the rules index now says exactly that — but whether a lesson body may now carry its own worked example is an open decision, not one to make silently.
- [?] **The ceilings came off `landing`, `area` and `examples` too**, extrapolating from "no ceiling as long as content works". Veto any of those and the bound goes back into `WORDS`/`examplesWords`/`BANDS`.
- [?] **`AUTHORING.md` §9 is now the standard, and it is retroactive.** Every existing lesson predates it — the "confident sentence with no number" defect is corpus-wide, not confined to the one file refactored today. Nothing in `tools/` can detect it, so the only check is a human reading the page.
- [?] **The Russian twin of the refactored lesson is untouched** and cannot take the new block without a decision: `check-ru-style.mjs --diff` freezes fences byte-for-byte against `BASELINE = b713de1d`, so adding one is a `[D3]` failure until the baseline is re-cut (a `tools/**` change) or the work folds into Plan C before re-baselining.
- [?] **Prev/next is topic reading order** — the first entry of a topic has no Previous and the last entry no Next. Cross-topic paging needs a decision.
- [?] **The sticky header's hide/reveal is NOT visually verified.** It needs a real browser; the one item most likely to need a tweak.
- [?] **`/entries/` is now 177 bordered cards.** If it reads as noise, the fallback is flat rows inside one bordered group — a revert of the `EntryFilter.astro` half only.
- [?] **Lighthouse has not been re-run** since the shell work began.
- [?] **No focus trap and no backdrop** on the menu — deliberate, so the burger stays clickable.
- [?] **`Footer.astro` still takes a `path` prop it has never used**, passed by 14 call sites.
- [?] **Four `TODO: confirm` lines remain** on `/about` + `/ru/about` and `/privacy` + `/ru/privacy`.
- [?] **The rules index is still over its 11 KB / 100-line budget** (~28 KB / 116 lines), and this round added two lines to it. The overflow is almost entirely `## Active Constraints`, which must not move to a chunk — so the fix is to move *reference detail* (the Astro/Sätteri/Fonts/Shiki/Pagefind wiring, the page census) into a chunk. The user's call.
- [?] `astro/README.md`'s `## Verified` section predates the deploy and both style rounds.

## Next Steps
1. **Decide the content refactor's scope and order** — how aggressive, whether the sidecar rule changes, whether it runs before or after the paused Plan C, and how the RU baseline gets re-cut. The standard is now written down (`AUTHORING.md` §9), so this is a scheduling decision, not a definition one.
2. Commit the content round (contract + gates + the one refactored lesson).
3. Look at the sticky header, the focus rings and `/entries/` in a browser; adjust or veto.
4. Re-run Lighthouse (the Windows `EPERM` workaround is in `astro/README.md`; never run it unprompted).
5. Resolve the four `TODO: confirm` lines.
6. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files.
7. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.

## Key Decisions
- **The content refactor's standard lives in `AUTHORING.md` §9, not in a batch brief.** Every symbol, abbreviation and number is defined and valued in the same block; a formula is a substitution of those definitions; a claim with no number and no example is a defect; renaming to a plainer synonym is not explaining. Stated as a rule so a batch writer inherits it rather than re-deriving it — and so it is a document, not my taste.
- **All word bands are floors, with no ceiling** (`full` 450+, `landing` 200+, `area` 120+, examples 120+). The old 950 ceiling forced the deletion of exactly the sentence that explains something, because that is the cheapest prose to cut. A body now ends when the explanation is complete.
- **`ponytail` is off in this repository** via `.pi/APPEND_SYSTEM.md`, because its own configuration is global-only and this repository's product is prose, where "the shortest diff wins" is the wrong instinct.
- **Prev/next follows one flat reading order per topic** — `graph.ts`'s `prevNextInOrder(id)` builds `entriesOfTopic(topic).flatMap((e) => [e, ...childrenOf(e)])`. An entry page leads into its **first lesson**; the **last lesson of an entry** leads into the next entry. Entry pages previously paged entry→entry, which skipped their own lessons.
- **The focus ring moved onto the card's `::after` overlay** rather than `:focus-within` on the card. `:focus-within` fires on mouse clicks too, so it would flash a ring on every click; drawing the ring on the overlay keeps it keyboard-only and outlines the whole card.
- **Entry rows became cards** (`border` + `radius` + `gap`, hairlines deleted) so the topic grid, topic lists and `/entries/` share one card language. Accepted cost: `/entries/` is visually much taller.
- **The header hides on the way down and returns on the smallest upward scroll** — a 200px floor before it may hide, a 4px delta so sub-pixel jitter cannot flicker it, and it never hides while its own menu is open.
- **The footer dropped its 8 topic links.** They were the third copy of the same list (burger, home cards, footer); the footer now carries About + Privacy + rights + credit. Known trade-off: fewer internal links into the topic pages.
- **One `--sticky-offset` token** serves both the ToC's sticky top and the heading `scroll-margin-top`, so the header height is stated once.

## File Map
**Uncommitted — the content round (this session):**
- `lessons/AUTHORING.md` — MODIFY — §9 gained the define-every-number rule; §4, §12, §13, §14 all restate the bands as floors.
- `tools/validate-content.mjs` — MODIFY — `WORDS` and `examplesWords` take `Infinity` as the upper bound; one `band()` formatter renders `450+` in the V5/V15 messages.
- `tools/check-ru-style.mjs` — MODIFY — `BANDS` likewise; `[D8]` uses `band()`.
- `lessons/01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps.md` — MODIFY — the first lesson written **from a fresh start** against §9 (938 words after the earlier trim, then fully rewritten to **1890**).
- `lessons/01-cs-fundamentals/02-data-structures/examples.01-arrays-lists-and-hash-maps.md` — MODIFY — the sidecar's undefined `O(n)` / `O(1)` replaced by the same claims as numbers.
- `.pi/APPEND_SYSTEM.md` — NEW — the project-level "ponytail is off here" instruction.
- `.pi/CONTEXT.md`, `.pi/project-rules-memory.md`, `.pi/memory/content-rules.md`, `.pi/memory/lessons.md` — this wrap-up.

**Committed this session** (`d4b97bb`, then `7440124`, `4b9bbe7`, `8d8407d`): the eleven style-round files; the session context; `astro/public/favicon.svg` + `astro/src/layouts/BaseLayout.astro`; `astro/src/lib/graph.ts` + both `[...path].astro`.

Everything else in `astro/` is from Plan D and untouched.
- `.tmp/` scratch, safe to delete: `check-chain.mjs` (walks a topic's emitted prev/next chain), `wordcount.mjs` (V5-style count + heading list), `probe-ceiling.sh` (the 1039-word proof), `lesson-backup.md`, `chunk-table.sh`, `entry.md`, `check-*.mjs`, `verify-*.mjs`, `kill-9333.mjs`, `commit-*.txt`, `create-2learn.log`, `live*.html`, `lighthouserc.port.json`.

## Gotchas / Warnings
- **A review URL is not a file path, and the served page is not always the working tree.** The user's URL `/01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps/` resolves to the **flat child file** `lessons/01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps.md` — the topic directory's own `index.md` is the landing page. And because production still serves `2793d52`, the text a reviewer quotes can come from an older commit: the sentence they flagged as "mysteriously slow" existed in `git show HEAD:<path>` but not in the working copy. Check `HEAD` before assuming the working copy is what they read.
- **The §9 defect reaches the sidecar files too.** `examples.01-arrays-lists-and-hash-maps.md` answered with `O(n)` / `O(1)` — shorthand a beginner has not been given, and Big-O is the **next** lesson, linked from this one's Go deeper. A sidecar is prose a beginner reads; "a claim with no number and no example" applies there exactly as it does in a body.
- **A term is explained only when it carries a value in the same block as the arithmetic that uses it.** Renaming to a plainer synonym explains nothing. Four rounds of "fixes" to one paragraph failed on this before the user named it — and it is now `AUTHORING.md` §9, so it applies to every existing lesson, not just the refactored one. **No tool in `tools/` can detect it.** The test is the reader's question: if a sentence makes them ask "what is that?", it is wrong however confident it sounds.
- **`ponytail` has no per-project mode.** Its level resolves from `PONYTAIL_DEFAULT_MODE` or `%APPDATA%\ponytail\config.json` only — nothing reads the working directory. So a project's opt-out is `.pi/APPEND_SYSTEM.md` (pi appends project instructions to the system prompt, and the project file takes precedence over the agent directory); a root `AGENTS.md` also works, since pi loads context files from the working directory and below.
- **An undefined CSS custom property is a silent no-op, and `astro check` cannot see it.** A batch of edits was partly rejected, so `scroll-margin-top: var(--sticky-offset)` landed while `--sticky-offset` did not exist. Nothing failed; the rule just did nothing. When a change spans a token and its consumers, verify **both** landed.
- **Re-read a file after editing it, especially near a `/* why */` comment.** An edit whose `oldText` was a comment and whose `newText` omitted it deleted the WCAG note above the footer credit and left a duplicate rule. Both slips this session were the same shape: correct new text, wrong old text.
- **Verify built CSS with the scope attribute stripped — and the same trap catches HTML.** Astro stamps `data-astro-cid-*` on **every** compound selector, so `.entry-group[…] li[…] a[…]:after` is the real shape. My first checker reported 8 false failures against CSS that was correct — and stripping all `"` characters while normalising broke `content:""` too. The round after, the *same* attribute silently defeated a regex for the emitted `<a class="prev-next-link" rel="next">`, because Astro puts it **between** `rel="next"` and the `<span>`s. Strip ` data-astro-cid-\w+` before matching emitted HTML, not just CSS.
- **The consent banner must stay the last child of `<body>`**, or `position: sticky; bottom: 0` stops riding the viewport bottom.
- **The menu panel is absolutely positioned inside `.bar`** and `.bar` must keep `position: relative`; the header carries `z-index: 40` so the menu inside it still paints above the banner (20) and the scroll-to-top button (auto).
- **The header must never hide while the menu is open** — the menu is inside it.
- **Lighthouse on Windows needs the port-9333 workaround**; the plain command dies with `EPERM` after finishing the audit.
- **A `.pages.dev` name is free iff its DNS returns NXDOMAIN**, and `wrangler pages project create` needs `--force` exactly once on 4.151.1.
- **The shell work is still not deployed.** `https://2learn.pages.dev` serves `2793d52`; the style round, the favicon and prev/next are all committed ahead of it but undeployed. `git push` and `wrangler pages deploy` are independent — `origin/main` is at `d4b97bb`, so the deployment is the thing that is behind.
- **`.tmp/` is scratch**; none of the evidence above lives there.
