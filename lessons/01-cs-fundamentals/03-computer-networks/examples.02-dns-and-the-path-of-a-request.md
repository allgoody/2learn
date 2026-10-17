## Example 1 — The deploy that kept hitting the old machine

A service moves to a new address at 09:00 and the old host is decommissioned. The record it moved from declared a TTL of 86 400 s, which is 86 400 / 3 600 = 24 hours. By 11:00, two hours later, roughly half the requests still arrive at the old host. Say why traffic is still going there, and what the team should have done first.

```text
before 09:00:  api.internal.example.com -> 198.51.100.7   TTL 86 400 s = 24 h
09:00 change:  api.internal.example.com -> 198.51.100.8   TTL 86 400 s = 24 h

resolver A learned the .7 answer at 08:59 -> A keeps it until 08:59 the next day
resolver B learned the .7 answer at 07:00 -> B keeps it until 07:00 the next day

at 11:00, A has held the old answer for 2 h of its 24 h, and B for 4 h
every request that A or B answers still goes to 198.51.100.7
```

### Solution

```text
each resolver that learned the old answer keeps it until its own copy expires:
up to 86 400 s - 2 h = 22 h more for A. The change is right; it is not visible yet.

before the migration:
  1. lower the TTL to 60 s
  2. wait longer than the old TTL, so every cache holds the low value: over 86 400 s = 24 h
  3. change the address and deploy the new host, now visible within 60 s
  4. raise the TTL again once traffic has moved
```

An answer stays in each cache for the TTL the record declared when the cache learned it, so a 24-hour TTL opens a 24-hour window of stale answers, and lowering the value afterwards is too late for the resolvers that already hold the old one. That is why step 2 waits out the old TTL before anything moves: after that wait, every cache refreshes to the 60-second value and the next change is visible in a minute. The trap is treating a name change as instantaneous — the browser, the operating system's stub resolver, the recursive resolver and any service mesh each hold a copy with its own timer.

## Example 2 — The round trips a request can and cannot remove

An endpoint in a distant region answers in 480 ms. The measured phases are 40 ms to resolve the name from cache, 150 ms to connect, 190 ms for the security handshake and 100 ms to the first byte of the answer. Say which of those distance alone fixes, which the code can remove, and what a second request over the same connection costs.

```text
request 1: resolve 40 (cached) + connect 150 + handshake 190 + first byte 100 = 480 ms
request 2: same process, same connection, still open

the connection was opened once, so request 2 repeats only the last phase
```

### Solution

```text
request 1 total: 40 + 150 + 190 + 100 = 480 ms
request 2 total:                                 100 ms
   because connect and handshake are already paid: 150 + 190 = 340 ms of them

removable by reuse: 340 ms, the setup half of request 1
fixed by distance:  100 ms, one round trip of about 10 000 km each way at 200 000 km/s:
                    2 * 10 000 000 m / 200 000 000 m/s = 0.1 s
```

Setup and handshake are paid once per connection, so a reused connection turns the second request into little more than the request-and-response round trip. The remaining 100 ms cannot be faster than the path it crosses, so the only fixes are to move the server nearer or to cache at the edge — a cache answers without crossing the distance at all. The trap is optimising the payload: the body is trivial, and no compression touches a cost counted in round trips.
