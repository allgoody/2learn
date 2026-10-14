---
title: Pipeline failure modes
prereqs: ["cloud-devops/ci-cd/01-pipeline-stages"]
---

## What it is

A pipeline fails in two ways. The first is honest: a stage reports a real problem and the change is fixed. The second is corrosive: the pipeline reports something that is not quite a problem, or misses one that is, and people stop believing it. The chronic failure modes — flaky tests, slow builds, secrets in logs, an untrustworthy main branch — all belong to the second kind.

## Why it matters

A pipeline's value is entirely in whether its verdict is believed. Once a team has learned to re-run a failed job to make it pass, or to merge while main is red because it will be fixed later, the pipeline has become decoration that costs money and time. The failure is gradual and quiet, which is why the causes are worth naming and treating as defects rather than as annoyances to live with.

## Core ideas

### Flaky tests are quarantined or fixed, never re-run

A test that passes on the second attempt teaches everyone that failure is negotiable. The cause is usually shared state, timing, an unseeded random value or a leaked external dependency. Quarantining the test out of the blocking path while it is investigated is honest; leaving it in and asking people to retry is not.

```text
test fails -> investigate the flake's cause (state, time, seed, network)
           -> fix it, or quarantine it and open a ticket
retry the run            -> the pipeline's verdict is now noise
```

### A slow pipeline is a failing pipeline

When a run takes longer than the work it validates, people batch changes, review less carefully and start pipelines in parallel. Dependencies, container images and test fixtures should be cached, and independent jobs should run at the same time. Speed is a correctness feature because it is what keeps the feedback loop tight enough to act on.

### Secrets leak through logs, not just through code

Environment values printed by a failing command, a debug dump of a configuration object, a build tool echoing its command line, a test that writes a request including its authorization header — none of these are malicious and all of them leak. Masking, scoping secrets to the stages that need them, and rotating anything that appears in a log are the remedies.

### Deploys need to be reversible, not just green

A pipeline that can deploy but not roll back turns every failure into an incident. The rollback path should be a stage the pipeline can run, pointed at a known-good version, and it should be exercised before it is needed. A pipeline whose only reverse gear is a person with console access has a single point of failure.

Non-production environments drift from production until a passing test means nothing. Where possible the environment definition should be the same artifact in both, with the differences confined to configuration the pipeline sets.

### Permissions are part of the blast radius

A pipeline that can deploy to production holds credentials capable of deploying to production. Anything that can change the pipeline can therefore change production, which is why the pipeline definition deserves the same review as the application and why pull requests from forks should never receive secrets.

## Practice

### Quarantine a flaky test and measure it

Find a test that fails intermittently. Run it repeatedly to estimate the failure rate, then quarantine it from the blocking path, record the cause you suspect and open a ticket.

Done when: the pipeline's verdict is deterministic again and the flake has a named owner and cause.

### Prove the rollback path

Take a pipeline that deploys a version and add a stage that redeploys the previous version. Trigger the rollback deliberately.

Done when: the rollback completes without a manual step and the running version is the previous one.

## Common mistakes

- **Re-running failed jobs until they pass** — the pipeline's verdict becomes noise; fix: fix or quarantine the flaky test.
- **Letting build times grow unchecked** — people batch changes and review suffers; fix: cache dependencies and parallelise jobs.
- **Echoing configuration during failures** — secrets end up in a log anyone can read; fix: mask secrets and keep them out of debug output.
- **Having no rollback stage** — every bad deployment needs manual intervention; fix: add and rehearse a rollback.
- **Giving a fork's pull request access to secrets** — an untrusted change can deploy; fix: separate the untrusted path and require review for secret-bearing runs.

## Go deeper

- **Pipeline stages** (`cloud-devops/ci-cd/01-pipeline-stages`) — the stages these failures undermine.
- **CI/CD** (`cloud-devops/ci-cd`) — the practice whose value depends on trusting the verdict.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — how a deployment that passed its checks is watched once it is live.
