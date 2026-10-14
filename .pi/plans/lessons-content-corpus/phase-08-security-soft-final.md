# Phase 8: Security, Soft Skills & Final Audit (16 entries, 26 files)

## Objective

Close the corpus. Sixteen entries remain across two small topics: `security` (7
entries) and `soft-skills` (9). Then run the audit that turns "all the files exist"
into "the corpus is valid": `--strict` with zero pending entries, a generated
`lessons/INDEX.md`, and a full-corpus consistency pass. Four work packages.

## Prerequisites

- Phase 7 complete and verified: `node tools/validate-content.mjs` reports
  `161 present, 16 pending, 0 error(s)`
- `frontend/package-management-npm` (Phase 2),
  `cloud-devops/networking-fundamentals-http-dns-tls` (Phase 4) and
  `design-ux/user-research` (Phase 6) all exist — three of this phase's prereqs point
  at them

## Shared Context

Read `lessons/AUTHORING.md` first. Read `lessons/design-ux/usability-testing/index.md`
as the pattern for a medium track whose subject is a human practice rather than a tool,
and `lessons/frontend/lighthouse/index.md` as the pattern for a short entry about a
single instrument.

Source: `seed/security.md` (sections `## Web security`, `## Privacy & ethics`) and
`seed/soft-skills.md` (sections `## Working with people`, `## Getting things done`,
`## Career`).

**Topic-specific constraint:** the soft-skills entries are the easiest place in the
corpus to produce platitudes. Every one of them must contain at least one concrete
practice with a `Done when:` condition that could actually be met — a script for a
difficult conversation, a 25-minute focus block, a two-minute talk outline. The
security entries must in turn stay actionable: each names the specific misconfiguration
or design mistake it prevents.

Coverage for this phase: 16 entries (7 security + 9 soft-skills), none written yet.

## Work Packages

### WP-35: Web security

**Context:**
Five entries from `seed/security.md`, section `## Web security`, per
`tools/inventory.json`: `security/web-security-owasp-top-10` (medium, no prereqs, alias
`OWASP`), `security/https-tls` (medium, prereq
`cloud-devops/networking-fundamentals-http-dns-tls`, alias `TLS`),
`security/content-security-policy-csp` (small, prereqs
`security/web-security-owasp-top-10`, `security/https-tls`, alias `CSP`),
`security/secrets-management` (small), `security/dependency-scanning-sca` (small,
prereq `frontend/package-management-npm`, alias `SCA`). Two `medium` → 2 children
each; three small → none.

**Task:**
Create these 9 files:

- `lessons/security/web-security-owasp-top-10/index.md` + 2 children
- `lessons/security/https-tls/index.md` + 2 children
- `lessons/security/content-security-policy-csp/index.md` — full lesson
- `lessons/security/secrets-management/index.md` — full lesson
- `lessons/security/dependency-scanning-sca/index.md` — full lesson

**Files:**
- `lessons/security/web-security-owasp-top-10/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/security/https-tls/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/security/content-security-policy-csp/index.md` — CREATE
- `lessons/security/secrets-management/index.md` — CREATE
- `lessons/security/dependency-scanning-sca/index.md` — CREATE

**Constraints:**
- DO: make the OWASP entry's children the injection and access-control classes, then
  XSS and the browser-side classes — per the seed line's "injection, broken access
  control, XSS". Name the specific mistake and the specific fix for each
- DO: make the HTTPS/TLS entry's children certificates and the handshake, then why
  plain HTTP is a hard fail; link to `cloud-devops/networking-fundamentals-http-dns-tls`
  for the protocol layer rather than repeating it
- DO: write `content-security-policy-csp` as "browser rules that block injected and
  third-party scripts", per the seed line, with one policy for a real page as the exercise
- DO: make `secrets-management` about keeping keys out of the repository and rotating
  them, per the seed line, and include the git-history problem explicitly — the place
  most readers will have already failed
