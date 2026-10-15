# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, now mirrored into Russian, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints.

Last updated: 2026-10-15

## Current Task
**Plan B (`.pi/plans/russian-corpus/`) is complete and green.** All 8 phases and 41 work packages are
done and nothing is in flight. What remains is a decision, not a task: commit the result, then
optionally review Russian prose quality.

## Completed This Session
- [x] **Phase 1 — Russian toolkit (WP-1…WP-5).** Made `tools/validate-content.mjs` root-aware
  (`--lang en|ru|all`, `runRoot()`, `writeIndexFor()`, `mkdirSync`), added Russian `SHAPES`/`WORDS`/
  literals and check **V17**, wrote `lessons/AUTHORING.md` **§13**, created `lessons/ru/GLOSSARY.md`
  (43 terminology rows + all 177 entry titles) and the exemplar `01-cs-fundamentals/04-database-internals/`.
- [x] **Phases 2–8 — the whole corpus (WP-6…WP-39).** 698 mirrored files under `lessons/ru/`:
  `01-cs-fundamentals` 108, `02-frontend` 133, `03-design-ux` 156, `04-product-process` 61,
  `05-backend-data` 91, `06-cloud-devops` 102, `07-security` 23, `08-soft-skills` 24.
  Ran as async `worker` subagent fan-outs, ≤4 concurrent, one work package per worker in disjoint
  entry directories; the parent re-ran the topic validator at every WP boundary.
- [x] **WP-40 audit** (`.tmp/ru-audit.mjs`, since deleted) → `AUDIT PASSED`, exit 0:
  `698 Russian files, 698 English files, 0 missing, 0 orphans`; checks 2–5 all `0`.
- [x] **WP-41 handover** — both indexes regenerated (`--write-index --lang ru` / `--lang en`),
  both strict gates green, `.tmp/` removed entirely.
- [x] **Both objective lines hold**: `--strict --lang ru` and `--strict --lang en` each report
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0.

## In Progress
- [ ] **Nothing part-written. Plan B is closed.**

## Blocked / Needs Decision
- [?] **The work is uncommitted.** 698 new files under `lessons/ru/` plus modified
  `tools/validate-content.mjs` and `lessons/AUTHORING.md` exist only in the working tree.
  The user handles all git.
- [?] **No prose quality review of the 698 Russian files has been done.** Every structural gate
  passes; nothing has read the Russian for style, idiom or depth. They are all `status: drafted`.
- [?] Whether to correct Plan B's errata inside `.pi/plans/russian-corpus/` now that execution has
  ended (see Gotchas).

## Next Steps
1. Ask the user to commit.
2. If wanted, fix the Plan B errata in `.pi/plans/russian-corpus/` (execution is over, so
   `.pi/plans/**` is no longer read-only).
3. Only when the user asks: a Russian prose-quality pass, promoting entries from `drafted` to
   `reviewed`.

## Key Decisions
- **Delegation pattern for translation:** each work package → one `worker` subagent, ≤4 in parallel,
  disjoint entry directories, `write` once per file; the shared contract was `.tmp/brief-ru.md`
  (deleted at the end). The parent owned every validator run and every scope decision; workers were
  told to ignore `pending` counts and any error naming a file they did not create.
- **Idiomatic Russian over literal translation**, with the fixed heading vocabulary from
  `AUTHORING.md` §13 and the terminology table in `lessons/ru/GLOSSARY.md` as the contract.
- **Ids stay language-free** — English `topic`/`prereqs`/`related` and directory names are never
  translated; only `title` and prose are.
- **Target-file-wins on child-title conflicts.** `GLOSSARY.md` records entry titles only, so child
  lesson titles were authored per-file and reused verbatim by parents; when two workers disagreed,
  the child file's own `title` won and the parent bullet was edited to match.
- **Design-pattern names are Russian** (Стратегия, Адаптер, Наблюдатель, Фабрика, Декоратор, Одиночка).
- **MD041 on every examples file is the deliberate §12 deviation**; do not "fix" it.

## File Map
- `lessons/ru/**` — 698 mirrored files created this session (401 lesson + 297 examples), all
  `status: drafted`, one per English file, same relative paths, nothing renamed or added.
- `lessons/ru/GLOSSARY.md` — 43 terminology rows + 177 entry titles.
- `lessons/ru/INDEX.md` — regenerated; 177 rows, 0 `(pending)`, labels are Russian titles.
- `tools/validate-content.mjs` — MODIFIED (+338/−115): `--lang en|ru|all`, per-language
  `SHAPES`/`WORDS`/literals, check V17.
- `lessons/AUTHORING.md` — MODIFIED (+59): new §13 "The Russian corpus".
- `lessons/INDEX.md` — regenerated unchanged (no diff).
- `.tmp/` — created, used and removed; does not exist.

## Gotchas / Warnings
- **Never edit `seed/**`, never `git add`/`commit`/`push`** — the user handles all git.
- **`grep '(https\|http)'` is a NO-OP in this repo's grep** (this build does not support BRE `\|`
  alternation, so it searches for the literal string). Every URL check in the plans that uses that
  pattern verified nothing. Use `grep -rnE 'https?://'`; the authoritative check is the validator's
  V6. `lessons/ru` has 0 real URLs, and 68 lines legitimately contain the bare substring `http`
  (`http_requests_total`, `HttpClient`, `http/handler.ts`, the id `…networking-fundamentals-http-dns-tls`).
- **A transient `[V8]`/`[V9]`/`[V15]` error naming a file you did not create is normal during a
  parallel fan-out** — another writer is mid-file. Verify only your own files, then re-run the topic
  validator once all writers have stopped.
- **`--topic` needs the prefixed directory name** (`07-security`), or the run selects nothing.
  The Russian root needs `--lang ru` (the default is `en`).
- **V17 compares a `**Title**` bullet to the target file's `title` and skips a missing target**, so
  it validates cross-references only where both ends exist. Child titles are *not* centrally locked.
- **The Russian root skips V3's `title` comparison** (`currentLang === "ru"`); type/tier/topic/
  prereqs/aliases/related/status are still compared, and the English root still compares titles.
- **Plan B errata, reported but not applied**: WP-5's `2 examples` is really `1`; Phase 1's
  `find … = 3` is really `4` (INDEX.md matches `*.md`); `Что это такое` is full/landing only, an area
  page keeps the English four headings; WP-2's "skip V17 if the target is not yet Russian" had to be
  skip-on-missing-target; Phase 5 writes `стори-поинт` where the glossary says `story points`.
- **The one real mirror defect the audit caught**: two `text` fences in
  `05-backend-data/03-python-programming/` had been changed to `py`; restored.
- **The WP-40 audit script is gone.** `AUDIT PASSED` cannot be re-produced without rewriting it.
