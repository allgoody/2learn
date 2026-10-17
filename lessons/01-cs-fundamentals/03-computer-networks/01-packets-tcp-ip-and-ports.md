---
title: Packets, TCP/IP and ports
prereqs: []
---

## What it is

Data crosses a network as packets: chunks of bytes that carry a header saying where they come from and where they are going, and a payload of up to 1 460 bytes. IP is the addressing and forwarding scheme that carries a packet hop by hop with no promise that it arrives, arrives once or arrives in order. TCP rebuilds a reliable, ordered byte stream on top of that service, and UDP offers the same unreliable delivery with none of the machinery. A port is a 16-bit number in the header, and an address plus a port is the endpoint that names one conversation.

## Why it matters

This layer explains why network problems look the way they do. A missing packet makes TCP treat the link as congested and halve the bytes it keeps in flight — 1 024 packets to 512 in the trace below — so throughput falls although nothing failed and your code sees only a slow answer. An address and a port together identify one endpoint, which is why two services can share a machine and why a firewall rule that names the address but not the port blocks both. Latency here is counted in round trips, not bytes: on a 7 000 km path one round trip needs about 70 ms of light travel time, and a request over a fresh connection spends four of them — connect 1, handshake 2 and request 1, so (1 + 2 + 1) × 70 = 280 ms — before the first byte of the answer exists. The vocabulary is worth having because it is the vocabulary of every incident report you will read.

## Core ideas

### Packets and best-effort delivery

A packet is a header plus a payload. The IPv4 header is 20 bytes and holds two 4-byte addresses, the source and the destination, among other fields. A link will not carry more than 1 500 bytes in one frame — that limit is the MTU, the maximum transmission unit — and the largest application payload that fits inside it is 1 500 - 20 - 20 = 1 460 bytes, the MSS or maximum segment size, once the 20-byte TCP header is accounted for. A router reads the destination address, chooses the next hop and forwards the packet, and nothing guarantees that the packet arrives at all, arrives once or arrives in order. That is deliberate: keeping no per-conversation state in the network is what lets it scale.

```text
host 203.0.113.9 -> router -> router -> router -> server 198.51.100.7

IPv4 header           20 bytes, holding the source and destination addresses
MTU                 1 500 bytes, the most one frame carries
payload after IP    1 500 -   20 = 1 480 bytes
MSS                 1 500 -   20 - 20 = 1 460 bytes, after the TCP header

each router reads the destination address, picks the next hop, forwards the packet
no router keeps a record of your conversation
```

### A reliable stream built on unreliable packets

TCP numbers every byte of the stream, so the receiver can put packets back into order and notice a gap. It acknowledges what has arrived, resends what has not, and — this is the part that surprises people — treats a missing packet as congestion rather than bad luck: it halves the number of bytes it keeps in flight, so a lossy link does not merely lose data, it reduces throughput for a while afterwards. Opening the connection also costs a round trip, because both ends must agree on a sequence number to start from and confirm that they can hear each other before any payload moves.

```text
client -> SYN, seq = 1 000 000                          -> server
client <- SYN, ACK, seq = 5 000 000, ack = 1 000 001   <- server
client -> ACK, ack = 5 000 001                         -> server

one round trip: the connection is open, and no application byte has moved yet

slow start, with MSS = 1 460 bytes: the bytes in flight double each round trip
  round trip 1  ->     1 packet  =     1 * 1 460 =     1 460 bytes
  round trip 2  ->     2 packets =     2 * 1 460 =     2 920 bytes
  round trip 3  ->     4 packets =     4 * 1 460 =     5 840 bytes
  round trip 11 -> 1 024 packets = 1 024 * 1 460 = 1 494 272 bytes

one lost packet halves the window: 1 024 packets -> 512 packets,
so the sender needs one more round trip to be back where it was
```

### UDP and the datagram shape

UDP sends a datagram — an 8-byte header plus a payload — with no connection, no sequence numbers and no retransmission, so the most it can carry in one datagram is 65 535 - 8 - 20 = 65 507 bytes, the IP and UDP headers included in the 65 535-byte IPv4 limit. It is the right choice when a late packet is worthless: one live audio sample, one position update in a game, one metric reading. Choosing UDP means taking on ordering, duplication and pacing yourself, because the protocol does none of the three and never reports that it did not.

```text
UDP header 8 bytes: source port (2) + destination port (2) + length (2) + checksum (2)
one datagram: 8-byte header + up to 65 535 - 8 - 20 = 65 507 bytes of payload

one video frame every 20 ms is 1 000 / 20 = 50 frames a second
100 frames sent, 99 arrive
  -> the receiver plays the 99 and never waits for the missing one;
     a resend would arrive after the moment the frame was needed
```

