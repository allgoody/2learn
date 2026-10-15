## Example 1 — From deny-all to a policy for one page

A page loads its own bundle, its own stylesheet, icons from a data URI and fetches its own API. It is never embedded in another site. The team's current policy is the header below, which names no sources at all. Replace it with a starting policy that denies everything and opens only what this page uses, as a response header rather than a meta tag.

```text
Content-Security-Policy: default-src *
```

### Solution

```text
Content-Security-Policy:
  default-src 'none';
  script-src 'self' 'nonce-<random per response>';
  style-src 'self';
  img-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
```

`default-src 'none'` means a source nobody thought about is denied rather than allowed, so the policy fails closed. Each line then answers one question: what code may run, where images may come from, where data may be sent, and who may frame the page. The usual mistake is to write a wildcard and plan to tighten it later; a wildcard is the whole vulnerability back again, and the origin list never gets reviewed.

## Example 2 — The inline script the policy blocks

A page carries a small inline script that sets a theme class before first paint. The policy in force allows inline script, so a value that escaped output encoding also runs. Move the policy to a nonce, and show both the script that runs and the injected copy that is refused.

```text
Content-Security-Policy: script-src 'self' 'unsafe-inline'

<script>document.documentElement.className = 'dark';</script>
```

### Solution

```text
Content-Security-Policy: script-src 'self' 'nonce-<random per response>'

Runs:    <script nonce="<same value>">document.documentElement.className='dark';</script>
Blocked: <script>document.documentElement.className='dark';</script>
         -> refused: no valid nonce; console reports a CSP violation
```

A per-response nonce lets the browser tell your own inline script from an injected one, because the attacker cannot guess the value on this response. That is what makes a strict policy possible on a page that genuinely needs some inline code. The usual mistake is to leave `'unsafe-inline'` in place and assume the rest of the policy still protects the page; when it is present in `script-src`, it does not.
