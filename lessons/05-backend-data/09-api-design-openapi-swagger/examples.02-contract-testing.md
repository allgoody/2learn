## Example 1 — The responses the test never looked at

A test checks that creating a cart answers `201` and has an `id`, and nothing else. The service also answers a duplicate submission and a bad body, and a field was once added to the success response without the document changing — the test still passed. Extend the check so every described response is validated against the document, and so an undeclared field is reported.

```js
test("create a cart", async () => {
  const res = await request(app).post("/carts").send({ items: [] });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
```

### Solution

```js
const document = loadDocument("openapi.yaml");

test.each([
  ["201", { body: { items: [] } }],
  ["409", { body: { items: [] }, headers: { "Idempotency-Key": "cart-1" } }],
  ["422", { body: { items: "many" } }],
])("create answers every described response: %s", async (status, req) => {
  const res = await request(app).post("/carts").send(req.body).set(req.headers ?? {});
  expect(res.status).toBe(Number(status));
  const schema = document.paths["/carts"].post.responses[status].content["application/json"].schema;
  expect(validate(schema, res.body)).toEqual({ valid: true, unexpected: [] });
});
```

Each status the document lists is now exercised, so a renamed field, a widened type or a changed code fails the build instead of reaching a client. The validator is configured to report unknown fields, which is what turns the document into a tightening tool: the added `discount` field appears in `unexpected` the moment it is sent. The common mistake is validating only the success response and letting unknown fields pass, which leaves the error shape free to drift unnoticed.

## Example 2 — The client's requirement, checked by the producer

The checkout page reads two fields from a cart and would break if either disappeared. The file below is what that client has published as its requirement. Add the check the producer's build runs, so removing a field the client needs fails before the change ships.

```json
{
  "consumer": "checkout-page",
  "expects": [
    { "method": "get", "path": "/carts/42", "status": 200, "requiredFields": ["id", "items"] }
  ]
}
```

### Solution

```js
for (const entry of contract.expects) {
  const res = await request(app)[entry.method](entry.path);
  expect(res.status).toBe(entry.status);
  for (const field of entry.requiredFields) {
    expect(res.body).toHaveProperty(field);
  }
}
```

A producer validating its own responses proves the API matches its description, not that its clients still work; checking the published requirement catches a removal in the producer's build rather than in the client's next release. Because the check exercises shapes and not behaviour, it is cheap enough for every pull request, which is where drift is found before the merge. Where a removal is deliberate, the version is raised and the old contract is kept satisfied until the deprecation window closes.
