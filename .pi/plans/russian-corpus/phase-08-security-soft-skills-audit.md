# Phase 8: 07-security, 08-soft-skills and audit

## Objective

Mirror the last two topics — 23 files for `07-security` and 24 for `08-soft-skills` — then prove the
Russian corpus mirrors the English one structurally, generate its index, and hand the result to the
user for review.

## Prerequisites

- Phase 7 complete: `node tools/validate-content.mjs --topic 06-cloud-devops --lang ru` reports
  `0 error(s)` and the Russian cloud-devops count is `102`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Topic-specific additions for the security entries:

- Security vocabulary has settled Russian forms — `уязвимость`, `угроза`, `аутентификация`,
  `авторизация`, `токен`, `шифрование`, `сертификат`, `секрет`, `согласие`, `персональные данные`,
  `срок хранения`, `разграничение доступа`. Use them consistently.
- Standards and class names stay in Latin script: OWASP, XSS, CSRF, SQL-инъекция may be written with
  the Russian suffix, `CSP`, `TLS`, `GDPR`, `SCA`, `CVE`.
- `https-tls` and `content-security-policy-csp` are the two entries most likely to tempt a URL.
  There is none: describe the scheme and the host in words, and keep the CSP header value a value,
  not a link.
- Never write a working exploit, a real secret, a key or a token, even a fake-looking one.

**Command after every entry:**
`node tools/validate-content.mjs --topic 07-security --lang ru`
`node tools/validate-content.mjs --topic 08-soft-skills --lang ru`

## Work Packages

### WP-38: Mirror all seven security entries

**Context:**
`01-web-security-owasp-top-10`, `02-https-tls` and `05-gdpr-data-privacy` are `medium` with two
children each; `03-secrets-management`, `04-dependency-scanning-sca`,
`06-content-security-policy-csp` and `07-data-ethics` are `small` with `index.md` and `examples.md`
each.

**Task:**
Create the 23 Russian files for the seven directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/07-security/01-web-security-owasp-top-10` | `index.md`, `01-injection-and-access-control.md`, `02-cross-site-scripting-and-the-browser-side-classes.md`, two matching `examples.*` | 5 |
| `lessons/07-security/02-https-tls` | `index.md`, `01-certificates-and-the-handshake.md`, `02-why-plain-http-is-a-hard-fail.md`, two matching `examples.*` | 5 |
| `lessons/07-security/03-secrets-management` | `index.md`, `examples.md` | 2 |
| `lessons/07-security/04-dependency-scanning-sca` | `index.md`, `examples.md` | 2 |
| `lessons/07-security/05-gdpr-data-privacy` | `index.md`, `01-lawful-basis-consent-and-retention.md`, `02-the-right-to-be-forgotten-in-a-database.md`, two matching `examples.*` | 5 |
| `lessons/07-security/06-content-security-policy-csp` | `index.md`, `examples.md` | 2 |
| `lessons/07-security/07-data-ethics` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the parameterised-versus-concatenated query example intact as code, with only its comments translated.
- DO: keep the dependency-finding table's package names, versions and severity labels in Latin script.
- DO: keep the retention-period arithmetic and the consent wording decisions exactly as the English files have them — they are the substance of the lesson.
- DO: write sample UI consent and privacy strings as natural Russian; they are artefacts, not code.
- DO NOT: create `examples.md` for the three `medium` indexes.
- DO NOT: edit anything under `lessons/07-security/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 07-security --lang ru` → `7 present`, `10 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/07-security -name '*.md' | wc -l` → `23`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/07-security` → 0 matches

### WP-39: Mirror all nine soft-skills entries

**Context:**
`01-communication` and `08-freelancing-client-work` are `medium` with two children each;
`02-teamwork-collaboration`, `03-mentoring`, `04-problem-solving`, `05-time-management`,
`06-portfolio-building`, `07-interview-prep-whiteboarding` and `09-technical-presentation` are
`small` with `index.md` and `examples.md` each. Every artefact in this topic is prose — a dialogue, a
written reply, a plan, a whiteboard sketch.

