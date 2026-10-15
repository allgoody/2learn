---
title: Web Security (OWASP Top 10)
type: skill
topic: security
tier: medium
status: drafted
aliases: ["OWASP"]
prereqs: []
related: []
---

## What it is

The OWASP Top 10 is a periodically refreshed list of the most common classes of web application flaw: injection, broken access control, insecure design, misconfiguration, and the browser-side classes such as cross-site scripting. It is a catalogue of recurring mistakes rather than a checklist to pass, and each class has a specific design or coding decision behind it.

## Why it matters

Almost every breach reported in the press belongs to one of these classes, and almost all of them are introduced by ordinary code written under time pressure, not by sophisticated attacks. Injection is a query built by string concatenation. Broken access control is an endpoint that checks who you are but not what you may see. Misconfiguration is a debug page left on. Because the classes recur, knowing them lets a reviewer ask the right question of a pull request in seconds, which is far cheaper than an audit after release.

## In this track

1. **Injection and access control** (`security/web-security-owasp-top-10/01-injection-and-access-control`) — the two classes that give an attacker data they should not have.
2. **Cross-site scripting and the browser-side classes** (`security/web-security-owasp-top-10/02-cross-site-scripting-and-the-browser-side-classes`) — running code in someone else's session, and the controls that bound it.

## Prerequisites

None.

## Go deeper

- **Content Security Policy (CSP)** (`security/content-security-policy-csp`) — the browser-side rule set that blunts script injection.
- **HTTPS & TLS** (`security/https-tls`) — encryption in transit, and why its absence is now a hard fail.
- **Secrets Management** (`security/secrets-management`) — keys out of the repository, and rotated when exposed.
- **Dependency Scanning (SCA)** (`security/dependency-scanning-sca`) — the known-vulnerable code already in your tree.
