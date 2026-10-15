# Phase 4: Examples — frontend

## Objective

Write the remaining 55 examples files for `02-frontend`. The `02-frontend/05-css` child
`01-cascade-and-box-model.md` already has its examples file from WP-11, which is why this phase
accounts for 55 rather than 56.

## Prerequisites

- Phases 1–3 complete.
- `node tools/validate-content.mjs --topic 02-frontend` runs and reports `0 error(s)` and
  `55 examples pending` (`05-css/examples.01-cascade-and-box-model.md` already satisfied).

## Shared Context

See the frozen file shape in `phase-02-examples-toolkit.md` → Shared Context. Code-heavy topics
follow `lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md`; the prose fallback is
`lessons/08-soft-skills/03-mentoring/examples.md`.

Reminder: a `medium` or `large` skill's `index.md` is a landing shape with no `## Practice`, so it
gets no `examples.md`. Only a `small` skill's `index.md` and every child lesson file get one. Every
file listed below is either `examples.md` (for a `small` skill) or `examples.NN-slug.md` (for a
child lesson).

Front-end examples are the ones most likely to want a live URL or a CDN link. There are none: use
local, self-contained snippets, and where a real tool is involved describe the steps in prose or a
`bash` fence with no hostname.

## Work Packages

### WP-17: Examples for HTML, npm, and the remaining CSS children

**Context:**
`03-html` is a `small` skill; `04-package-management-npm` is `medium` with two children;
`05-css` is `large` with four children, one of which (`01-cascade-and-box-model`) is already done by
WP-11.

**Task:**
Create the 6 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/03-html` | `examples.md` |
| `lessons/02-frontend/04-package-management-npm` | `examples.01-packages-and-versions.md`, `examples.02-scripts-and-workspaces.md` |
| `lessons/02-frontend/05-css` | `examples.02-flexbox-and-grid.md`, `examples.03-media-and-container-queries.md`, `examples.04-modern-css.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `03-html` use an `html` fence for the starting markup and the corrected markup, and `text` for any accessibility-tree annotation.
- DO: for `04-package-management-npm` use a `json` or `bash` fence and a scratch project described in prose; never name a real registry URL.
- DO: for the CSS children include the CSS and enough HTML to make the outcome visible, and have the solution say what the computed result is.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files, and do not touch `examples.01-cascade-and-box-model.md`.

**Success:**
- [ ] Command: `ls lessons/02-frontend/05-css` → 4 lesson files, 4 `examples.*.md` files, `index.md`
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/03-html/examples.md lessons/02-frontend/04-package-management-npm/examples*.md` → 0 matches

### WP-18: Examples for JavaScript, responsive images, SEO

**Context:**
`06-javascript` is a `large` skill with four children; `07-responsive-images` is `small`;
`08-seo` is `medium` with two children.

**Task:**
Create the 7 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/06-javascript` | `examples.01-syntax-and-semantics.md`, `examples.02-the-dom-and-events.md`, `examples.03-asynchronous-javascript.md`, `examples.04-modules-and-tooling.md` |
| `lessons/02-frontend/07-responsive-images` | `examples.md` |
| `lessons/02-frontend/08-seo` | `examples.01-technical-seo.md`, `examples.02-content-and-structured-data.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `06-javascript` use `js` fences and, for the DOM child, show the HTML that hosts the script.
- DO: for `08-seo` use `html` fences for markup and `json` fences for structured data; a `json` block is not a URL, so a schema context value must be written as a placeholder with a one-line note — no scheme, no hostname.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: introduce a framework or bundler the lesson does not name.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `ls lessons/02-frontend/06-javascript` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches

### WP-19: Examples for Vite, responsive design, accessibility, UI components

**Context:**
`09-vite` is `small`; `10-responsive-web-design`, `11-accessibility-wcag-a11y` and
`12-ui-components` are `medium` with two children each.

**Task:**
Create the 7 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/09-vite` | `examples.md` |
| `lessons/02-frontend/10-responsive-web-design` | `examples.01-mobile-first-layout.md`, `examples.02-fluid-type-and-spacing.md` |
| `lessons/02-frontend/11-accessibility-wcag-a11y` | `examples.01-semantics-and-aria.md`, `examples.02-keyboard-and-focus.md` |
| `lessons/02-frontend/12-ui-components` | `examples.01-designing-a-component-api.md`, `examples.02-composing-and-theming-components.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `11-accessibility-wcag-a11y` show the failing markup and the fixed markup, and have the solution name the announced role and name, not just "add aria-label".
- DO: for `12-ui-components` use a framework-neutral or React-based snippet, matching whichever the lesson uses, and show the call site as well as the component.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: use inline HTML placeholders such as `<role>` in prose — write the words instead.
- DO NOT: edit the lesson files.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/02-frontend/11-accessibility-wcag-a11y/examples.01-semantics-and-aria.md` → `1` or `2` (the frozen shape allows either; V15 enforces one `### Solution` per example)
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches

### WP-20: Examples for Bootstrap, Tailwind, Sass, motion design

**Context:**
`13-bootstrap` and `15-sass` are `small`; `14-tailwind-css` and `16-motion-design` are `medium` with
two children each.

