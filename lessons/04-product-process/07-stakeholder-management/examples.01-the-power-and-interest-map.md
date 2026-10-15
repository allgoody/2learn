## Example 1 — Fill the grid with names and concerns

A refunds project brief lists stakeholders as roles: "operations", "finance", "IT", "marketing". Replace the roles with named people and write what each one actually cares about beside their name.

```text
From the brief
  operations   finance   IT   marketing   the support team
```

### Solution

```text
High power / high interest  Maya, finance lead — must sign off the
                            refund audit trail
High power / low interest   Tom, CTO — cares only that no new system
                            appears
Low power / high interest   Priya, support lead — will absorb the calls,
                            wants the change
Low power / low interest    Jordan, marketing — no action
```

Names and written concerns turn a vague worry about "stakeholders" into a list of people with a route into the work. The low-power, high-interest row is not the throwaway one — Priya's team is whose daily work changes. The usual mistake is mapping roles, because "finance" cannot be consulted and "IT" will not reply.

## Example 2 — Move one person, and revisit the map when scope changes

Tom is high power and low interest and has said "don't add another system". Find what would move him into the interested row, then place the stakeholder the new audit requirement has just brought in.

```text
Tom (CTO) has said: "I don't want two ledgers to reconcile."
Scope update: refunds fall under an audit requirement from Q3.
```

### Solution

```text
Tom's concern in his words: "I don't want two ledgers to reconcile."
What moves him: the map showing the integration removes the hand-copied
accounts entries rather than adding a ledger.
Message to Tom: one-line architecture impact note, monthly, tech lead.

New on the grid: Nadia, audit lead — high power, high interest.
She joins in month one, not at release.
```

A high-power, low-interest stakeholder becomes interested the moment the work touches their own goal, so Tom is moved by the risk the change removes. New scope brings new people, which is why the map is revisited rather than drawn once. The usual mistake is leaving the map static and meeting the audit lead for the first time at release.
