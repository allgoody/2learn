# Phase 4: Cloud & DevOps (23 entries, 59 files)

## Objective

Write every `cloud-devops` entry. Twenty-eight seed lines collapse into 23 entries
here: the six cloud umbrellas become one area page (`cloud-devops/cloud-computing`)
whose aliases carry the other five names. This topic holds three of the corpus's 15
`large` entries — `aws`, `kubernetes` and `linux-administration` — so it is the
largest single-topic writing load after `frontend` and `design-ux`. Four batches.

## Prerequisites

- Phase 3 complete and verified: `node tools/validate-content.mjs` reports
  `58 present, 119 pending, 0 error(s)`
- `tools/inventory.json` unchanged — this phase depends on the merge table in it

## Shared Context

Read `lessons/AUTHORING.md` first. Read `lessons/design-ux/ui-ux-design/index.md` as
the area-page pattern and `lessons/frontend/css/index.md` as a large-track landing
pattern.

Source: `seed/cloud-devops.md` (read-only), sections `## Cloud platforms`,
`## Containers & orchestration`, `## Delivery & automation`, `## Operations`.

**Merge handling for this topic:** Appendix A lists `cloud-devops/cloud-computing`
with the aliases `Cloud Infrastructure`, `Cloud Development`, `Cloud Applications`,
`Cloud Deployment` and `Application Deployment`. Those five seed entries get **no
directory of their own**. Do not create them. The area page explains the overlap in
one sentence and moves on.

Coverage for this topic: 23 entries, none written yet.

## Work Packages

### WP-16: Cloud platforms

**Context:**
Seven inventory entries derived from twelve seed lines in `## Cloud platforms`, per
`tools/inventory.json`: `cloud-devops/cloud-computing` (area, alias list of five),
`cloud-devops/aws` (large, prereq `cloud-devops/cloud-computing`, alias
`Amazon Web Services`), `cloud-devops/microsoft-azure` (medium, prereq the area, alias
`Azure`), `cloud-devops/google-cloud-platform-gcp` (medium, prereq the area, alias
`GCP`), `cloud-devops/cloud-cost-management` (small, prereq `cloud-devops/aws`, alias
`FinOps`), `cloud-devops/serverless-computing` (medium, prereq the area),
`cloud-devops/cloud-native-computing` (medium, prereqs the area and
`cloud-devops/docker`). One `large` → 4 children; three `medium` → 2 each; two small +
one area → none.

Note the forward reference: `cloud-native-computing` requires `cloud-devops/docker`,
which WP-17 writes. The validator reports it as pending, not an error.

**Task:**
Create these 19 files:

- `lessons/cloud-devops/cloud-computing/index.md` — area page
- `lessons/cloud-devops/aws/index.md` + 4 children
- `lessons/cloud-devops/microsoft-azure/index.md` + 2 children
- `lessons/cloud-devops/google-cloud-platform-gcp/index.md` + 2 children
- `lessons/cloud-devops/cloud-cost-management/index.md` — full lesson
- `lessons/cloud-devops/serverless-computing/index.md` + 2 children
- `lessons/cloud-devops/cloud-native-computing/index.md` + 2 children

**Files:**
- `lessons/cloud-devops/cloud-computing/index.md` — CREATE — area page (4 sections)
- `lessons/cloud-devops/aws/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/cloud-devops/microsoft-azure/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/google-cloud-platform-gcp/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/cloud-cost-management/index.md` — CREATE
- `lessons/cloud-devops/serverless-computing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/cloud-native-computing/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: give `cloud-computing` exactly the five aliases from the inventory and an
  `## Included skills` list naming `aws`, `microsoft-azure`,
  `google-cloud-platform-gcp`, `serverless-computing`, `cloud-native-computing`
- DO: keep the three provider entries comparative and honest — where each is strong,
  per the seed lines (AWS largest; Azure strong in enterprise/.NET/Active Directory;
  GCP strong in data, ML and Kubernetes)
- DO: make the AWS track cover compute, storage, networking, and identity plus cost —
  one child each, in that order, with the managed-service trade-off visible in each
- DO: make `cloud-cost-management` about the practices that keep a bill sane —
  right-sizing, commitments, budgets, alerts — per the seed line
- DO: treat `cloud-computing` as a signpost, not a lesson: it explains why the five
  cloud umbrella names are one field and where to start
- DO NOT: create directories for `cloud-infrastructure`, `cloud-development`,
  `cloud-applications`, `cloud-deployment` or `application-deployment` — they are
  aliases, not entries
- DO NOT: include any external URL, including cloud-provider documentation

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cloud-devops` → `7 present, 16 pending, 0 error(s)`
- [ ] No alias-only directories exist:
  `ls -d lessons/cloud-devops/cloud-infrastructure lessons/cloud-devops/cloud-development lessons/cloud-devops/cloud-applications lessons/cloud-devops/cloud-deployment lessons/cloud-devops/application-deployment 2>&1 | grep -c 'No such file'` → `5`
- [ ] AWS has 4 children: `ls lessons/cloud-devops/aws | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Area page has 5 aliases on one line: `grep -c 'aliases: \["Cloud Infrastructure".*"Application Deployment"\]' lessons/cloud-devops/cloud-computing/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/cloud-devops/ | grep -v ':0'` → no output

