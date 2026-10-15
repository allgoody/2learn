# Phase 1: Renumber by dependency order

## Objective

Remove the single backwards prereq edge, then rename all 8 topic directories and all 177 entry
directories so their names carry the learning order, and rewrite every id reference in the corpus
so the validator is green again. This comes first because every later phase, and the whole Russian
plan, references these paths.

## Prerequisites

- Node ≥ 22 available (`node --version`).
- Working directory is the repo root: `D:\coding\apps\2learn`.
- `node tools/validate-content.mjs --strict` currently exits 0 with `177 present, 0 pending,
  0 error(s)`.
- No file in the repo has been modified since the plan was written, other than by WP-1.

## Shared Context

The validator derives an entry id straight from the directory names: `subdirs(lessons)` gives the
topic dirs, `subdirs(lessons/<topic>)` gives the entry dirs, and `id === topic + "/" + slug`
(see `tools/validate-content.mjs`, the "filesystem scan" section around line 84, and the V1 check
around line 64). Because the numeric prefixes live in the directory names, the ids will contain the
prefixes too and `id === topic/slug` keeps holding. The only constant that must change is `TOPICS`
(line 12), which is used both for V1's unknown-topic check and for the grouping order in
`--write-index`.

**The entry order is fixed data, not a rule to re-derive.** It is a hand-chosen pedagogical order,
so no sorting algorithm reproduces it — WP-2 must embed the list below, never compute it from
`prereqs`. The same sequence, with the same slugs and the same numbers, is what the Phase 3–6 tables
list (those tables omit the area entries, which get no examples file). What the order guarantees,
and what WP-2 asserts:

1. Topics in this fixed order: `cs-fundamentals`, `frontend`, `design-ux`, `product-process`,
   `backend-data`, `cloud-devops`, `security`, `soft-skills`, numbered `01`–`08`.
2. Within a topic the `type: "area"` entries come first, in their current inventory order, then the
   slugs below in the order written. That order is a valid topological order of the `prereqs` edges:
   every prereq is numbered lower than the entry that needs it, so there are no backwards edges.
3. Numbers are `01`, `02`, … ascending, contiguous, one per entry — no gaps.

| Topic dir | Entries in numeric order, `NN-` prefixes omitted, `(area)` marking the area entries |
| --- | --- |
| `01-cs-fundamentals` | computer-science (area), data-structures, computer-networks, database-internals, concurrency-async-programming, regular-expressions-regex, pseudocode, clean-code, solid-principles, unit-testing, debugging, git, unix-shell, algorithms-big-o, operating-systems, code-reusability, code-review, design-patterns, refactoring, test-driven-development-tdd, integration-testing, git-branching-strategies, github, command-line-interface, software-architecture, end-to-end-testing, playwright |
| `02-frontend` | html-and-css (area), front-end-web-development (area), html, package-management-npm, css, javascript, responsive-images, seo, vite, responsive-web-design, accessibility-wcag-a11y, ui-components, bootstrap, tailwind-css, sass, motion-design, svg-icon-systems, web-typography, typescript, browser-compatibility, ajax, vuejs, state-management, webpack, progressive-web-apps-pwa, web-performance-core-web-vitals, browser-devtools, generative-engine-optimization-geo, react, angular, lighthouse |
| `03-design-ux` | ui-ux-design (area), design-thinking, facilitation-workshop-design, sketching, user-research, google-analytics-4-ga4, ux-writing-microcopy, content-strategy, information-architecture, visual-design, usability, figma, miro, notion, user-centered-design, storyboarding, jobs-to-be-done, ui-ux-research, design-research, user-interviews, survey-design, journey-mapping, persona-user-experience, quantitative-ux-research, hotjar, card-sorting, wireframing, typography, color-theory, layout-grid-systems, data-visualization, design-systems, usability-testing, heuristic-evaluation, adobe-xd, framer, lean-ux, service-design, ab-testing, prototyping, design-tokens, design-handoff-specs, maze, interaction-design |
| `04-product-process` | software-development (area), agile-methodology, product-management, product-discovery, requirements-engineering, business-analysis, stakeholder-management, technical-writing, agile-software-development, scrum-software-development, kanban, user-story, jira-confluence, roadmapping, prioritization-frameworks-rice-moscow, user-acceptance-testing, estimation-story-points |
| `05-backend-data` | server-side (area), nodejs, python-programming, java, go, restful-api, sql-relational-databases, expressjs, api-design-openapi-swagger, authentication-authorization-oauth2-jwt, websockets, microservices, nosql, database-design, object-relational-mapping, caching-redis, message-queues-kafka-rabbitmq, mongodb, prisma-orm |
| `06-cloud-devops` | cloud-computing (area), aws, microsoft-azure, google-cloud-platform-gcp, serverless-computing, docker, terraform, ci-cd, linux-administration, networking-fundamentals-http-dns-tls, cloud-cost-management, cloud-security-iam, cloud-native-computing, kubernetes, github-actions, jenkins, azure-devops, monitoring-observability-prometheus-grafana, nginx, openshift, helm, istio, site-reliability-engineering |
| `07-security` | web-security-owasp-top-10, https-tls, secrets-management, dependency-scanning-sca, gdpr-data-privacy, content-security-policy-csp, data-ethics |
| `08-soft-skills` | communication, teamwork-collaboration, mentoring, problem-solving, time-management, portfolio-building, interview-prep-whiteboarding, freelancing-client-work, technical-presentation |

