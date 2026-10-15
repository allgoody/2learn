---
title: Cloud Security & IAM
type: skill
topic: 06-cloud-devops
tier: medium
status: drafted
aliases: ["IAM"]
prereqs: ["06-cloud-devops/02-aws"]
related: []
---

## What it is

Cloud security begins with identity: the set of principals that may call the provider's API, and the permissions each holds. In cloud platforms this is called identity and access management, and it is the primary control surface. A network rule decides what can reach a service; a permission decides who can create, change or delete it, and every resource in the account is covered by both.

## Why it matters

A cloud account is an API, and the API can create or destroy everything the account holds. That makes a leaked credential far more dangerous than a compromised host: it is not one machine but the ability to act as the account. The characteristic cloud security incident follows the same shape almost every time — a long-lived key with broad permission is exposed, and the attacker uses it to read data, create expensive resources or remove backups. Defending against that is a small number of disciplines applied consistently, which makes the topic tractable rather than overwhelming.

## In this track

1. **Identities and roles** (`06-cloud-devops/12-cloud-security-iam/01-identities-and-roles`) — principals, temporary credentials and the account structure they live in.
2. **Least privilege in practice** (`06-cloud-devops/12-cloud-security-iam/02-least-privilege-in-practice`) — narrowing permissions over time and detecting the drift that undoes it.

## Prerequisites

- **AWS** (`06-cloud-devops/02-aws`)

## Go deeper

- **AWS** (`06-cloud-devops/02-aws`) — a concrete account and permission model, so read it first.
- **Identity and cost** (`06-cloud-devops/02-aws/04-identity-and-cost`) — the same discipline from the billing and ownership angle.
- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — the application-level layer of the same problem, which identity and access control does not cover.