### Endpoints, ports and conversations

A port is a 16-bit number in the header, so it runs from 0 to 65 535, and ports 0 to 1 023 within that range are reserved for well-known services. A connection is identified by four numbers — the client's address and port, and the server's address and port — and that is how one server process on one port keeps thousands of simultaneous clients apart. The client's port comes from the ephemeral range, by convention 49 152 to 65 535, which gives 65 535 - 49 152 + 1 = 16 384 ports for one client to start conversations from.

```text
server listens on 198.51.100.7:443, a reserved port a browser dials for a web request

client 203.0.113.9:51874  <->  server 198.51.100.7:443     conversation 1
client 203.0.113.9:51902  <->  server 198.51.100.7:443     conversation 2
client 203.0.113.9:51874  <->  server 198.51.100.8:443     conversation 3

the four numbers name the connection, so the server tells 1 and 2 apart
by the client port alone: 51874 against 51902
```

### The round trip as the unit of cost

A round trip is one message out and one back, and it is the unit the network charges in. Light in fibre travels at about 200 000 km/s, two thirds of its speed in vacuum, so a path 7 000 km long needs 7 000 000 / 200 000 000 = 0.035 s = 35 ms each way, and 2 × 35 = 70 ms for a round trip; real cable runs longer than the straight line, so 70 ms is a floor rather than an estimate. Opening a connection costs one trip, a name lookup one or more, a security handshake one or two, and the request itself one more before the first byte of the answer exists.

```text
speed of light in fibre   200 000 km/s = 200 000 000 m/s
New York to London        about 7 000 km of cable
one way                   7 000 000 / 200 000 000 = 0.035 s = 35 ms
round trip                2 * 35 ms                        = 70 ms

a fresh request, counting round trips:
  name lookup  1 * 70                      =  70 ms   a cache miss with a resolver one trip away
  connect      1 * 70                      =  70 ms
  handshake    2 * 70                      = 140 ms
  request      1 * 70                      =  70 ms
  total       (1 + 1 + 2 + 1) * 70         = 350 ms before the first byte
  a resolver that has to walk the hierarchy makes the first line 3 round trips instead
  the same request on a connection already open: 1 * 70 = 70 ms

a 1 MB body, once the connection is open and the pipe is full:
  1 MB = 1 000 000 bytes = 8 000 000 bits
  8 000 000 / 100 000 000 = 0.08 s = 80 ms on a 100 Mbit/s link
```

## Practice

### Count the round trips

Pick one endpoint your application calls. Using a packet capture tool or a client's timing output, write out the round trips between opening the connection and receiving the first byte of the response, and put a millisecond figure on each one.

Done when: your list names each trip's purpose and its measured cost, the figures add up to roughly the total your client reports, and you have named the one trip that would be cheapest to remove.

### Feel the difference a handshake makes

Write a client that opens a fresh connection for each of ten requests, then a version that sends all ten over one connection. Time both, and work out how much of the difference is connection setup.

Done when: the pooled run saves about 1.9 s on a 70 ms round trip, and you can attribute the saving to ten setups of `70 + 2 * 70 = 210 ms` against one — `10 * 210 = 2 100 ms` against 210 ms — rather than to the payload.

## Common mistakes

- **Treating a dropped packet as an application fault** — TCP resends it without telling your code, so the symptom is a slower answer rather than an error, and the retry costs one round trip you never see; fix: measure round trips and loss before suspecting your logic.
- **Assuming TCP preserves message boundaries** — it delivers a byte stream, so a 11-byte `LOGIN alice` and a 6-byte `STATUS` written separately may arrive as one 11 + 6 = 17-byte read, or one write may arrive as two reads; fix: frame every message with a length prefix or an unambiguous delimiter.
- **Using UDP and then expecting order** — datagrams arrive out of order and sometimes not at all, and the protocol never reports which; fix: add sequence numbers and a policy for missing data, or use TCP.
- **Confusing an address with an endpoint** — a rule or a log line that omits the port describes all 65 536 ports at once, so it blocks or explains several services together; fix: record address and port as a pair.
- **Blaming bandwidth for a slow small request** — a 2 kB body is 2 000 × 8 = 16 000 bits, under a millisecond on any link, while one round trip across 7 000 km is 70 ms; fix: count round trips before upgrading the pipe.

## Go deeper

- **DNS and the path of a request** (`01-cs-fundamentals/03-computer-networks/02-dns-and-the-path-of-a-request`) — where an address comes from before any of this starts, and what the whole path costs.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application protocols layered on top, deliberately left out here.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — what the kernel does with a socket, and why a blocking read is a scheduler event.
