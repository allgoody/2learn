## Example 1 — A retry that creates a second order

A client reports that a create sometimes arrives twice. The exchange below is the one that preceded it. Say which instruction is dangerous, why the method made this retry unsafe, and what to change.

```text
request
  POST /orders
  Host: shop.example.test
  Content-Type: application/json
  Content-Length: 84
response
  301
  Location: <the same host and path, secure scheme>
  Cache-Control: max-age=31536000
```

### Solution

```text
cause:  301 is cached and remembered, so every later request is repeated against
        the secure scheme; POST is not safe to repeat and a retry may create a duplicate
change: use 302 for a condition that may change; keep 301 for a permanent move only
        mark the creating endpoint's responses not cacheable
keep:   GET is still retried freely; PUT /orders/42 is safe to repeat
```

A permanent redirect is remembered long after the condition that justified it, and pairing it with a method that is not safe to repeat turns every retry into a possible duplicate. A temporary redirect, plus cache instructions that match the endpoint's meaning, leaves the decision with the client. The usual mistake is to treat the redirect as harmless plumbing: it is the client's standing instruction for all future requests.

## Example 2 — A forwarding header the caller chose

A request reaches the application carrying an origin header that the caller wrote. The application now trusts it. Rewrite the handling so the closest component sets the header and untrusted input cannot.

```text
as seen by the application
  GET /profile
  Host: app.internal.example.test
  X-Forwarded-For: 198.51.100.7, 10.0.0.5
```

### Solution

```text
at the proxy: overwrite X-Forwarded-For with the address it observed, never append
              untrusted input, and strip the header on requests arriving from outside
at the app:   read the value only from the trusted proxy, otherwise use the peer
              address of the connection itself
also:         an authenticated profile response is marked Cache-Control: private
```

Headers carry the context a body cannot, but the component nearest the client must set them and the application must take them only from that component; otherwise any caller can claim any origin. The same review applies to caching, where an authenticated response marked private is not stored by a shared cache. The usual mistake is to trust the header because it is present and its value looks plausible.
