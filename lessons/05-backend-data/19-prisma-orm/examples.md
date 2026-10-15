## Example 1 — Following a relation from the generated type

An operations list shows every open order with its customer's email. The schema below describes the models, and the code that follows traverses the relation inside a loop. Write the query so the relation arrives with the list, then show the evidence that only one statement was issued.

```prisma
model Order {
  id         Int      @id
  status     String
  customer   Customer @relation(fields: [customerId], references: [id])
  customerId Int
}

model Customer {
  id     Int     @id
  email  String
  orders Order[]
}
```

### Solution

```ts
const orders = await db.order.findMany({
  where: { status: "open" },
  include: { customer: true },   // resolved in the original query
});

for (const order of orders) {
  notify(order.customer.email);  // no statement per order
}

// generated statement log (one statement for the whole list):
// SELECT "order".*, "customer".*
// FROM "Order" JOIN "Customer" ON "order"."customerId" = "customer"."id"
// WHERE "order"."status" = 'open'
```

Because the schema file is the source of truth for both the types and the database, the shape of an included relation is part of the result type, so the property access compiles and the statement log confirms the relation was resolved once rather than once per row. The log is the only reliable check here: the code would look much the same whether the client joined or queried per row. What usually goes wrong is including one relation in the original query and then traversing a different one inside the loop, which reintroduces the pattern one level down.

## Example 2 — A rename that the generated migration drops

A field is renamed in the schema from `fullName` to `name`. The generation step produces a migration, and applying it as printed would lose every existing name. Read the migration, decide what it will do to the data, and correct it before it is applied.

```text
schema change: Customer.fullName -> Customer.name

generated migration:
  ALTER TABLE "Customer" DROP COLUMN "fullName";
  ALTER TABLE "Customer" ADD COLUMN "name" TEXT;
```

### Solution

```sql
-- reviewed and hand-edited before the migration is applied
ALTER TABLE "Customer" RENAME COLUMN "fullName" TO "name";
```

The tool can only see that one field disappeared and another appeared, so it expresses a rename as a drop and an add; the reviewed version keeps the column, its values and any index that referenced it, while the model and the database still end up in step. The generation step must also run in the build: a skipped generation compiles against a stale client or fails outright. The thing that usually goes wrong is treating a generated migration as an artefact to apply rather than as code to read.
