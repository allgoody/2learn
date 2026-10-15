---
title: Pipeline stages
prereqs: ["06-cloud-devops/08-ci-cd"]
---

## What it is

A pipeline is a sequence of stages, each of which either passes or fails the change it is running against. The usual shape is a fast check that the code compiles and its style passes, then the test suite, then a build producing an artifact, then one or more deployments. Each stage answers a question, and the order is chosen so that the cheapest stage rejects the most bad changes.

## Why it matters

The order of a pipeline is a deliberate economic decision. A ten-second compile check that fails half of the obviously broken builds saves the twenty minutes a full suite would have spent on them. Fast feedback also changes behaviour: when a failure arrives in a minute the author fixes it immediately, and when it arrives in an hour they have moved on and the failure becomes somebody's afternoon. A pipeline that is slow is a pipeline whose results are ignored.

## Core ideas

### Every stage answers one question

Compilation asks "is this syntactically and structurally valid"; tests ask "does it behave"; the build asks "can this be packaged"; the deployment asks "does it run here". Mixing questions in one stage makes the failure message ambiguous and forces everything to rerun when one thing changes.

```text
check -> test -> build artifact -> deploy to staging -> deploy to production
seconds   minutes     minutes         minutes            gated by approval
```

### Build once and promote the artifact

The artifact that reaches production should be the one that passed the tests, identified by a version or digest. Rebuilding for each environment reintroduces every difference the pipeline was meant to remove, and it means the thing tested is not quite the thing shipped.

### Feedback time sets the pace of the whole team

A pipeline that takes forty minutes for a small change is a queue everyone waits in. Parallelising independent test groups, caching dependencies, and not running the slow end-to-end suite on every commit all reduce it. The slow suite belongs on a schedule or before deployment, not on the fast path.

### The main branch must stay green

A red main branch blocks everyone and destroys the trust that makes the practice work. When a failure appears, fixing or reverting it takes priority over any new work. This is a cultural rule enforced by the tooling: a pipeline that permits merging onto a red main branch is teaching people to ignore it.

### Deployment is a separate decision from testing

Building and testing can run automatically on every change; releasing to production usually should not, or at least should be an explicit approval. Keeping them as separate stages lets the same pipeline serve both without coupling the decision to the mechanics.

### Secrets belong to the pipeline, not to the log

Credentials are supplied by the pipeline's secret store, masked where the platform supports it, and scoped to the stages that need them. A token that a test prints in a log is a leaked token, and it will be found.

## Practice

### Order a pipeline by feedback speed

Take a project with a slow test suite and a fast compile check. Arrange the stages so the fastest check runs first, then split the suite so the quick portion runs on every change and the slow portion runs before deployment.

Done when: a change that fails to compile reports failure in under a minute, and the slow suite no longer blocks the fast path.

### Promote one artifact across two environments

Build an artifact once, record its version, and deploy that exact version to staging and then production.

Done when: the version identifier is identical in both environments and neither deployment rebuilt anything.

## Common mistakes

- **Running a slow suite on every commit** — feedback arrives too late to change behaviour; fix: split fast and slow tests and schedule the slow ones.
- **Rebuilding per environment** — the tested artifact is not the shipped one; fix: build once and promote by version.
- **Allowing merges onto a failing main branch** — everyone's work is blocked and trust in the pipeline dies; fix: make fixing the main branch the first priority.
- **Printing secrets into build logs** — the credential is exposed to everyone who can read the log; fix: use masked secrets and restrict their scope.
- **Coupling the release decision to the test run** — a passing build is treated as a licence to ship; fix: keep deployment a separate, deliberate stage.

## Go deeper

- **CI/CD** (`06-cloud-devops/08-ci-cd`) — the practice these stages implement, so read it first.
- **Pipeline failure modes** (`06-cloud-devops/08-ci-cd/02-pipeline-failure-modes`) — the ways the trustworthy pipeline described here stops being trustworthy.
