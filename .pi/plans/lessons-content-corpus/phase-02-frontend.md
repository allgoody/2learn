# Phase 2: Frontend (31 entries, 77 files)

## Objective

Write every `frontend` entry. This is the first bulk phase and the largest single
topic (77 files, ~54,000 words), so it also proves that the Phase 1 pattern scales:
five batches, each one seed section or half of one, each verified by the validator
before the next begins. `frontend/react` is already written (WP-5) and counts toward
the topic's coverage.

## Prerequisites

- Phase 1 complete: `lessons/AUTHORING.md`, `tools/inventory.json`,
  `tools/validate-content.mjs` exist
- **Phase 1 user review gate answered** — do not start until the user has replied to
  the three questions at the end of `phase-01-foundation-pilot.md`
- `node tools/validate-content.mjs` exits 0 with `3 present, 174 pending, 0 error(s)`

## Shared Context

Read `lessons/AUTHORING.md` first — it is the contract. Read
`lessons/frontend/react/index.md` and `lessons/frontend/react/01-rendering-and-jsx.md`
as the shape reference for a landing page and a full lesson, and
`lessons/cs-fundamentals/pseudocode/index.md` as the reference for a `small` entry.

Source: `seed/frontend.md` (read-only). Its `## Core web platform`,
`## Frameworks & libraries`, `## Build & delivery` and `## Umbrella terms` sections are
the source lines for every entry below. Titles, tiers and prereqs come from
`tools/inventory.json` — never re-derive them.

Coverage for this topic: 31 entries = 1 already written (`react`) + 30 written here.
After each WP the validator's frontend counts must match the expected line below.

## Work Packages

### WP-7: Core web platform — structure, styling and accessibility

**Context:**
Six entries from `seed/frontend.md`, section `## Core web platform`, plus the section's
umbrella entry. Tier and prereqs per `tools/inventory.json`:
`frontend/html` (small, no prereqs), `frontend/css` (large, prereq `frontend/html`),
`frontend/html-and-css` (area), `frontend/responsive-web-design` (medium, prereq
`frontend/css`), `frontend/accessibility-wcag-a11y` (medium, prereqs `frontend/html`,
`frontend/css`), `frontend/ui-components` (medium, prereqs `frontend/html`,
`frontend/css`). `frontend/css` is a `large` entry, so it needs 4 child lessons;
the three `medium` entries need 2 each. The area page has no children.

**Task:**
Create these 16 files:

- `lessons/frontend/html/index.md` — full lesson (small)
- `lessons/frontend/css/index.md` — track landing (large) + 4 children
  `lessons/frontend/css/01-*.md` … `04-*.md` (full lessons)
- `lessons/frontend/html-and-css/index.md` — area page
- `lessons/frontend/responsive-web-design/index.md` — track landing (medium) + 2
  children `01-*.md`, `02-*.md`
- `lessons/frontend/accessibility-wcag-a11y/index.md` — track landing + 2 children
- `lessons/frontend/ui-components/index.md` — track landing + 2 children

**Files:**
- `lessons/frontend/html/index.md` — CREATE — small entry, 6-section body
- `lessons/frontend/css/index.md` — CREATE — landing (5 sections, 200-400 words)
- `lessons/frontend/css/01-*.md`, `02-*.md`, `03-*.md`, `04-*.md` — CREATE — 4 full
  lessons; names derive from the four child topics, per spec §6
- `lessons/frontend/html-and-css/index.md` — CREATE — area page (4 sections)
- `lessons/frontend/responsive-web-design/index.md` — CREATE — landing + 2 children
- `lessons/frontend/responsive-web-design/01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/accessibility-wcag-a11y/index.md` — CREATE — landing + 2 children
- `lessons/frontend/accessibility-wcag-a11y/01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/ui-components/index.md` — CREATE — landing + 2 children
- `lessons/frontend/ui-components/01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: follow `lessons/AUTHORING.md` exactly, including the `Done when:` and
  `; fix:` patterns the validator matches
- DO: make the CSS track cover the cascade and box model, layout (flexbox and grid),
  responsive technique, and modern CSS features — one child each, in that order
- DO: name `frontend/css`'s children in the index's `## In this track` list before
  writing them, and keep the numbering contiguous from `01`
- DO: give `html-and-css` the aliases `["HTML", "CSS"]` and a `## Included skills` list
  naming `frontend/html` and `frontend/css` only
