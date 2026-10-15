## Example 1 — Four candidates, one table

A product owner has four backlog items and no argued order. The raw figures are below. Score them in one table with each factor named, rank the scores, then override the ranking where judgement demands it.

```text
Item                    Reach/mo   Impact   Confidence   Effort
A  refunds and status     900        3        0.8          2
B  saved card details    1900        2        0.6          1
C  bulk order export      300        2        1.0          3
D  multi-currency         700        3        0.2          5
```

### Solution

```text
Item                    R     I   C     E   Score  Rank
A  refunds and status   900   3   0.8   2   1080    2
B  saved card details  1900   2   0.6   1   2280    1
C  bulk order export    300   2   1.0   3    200    3
D  multi-currency       700   3   0.2   5     84    4

Score = R x I x C / E
Override: D ships first anyway. The EU invoice rule takes effect in July,
so D is a deadline, not a preference. B's confidence looks inflated:
two of three teams have not tested it. Decision: D this quarter, B next
with its confidence re-checked.
```

The table puts the four inputs in the open so each can be challenged, and it shows that B is the cheapest large win while C is the item the team feels most certain about. The override is the point of the exercise, not a failure of it: a formula cannot see a legal deadline, and a framework that is never overridden is used instead of judgement. The trap is treating the top score as a verdict and shipping B on a guess.

## Example 2 — A MoSCoW list with no capacity

The release plan below puts everything in the top MoSCoW bucket and names no capacity. Rewrite it against a six-developer-week release and name the constraint that makes the buckets mean anything.

```text
Must   refunds, refund status, saved card details, bulk export,
       multi-currency, dashboard redesign
Should -
Could  -
```

### Solution

```text
Capacity: 6 developer-weeks.
Must (5w)    refunds, refund status - release is not valid without them
Should (1w)  saved card details     - painful to omit, but shippable
Could        bulk export, multi-currency
Will not     dashboard redesign this release
```

Must means only what the release is invalid without, and that sentence is meaningless until the capacity is written down: with six weeks stated, the must bucket has to fit or it is not a must. Confidence is the second half of the lesson: the items the team most wants scored highest, so every value needs a basis of tested, seen in analytics, or a guess worth at most 0.5. The trap is an empty will-not list; naming the exclusions stops them drifting back in.
