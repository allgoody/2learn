---
title: CI/CD
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: ["Continuous Integration", "Continuous Delivery"]
prereqs: ["01-cs-fundamentals/12-git"]
related: []
---

## What it is

Continuous integration is the practice of merging every change into the main line often, with an automated build and test run proving that the result still works. Continuous delivery extends it: every change that passes is a candidate for release, and releasing is a decision rather than a project. Together they turn a sequence of risky events into a routine that happens dozens of times a day.

## Why it matters

Long-lived branches and manual releases make integration the hardest part of the work. Branches drift, merges become negotiations, and the release is a tense event with a rollback plan written on a whiteboard. A pipeline that builds and tests every change moves that pain earlier, to a moment when the change is small and the person who wrote it still remembers it. It also makes the release boring, which is the point: a delivery that happens often and is easy to reverse is far safer than one that happens rarely and must not fail.

## In this track

1. **Pipeline stages** (`06-cloud-devops/08-ci-cd/01-pipeline-stages`) — what each stage of a pipeline does and why the order matters.
2. **Pipeline failure modes** (`06-cloud-devops/08-ci-cd/02-pipeline-failure-modes`) — the ways a pipeline loses trust, from flaky tests to secrets leaking into logs.

## Prerequisites

- **Git (Version Control System)** (`01-cs-fundamentals/12-git`)

## Go deeper

- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the branching and merging model the pipeline operates on, so read it first.
- **GitHub Actions** (`06-cloud-devops/15-github-actions`) — one concrete implementation of everything in this track.
- **Terraform** (`06-cloud-devops/07-terraform`) — where a pipeline applies infrastructure changes after reviewing the plan.
