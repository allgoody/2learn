# Phase 7: 06-cloud-devops

## Objective

Mirror `lessons/06-cloud-devops/` into `lessons/ru/06-cloud-devops/` — 102 files across 23 entries.
This is the topic with the most configuration artefacts and the highest temptation to include a
console link.

## Prerequisites

- Phase 6 complete: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` reports
  `0 error(s)` and the Russian backend-data count is `91`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Topic-specific additions:

- Product service names stay in Latin script: AWS, EC2, S3, IAM, VPC, Azure, GCP, Kubernetes,
  Docker, Terraform, Helm, Istio, Nginx, Jenkins, OpenShift, GitHub Actions, Prometheus, Grafana.
- Infrastructure vocabulary has settled Russian forms — `кластер`, `узел`, `образ`, `контейнер`,
  `манифест`, `масштабирование`, `отказоустойчивость`, `наблюдаемость`, `логи`, `метрики`, `трассировка`,
  `развёртывание`, `откат`. Use them consistently and record new decisions.
- Configuration files are never translated: `yaml`, `hcl`, `dockerfile`, `nginx` and `bash` fence
  contents keep their keys, resource types, image names and commands. Only comments and the prose
  around them are Russian.
- Resource identifiers are fine; URLs are not. No console link, no registry host, no documentation
  link, no `https://` inside a comment or a value. If the English file describes a console step,
  describe it in words.

**Command after every entry:**
`node tools/validate-content.mjs --topic 06-cloud-devops --lang ru`

## Work Packages

### WP-34: Mirror the area page, AWS, Azure, GCP and serverless

**Context:**
`01-cloud-computing` is the topic's `area` entry; `02-aws` is `large` with four children;
`03-microsoft-azure`, `04-google-cloud-platform-gcp` and `05-serverless-computing` are `medium` with
two children each.

**Task:**
Create the 25 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/06-cloud-devops/01-cloud-computing` | `index.md` | 1 |
| `lessons/06-cloud-devops/02-aws` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/06-cloud-devops/03-microsoft-azure` | `index.md`, `01-enterprise-identity-and-active-directory.md`, `02-running-workloads-on-azure.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/04-google-cloud-platform-gcp` | `index.md`, `01-data-and-machine-learning.md`, `02-kubernetes-and-managed-platforms.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/05-serverless-computing` | `index.md`, `01-functions-and-managed-runtimes.md`, `02-designing-for-serverless.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the area page's `Входящие навыки` bullet ids exactly as the English file has them.
- DO: keep region codes, instance-type names and service names in Latin script.
- DO: keep security-rule and route-table reasoning tables aligned after the labels are translated.
- DO: keep the cold-start and latency figures exactly as the English files have them.
- DO NOT: create `examples.md` for the area page or for any `medium` or `large` index.
- DO NOT: edit anything under `lessons/06-cloud-devops/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops --lang ru` → no error naming any of the 25 files
- [ ] Command: `find lessons/ru/06-cloud-devops/02-aws -name '*.md' | wc -l` → `9`
- [ ] Command: `ls lessons/ru/06-cloud-devops/01-cloud-computing` → `index.md` only

### WP-35: Mirror Docker, Terraform, CI/CD and Linux administration

**Context:**
`06-docker`, `07-terraform` and `08-ci-cd` are `medium`; `09-linux-administration` is `large` with
four children.

**Task:**
Create the 24 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/06-cloud-devops/06-docker` | `index.md`, `01-images-and-layers.md`, `02-running-containers-and-persisting-data.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/07-terraform` | `index.md`, `01-declaring-infrastructure.md`, `02-state-and-planning.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/08-ci-cd` | `index.md`, `01-pipeline-stages.md`, `02-pipeline-failure-modes.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/09-linux-administration` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep `Dockerfile` instructions, layer counts, Terraform resource types and pipeline stage names untouched.
- DO: keep shell commands, flags and paths byte-identical; translate the comments and the description of the output.
- DO: keep the plan output excerpt in `text` aligned and its change markers (`+`, `-`, `~`) intact.
- DO: keep file-permission notation (`rwx`, octal values) untouched.
- DO NOT: create `examples.md` for the three `medium` indexes or the `large` index.
- DO NOT: edit anything under `lessons/06-cloud-devops/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops --lang ru` → no error naming any of the 24 files
- [ ] Command: `find lessons/ru/06-cloud-devops/09-linux-administration -name '*.md' | wc -l` → `9`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/06-cloud-devops/06-docker lessons/ru/06-cloud-devops/07-terraform lessons/ru/06-cloud-devops/08-ci-cd lessons/ru/06-cloud-devops/09-linux-administration` → 0 matches

### WP-36: Mirror networking, cost management, cloud IAM, cloud-native and Kubernetes

**Context:**
`10-networking-fundamentals-http-dns-tls`, `12-cloud-security-iam` and `13-cloud-native-computing`
are `medium` with two children each; `11-cloud-cost-management` is `small`; `14-kubernetes` is
`large` with four children.

**Task:**
Create the 26 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/06-cloud-devops/10-networking-fundamentals-http-dns-tls` | `index.md`, `01-http-requests-and-responses.md`, `02-names-addresses-and-tls.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/11-cloud-cost-management` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/12-cloud-security-iam` | `index.md`, `01-identities-and-roles.md`, `02-least-privilege-in-practice.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/13-cloud-native-computing` | `index.md`, `01-containers-and-declarative-configuration.md`, `02-elasticity-and-managed-services.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/14-kubernetes` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep DNS record types, port numbers, HTTP status codes and header names in Latin script.
- DO: describe the TLS handshake and the redirect in words — never write a scheme, a hostname or a certificate value.
- DO: keep IAM policy `json` keys and action strings untouched.
- DO: keep Kubernetes manifest keys, resource kinds and `kubectl` output columns untouched.
- DO: keep cost figures and the arithmetic in the cost examples exactly as the English files have them.
- DO NOT: create `examples.md` for the three `medium` indexes or the `large` index.
- DO NOT: edit anything under `lessons/06-cloud-devops/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops --lang ru` → no error naming any of the 26 files
- [ ] Command: `find lessons/ru/06-cloud-devops/14-kubernetes -name '*.md' | wc -l` → `9`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/06-cloud-devops/10-networking-fundamentals-http-dns-tls` → 0 matches

