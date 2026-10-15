## Example 1 — A story that asks for a screen

A product owner writes a request as a screen, not a need. The weak story is below. Rewrite it so the benefit is in the requester's words and add three acceptance criteria a reviewer can check.

```text
As a user, I want a picker dashboard, so that I can see things.
```

### Solution

```text
As a warehouse supervisor, I want to see which pickers are running more
than an hour behind, so that I can move someone before the afternoon
dispatch is late.

Criteria
- lists only pickers more than one hour behind plan
- sorted by how far behind, most first
- shows nothing when every picker is on plan
```

The rewritten "so that" names a decision the supervisor has to make, which the team can satisfy with a report, an alert or a screen — the weak version names its own solution and shuts that question down. The criteria are each one line and checkable without asking the author, so they bridge straight to tests and let the story finish. The trap is treating the card as a specification: write the words, then have the conversation they were built to schedule.

## Example 2 — A story split by technical layer

A payments story has been cut into a backend piece and a frontend piece, each unshippable alone. Split it again so every piece can be demonstrated on its own.

```text
Story  customers can pay an invoice online
Cut    A  build the payments API
       B  build the checkout page
```

### Solution

```text
Story  customers can pay an invoice online
Cut    A  pay one invoice by saved card (demo: click through, paid)
       B  pay with a new card, saved for next time (demo: enter, pay)
       C  partial payment against one invoice (demo: pay half)
```

Splitting by workflow step means A ships value alone, while the API and page versions ship nothing until both are finished — which is the whole reason layer splits fail. Each piece here has a demo that does not mention the others. The thing that usually goes wrong is reaching for a layer split because it maps onto how the work is assigned; assign after splitting by outcome, not before.
