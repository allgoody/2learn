---
title: Dependency Scanning (SCA)
type: skill
topic: 07-security
tier: small
status: drafted
aliases: ["SCA"]
prereqs: ["02-frontend/04-package-management-npm"]
related: []
---

## What it is

Software composition analysis watches the packages a project depends on — direct and transitive — and reports the ones with known vulnerabilities, matched against an advisory database. It answers "is there a known-bad version in this tree?", which is a different question from "is this code written safely?". It reports exposure; it does not fix anything.

## Why it matters

Most of the code running in a modern application was written by someone else, and it is carried in transitively: you install a form library and receive forty packages you never chose. A vulnerability in any one of them is a vulnerability in your product. The commonest serious cases are not exotic — an old parsing library with a denial-of-service flaw, a build tool with a command-injection advisory, a dependency of a dependency pinned three years ago. Scanners make that visible per build, which is the only way it gets fixed.

## Core ideas

### Scan the resolved tree, not the manifest

The manifest lists what you asked for; the lockfile holds what you got, including the transitive packages where most advisories live. Scan in continuous integration against the lockfile, so the result matches what is deployed.

```text
On every pull request:  scan the lockfile, fail on high severity
Nightly:                rescan the same lockfile for newly published advisories
Result:                 advisory id, package, installed version, fixed version
```

The nightly rescan matters because advisories are published after your dependency was pinned.

### Triage by reachability, not by count

A hundred alerts with no prioritisation produce no fixes. Ask whether the vulnerable function is actually called, whether the code path is reachable from an untrusted input, and whether a fixed version exists.

```text
High   the vulnerable parser handles uploaded files, reachable from the API
Low    a build-time tool, dev-only, never runs in production
None   the advisory affects a feature the project does not use
```

### Have a remediation route before you add the scanner

The output is useless without a policy: on a high severity with a fix available, patch within a stated window; where there is no fix, record the compensating control and the date to revisit.

### Treat the scanner as one signal among several

It cannot see your own code, your configuration or your access control. Passing a scan means "no known-vulnerable dependency versions", and nothing more.

### Watch the supply chain, not only the advisories

Newly published packages, typosquatted names and compromised maintainer accounts are not advisories yet. Pin versions, review lockfile changes in pull requests, and be cautious with packages nobody uses.

## Practice

### Scan the lockfile and triage the top five

Run a scan against the resolved dependency tree, then classify the five highest-severity findings by whether the code is reachable.

Done when: each of the five has a reachability judgement, a fix version where one exists, and an owner.

### Fix one transitive dependency

Pick a finding whose package is not in your manifest and pin or override it to a fixed version, then confirm the build and the tests still pass.

Done when: the scan no longer reports that advisory and the application still builds and runs.

## Common mistakes

- **Scanning the manifest only** — the transitive packages, where most advisories sit, are missed; fix: scan the resolved lockfile.
- **A long unprioritised list** — nobody acts on it; fix: triage by reachability and severity, and set a remediation window.
- **Scanning only at release** — the exposure exists for the whole development cycle; fix: run on every pull request and nightly.
- **Assuming a scan means the application is secure** — it covers neither your code nor your configuration; fix: keep it one of several controls.
- **Never upgrading** — the fixed version exists and is not taken; fix: schedule regular dependency updates so patches are routine rather than an emergency.

## Go deeper

- **Package Management (npm)** (`02-frontend/04-package-management-npm`) — read this first; the lockfile and version resolution this scanning depends on.
- **Secrets Management** (`07-security/03-secrets-management`) — the other common way a project is compromised from the outside.
- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — the flaws in your own code that no scanner will find.
- **Continuous Integration and Delivery** (`06-cloud-devops/08-ci-cd`) — where the scan runs and where it should fail the build.
