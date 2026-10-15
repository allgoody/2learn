# Phase 3: 02-frontend

## Objective

Mirror `lessons/02-frontend/` into `lessons/ru/02-frontend/` — 133 files. This is the topic with the
most code, so it is also where the "translate the comments, keep the identifiers" rule is tested.

## Prerequisites

- Phase 2 complete: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` reports
  `0 error(s)` and `find lessons/ru/01-cs-fundamentals -name '*.md' | wc -l` is `108`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Code-specific additions for this topic:

- Framework and library names stay in Latin script: React, Vue, Angular, Tailwind CSS, Sass, Vite,
  webpack, TypeScript, Bootstrap, npm.
- Property names, CSS class names, HTML tag names, import paths and package names are never
  translated. Only comments and user-facing strings change.
- `text` diagrams that sketch a layout keep their alignment; translate the labels, keep the box
  characters and column widths readable.
- Accessibility vocabulary has an established Russian form — `доступность`, `семантика`, `фокус`,
  `скринридер` — use those and record any new ones in `GLOSSARY.md` when you add them.

**Command after every entry:**
`node tools/validate-content.mjs --topic 02-frontend --lang ru`

## Work Packages

### WP-12: Mirror the two area pages, HTML, npm and CSS

**Context:**
`01-html-and-css` and `02-front-end-web-development` are `area` entries with one `index.md` each;
`03-html` is `small`; `04-package-management-npm` is `medium`; `05-css` is `large` with four children.

**Task:**
Create the 18 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/01-html-and-css` | `index.md` | 1 |
| `lessons/02-frontend/02-front-end-web-development` | `index.md` | 1 |
| `lessons/02-frontend/03-html` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/04-package-management-npm` | `index.md`, `01-packages-and-versions.md`, `02-scripts-and-workspaces.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/05-css` | `index.md`, `01-cascade-and-box-model.md`, `02-flexbox-and-grid.md`, `03-media-and-container-queries.md`, `04-modern-css.md`, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context, here and in Phase 2.
- DO: keep the two area pages' `Входящие навыки` bullet ids exactly as the English files have them.
- DO: keep CSS declarations, selectors and HTML markup untouched; translate the comments and the prose around them.
- DO: keep `json` fences for `package.json` snippets byte-identical apart from string values that are prose.
- DO: use `Готово, когда:` for every `Done when:` line and `исправить:` in every Common-mistakes bullet.
- DO NOT: create `examples.md` for the two area pages, for `04-package-management-npm` or for `05-css` — all four are landing or area shapes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 18 files
- [ ] Command: `find lessons/ru/02-frontend/05-css -name '*.md' | wc -l` → `9`
- [ ] Command: `ls lessons/ru/02-frontend/03-html` → `examples.md` and `index.md`

### WP-13: Mirror JavaScript, responsive images, SEO, Vite and responsive web design

**Context:**
`06-javascript` is `large` with four children; `07-responsive-images` is `small`; `08-seo` is
`medium`; `09-vite` is `small`; `10-responsive-web-design` is `medium`.

**Task:**
Create the 23 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/06-javascript` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/02-frontend/07-responsive-images` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/08-seo` | `index.md`, `01-technical-seo.md`, `02-content-and-structured-data.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/09-vite` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/10-responsive-web-design` | `index.md`, `01-mobile-first-layout.md`, `02-fluid-type-and-spacing.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep JavaScript code, DOM API names and browser feature names untouched.
- DO: keep the structured-data `json` blocks' keys untouched; translate only the string values that are prose. Do not introduce a URL — the English file uses a placeholder, keep it a placeholder.
- DO NOT: create `examples.md` for the `medium` or `large` indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 23 files
- [ ] Command: `find lessons/ru/02-frontend/06-javascript -name '*.md' | wc -l` → `9`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/02-frontend/08-seo` → 0 matches

### WP-14: Mirror accessibility, UI components, Bootstrap, Tailwind, Sass and motion design

**Context:**
`11-accessibility-wcag-a11y`, `12-ui-components`, `14-tailwind-css` and `16-motion-design` are
`medium`; `13-bootstrap` and `15-sass` are `small`.

**Task:**
Create the 24 Russian files for the six directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/11-accessibility-wcag-a11y` | `index.md`, `01-semantics-and-aria.md`, `02-keyboard-and-focus.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/12-ui-components` | `index.md`, `01-designing-a-component-api.md`, `02-composing-and-theming-components.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/13-bootstrap` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/14-tailwind-css` | `index.md`, `01-utility-first-thinking.md`, `02-configuration-and-design-tokens.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/15-sass` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/16-motion-design` | `index.md`, `01-purposeful-motion.md`, `02-reduced-motion-and-performance.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep ARIA attribute names, WCAG criterion numbers, role names and `prefers-reduced-motion` untouched.
- DO: keep utility class names and Sass mixin names untouched.
- DO NOT: create `examples.md` for the four `medium` indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 24 files
- [ ] Command: `find lessons/ru/02-frontend/11-accessibility-wcag-a11y lessons/ru/02-frontend/12-ui-components lessons/ru/02-frontend/13-bootstrap lessons/ru/02-frontend/14-tailwind-css lessons/ru/02-frontend/15-sass lessons/ru/02-frontend/16-motion-design -name '*.md' | wc -l` → `24`

### WP-15: Mirror SVG icon systems, web typography and TypeScript

**Context:**
`17-svg-icon-systems` and `18-web-typography` are `medium` with two children each; `19-typescript`
is `large` with four children.

**Task:**
Create the 19 Russian files for the three directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/17-svg-icon-systems` | `index.md`, `01-svg-fundamentals.md`, `02-icon-systems-and-accessibility.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/18-web-typography` | `index.md`, `01-type-scales-and-rhythm.md`, `02-web-fonts-and-performance.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/19-typescript` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep SVG attribute names, viewBox values, font-family names and CSS property names untouched.
- DO: keep TypeScript type syntax, generic parameters and compiler error text untouched; translate the prose explaining them.
- DO NOT: create `examples.md` for any of these three indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 19 files
- [ ] Command: `find lessons/ru/02-frontend/19-typescript -name '*.md' | wc -l` → `9`
- [ ] Command: `find lessons/ru/02-frontend/17-svg-icon-systems lessons/ru/02-frontend/18-web-typography -name '*.md' | wc -l` → `10`

