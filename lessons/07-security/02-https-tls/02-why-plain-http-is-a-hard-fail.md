---
title: Why plain HTTP is a hard fail
prereqs: ["07-security/02-https-tls/01-certificates-and-the-handshake"]
---

## What it is

Over plain HTTP, every byte between the browser and the server is visible and modifiable by anyone on the path. This is not a hypothetical degradation: session cookies are sent in clear, forms are readable, and the JavaScript that the page loads can be replaced in transit. The question is therefore not whether to migrate a service to HTTPS, but how to do it without breaking the links and integrations that still point at `http`.

## Why it matters

The concrete failures are mundane and severe. A session cookie sent in clear is stolen and replayed. A login form submitted over HTTP hands the credentials to anyone on the network, including a shared office or hotel connection. A page loaded over HTTP can have a script injected by the network, which then runs in the site's origin — the same access as a cross-site scripting flaw, but with no code change needed on your side. Browsers now label such pages explicitly as not secure, and many platform features refuse to work at all outside a secure context.

## Core ideas

### Three things break when traffic is plain

Confidentiality (anyone on the path reads it), integrity (anyone on the path changes it) and authenticity (nobody can prove the server is the one you meant). Encryption alone without a verified certificate supplies none of the last two, which is why the certificate is the load-bearing part.

```text
Same network, plain HTTP
  request   GET /login         visible: which page, which cookies
  response  Set-Cookie: ...    captured and replayed elsewhere
  page      <script src=...>   replaced with a keylogger in the same origin
```

### Redirect, then stop listening

Permanently redirect `http` to `https` on the same hostname, preserving the path and query. Then enable HSTS so the browser refuses to try `http` at all for a period, and add the host to a preload list only once every subdomain is secure.

```text
301 <same host, secure scheme><same path and query>   (permanent)
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

The `includeSubDomains` directive is what makes it dangerous to enable early: it covers subdomains you may not have migrated.

### Never redirect a POST body

A redirect after a form submission loses the body unless the client re-sends it. Fix the form's action to point at `https` directly rather than relying on a redirect for it.

### Update every integration, not just the browser

Webhooks, callbacks, cron jobs, mobile clients pinned to an old endpoint and third-party services all call `http` URLs. Migration is the work of finding them, not of configuring the server.

### Mixed content is a soft failure with a hard cost

An HTTPS page that loads a script, stylesheet or image over HTTP is either blocked or downgraded by the browser, and the insecure request leaks metadata about the session. Serve every subresource from the secure origin.

## Practice

### Audit the product for insecure requests

Load each page in a browser and count the requests that are not HTTPS, then check the server logs for plain-HTTP requests that were served rather than redirected.

Done when: every page has no insecure subresources, and every plain-HTTP request in the log is a redirect with its path preserved.

### Find the machine callers

List every webhook, scheduled job and integration that calls the product by URL, and check whether each one uses `https`.

Done when: the list is complete, each entry is either updated or has an owner and a date.

## Common mistakes

- **Redirecting without HSTS** — the first request of every session is still in the clear; fix: send the header and, once every subdomain is ready, consider preloading.
- **Enabling `includeSubDomains` early** — a not-yet-migrated subdomain is bricked for returning visitors; fix: migrate subdomains first.
- **Redirecting a form POST** — the submission body is lost; fix: point the form at the secure URL.
- **Forgetting machine callers** — webhooks and jobs break silently at migration; fix: inventory every integration that calls a URL.
- **Mixed content left in place** — the page is downgraded and metadata leaks; fix: serve all subresources over HTTPS.

## Go deeper

- **Certificates and the handshake** (`07-security/02-https-tls/01-certificates-and-the-handshake`) — what makes the secure channel trustworthy.
- **HTTPS & TLS** (`07-security/02-https-tls`) — the track this chapter closes.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — redirects, DNS and protocol behaviour in detail.
- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — the application flaws that remain even over a secure channel.
