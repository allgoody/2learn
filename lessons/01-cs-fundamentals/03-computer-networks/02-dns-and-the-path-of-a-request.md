---
title: DNS and the path of a request
prereqs: ["01-cs-fundamentals/03-computer-networks/01-packets-tcp-ip-and-ports"]
---

## What it is

DNS is a distributed naming system that turns a name such as `api.internal.example.com` into an address such as 198.51.100.7 by asking a hierarchy of servers, each of which knows only its own part of the name, and by caching every answer it receives. Once a name resolves, a request travels through a chain of steps — name lookup, connection setup, protocol negotiation, request, response — and each step costs at least one round trip before any useful bytes move.

## Why it matters

Name resolution is the most commonly forgotten source of latency and the most commonly forgotten source of outages. A record with a lifetime of 86 400 s = 24 h keeps traffic going to a machine you decommissioned for up to a day, and every resolver that cached the old answer holds its own copy until its own timer runs out. A slow resolver delays every new connection: three lookups of 30 ms each add 3 × 30 = 90 ms to a request whose own server answers in 10 ms, which is nine times the server's own work. Because the result is cached, the problem often appears only on a cold start or after a deploy, which makes it look random. Counting the steps turns "the network is slow" into a number attached to a step.

## Core ideas

### A name read from the right

A name is a path through a hierarchy, read from the right: the rightmost label is the top-level domain, then the organisation's domain, then each subdomain, and the empty label after the final dot is the root. The name `api.internal.example.com` therefore holds the labels `api`, `internal`, `example` and `com`, so `com` is resolved first. Each level has servers that are authoritative for the level below it — they hold that level's records and answer for them — and no single server knows every name, which is what lets the system grow without a central copy.

```text
api.internal.example.com        read from the right

com                         the top-level domain, served by the .com registry servers
example.com                 served by example's own authoritative servers
internal.example.com        a subdomain, served from inside the organisation
api.internal.example.com    the name whose record you asked for

4 labels in front of the empty root label, so up to 4 authorities answer for this name,
and the recursive resolver in the middle does the asking
```

### A resolver walks the hierarchy once, then caches

A recursive resolver asks from the top down and caches every answer for the lifetime the record declares — the TTL, a count in seconds. The first lookup of a name may take several round trips; every lookup within that lifetime costs none on the network. This is also why a record change is not visible everywhere at once: each resolver keeps the old answer until its own copy expires. A short TTL propagates a change quickly and raises the query load; a long one does the opposite.

```text
first lookup, resolver cache empty, TTL = 300 s, 30 ms per internet round trip
  client -> resolver          5 ms    the local network hop
  resolver -> root           30 ms
  resolver -> com            30 ms
  resolver -> example.com    30 ms
  answer -> client            5 ms
  total: 5 + 30 + 30 + 30 + 5 = 100 ms, of which 3 are round trips across the internet

second lookup, 1 minute later, same resolver:
  client -> resolver 5 ms + answer 5 ms = 10 ms, and no internet round trip at all

TTL = 300 s = 5 minutes: a record changed at the source keeps answering with the old
value in this resolver until its own 300 s have passed
```

### A request as a sequence of round trips

Between typing a name and reading a response, several distinct steps happen in sequence, and each one costs at least one round trip across the distance between the client and whatever answers it. The name must resolve, a transport connection must be established, any security handshake must complete, and the application protocol then sends the request and waits for the first byte back.

```text
step                     round trips   on a 70 ms round trip
name lookup, cold        3             3 * 70 = 210 ms
name lookup, cached      0             0 ms
connection setup         1             70 ms
security handshake       2             2 * 70 = 140 ms
request to first byte    1             70 ms

cold, in sequence:  210 + 70 + 140 + 70 = 490 ms before the first byte
name cached:               70 + 140 + 70 = 280 ms
reused connection, later request:                    70 ms
```

### Distance as the floor on latency

A round trip cannot be faster than light through the path, so a server half a planet away has a floor of 200 ms in round trips alone, and no application change removes it. Light in fibre travels at about 200 000 km/s, two thirds of its speed in vacuum, so 20 000 km of cable — roughly Sydney to London, half the planet — needs 20 000 000 / 200 000 000 = 0.1 s = 100 ms each way, and 2 × 100 = 200 ms for a round trip. The available fixes are to reduce the number of round trips — reuse connections, resolve ahead of time, avoid extra handshakes — or to move the server closer to the user, and caching at the edge is the common form of the second.

```text
speed of light in fibre   200 000 km/s = 200 000 000 m/s
Sydney to London          about 20 000 km of cable
one way                   20 000 000 / 200 000 000 = 0.1 s = 100 ms
round trip                2 * 100 ms                       = 200 ms

a security handshake from here costs 2 * 200 = 400 ms, and no code change touches it
removing one round trip saves 200 ms
moving the server 10 000 km closer halves the path: 100 ms saved per round trip
```

### Caches at every layer

The browser caches answers, the operating system's stub resolver caches them, the recursive resolver caches them, and a service mesh may cache them once more. Each cache keeps its copy for the lifetime the record declared when it learned the answer, and each expires on its own clock, in its own order. When debugging, the practical question is not "what does DNS say" but "what does the layer my code talks to believe, and when did it learn it".

```text
browser or client   -> one copy, expiring on its own timer
stub resolver       -> a second copy, same question, its own timer
recursive resolver  -> a third copy, shared by every client that uses it
service mesh sidecar-> a fourth copy, sitting beside your process

4 copies of one answer, each expiring 300 s after it was learned
```

## Practice

### Trace a name by hand

Ask a resolver for a name and read the TTL in the answer. Ask a public resolver for the same name and compare the two, then repeat both immediately and note which lookups went to the network.

Done when: you can state both TTLs in seconds, say which lookups came from a cache, and explain what a TTL of 1 s would change — a change would be visible everywhere within about a second, and every client that asks would reach the authorities rather than a cache.

### Time each step of a request

Take one URL your application calls. Record the time to resolve the name, to connect, to the first byte of the response, and the total.

Done when: the four numbers add up to roughly the total, and you can name the largest one and say whether it is paid once per connection or once per request.

## Common mistakes

- **Assuming a DNS change takes effect immediately** — every resolver that has the answer keeps it until its own TTL expires, 24 h for a record with a TTL of 86 400 s; fix: lower the TTL well before a planned migration, then wait longer than the old value.
- **Resolving the name on every request** — each new connection pays a lookup that a cached result would have removed, 210 ms cold against 0 ms warm in the trace above; fix: hold the connection open, or resolve once and reuse the address.
- **Confusing a cached answer with an authoritative one** — debugging against a cache gives a stale result that looks current, and the cache's copy is the one your code will actually use; fix: query the authoritative server when the answer matters.
- **Ignoring the handshake when counting a request's cost** — the cold request above is 490 ms, of which the request itself is 70 ms and 210 ms is connection setup and handshake; fix: separate the phases and attack the round trips, not the payload.
- **Treating "the network is slow" as one problem** — resolution, connection, handshake and transfer fail and slow differently, and each has its own round trip count; fix: measure the phases separately before changing anything.

## Go deeper

- **Packets, TCP/IP and ports** (`01-cs-fundamentals/03-computer-networks/01-packets-tcp-ip-and-ports`) — the transport underneath these round trips, so read it first.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application protocols and the security handshake this entry only names.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — the same round trips, measured from the browser where the user feels them.
