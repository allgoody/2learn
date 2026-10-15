---
title: Certificates and the handshake
prereqs: ["cloud-devops/networking-fundamentals-http-dns-tls"]
---

## What it is

A TLS certificate binds a hostname to a public key and is signed by a certificate authority the client already trusts. During the handshake the server proves it holds the matching private key, and the two sides derive a shared secret and an encryption key for the session. What the client is buying is a guarantee that the machine answering for `shop.example.com` is the one the certificate names.

## Why it matters

The certificate is the only part of HTTPS that defends against an attacker who controls the network rather than the server. Without a valid one, encryption alone would be useless: you would have a private conversation with whoever intercepted you. The failures that reach production are rarely cryptographic; they are operational — an expired certificate, a renewal that did not automate, a missing intermediate chain, or a hostname that does not match what users type.

## Core ideas

### Match the name the user types

A certificate is valid for names listed in it. Adding a hostname without issuing for it produces a hard browser error, not a warning.

```text
Certificate: DNS: example.com, DNS: www.example.com
Users type:  example.com            -> valid
Users type:  shop.example.com       -> name mismatch, browser blocks
```

Cover every subdomain that is served, or use a wildcard where the policy allows, and remember that a missing `www` variant is a real outage for anyone who types it.

### Automate issuance and renewal, then test the automation

Certificates expire, typically within 90 days for the automated authorities. Manual renewal is a recurring outage waiting for someone to be on holiday.

```text
Renewal runs at 2/3 of lifetime, unattended
Alert if renewal has not succeeded 14 days before expiry
Check: monitor the expiry date from outside the network, not from the server
```

An external expiry monitor is the check that catches a broken renewal, because it fails the same way a user would.

### Serve the full chain

The server must send its own certificate plus any intermediate certificates, in order. Browsers cache intermediates after seeing them elsewhere, so a missing intermediate is often invisible in testing and fails for a fresh client.

### Choose protocols and ciphers from a current baseline

Disable the obsolete versions and weak cipher suites, and let the library's recommended defaults do the work. Old protocol versions are only needed by clients that no longer exist in practice.

### Keep the private key private and separate

The key is the identity. Restrict its file permissions, never commit it, and never copy it into a build artefact or an image layer from which it cannot be removed. If it leaks, the certificate must be revoked and reissued, not merely replaced.

## Practice

### Test one host from outside your network

Check the served chain, the hostname match and the expiry date from a machine outside the hosting network, for every hostname the product answers on.

Done when: every hostname in the product shows a valid chain with more than 30 days of validity, tested from outside.

### Break the renewal on purpose

Trigger your renewal process in a staging environment without the automation, and write down how you found out.

Done when: the failure produced an alert before the expiry date, or you have added the alert that would have.

## Common mistakes

- **Manual renewal** — the certificate expires when nobody is watching; fix: automate and alert before expiry.
- **A hostname with no certificate** — a new subdomain produces a hard browser error; fix: cover every served name, including the `www` variant.
- **An incomplete chain** — works in the office and fails for a fresh client; fix: serve the intermediates in order.
- **Obsolete protocol versions left enabled** — the negotiation is downgraded to something broken; fix: use the library's current recommended configuration.
- **The private key copied into build artefacts** — it cannot be removed once published; fix: keep the key out of images and logs, and treat any exposure as a compromise.

## Go deeper

- **Networking Fundamentals (HTTP, DNS, TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`) — read this first; the protocol mechanics this chapter assumes.
- **HTTPS & TLS** (`security/https-tls`) — the track this chapter opens.
- **Why plain HTTP is a hard fail** (`security/https-tls/02-why-plain-http-is-a-hard-fail`) — what the channel is defending against.
- **Secrets Management** (`security/secrets-management`) — handling the private key and everything else that must not be published.
