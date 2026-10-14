---
title: DNS and the path of a request
prereqs: ["cs-fundamentals/computer-networks/01-packets-tcp-ip-and-ports"]
---

## What it is

DNS is a distributed naming system that maps a name such as an internal service to an IP address. It is a hierarchy of servers, each responsible for one part of the name, plus a lot of caching to keep the traffic manageable. Once a name resolves, a request travels through a chain of steps — name lookup, connection setup, protocol negotiation, request, response — and each step adds a round trip before any useful bytes move.

## Why it matters

Name resolution is the most commonly forgotten source of latency and the most commonly forgotten source of outages. A DNS cache with a long lifetime keeps sending traffic to a machine you decommissioned, and a slow resolver delays every new connection your service makes. Because the result is cached, the problem often appears only on a cold start or after a deploy, which makes it look random. Counting the steps turns "the network is slow" into a number attached to a step.

## Core ideas

### The name is read from the right

A name is a path through a hierarchy read right to left. The rightmost label is the top-level domain, then the organisation's domain, then any subdomains. Each level has authoritative servers that point at the level below. No single server knows every name, which is what lets the system grow without a central copy.

```text
api.internal.example.com
  com            -> registry servers for .com
  example.com    -> example's authoritative servers
  internal.example.com -> internal zone
  api.internal.example.com -> the record you asked for
```

### Resolution walks the hierarchy once, then caches

A resolver asks from the top down and caches every answer for the record's lifetime. The first lookup may take several round trips; every lookup within that lifetime costs none. This is why a record change is not visible everywhere at once: different resolvers hold the old answer until their copy expires. Short lifetimes propagate changes quickly and increase query load; long lifetimes do the opposite.

```text
first lookup:  client -> resolver -> root -> com -> example -> answer
cached lookup: client -> resolver -> answer          (no network)
```

### The path of a request is a sequence of round trips

Between typing a name and reading a response, several distinct steps happen in sequence. The name must resolve, a transport connection must be established, any security handshake must complete, and the application protocol then sends the request and waits for the first byte. Each step is at least one round trip across the distance between client and server.

```text
resolve name      (0-n round trips, 0 if cached)
open connection   (1 round trip)
security handshake(1-2 round trips)
send request      (1 round trip to first byte)
```

### Distance sets the floor

A round trip cannot be faster than light through the path, so a server on the other side of the world has a floor of a few hundred milliseconds. No application change removes that. The available fixes are to reduce the number of round trips — reuse connections, resolve ahead of time, avoid extra handshakes — or to move the server closer to the user. Caching at the edge is the common form of the second.

### Caching exists at every layer

The browser caches answers, the operating system caches them, the resolver caches them, and a service mesh may cache them again. Each cache holds a copy for the lifetime the record declares. When debugging, the practical question is not "what does DNS say" but "what does the layer my code talks to believe, and when did it learn it".

## Practice

### Trace a name by hand

Ask a resolver for a name and read the answer's lifetime. Ask a public resolver for the same name and compare, then repeat immediately and note which lookups went to the network.

Done when: you can state the recorded lifetime, say which lookups were served from a cache, and explain what would change if the lifetime were one second.

### Time each step of a request

Take one URL your application calls. Record the time to resolve the name, to connect, to the first byte of the response, and the total.

Done when: the four numbers add up to roughly the total, and you can name the largest one and whether it is a fixed cost or a per-request one.

## Common mistakes

- **Assuming a DNS change takes effect immediately** — every resolver that has the answer keeps it until the lifetime expires; fix: lower the lifetime well before a planned migration.
- **Resolving the name on every request** — each new connection pays a lookup that a cached result would have removed; fix: hold the connection open, or resolve once and reuse the address.
- **Confusing a cached answer with an authoritative one** — debugging against a cache gives a stale result that looks current; fix: query the authoritative server when the answer matters.
- **Ignoring the handshake when counting a request's cost** — a request measured in tens of milliseconds is mostly setup; fix: separate the phases and attack the round trips, not the payload.
- **Treating "the network is slow" as one problem** — resolution, connection, handshake and transfer fail and slow differently; fix: measure the phases separately before changing anything.

## Go deeper

- **Packets, TCP/IP and ports** (`cs-fundamentals/computer-networks/01-packets-tcp-ip-and-ports`) — the transport underneath these round trips, so read it first.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`) — the application protocols and the security handshake this entry only names.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — the same round trips, measured from the browser where the user feels them.
