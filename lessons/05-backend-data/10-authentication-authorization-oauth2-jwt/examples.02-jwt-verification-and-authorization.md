## Example 1 — A token that decoded cleanly

The claims below arrived at the orders service and were accepted, because the handler calls a helper that decodes and returns the payload. Write the verification the service must perform instead, say which claim the check must verify beyond the signature, and describe in words how the signature itself is checked.

```json
{
  "sub": "user_1042",
  "iss": "identity.example.test",
  "aud": "reporting-api",
  "exp": 1760000000,
  "scope": "read:orders"
}
```

### Solution

```text
1  signature   checked against the issuer's published keys, selected by the key identifier in the token
2  algorithm   pinned to the one this service expects, never taken from the token header
3  issuer      must equal the expected issuer, not merely look well formed
4  audience    must name orders-api; the token above names reporting-api and fails here
5  expiry      must be in the future, with a small tolerance for clock skew
```

Steps one to five all have to pass, and a decode-only helper performs none of them, which means any caller can write any claims. The claim that decides this case is `aud`: the token is genuine and correctly signed, but it was minted for another application. Pinning the algorithm is the single most important line, because a verifier that honours the header lets the caller name a weaker algorithm or none at all. The usual mistake is assuming a decoding call verified something.

## Example 2 — Any authenticated user reads any order

The handler below verifies the token and then returns whatever record the path names. Change it so a caller can read only their own order, and so the answer does not reveal whether the record exists.

```js
app.get("/orders/:id", async (req, res) => {
  const claims = verify(req.headers.authorization);
  const order = await db.orders.findById(req.params.id);
  res.json(order);
});
```

### Solution

```js
app.get("/orders/:id", async (req, res) => {
  const claims = verify(req.headers.authorization, { audience: "orders-api" });
  const order = await db.orders.findById(req.params.id);
  if (!order || order.userId !== claims.sub) return res.status(404).end();
  res.json(order);
});
```

A verified token says who the caller is; it says nothing about which records that caller may read, so the comparison against the record's owner is the authorization step and not a formality. Returning the same status for a missing record and for someone else's record keeps the response from confirming that an order exists. The audience assertion in the verification call is what stops a token minted for another application being replayed here by a caller who changes the identifier in the path.
