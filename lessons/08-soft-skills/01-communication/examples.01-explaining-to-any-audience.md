## Example 1 — One change, three decisions

A payment call now retries twice on a timeout. Three people act on that differently: an engineer maintains it, a product manager decides what customers are told, a support agent answers the phone. Write one explanation for each, under 120 words.

```text
Change  a timed-out payment call retries twice, reusing the same
        idempotency key, before it reports failure
Readers engineer, product manager, support agent
```

### Solution

```text
Engineering  The call retries twice on timeout with the same key, so the
             provider still sees one charge; the slow case just waits two
             backoff windows before failing. Accept it.
Product      Fewer failed payments reach the customer, and the slowest
             case takes a few seconds longer. Nothing changes in pricing.
Support      If a payment sits for longer, this is why. The customer is
             charged once; quote the reference you already have.
```

Each version starts from the decision its reader owns — maintain it, tell customers, answer the phone — and stops there. The usual mistake is writing one explanation and sending it to all three, where it is too detailed for support and too shallow for engineering.

## Example 2 — Ask for the next step

You have just explained a caching change to a colleague. You are about to close with "does that make sense?". Rewrite the closing question so you find out whether they can act.

```text
You:       ...so reads now hit the cache first, and we invalidate on
           every write. Does that make sense?
Colleague: yep, got it.
```

### Solution

```text
You:       ...so reads hit the cache first, and we invalidate on every
           write. If the cache were down for ten minutes tomorrow, what
           would you expect to see, and what would you check first?
Colleague: Reads would fall back to the database, so database load would
           spike. I would check that before the cache itself.
```

Asking for the next step and the risk shows whether the colleague can act, and their answer surfaces the fallback and where to look. "Does that make sense" collects reassurance; the person nods, and the misunderstanding waits for an incident. Use the question when the explanation has a consequence, not after every sentence.
