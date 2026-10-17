## Example 1 — Two writes that arrived as one read

A client sends a login message and then a status message over one TCP connection, as two writes. The server below assumes that one read returns one message. `"LOGIN alice"` is 11 bytes — 5 for `LOGIN`, 1 for the space, 5 for `alice` — and `"STATUS"` is 6. Say what the server sees when both writes land in the same packet, and rewrite the reader so the message boundary is explicit.

```text
client writes "LOGIN alice" (11 bytes), then "STATUS" (6 bytes)
on the wire, one packet: LOGIN aliceSTATUS, 11 + 6 = 17 bytes

server:
    chunk = socket.read()
    if chunk == "LOGIN alice": login(chunk)
    elif chunk == "STATUS": status()
```

### Solution

```text
the 17-byte read LOGIN aliceSTATUS matches neither branch, so it is dropped
a TCP byte stream has no message boundary: the same two writes may instead split as
  "LOGIN ali" (9 bytes) plus "ceSTATUS" (8 bytes), 9 + 8 = 17

fix: put the length in front of the payload, in a fixed-width field
  2-byte length prefix, so any message up to 65 535 bytes fits
  the send becomes 2 + 11 + 2 + 6 = 21 bytes on the wire

server:
    n = read_exactly(2)        # the length prefix, always 2 bytes
    msg = read_exactly(n)      # exactly that many bytes: 11, then 6
```

TCP delivers an ordered stream of bytes, not a sequence of messages, so one read returns however much has arrived by then: two writes can merge into one read and one write can split across two. A length prefix puts the boundary back into the data, and the reader waits until it holds exactly the number of bytes it was promised. The trap is that on a quiet local connection the two writes arrive separately, so the code passes every test until the timing changes.

## Example 2 — Where the milliseconds went

A page makes four API calls and opens a fresh connection for each one. The first call takes 340 ms for a 2 kB response: 90 ms to resolve the name, 60 ms to connect, 90 ms for the security handshake and 100 ms to the first byte of the answer. Say which of those costs is paid once per connection and which once per request, and what the four calls cost over one shared connection.

```text
4 calls, a fresh connection for each one:
  resolve      90 ms   paid by the first call only; later calls find the answer in the resolver cache
  connect      60 ms   paid per connection: one round trip
  handshake    90 ms   paid per connection: the security negotiation
  first byte  100 ms   paid per request: one round trip to the server
  the 2 kB body is 2 000 * 8 = 16 000 bits, under a millisecond on any link

first call measured: 90 + 60 + 90 + 100 = 340 ms for a 2 kB body
```

### Solution

```text
setup per connection: connect 60 + handshake 90 = 150 ms

4 fresh connections:
  resolve      1 *  90 =   90 ms
  connect      4 *  60 =  240 ms
  handshake    4 *  90 =  360 ms
  first byte   4 * 100 =  400 ms
  total        90 + 240 + 360 + 400 = 1 090 ms

1 shared connection:
  resolve      1 * 90 =    90 ms
  connect      1 * 60 =    60 ms
  handshake    1 * 90 =    90 ms
  first byte   4 * 100 =  400 ms
  total        90 + 60 + 90 + 400 = 640 ms

saved: 1 090 - 640 = 450 ms, all of it setup that four connections paid four times
```

Setup and handshake are charged per connection, so four connections pay them four times, while the 2 kB body is small enough that its transfer time disappears into the noise. The name lookup is a round trip on the first call only, because the resolver keeps the answer for as long as the record's TTL declares. The trap is blaming bandwidth: the body is 16 000 bits, and a wider pipe changes nothing, because the cost here is counted in round trips rather than bytes.
