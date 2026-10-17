---
title: Computer Networks
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A network is a set of machines that agree on how to hand each other small chunks of data. The chunks are packets, each carrying a header and up to about 1 460 bytes of payload; the addressing and forwarding scheme is IP; the two dominant ways of shipping a stream of them are TCP, which resends what is lost, and UDP, which leaves that to you; and the 16-bit number that lets one machine run many conversations at once is the port. DNS is the naming system that turns a name such as `api.internal.example.com` into an address before any of that begins.

## Why it matters

Every request your program makes leaves the process and crosses this layer, and that is where the latency usually is. An endpoint can be efficient in every line of its own code and still take 400 ms, because a path 10 000 km long costs 10 000 000 / 200 000 000 = 0.05 s = 50 ms each way and 2 × 50 = 100 ms per round trip, and resolving a name, connecting, negotiating security and sending the request are four round trips: 4 × 100 = 400 ms. Knowing the layer tells you which number to attack — the connection, the name lookup or the payload — and it keeps the vocabulary honest, because a "timeout" is one specific thing here and a "connection refused" is another, pointing at different fixes. The first fix to a slow request is usually to remove a round trip rather than to shrink the body, since a 2 kB body is 2 000 × 8 = 16 000 bits and crosses any link in under a millisecond.

## In this track

1. **Packets, TCP/IP and ports** (`01-cs-fundamentals/03-computer-networks/01-packets-tcp-ip-and-ports`) — what actually travels, how a reliable ordered stream is built from 1 460-byte packets that may be lost, and how a four-number endpoint keeps thousands of conversations apart.
2. **DNS and the path of a request** (`01-cs-fundamentals/03-computer-networks/02-dns-and-the-path-of-a-request`) — resolving a name, caching the answer for its TTL, and counting the round trips that stand between a click and the first byte of a response.

## Prerequisites

None.

## Go deeper

- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application protocols that sit on top of these packets, which this entry deliberately stops short of.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — a socket is a file descriptor, so this layer meets that one at the syscall.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — why waiting 100 ms for a round trip is the classic case for non-blocking code.