- DO: make `dependency-scanning-sca` about watching the package tree for
  known-vulnerable versions, per the seed line, and state clearly that a scanner
  reports exposure, it does not fix it
- DO NOT: present a scanner or a linter as a substitute for the design decisions in the
  OWASP entry
- DO NOT: include any external URL, including OWASP's own site

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic security` → `5 present, 2 pending, 0 error(s)`
- [ ] Both tracks have 2 children each:
  `ls lessons/security/{web-security-owasp-top-10,https-tls} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] No external URL: `grep -rcE 'https?://' lessons/security/ | grep -v ':0'` → no output

---

### WP-36: Privacy, ethics and working with people

**Context:**
A deliberately mixed batch of five entries that share one subject — the obligation you
have to other people. Two come from `seed/security.md`, section `## Privacy & ethics`;
three from `seed/soft-skills.md`, section `## Working with people`. Per
`tools/inventory.json`: `security/gdpr-data-privacy` (medium, no prereqs, alias
`GDPR`), `security/data-ethics` (small, prereq `security/gdpr-data-privacy`),
`soft-skills/communication` (medium, no prereqs),
`soft-skills/teamwork-collaboration` (small), `soft-skills/mentoring` (small). Two
`medium` → 2 children each; three small → none.

**Task:**
Create these 9 files:

- `lessons/security/gdpr-data-privacy/index.md` + 2 children
- `lessons/security/data-ethics/index.md` — full lesson
- `lessons/soft-skills/communication/index.md` + 2 children
- `lessons/soft-skills/teamwork-collaboration/index.md` — full lesson
- `lessons/soft-skills/mentoring/index.md` — full lesson

**Files:**
- `lessons/security/gdpr-data-privacy/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/security/data-ethics/index.md` — CREATE
- `lessons/soft-skills/communication/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/soft-skills/teamwork-collaboration/index.md` — CREATE
- `lessons/soft-skills/mentoring/index.md` — CREATE

**Constraints:**
- DO: make the GDPR entry's children lawful basis, consent and retention, then the
  right to be forgotten and how it reaches a database — per the seed line
- DO: make `data-ethics` about what you *should* collect, infer and do with data beyond
  what is legal, per the seed line, with one concrete grey-area scenario worked through
- DO: make `communication`'s children explaining clearly to technical and
  non-technical people alike, then the harder case — disagreeing productively; the
  second is the `Done when:` exercise
- DO: write one reusable difficult-conversation script in
  `teamwork-collaboration` — sharing context, unblocking others, disagreeing without
  stalling, per the seed line
- DO: make `mentoring` about reviewing, pairing and growing someone else's skill, per
  the seed line, including when to let someone struggle
- DO NOT: give legal advice — state what the obligations require of an engineer, not how
  to interpret the regulation in an edge case
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic security` → `7 present, 0 pending, 0 error(s)`
- [ ] Validator: `node tools/validate-content.mjs --topic soft-skills` → `3 present, 6 pending, 0 error(s)`
- [ ] Both tracks have 2 children each:
  `ls lessons/security/gdpr-data-privacy lessons/soft-skills/communication | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Every **full-lesson** file in this batch has at least one `Done when:` line — landing pages have no `## Practice` section, so they are excluded:
  `grep -c 'Done when:' lessons/security/data-ethics/index.md lessons/security/gdpr-data-privacy/0*.md lessons/soft-skills/communication/0*.md lessons/soft-skills/teamwork-collaboration/index.md lessons/soft-skills/mentoring/index.md` → `≥1` for each listed file
- [ ] No external URL: `grep -rcE 'https?://' lessons/security/ lessons/soft-skills/ | grep -v ':0'` → no output

---

### WP-37: Getting things done and career

