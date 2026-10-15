---
title: Nginx
type: skill
topic: 06-cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["06-cloud-devops/10-networking-fundamentals-http-dns-tls"]
related: []
---

## What it is

Nginx is a web server that is most often deployed as a reverse proxy: it accepts connections from clients and passes them to one or more application servers behind it. In that role it serves static files directly, terminates TLS, spreads requests across several backends, and hides the application's actual topology from the outside world. It is a piece of infrastructure that sits between the internet and everything else.

## Why it matters

Almost every production web system has something in this position, and understanding the role makes the configuration readable and the failures diagnosable. A reverse proxy is where connection limits, timeouts, buffering and header rewriting actually happen, which is why a surprising proportion of site incidents — a truncated upload, a slow response with no origin trace, a client seeing the wrong scheme — are really proxy configuration. It is also the cheapest place to add TLS, compression and static caching without touching application code.

## Core ideas

### It accepts the connection so the application does not have to

The application server behind the proxy can be simple and slow to start, because the proxy holds the client connection, handles the slow client on a fast network, and gives the backend a bounded amount of work. This decoupling is the reason the pattern exists: the internet-facing concern and the business logic are separated, and each can be sized and replaced independently.

```text
client -> nginx (TLS, static files, limits) -> app servers
```

### TLS terminates here, and that decides the scheme

Encrypting at the proxy means certificates are managed in one place, and the backend speaks plain HTTP inside a trusted network. The consequence to remember is that the application sees a plain HTTP request and may render an insecure URL unless the proxy passes the original scheme and host in headers. That is the source of the classic mixed-content and redirect-loop problems.

### Load balancing is a policy choice

Requests can be distributed round-robin, by least connections, by a hash of some key, or with weights and failover. A hash keeps a client on one backend, which helps when the backend holds session state and hurts when it fails. Choosing deliberately, and deciding what happens when a backend is unhealthy, is what keeps the balancing from being an accident.

### Buffering and timeouts are where uploads and long requests are decided

The proxy can buffer a request body and a response before passing it on, which protects a slow backend from a slow client. It also means a large upload is written to disk, and that request and response timeouts apply at the proxy even if the application is willing to wait longer. Most "the upload fails at exactly one minute" reports are one of these settings.

### Static files are served without waking the application

A proxy serving images, stylesheets and downloads directly removes that traffic from the application entirely. It also gives a natural place for caching headers and compression. The same is true of health endpoints used by an upstream balancer, which is why they are often answered at the proxy.

### It is also a policy point

Access rules, request size limits and rate limiting live here, before any application code runs. That makes the proxy an effective place to blunt a crude attack or a runaway client. It is not a substitute for application-level security, because a well-formed request that abuses the business logic passes through untouched.

## Practice

### Serve a static site through a proxy

Put a static directory behind the proxy and an application behind a path, and confirm that static files are answered without reaching the backend.

Done when: the application's logs show no request for the static path, and the response carries the proxy's caching header.

### Trace a proxy-caused timeout

Configure a request timeout shorter than the application's typical response time, then send a slow request and read the response the client actually receives.

Done when: you can name the setting that caused the response and the evidence in the proxy's log that identifies it.

## Common mistakes

- **Not passing the original scheme and host to the backend** — the application generates the wrong URLs and redirects loop; fix: forward the scheme and host headers and trust them only from the proxy.
- **Leaving the default request body limit** — a large upload is rejected with a confusing error; fix: set the limit to match what the application expects.
- **Balancing by hash while expecting failover** — clients stay pinned to a failed backend; fix: choose the policy deliberately and define the unhealthy behaviour.
- **Using the proxy as the only security control** — valid requests that abuse the business logic pass through; fix: keep application-level authorisation and validation.
- **Ignoring proxy timeouts when a request is legitimately slow** — the client is cut off while the backend keeps working; fix: align the proxy's timeouts with the application's real response time.

## Go deeper

- **Networking Fundamentals (HTTP / DNS / TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the protocols this proxy terminates and forwards, so read it first.
- **CI/CD** (`06-cloud-devops/08-ci-cd`) — how a proxy configuration change is tested and released alongside the application it fronts.
- **Docker** (`06-cloud-devops/06-docker`) — the common way a proxy and its backends are packaged and run together.
