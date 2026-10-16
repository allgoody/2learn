# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus (English plus a full Russian mirror), and the public bilingual reading site built over it.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`; the long-form status of Plans A–D is in `.pi/memory/plan-a-b-c-history.md`.

Last updated: 2026-10-16

## Current Task
The site is **live in production at https://2learn.pages.dev**, deployed from commit `fff2326`. Since that deploy the shell has been reworked twice more — **clickable cards**, then a **burger-anchored menu with a RU/EN switch** — and that work is **built, `astro check` clean, and UNCOMMITTED**. The live site does not have it yet.

**Nothing is pushed**, and the live deploy is now one revision behind local `HEAD`.

**The Russian prose recast (Plan C) is still PAUSED at 550 of 698 files.** Resume at Phase 7 / WP-58 (`06-cloud-devops`). Nothing is mid-file, and both root gates stay green regardless of how much prose has been recast.

## Completed This Session
- [x] **Earlier:** created the `2learn` Pages project, set `SITE`, committed and deployed to production, verified live. (Entry in `.pi/memory/lessons.md`.)
- [x] **Made topic cards and entry rows clickable across their whole surface** — `index.astro`, `ru/index.astro`, `EntryList.astro` — with a link `::after` overlay (`inset: 0`) instead of JS, so the link text stays the accessible name and the cards stay a single link each.
- [x] **Anchored the menu under the burger** and made the **burger the toggle** (`☰` ⇄ `✕`, `aria-label` swapped). The `<dialog>` became a plain `<nav hidden>` panel positioned against `.bar`, so it opens where the button is at every width; the drawer's own close button is gone.
- [x] **Moved Escape, light dismiss and focus handling into `Header.astro`'s script** — the three things `showModal()` used to provide — and deleted `NavDrawer`'s script entirely (it is now markup + CSS).
- [x] **Restyled the language switch as a control**: a 44px bordered box showing the **target** locale's code (`RU`/`EN`), in a `.drawer-tools` row below a separator beside the theme toggle. Its `aria-label` repeats the visible code, so WCAG 2.5.3 holds on both locales.
- [x] **`astro check` caught a real type error**: `HTMLElement.hidden` is `boolean | "until-found"` in the current DOM types, so state is read back with `drawer.hasAttribute("hidden")` rather than the property.

## In Progress
- Nothing is mid-file. Five source files carry uncommitted, undeployed changes.

## Blocked / Needs Decision
- [?] **The five changed files are uncommitted, and the live site is a revision behind them.** Committing is the user's call; deploying needs the same explicit production confirmation as last time.
- [?] **The `/entries/` page rows are still NOT fully clickable.** They are bare `<li data-topic…>` rows rendered by `EntryFilter.astro`, not `entry-item`, so the overlay work never touched them. The user asked only for `li.entry-item`; this is the obvious follow-up.
- [?] **The cards have no hover or focus affordance** — clickable, but they still look like only the text is. One rule each (e.g. `border-color: var(--accent)` on hover) would fix it; not added because it was not asked for.
- [?] **Lighthouse has not been re-run since the shell work began.** The a11y and SEO gates were last measured on the pre-rework build. The menu change is exactly the kind of navigation work those gates cover, and the focus-trap/backdrop trade-off above is the main a11y question.
- [?] **No focus trap and no backdrop** on the menu — deliberate, since a trap needs JS and the user asked for the burger to stay clickable. A keyboard user can Tab out of the panel; it closes on Escape or an outside click.
- [?] **Four `TODO: confirm` lines remain visible** on `/about` + `/ru/about` (reuse and licensing) and `/privacy` + `/ru/privacy` (who is responsible, how to reach them).
- [?] **No favicon**, so the home route still loses 0.04 of best practices to one `/favicon.ico` 404.
- [?] **The rules index is over its 11 KB budget** (~22 KB / 102 lines); the overflow is almost entirely `## Active Constraints`, which must not move to a chunk.
- [?] `astro/README.md`'s `## Verified` section predates the shell rework and the deploy.

