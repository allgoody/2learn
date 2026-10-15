## Example 1 — A hostname the certificate does not cover

A new shop subdomain was added and pointed at the existing load balancer. The certificate in use lists only the bare domain and its `www` variant. A reader tries the new name and gets a hard browser error rather than a warning. Work out what the client checks, and what has to be issued before the name will load.

```text
Certificate SANs:  DNS: example.com, DNS: www.example.com
Names in use:      example.com, www.example.com, shop.example.com
```

### Solution

```text
Users type: shop.example.com
  -> certificate is valid for example.com, www.example.com only
  -> name mismatch, browser blocks before any page is served
Fix: issue a certificate that includes every served name, then reload it
     on the listener and re-test each name from outside the network
```

The certificate binds the name the user typed to a public key, and the client refuses the connection when the name is not listed. The usual mistake is to cover the apex and forget a subdomain, or the other way round: a missing `www` variant is a real outage for anyone who types it. A wildcard covers one label only and still has to sit under the same parent domain.

## Example 2 — The chain that works in the office

Staff can load the site, but a fresh visitor on a phone cannot, and the error names the certificate rather than the network. The listener sends only its own certificate. The fix is to send the intermediate as well, in the right order. Describe what the client is checking and how to verify it from outside.

```text
TLS handshake:
  server -> leaf certificate only
  client -> walks the chain, finds no link to a trusted root
  result -> connection aborted, fresh clients only
```

### Solution

```text
TLS handshake:
  server -> leaf certificate, then the intermediate(s), in order
  client -> leaf, up through the intermediate, to a root it already trusts
  result -> session proceeds; encryption key derived, channel established
Check: connect from outside the hosting network with a fresh client, for
  every served hostname, and confirm the chain, the name and > 30 days left
```

Serving the full chain in order lets a client with nothing cached build a path to a root it trusts. The failure is invisible in testing because browsers cache intermediates after seeing them elsewhere, so it only appears for a genuinely fresh client. Automate the renewal as well, and monitor expiry from outside; an expired certificate fails the same way a broken chain does.