### WP-16: Mirror browser compatibility, Ajax, Vue, state management and webpack

**Context:**
`20-browser-compatibility`, `21-ajax` and `24-webpack` are `small`; `22-vuejs` and
`23-state-management` are `medium`.

**Task:**
Create the 16 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/20-browser-compatibility` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/21-ajax` | `index.md`, `examples.md` | 2 |
| `lessons/02-frontend/22-vuejs` | `index.md`, `01-reactivity-and-templates.md`, `02-single-file-components.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/23-state-management` | `index.md`, `01-local-versus-shared-state.md`, `02-client-and-server-state.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/24-webpack` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep HTTP verb names, header names and status codes in Latin script, and keep request paths relative — a placeholder path, never a scheme or host.
- DO: keep Vue directive names and template syntax untouched.
- DO NOT: create `examples.md` for the two `medium` indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 16 files
- [ ] Command: `find lessons/ru/02-frontend/20-browser-compatibility lessons/ru/02-frontend/21-ajax lessons/ru/02-frontend/22-vuejs lessons/ru/02-frontend/23-state-management lessons/ru/02-frontend/24-webpack -name '*.md' | wc -l` → `16`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/02-frontend/21-ajax` → 0 matches

### WP-17: Mirror PWA, web performance, DevTools and GEO

**Context:**
`25-progressive-web-apps-pwa`, `26-web-performance-core-web-vitals` and `27-browser-devtools` are
`medium`; `28-generative-engine-optimization-geo` is `small`.

**Task:**
Create the 17 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/25-progressive-web-apps-pwa` | `index.md`, `01-service-workers-and-offline.md`, `02-installability-and-the-app-manifest.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/26-web-performance-core-web-vitals` | `index.md`, `01-the-core-web-vitals.md`, `02-measuring-and-diagnosing.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/27-browser-devtools` | `index.md`, `01-elements-and-styles.md`, `02-network-and-performance.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/28-generative-engine-optimization-geo` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep metric names (LCP, INP, CLS), manifest keys and DevTools panel names in Latin script.
- DO: keep `json` manifest snippets and `js` service-worker snippets untouched apart from comments.
- DO NOT: create `examples.md` for the three `medium` indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → no error naming any of the 17 files
- [ ] Command: `find lessons/ru/02-frontend/25-progressive-web-apps-pwa lessons/ru/02-frontend/26-web-performance-core-web-vitals lessons/ru/02-frontend/27-browser-devtools lessons/ru/02-frontend/28-generative-engine-optimization-geo -name '*.md' | wc -l` → `17`

### WP-18: Mirror React, Angular and Lighthouse

**Context:**
`29-react` is `large` with four children; `30-angular` is `medium`; `31-lighthouse` is `small`. These
close out the topic.

**Task:**
Create the 16 Russian files for the three directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/02-frontend/29-react` | `index.md`, `01-rendering-and-jsx.md`, `02-components-and-props.md`, `03-state-and-hooks.md`, `04-effects-and-data-fetching.md`, four matching `examples.*` | 9 |
| `lessons/02-frontend/30-angular` | `index.md`, `01-components-and-templates.md`, `02-dependency-injection-and-rxjs.md`, two matching `examples.*` | 5 |
| `lessons/02-frontend/31-lighthouse` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep JSX/TSX syntax, hook names, decorators and RxJS operator names untouched.
- DO: keep Lighthouse category names and audit identifiers in Latin script.
- DO NOT: create `examples.md` for the `medium` or `large` indexes.
- DO NOT: edit anything under `lessons/02-frontend/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `31 present`, `56 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/02-frontend -name '*.md' | wc -l` → `133`
- [ ] Command: `find lessons/ru/02-frontend -name 'examples*.md' | wc -l` → `56`
- [ ] Command: `find lessons/ru/02-frontend -name 'index.md' | wc -l` → `31`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/02-frontend` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 02-frontend --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/02-frontend -name '*.md' | wc -l
find lessons/02-frontend -name '*.md' | wc -l
grep -rn '(https\|http)' lessons/ru/02-frontend
```

- [ ] The topic run reports `31 present`, `56 examples`, `0 error(s)`
- [ ] The Russian count equals the English count: `133` and `133`
- [ ] The English `--strict` run is unchanged
- [ ] The URL grep reports nothing
- [ ] The design-pattern and accessibility terminology decided in Phase 2 still reads consistently with this topic
