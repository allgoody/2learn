# Phase 6: 05-backend-data

## Objective

Mirror `lessons/05-backend-data/` into `lessons/ru/05-backend-data/` — 91 files across 19 entries.
This topic mixes three languages and four data stores, so term consistency matters more here than
in any earlier phase.

## Prerequisites

- Phase 5 complete: `node tools/validate-content.mjs --topic 04-product-process --lang ru` reports
  `0 error(s)` and the Russian product-process count is `61`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Topic-specific additions:

- Language and product names stay in Latin script: Node.js, Python, Java, Go, Express.js, MongoDB,
  Prisma, Redis, Kafka, RabbitMQ, OpenAPI, Swagger, OAuth2, JWT, SQL.
- Data vocabulary has settled Russian forms — `таблица`, `строка`, `столбец`, `схема`, `индекс`,
  `транзакция`, `изоляция`, `миграция`, `кэш`, `очередь`, `сообщение`, `повторная попытка`,
  `идемпотентность`, `сериализация`. Use them consistently.
- SQL keywords, table names, column names and query text are never translated. `sql` fences stay
  byte-identical apart from comments.
- Query plans, result tables and payloads in `text` fences keep their column alignment.
- No URL anywhere: no API host, no registry path, no documentation link, no connection string with a
  host. Use placeholders and say so.

**Command after every entry:**
`node tools/validate-content.mjs --topic 05-backend-data --lang ru`

## Work Packages

### WP-30: Mirror server side, Node.js, Python and Java

**Context:**
`01-server-side` is the topic's `area` entry; `02-nodejs` is `medium`;
`03-python-programming` and `04-java` are `large` with four children each.

**Task:**
Create the 24 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/05-backend-data/01-server-side` | `index.md` | 1 |
| `lessons/05-backend-data/02-nodejs` | `index.md`, `01-the-event-loop.md`, `02-modules-and-the-runtime.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/03-python-programming` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/05-backend-data/04-java` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the area page's `Входящие навыки` bullet ids exactly as the English file has them.
- DO: keep `js`, `mjs`, `cjs`, `py` and `java` fence contents intact apart from comments and prose strings.
- DO: keep the build-tool dependency tree diagram's structure and version numbers untouched.
- DO: note in your report which Russian wording you used for "event loop" so later phases reuse it.
- DO NOT: create `examples.md` for the area page or for any `medium` or `large` index.
- DO NOT: edit anything under `lessons/05-backend-data/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → no error naming any of the 24 files
- [ ] Command: `find lessons/ru/05-backend-data/03-python-programming lessons/ru/05-backend-data/04-java -name '*.md' | wc -l` → `18`
- [ ] Command: `ls lessons/ru/05-backend-data/01-server-side` → `index.md` only

### WP-31: Mirror Go, REST, SQL and Express

**Context:**
`05-go` and `06-restful-api` are `medium`; `07-sql-relational-databases` is `large` with four
children; `08-expressjs` is `small`.

**Task:**
Create the 21 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/05-backend-data/05-go` | `index.md`, `01-the-toolchain.md`, `02-concurrency.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/06-restful-api` | `index.md`, `01-resources-verbs-and-status-codes.md`, `02-versioning-pagination-and-n-plus-one.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/07-sql-relational-databases` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/05-backend-data/08-expressjs` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep HTTP verb names, resource paths, status codes and header names in Latin script, and keep every path relative.
- DO: keep the N+1 example's query count arithmetic exactly as the English file has it.
- DO: keep isolation-level names in their standard Latin form (`READ COMMITTED`, `SERIALIZABLE`) alongside the Russian explanation.
- DO NOT: create `examples.md` for the two `medium` indexes or the `large` index.
- DO NOT: edit anything under `lessons/05-backend-data/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → no error naming any of the 21 files
- [ ] Command: `find lessons/ru/05-backend-data/07-sql-relational-databases -name '*.md' | wc -l` → `9`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/05-backend-data/06-restful-api` → 0 matches

### WP-32: Mirror API design, authentication, WebSockets, microservices, NoSQL and database design

**Context:**
`09-api-design-openapi-swagger`, `10-authentication-authorization-oauth2-jwt`, `12-microservices`,
`13-nosql` and `14-database-design` are `medium`; `11-websockets` is `small`.

**Task:**
Create the 27 Russian files for the six directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/05-backend-data/09-api-design-openapi-swagger` | `index.md`, `01-writing-the-specification.md`, `02-contract-testing.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/10-authentication-authorization-oauth2-jwt` | `index.md`, `01-authentication-and-oauth2-flows.md`, `02-jwt-verification-and-authorization.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/11-websockets` | `index.md`, `examples.md` | 2 |
| `lessons/05-backend-data/12-microservices` | `index.md`, `01-boundaries-and-ownership.md`, `02-the-operational-cost.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/13-nosql` | `index.md`, `01-when-a-relational-store-fits-badly.md`, `02-the-families-of-non-relational-stores.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/14-database-design` | `index.md`, `01-keys-and-relations.md`, `02-designing-for-the-queries-you-run.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep OAuth2 flow names and JWT claim names in Latin script; keep every token value a placeholder.
- DO: keep `yaml` specification fragments' keys and paths untouched.
- DO: keep database schemas' table and column names untouched; translate the comments and the surrounding prose.
- DO: keep the microservice boundary sketch's boxes and arrows readable.
- DO NOT: create `examples.md` for the five `medium` indexes.
- DO NOT: edit anything under `lessons/05-backend-data/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → no error naming any of the 27 files
- [ ] Command: `find lessons/ru/05-backend-data/09-api-design-openapi-swagger lessons/ru/05-backend-data/10-authentication-authorization-oauth2-jwt lessons/ru/05-backend-data/11-websockets lessons/ru/05-backend-data/12-microservices lessons/ru/05-backend-data/13-nosql lessons/ru/05-backend-data/14-database-design -name '*.md' | wc -l` → `27`

