# Phase 7: Final audit

## Objective

Prove three things at once: no lesson file changed other than its ids, all 297 examples files obey
the contract, and the corpus is green under `--strict` with an index that reflects the new order.
Then remove the migration leftovers.

## Prerequisites

- Phases 1–6 complete.
- `.tmp/lessons-backup/` still holds the pre-renumber tree (403 `.md` files, 8 unprefixed topic dirs).
- `tools/renumber-map.json` still exists.

## Shared Context

`lessons/` is tracked in git as of commit `b362edd`, and the backup made in WP-3 is a byte-exact copy
of the same tree. The backup is the primary comparison here, because applying the id map to a copy is
exact and does not depend on git plumbing: it is the only way to prove that the id references were the
only change (WP-48 check 1). It is stated as a script because it compares 403 files.

**Note on git.** An unstaged directory rename is never reported as a rename: `git status --short`
shows ` D` for every old path (403 lines) and `??` for the eight new topic directories, and
`git diff --numstat` reports each old file as a whole-file deletion. No git command here is a usable
volume signal; compare against the backup instead. The most id-bearing lines in any single lesson
file is 11 (`03-design-ux/design-systems/index.md`), so the backup comparison plus a total line-count
identity is a complete volume proof.

The expected final numbers, all verified during planning: 8 topics, 177 entries, 401 lesson files,
297 examples files, 698 `.md` files under `lessons/` (401 + 297 + `AUTHORING.md` + `INDEX.md` is not
counted here — `698` is lesson files plus examples files).

## Work Packages

### WP-48: Prove only ids changed, and audit all 297 examples files

**Context:**
V5 catches word counts and V15 catches examples shape, but neither proves that the renumbering did
not silently alter lesson prose. Comparing against `.tmp/lessons-backup/` can: take each backed-up
file, apply the id map to it, and the result must be byte-identical to the current file.

**Task:**
Write `.tmp/audit.mjs` — a zero-dependency Node ESM script that performs three checks and prints a
report — and run it:

1. **Prose integrity.** For every `.md` file in `.tmp/lessons-backup/` except `INDEX.md`: map its
   backup path to the current path with `tools/renumber-map.json`, apply the same single-pass
   longest-first id replacement used in WP-4, and assert the result equals the current file's bytes
   exactly. Exceptions allowed: `AUTHORING.md` (edited by WP-5, WP-9 and WP-10) and `INDEX.md`
   (generated). Report any file that differs, with the first differing line.
2. **Examples contract.** For every `examples*.md` file under `lessons/`: assert 1–2 `## Example N — `
   headings numbered from 1, exactly one `### Solution` per example and it appears after its example
   heading, every opening fence carries a non-empty language tag, body words within 120–450, and no
   `https://`/`http://`. Report each violation with file and line.
3. **Counts.** Report: entries (must be 177), lesson files (401), examples files (297), examples
   files whose lesson file lacks `## Practice` (must be 0), full-shape lessons without an examples
   file (must be 0), and `.md` files under `lessons/` in total.

**Files:**
- `.tmp/audit.mjs` — CREATE — the audit script (deleted in WP-50)

**Constraints:**
- DO: read files as Buffers and compare Buffers — do not normalise line endings on either side.
- DO: reuse the id map, not a hand-typed list of ids.
- DO: print one summary line per check and a non-zero exit code if any check fails.
- DO: report violations with `path:line` so they can be fixed directly.
- DO NOT: modify any file under `lessons/` — this WP is read-only apart from the script.
- DO NOT: treat `AUTHORING.md` or `INDEX.md` as prose-integrity failures.
- DO NOT: use regex shorthand escapes inside a shell command; write the script to `.tmp/` and run the file.

