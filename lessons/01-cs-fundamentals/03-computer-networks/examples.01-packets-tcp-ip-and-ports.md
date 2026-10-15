## Example 1 — Two writes that arrived as one read

A client sends a login message and then a status message over one TCP connection, as two writes. The server below assumes one read equals one message. Say what it sees when both writes land in the same packet, and rewrite the reader so the boundary is explicit.

```text
client writes: "LOGIN alice" then "STATUS"
wire, one packet: LOGIN aliceSTATUS

server:
    chunk = socket.read()
    if chunk == "LOGIN alice": login(chunk)
    elif chunk == "STATUS": status()
```

### Solution

```text
LOGIN aliceSTATUS matches neither branch: a TCP byte stream has no
message boundary, and the same two writes may split as "LOGIN ali"
plus "ceSTATUS" instead.

framing: send a length before the payload
client writes: 12 + "LOGIN alice" + 6 + "STATUS"
server:
    n = read_exactly(4)        # the length prefix
    msg = read_exactly(n)      # exactly that many bytes
```

TCP delivers an ordered stream of bytes, not a sequence of messages, so one read returns however much has arrived: two writes can merge and one write can split. Framing with a length prefix, or an unambiguous delimiter, puts the boundary back into the data. The trap is that on a quiet local connection the writes arrive separately, so the code passes every test until the timing changes.

## Example 2 — Where the milliseconds went

A page makes four API calls and opens a fresh connection for each. One call takes 340 ms for a 2 kB response: 90 ms to resolve, 60 ms to connect, 90 ms for the security handshake and 100 ms to the first byte. Say which is paid per connection, and what the page would cost with one shared connection.

```text
4 calls, fresh connection each:
  resolve     90 ms   first call only; later calls hit the resolver cache
  connect     60 ms   per connection
  handshake   90 ms   per connection
  first byte 100 ms   per request

one call measured: 340 ms for a 2 kB body
```

### Solution

```text
per connection: connect 60 + handshake 90 = 150 ms
fresh:   90 + 4*60 + 4*90 + 4*100 = 1090 ms of round trips
shared:  90 + 60 + 90 + 4*100     =  640 ms
```

Setup and handshake are paid per connection, so four connections pay them four times, while the 2 kB body is small enough that its transfer time is noise. Resolution is cached after the first lookup, which is why only the first call pays it, and reusing one connection removes 450 ms. The trap is blaming bandwidth: the body is 2 kB, and a wider pipe changes nothing because the cost is counted in round trips, not bytes.
