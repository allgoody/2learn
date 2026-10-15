## Example 1 — A pipeline that deploys whatever it builds

One pipeline builds, tests and then deploys to production in the same run, so every merge to the main branch reaches production without a decision. Split the integration from the release and put an approval gate in front of production.

```yaml
steps:
  - script: ./run-tests.sh
  - script: ./build.sh
  - script: ./deploy.sh production
```

### Solution

```yaml
# integration pipeline: runs on every change
steps:
  - script: ./run-tests.sh
  - script: ./build.sh
  - publish: dist

---
# release pipeline: takes the published artifact, deploys environment by environment
stages:
  - stage: staging
    steps: [{ script: ./deploy.sh staging }]
  - stage: production
    environment: production   # protected: an approver must release it
    steps: [{ script: ./deploy.sh production }]
```

Separating the two means a passing build is not itself a deployment, and the approval turns a policy into something the tool enforces and records against the artifact. The usual mistake is to keep one pipeline and add the approval to a step, which leaves the rest of the run free to deploy.

## Example 2 — Self-hosted agents everywhere

A team stood up agents on its own machines because one deploy job must reach an internal system, then pointed every job at them, so ordinary builds now wait for capacity and the team patches machines it does not need. The jobs below are what is configured. Move the work that does not need the internal network back to the hosted runners.

```yaml
pool: internal-agents
steps:
  - script: ./run-tests.sh
  - script: ./build.sh
  - script: ./deploy.sh internal

jobs:
  - job: nightly-regression
    pool: internal-agents
    steps: [{ script: ./run-regression.sh }]
```

### Solution

```yaml
jobs:
  - job: build-and-test          # no internal access needed
    pool: hosted
    steps: [{ script: ./run-tests.sh }, { script: ./build.sh }]

  - job: deploy-internal         # the only job that needs the private network
    pool: internal-agents
    steps: [{ script: ./deploy.sh internal }]
```

The runner is a choice per job, so the internal network requirement can be met by one job instead of by every machine the team owns. Narrowing it also narrows the credentials and the patching, which is the cost the self-hosted agents bring. The usual mistake is to adopt the whole suite for the one feature that needed it, importing tools nobody asked for.
