---
title: Cross-site scripting and the browser-side classes
prereqs: ["security/web-security-owasp-top-10/01-injection-and-access-control"]
---

## What it is

Cross-site scripting is injection into a page: attacker-controlled content is rendered as markup or script, and the browser then executes it with the site's own privileges — reading cookies, making requests as the user, rewriting the page. The neighbouring classes include cross-site request forgery, insecure postMessage handling and third-party script supply chain risk.

## Why it matters

The impact is worse than it sounds because the script runs in the user's session: it can perform any action the user could, including changing their password or transferring money, and the server cannot distinguish those requests from genuine ones. It also spreads — a script on a widely loaded admin page reaches everyone with access to it. The defences are well known and are routinely skipped when content is inserted with an API that does not escape.

## Core ideas

### Escape at the point of output, by context

The correct encoding depends on where the value lands: HTML text, an attribute, a URL, JavaScript or CSS. React's JSX escapes text by default, which is why the danger sits in the escape hatches.

```tsx
// Wrong: renders raw HTML
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// Wrong: putting a value into a URL without encoding
<a href={`/search?q=${query}`}>Search</a>

// Right: let the framework escape text, and encode for the destination
<a href={`/search?q=${encodeURIComponent(query)}`}>Search</a>
```

Where rich text is genuinely needed, sanitise it with an allow-list library on the server, not a regex.

### Use safe DOM APIs, not string-built HTML

Assigning to `innerHTML` parses markup. Text nodes, `textContent` and framework bindings treat the value as data, which is what it is.

### Cookies that matter get HttpOnly and a strict SameSite

An HttpOnly cookie cannot be read by JavaScript, so a successful script injection cannot steal the session. SameSite restricts the cross-site requests used for request forgery.

```text
Set-Cookie: session=...; Secure; HttpOnly; SameSite=Lax; Path=/
```

`Lax` blocks most cross-site POSTs while keeping normal top-level navigation working.

### Treat third-party scripts as code you are running

An analytics tag or a chat widget has full access to the page, including the form the user is typing into (see Secrets Management and Content Security Policy for the controls). Load from named origins only, and keep a list of what is loaded and why.

### Bound what a script may do with a policy

Content Security Policy is the backstop: it limits where scripts may load from and blocks inline script, so an injection that escapes output encoding still often fails to execute.

## Practice

### Audit every raw-HTML insertion

List every place in the codebase that renders untrusted content as markup — `innerHTML`, a framework raw-HTML prop, a template with an unescaped variable — and fix or justify each.

Done when: each remaining raw insertion has server-side sanitisation and a comment saying why it exists.

### Test one stored field end to end

Put a harmless marked-up string into a stored field and check how it renders on every page that displays it.

Done when: the string appears as text everywhere, or you can name the exact page and template that needs escaping.

## Common mistakes

- **Rendering user content as HTML** — script executes with the site's privileges; fix: escape by context or sanitise with an allow-list on the server.
- **Sanitising with a regular expression** — markup escaping is famously hard to match with patterns; fix: use a maintained sanitiser.
- **Missing output encoding for a non-HTML context** — an attribute or URL needs different encoding from body text; fix: encode for the destination.
- **Session cookies readable by JavaScript** — one injection steals the session; fix: Secure, HttpOnly and SameSite.
- **Unreviewed third-party scripts** — a tag has the same access as your own code; fix: keep a named list and load only from known origins.

## Go deeper

- **Injection and access control** (`security/web-security-owasp-top-10/01-injection-and-access-control`) — the server-side classes this chapter follows.
- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — the track this chapter closes.
- **Content Security Policy (CSP)** (`security/content-security-policy-csp`) — the policy that limits the damage when encoding fails.
- **Secrets Management** (`security/secrets-management`) — keeping the credentials an injected script would go looking for out of reach.
