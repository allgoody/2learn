## Example 1 — Turning a target into an alert threshold

The team has an objective and a growing set of alerts chosen by guesswork. Work out what the target allows over its window, and which error rate should page.

```text
illustrative figures
objective  checkout: 99.9 percent of requests succeed, rolling 30 days
question   how much failure is that, and what error rate should page?
```

### Solution

```text
window              30 days = 43,200 minutes
allowed failure     0.1 percent of the window = about 43 minutes
the budget is a rate  it refills as the window rolls forward
page, on burn rate  a rate that would use 43 minutes in about six hours
                    43 / 360 ≈ 12 percent of requests failing continuously
do not page         a rate inside the budget, such as 0.2 percent over five minutes
decision            the fast burn pages; the slow burn becomes a ticket
```

The threshold now comes from the allowance rather than from yesterday's graph, so it survives traffic growth. The same arithmetic says which error rates may be left alone, which is what keeps the paging rules credible. The usual mistake is to alert on the smallest rate that looks worrying, so the rule fires well inside the budget until nobody reads it.

## Example 2 — A freeze that fixes nothing

A migration went badly and most of the month's allowance was spent in one week. The freeze was announced as a rebuke and no repair work was recorded, so the same migration is scheduled again. Write the policy the team should have agreed in advance.

```text
illustrative figures
objective        checkout: 99.9 percent over 30 days
spend this week  31 of the 43 minutes, from one migration
what happened    a freeze announced in the incident channel, a named culprit, no follow-up item
```

### Solution

```text
owner          the checkout team's lead, named in the objective
condition      the rolling 30-day allowance is exhausted
first action   stop feature releases and open a reliability item naming the cause of the spend
priority       reliability work first until the budget is restored
blame          none; the migration was a deliberate risk, and the policy predates the spend
restore        the repair ships as a normal, reviewed change
```

Exhaustion changes the order of work, not the standing of the people who spent the budget, and it only works if it was agreed while everyone was calm. Requiring the cause to be found is what makes a freeze worth having: stopping deploys without repairing anything leaves the system as fragile as before. The usual mistake is to invoke it mid-incident as an accusation, after which nobody enforces it.
