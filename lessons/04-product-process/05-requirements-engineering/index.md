---
title: Requirements Engineering
type: skill
topic: 04-product-process
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Requirements engineering captures what a system must do, testably and unambiguously, before and during the build. The artefact is a requirements document or a set of acceptance criteria: statements a reviewer can check, a developer can implement, and a tester can turn into a case without asking the author what it meant.

## Why it matters

Most defects trace back to a sentence nobody agreed on. "The system should handle large files" produces three implementations, one disagreement about what large means, and a bug report that is really a specification gap. Writing the requirement so it can be checked is the cheapest defect prevention available, and it costs an hour per page. The counter-risk is worth stating too: a heavy, sign-off-driven requirements phase on an uncertain product documents the wrong thing in detail and slows the learning that would correct it. The discipline pays where the system is regulated, contracted or long-lived; on an exploratory product, acceptance criteria written just before the work are enough.

## In this track

1. **Specifying behaviour testably** (`04-product-process/05-requirements-engineering/01-specifying-behaviour-testably`) — writing statements that can be checked and cannot be misread.
2. **Reviewing and tracing requirements** (`04-product-process/05-requirements-engineering/02-reviewing-and-tracing-requirements`) — catching the gaps by review, and keeping the link from requirement to test to code.

## Prerequisites

None.

## Go deeper

- **User Acceptance Testing** (`04-product-process/16-user-acceptance-testing`) — where the client confirms the built thing against these statements.
- **Business Analysis** (`04-product-process/06-business-analysis`) — the mapping work that happens before a solution is chosen.
- **User Story** (`04-product-process/12-user-story`) — the lighter-weight form for teams building iteratively.
- **Technical Writing** (`04-product-process/08-technical-writing`) — writing the document so a reader can act on it.
