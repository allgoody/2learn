---
title: Packets, TCP/IP and ports
prereqs: []
---

## What it is

Data crosses a network as packets: small labelled chunks that can be lost, duplicated or reordered on the way. IP is the addressing scheme that gives every machine an address and a best-effort delivery service. TCP builds a reliable, ordered stream on top of that unreliable service. UDP uses the same packets without the reliability machinery. Ports are the numbers that let one machine multiplex many conversations onto one address.

## Why it matters

The layer explains why network problems look the way they do. A message that must arrive arrives slowly under loss, because TCP treats a missing packet as congestion and slows down — that is the protocol working as designed, not a bug in your client. A dropped packet produces a retry you never see. An address and a port together identify one endpoint, which is why two services can share a machine and why a firewall rule ignoring the port blocks both. The vocabulary here is the vocabulary of every incident report you will read.

## Core ideas

### IP delivers packets, best effort

Every packet carries a source and destination address and is forwarded hop by hop by routers that know only the next hop, not the whole path. Nothing guarantees the packet arrives, arrives once, or arrives in order. That is deliberate: stateless forwarding is what lets the network scale. Reliability is left to the ends, which is the design principle the whole stack is built on.

```text
your host -> router -> router -> router -> server
each hop: look at the destination address, forward it on
```

### TCP turns packets into a stream

TCP adds sequence numbers, acknowledgements and retransmission, so the application sees an ordered byte stream rather than a series of chunks. It also slows down when it detects loss, which is why a lossy link does not merely drop data but reduces throughput. This is also why a TCP connection has a set-up cost: both ends agree on a starting sequence and confirm they can hear each other, which takes a round trip before any payload moves.

```text
client -> SYN         -> server
client <- SYN, ACK    <- server
client -> ACK         -> server      (connection open, 1 round trip)
```

### UDP keeps the shape of the packets

UDP sends a datagram with no connection, no ordering and no retransmission. That is the right choice when a late packet is worthless — live audio, a game position update, a metric sample — and when the application wants to decide for itself what to do about loss. Choosing UDP means taking on ordering, duplication and pacing yourself.

### Ports separate conversations

A port is a number in the packet header, and an address plus port is an endpoint. A server listens on a well-known port such as 443; the client picks an ephemeral port and the operating system tracks the pair of endpoints as a connection. That pairing is how one server process handles thousands of simultaneous clients without confusing their data.

```text
client 203.0.113.9:51874  <->  server 198.51.100.7:443
client 203.0.113.9:51902  <->  server 198.51.100.7:443   (different conversation)
```

### The round trip is the unit of cost

Latency is measured in round trips, not in bytes. Opening a connection costs one, a name lookup costs one or more, an application handshake costs another. A payload large enough to fill the pipe costs time proportional to its size, but small messages are dominated by the number of trips. This is why the first fix to a slow request is usually to remove a round trip rather than to shrink the payload.

## Practice

### Count the round trips

Pick one endpoint your application calls. Using a packet capture tool or a client's timing output, count the round trips between opening the connection and receiving the first byte of the response.

Done when: you can list each round trip in order, with its purpose, and name the one that would be cheapest to remove.

### Feel the difference a handshake makes

Write a client that opens a fresh connection for each of ten requests, then a version that sends all ten over one connection. Time both.

Done when: the pooled version is measurably faster and you can attribute the saving to the connection setup rather than to the payload.

## Common mistakes

- **Treating a dropped packet as an application fault** — retransmission is invisible to your code, so the symptom is latency rather than an error; fix: measure round trips and loss before suspecting your logic.
- **Assuming TCP preserves message boundaries** — it delivers a byte stream, so two writes can arrive as one read or one write as two; fix: frame your messages with a length prefix or a delimiter.
- **Using UDP and then expecting order** — datagrams arrive out of order and sometimes not at all; fix: add sequence numbers and decide a policy for missing data, or use TCP.
- **Confusing an address with an endpoint** — a rule or a log that omits the port describes several services at once; fix: record address and port together.
- **Blaming bandwidth for a slow small request** — a few kilobytes are dominated by latency, not throughput; fix: count round trips before upgrading the pipe.

## Go deeper

- **DNS and the path of a request** (`01-cs-fundamentals/03-computer-networks/02-dns-and-the-path-of-a-request`) — where an address comes from before any of this starts, and what the whole path costs.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application protocols layered on top, deliberately left out here.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — what the kernel does with a socket, and why a blocking read is a scheduler event.
