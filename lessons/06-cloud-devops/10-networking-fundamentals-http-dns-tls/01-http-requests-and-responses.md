---
title: HTTP requests and responses
prereqs: ["06-cloud-devops/10-networking-fundamentals-http-dns-tls"]
---

## What it is

An HTTP exchange is a request message followed by a response message over a connection. The request carries a method, a target, headers and sometimes a body; the response carries a status code, headers and usually a body. Everything else in web operations — caching, redirects, authentication, proxies — is built out of those parts, and reading them carefully answers most questions about what actually happened.

## Why it matters

The message is the interface between components that were written separately: a browser, a proxy, a load balancer and an application all interpret the same headers, and a mistake at any point shows up as odd behaviour at the others. Most mysterious web problems are one header being absent, rewritten or trusted when it should not be. Reading a raw exchange rather than a rendered page is the fastest way past them.

## Core ideas

### The method says what the request means, and some methods must be safe to repeat

A retrieval should not change state and may be retried; a creation is not, in principle, repeatable safely. Intermediaries and clients assume these properties, so an endpoint that changes state on a retrieval will be requested by a pre-fetcher and modified by accident. Respecting the method's meaning is what allows caches and retries to exist.

```text
GET /orders/42      -> read, safe to retry
POST /orders        -> create, retry may create a duplicate
PUT /orders/42      -> replace, repeating gives the same result
```

### Status codes tell the client what to do next

A family indicates the outcome: success, redirect, client error, server error. Redirects tell a client to repeat the request elsewhere, permanently or temporarily — a permanent redirect is cached and remembered, which is why it is dangerous to issue by mistake. Distinguishing a client error from a server error is the first triage step in any report.

### Headers carry the context the body does not

Host, content type, content length, caching instructions, authentication, and the forwarding headers a proxy adds. Because several of them are set by whichever component is closest to the client and then trusted by the rest, a proxy must set them deliberately and the application must not trust them from an untrusted source.

### Bodies have a length and an encoding

A request or response body must be delimited by a length or by a chunked encoding, and may be compressed. This is where truncated uploads and broken streaming arrive, and why the proxy's buffer and size limits matter: a body larger than the limit is rejected before the application sees it.

### Caching is negotiated through headers

Whether a response may be cached, for how long and under what conditions is decided by headers from the application and honoured by intermediaries. A cache in front of an authenticated endpoint is the classic disaster, and it is prevented by the response saying it is private.

### Connections are reused, and that has consequences

Modern HTTP keeps a connection open for many exchanges, which is why a proxy must pass through the client's identity and forwarding information rather than letting the application infer it from the connection. It also explains how a single slow response can hold up a connection while others wait.

## Practice

### Read one exchange raw

Fetch a page with a client that prints the full request and response headers, and identify the caching headers, the content type and the security-related headers.

Done when: you can name which component set each header and whether a cache would store the response.

### Break a redirect deliberately

Create a temporary redirect and a permanent one, request each twice, and describe how the client treats them differently.

Done when: you can explain why the permanent redirect is dangerous to issue by mistake and how a cached one is cleared.

## Common mistakes

- **Changing state on a retrieval** — pre-fetchers and retries modify data; fix: keep retrievals safe and use the right method for changes.
- **Issuing a permanent redirect from a temporary condition** — clients remember it long after the condition changes; fix: use a temporary redirect unless the move is genuinely permanent.
- **Trusting a forwarding header from the internet** — a client can claim any origin; fix: have the proxy set it and strip it from untrusted input.
- **Ignoring body size and timeout limits** — uploads fail confusingly at the proxy; fix: align the limits with what the application expects.
- **Caching an authenticated response** — one user can be served another's data; fix: mark private responses explicitly and review what is cacheable.

## Go deeper

- **Networking Fundamentals (HTTP / DNS / TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the application layer this message belongs to.
- **Names, addresses and TLS** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls/02-names-addresses-and-tls`) — how the connection carrying this message was found and secured.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — the transport behaviour underneath, which explains the timeouts and connection reuse.
