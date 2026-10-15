---
title: Gap analysis and options
prereqs: ["04-product-process/06-business-analysis/01-mapping-the-current-process"]
---

## What it is

Gap analysis states the difference between the process as it is and the outcome the organisation needs, then lays out the plausible options for closing it: do nothing, change the policy, change the process, buy, or build. The artefact is a short options paper with a recommendation and the criteria used to choose.

## Why it matters

Jumping from a mapped process straight to a system is the most expensive habit in this work: it spends the largest budget on the option nobody compared. Writing the gap separately from the solution keeps the two honest — the gap belongs to the business, the solution is one of several bets — and it gives the people funding the work a real choice rather than a single proposal to approve or refuse.

## Core ideas

### State the gap as a measurable difference

Not "the process is inefficient" but the distance between the current and the required numbers. The gap is what the options are judged against.

```text
Current  refunds take 1.5 working days, 6% re-issued incorrectly
Required under 4 hours, under 1% incorrect, by October
Gap      1.3 days and 5 percentage points
Driver    manual re-entry into the accounts system plus a finance approval
```

### Always include "do nothing" and "change the rule"

The cheapest option is frequently a policy or a threshold change. Removing the requirement for a second approval under a value limit may close the gap without a system.

```text
A. Do nothing                    gap stays, cost stays
B. Raise the manual-refund limit  removes 70% of the handovers, no build
C. Integrate the two systems      closes the gap, 8 weeks, ongoing cost
D. Buy a refund module            closes most of it, licence, migration
```

### Choose on stated criteria, weighted

Cost, time, risk, capability, ongoing maintenance and fit with the existing systems. Write the weights before scoring the options, for the same reason as any prioritisation: the criteria chosen afterwards always favour the preferred answer.

### Name what each option does not solve

Option B leaves the incorrect re-issues untouched; option C does not fix the 1% error rate on its own. Stating the residue prevents the expectation that the project fixes everything.

### Commit to a review point

The chosen option is a bet. Say what would show it is not working and when that will be checked.

## Practice

### Write an options paper for one gap

State the gap with numbers, then three or four options including do-nothing and a rule change, with their criteria and their residues.

Done when: someone who favours a different option can argue against your criteria rather than against your conclusion.

### Test the cheapest option first

Take the option that needs no build and estimate its effect from the process map.

Done when: you can say how much of the gap the cheapest option closes on its own, with the arithmetic shown.

## Common mistakes

- **Skipping the rule-change option** — the largest saving is never considered; fix: always include a policy option.
- **Criteria chosen after the options** — the comparison justifies the preferred answer; fix: fix the weights first.
- **No do-nothing option** — the cost of inaction is never stated, so the cheapest option is invisible; fix: price it.
- **A single proposal presented for approval** — the funders have no real choice; fix: present at least three options.
- **Claiming the option closes everything** — the residue becomes an expectation failure; fix: name what each option leaves unsolved.

## Go deeper

- **Mapping the current process** (`04-product-process/06-business-analysis/01-mapping-the-current-process`) — the evidence these options are built on.
- **Business Analysis** (`04-product-process/06-business-analysis`) — the track this chapter closes.
- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — what happens after an option is chosen.
- **Prioritization Frameworks (RICE / MoSCoW)** (`04-product-process/15-prioritization-frameworks-rice-moscow`) — another place the criteria must precede the scores.