`tools/inventory.json` is written with 2-space indent, LF endings and a trailing newline. Keep the
key order `id`, `topic`, `slug`, `title`, `type`, `tier`, `prereqs`, `aliases`.

## Work Packages

### WP-1: Demote the one backwards prereq edge

**Context:**
`cs-fundamentals/database-internals` currently lists `backend-data/sql-relational-databases` as a
prereq (`tools/inventory.json`, the entry whose `"id"` is `"cs-fundamentals/database-internals"`).
Under the chosen topic order `cs-fundamentals` is topic 01 and `backend-data` is topic 05, so that
edge would point backwards. Its body already carries the same advice as prose ("Read the entry on
relational databases first…") and has a `Go deeper` bullet for the same id, so removing the prereq
loses nothing for the reader.

**Task:**
Set the `prereqs` array of `cs-fundamentals/database-internals` to `[]` in `tools/inventory.json`,
and set `prereqs: []` in that entry's `index.md` frontmatter. Change nothing else — not the prose,
not the `Go deeper` bullet, not `related`.

**Files:**
- `tools/inventory.json` — MODIFY — the `cs-fundamentals/database-internals` object's `prereqs`
- `lessons/cs-fundamentals/database-internals/index.md` — MODIFY — the `prereqs:` frontmatter line

**Constraints:**
- DO: keep the `Go deeper` bullet `- **SQL & Relational Databases** (\`backend-data/sql-relational-databases\`) — …` exactly as it is.
- DO: keep the frontmatter key order (`title`, `type`, `topic`, `tier`, `status`, `aliases`, `prereqs`, `related`).
- DO: write `prereqs: []` with the same spacing the neighbouring files use.
- DO NOT: edit `related`, `aliases`, `tier`, `status` or any body text in that file.
- DO NOT: touch any other inventory entry.
- DO NOT: edit `seed/`.

**Success:**
- [ ] Command: `node -e "const i=require('./tools/inventory.json');console.log(i.find(e=>e.id==='cs-fundamentals/database-internals').prereqs.length)"` → `0`
- [ ] Grep: `grep -c 'sql-relational-databases' tools/inventory.json` → `6` (the SQL entry's own `id` and `slug` lines, plus the `prereqs` of `nosql`, `database-design`, `object-relational-mapping` and `caching-redis` — the `database-internals` one is gone)
- [ ] Grep: `grep -n 'prereqs: \[\]' lessons/cs-fundamentals/database-internals/index.md` → 1 match
- [ ] Command: `node tools/validate-content.mjs --topic cs-fundamentals` → `… 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs` → `177 present, 0 pending, 0 error(s)`, exit 0

### WP-2: Create the renumber script and generate the id map

**Context:**
The fixed order is the list in Shared Context above. The current tree is `lessons/<topic>/<slug>/`.
177 entries and 224 children must be mapped. The map is the single source of truth for
WP-3 and WP-4, and it stays in the repo afterwards as the record of the migration.

**Task:**
Create `.tmp/renumber.mjs` — a zero-dependency Node ESM script that reads `tools/inventory.json`
and the current `lessons/` tree, embeds the fixed per-topic order from Shared Context above (the
slug lists, in the order written), and writes `tools/renumber-map.json` containing:

```json
{
  "topics": [{"old": "cs-fundamentals", "new": "01-cs-fundamentals"}, "…8 rows…"],
  "entries": {"cs-fundamentals/git": {"newId": "01-cs-fundamentals/12-git",
               "oldDir": "lessons/cs-fundamentals/git",
               "newDir": "lessons/01-cs-fundamentals/12-git"}, "…177 rows…"},
  "children": {"cs-fundamentals/git/01-the-object-model-and-history":
               "01-cs-fundamentals/12-git/01-the-object-model-and-history", "…224 rows…"}
}
```

Running the script twice must produce byte-identical output (sort object keys explicitly). The
script must also print, per topic, the new entry dirs in order, plus these assertions: 177 entries
mapped, all `newId` values unique, numbering contiguous from `01` with no gaps, the area entries
occupying `01` (and `02` for the one topic with two areas, `02-frontend`; `07-security` and
`08-soft-skills` have none), the embedded list agreeing with the Phase 3–6 tables, and **0 backwards
prereq edges** under the new numbering. A backwards edge is any prereq whose new position is greater
than the depending entry's new position, where position = (topic number, entry number).

**Files:**
- `.tmp/renumber.mjs` — CREATE — the migration script (temp; deleted in WP-8)
- `tools/renumber-map.json` — CREATE — the map, in the schema above

**Constraints:**
- DO: use only `node:fs`, `node:path`, `node:url`. No dependencies.
- DO: keep `tools/inventory.json` open in read-only mode — this WP writes only the two files above.
- DO: print the 8 topics in the fixed order and the entry dirs in numeric order.
- DO: fail loudly with a non-zero exit code if any assertion fails.
- DO NOT: rename anything yet — this WP only plans and writes the map.
- DO NOT: write anything into `.tmp/` other than `renumber.mjs` and the throwaway `a.json` copy the Success check below makes (WP-8 removes both).

**Success:**
- [ ] Command: `node .tmp/renumber.mjs` → prints `177 entries`, no assertion failure, exit 0
- [ ] Command: `node .tmp/renumber.mjs && cp tools/renumber-map.json .tmp/a.json && node .tmp/renumber.mjs && diff .tmp/a.json tools/renumber-map.json` → no diff, exit 0
- [ ] Command: `node -e "const m=require('./tools/renumber-map.json');console.log(Object.keys(m.entries).length,Object.keys(m.children).length)"` → `177 224`
- [ ] Check: the printed per-topic list matches the Shared Context table above **and** the tables in Phase 3–6 of this plan, topic by topic and entry by entry (the Phase 3–6 tables omit the area entries, so compare the non-area slugs and their numbers)
- [ ] Check: `01-cs-fundamentals/04-database-internals` is printed before `05-backend-data/07-sql-relational-databases`, and the script still reports 0 backwards edges (WP-1 removed the only one)

### WP-3: Apply the renames and rewrite the inventory

**Context:**
`tools/renumber-map.json` now holds the complete mapping. `lessons/` is tracked in git (the last corpus commit is `b362edd`), so a bad rename is recoverable with `git checkout` — but the backup below is still made first, because WP-48 compares against it and because a copy does not depend on git being usable mid-sweep. `fs.renameSync`
on a directory is atomic on the same volume, and every rename is a pure rename — no content moves
between directories.

**Task:**
Copy the whole `lessons/` tree to `.tmp/lessons-backup/`, then rename the 8 topic directories and
the 177 entry directories according to `tools/renumber-map.json` — **entry directories first, from
their `oldDir` (which still sits under the old topic name), and the topic directories last**; a
topic rename first would delete every `oldDir` under it and the script would abort. Then rewrite
`tools/inventory.json` so that (a) every `id`, `topic` and `slug` carries the new prefixed names,
(b) every string in every `prereqs` array is the new id, and (c) the entries are stored in
pedagogical order — topic 01 first, then topic 02, and within a topic in ascending entry number.

**Files:**
- `.tmp/lessons-backup/` — CREATE — verbatim copy of `lessons/` before any rename
- `lessons/` — RENAME — 8 topic dirs and 177 entry dirs (contents untouched)
- `tools/inventory.json` — MODIFY — ids, topics, slugs, prereqs, and entry order

**Constraints:**
- DO: make the backup first: `cp -r lessons .tmp/lessons-backup` (on Windows Git Bash this works; verify with `ls .tmp/lessons-backup/frontend | head` before continuing).
- DO: rename with the map as the only source of truth — no hand-typed directory names.
- DO: order the renames as the Task says: every entry directory before its topic directory.
- DO: keep each entry object's key order and its `title`, `type`, `tier`, `aliases` values byte-identical.
- DO: write inventory as `JSON.stringify(entries, null, 2) + "\n"` with LF endings.
- DO: abort and restore from the backup if any rename throws; do not continue half-renamed.
- DO NOT: rename any child file (`NN-slug.md`) — child filenames and their order are already correct and are validated by V8.
- DO NOT: edit `seed/**`, `.pi/**`, or `lessons/INDEX.md` in this WP.
- DO NOT: delete or move anything into `.tmp/` other than the backup.

**Success:**
- [ ] Command: `ls lessons` → exactly `01-cs-fundamentals 02-frontend 03-design-ux 04-product-process 05-backend-data 06-cloud-devops 07-security 08-soft-skills AUTHORING.md INDEX.md`
- [ ] Command: `ls lessons/01-cs-fundamentals` → `01-computer-science 02-data-structures 03-computer-networks 04-database-internals 05-concurrency-async-programming … 27-playwright`
- [ ] Command: `ls lessons/02-frontend` → `01-html-and-css 02-front-end-web-development 03-html 04-package-management-npm 05-css …` (areas first, per the table in Phase 4)
- [ ] Command: `node -e "const i=require('./tools/inventory.json');console.log(i.length,i[0].id,i[0].topic,i[0].slug)"` → `177 01-cs-fundamentals/01-computer-science 01-cs-fundamentals 01-computer-science`
- [ ] Command: `node -e "const i=require('./tools/inventory.json');const b=i.filter(e=>e.prereqs.some(p=>!/^0[1-8]-/.test(p)));console.log(b.length)"` → `0`
- [ ] Check: `.tmp/lessons-backup/` holds 8 topic dirs and 403 `.md` files
- [ ] Command: `find lessons -mindepth 3 -name '*.md' | wc -l` → `401`
- [ ] Check: `git status --short -- lessons` shows ` D` for each old path and `??` for the eight new topic directories — record those counts in your report. An unstaged directory rename is never reported as `R`; that is expected, and the backup comparison below is the real proof
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '*.md' | wc -l) <(find lessons -mindepth 3 -name '*.md' | wc -l)` → no output (`401` lesson files on both sides — nothing was lost)
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '0[1-9]-*.md' | wc -l) <(find lessons -mindepth 3 -name '0[1-9]-*.md' | wc -l)` → no output (the same 224 child files on both sides)
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '*.md' -exec cat {} + | wc -l) <(find lessons -mindepth 3 -name '*.md' -exec cat {} + | wc -l)` → no output (identical total line count: the renames moved bytes, they did not edit them)

### WP-4: Rewrite every id reference inside the corpus

**Context:**
Ids appear in lesson prose and frontmatter in five shapes: `prereqs:` and `related:` YAML arrays,
`## Prerequisites` bullets (`- **Title** (\`id\`)`), `## In this track` numbered lines, `## Go
deeper` bullets, and `## Included skills` bullets. Verified during planning: inside `lessons/`, the
only backticked id-shaped tokens are the 177 entry ids and 224 child ids — there are no other
candidates. `lessons/AUTHORING.md` and `lessons/INDEX.md` also contain ids but are excluded here:
`INDEX.md` is regenerated in WP-7, and AUTHORING.md is hand-edited in WP-5 because it carries only
four id references and its §1 prose is rewritten anyway.

