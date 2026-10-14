---
title: Terraform
type: skill
topic: cloud-devops
tier: medium
status: drafted
aliases: []
prereqs: ["cloud-devops/cloud-computing"]
related: []
---

## What it is

Terraform describes infrastructure as a set of declarations in files, compares them with what actually exists, and makes the difference. Instead of a runbook that says which button to press and in what order, an environment is a directory of text that can be reviewed, versioned and applied repeatedly. It is the tool that turns the console into something with a diff.

## Why it matters

An environment built by hand cannot be rebuilt reliably. Nobody remembers every setting, the second environment drifts from the first, and the person who knows why a rule exists has left. Declaring the infrastructure makes the environment reproducible, which is what allows it to be copied for testing, torn down afterwards and rebuilt identically after an incident. It also makes changes reviewable before they happen — the plan is a preview of what will change in production, which no console offers.

## In this track

1. **Declaring infrastructure** (`cloud-devops/terraform/01-declaring-infrastructure`) — the language of resources, variables and outputs, and how a change becomes a plan.
2. **State and planning** (`cloud-devops/terraform/02-state-and-planning`) — the state file, why it causes the most damage, and how to keep plans honest.

## Prerequisites

- **Cloud Computing** (`cloud-devops/cloud-computing`)

## Go deeper

- **Cloud Computing** (`cloud-devops/cloud-computing`) — the infrastructure this tool declares, so read it first.
- **CI/CD** (`cloud-devops/ci-cd`) — where a plan is generated and reviewed before a change is applied.
- **AWS** (`cloud-devops/aws`) — the largest provider whose resources are described by this kind of configuration.
