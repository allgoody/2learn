## Example 1 — Two services writing the same table

An orders service and a reports service both update the same table, which obeys 6 rules. A figure corrected by one is silently overwritten by the other, so each rule is now implemented twice, in 2 places that can disagree. Find the ownership rule being broken, then decide who writes.

```text
orders(total, status)          one shared schema, 6 rules the table obeys

orders-service:   inserts orders, updates status
reports-service:  updates total when it corrects a figure      writers = 2

rule implementations to keep right: 2 * 6 = 12
last week: a correction was overwritten twice by the nightly sync
```

### Solution

```text
owner:   orders-service   the only writer; all 6 rules live here
reader:  reports-service  keeps a read model of its own, never writes orders

orders-service --event--> reports-service --projector--> reporting.orders_view
rule implementations to keep right: 1 * 6 = 6
```

With one writer, the 6 rules about what an order total may be exist in exactly one place, and everything else can be reasoned about as a consumer, which is why the count falls from 2 * 6 = 12 to 6. Two writers turn every invariant into an agreement between teams, and that agreement was what the overwritten correction actually was: the reports service assumed totals may be corrected in place, and the nightly sync assumed the stored total is the order's own sum. The reader's copy is allowed to lag; what it may not do is change the source. What usually goes wrong is fixing the symptom — adding a lock, or moving the correction to a different column — while both services keep their write access, so the 12 rule implementations stay 12.

## Example 2 — A read that contradicts the write just made

A user renames a project, the write succeeds, and the next page still shows the old name. The project owner commits at t = 0.0 s and the search read model reflects the rename at t = 1.5 s, a lag of 1.5 s. Explain the window that caused it, then choose what each read should do.

```text
write  -> projects owner         committed at t = 0.0 s
copy   -> search read model      reflects it at t = 1.5 s
read   -> search read model      taken at t = 0.4 s, inside the 1.5 s window
result -> the rename is not there yet
```

### Solution

```ts
// reads that need freshness go to the owner
const project = await projects.get(id);          // t = 0.4 s, returns the new name

// reads that tolerate lag use the copy, and say so in one place
const results = await search.query(term);        // "recent enough" is fine here
```

Once a copy exists it is stale from the moment it is made, so the design question is not whether that happens but what the system does during the 1.5 s window. State the requirement: a rename the user has just performed must be visible to that user, while a search index 1.5 s behind is fine for everyone else, which splits the reads into 2 paths instead of 1 vague one. That turns a class of confusing reports into a documented property, with an obvious place to put version numbers, retries or a read-your-own-writes route. What usually goes wrong is fixing the lag by shortening the window and leaving the requirement unstated: the same read fails again as soon as the copy falls 2 s behind under load, and nobody knows whether that is a bug or the design.
