# Phase 6: Examples — backend-data, cloud-devops, security and soft skills

## Objective

Write the remaining 101 examples files: 38 for `05-backend-data`, 43 for `06-cloud-devops`, 10 for
`07-security` and 10 for `08-soft-skills` (the `Mentoring` entry already has its `examples.md` from
WP-11). With this phase every one of the 297 full-shape lessons has an examples file.

## Prerequisites

- Phases 1–5 complete.
- The four topic runs report `0 error(s)` with pending counts `38`, `43`, `10` and `10`.

## Shared Context

See the frozen file shape in `phase-02-examples-toolkit.md` → Shared Context.

Infrastructure and security topics are the ones where a real URL is most tempting. There are none
allowed: no endpoint, no bucket path, no hostname, no console link, no CVE link, no package page.
Write placeholders and say in one line that the reader substitutes their own. `https-tls` and
`content-security-policy-csp` are the two entries where this bites hardest — describe the scheme and
the host in words, never as a string that contains `https://`.

## Work Packages

### WP-37: Examples for Node, Python and Java

**Context:**
`05-backend-data/02-nodejs` is `medium` with two children; `03-python-programming` and `04-java` are
`large` with four children each.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/05-backend-data/02-nodejs` | `examples.01-the-event-loop.md`, `examples.02-modules-and-the-runtime.md` |
| `lessons/05-backend-data/03-python-programming` | `examples.01-language-basics.md`, `examples.02-data-and-iteration.md`, `examples.03-modules-and-packaging.md`, `examples.04-scripting-and-automation.md` |
| `lessons/05-backend-data/04-java` | `examples.01-the-language-and-the-jvm.md`, `examples.02-objects-and-type-design.md`, `examples.03-builds-and-dependencies.md`, `examples.04-enterprise-backends.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the Node child about modules use `js` and `mjs`/`cjs` fences that show both module styles.
- DO: for Java `03-builds-and-dependencies` show the dependency declaration and the resolved tree as the artefact; name the tool, no repository URL.
- DO: for Python use `py` fences and show the output of the script in a `text` fence where the point is the result.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: name a package that the lesson does not mention.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data` → `0 error(s)`
- [ ] Command: `ls lessons/05-backend-data/04-java` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/05-backend-data/*/examples*.md` → 0 matches

### WP-38: Examples for Go, REST, SQL, Express

**Context:**
`05-go`, `06-restful-api` are `medium` with two children each; `07-sql-relational-databases` is
`large` with four children; `08-expressjs` is `small`.

**Task:**
Create the 9 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/05-backend-data/05-go` | `examples.01-the-toolchain.md`, `examples.02-concurrency.md` |
| `lessons/05-backend-data/06-restful-api` | `examples.01-resources-verbs-and-status-codes.md`, `examples.02-versioning-pagination-and-n-plus-one.md` |
| `lessons/05-backend-data/07-sql-relational-databases` | `examples.01-tables-and-relationships.md`, `examples.02-queries-and-joins.md`, `examples.03-indexes-and-query-plans.md`, `examples.04-transactions-and-isolation.md` |
| `lessons/05-backend-data/08-expressjs` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the SQL children use `sql` fences plus a `text` fence for the result table or the query plan.
- DO: for `06-restful-api` `01-resources-verbs-and-status-codes` show the request and the response body as the artefact, using a relative path such as `/orders/42` — never a scheme or host.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: use a database name, table name or column name that contradicts the lesson's own example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/05-backend-data/07-sql-relational-databases/examples.04-transactions-and-isolation.md` → `1` or `2` (the frozen shape allows either; V15 enforces one `### Solution` per example)
- [ ] Command: `grep -rn 'https://\|http://' lessons/05-backend-data/*/examples*.md` → 0 matches

### WP-39: Examples for OpenAPI, auth, WebSockets, microservices, NoSQL

**Context:**
`09-api-design-openapi-swagger`, `10-authentication-authorization-oauth2-jwt`, `12-microservices`
and `13-nosql` are `medium`; `11-websockets` is `small`.

