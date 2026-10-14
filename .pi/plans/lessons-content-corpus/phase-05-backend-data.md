# Phase 5: Backend & Data (19 entries, 53 files)

## Objective

Write every `backend-data` entry. This topic resolves the corpus's most-pointed
cross-topic edge: `cs-fundamentals/database-internals` (written in Phase 3) declares
`backend-data/sql-relational-databases` as a prereq, and WP-22 finally creates it.
It also holds three of the 15 `large` entries — `python-programming`, `java` and
`sql-relational-databases`. Four batches: languages, APIs, data, architecture.

## Prerequisites

- Phase 4 complete and verified: `node tools/validate-content.mjs` reports
  `81 present, 96 pending, 0 error(s)`
- `cs-fundamentals/database-internals` exists and its `## Go deeper` names
  `backend-data/sql-relational-databases` (it was written in WP-12 with that id)

## Shared Context

Read `lessons/AUTHORING.md` first. Read `lessons/frontend/typescript/index.md` as a
large-track landing pattern and `lessons/cloud-devops/docker/index.md` as a medium
track pattern.

Source: `seed/backend-data.md` (read-only), sections `## Languages & runtime`,
`## APIs & integration`, `## Data`, `## Architecture`.

Coverage for this topic: 19 entries, none written yet. Cross-topic prereqs into this
topic come from Phase 3 (`cs-fundamentals/database-internals`) and Phase 4 (none).
Cross-topic prereqs *out* of this topic go to `frontend/javascript` (exists) and
`cs-fundamentals/*` (exist).

## Work Packages

### WP-20: Languages and runtime

**Context:**
Six entries from `seed/backend-data.md`, section `## Languages & runtime`, per
`tools/inventory.json`: `backend-data/nodejs` (medium, prereq `frontend/javascript`,
aliases `Node.js`, `Node`), `backend-data/expressjs` (small, prereq `backend-data/nodejs`,
alias `Express`), `backend-data/python-programming` (large, no prereqs, alias
`Python`), `backend-data/java` (large, no prereqs), `backend-data/go` (medium, no
prereqs, alias `Golang`), `backend-data/server-side` (area, alias
`Server-Side Development`). Two `large` → 4 children each; two `medium` → 2 each;
one small + one area → none.

**Task:**
Create these 18 files:

- `lessons/backend-data/nodejs/index.md` + 2 children
- `lessons/backend-data/expressjs/index.md` — full lesson
- `lessons/backend-data/python-programming/index.md` + 4 children
- `lessons/backend-data/java/index.md` + 4 children
- `lessons/backend-data/go/index.md` + 2 children
- `lessons/backend-data/server-side/index.md` — area page

**Files:**
- `lessons/backend-data/nodejs/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/expressjs/index.md` — CREATE
- `lessons/backend-data/python-programming/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/backend-data/java/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/backend-data/go/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/server-side/index.md` — CREATE — area page

**Constraints:**
- DO: give `expressjs` the inventory title `Express.js` and keep it to routes,
  middleware and request handling — the whole framework is small, per the seed line
- DO: make the Python track cover the language basics, data and iteration, modules and
  packaging, and scripting plus automation — one child each, in that order
- DO: make the Java track cover the language and JVM, object and type design, the
  build and dependency ecosystem, and Spring-style enterprise backends — one child
  each, in that order, without turning it into a Spring tutorial
- DO: make `go` about the three things the seed names — compiled, concurrent, simple —
  and let its children cover the toolchain and concurrency respectively
- DO: give `server-side` an `## Included skills` list naming `nodejs`,
  `python-programming`, `java` and `go`, and state plainly that the server is a
  location, not a skill