## Next Steps
1. Commit the five changed files, then redeploy if the user wants the live site current.
2. Re-run Lighthouse (the Windows `EPERM` workaround is in `astro/README.md`; do not run it unprompted).
3. Give the `/entries/` rows the same overlay treatment.
4. Resolve the four `TODO: confirm` lines; optionally add a favicon.
5. (Later) Resume Plan C at **Phase 7 / WP-58** — `06-cloud-devops`, 102 files.
6. (Later) Phase 8 — `07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit.

## Key Decisions
- **The menu is a disclosure panel, not a modal dialog.** The user wanted the burger itself to become the close button; a modal backdrop makes the burger unclickable, so `showModal()` had to go. Cost paid by hand: Escape, light dismiss, focus in on open, focus back on Escape. No focus trap, no dimming — the page stays interactive behind the menu.
- **The panel is positioned against `.bar`, not the viewport.** `top: calc(100% + 0.25rem); right: 1rem` opens it under the burger and keeps that alignment at every width, because `.bar` *is* the 1024px centred column. No measurement, no JS.
- **The language switch shows the target locale's code** (`RU` on the English site), as a bordered box the same shape as the theme toggle so it reads as a control rather than one more menu link.
- **Clickable cards use a link `::after` overlay, not JS or a wrapping `<a>`.** One rule per component, no markup change, and the link text remains the accessible name. Accepted cost: the card's other text is no longer mouse-selectable.
- **`SITE` stays the Pages URL.** Canonicals, hreflang, the sitemap, both feeds and `robots.txt` remain self-consistent at the URL the site serves.
- **The consent banner is `position: sticky`, not `fixed`** — see the rules index; it must stay the last child of `<body>`.

## File Map
Changed this session. Everything else in `astro/` is from Plan D and untouched.
- `astro/src/components/Header.astro` — MODIFY — burger carries both labels as data attributes and toggles `☰`/`✕`; its script owns open, close, Escape, light dismiss and focus; `.bar` is now `position: relative`.
- `astro/src/components/NavDrawer.astro` — MODIFY — `<dialog>` → `<nav hidden>` with no script left; absolute panel under the burger; new `.drawer-tools` row and `.lang-switch` pill.
- `astro/src/pages/index.astro`, `astro/src/pages/ru/index.astro` — MODIFY — `.topic-card` is `position: relative` and `.topic-link::after` covers it.
- `astro/src/components/EntryList.astro` — MODIFY — `.entry-item` gets the same overlay.
- `astro/astro.config.mjs` — MODIFY (earlier this session) — `SITE` = `https://2learn.pages.dev`; deployed.
- `astro/src/components/Footer.astro`, `ConsentBanner.astro`, `BaseLayout.astro`, `src/lib/dictionary.ts`, `src/styles/global.css` — MODIFY (earlier this session) — already deployed in `fff2326`.
- `.pi/CONTEXT.md`, `.pi/project-rules-memory.md`, `.pi/memory/lessons.md` — this wrap-up. **Uncommitted.**
- `.tmp/check-*.mjs`, `.tmp/chunk-table.mjs`, `.tmp/kill-9333.mjs`, `.tmp/commit-*.txt`, `.tmp/create-2learn.log`, `.tmp/probe-2learn.html`, `.tmp/live.html`, `.tmp/lighthouserc.port.json` — scratch, safe to delete.

## Gotchas / Warnings
- **`HTMLElement.hidden` is typed `boolean | "until-found"`**, so `const open = drawer.hidden` is `string | boolean` and `astro check` rejects it. Read the state off `hasAttribute("hidden")` instead.
- **The consent banner must stay the last child of `<body>`**, or `position: sticky; bottom: 0` stops riding the viewport bottom.
- **The menu panel is absolutely positioned inside `.bar`** and is the last child there, which is what puts it above the burger in paint order. It carries `z-index: 30` — above the consent banner (20) and the scroll-to-top button (auto). `.bar` must keep `position: relative`.
- **The header is not sticky**, so an open menu scrolls away with the page. That is normal dropdown behaviour, not a bug — but it is why the menu is not `position: fixed`.
- **An unknown `*.pages.dev` name returns NXDOMAIN while a real project resolves** (no wildcard) — that is how `2learn` was checked, with DNS only, never the Cloudflare API.
- **`wrangler pages project create` needs `--force` exactly once** on 4.151.1 (delegation to Workers-based Pages fails with `Missing entry-point`), and never again.
- **The shell work is not deployed.** `https://2learn.pages.dev` still serves commit `fff2326`, without the clickable cards or the new menu.
- **`.tmp/` is scratch**; none of the evidence above lives there.