---

### WP-17: Containers and orchestration

**Context:**
Six entries from `seed/cloud-devops.md`, section `## Containers & orchestration`, per
`tools/inventory.json`: `cloud-devops/docker` (medium), `cloud-devops/kubernetes`
(large, prereq `cloud-devops/docker`, alias `k8s`), `cloud-devops/openshift` (small,
prereq `cloud-devops/kubernetes`), `cloud-devops/helm` (small, prereq
`cloud-devops/kubernetes`), `cloud-devops/istio` (small, prereqs
`cloud-devops/kubernetes`, `cloud-devops/networking-fundamentals-http-dns-tls`),
`cloud-devops/terraform` (medium, prereq `cloud-devops/cloud-computing`). One `large`
→ 4 children; two `medium` → 2 each; three small → none.

**Task:**
Create these 14 files:

- `lessons/cloud-devops/docker/index.md` + 2 children
- `lessons/cloud-devops/kubernetes/index.md` + 4 children
- `lessons/cloud-devops/openshift/index.md` — full lesson
- `lessons/cloud-devops/helm/index.md` — full lesson
- `lessons/cloud-devops/istio/index.md` — full lesson
- `lessons/cloud-devops/terraform/index.md` + 2 children

**Files:**
- `lessons/cloud-devops/docker/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/kubernetes/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/cloud-devops/openshift/index.md` — CREATE
- `lessons/cloud-devops/helm/index.md` — CREATE
- `lessons/cloud-devops/istio/index.md` — CREATE
- `lessons/cloud-devops/terraform/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `docker` about packaging an app with its dependencies into a portable image,
  per the seed line — images, layers and volumes, not a Docker Compose manual
- DO: make the Kubernetes track cover the object model (pods, deployments, services),
  scheduling and scaling, configuration and secrets, and self-healing plus
  observability — one child each, in that order
- DO: present `terraform` as declarative infrastructure as code and make the
  state-file problem explicit; that is where beginners get hurt
- DO: keep `openshift`, `helm` and `istio` short and pointed: what each adds on top of
  Kubernetes and when the extra layer pays for itself
- DO: point `istio`'s reader at its prereq
  `cloud-devops/networking-fundamentals-http-dns-tls` (written later in this phase,
  WP-19) by id, not by position
- DO NOT: instruct the reader to install a cluster locally — the exercises should be
  runnable without one (reading a manifest, tracing a request, sizing a container)
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cloud-devops` → `13 present, 10 pending, 0 error(s)`
- [ ] Kubernetes has 4 children: `ls lessons/cloud-devops/kubernetes | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Both medium entries have 2 children: `ls lessons/cloud-devops/{docker,terraform} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] No external URL: `grep -rcE 'https?://' lessons/cloud-devops/ | grep -v ':0'` → no output

---

### WP-18: Delivery and automation

**Context:**
Five entries from `seed/cloud-devops.md`, section `## Delivery & automation`, per
`tools/inventory.json`: `cloud-devops/ci-cd` (medium, prereq `cs-fundamentals/git`,
aliases `Continuous Integration`, `Continuous Delivery`),
`cloud-devops/github-actions` (medium, prereqs `cloud-devops/ci-cd`,
`cs-fundamentals/github`), `cloud-devops/jenkins` (small, prereq
`cloud-devops/ci-cd`), `cloud-devops/azure-devops` (small, prereq
`cloud-devops/ci-cd`), `cloud-devops/nginx` (small, prereq
`cloud-devops/networking-fundamentals-http-dns-tls`). Two `medium` → 2 children each;
three small → none. All prereqs here already exist (Phase 3 wrote
`cs-fundamentals/git` and `cs-fundamentals/github`).

**Task:**
Create these 9 files:

- `lessons/cloud-devops/ci-cd/index.md` + 2 children
- `lessons/cloud-devops/github-actions/index.md` + 2 children
- `lessons/cloud-devops/jenkins/index.md` — full lesson
- `lessons/cloud-devops/azure-devops/index.md` — full lesson
- `lessons/cloud-devops/nginx/index.md` — full lesson

**Files:**
- `lessons/cloud-devops/ci-cd/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/github-actions/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/jenkins/index.md` — CREATE
- `lessons/cloud-devops/azure-devops/index.md` — CREATE
- `lessons/cloud-devops/nginx/index.md` — CREATE

**Constraints:**
- DO: make `ci-cd` conceptual first — automated build, test and release on every
  change, per the seed line — with the pipeline stages and the failure modes
  (flaky tests, slow builds, secrets in logs) as the substance
