## Example 1 — A quote that changes the statement

A review of the order lookup below turns up a query built by joining strings, with the user-supplied identifier interpolated straight into the statement. Rewrite it so the input travels as data, and name the character the attack needs in order to reach the database.

```ts
// orders.ts — as reviewed
app.get("/orders/:id", (req, res) => {
  const rows = db.query(
    `SELECT * FROM orders WHERE id = '${req.params.id}'`
  );
  res.json(rows);
});
```

### Solution

```ts
// orders.ts — after the fix
app.get("/orders/:id", (req, res) => {
  const rows = db.query(
    "SELECT * FROM orders WHERE id = $1",
    [req.params.id]
  );
  res.json(rows);
});
```

The value now travels in a separate parameter and cannot alter the statement's structure. The injection needs a single quote to close the string literal and start writing SQL; as a bound parameter that character is just data. The usual half-fix is to parameterise the identifier and leave the same concatenation below for a sort column, where a bind placeholder cannot stand in.

## Example 2 — Someone else's invoice

The detail endpoint below was added after the list page, which filters by the signed-in account. It loads whatever identifier arrives. Given a valid session and an id belonging to another account, write the check that closes the hole and choose the response deliberately.

```text
GET /invoices/1042
  session.accountId = 7
  invoice 1042.accountId = 9
  -> 200 OK, body: another account's invoice
```

### Solution

```text
GET /invoices/1042
  invoice = invoices.find(req.params.id)
  if (!invoice || invoice.accountId !== session.accountId)
    -> 404 Not Found
```

Authorising the route is not the same as authorising the object, so the check runs on every fetch against the session's account rather than a client-supplied id. A not-found is returned instead of a forbidden, because admitting that invoice 1042 exists is itself a disclosure. The common slip is to trust the filter on the list page and assume the detail page inherits it; it does not.
