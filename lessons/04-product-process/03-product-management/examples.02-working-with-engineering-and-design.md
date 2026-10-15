## Example 1 — Arriving with a problem instead of a solution

An item arrives at refinement already decided, so engineering can only estimate it and design can only style it. Bringing the problem rather than the solution leaves room for a cheaper option to appear. Rewrite the ticket below as a problem statement with the goal attached, and name the alternative that becomes visible once the solution is removed.

```text
Ticket: Build a saved-cards feature.
Acceptance: users can store a card and pay with it next time.
Notes: support gets asked for this constantly. Design will need a
card-management screen and a delete flow.
```

### Solution

```text
Problem: repeat buyers abandon at the card step because they must
re-enter details they have already given us.
Goal: fewer abandoned repeat purchases at the payment step.
Not yet decided: how the details are remembered.

Alternatives that reappeared
  remember the details for the next purchase, without storage
  a one-tap link back into the previous order
  keep the last order one click away instead of a re-checkout

Question back to support: is the ask about the typing, or about
having something to manage?
```

The problem statement names the person, the goal and the obstacle, so the session can compare three approaches instead of decorating one, and the cheapest may not need card storage at all. The mistake is a ticket that reads as a requirement; when the solution is already written, alternatives never reach the room.

## Example 2 — Naming which dial moved

Scope grew during refinement: an extra export format was added to an item whose date is fixed by a customer commitment. Cost, time and scope are one dial with three handles, and the trade has to be said out loud to the people who will absorb it. Write the single trade line for the ticket.

```text
Item: quarterly reporting export. Date promised: 30 April.
Change requested: a second output format for the finance team.
Response so far: "we will find a way to fit it in."
```

### Solution

```text
Trade (30 April): scope grew by one output format.
Moved: nothing else yet. Engineering says the format work is three
days, taken from the retest buffer, so the buffer is now zero.
Decision needed: hold the date with no buffer, or keep the buffer
and move the retest of the filters to the next cycle.
```

The line states what moved, in writing, in front of everyone, so the buffer is spent knowingly. The usual failure is answering a scope request with "we will find a way", which absorbs the cost invisibly and leaves a date nobody can defend when the first surprise arrives.
