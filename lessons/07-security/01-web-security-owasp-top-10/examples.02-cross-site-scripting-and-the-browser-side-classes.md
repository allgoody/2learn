## Example 1 — Escaping at the point of output

A profile page renders a member's display name in body text and, further down, in a search link. The component below was reviewed as a security fix because the developer removed a raw-HTML prop. Rewrite the link so the value is encoded for the context it lands in, and say what still has to happen where rich text is genuinely needed.

```tsx
// Profile.tsx — as reviewed
<p>{user.displayName}</p>
<a href={"/search?q=" + user.displayName}>Search</a>
```

### Solution

```tsx
// Profile.tsx — after the fix
<p>{user.displayName}</p>
<a href={"/search?q=" + encodeURIComponent(user.displayName)}>Search</a>
```

The JSX in the paragraph already escapes body text, but an attribute is a different context: without `encodeURIComponent` a name containing `&` or `#` changes the URL and an attribute-breaking character escapes the link. The usual mistake is to treat "React escapes by default" as covering every binding — every escape hatch, including a raw-HTML prop, a URL or a style value, needs encoding for its own destination. Where rich text is genuinely required, sanitise it with an allow-list on the server.

## Example 2 — The session cookie the page can read

The response below sets the session cookie so that any JavaScript on the page can read it, and browsers will send it on cross-site requests. An injected script that reads it can act as the user until it expires. Add the three attributes that close both doors, and say which one keeps normal navigation working.

```text
HTTP/1.1 200 OK
Set-Cookie: session=<opaque value>; Path=/
```

### Solution

```text
HTTP/1.1 200 OK
Set-Cookie: session=<opaque value>; Secure; HttpOnly; SameSite=Lax; Path=/
```

`HttpOnly` hides the value from JavaScript, so a successful injection cannot steal the session; `Secure` keeps it off a plain channel; and `SameSite=Lax` blocks most cross-site POSTs while leaving top-level navigation working, which is why `Lax` is the usual choice over `Strict`. The value is written as a placeholder; never commit or paste a real one. The common mistake is adding `Secure` alone and leaving the cookie readable, which protects the wire but not the session.
