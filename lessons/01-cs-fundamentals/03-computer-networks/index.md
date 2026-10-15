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

A network is a set of machines that agree on how to hand each other small chunks of data. The chunks are packets, the addressing scheme is IP, the two dominant ways of shipping a stream of them are TCP and UDP, and the thing that lets one machine run many conversations at once is the port. DNS is the naming system that turns a name into an address before any of that starts.

## Why it matters

Every request your program makes leaves the process and crosses this layer, and that is where the latency usually is. An endpoint can be efficient in every line of its own code and still take 400 milliseconds because it waits for four round trips. Knowing the layer tells you which number to attack: the connection, the name lookup, or the payload. It also makes the vocabulary honest — a "timeout" is a specific thing here, and a "connection refused" is a different one, and the two point at different fixes.

## In this track

1. **Packets, TCP/IP and ports** (`01-cs-fundamentals/03-computer-networks/01-packets-tcp-ip-and-ports`) — what actually travels, how a reliable stream is built on unreliable packets, and how ports separate conversations.
2. **DNS and the path of a request** (`01-cs-fundamentals/03-computer-networks/02-dns-and-the-path-of-a-request`) — resolving a name, caching it, and counting the round trips before the first byte of a response.

## Prerequisites

None.

## Go deeper

- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application protocols that sit on top of these packets, which this entry deliberately stops short of.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — a socket is a file descriptor, so this layer meets that one at the syscall.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — why waiting on the network is the classic case for non-blocking code.