**Task:**
Create the 9 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/05-backend-data/09-api-design-openapi-swagger` | `examples.01-writing-the-specification.md`, `examples.02-contract-testing.md` |
| `lessons/05-backend-data/10-authentication-authorization-oauth2-jwt` | `examples.01-authentication-and-oauth2-flows.md`, `examples.02-jwt-verification-and-authorization.md` |
| `lessons/05-backend-data/11-websockets` | `examples.md` |
| `lessons/05-backend-data/12-microservices` | `examples.01-boundaries-and-ownership.md`, `examples.02-the-operational-cost.md` |
| `lessons/05-backend-data/13-nosql` | `examples.01-when-a-relational-store-fits-badly.md`, `examples.02-the-families-of-non-relational-stores.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the OpenAPI child show a fragment of the specification as `yaml` and the request it describes as `bash` with a relative path.
- DO: for the JWT child show a decoded token's claims as `json` and say which claim the check must verify, with the signature described in words.
- DO: for `12-microservices` `01-boundaries-and-ownership` use a `text` sketch of the services and their owners.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: include a real client id, secret, token or issuer hostname — use placeholders.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/05-backend-data/*/examples*.md` → 0 matches
- [ ] Check: every created file has one `### Solution` per `## Example`

### WP-40: Examples for database design, ORM, caching, queues, MongoDB, Prisma

**Context:**
`14-database-design`, `16-caching-redis`, `17-message-queues-kafka-rabbitmq` and `18-mongodb` are
`medium` with two children each; `15-object-relational-mapping` and `19-prisma-orm` are `small`.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/05-backend-data/14-database-design` | `examples.01-keys-and-relations.md`, `examples.02-designing-for-the-queries-you-run.md` |
| `lessons/05-backend-data/15-object-relational-mapping` | `examples.md` |
| `lessons/05-backend-data/16-caching-redis` | `examples.01-caching-patterns.md`, `examples.02-invalidation.md` |
| `lessons/05-backend-data/17-message-queues-kafka-rabbitmq` | `examples.01-queues-and-logs.md`, `examples.02-retries-ordering-and-back-pressure.md` |
| `lessons/05-backend-data/18-mongodb` | `examples.01-documents-and-collections.md`, `examples.02-schema-design-in-a-schemaless-store.md` |
| `lessons/05-backend-data/19-prisma-orm` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `16-caching-redis` `02-invalidation` show both the stale read and the invalidated read as the artefact, with a `text` timeline.
- DO: for `17-message-queues-kafka-rabbitmq` `02-retries-ordering-and-back-pressure` show a message that failed twice and what happens on the third attempt.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add a third example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data` → `38 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `find lessons/05-backend-data -name 'examples*.md' | wc -l` → `38`
- [ ] Command: `grep -rn 'https://\|http://' lessons/05-backend-data/*/examples*.md` → 0 matches

### WP-41: Examples for AWS, Azure and GCP

**Context:**
`02-aws` is `large` with four children; `03-microsoft-azure` and `04-google-cloud-platform-gcp` are
`medium` with two children each.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/06-cloud-devops/02-aws` | `examples.01-compute-and-ec2.md`, `examples.02-storage-and-databases.md`, `examples.03-networking-and-vpc.md`, `examples.04-identity-and-cost.md` |
| `lessons/06-cloud-devops/03-microsoft-azure` | `examples.01-enterprise-identity-and-active-directory.md`, `examples.02-running-workloads-on-azure.md` |
| `lessons/06-cloud-devops/04-google-cloud-platform-gcp` | `examples.01-data-and-machine-learning.md`, `examples.02-kubernetes-and-managed-platforms.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `bash` or `hcl` fences with the CLI command and the resource declaration as the artefact; a resource identifier is fine, a console URL is not.
- DO: for `02-aws` `03-networking-and-vpc` show the route or security-rule reasoning as a `text` table alongside the declaration.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: include an account id, a region-pinned real bucket name or a price table.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops` → `0 error(s)`
- [ ] Command: `ls lessons/06-cloud-devops/02-aws` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/06-cloud-devops/*/examples*.md` → 0 matches

### WP-42: Examples for serverless, Docker, Terraform and CI/CD

**Context:**
All four entries are `medium` skills with two children each.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/06-cloud-devops/05-serverless-computing` | `examples.01-functions-and-managed-runtimes.md`, `examples.02-designing-for-serverless.md` |
| `lessons/06-cloud-devops/06-docker` | `examples.01-images-and-layers.md`, `examples.02-running-containers-and-persisting-data.md` |
| `lessons/06-cloud-devops/07-terraform` | `examples.01-declaring-infrastructure.md`, `examples.02-state-and-planning.md` |
| `lessons/06-cloud-devops/08-ci-cd` | `examples.01-pipeline-stages.md`, `examples.02-pipeline-failure-modes.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `06-docker` use a `dockerfile` or `text` fence for the file and `bash` for the commands, and show the layer count or the volume outcome in the solution.
- DO: for `07-terraform` show the plan output as a `text` fence and name the resource that changes.
- DO: for `08-ci-cd` show the pipeline as `yaml` and the failure as a `text` log excerpt.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: reference a container registry hostname or an image tag that implies a real registry path.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/06-cloud-devops/*/examples*.md` → 0 matches
- [ ] Check: each file stays within 120–450 words

### WP-43: Examples for Linux administration, networking, cost management, cloud IAM

**Context:**
`09-linux-administration` is `large` with four children; `10-networking-fundamentals-http-dns-tls`
and `12-cloud-security-iam` are `medium` with two each; `11-cloud-cost-management` is `small`.

**Task:**
Create the 9 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/06-cloud-devops/09-linux-administration` | `examples.01-users-and-permissions.md`, `examples.02-processes-and-services.md`, `examples.03-the-filesystem.md`, `examples.04-logs-and-troubleshooting.md` |
| `lessons/06-cloud-devops/10-networking-fundamentals-http-dns-tls` | `examples.01-http-requests-and-responses.md`, `examples.02-names-addresses-and-tls.md` |
| `lessons/06-cloud-devops/11-cloud-cost-management` | `examples.md` |
| `lessons/06-cloud-devops/12-cloud-security-iam` | `examples.01-identities-and-roles.md`, `examples.02-least-privilege-in-practice.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the networking children show the request and response headers as a `text` fence, and describe the name resolution steps as `text`; use `example.test`-style placeholder names with no scheme.
- DO: for `12-cloud-security-iam` `02-least-privilege-in-practice` show the over-broad policy and the narrowed one as the artefact, plus what the narrowing breaks.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: write a certificate, a key or a token value, even a fake-looking one.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops` → `0 error(s)`
- [ ] Command: `ls lessons/06-cloud-devops/09-linux-administration` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/06-cloud-devops/*/examples*.md` → 0 matches

### WP-44: Examples for cloud-native, Kubernetes and GitHub Actions

**Context:**
`13-cloud-native-computing` and `15-github-actions` are `medium` with two children each;
`14-kubernetes` is `large` with four children.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/06-cloud-devops/13-cloud-native-computing` | `examples.01-containers-and-declarative-configuration.md`, `examples.02-elasticity-and-managed-services.md` |
| `lessons/06-cloud-devops/14-kubernetes` | `examples.01-the-object-model.md`, `examples.02-scheduling-and-scaling.md`, `examples.03-configuration-and-secrets.md`, `examples.04-self-healing-and-observability.md` |
| `lessons/06-cloud-devops/15-github-actions` | `examples.01-workflows-triggers-and-jobs.md`, `examples.02-caching-secrets-and-deployments.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the Kubernetes children use `yaml` fences and show the observed state (`kubectl get` output) in a `text` fence as the evidence.
- DO: for `15-github-actions` use `yaml` for the workflow and `bash` for the local commands; never a repository URL.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: put a secret value in a manifest — write the placeholder the lesson uses.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops` → `0 error(s)`
- [ ] Command: `ls lessons/06-cloud-devops/14-kubernetes` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/06-cloud-devops/*/examples*.md` → 0 matches

### WP-45: Examples for the remaining eight cloud-devops entries

**Context:**
`16-jenkins`, `17-azure-devops`, `19-nginx`, `20-openshift`, `21-helm` and `22-istio` are `small`
skills with one `examples.md` each; `18-monitoring-observability-prometheus-grafana` and
`23-site-reliability-engineering` are `medium` with two children each. These are the last
cloud-devops entries.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/06-cloud-devops/16-jenkins` | `examples.md` |
| `lessons/06-cloud-devops/17-azure-devops` | `examples.md` |
| `lessons/06-cloud-devops/18-monitoring-observability-prometheus-grafana` | `examples.01-metrics-logs-and-traces.md`, `examples.02-dashboards-and-alerting.md` |
| `lessons/06-cloud-devops/19-nginx` | `examples.md` |
| `lessons/06-cloud-devops/20-openshift` | `examples.md` |
| `lessons/06-cloud-devops/21-helm` | `examples.md` |
| `lessons/06-cloud-devops/22-istio` | `examples.md` |
| `lessons/06-cloud-devops/23-site-reliability-engineering` | `examples.01-service-level-objectives.md`, `examples.02-error-budgets.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `19-nginx` show the server block as `text` or `nginx` and the request it routes as a `text` line with a relative path only.
- DO: for `23-site-reliability-engineering` show the SLO and the error-budget arithmetic in a `text` table, with the decision the budget permits.
- DO: for `21-helm` and `22-istio` use `yaml` for the chart values or the routing rule.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add a third example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops` → `43 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `find lessons/06-cloud-devops -name 'examples*.md' | wc -l` → `43`
- [ ] Command: `grep -rn 'https://\|http://' lessons/06-cloud-devops/*/examples*.md` → 0 matches

### WP-46: Examples for all seven security entries

**Context:**
`07-security/01-web-security-owasp-top-10`, `02-https-tls` and `05-gdpr-data-privacy` are `medium`
with two children each. `03-secrets-management`, `04-dependency-scanning-sca`,
`06-content-security-policy-csp` and `07-data-ethics` are `small` skills with one `examples.md`
each. This topic is the strictest test of the no-URL rule.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/07-security/01-web-security-owasp-top-10` | `examples.01-injection-and-access-control.md`, `examples.02-cross-site-scripting-and-the-browser-side-classes.md` |
| `lessons/07-security/02-https-tls` | `examples.01-certificates-and-the-handshake.md`, `examples.02-why-plain-http-is-a-hard-fail.md` |
| `lessons/07-security/03-secrets-management` | `examples.md` |
| `lessons/07-security/04-dependency-scanning-sca` | `examples.md` |
| `lessons/07-security/05-gdpr-data-privacy` | `examples.01-lawful-basis-consent-and-retention.md`, `examples.02-the-right-to-be-forgotten-in-a-database.md` |
| `lessons/07-security/06-content-security-policy-csp` | `examples.md` |
| `lessons/07-security/07-data-ethics` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the injection example show a parameterised query beside the concatenated one, and have the solution say which character class the attack needs to reach the database.
- DO: for `02-https-tls` describe the redirect and the handshake in words — write `301 to the secure scheme on the same host`, never a string containing a scheme.
- DO: for `06-content-security-policy-csp` show the header value and the inline script it blocks, as `text`.
- DO: for `04-dependency-scanning-sca` show a finding row (package, version, severity, fix version) as a `text` table — no advisory URL, no package page.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: write a real secret, token, certificate or exploit payload that would work as-is against a real system.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 07-security` → `10 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/07-security/*/examples*.md` → 0 matches
- [ ] Command: `grep -c '^## Example' lessons/07-security/06-content-security-policy-csp/examples.md` → `1` or `2`

### WP-47: Examples for the nine soft-skills entries

**Context:**
`08-soft-skills/01-communication` and `08-freelancing-client-work` are `medium` with two children
each. `02-teamwork-collaboration`, `04-problem-solving`, `05-time-management`,
`06-portfolio-building`, `07-interview-prep-whiteboarding` and `09-technical-presentation` are
`small` skills with one `examples.md` each. `03-mentoring` already has its `examples.md` from WP-11
and is not part of this work package.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/08-soft-skills/01-communication` | `examples.01-explaining-to-any-audience.md`, `examples.02-disagreeing-productively.md` |
| `lessons/08-soft-skills/02-teamwork-collaboration` | `examples.md` |
| `lessons/08-soft-skills/04-problem-solving` | `examples.md` |
| `lessons/08-soft-skills/05-time-management` | `examples.md` |
| `lessons/08-soft-skills/06-portfolio-building` | `examples.md` |
| `lessons/08-soft-skills/07-interview-prep-whiteboarding` | `examples.md` |
| `lessons/08-soft-skills/08-freelancing-client-work` | `examples.01-scoping-and-pricing.md`, `examples.02-contracts-and-getting-paid.md` |
| `lessons/08-soft-skills/09-technical-presentation` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `text` fences for every artefact — a dialogue, a written reply, a plan, a whiteboard sketch in characters.
- DO: for `06-portfolio-building` the artefact is a project write-up skeleton, and the solution says which of the four slots most portfolios leave empty.
- DO: for `07-interview-prep-whiteboarding` show the think-aloud as the artefact and name what the interviewer is actually scoring.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files, and do not touch `03-mentoring/examples.md`.
- DO NOT: name a real employer, a real client or a real salary figure.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills` → `11 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `ls lessons/08-soft-skills/08-freelancing-client-work` → both `examples.*.md` files present
- [ ] Command: `node tools/validate-content.mjs` → `297 examples`, `0 examples pending`, `0 error(s)`

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs
node tools/validate-content.mjs --strict
node tools/validate-content.mjs --write-index
find lessons -name 'examples*.md' | wc -l
grep -rn 'https://\|http://' lessons --include='examples*.md'
```

- [ ] `--strict` reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0
- [ ] `find` reports 297 files
- [ ] The URL grep reports nothing anywhere under `lessons/`
- [ ] `lessons/INDEX.md` carries an `[examples]` link on every full-shape entry and none on a landing or area entry
- [ ] No lesson file was modified in this phase (V5 word counts still pass)