**Task:**
Create `.tmp/rewrite-ids.mjs`, run it over every `.md` file under `lessons/` **except**
`lessons/AUTHORING.md` and `lessons/INDEX.md`, and replace each old id with its new id from
`tools/renumber-map.json` using a single left-to-right pass.

**Files:**
- `.tmp/rewrite-ids.mjs` — CREATE — the sweep script (temp; deleted in WP-8)
- the 401 lesson files (`lessons/<topic>/<entry>/index.md` and `lessons/<topic>/<entry>/NN-slug.md`) — MODIFY — id references only (not the backup, not AUTHORING.md, not INDEX.md)

**Constraints:**
- DO: build one `RegExp` from all 401 keys of `entries` and `children` combined, sorted by key length descending, with the alternation escaped; run one global pass per file with a replacer function, so replaced text is never re-scanned.
- DO: anchor each alternative so it matches only a whole id: the character before must not be `[a-z0-9/-]` and the character after must not be `[a-z0-9/-]` (a negative lookbehind and a negative lookahead). This prevents `cs-fundamentals/git` matching inside a longer token.
- DO: read and write bytes: `const buf = readFileSync(p)`, `const hadCrlf = buf.includes(13)`, do the replacement on `buf.toString("utf8")`, and write back with the original line ending preserved.
- DO: print a summary line `files changed: N` and list every changed file path.
- DO: make it idempotent — running it a second time must report `files changed: 0`.
- DO NOT: change prose, headings, word counts or frontmatter key order. Only id substrings change.
- DO NOT: touch `lessons/AUTHORING.md`, `lessons/INDEX.md`, `seed/**`, `.pi/**` or `tools/validate-content.mjs`. AUTHORING.md's four id references are WP-5's job, not this sweep's.
- DO NOT: use a regex containing shorthand escape sequences in a shell command — write the script to `.tmp/` and run the file (the pi path guard rejects `\s`, `\d` and similar inside command strings).