**Context:**
The final six entries, all from `seed/soft-skills.md`: three from
`## Getting things done` and `## Career` combined, per `tools/inventory.json`:
`soft-skills/problem-solving` (small), `soft-skills/time-management` (small),
`soft-skills/technical-presentation` (small, prereq `soft-skills/communication`),
`soft-skills/portfolio-building` (small),
`soft-skills/interview-prep-whiteboarding` (small, alias `Whiteboarding`),
`soft-skills/freelancing-client-work` (medium, alias `Freelancing`). One `medium` → 2
children; five small → none. This closes the topic and the corpus.

**Task:**
Create these 8 files:

- `lessons/soft-skills/problem-solving/index.md` — full lesson
- `lessons/soft-skills/time-management/index.md` — full lesson
- `lessons/soft-skills/technical-presentation/index.md` — full lesson
- `lessons/soft-skills/portfolio-building/index.md` — full lesson
- `lessons/soft-skills/interview-prep-whiteboarding/index.md` — full lesson
- `lessons/soft-skills/freelancing-client-work/index.md` + 2 children

**Files:**
- `lessons/soft-skills/problem-solving/index.md` — CREATE
- `lessons/soft-skills/time-management/index.md` — CREATE
- `lessons/soft-skills/technical-presentation/index.md` — CREATE
- `lessons/soft-skills/portfolio-building/index.md` — CREATE
- `lessons/soft-skills/interview-prep-whiteboarding/index.md` — CREATE
- `lessons/soft-skills/freelancing-client-work/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `problem-solving` about breaking an unclear problem down until it is
  actionable, per the seed line, with one messy real problem decomposed as the worked
  example
- DO: make `time-management` about estimating, prioritising and protecting focus time,
  per the seed line, and make the focus-protection half concrete (blocks, notifications,
  saying no)
- DO: make `technical-presentation` about presenting work and decisions so a room can
  follow and decide, per the seed line, with a reusable five-slide outline as the
  exercise
- DO: make `portfolio-building` about case studies that show the thinking, not just the
  screenshots, per the seed line — that contrast is the lesson
- DO: make `freelancing-client-work`'s children scoping and pricing, then contracts and
  getting paid, per the seed line's "clients who actually pay"
- DO: note in `interview-prep-whiteboarding` that practice under observation is the
  skill, and cross-reference `cs-fundamentals/data-structures` for the technical half
- DO NOT: write motivational content — every entry ends in something the reader does
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic soft-skills` → `9 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/soft-skills -name '*.md' | wc -l` → `13`
- [ ] `freelancing-client-work` has 2 children:
  `ls lessons/soft-skills/freelancing-client-work | grep -c '^[0-9][0-9]-'` → `2`
- [ ] No external URL: `grep -rcE 'https?://' lessons/soft-skills/ | grep -v ':0'` → no output

---

### WP-38: Final audit and generated index

**Context:**
All 177 entries exist after WP-37. Two things remain: a strict full-corpus validation
and a readable index. `lessons/INDEX.md` is **generated** by
`node tools/validate-content.mjs --write-index` (implemented in WP-3, check V13) and
must never be hand-edited — it is the machine's view of coverage, and the human-readable
equivalent already exists as this plan's `inventory.md`.

The audit exists to catch cross-topic drift that per-topic validation cannot see:
prereq edges that only resolve once a later topic is written, entries whose `related`
lists point at re-tiered entries, and the Phase 1 pilot entries that were written
before the bulk pattern settled.

**Task:**
1. Run the strict validation and fix every reported error.
2. Generate `lessons/INDEX.md` with `--write-index`.
3. Run the corpus-wide consistency checks below and fix anything they find:
   - every inventory id has a directory and an `index.md`;
   - every `prereqs` and `related` target resolves to an existing id;
   - no file in `lessons/` contains `http://` or `https://`;
   - no `status:` value is anything other than `drafted` (the user promotes entries);
   - no lesson prose calls an entry "pending": a lesson points its reader at a prereq by
     id, it never describes it as not yet written;
   - the three area pages named in the merge table exist and carry their aliases;
   - the four Phase 1 pilot files were not bypassed by the bulk phases.

**Files:**
- `lessons/INDEX.md` — CREATE — generated index (never edit by hand afterwards)