- DO: use `accessibility-wcag-a11y`'s inventory aliases `["WCAG", "a11y"]`
- DO NOT: put `frontend/react` or any framework in this batch — that is WP-9
- DO NOT: duplicate the accessibility material inside `html` or `ui-components`; link
  to it as `related` instead
- DO NOT: include any external URL, including `w3.org` or `mdn`

**Success:**
- [ ] 16 files created: `find lessons/frontend -name '*.md' | wc -l` → `21` (16 new + 5 from `react`)
- [ ] Validator: `node tools/validate-content.mjs --topic frontend` → `7 present, 24 pending, 0 error(s)`
- [ ] `css` track has 4 children: `ls lessons/frontend/css/ | wc -l` → `5`
- [ ] Each `medium` entry in this batch has 2 children: `for d in responsive-web-design accessibility-wcag-a11y ui-components; do ls lessons/frontend/$d | wc -l; done` → `3` three times
- [ ] No external URL: `grep -rcE 'https?://' lessons/frontend/ | grep -v ':0'` → no output

---

### WP-8: Core web platform — language

**Context:**
Four more entries from `## Core web platform` in `seed/frontend.md`, per
`tools/inventory.json`: `frontend/javascript` (large, prereq `frontend/html`),
`frontend/typescript` (large, prereq `frontend/javascript`), `frontend/ajax` (small,
prereq `frontend/javascript`), `frontend/browser-compatibility` (small, prereqs
`frontend/html`, `frontend/css`, `frontend/javascript`). Both `large` entries take 4
children. This batch defines the language layer every later phase's prereqs point at,
so it carries more cross-topic weight than its size suggests.

**Task:**
Create these 12 files:

- `lessons/frontend/javascript/index.md` — track landing (large) + 4 children
- `lessons/frontend/typescript/index.md` — track landing (large) + 4 children
- `lessons/frontend/ajax/index.md` — full lesson (small)
- `lessons/frontend/browser-compatibility/index.md` — full lesson (small)

**Files:**
- `lessons/frontend/javascript/index.md` — CREATE — landing
- `lessons/frontend/javascript/01-*.md` … `04-*.md` — CREATE — 4 full lessons
- `lessons/frontend/typescript/index.md` — CREATE — landing
- `lessons/frontend/typescript/01-*.md` … `04-*.md` — CREATE — 4 full lessons
- `lessons/frontend/ajax/index.md` — CREATE — full lesson
- `lessons/frontend/browser-compatibility/index.md` — CREATE — full lesson

**Constraints:**
- DO: make the JavaScript track cover syntax and semantics, the DOM and events,
  asynchronous JavaScript, and modules and tooling — one child each, in that order
- DO: make the TypeScript track cover the type system basics, narrowing and unions,
  generics, and configuration plus migration — one child each, in that order
- DO: give `javascript` the aliases `["JavaScript"]` and `ajax` the aliases `["AJAX"]`
  from the inventory — the source file uses lowercase "Javascript", which stays as the
  `title`
- DO: write `ajax` as the historical technique and its modern successor (`fetch`),
  not as a library survey
- DO NOT: teach React or any framework here — frameworks are WP-9
- DO NOT: include any external URL, including `developer.mozilla.org`

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic frontend` → `11 present, 20 pending, 0 error(s)`
- [ ] Both large tracks have 4 children: `ls lessons/frontend/javascript lessons/frontend/typescript | grep -c '^[0-9][0-9]-'` → `8`
- [ ] Each `## Go deeper` in this batch names at least one TypeScript entry for the
  JavaScript track and vice versa: `grep -l 'frontend/typescript' lessons/frontend/javascript/*.md | wc -l` → ≥ `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/frontend/ | grep -v ':0'` → no output

---

### WP-9: Frameworks and libraries — part 1

**Context:**
Three entries from `seed/frontend.md`, section `## Frameworks & libraries`, per
`tools/inventory.json`: `frontend/vuejs` (medium, prereq `frontend/javascript`, alias
`Vue`), `frontend/angular` (medium, prereq `frontend/typescript`),
`frontend/state-management` (medium, prereq `frontend/javascript`). Three `medium`
entries → 2 children each. `frontend/react` is already written in WP-5 and must not be
touched — but it is the pattern to copy for a framework track, including its tone
("the largest ecosystem and job market" is context, not a sales pitch).

