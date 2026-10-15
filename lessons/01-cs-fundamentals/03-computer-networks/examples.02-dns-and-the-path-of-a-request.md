## Example 1 — The deploy that kept hitting the old machine

A service moves to a new address. The record's lifetime is 86400 seconds and the migration runs at 09:00. By 11:00 roughly half the requests still arrive at the old host, already decommissioned. Say why traffic is still arriving there, and what the team should have done first.

```text
before 09:00:  api.internal.example.com -> 198.51.100.7   lifetime 86400
09:00 change:  api.internal.example.com -> 198.51.100.8   lifetime 86400

resolver A cached the .7 answer at 08:59 -> keeps it until 08:59 tomorrow
resolver B cached the .7 answer at 07:00 -> keeps it until 07:00 tomorrow
```

### Solution

```text
every resolver that learned the old answer keeps it until its own copy
expires — up to 24 hours later. The change is right; it is not visible.

before the migration:
  1. lower the lifetime to 60 seconds
  2. wait longer than the previous lifetime
  3. change the address and deploy the new host
  4. raise the lifetime again once traffic has moved
```

The old address stays in each cache for the lifetime the record declared when it was learned, so a 24-hour lifetime opens a 24-hour window of stale answers; lowering the value first makes the next lookup cheap to refresh. The trap is treating a name change as instantaneous: the browser, the operating system, the stub resolver and any service mesh each hold a copy.

## Example 2 — The round trips a request can and cannot remove

An endpoint in a distant region answers in 480 ms: 40 ms to resolve from cache, 150 ms to connect, 190 ms for the security handshake and 100 ms to the first byte. Say which parts distance fixes and which the code can remove, then give the cost of a second request on the same connection.

```text
request 1: resolve 40 (cached) + connect 150 + handshake 190 + first byte 100
request 2: same connection, same process, connection still open
```

### Solution

```text
request 1 total: 480 ms
request 2 total: ~100 ms — the setup is already paid

removable: connect + handshake = 340 ms, by reusing the connection
fixed:     the 100 ms first byte — one round trip across the distance
```

Setup and handshake are paid once per connection, so a reused connection makes the second request little more than the request-and-response round trip. That remaining trip cannot be faster than the path it crosses, so the only fixes are to move the server nearer or to cache at the edge. The trap is optimising the payload: the body is trivial, and no compression touches a cost counted in round trips.
