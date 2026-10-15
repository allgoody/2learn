---
title: Content Security Policy (CSP)
type: skill
topic: security
tier: small
status: drafted
aliases: ["CSP"]
prereqs: ["security/web-security-owasp-top-10", "security/https-tls"]
related: []
---

## What it is

A Content Security Policy is a set of rules a server sends with a page that tell the browser what that page is allowed to load and execute: which origins may serve scripts, whether inline script and inline styles are permitted, where the page may send form data and connect, and whether it may be framed. The browser enforces it; the attacker's injected script does not get a vote.

## Why it matters

Output encoding is the primary defence against script injection and it fails sometimes — a template with an escape hatch, a sanitiser with a gap, a third-party widget that was never reviewed. CSP is the layer that turns such a failure from a session compromise into a blocked request and a console message. A strict policy also makes third-party code visible: every new script origin has to be added deliberately, which is exactly the review you wanted.

## Core ideas

### Start from a deny-all policy and open what you need

The restrictive default is `default-src 'none'`, then add the sources the page genuinely uses. Note that `'unsafe-inline'` in `script-src` disables most of the protection — it is the switch that gives the policy back to the attacker.

```text
Content-Security-Policy:
  default-src 'none';
  script-src 'self' 'nonce-<random per response>';
  style-src 'self';
  img-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
```

Each line answers a question: what code may run, where images may come from, where data may be sent, and who may frame the page.

### Use a nonce instead of allowing inline script

A per-response random nonce on your own `<script>` tags lets the browser distinguish your inline script from an injected one. A hash works the same way for a fixed script. This is what makes a strict policy possible on a page that genuinely needs some inline code.

```text
script-src 'self' 'nonce-8f2b...'   -> only scripts carrying this nonce run
```

### Roll it out in report-only mode first

Send `Content-Security-Policy-Report-Only` with a reporting endpoint, collect the violations for a week, and fix the legitimate ones before enforcing. Enforcing a policy written from guesswork breaks the page in ways users discover for you.

### Keep the policy where the page is served

A policy set by a meta tag cannot cover everything a header can, and it is easy for a template to drift. Send it as a response header, and generate it per page where the nonce changes.

### Treat third-party origins as a reviewed list

Every origin added to `script-src` is code you are running on the page. Keep the list short, dated, and owned.

## Practice

### Write one page's policy and test it in report-only

Take a real page, write the restrictive policy, deploy it report-only for a week, and list the violations.

Done when: you can explain every violation as either a legitimate source to add or a bug to fix, and the policy enforces without breaking the page.

### Remove one unsafe-inline

Find a page whose policy includes `'unsafe-inline'` and replace it with a nonce or hash on the scripts that genuinely need it.

Done when: the policy enforces without `'unsafe-inline'` and no script is blocked.

## Common mistakes

- **`'unsafe-inline'` left in place** — the injected script is allowed and the policy protects nothing; fix: use a nonce or hash.
- **Enforcing without testing** — the page breaks for users; fix: run in report-only mode first and fix the legitimate violations.
- **A policy set in a meta tag only** — coverage is incomplete and drifts with the template; fix: send it as a response header.
- **Wildcard script origins** — any host may serve code into the page; fix: name the origins and review each addition.
- **Forgetting `frame-ancestors`** — the page can be framed and clickjacked; fix: set it to `'none'` unless framing is a feature.

## Go deeper

- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — read this first; CSP is the backstop for the injection classes described there.
- **HTTPS & TLS** (`security/https-tls`) — a policy is only meaningful on a page that was not modified in transit.
- **Cross-site scripting and the browser-side classes** (`security/web-security-owasp-top-10/02-cross-site-scripting-and-the-browser-side-classes`) — the failure mode this policy limits.
- **Secrets Management** (`security/secrets-management`) — keeping out of the page what a script would try to reach.