- DO NOT: rank the four languages for beginners — say what each is used for and stop
- DO NOT: include any external URL, including language documentation

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic backend-data` → `6 present, 13 pending, 0 error(s)`
- [ ] Both large tracks have 4 children each:
  `ls lessons/backend-data/python-programming | grep -c '^[0-9][0-9]-'` → `4` and
  `ls lessons/backend-data/java | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Both medium entries have 2 children: `ls lessons/backend-data/{nodejs,go} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] `nodejs` title is verbatim: `grep -c '^title: Node.JS$' lessons/backend-data/nodejs/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/backend-data/ | grep -v ':0'` → no output

---

### WP-21: APIs and integration

**Context:**
Four entries from `seed/backend-data.md`, section `## APIs & integration`, per
`tools/inventory.json`: `backend-data/restful-api` (medium, no prereqs, alias `REST`),
`backend-data/api-design-openapi-swagger` (medium, prereq `backend-data/restful-api`,
aliases `OpenAPI`, `Swagger`),
`backend-data/authentication-authorization-oauth2-jwt` (medium, prereq
`backend-data/restful-api`, aliases `OAuth2`, `JWT`), `backend-data/websockets` (small,
prereq `backend-data/restful-api`). Three `medium` → 2 children each; one small → none.

**Task:**
Create these 10 files:

- `lessons/backend-data/restful-api/index.md` + 2 children
- `lessons/backend-data/api-design-openapi-swagger/index.md` + 2 children
- `lessons/backend-data/authentication-authorization-oauth2-jwt/index.md` + 2 children
- `lessons/backend-data/websockets/index.md` — full lesson

**Files:**
- `lessons/backend-data/restful-api/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/api-design-openapi-swagger/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/authentication-authorization-oauth2-jwt/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/websockets/index.md` — CREATE

**Constraints:**
- DO: keep `restful-api` at the resource/verb/status-code level per the seed line, and
  make one child the design rules (resources, verbs, status codes, idempotency) and the
  other the failure modes (versioning, pagination, N+1 responses)
- DO: keep the inventory title `Restful API` verbatim even though "RESTful" is the
  usual spelling — the seed file is authoritative
- DO: make the auth entry separate *authentication* from *authorization* in its first
  sentence, per the seed line, then cover OAuth2 flows and JWT verification pitfalls
- DO: state in `websockets` when a persistent two-way connection is the wrong tool
  compared with plain HTTP or server-sent events
- DO: make `api-design-openapi-swagger` about specifying and contract-testing endpoints
  *before* building them, per the seed line
- DO NOT: write a JWT library tutorial or an OAuth2 provider setup guide — describe the
  flows and the security decisions
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic backend-data` → `10 present, 9 pending, 0 error(s)`
- [ ] Three medium tracks with 2 children each:
  `ls lessons/backend-data/{restful-api,api-design-openapi-swagger,authentication-authorization-oauth2-jwt} | grep -c '^[0-9][0-9]-'` → `6`
- [ ] `restful-api` title is verbatim: `grep -c '^title: Restful API$' lessons/backend-data/restful-api/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/backend-data/ | grep -v ':0'` → no output

---

### WP-22: Data

**Context:**
Seven entries from `seed/backend-data.md`, section `## Data`, per
`tools/inventory.json`: `backend-data/sql-relational-databases` (large, no prereqs,
alias `SQL`), `backend-data/nosql` (medium, prereq the SQL entry),
`backend-data/mongodb` (medium, prereq `backend-data/nosql`),
`backend-data/database-design` (medium, prereq the SQL entry),
`backend-data/object-relational-mapping` (small, prereq the SQL entry, alias `ORM`),
`backend-data/prisma-orm` (small, prereqs `backend-data/object-relational-mapping`,
`backend-data/nodejs`, alias `Prisma`), `backend-data/caching-redis` (medium, prereq
the SQL entry, alias `Redis`). One `large` → 4 children; four `medium` → 2 each; two
small → none.

This batch resolves the pending prereq declared by
`cs-fundamentals/database-internals` in Phase 3.

**Task:**
Create these 19 files:

- `lessons/backend-data/sql-relational-databases/index.md` + 4 children
- `lessons/backend-data/nosql/index.md` + 2 children
- `lessons/backend-data/mongodb/index.md` + 2 children
- `lessons/backend-data/database-design/index.md` + 2 children
- `lessons/backend-data/object-relational-mapping/index.md` — full lesson
- `lessons/backend-data/prisma-orm/index.md` — full lesson
- `lessons/backend-data/caching-redis/index.md` + 2 children

