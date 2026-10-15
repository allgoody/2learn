## Example 1 — An inventory of one help centre

A help centre has grown for four years and nobody can say what is inside it. List it with a mechanical set of columns, and leave no item without an owner.

```text
Known items, from the sitemap export and a product sweep
- Change your address       last edited 2024-03
- Delivery FAQ              last edited 2023-11
- Returns policy            last edited 2024-06
- Checkout error strings    inside the product
- Manage my plan screen     last edited 2024-01
- Track your parcel         linked from nowhere
```

### Solution

```text
Item                     Type     Audience     Owner    Last true   Views/mo
Change your address      page     all          Sam      2024-03       1,200
Delivery FAQ             page     buyers       Sam      2023-11         180
Returns policy           page     all          Legal    2024-06         640
Checkout error strings   strings  buyers       unowned  unknown         n/a
Manage my plan           screen   subscribers  Maya     2024-01         900
Track your parcel        page     buyers       unowned  unknown           0
```

One row per item with mechanical columns, so counting is not slowed by judgement. The last two rows carry the finding: "Track your parcel" has no inbound link and no readers, and the checkout strings have no owner, which is how a wrong string survives for years. Each unowned row gets a name or a deletion recommendation. The mistake is to begin with a tone review, which finishes before the duplicates are found.

## Example 2 — The contradiction, found before the rewriting

Three excerpts disagree on delivery and returns, and all three sit in high-traffic rows. Search the figures and promises, name each contradiction, and mark the decision each row needs before any rewriting starts.

```text
Delivery FAQ       "Standard delivery takes 2-3 working days."
Home page banner   "Order today, arrives tomorrow."
Returns policy     "Free returns within 30 days. A 3 pound fee applies
                    to collections from home."
```

### Solution

```text
Row               Contradiction                          Decision
Delivery FAQ      says 2-3 days, the banner says one     rewrite: one figure
Home banner       same promise, different number         owner: Sam
Returns policy    "free returns" and a fee together      rewrite: one rule

Every change here is a figure or a promise, not a matter of wording.
```

Contradictions are found by searching for the numbers and the promises, because reading prose by eye does not reveal one figure in three places disagreeing in two. Marking keep, rewrite, merge or delete is the second pass, and quick once the count exists. The mistake is to treat the audit as a one-off: without a review date, the same pages are wrong again within a year.
