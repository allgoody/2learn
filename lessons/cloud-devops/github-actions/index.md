---
title: GitHub Actions
type: skill
topic: cloud-devops
tier: medium
status: drafted
aliases: []
prereqs: ["cloud-devops/ci-cd", "cs-fundamentals/github"]
related: []
---

## What it is

GitHub Actions is the automation system built into GitHub. A workflow is a file in the repository describing what should happen when something occurs — a push, a pull request, a schedule — and the platform runs it on a machine it provides. The same mechanism covers continuous integration, releases, scheduled maintenance and routine chores, which is why it is often the first pipeline a team uses.

## Why it matters

The pipeline lives beside the code, is reviewed like the code, and needs no separate server. For an open-source project or a small team that is a decisive advantage: no runner to patch, no credentials to distribute to a second system, and the checks appear on the pull request where the reviewer already is. The trade is a dependency on the host and its runners, and a pricing model that becomes significant on private repositories with heavy usage. Knowing where that trade stops being favourable is the same judgement as for any hosted service.

## In this track

1. **Workflows, triggers and jobs** (`cloud-devops/github-actions/01-workflows-triggers-and-jobs`) — the file's structure and what causes it to run.
2. **Caching, secrets and deployments** (`cloud-devops/github-actions/02-caching-secrets-and-deployments`) — making runs fast, keeping credentials safe and distinguishing a check from a release.

## Prerequisites

- **CI/CD** (`cloud-devops/ci-cd`)
- **GitHub** (`cs-fundamentals/github`)

## Go deeper

- **CI/CD** (`cloud-devops/ci-cd`) — the general practice this service implements, so read it first.
- **GitHub** (`cs-fundamentals/github`) — the pull requests and checks this pipeline reports into.
- **Jenkins** (`cloud-devops/jenkins`) — the self-hosted alternative, and what hosting buys and costs.
