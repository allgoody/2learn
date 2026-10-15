---
title: Azure DevOps
type: skill
topic: 06-cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["06-cloud-devops/08-ci-cd"]
related: []
---

## What it is

Azure DevOps is Microsoft's suite of delivery tools: hosted git repositories, a pipeline service, a work-item tracker and an artifact feed, sold together and usable separately. Pipelines can run on Microsoft-hosted runners or on agents you install on your own machines, which makes it the middle position between a purely hosted service and a fully self-hosted one.

## Why it matters

The suite's advantage is the integration: a work item links to a branch, the branch's build links to the work item, and the artifact that was released is recorded against both. For an organisation that already uses Microsoft tooling and wants one vendor for planning and delivery, that continuity removes several synchronisation jobs and a class of "where is the requirement for this release" questions. The cost is that the suite is strongest when used as a suite, and adopting one part pulls the rest into the conversation.

## Core ideas

### The work item is the unit of traceability

A commit references a work item, a build references the commit, and a release references the build, so the path from request to deployed artifact is one continuous record. That is genuinely valuable at audit time and during an incident, and it is the feature that is hardest to assemble from separate tools.

```text
work item -> branch -> pull request -> build -> release -> deployed version
```

### Pipelines separate continuous integration from release

An integration pipeline builds and tests on every change; a release pipeline takes an artifact and deploys it through environments, often with approval gates between them. Keeping them distinct means a passing build is not itself a deployment, which is the same separation any healthy pipeline makes.

### Agents can be hosted or self-hosted per job

The runner is a choice per pipeline, so a build that needs an internal network runs on a self-hosted agent while everything else uses a hosted one. That flexibility is the reason the suite suits organisations partway through adopting cloud infrastructure.

### Environments and approvals are first-class

Deployment to a protected environment can require a named person's approval, and the record of who approved what and when is kept. This turns a policy into something the tool enforces, rather than a convention people remember.

### The suite has weight, and you may want one part

The tracker, the feed and the repos are each substantial products, and using one does not require the others. Adopting the whole suite for the pipeline alone imports tools nobody asked for; adopting the pipeline alone is a perfectly ordinary decision and is supported.

### It is one product among strong competitors

The features converge with the other hosted services; the differences are the integration, the enterprise agreements and the familiarity of the surrounding Microsoft tooling. Choosing on those grounds is reasonable; choosing on a feature checklist usually is not.

## Practice

### Trace one release end to end

Take a recent release and follow the chain from the work item that requested it to the artifact that was deployed, noting at each step which tool recorded the link.

Done when: you can name the deployed version from the work item alone, without asking anyone.

### Gate a deployment on approval

Create a protected environment and require an approval before a release can deploy to it.

Done when: the release stops and waits, the approver is recorded, and there is an audit entry for the decision.

## Common mistakes

- **Running integration and release in one pipeline** — a passing build becomes an automatic release; fix: separate them and gate the release.
- **Installing a self-hosted agent everywhere** — you pay operational cost where a hosted runner would do; fix: self-host only where the network requirement exists.
- **Adopting the whole suite for one feature** — the team inherits trackers and feeds it did not need; fix: use only the parts that earn their place.
- **Keeping definitions outside the repository** — pipelines cannot be reviewed or restored; fix: keep pipeline definitions in version control.
- **Treating approvals as a formality** — the gate is clicked without reading; fix: make the approval carry the artifact and the change summary so the decision is informed.

## Go deeper

- **CI/CD** (`06-cloud-devops/08-ci-cd`) — the practice this suite implements, so read it first.
- **GitHub Actions** (`06-cloud-devops/15-github-actions`) — the closest hosted alternative, and the one to compare against.
- **Pipeline stages** (`06-cloud-devops/08-ci-cd/01-pipeline-stages`) — how the integration and release stages here should be divided.