**Task:**
Create the 6 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/13-bootstrap` | `examples.md` |
| `lessons/02-frontend/14-tailwind-css` | `examples.01-utility-first-thinking.md`, `examples.02-configuration-and-design-tokens.md` |
| `lessons/02-frontend/15-sass` | `examples.md` |
| `lessons/02-frontend/16-motion-design` | `examples.01-purposeful-motion.md`, `examples.02-reduced-motion-and-performance.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `html`, `css` and `scss` fences exactly where the English lesson's own fences use them, with the class names or declarations that make the outcome visible.
- DO: for `16-motion-design` include a `prefers-reduced-motion` example and say in the solution what changes for the reader who set it.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: load a framework from a CDN — install it locally in the prose description instead.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `grep -c 'prefers-reduced-motion' lessons/02-frontend/16-motion-design/examples.02-reduced-motion-and-performance.md` → ≥ 1
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches

### WP-21: Examples for SVG icons, typography, TypeScript

**Context:**
`17-svg-icon-systems` and `18-web-typography` are `medium` with two children each;
`19-typescript` is `large` with four children.

**Task:**
Create the 8 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/17-svg-icon-systems` | `examples.01-svg-fundamentals.md`, `examples.02-icon-systems-and-accessibility.md` |
| `lessons/02-frontend/18-web-typography` | `examples.01-type-scales-and-rhythm.md`, `examples.02-web-fonts-and-performance.md` |
| `lessons/02-frontend/19-typescript` | `examples.01-the-type-system.md`, `examples.02-narrowing-and-unions.md`, `examples.03-generics.md`, `examples.04-configuration-and-migration.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `19-typescript` use `ts` fences and show the compiler error in a `text` fence where the point is that something is rejected.
- DO: for `18-web-typography` describe the font files as local assets; never reference a font host.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: write TypeScript that would not compile without a dependency the lesson does not mention.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `ls lessons/02-frontend/19-typescript` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches

### WP-22: Examples for browser compatibility, Ajax, Vue, state management

**Context:**
`20-browser-compatibility` and `21-ajax` are `small`; `22-vuejs` and `23-state-management` are
`medium` with two children each.

**Task:**
Create the 6 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/20-browser-compatibility` | `examples.md` |
| `lessons/02-frontend/21-ajax` | `examples.md` |
| `lessons/02-frontend/22-vuejs` | `examples.01-reactivity-and-templates.md`, `examples.02-single-file-components.md` |
| `lessons/02-frontend/23-state-management` | `examples.01-local-versus-shared-state.md`, `examples.02-client-and-server-state.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `21-ajax` use a `js` fence with a placeholder endpoint path and a note that the reader substitutes their own; no scheme, no hostname.
- DO: for `22-vuejs` use `vue` or `html` fences consistent with the lesson.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: use a real API hostname anywhere, including inside a code comment.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches
- [ ] Command: `grep -c '^## Example' lessons/02-frontend/20-browser-compatibility/examples.md` → `1` or `2`

### WP-23: Examples for webpack, PWA, performance, DevTools, GEO

**Context:**
`24-webpack` and `28-generative-engine-optimization-geo` are `small`; `25-progressive-web-apps-pwa`,
`26-web-performance-core-web-vitals` and `27-browser-devtools` are `medium` with two children each.

**Task:**
Create the 8 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/24-webpack` | `examples.md` |
| `lessons/02-frontend/25-progressive-web-apps-pwa` | `examples.01-service-workers-and-offline.md`, `examples.02-installability-and-the-app-manifest.md` |
| `lessons/02-frontend/26-web-performance-core-web-vitals` | `examples.01-the-core-web-vitals.md`, `examples.02-measuring-and-diagnosing.md` |
| `lessons/02-frontend/27-browser-devtools` | `examples.01-elements-and-styles.md`, `examples.02-network-and-performance.md` |
| `lessons/02-frontend/28-generative-engine-optimization-geo` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the DevTools children use `text` fences describing the panel state and the reading the reader should take from it, since the artefact is an observation, not code.
- DO: for `25-progressive-web-apps-pwa` show the manifest as `json` and the service worker as `js`.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: quote a real metric from a real site as if it were the reader's data.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches
- [ ] Check: each created file has one `### Solution` per `## Example`

### WP-24: Examples for React, Angular and Lighthouse

**Context:**
`29-react` is a `large` skill with four children; `30-angular` is `medium` with two;
`31-lighthouse` is `small`. These are the last three frontend entries.

**Task:**
Create the 7 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/02-frontend/29-react` | `examples.01-rendering-and-jsx.md`, `examples.02-components-and-props.md`, `examples.03-state-and-hooks.md`, `examples.04-effects-and-data-fetching.md` |
| `lessons/02-frontend/30-angular` | `examples.01-components-and-templates.md`, `examples.02-dependency-injection-and-rxjs.md` |
| `lessons/02-frontend/31-lighthouse` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `29-react` use `jsx` or `tsx` fences; for the effects child show the cleanup and say what breaks without it.
- DO: for `31-lighthouse` describe a run and its reported numbers in a `text` table; the tool name is fine, a URL is not.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: fetch anything at runtime in an example — the snippet must be self-contained.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `56 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `ls lessons/02-frontend/29-react` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 02-frontend
node tools/validate-content.mjs
find lessons/02-frontend -name 'examples*.md' | wc -l
grep -rn 'https://\|http://' lessons/02-frontend/*/examples*.md
```

- [ ] The topic run reports `56 examples`, `0 examples pending`, `0 error(s)`
- [ ] `find` reports 56 files
- [ ] The URL grep reports nothing
- [ ] No lesson file under `02-frontend` was modified (`--strict` still exits 0 with `177 present`)
- [ ] `lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` is untouched (still the WP-11 exemplar)