**Task:**
Create these 9 files:

- `lessons/frontend/vuejs/index.md` — track landing (medium) + 2 children
- `lessons/frontend/angular/index.md` — track landing (medium) + 2 children
- `lessons/frontend/state-management/index.md` — track landing (medium) + 2 children

**Files:**
- `lessons/frontend/vuejs/index.md` — CREATE — landing
- `lessons/frontend/vuejs/01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/angular/index.md` — CREATE — landing
- `lessons/frontend/angular/01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/state-management/index.md` — CREATE — landing
- `lessons/frontend/state-management/01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: write `state-management` framework-agnostically — local versus shared state,
  and the trade-off between a store, context and server state; name Redux, Zustand
  and signals as examples rather than teaching one
- DO: keep `vuejs` and `angular` at the level of "what it is and how its model
  differs", not a full API tour — the seed lines are one sentence
- DO: add `frontend/vuejs` and `frontend/angular` to `frontend/react`'s `related` list
  only if the list is currently empty; otherwise leave `react` untouched
- DO NOT: modify `lessons/frontend/react/**` — it passed the Phase 1 review gate
- DO NOT: rank the three frameworks as "best" — job market and ecosystem facts only
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic frontend` → `14 present, 17 pending, 0 error(s)`
- [ ] Three tracks with 2 children each: `ls lessons/frontend/vuejs lessons/frontend/angular lessons/frontend/state-management | grep -c '^[0-9][0-9]-'` → `6`
- [ ] `react` untouched: `git status --short lessons/frontend/react` → no output
- [ ] No external URL: `grep -rcE 'https?://' lessons/frontend/ | grep -v ':0'` → no output

---

### WP-10: Frameworks and libraries — part 2

**Context:**
The remaining seven entries from `## Frameworks & libraries` in `seed/frontend.md`,
per `tools/inventory.json`: `frontend/tailwind-css` (medium, prereq `frontend/css`),
`frontend/bootstrap` (small, prereq `frontend/css`), `frontend/sass` (small, prereq
`frontend/css`, alias `SCSS`), `frontend/motion-design` (medium, prereq
`frontend/css`), `frontend/svg-icon-systems` (medium, prereqs `frontend/html`,
`frontend/css`), `frontend/web-typography` (medium, prereq `frontend/css`),
`frontend/responsive-images` (small, prereq `frontend/html`). Four `medium` entries →
2 children each; three small entries → no children.

**Task:**
Create these 15 files:

- `lessons/frontend/tailwind-css/index.md` + 2 children
- `lessons/frontend/bootstrap/index.md` — full lesson
- `lessons/frontend/sass/index.md` — full lesson
- `lessons/frontend/motion-design/index.md` + 2 children
- `lessons/frontend/svg-icon-systems/index.md` + 2 children
- `lessons/frontend/web-typography/index.md` + 2 children
- `lessons/frontend/responsive-images/index.md` — full lesson

**Files:**
- `lessons/frontend/tailwind-css/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/bootstrap/index.md` — CREATE
- `lessons/frontend/sass/index.md` — CREATE
- `lessons/frontend/motion-design/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/svg-icon-systems/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/web-typography/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/responsive-images/index.md` — CREATE

**Constraints:**
- DO: treat `bootstrap` honestly — the seed says "fast, recognisable, dated-looking";
  keep that judgement and explain when it still wins
- DO: make `motion-design` about purposeful motion that explains change, per the seed
  line, and include a reduced-motion accessibility note with a `related` link to
  `frontend/accessibility-wcag-a11y`
- DO: keep `svg-icon-systems` accessible-icon focused (labels, `aria-hidden`,
  sprite versus inline trade-offs)
- DO NOT: restate CSS basics inside `sass`, `tailwind-css` or `motion-design` — link to
  `frontend/css` children as prereqs instead
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic frontend` → `21 present, 10 pending, 0 error(s)`
- [ ] Four tracks with 2 children each: `ls lessons/frontend/{tailwind-css,motion-design,svg-icon-systems,web-typography} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] The three small entries have no children:
  `ls lessons/frontend/bootstrap lessons/frontend/sass lessons/frontend/responsive-images | grep -c '^[0-9][0-9]-'` → `0`
- [ ] No external URL: `grep -rcE 'https?://' lessons/frontend/ | grep -v ':0'` → no output

---

### WP-11: Build, delivery and the front-end umbrella

**Context:**
The last ten frontend entries: `## Build & delivery` (nine entries) and
`## Umbrella terms` (one) in `seed/frontend.md`, per `tools/inventory.json`:
`frontend/package-management-npm` (medium, no prereqs, alias `npm`),
`frontend/webpack` (small, prereqs `frontend/javascript`,
`frontend/package-management-npm`), `frontend/vite` (small, prereqs
`frontend/package-management-npm`), `frontend/seo` (medium, prereq `frontend/html`),
`frontend/generative-engine-optimization-geo` (small, prereq `frontend/seo`, alias
`GEO`), `frontend/progressive-web-apps-pwa` (medium, prereq `frontend/javascript`,
alias `PWA`), `frontend/web-performance-core-web-vitals` (medium, prereqs
`frontend/javascript`, `frontend/css`), `frontend/lighthouse` (small, prereq
`frontend/browser-devtools`), `frontend/browser-devtools` (medium, prereq
`frontend/javascript`), `frontend/front-end-web-development` (area). Four `medium`
entries → 2 children each; four small entries and one area → no children.

**Task:**
Create these 20 files:

- `lessons/frontend/package-management-npm/index.md` + 2 children
- `lessons/frontend/webpack/index.md` — full lesson
- `lessons/frontend/vite/index.md` — full lesson
- `lessons/frontend/seo/index.md` + 2 children
- `lessons/frontend/generative-engine-optimization-geo/index.md` — full lesson
- `lessons/frontend/progressive-web-apps-pwa/index.md` + 2 children
- `lessons/frontend/web-performance-core-web-vitals/index.md` + 2 children
- `lessons/frontend/lighthouse/index.md` — full lesson
- `lessons/frontend/browser-devtools/index.md` + 2 children
- `lessons/frontend/front-end-web-development/index.md` — area page

**Files:**
- `lessons/frontend/package-management-npm/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/webpack/index.md` — CREATE
- `lessons/frontend/vite/index.md` — CREATE
- `lessons/frontend/seo/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/generative-engine-optimization-geo/index.md` — CREATE
- `lessons/frontend/progressive-web-apps-pwa/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/web-performance-core-web-vitals/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/lighthouse/index.md` — CREATE
- `lessons/frontend/browser-devtools/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/frontend/front-end-web-development/index.md` — CREATE — area page

**Constraints:**
- DO: give `front-end-web-development` the alias `["Front-End Development"]` and a
  `## Included skills` list of the five sections' anchor entries —
  `frontend/javascript`, `frontend/css`, `frontend/react`, `frontend/accessibility-wcag-a11y`,
  `frontend/web-performance-core-web-vitals` — in a sensible reading order
- DO: write `lighthouse` as the tool plus how to read a report, and
  `web-performance-core-web-vitals` as the metrics themselves (LCP, INP, CLS,
  thresholds, causes) — keep them distinct, the seed flags them as different skills
- DO: present GEO as "being cited correctly by answer engines", per the seed line,
  and keep it honest about how much is knowable today
- DO: include a `prereqs` chain for the PWA track's children so the second child
  requires the first
- DO NOT: write tool installation recipes; focus on the concept and the first useful
  action
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic frontend` → `31 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/frontend -name '*.md' | wc -l` → `77`
- [ ] Four tracks with 2 children each: `ls lessons/frontend/{package-management-npm,seo,progressive-web-apps-pwa,web-performance-core-web-vitals,browser-devtools} | grep -c '^[0-9][0-9]-'` → `10`
- [ ] The area page has no children: `ls lessons/frontend/front-end-web-development | wc -l` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/frontend/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-7 through WP-11 are complete, run:

```bash
node tools/validate-content.mjs --topic frontend
node tools/validate-content.mjs
git status --short -- seed/
find lessons/frontend -name '*.md' | wc -l
```

- [ ] Topic is complete: `31 present, 0 pending, 0 error(s)` for `--topic frontend`
- [ ] Global run still exits 0 and reports `31 present, 146 pending, 0 error(s)`
- [ ] `seed/` untouched: `git status --short -- seed/` → no output
- [ ] 77 files under `lessons/frontend/`
- [ ] Manual spot-check: read one `medium` track and one `small` entry end to end
      (not the Phase 1 exemplars) and confirm they read like the same author
- [ ] Every `small` entry in the topic is 450-950 words; the validator's `[V5]` check
      reports nothing