### WP-33: Mirror ORM, caching, message queues, MongoDB and Prisma

**Context:**
`16-caching-redis`, `17-message-queues-kafka-rabbitmq` and `18-mongodb` are `medium` with two
children each; `15-object-relational-mapping` and `19-prisma-orm` are `small`. These close out the
topic.

**Task:**
Create the 19 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/05-backend-data/15-object-relational-mapping` | `index.md`, `examples.md` | 2 |
| `lessons/05-backend-data/16-caching-redis` | `index.md`, `01-caching-patterns.md`, `02-invalidation.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/17-message-queues-kafka-rabbitmq` | `index.md`, `01-queues-and-logs.md`, `02-retries-ordering-and-back-pressure.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/18-mongodb` | `index.md`, `01-documents-and-collections.md`, `02-schema-design-in-a-schemaless-store.md`, two matching `examples.*` | 5 |
| `lessons/05-backend-data/19-prisma-orm` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep cache-pattern names (`cache-aside`, `write-through`) in Latin script with a Russian explanation on first use in each file.
- DO: keep delivery-guarantee terms (`at-least-once`, `at-most-once`, `exactly-once`) in Latin script; they are the terms of art.
- DO: keep document keys and collection names untouched.
- DO NOT: create `examples.md` for the three `medium` indexes.
- DO NOT: edit anything under `lessons/05-backend-data/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `19 present`, `38 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/05-backend-data -name '*.md' | wc -l` → `91`
- [ ] Command: `find lessons/ru/05-backend-data -name 'examples*.md' | wc -l` → `38`
- [ ] Command: `find lessons/ru/05-backend-data -name 'index.md' | wc -l` → `19`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/05-backend-data` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 05-backend-data --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/05-backend-data -name '*.md' | wc -l
find lessons/05-backend-data -name '*.md' | wc -l
```

- [ ] The topic run reports `19 present`, `38 examples`, `0 error(s)`
- [ ] The Russian count equals the English count: `91` and `91`
- [ ] The English `--strict` run is unchanged
- [ ] SQL, HTTP and claim names are still in Latin script; no connection string carries a host
- [ ] The Russian wording for "event loop", "idempotency" and "back-pressure" matches the choices recorded in Phase 2 and earlier in this phase
