## Example 1 — A funnel that does not reconcile

A store's funnel was drawn from the steps someone remembered rather than from the events that fire. The draft and the raw event counts for the same week are below (illustrative figures). Rebuild the funnel from the verified events and name the step with the largest drop.

```text
Draft funnel step     People
landing               40,000
cart_view              9,800
checkout_start         1,100
order_complete           300

Raw event counts, same week
view_item_list        12,400
add_to_cart            3,100
begin_checkout         1,900
purchase                 870
```

### Solution

```text
Funnel step          People   Step rate
view_item_list       12,400      -
add_to_cart           3,100     25%
begin_checkout        1,900     61%
purchase                870     46%    <- largest drop
```

The first step now matches the raw count of the event behind it, so every later rate describes something that actually happened; the draft mixed a page-view count with event counts and reconciled against nothing. The largest drop is from starting checkout to purchase, which is where the work should begin. The mistake is to quote the draft's percentages: they are arithmetically fine and describe steps that never fired.

## Example 2 — A completion drop that is a mix change

Completion fell from 12% to 7% between two months while the funnel steps looked unchanged. The acquisition shares for the same periods are below (illustrative figures). Say what moved, and what to check before redesigning the checkout.

```text
Channel        Share last month   Share this month   Completion
returning            38%                24%             14%
paid social          12%                31%              3%

Campaign subject: "Free next-day delivery on everything"
Landing screen:   delivery options shown only at checkout
```

### Solution

```text
Reading: the mix moved, not the steps
- returning buyers fell from 38% to 24% of sessions
- paid social rose from 12% to 31%, and converts at 3%
- the weighted completion therefore fell with no step changing

Next check: put the campaign promise beside the first screen; it offers
next-day delivery that the landing screen never confirms.
```

The headline fell because lower-intent traffic took a larger share, not because the product got worse, and splitting by channel is what separates the two explanations. Ruling out the mix change before touching a step is cheaper, and the campaign comparison is the second thing to check because a promise the landing screen breaks drops people at the first step. The mistake is to read a completion change as a product regression and redesign the checkout for a traffic problem.