- DO: make `github-actions` concrete: a workflow file, triggers, jobs, caching,
  secrets, and the difference between a check and a deployment
- DO: include the `cs-fundamentals/git` and `cs-fundamentals/github` links in
  `## Prerequisites` exactly as the inventory says — they now resolve, so the
  validator should report no pending prereq for this batch
- DO: keep `jenkins` and `azure-devops` as honest comparisons against a hosted CI:
  what self-hosting buys and what it costs
- DO: make `nginx` about the reverse-proxy role — static files, TLS termination and
  load balancing — not a configuration reference
- DO NOT: teach YAML syntax — link to `cs-fundamentals/technical-writing` in Phase 7 if
  a formatting explanation is needed
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cloud-devops` → `18 present, 5 pending, 0 error(s)`
- [ ] Both medium entries have 2 children: `ls lessons/cloud-devops/{ci-cd,github-actions} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] No pending prereqs in this batch: the validator reports no `[V3]` message naming
      `cs-fundamentals/git` or `cs-fundamentals/github` as missing
- [ ] No external URL: `grep -rcE 'https?://' lessons/cloud-devops/ | grep -v ':0'` → no output

---

### WP-19: Operations

**Context:**
Five entries from `seed/cloud-devops.md`, section `## Operations`, per
`tools/inventory.json`: `cloud-devops/linux-administration` (large, no prereqs),
`cloud-devops/networking-fundamentals-http-dns-tls` (medium, prereq
`cs-fundamentals/computer-networks`, aliases `HTTP`, `DNS`, `TLS`),
`cloud-devops/monitoring-observability-prometheus-grafana` (medium, prereq
`cloud-devops/linux-administration`, aliases `Prometheus`, `Grafana`),
`cloud-devops/site-reliability-engineering` (medium, prereq the monitoring entry, alias
`SRE`), `cloud-devops/cloud-security-iam` (medium, prereq `cloud-devops/aws`, alias
`IAM`). One `large` → 4 children; four `medium` → 2 each.

This batch closes the topic and satisfies the pending `istio` and `nginx` prereqs from
WP-17 and WP-18.

**Task:**
Create these 17 files:

- `lessons/cloud-devops/linux-administration/index.md` + 4 children
- `lessons/cloud-devops/networking-fundamentals-http-dns-tls/index.md` + 2 children
- `lessons/cloud-devops/monitoring-observability-prometheus-grafana/index.md` + 2 children
- `lessons/cloud-devops/site-reliability-engineering/index.md` + 2 children
- `lessons/cloud-devops/cloud-security-iam/index.md` + 2 children

**Files:**
- `lessons/cloud-devops/linux-administration/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/cloud-devops/networking-fundamentals-http-dns-tls/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/monitoring-observability-prometheus-grafana/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/site-reliability-engineering/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cloud-devops/cloud-security-iam/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make the Linux track cover users and permissions, processes and services, the
  filesystem, and logs plus troubleshooting — one child each, in that order
- DO: make `networking-fundamentals-http-dns-tls` the HTTP/DNS/TLS layer *above*
  `cs-fundamentals/computer-networks`, and say so in `## What it is`; do not repeat the
  packet-level material
- DO: make `site-reliability-engineering` about explicit reliability targets and error
  budgets, per the seed line, and keep it decision-focused rather than a Google-style
  SRE survey
- DO: tie `monitoring-observability-prometheus-grafana` to metrics, logs and traces,
  per the seed line, with the answer to "what broke and why" as the organising question
- DO: make `cloud-security-iam` about identities, roles and least privilege across cloud
  resources, and cross-reference `security/web-security-owasp-top-10` (Phase 8) as a
  different layer of the same problem
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cloud-devops` → `23 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/cloud-devops -name '*.md' | wc -l` → `59`
- [ ] `linux-administration` has 4 children: `ls lessons/cloud-devops/linux-administration | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Four medium entries have 2 children each: `ls lessons/cloud-devops/{networking-fundamentals-http-dns-tls,monitoring-observability-prometheus-grafana,site-reliability-engineering,cloud-security-iam} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] The previously pending prereqs now resolve: `node tools/validate-content.mjs --topic cloud-devops` reports no missing-prereq message
- [ ] No external URL: `grep -rcE 'https?://' lessons/cloud-devops/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-16 through WP-19 are complete, run:

```bash
node tools/validate-content.mjs --topic cloud-devops
node tools/validate-content.mjs
ls -d lessons/cloud-devops/*/ | wc -l
```

- [ ] Topic is complete: `23 present, 0 pending, 0 error(s)` for `--topic cloud-devops`
- [ ] Global run exits 0 and reports `81 present, 96 pending, 0 error(s)`
- [ ] Exactly 23 directories under `lessons/cloud-devops/` — no alias-only directories
- [ ] 59 files under `lessons/cloud-devops/`
- [ ] Manual spot-check: read `lessons/cloud-devops/cloud-computing/index.md` and
      confirm the merge reads as one field rather than a list of six near-synonyms
