## Example 1 — Two services writing the same table

An orders service and a reports service both update the same table. A figure corrected by one is silently overwritten by the other. Find the ownership rule being broken, then decide who writes.

```text
orders(total, status)          one shared schema

orders-service:   inserts orders, updates status
reports-service:  updates total when it corrects a figure

last week: a correction was overwritten twice by the nightly order sync
```

### Solution

```text
owner:   orders-service   the only writer; invariants live here
reader:  reports-service  keeps a read model of its own, never writes orders

orders-service  --event-->  reports-service --projector--> reporting.orders_view
```

With one writer, the rules about what an order total may be exist in exactly one place and everything else can be reasoned about as a consumer. Two writers turn every invariant into an agreement between teams, which is what the overwritten correction actually was. The reader's copy is allowed to lag; what it is not allowed to do is change the source. If the reports service genuinely needs its own corrected figure, that belongs in its read model, labelled as derived and rebuildable, not in the owner's table.

## Example 2 — A read that contradicts the write just made

A user renames a project, the write succeeds, and the next page still shows the old name. Explain the window that caused it, then choose what the read should do.

```text
write  -> projects owner (committed)
read   -> search read model (built minutes earlier)
result -> the rename is not there yet
```

### Solution

```ts
// reads that need freshness go to the owner
const project = await projects.get(id);

// reads that tolerate lag use the copy, and say so in one place
const results = await search.query(term);          // "recent enough" is fine here
```

Once a copy exists it is stale from the moment it is made, so the design question is not whether that happens but what the system does during the window. State the requirement: a rename the user just performed must be visible to that user, while a search index a second or two behind is entirely acceptable. That splits the reads into two paths instead of one vague one, and it turns a class of confusing reports into a documented property with a place to put version numbers, retries or a read-your-own-writes route.
