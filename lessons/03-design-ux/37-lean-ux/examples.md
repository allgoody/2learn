## Example 1 — A backlog item turned into a hypothesis

The next item on the backlog reads "improve the address step on checkout". Rewrite it as a belief with a measurable outcome and a threshold, then name the smallest build that tests it inside one week.

```text
Backlog item
Checkout: improve the address step
Requested by: sales, after three calls about abandoned carts
```

### Solution

```text
We believe: new buyers abandon the address step because it asks for
a phone number before the order exists.
Measure: checkout completion per visitor.
Threshold: 60%, against a current 52% (figures illustrative).
Smallest build: phone number made optional, one variant, one week.
Friday decision: below 60% revert; at or above keep.
```

The belief, the measure and the number are written together, so a colleague can say what result would prove it false; keeping the build to one variant fits the whole test inside a week. The usual mistake is writing the belief and skipping the threshold, which leaves the redefinition of success to whoever presents the result.

## Example 2 — A cycle that closes with a decision

Week seven shipped the optional-phone variant. Record what happened, the measure before and after, and the decision the cycle ends on.

```text
Cycle length: one week
Output this cycle: 1 release, 4 tickets closed
Current wall measure: checkout completion, standing at 52%
```

### Solution

```text
Cycle 7
Shipped:   phone number optional on the address step
Measured:  checkout completion 52% to 55% (figures illustrative)
Decision:  change one variable — move the field below the address line
Next cycle: same measure, threshold 57%, one week

Learning: moving the field is worth one more week; the copy is not.
```

The record ends in a decision on the next cycle rather than in a demo, and it counts a behaviour rather than the four tickets closed, which is the easy number to report. The usual mistake is letting a cycle finish with a showcase only, so the feature ships and nothing is learned from it.
