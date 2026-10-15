## Example 1 — A resolved request treated as success

A button reloads the cart totals. When the server returns an error status the panel fills with a confusing parse failure, and nothing is shown while the request is in flight. Explain both faults, then model the three outcomes. The endpoint path below is a placeholder; substitute your own.

```js
async function refreshTotals() {
  const response = await fetch("/api/cart/totals");
  const totals = await response.json();          // a 500 body parsed as payload
  document.querySelector("[data-total]").textContent = formatMoney(totals.total);
}
```

### Solution

```js
async function refreshTotals() {
  const panel = document.querySelector("[data-total]");
  panel.textContent = "Loading…";

  try {
    const response = await fetch("/api/cart/totals");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const totals = await response.json();
    if (typeof totals?.total !== "number") throw new Error("unexpected payload");
    panel.textContent = formatMoney(totals.total);
  } catch (error) {
    panel.textContent = "Could not load totals";
  }
}
```

`fetch` rejects only on a network failure, so a 404 or a 500 arrives as a resolved promise and the error page's body is handed to the JSON parser — which is why the failure surfaces as a parse error that names the wrong problem. Checking `response.ok` turns it into a status you can act on. The second fault is state: with no loading and no error branch, the panel keeps whatever it showed before and looks broken rather than busy. Rendering three explicit outcomes — loading, ready, error — is the whole fix, and validating the parsed shape catches the case where a success response is still not the payload you expected.

## Example 2 — A write the server receives as an empty body

A form sends a new address with `POST` and the server reports a missing body. The same request works from a tool. Say what is missing from the request, then send it correctly. The endpoint path is a placeholder; substitute your own.

```js
async function saveAddress(address) {
  const response = await fetch("/api/addresses", {
    method: "POST",
    body: JSON.stringify(address),
  });
  return response.json();
}
```

### Solution

```js
async function saveAddress(address) {
  const response = await fetch("/api/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

Without a content type, the server has no way to know how to decode the bytes, so a serialised object arrives as an unparseable or empty body — and because the request itself succeeded, the failure looks like a server bug rather than a client one. Setting `Content-Type: application/json` is what makes the body interpretable, and it pairs with `JSON.stringify` rather than with a form payload: a form submission should use `FormData` and no header, so the browser can set the multipart boundary itself.