### WP-37: Mirror GitHub Actions, Jenkins, Azure DevOps, monitoring, Nginx, OpenShift, Helm, Istio and SRE

**Context:**
`15-github-actions`, `18-monitoring-observability-prometheus-grafana` and
`23-site-reliability-engineering` are `medium`; `16-jenkins`, `17-azure-devops`, `19-nginx`,
`20-openshift`, `21-helm` and `22-istio` are `small`. These close out the topic.

**Task:**
Create the 27 Russian files for the nine directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/06-cloud-devops/15-github-actions` | `index.md`, `01-workflows-triggers-and-jobs.md`, `02-caching-secrets-and-deployments.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/16-jenkins` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/17-azure-devops` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/18-monitoring-observability-prometheus-grafana` | `index.md`, `01-metrics-logs-and-traces.md`, `02-dashboards-and-alerting.md`, two matching `examples.*` | 5 |
| `lessons/06-cloud-devops/19-nginx` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/20-openshift` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/21-helm` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/22-istio` | `index.md`, `examples.md` | 2 |
| `lessons/06-cloud-devops/23-site-reliability-engineering` | `index.md`, `01-service-level-objectives.md`, `02-error-budgets.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep workflow keys, trigger names, secret names, PromQL metric names and SLO arithmetic untouched.
- DO: keep Nginx directive names and the `yaml` chart or routing syntax intact.
- DO: keep error-budget percentages and the resulting decision exactly as the English files have them.
- DO: keep tool names in Latin script and describe the interface in words.
- DO NOT: create `examples.md` for the three `medium` indexes.
- DO NOT: edit anything under `lessons/06-cloud-devops/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 06-cloud-devops --lang ru` → `23 present`, `43 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/06-cloud-devops -name '*.md' | wc -l` → `102`
- [ ] Command: `find lessons/ru/06-cloud-devops -name 'examples*.md' | wc -l` → `43`
- [ ] Command: `find lessons/ru/06-cloud-devops -name 'index.md' | wc -l` → `23`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/06-cloud-devops` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 06-cloud-devops --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/06-cloud-devops -name '*.md' | wc -l
find lessons/06-cloud-devops -name '*.md' | wc -l
grep -rn '(https\|http)' lessons/ru/06-cloud-devops
```

- [ ] The topic run reports `23 present`, `43 examples`, `0 error(s)`
- [ ] The Russian count equals the English count: `102` and `102`
- [ ] The English `--strict` run is unchanged
- [ ] The URL grep reports nothing
- [ ] Manifest, policy and workflow files keep their keys; only comments and prose are Russian
