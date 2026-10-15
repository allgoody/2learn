## Example 1 — State the gap as numbers, then list four options

The process map is finished: refunds take 1.5 working days and 6% are re-issued incorrectly. Write the gap as a measurable difference, then list the options including do-nothing and a rule change.

```text
From the process map
  current refund time        1.5 working days
  incorrect re-issues        6%
  manual refund cost         support 20 min + finance 10 min
Requirement: under 4 hours, under 1% incorrect, by October
```

### Solution

```text
Gap      1.3 working days and 5 percentage points
Driver   hand-copied amounts plus finance approval on every refund

A. Do nothing                  gap stays, cost stays
B. Raise the approval limit    removes 70% of handoffs, no build
C. Integrate shop + accounts   closes the time gap; 8 weeks, ongoing cost
D. Buy a refund module         closes most of it; licence and migration
```

The gap is the distance between two numbers, so every option can be measured against it rather than against a feeling. The rule change is on the list, and it is the cheapest. The usual mistake is jumping from the map to option C, so the largest saving is never compared.

## Example 2 — Weight the criteria first, then name the residue

Score the four options against criteria whose weights were written down before the scoring, and say what the chosen option leaves unsolved.

```text
Weights set before scoring (illustrative)
  closes the gap 40   cost 25   risk 20   maintenance 15
Scores 1-5; weighted total out of 5
```

### Solution

```text
Option  gap  cost  risk  maint   Total
A       1    5     3     5        3.0
B       3    5     4     4        3.9
C       5    2     3     2        3.4
D       4    2     2     2        2.8

Chosen: B.  Review point: end of the next quarter.

Does not solve: B leaves the 6% incorrect re-issues and the gift-card
approval route untouched. If re-issues stay above 1% after the raise,
the review moves to option C.
```

Fixing the weights before scoring stops the comparison from justifying a preferred answer, and it lets someone who disagrees argue against the criteria instead of the conclusion. Stating the residue prevents the expectation that the project fixes everything. The usual mistake is choosing the criteria after seeing the options.
