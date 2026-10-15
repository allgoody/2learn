---
title: Injection and access control
prereqs: []
---

## What it is

Injection is putting untrusted input into something that interprets it — a SQL query, a shell command, an LDAP filter, a template — so that the input is read as instructions. Broken access control is the system answering "who are you?" correctly and then failing to ask "may you see this?". Together they are the two classes that hand an attacker data they were never entitled to.

## Why it matters

These are the flaws that turn a normal feature into a breach. Injection appears whenever a developer builds a query or a command by joining strings, which is the natural thing to write and almost always the wrong thing. Access control fails at the object level, where a check exists on the list page but not on the detail endpoint, so changing a number in a URL shows someone else's invoice. Both are cheap to prevent and expensive to discover afterwards.

## Core ideas

### Never build a query by concatenation

Use parameterised queries or an ORM's binding. The input is then passed as data and cannot change the structure of the statement.

```ts
// Wrong: input becomes part of the query text
db.query(`SELECT * FROM orders WHERE id = '${req.params.id}'`);

// Right: the driver sends the value separately from the statement
db.query("SELECT * FROM orders WHERE id = $1", [req.params.id]);
```

The same rule applies to shell commands, where the fix is to pass an argument array rather than a command string, and to templates or expression languages, where the fix is usually to pass values rather than to render code.

### Ask "may this user see this row?" at the object level

Authorisation is per object, not per route. A list endpoint that filters by tenant does not protect the detail endpoint; each one needs its own check against the resource.

```text
Broken   GET /invoices/1042   -> loads invoice 1042, no owner check
Fixed    GET /invoices/1042   -> load invoice; if invoice.accountId !==
                                 session.accountId -> 404
```

Return a not-found rather than a forbidden where the existence of the record is itself sensitive.

### Deny by default, allow explicitly

New endpoints must fail closed. A framework that serves any action unless a rule says otherwise will leak the first endpoint somebody adds in a hurry.

### Validate input at the boundary, encode at the point of use

Validation rejects what should never have arrived; escaping or parameterising protects the place where the value is used. Doing only one of them is a common half-fix — allow-listing an id format does not protect a template that renders it.

### Check the authorisation you actually need

Roles are not enough. "Any logged-in user" is a role, not an authorisation: the question is always whether this user may perform this action on this object.

## Practice

### Find and fix one concatenated query

Search the codebase for query strings built by joining, and convert one of them to a parameterised call.

Done when: the query no longer contains interpolation, and a test with an input containing a quote character returns a normal result rather than an error.

### Test one endpoint for object-level authorisation

Take a detail endpoint and try it with an identifier belonging to another account, using your own valid session.

Done when: the response is a not-found or an authorisation error, not another user's data — or the hole is written up with the fix.

## Common mistakes

- **String-built queries** — user input changes the statement's structure; fix: parameterise or use an ORM binding.
- **Authorising the route but not the object** — changing an id in a URL exposes another tenant's record; fix: check ownership on every object fetch.
- **Trusting a client-supplied identifier** — the client sends the account id it wants; fix: derive the tenant from the session, never from the request.
- **Allow by default** — a newly added endpoint inherits access; fix: deny by default and require an explicit rule.
- **Validating only at the boundary** — the value is still rendered raw somewhere downstream; fix: also encode at the point of use.

## Go deeper

- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — the track this chapter opens.
- **Cross-site scripting and the browser-side classes** (`07-security/01-web-security-owasp-top-10/02-cross-site-scripting-and-the-browser-side-classes`) — the client-side half of the same problem.
- **Content Security Policy (CSP)** (`07-security/06-content-security-policy-csp`) — a second layer of defence when output encoding fails.
- **HTTPS & TLS** (`07-security/02-https-tls`) — the transport protection that keeps credentials out of a network log.