**Constraints:**
- DO: fix errors by editing the offending lesson, never by editing
  `tools/inventory.json` or `tools/validate-content.mjs` — those two are frozen
- DO: leave every entry at `status: drafted`; promotion to `reviewed` is the user's
- DO: report the final counts in your summary: entries present, files, total words
- DO NOT: commit. The user commits.
- DO NOT: start the website plan — `astro/`, Tailwind, React and Pagefind are
  explicitly out of scope for this plan
- DO NOT: hand-edit `lessons/INDEX.md` after generating it

**Success:**
- [ ] Strict validation passes: `node tools/validate-content.mjs --strict; echo "exit=$?"` → `177 present, 0 pending, 0 error(s)` and `exit=0`
- [ ] Index generated: `test -f lessons/INDEX.md` → exit 0
- [ ] Index covers the corpus: `grep -c '^- \[' lessons/INDEX.md` → `177`
- [ ] Index has no pending marker: `grep -c '(pending)' lessons/INDEX.md` → `0`
- [ ] Eight topic directories: `ls -d lessons/*/ | wc -l` → `8` (the topic directories; `AUTHORING.md` and `INDEX.md` are files inside `lessons/`, not directories)
- [ ] 177 entry directories exist: `find lessons -name index.md | wc -l` → `177`
- [ ] 401 content files: `find lessons -name '*.md' | wc -l` → `403` (401 entries + `AUTHORING.md` + `INDEX.md`)
- [ ] No external URL anywhere: `grep -rlE 'https?://' lessons/ | wc -l` → `0`
- [ ] No status other than `drafted`: `grep -rh '^status:' lessons/ | sort -u` → `status: drafted` only
- [ ] No stale execution-order wording in the lessons themselves:
      `grep -rni 'pending' lessons/*/ --include='*.md'` → no output (`lessons/INDEX.md`
      and `lessons/AUTHORING.md` are excluded on purpose: the generated index reports a
      pending count, and the spec documents the validator's `--strict` behaviour)
- [ ] `seed/` untouched: `git status --short -- seed/` → no output

---

## Phase Verification

After WP-35 through WP-38 are complete, run:

```bash
node tools/validate-content.mjs --strict; echo "exit=$?"
node --check tools/validate-content.mjs
find lessons -name index.md | wc -l
find lessons -name '*.md' | wc -l
grep -rlE 'https?://' lessons/ | wc -l
grep -rh '^status:' lessons/ | sort -u
git status --short
```

- [ ] The corpus is complete and valid: `177 present, 0 pending, 0 error(s)`, `exit=0`
- [ ] 177 `index.md` files and 403 `.md` files under `lessons/`
- [ ] Zero files contain an external URL
- [ ] The only `status:` value in the corpus is `drafted`
- [ ] `git status --short` shows only additions under `lessons/` and `tools/`, plus
      this plan's own files under `.pi/` — nothing under `seed/`
- [ ] Word-total sanity check:
      `cat $(find lessons -name '*.md') | wc -w` → between 200,000 and 320,000 words
      (the tier map predicts roughly 240,000; a figure far outside this band means a
      tier was ignored or a lesson was padded)
- [ ] Manual spot-check: pick three entries at random with
      `find lessons -name index.md | shuf | head -3`, read them, and confirm they read
      as one corpus written to one contract

## Handover

This plan ends here. Two follow-ups are deliberately out of scope and belong to a
separate plan:

1. **The website** — `astro/` subdirectory, Astro 7 + Tailwind 4 + React islands +
   TypeScript + Pagefind, consuming `lessons/` as a content collection with a Zod schema
   mirroring `lessons/AUTHORING.md`. The `lessons/INDEX.md` generator becomes redundant
   once the site can render its own index.
2. **Promotion to `reviewed`** — reading the corpus and flipping `status` per entry.
   This is the user's work, not the executor's.

The `seed/` directory stays in the repository as the archive of the original list.
