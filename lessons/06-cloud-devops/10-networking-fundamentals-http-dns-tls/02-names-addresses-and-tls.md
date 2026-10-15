---
title: Names, addresses and TLS
prereqs: ["06-cloud-devops/10-networking-fundamentals-http-dns-tls/01-http-requests-and-responses"]
---

## What it is

Before a request can be sent, a name has to become an address, and before the response can be trusted, the connection has to be secured. Resolution walks a hierarchy of name servers to find the address; a TLS handshake proves the server's identity and agrees on encryption. Both happen before the first byte of the request, which is why both appear in incidents as delays or failures with no application involvement at all.

## Why it matters

The most common causes of "the site is down" are not in the application: a certificate has expired, a name resolves to an old address, a record has not propagated, or the name resolves differently from inside the network than from outside. None of these show up in application logs, and all of them are quick to confirm once the model is in hand. Understanding the sequence also explains why adding a record is fast while changing one can take hours.

## Core ideas

### Resolution walks from most specific to most authoritative

A client asks a resolver, which walks from the root, to the authoritative server for the domain, and returns the answer. Answers are cached at each step for a time the record itself declares, which is the reason a change is not immediate and the reason lowering that value before a migration is standard practice.

```text
client -> resolver -> root -> top-level domain -> authoritative server
                    (each caching the answer for the record's time to live)
```

### Record types answer different questions

An address record gives an address, a name record gives another name, mail records say where mail goes, and service records describe where a service lives. Multiple address records can spread traffic, which also means a client may be sent to any of them. Being explicit about which question each record answers makes a zone file readable and stops accidental substitutions.

### Certificate names must match the name that was requested

A certificate is valid for a set of names, and the client checks that the name it asked for is among them. A certificate for one name does not authenticate another, which is why adding a name to a service requires either a broader certificate or a new one. Wildcards cover one label of a domain, not all of them.

### The handshake proves identity and agrees a key

The client and server exchange a key material and the server presents its certificate plus proof that it holds the corresponding private key. The client then validates the certificate against a trusted authority, its validity dates and the requested name. Only after that does encryption begin, which is why the handshake — not the request — is the slow part of a new connection.

```text
client hello -> server certificate + key exchange -> client validates -> encrypted session
```

### Certificate lifetime is a scheduled event

Certificates expire, and an expiry is an outage with a known time and date. Automated renewal makes it a non-event; manual renewal makes it a recurring incident that happens whenever the person who remembers is unavailable. The failure is usually invisible until the day it is total, which is exactly why it is worth automating rather than documenting.

### The sequence of delays points at the culprit

Resolution delay, connection handshake delay and response delay are different stages with different causes. Measuring them separately turns "the site is slow" into "the name resolves slowly from this network" or "the handshake is taking two seconds" — each with its own fix.

## Practice

### Trace a name to its answer

Resolve a name step by step, identify the authoritative server that answered and the time to live on the record.

Done when: you can say how long the answer will be cached and which change would require the record's time to live to be lowered first.

### Inspect a certificate's coverage

Fetch a certificate and list the names it covers, then check whether a name that is not on the list would be accepted.

Done when: you can state the exact set of names the certificate authenticates and why a sibling name fails.

## Common mistakes

- **Changing a record without lowering its time to live first** — clients keep the old answer for hours; fix: lower the value, wait, then change.
- **Trusting a certificate whose name does not match** — the client was talking to the wrong service; fix: check the requested name against the certificate's coverage.
- **Renewing certificates by hand** — expiry becomes a scheduled outage; fix: automate renewal and alert on its failure.
- **Reading an address record as a name record** — resolution fails or silently points elsewhere; fix: confirm the record type answers the question being asked.
- **Diagnosing resolution from inside the same network** — internal and external answers differ; fix: check from the client's position, not the server's.

## Go deeper

- **HTTP requests and responses** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls/01-http-requests-and-responses`) — the message that follows this resolution and handshake.
- **Networking Fundamentals (HTTP / DNS / TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the layer these two child lessons make up.
- **Nginx** (`06-cloud-devops/19-nginx`) — where TLS termination is usually configured in practice.
