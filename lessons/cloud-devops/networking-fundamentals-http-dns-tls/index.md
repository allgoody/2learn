---
title: Networking Fundamentals (HTTP / DNS / TLS)
type: skill
topic: cloud-devops
tier: medium
status: drafted
aliases: ["HTTP", "DNS", "TLS"]
prereqs: ["cs-fundamentals/computer-networks"]
related: []
---

## What it is

This is the application layer of the network: what a request looks like, how a name becomes an address, and how the connection is made trustworthy. It sits directly above the packet-level material in Computer Networks, whose routing, addressing and transport behaviour it assumes rather than repeats. If that entry explained how packets reach each other, this one explains what they carry once they do.

## Why it matters

Almost every production incident has a symptom in this layer: a certificate that expired, a DNS record that did not propagate, a redirect that changed the scheme, a timeout set shorter than the response. These are not deep problems, but they are invisible without the model, and they generate the largest volume of confusing reports. Knowing what a request carries, what a name resolution involves, and what a TLS handshake establishes turns each of them into a one-line diagnosis.

## In this track

1. **HTTP requests and responses** (`cloud-devops/networking-fundamentals-http-dns-tls/01-http-requests-and-responses`) — the message, the methods, the status codes and the parts that proxies rewrite.
2. **Names, addresses and TLS** (`cloud-devops/networking-fundamentals-http-dns-tls/02-names-addresses-and-tls`) — resolution from name to address, and the handshake that establishes trust.

## Prerequisites

- **Computer Networks** (`cs-fundamentals/computer-networks`)

## Go deeper

- **Computer Networks** (`cs-fundamentals/computer-networks`) — the packet-level layer this entry builds on, so read it first.
- **Nginx** (`cloud-devops/nginx`) — the reverse proxy that terminates the connections this track describes.
- **Istio** (`cloud-devops/istio`) — where these protocols between services become an infrastructure concern.