**Task:**
Create the 24 Russian files for the nine directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/08-soft-skills/01-communication` | `index.md`, `01-explaining-to-any-audience.md`, `02-disagreeing-productively.md`, two matching `examples.*` | 5 |
| `lessons/08-soft-skills/02-teamwork-collaboration` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/03-mentoring` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/04-problem-solving` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/05-time-management` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/06-portfolio-building` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/07-interview-prep-whiteboarding` | `index.md`, `examples.md` | 2 |
| `lessons/08-soft-skills/08-freelancing-client-work` | `index.md`, `01-scoping-and-pricing.md`, `02-contracts-and-getting-paid.md`, two matching `examples.*` | 5 |
| `lessons/08-soft-skills/09-technical-presentation` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: translate the sample dialogues and written replies so they read as Russian workplace speech — not as a literal rendering of English sentences.
- DO: keep every artefact in a `text` fence, as the English file does.
- DO: keep currency figures and negotiation numbers exactly as the English files have them.
- DO: keep the mentoring exemplar's structure (two examples, one solution each) mirrored, not reinterpreted.
- DO: use `Готово, когда:` for every `Done when:` line.
- DO NOT: create `examples.md` for the two `medium` indexes.
- DO NOT: edit anything under `lessons/08-soft-skills/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills --lang ru` → `9 present`, `11 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/08-soft-skills -name '*.md' | wc -l` → `24`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/08-soft-skills` → 0 matches

### WP-40: Audit the Russian corpus against the English one

**Context:**
V15, V16 and V17 check the Russian files internally. They cannot check that the Russian tree mirrors
the English one: that every English file has exactly one Russian twin, that the same fences appear in
the same order with the same language tags, and that frontmatter values that must not change did not.
That comparison needs a script over both trees.

**Task:**
Write `.tmp/ru-audit.mjs` — a zero-dependency Node ESM script — and run it. It must report, and exit
non-zero if any of these fail:

1. **Mirror completeness.** For every `.md` file under `lessons/` excluding `lessons/AUTHORING.md`, `lessons/INDEX.md` and everything under `lessons/ru/`: an identical relative path exists under `lessons/ru/`. And conversely, no Russian file lacks an English original. The two file counts must be equal.
2. **Structure.** For each pair: the same number of `##` headings, in the same shape order; the same ordered list of fence language tags; the same set of backticked ids; the same ordered `<!--` -free content — report the first differing line for any mismatch.
3. **Frontmatter invariants.** For each pair: `type`, `tier`, `topic`, `aliases`, `prereqs`, `related` and `status` are byte-identical; the key order is identical; a child's keys are exactly `title`, `prereqs`; an examples file starts with `## Пример 1 — ` and has no frontmatter.
4. **Bands and markers.** Every Russian body is inside its band (full 400–1100, landing 180–460, area 100–340, examples 100–500); every `Практика` section contains a `Готово, когда:` line; every `Частые ошибки` bullet matches the `; исправить: ` shape; an empty `Предварительные требования` body reads `Нет.`.
5. **Glossary usage.** Every Russian `title` in an `index.md` appears verbatim in `lessons/ru/GLOSSARY.md`, and every Russian title referenced in a `**…**` bullet matches its target's Russian `title`.

**Files:**
- `.tmp/ru-audit.mjs` — CREATE — the audit script (deleted in WP-41)

**Constraints:**
- DO: build both trees by walking the filesystem, not from a hard-coded list of 698 paths.
- DO: read files as Buffers or as utf8 without newline normalisation; compare exactly.
- DO: print one summary line per check, then the offending `path:line` lines, then exit non-zero if any check failed.
- DO: treat `GLOSSARY.md` as a Russian-only file with no English twin, and exclude it from check 1.
- DO NOT: modify any file under `lessons/` — this WP is read-only apart from the script.
- DO NOT: use regex shorthand escapes inside a shell command; write the script to `.tmp/` and run the file.