**Success:**
- [ ] Command: `node .tmp/rewrite-ids.mjs` → prints a changed-file count, exit 0
- [ ] Command: `node .tmp/rewrite-ids.mjs` (second run) → `files changed: 0`
- [ ] Command: `grep -rn 'cs-fundamentals/git\|frontend/css\|design-ux/design-systems' lessons --include=*.md | grep -v INDEX.md` → 0 matches
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '*.md' -exec cat {} + | wc -l) <(find lessons -mindepth 3 -name '*.md' -exec cat {} + | wc -l)` → no output (the sweep replaces ids in place: not one line was added or removed. This is the volume proof, because no git command works on an unstaged rename. AUTHORING.md is not swept — WP-5 verifies its four ids itself)
- [ ] Command: `node tools/validate-content.mjs` → errors are now only the expected `TOPICS`-related ones or `0 error(s)`; no `does not resolve` message
- [ ] Manual: open `lessons/01-cs-fundamentals/04-database-internals/index.md` and confirm its `Go deeper` bullets name prefixed ids

### WP-5: Update the layout rules in AUTHORING.md

**Context:**
`lessons/AUTHORING.md` §1 ("Layout and ids") documents the old layout, the eight unprefixed topic
slugs and the slug regex. It also shows a tree diagram with `lessons/<topic>/<slug>/…`. After WP-3
that text is wrong. Section 1 must describe the prefix rule and the numbering rule, because it is the
contract every future author reads. The examples-file contract is added later, in WP-9.

**Task:**
Rewrite `lessons/AUTHORING.md` §1 so it states the prefixed layout, the fixed topic order, how
entries are numbered, and the fact that the numeric prefix is part of the id. Replace the unprefixed
topic list with the 8 prefixed names in pedagogical order, and update the tree diagram and the two id
examples in that section. Then replace the three entry ids in the §8 "Merged entries" table with
`06-cloud-devops/01-cloud-computing`, `03-design-ux/01-ui-ux-design` and
`04-product-process/01-software-development`.

**Files:**
- `lessons/AUTHORING.md` — MODIFY — §1 "Layout and ids", plus the three entry ids in §8 "Merged entries"

**Constraints:**
- DO: state the numbering in plain terms: the area page takes `01` in its topic, the other entries follow in the order frozen in `tools/renumber-map.json` (a valid dependency order — every prereq is numbered lower), numbers are contiguous from `01` and are never re-derived by sorting.
- DO: keep the `slug` validity note but say the entry directory name is `NN-<slug>` and that the prefix is part of both the directory name and the id.
- DO: use `01-cs-fundamentals/12-git` and `02-frontend/29-react/01-rendering-and-jsx` as the two id examples.
- DO: keep the section's existing prose voice and heading level.
- DO NOT: change any other part of `AUTHORING.md` — §2–§7 and §9–§11 stay byte-identical, and §8 changes only in those three table cells.
- DO NOT: restate the body shapes or word bands here; they are unchanged.
- DO NOT: edit `seed/**` or the plan files under `.pi/plans/**`.

**Success:**
- [ ] Command: `sed -n '/^## 1\./,/^## 2\./p' lessons/AUTHORING.md` → shows the 8 prefixed topic dirs and the numbering rule
- [ ] Grep: `grep -c '01-cs-fundamentals' lessons/AUTHORING.md` → ≥ 1
- [ ] Grep: `grep -n '^## ' lessons/AUTHORING.md` → headings unchanged in count and text from before this WP
- [ ] Check: §1 and §8 are the only changed regions — §2–§7 are untouched: `diff <(sed -n '/^## 2\./,/^## 8\./p' .tmp/lessons-backup/AUTHORING.md) <(sed -n '/^## 2\./,/^## 8\./p' lessons/AUTHORING.md)` → no diff
- [ ] Command: `grep -c '06-cloud-devops/01-cloud-computing\|03-design-ux/01-ui-ux-design\|04-product-process/01-software-development' lessons/AUTHORING.md` → `3`
- [ ] Command: `grep -n 'cloud-devops/cloud-computing\|design-ux/ui-ux-design\|product-process/software-development' lessons/AUTHORING.md` → 0 matches (no unprefixed §8 id survives)
- [ ] Command: `git diff -- lessons/AUTHORING.md | grep -c '^@@'` → record the number rather than expecting an exact value (at least 2: §1 and §8). What matters is that **no hunk falls outside §1 and the three §8 table cells** — if one does, revert that change and report it

### WP-6: Teach the validator the new topic names

**Context:**
`tools/validate-content.mjs` line 12 holds the eight topic slugs in a `TOPICS` array. It is used by
V1 (`if (!TOPICS.includes(e.topic))`) and by the `--write-index` block (line 336) to group and order
the output. Nothing else in the validator needs to change: the entry id is built from the directory
names, the slug regex already accepts `01-css`, and the child-name regex still matches `NN-slug.md`
because child filenames keep their own numbering.

**Task:**
Replace the `TOPICS` array with the 8 prefixed topic directory names in pedagogical order and run
the validator strictly on the renumbered corpus.

**Files:**
- `tools/validate-content.mjs` — MODIFY — the `TOPICS` constant on line 12

**Constraints:**
- DO: write the array exactly as `["01-cs-fundamentals", "02-frontend", "03-design-ux", "04-product-process", "05-backend-data", "06-cloud-devops", "07-security", "08-soft-skills"]`.
- DO: leave `SHAPES`, `WORDS`, `CHILDREN`, `INDEX_KEYS`, `CHILD_KEYS`, `CHILD_NAME` and every check untouched.
- DO: keep the comments and the file's LF endings.
- DO NOT: add new checks in this WP — the examples checks are WP-10.
- DO NOT: add a dependency or a `package.json`.
- DO NOT: reformat or re-indent the file.

**Success:**
- [ ] Command: `node --check tools/validate-content.mjs` → exit 0
- [ ] Command: `node tools/validate-content.mjs` → `177 present, 0 pending, 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --topic design-ux` → `0 present, 0 pending, 0 error(s)`, exit 0 (an unprefixed topic name now selects nothing at all, which proves the filter expects the prefixed names; `0 present` is the signal, not an error) — record the exact output in your report
- [ ] Command: `node tools/validate-content.mjs --strict` → `177 present, 0 pending, 0 error(s)`, exit 0

### WP-7: Regenerate INDEX.md

**Context:**
`lessons/INDEX.md` is generated by the `--write-index` block and still lists the old, unprefixed
paths. It groups by `TOPICS` and lists entries in inventory order, so after WP-3 and WP-6 the
generated output is already in pedagogical order with numbered, self-describing paths.

**Task:**
Run `node tools/validate-content.mjs --write-index` and confirm the regenerated `lessons/INDEX.md`
lists all 8 topics in pedagogical order with 177 links, no `(pending)` markers and the new paths.

**Files:**
- `lessons/INDEX.md` — REGENERATE — via `--write-index`

**Constraints:**
- DO: regenerate only with the command above — never hand-edit `INDEX.md`.
- DO: keep the final line the writer produces (`177 present, 0 pending`).
- DO NOT: add examples links yet — that is WP-10.
- DO NOT: change the writer's format in this WP.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --write-index` → exit 0
- [ ] Command: `grep -c '^- \[' lessons/INDEX.md` → `177`
- [ ] Command: `grep -c '(pending)' lessons/INDEX.md` → `0`
- [ ] Command: `grep -n '^## ' lessons/INDEX.md` → the 8 prefixed topic names in order
- [ ] Command: `grep -c '](cs-fundamentals/' lessons/INDEX.md` → `0` (no unprefixed link target survives; the rows themselves do contain the text `01-cs-fundamentals/`, so a bare `grep -c 'cs-fundamentals/'` would report `27` and prove nothing)
- [ ] Check: the first entry line under `## 01-cs-fundamentals` links to `01-cs-fundamentals/01-computer-science/index.md`

### WP-8: Retire the migration scripts

**Context:**
`.tmp/renumber.mjs` and `.tmp/rewrite-ids.mjs` are one-off migration tools. The durable record of
the migration is `tools/renumber-map.json` plus the rules now written into `AUTHORING.md` §1 and §8. The
backup `.tmp/lessons-backup/` must survive until the final audit (Phase 7) and is removed there.

**Task:**
Delete `.tmp/renumber.mjs`, `.tmp/rewrite-ids.mjs`, the throwaway `.tmp/a.json` from WP-2, and any
other scratch file in `.tmp/` created by this phase, leaving `.tmp/lessons-backup/` and
`tools/renumber-map.json` in place.

**Files:**
- `.tmp/renumber.mjs` — DELETE — one-off migration script
- `.tmp/rewrite-ids.mjs` — DELETE — one-off sweep script
- `tools/renumber-map.json` — KEEP — permanent old→new id record

**Constraints:**
- DO: keep `tools/renumber-map.json` — it is the only mapping record left and Phase 7's audit re-checks against it.
- DO: keep `.tmp/lessons-backup/` until Phase 7.
- DO: verify `node tools/validate-content.mjs --strict` still exits 0 after the deletions.
- DO NOT: delete `tools/inventory.json`, `tools/validate-content.mjs` or anything under `lessons/`.
- DO NOT: run `git` commands.

**Success:**
- [ ] Command: `ls .tmp/` → only `lessons-backup`
- [ ] Command: `test -f tools/renumber-map.json` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict` → `177 present, 0 pending, 0 error(s)`, exit 0

## Phase Verification

After all work packages are complete, run:

```bash
node --check tools/validate-content.mjs
node tools/validate-content.mjs --strict
node tools/validate-content.mjs --write-index
node tools/validate-content.mjs --strict
grep -c '^- \[' lessons/INDEX.md
ls lessons
node -e "const i=require('./tools/inventory.json');console.log(i.length, new Set(i.map(e=>e.id)).size)"
node -e "const m=require('./tools/renumber-map.json');console.log(Object.keys(m.entries).length, Object.keys(m.children).length)"
```

- [ ] `--strict` reports `177 present, 0 pending, 0 error(s)` and exits 0
- [ ] `lessons/` holds exactly the 8 prefixed topic dirs plus `AUTHORING.md` and `INDEX.md`
- [ ] `lessons/INDEX.md` has 177 links, 0 `(pending)`, and topics in pedagogical order
- [ ] Inventory is 177 entries, all ids unique, all ids prefixed
- [ ] The id map holds 177 entries and 224 children
- [ ] No unprefixed id survives in a lesson file: `grep -rEn '[^0-9a-z-](cs-fundamentals|frontend|design-ux|product-process|backend-data|cloud-devops|security|soft-skills)/' lessons --include=*.md | grep -v -e INDEX.md -e AUTHORING.md` → 0 matches (the bracket excludes the prefixed form, where the topic name is preceded by `NN-`; before the renumber this command finds roughly 1 970 lines)
- [ ] `.tmp/lessons-backup/` still exists and holds 403 `.md` files
