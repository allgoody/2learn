## Example 1 — Serving the plain scheme instead of redirecting

A service still answers on the plain scheme as well as the secure one, so the first request of every session is readable by anyone on the path. The configuration below serves the page either way. Change it so a plain request is permanently redirected and the browser stops trying the plain scheme at all.

```nginx
server {
    listen 80;
    server_name example.test;
    root /srv/site;
}
```

### Solution

```text
server block, plain listener:
  return 301 to the secure scheme on the same host, same path and query
server block, secure listener:
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

The permanent redirect preserves the path and query so existing links keep working, and the header tells the browser to refuse the plain scheme outright for a year, which removes the first-request gap. `includeSubDomains` is the directive that makes this dangerous to enable early: it covers subdomains you have not migrated, so add it only once every one of them answers on the secure scheme. The usual mistake is to redirect and skip the header, leaving the first hop of every new session in the clear.

## Example 2 — The redirect that swallows the form

A checkout form submits to a relative path that the server then redirects to the secure scheme. Testers report that the order arrives empty, and the log shows the submission followed by a second request with no body. Fix the form so the body reaches the handler, and say why a redirect cannot do this.

```html
<form method="post" action="/checkout">
  <input name="cart" value="a1">
  <button type="submit">Pay</button>
</form>
```

### Solution

```text
Server: the plain listener redirects every request to the secure scheme.
Fix: the form's action must resolve to the secure scheme on the first
     request, so the submission never crosses the plain listener. Point
     the action at the secure origin directly rather than relying on a
     redirect, and keep the path relative.
Check the server log: no POST should ever arrive on the plain listener.
```

A redirect after a POST loses the body unless the client re-sends it, and most clients will not, so the handler sees an empty submission. Point the action at the secure scheme rather than trusting a redirect for any request that carries data. The usual mistake is to redirect everything uniformly and assume it is harmless; machine callers that POST are exactly the ones that break silently at migration.
