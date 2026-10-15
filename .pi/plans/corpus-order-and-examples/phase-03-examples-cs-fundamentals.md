# Phase 3: Examples — cs-fundamentals

## Objective

Write the 45 examples files for `01-cs-fundamentals`, the first topic in the order. This is the
first content batch, so it also proves the WP-11 exemplars can be scaled by an executor working
top to bottom.

## Prerequisites

- Phases 1 and 2 complete.
- `node tools/validate-content.mjs --topic 01-cs-fundamentals` runs and reports `0 error(s)` and
  `45 examples pending`.

## Shared Context

See the frozen file shape in `phase-02-examples-toolkit.md` → Shared Context, and copy the structure
of `lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` for code examples. Nothing in
this phase differs from that contract.

The naming rule, once more, because every file in this phase depends on it: the examples file sits
beside the lesson file it belongs to and its name is that lesson file's name with `examples`
inserted — `index.md` → `examples.md`, `NN-slug.md` → `examples.NN-slug.md`. The lesson files with a
`## Practice` section are the `index.md` of a `small` skill and every `NN-slug.md`. A `medium` or
`large` skill's `index.md` is a landing shape with no `## Practice`, so it gets no `examples.md`;
only its children do.

Each work package below lists, per entry directory, the examples files to create. The lesson file
each one belongs to is the file named in its own name (`examples.01-x.md` ↔ `01-x.md`,
`examples.md` ↔ `index.md`). Always read that lesson file first: the examples must demonstrate two
of that lesson's `### Core ideas` subheadings.

## Work Packages

### WP-12: Examples for data structures, networks, database internals, concurrency

**Context:**
These four entries are the first non-area entries of the topic. `02-data-structures` and
`03-computer-networks` are `medium`, so they have two children each and no `examples.md`;
`04-database-internals` is `small`, so its `index.md` is a full lesson and gets `examples.md`;
`05-concurrency-async-programming` is `medium` with two children.

**Task:**
Create the 7 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/01-cs-fundamentals/02-data-structures` | `examples.01-arrays-lists-and-hash-maps.md`, `examples.02-trees-heaps-and-graphs.md` |
| `lessons/01-cs-fundamentals/03-computer-networks` | `examples.01-packets-tcp-ip-and-ports.md`, `examples.02-dns-and-the-path-of-a-request.md` |
| `lessons/01-cs-fundamentals/04-database-internals` | `examples.md` |
| `lessons/01-cs-fundamentals/05-concurrency-async-programming` | `examples.01-threads-locks-and-races.md`, `examples.02-async-promises-and-event-loops.md` |

**Constraints:**
- DO: write one file per `write` tool call; never attempt two example files in one generation.
- DO: use `text` fenced blocks for trace/step-through examples, and `ts`, `py`, `sql` or `bash` where the topic is executable and the lesson itself shows that language.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add an example that merely restates the brief.
- DO NOT: invent a library, a tool or a version that the lesson does not mention.

**Success:**
- [ ] Command: `ls lessons/01-cs-fundamentals/02-data-structures` → contains both `examples.*.md` files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/01-cs-fundamentals/04-database-internals/examples.md` → `1` or `2` (the frozen shape allows either; V15 enforces one `### Solution` per example)
- [ ] Command: `grep -rL '^## Example 1 — ' lessons/01-cs-fundamentals/*/examples*.md` → empty (every file starts with the heading)

### WP-13: Examples for regex, pseudocode, clean code, SOLID, unit testing

**Context:**
`06-regular-expressions-regex`, `07-pseudocode` and `09-solid-principles` are `small` skills (full
`index.md`, one `examples.md` each). `08-clean-code` and `10-unit-testing` are `medium` with two
children each and no `examples.md`.

