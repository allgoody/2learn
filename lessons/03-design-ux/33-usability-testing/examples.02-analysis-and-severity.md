## Example 1 — From observations to findings

Five sessions produced a page of notes that all describe the same handful of problems. The list is unranked, so it cannot be acted on yet. Cluster the observations into findings, one sentence each, with the count that makes each one evidence.

```text
Observations, 5 sessions
  P1 clicks "Help and support" looking for the address
  P2 misses "Your details" twice
  P3 asks where to change an address
  P4 finds it only after opening the account menu
  P5 gives up and asks the moderator
```

### Solution

```text
Finding 1  Address changes are not findable from the account area — 5 of 5
Finding 2  "Your details" is missed twice in a single session — 2 misses
Finding 3  One participant abandoned the task — 1 of 5

Counts are from five illustrative sessions.
```

Grouping the first, third, fourth and fifth observations into one finding with a count turns four anecdotes into evidence, and the count is what lets the team argue about priority. Keeping the label miss as its own finding stops it being folded into the address problem, where it would be invisible. The usual failure is reporting every observation as a finding, which produces a list the team cannot start on.

## Example 2 — Rating severity by effect, not frequency

Four findings now need an order. Frequency alone would put the address problem first and the rare form error last. Rate each finding by what happens when it occurs, then commit to the fix for the worst one. Produce the ranked table and the first fix.

```text
Findings from five sessions
  address not findable              5 of 5
  error when saving a partial form  1 of 5
  "Your details" label missed       2 of 5
  icon misaligned in the header     3 of 5
```

### Solution

```text
Finding                            Count   Effect                   Severity
address not findable               5/5     task cannot be completed blocking
error on partial form save         1/5     data lost; wrong action  serious
"Your details" label missed        2/5     completed slowly         minor
icon misaligned                    3/5     none                     cosmetic

Fix worst: add a visible "Change address" action on the account screen
and link it to the checkout address step. Owner: design. Re-test the
address task only after the change.
```

The one-in-five form error outranks the label miss because losing data costs more than finishing slowly, and the misaligned icon ranks last despite being seen most often. Rating the effect rather than the count is what stops a rare blocking failure staying unfixed. The usual failure is ranking by frequency alone, which leaves the data loss at the bottom of the list.