**Success:**
- [ ] Command: `node .tmp/ru-audit.mjs` → check 1 reports 698 Russian files, 698 English files, 0 missing, 0 orphans
- [ ] Command: `node .tmp/ru-audit.mjs` → check 2 reports 0 structural mismatches
- [ ] Command: `node .tmp/ru-audit.mjs` → check 3 reports 0 frontmatter mismatches
- [ ] Command: `node .tmp/ru-audit.mjs` → check 4 reports 0 out-of-band bodies and 0 missing markers
- [ ] Command: `node .tmp/ru-audit.mjs` → check 5 reports 0 titles missing from the glossary and 0 bullet mismatches
- [ ] Command: `node .tmp/ru-audit.mjs` → exit 0
- [ ] If any check fails: fix the offending file and rerun, recording what was wrong

### WP-41: Generate the indexes, run both gates, clean up and hand over

**Context:**
`lessons/ru/INDEX.md` was written in Phase 1 when only the exemplar existed and is now stale. The
English index must also be regenerated, because `--write-index` writes the root it is pointed at and
the English one is unchanged but must be proven so.

**Task:**
Regenerate both indexes, run both strict gates, delete the audit script, and write a short handover
report to the user listing: the two validator lines, the file counts, the four or five terminology
decisions recorded in `GLOSSARY.md`, and the fact that every Russian entry is `status: drafted` and
awaits review, with nothing committed.

**Files:**
- `lessons/ru/INDEX.md` — REGENERATE — via `--write-index --lang ru`
- `lessons/INDEX.md` — REGENERATE — via `--write-index --lang en`
- `.tmp/ru-audit.mjs` — DELETE
- `lessons/ru/GLOSSARY.md` — MODIFY only if the audit found an unrecorded term — append the term and its agreed rendering

**Constraints:**
- DO: run `--write-index` once per language; never hand-edit either index.
- DO: report the exact validator output lines, not a paraphrase.
- DO: state plainly that nothing was committed and that the user handles git.
- DO: state that promotion from `drafted` to `reviewed` is the user's action, not the executor's.
- DO NOT: delete `lessons/ru/GLOSSARY.md` — it is a durable artefact.
- DO NOT: edit the English corpus, `seed/**` or `.pi/plans/**`.
- DO NOT: update `.pi/CONTEXT.md` or `.pi/project-rules-memory.md` — the user runs their own memory skill at session end.
- DO NOT: run `git add`, `git commit` or `git push`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --write-index --lang ru` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang ru` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --write-index --lang en` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → the same line as before, exit 0
- [ ] Command: `grep -c '^- \[' lessons/ru/INDEX.md` → `177`
- [ ] Command: `grep -c '(pending)' lessons/ru/INDEX.md` → `0`
- [ ] Command: `ls .tmp` → empty or the directory does not exist
- [ ] Report: the handover summary is written out with both validator lines, the counts, the terminology decisions and the draft-status statement

## Phase Verification

After all four work packages are complete, run:

```bash
node tools/validate-content.mjs --strict --lang ru
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --lang all
find lessons/ru -name '*.md' | wc -l
find lessons -name '*.md' | wc -l
grep -rn '(https\|http)' lessons/ru
```

- [ ] The Russian gate reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0
- [ ] The English gate reports the same shape and exits 0
- [ ] `--lang all` prints both roots' summary lines with 0 errors
- [ ] `find lessons/ru -name '*.md' | wc -l` → `700` (698 mirrored files + `GLOSSARY.md` + `INDEX.md`)
- [ ] The URL grep reports nothing anywhere under `lessons/ru/`
- [ ] `lessons/ru/INDEX.md` lists all 177 entries with no `(pending)` marker and links to `lessons/ru/...` paths