**Success:**
- [ ] Command: `find lessons -mindepth 3 -name '*.md' | wc -l` → `401` (nothing was lost; `git status --short -- lessons` shows ` D` for each old path and `??` for the eight new topic directories because an unstaged rename is never detected — record those counts in your report)
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '*.md' | wc -l) <(find lessons -mindepth 3 -name '*.md' | wc -l)` → no output (`401` lesson files on both sides)
- [ ] Command: `diff <(find .tmp/lessons-backup -mindepth 3 -name '*.md' -exec cat {} + | wc -l) <(find lessons -mindepth 3 -name '*.md' -exec cat {} + | wc -l)` → no output (identical total line count over the 401 lesson files — the volume proof that no prose line was added or removed; no git command can supply this, and the maximum id-bearing line count in any single lesson file is 11)
- [ ] If the total line counts differ, locate the file: apply the id map to each backup file and diff the result against its current counterpart, then report which file changed and how — do not accept a mismatch just because check 1 has not run yet
- [ ] Command: `node .tmp/audit.mjs` → check 1 reports 0 differing files other than the two allowed
- [ ] If check 1 reports a differing file, inspect it and report which prose changed — do not silently accept it
- [ ] Command: `node .tmp/audit.mjs` → check 2 reports 0 violations
- [ ] Command: `node .tmp/audit.mjs` → check 3 reports `177 401 297 0 0`
- [ ] Command: `node .tmp/audit.mjs` → exit 0
- [ ] If check 2 reports a violation: fix that examples file and rerun until it reports 0, then record what was wrong

### WP-49: Regenerate the index and run the gate

**Context:**
`--write-index` was last run in WP-7, before any examples file existed. The index must now show both
the new order and the examples links, and it is the last file this plan writes under `lessons/`.

**Task:**
Run `node tools/validate-content.mjs --write-index`, then `node tools/validate-content.mjs --strict`,
and confirm each of the counts below.

**Files:**
- `lessons/INDEX.md` — REGENERATE — via `--write-index`

**Constraints:**
- DO: regenerate only with the command above; never hand-edit `INDEX.md`.
- DO: leave the corpus unchanged if the strict run reports an error — fix the reported file, then rerun both commands.
- DO NOT: change the validator, `AUTHORING.md` or any lesson body in this WP.
- DO NOT: run `git` commands.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --write-index` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Command: `grep -c '^- \[' lessons/INDEX.md` → `177`
- [ ] Command: `grep -c '(pending)' lessons/INDEX.md` → `0`
- [ ] Check: `grep -c '\[examples\]' lessons/INDEX.md` equals `find lessons -maxdepth 3 -name 'examples.md' | wc -l` (both count the entries whose own `index.md` is a full lesson — the `small` skills). Require the two numbers to be equal; record the value in your report rather than assuming it.
- [ ] Command: `grep -n '^## ' lessons/INDEX.md` → the 8 prefixed topic names in pedagogical order
- [ ] Command: `ls lessons` → the 8 prefixed topic dirs plus `AUTHORING.md` and `INDEX.md`

### WP-50: Clean up and report

**Context:**
`.tmp/lessons-backup/` and `.tmp/audit.mjs` exist only to make this plan safe and verifiable. Once
WP-48 and WP-49 pass, they are dead weight. `tools/renumber-map.json` stays: it is the only record
of the old ids, and the Russian plan does not need it but a future reader might.

**Task:**
Delete `.tmp/lessons-backup/` and `.tmp/audit.mjs`, confirm `.tmp/` is empty or absent, verify the
final state one last time, and report the outcome to the user as a short list: the 8 topics in
order, 177 entries, 401 lesson files, 297 examples files, the validator line, and the fact that
nothing was committed.

**Files:**
- `.tmp/lessons-backup/` — DELETE
- `.tmp/audit.mjs` — DELETE
- `tools/renumber-map.json` — KEEP
- `.tmp/` — DELETE if empty

**Constraints:**
- DO: delete only after WP-48 and WP-49 both pass — the backup is the only recovery path until then.
- DO: report the exact validator output line, not a paraphrase.
- DO: state plainly that nothing was committed and that the user handles git.
- DO NOT: delete `tools/renumber-map.json`, `tools/inventory.json` or `tools/validate-content.mjs`.
- DO NOT: update `.pi/CONTEXT.md` or `.pi/project-rules-memory.md` — the user runs their own memory skill at session end.
- DO NOT: run `git add`, `git commit` or `git push`.

**Success:**
- [ ] Command: `test -d .tmp/lessons-backup && echo still-there || echo gone` → `gone`
- [ ] Command: `ls .tmp` → empty or the directory does not exist
- [ ] Command: `test -f tools/renumber-map.json && echo kept` → `kept`
- [ ] Command: `node tools/validate-content.mjs --strict` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Report: the final summary is written out with the numbers above and the statement that nothing was committed

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --strict
node tools/validate-content.mjs --write-index
node tools/validate-content.mjs --strict
ls lessons
find lessons -name '*.md' | wc -l
find lessons -name 'examples*.md' | wc -l
```

- [ ] `--strict` reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0, before and after the index regeneration
- [ ] `find lessons -name '*.md' | wc -l` → `700` (401 lesson files + 297 examples files + `AUTHORING.md` + `INDEX.md`)
- [ ] `find lessons -name 'examples*.md' | wc -l` → `297`
- [ ] `ls lessons` shows the 8 prefixed topic directories in order
- [ ] `.tmp/` is gone and `tools/renumber-map.json` is present
- [ ] Nothing was committed and no remote was touched