**Task:**
Create the 7 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/01-cs-fundamentals/06-regular-expressions-regex` | `examples.md` |
| `lessons/01-cs-fundamentals/07-pseudocode` | `examples.md` |
| `lessons/01-cs-fundamentals/08-clean-code` | `examples.01-names-and-small-functions.md`, `examples.02-structure-and-error-handling.md` |
| `lessons/01-cs-fundamentals/09-solid-principles` | `examples.md` |
| `lessons/01-cs-fundamentals/10-unit-testing` | `examples.01-what-makes-a-good-unit-test.md`, `examples.02-test-doubles-and-test-data.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `06-regular-expressions-regex` use real regexes with sample input and show the captured groups in the solution; the lesson forbids external URLs, so use placeholder text for any reference to a tool.
- DO: for `07-pseudocode` use `text` blocks and show the same algorithm in pseudocode and in one real language.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: use a regex escape sequence inside a shell `grep` command in your verification — write it to a `.tmp/` script or use a fixed string.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/01-cs-fundamentals/09-solid-principles/examples.md` → `1` or `2`
- [ ] Command: `grep -rn 'https://\|http://' lessons/01-cs-fundamentals/*/examples*.md` → 0 matches
- [ ] Check: every file lists exactly two `### Solution` headings when it has two examples

### WP-14: Examples for debugging, git, unix shell, algorithms, operating systems

**Context:**
All five entries are `medium` skills with two children each, so this WP creates ten child-level
examples files and no `examples.md`. `12-git` and `14-algorithms-big-o` sit under the
`01-cs-fundamentals` numbering and their lesson files are unchanged.

**Task:**
Create the 10 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/01-cs-fundamentals/11-debugging` | `examples.01-reproduce-before-you-fix.md`, `examples.02-isolate-and-prove-the-cause.md` |
| `lessons/01-cs-fundamentals/12-git` | `examples.01-the-object-model-and-history.md`, `examples.02-the-daily-workflow.md` |
| `lessons/01-cs-fundamentals/13-unix-shell` | `examples.01-pipelines-and-filters.md`, `examples.02-files-permissions-and-environment.md` |
| `lessons/01-cs-fundamentals/14-algorithms-big-o` | `examples.01-how-cost-grows-big-o.md`, `examples.02-sorting-searching-and-traversal.md` |
| `lessons/01-cs-fundamentals/15-operating-systems` | `examples.01-processes-threads-and-scheduling.md`, `examples.02-memory-and-filesystems.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `bash` fences for the shell and git examples, `text` fences for traces and cost tables, and a real language for the algorithms examples.
- DO: for the git examples use a scratch repository described in prose and never a real remote URL.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: put a line beginning with `## ` inside a fence — the validator parses it as a real heading.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → `0 error(s)`
- [ ] Command: `ls lessons/01-cs-fundamentals/12-git` → both `examples.*.md` files present
- [ ] Command: `grep -rn 'https://\|http://' lessons/01-cs-fundamentals/*/examples*.md` → 0 matches
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → examples pending count is 21 lower than before this phase started

### WP-15: Examples for reuse, review, patterns, refactoring, TDD, integration testing

**Context:**
`16-code-reusability` is a `small` skill with one `examples.md`. `17-code-review`, `18-design-patterns`,
`19-refactoring`, `20-test-driven-development-tdd` and `21-integration-testing` are `medium` with two
children each.

**Task:**
Create the 11 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/01-cs-fundamentals/16-code-reusability` | `examples.md` |
| `lessons/01-cs-fundamentals/17-code-review` | `examples.01-reading-a-diff-for-correctness.md`, `examples.02-reviewing-for-clarity-and-tone.md` |
| `lessons/01-cs-fundamentals/18-design-patterns` | `examples.01-why-patterns-are-named.md`, `examples.02-the-patterns-that-earn-their-keep.md` |
| `lessons/01-cs-fundamentals/19-refactoring` | `examples.01-safe-refactoring-steps.md`, `examples.02-refactorings-you-will-actually-use.md` |
| `lessons/01-cs-fundamentals/20-test-driven-development-tdd` | `examples.01-the-red-green-refactor-loop.md`, `examples.02-where-tdd-does-and-does-not-pay-off.md` |
| `lessons/01-cs-fundamentals/21-integration-testing` | `examples.01-testing-across-a-real-boundary.md`, `examples.02-fixtures-databases-and-cleanup.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `17-code-review` use a small diff in a `diff` or `text` fence as the starting material and a written review as the solution.
- DO: for the testing entries use a real test framework the lesson already names and show the failing-before/passing-after shape where the lesson does.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: introduce a package or framework the lesson does not mention.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/01-cs-fundamentals/16-code-reusability/examples.md` → `1` or `2`
- [ ] Command: `grep -rn 'https://\|http://' lessons/01-cs-fundamentals/*/examples*.md` → 0 matches
- [ ] Check: every created file has its `### Solution` heading after the matching example heading

### WP-16: Examples for branching, GitHub, CLI, architecture, E2E testing, Playwright

**Context:**
`22-git-branching-strategies`, `23-github`, `24-command-line-interface` and `27-playwright` are
`small` skills with one `examples.md` each. `25-software-architecture` is `large` with four children,
so it gets four child-level examples files and no `examples.md`. `26-end-to-end-testing` is `medium`
with two.

**Task:**
Create the 10 examples files listed below, each following the frozen shape and each built from two of
its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/01-cs-fundamentals/22-git-branching-strategies` | `examples.md` |
| `lessons/01-cs-fundamentals/23-github` | `examples.md` |
| `lessons/01-cs-fundamentals/24-command-line-interface` | `examples.md` |
| `lessons/01-cs-fundamentals/25-software-architecture` | `examples.01-boundaries-and-coupling.md`, `examples.02-data-and-state-ownership.md`, `examples.03-deployment-shape.md`, `examples.04-documenting-decisions.md` |
| `lessons/01-cs-fundamentals/26-end-to-end-testing` | `examples.01-driving-the-system-like-a-user.md`, `examples.02-making-end-to-end-tests-trustworthy.md` |
| `lessons/01-cs-fundamentals/27-playwright` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `23-github` describe the workflow in prose plus a `bash` fence of local commands; never use a real hostname or URL.
- DO: for `25-software-architecture` use a `text` fence for each diagram-like artefact (a boundary sketch, a deployment sketch) and a real language only where the lesson shows code.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add a fourth example anywhere — the maximum is two.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals` → `0 error(s)`, `45 examples`, `0 examples pending`
- [ ] Command: `ls lessons/01-cs-fundamentals/25-software-architecture` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/01-cs-fundamentals/*/examples*.md` → 0 matches
- [ ] Command: `node tools/validate-content.mjs` → the global examples pending count is 45 lower than at the start of this phase

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 01-cs-fundamentals
node tools/validate-content.mjs
find lessons/01-cs-fundamentals -name 'examples*.md' | wc -l
grep -rn 'https://\|http://' lessons/01-cs-fundamentals/*/examples*.md
```

- [ ] The topic run reports `45 examples`, `0 examples pending`, `0 error(s)`
- [ ] `find` reports 45 files
- [ ] The URL grep reports nothing
- [ ] Every examples file starts with `## Example 1 — ` and has one `### Solution` per example
- [ ] No lesson file under `01-cs-fundamentals` was modified (word counts still pass V5)
