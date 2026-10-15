---
title: HTTPS & TLS
type: skill
topic: security
tier: medium
status: drafted
aliases: ["TLS"]
prereqs: ["cloud-devops/networking-fundamentals-http-dns-tls"]
related: []
---

## What it is

HTTPS is HTTP carried inside TLS: the client verifies the server's identity against a certificate issued by a trusted authority, then negotiates an encrypted, integrity-checked channel before any application data is sent. TLS is the encryption and authentication protocol; HTTPS is the application of it to web traffic.

## Why it matters

Without it, anything on the path can read and change the traffic: credentials, session cookies, form submissions, and the JavaScript the browser is about to run. That path includes cafés, hotels, corporate middleboxes and the hosting provider's own network. It is no longer only about secrecy — a page served over HTTP can be modified in transit, so the user cannot trust what they see, and browsers now mark it explicitly as not secure. The protocol details belong to Networking Fundamentals; this entry is about what a developer is responsible for.

## In this track

1. **Certificates and the handshake** (`security/https-tls/01-certificates-and-the-handshake`) — what the certificate proves, who issues it, and how renewal goes wrong.
2. **Why plain HTTP is a hard fail** (`security/https-tls/02-why-plain-http-is-a-hard-fail`) — the attacks it enables and the redirect and migration work it demands.

## Prerequisites

- **Networking Fundamentals (HTTP, DNS, TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`)

## Go deeper

- **Networking Fundamentals (HTTP, DNS, TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`) — read this first; the protocol layer this entry assumes.
- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — the application flaws that TLS does not fix.
- **Content Security Policy (CSP)** (`security/content-security-policy-csp`) — the browser-side control that complements an encrypted channel.
- **Secrets Management** (`security/secrets-management`) — what to do with an API key that travelled over a channel now known to be broken.