**Files:**
- `lessons/backend-data/sql-relational-databases/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/backend-data/nosql/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/mongodb/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/database-design/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/object-relational-mapping/index.md` — CREATE
- `lessons/backend-data/prisma-orm/index.md` — CREATE
- `lessons/backend-data/caching-redis/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make the SQL track cover tables and relationships, queries and joins, indexes
  and query plans, and transactions and isolation — one child each, in that order
- DO: make `database-design` about choosing keys, relations and indexes so queries stay
  correct and fast, per the seed line, with a schema exercise whose `Done when:` line
  names a query that got faster
- DO: make `object-relational-mapping` genuinely about where the abstraction leaks, per
  the seed line — this is the entry that justifies keeping ORM and Prisma separate
- DO: note in `cs-fundamentals/database-internals` nothing — do not modify Phase 3 files;
  instead confirm that its `## Go deeper` bullet for this id now resolves in the
  validator
- DO: keep `caching-redis` about keeping hot data in memory to cut latency and database
  load, per the seed line, and make one child the invalidation problem
- DO NOT: turn the SQL track into a vendor-specific manual — standard SQL plus a note
  where engines differ
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic backend-data` → `17 present, 2 pending, 0 error(s)`
- [ ] The Phase 3 pending prereq resolves: `node tools/validate-content.mjs --topic cs-fundamentals` reports no missing-prereq message for `backend-data/sql-relational-databases`
- [ ] SQL has 4 children: `ls lessons/backend-data/sql-relational-databases | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Four medium tracks with 2 children each: `ls lessons/backend-data/{nosql,mongodb,database-design,caching-redis} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] No external URL: `grep -rcE 'https?://' lessons/backend-data/ | grep -v ':0'` → no output

---

### WP-23: Architecture

**Context:**
The final two entries: `seed/backend-data.md`, section `## Architecture`, per
`tools/inventory.json`: `backend-data/microservices` (medium, prereq
`backend-data/restful-api`), `backend-data/message-queues-kafka-rabbitmq` (medium,
prereq `backend-data/microservices`, aliases `Kafka`, `RabbitMQ`). Two `medium` → 2
children each. This closes the topic.

**Task:**
Create these 6 files:

- `lessons/backend-data/microservices/index.md` + 2 children
- `lessons/backend-data/message-queues-kafka-rabbitmq/index.md` + 2 children

**Files:**
- `lessons/backend-data/microservices/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/backend-data/message-queues-kafka-rabbitmq/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `microservices` about splitting a system into independently deployable
  services with clear boundaries, per the seed line, including when *not* to split —
  that is the honest half of the entry
- DO: make its children cover boundary and ownership decisions, then the operational
  cost (deployment, versioning, failure isolation)
- DO: make `message-queues-kafka-rabbitmq` about asynchronous decoupled work with
  retries and back-pressure, per the seed line, and distinguish a queue from a log
- DO: cross-reference `cs-fundamentals/software-architecture` (Phase 3) as the
  general discipline this entry is a special case of
- DO NOT: compare Kafka and RabbitMQ feature by feature — the entry is about the
  pattern, and the seed lists them as examples of one skill
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic backend-data` → `19 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/backend-data -name '*.md' | wc -l` → `44`
- [ ] Both tracks have 2 children each:
  `ls lessons/backend-data/{microservices,message-queues-kafka-rabbitmq} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] No external URL: `grep -rcE 'https?://' lessons/backend-data/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-20 through WP-23 are complete, run:

```bash
node tools/validate-content.mjs --topic backend-data
node tools/validate-content.mjs
node tools/validate-content.mjs --topic cs-fundamentals
find lessons/backend-data -name '*.md' | wc -l
```

- [ ] Topic is complete: `19 present, 0 pending, 0 error(s)` for `--topic backend-data`
- [ ] Global run exits 0 and reports `100 present, 77 pending, 0 error(s)`
- [ ] No unresolved cross-topic prereq exists anywhere in the corpus:
      `node tools/validate-content.mjs` reports no missing-prereq message for an
      entry that has been written
- [ ] 53 files under `lessons/backend-data/`
- [ ] Manual spot-check: read `lessons/backend-data/object-relational-mapping/index.md`
      and `lessons/backend-data/prisma-orm/index.md` together and confirm they are
      distinct lessons rather than one repeated at two lengths
