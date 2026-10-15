---
title: Analysis and severity
prereqs: ["03-design-ux/33-usability-testing/01-running-the-session"]
---

## What it is

Analysis turns session notes into findings, and severity decides which finding to fix first. A finding names an element and a failure; a severity rating is an argued estimate of how much the failure costs, so that a list of twenty observations becomes an ordered list of four fixes.

## Why it matters

Sessions produce far more observations than a team can act on, and a list of everything is a list of nothing. Without severity, priority goes to the most memorable clip or the most senior person's reaction. With it, a rare but blocking failure outranks a common but mild annoyance, and the reasoning can be inspected and disagreed with.

## Core ideas

### Turn observations into findings first

Group the observations, then write one sentence per finding with a count. The count is what makes it evidence rather than an anecdote.

```text
Observation (5 sessions)
  P1 clicks "Help and support" looking for the address
  P2 misses "Your details" twice
  P3 asks where to change an address
Finding
  Address changes are not findable from the account area — 4 of 5 sessions.
```

### Rate severity on effect, not on frequency alone

Frequency is one input; the other is what happens when it occurs. Blocking, costing data, or causing a wrong action all raise severity regardless of how often they happen.

```text
Severity   Meaning
blocking   the task cannot be completed; no workaround
serious    completed with error, or a workaround outside the product
minor      completed slowly or with visible hesitation
cosmetic   noticed but no effect on the task
```

### Frequency times severity, then fix the top few

Rank the findings and commit to fixing the top three or four. A long tail of cosmetic fixes consumes the time the blocking ones needed.

### Separate the finding from the proposed fix

Record what broke, then what to change. The first is evidence; the second is a design decision that may be wrong even when the finding is right.

### Re-test only the failures you changed

After fixing, run the same tasks on the changed screens. Do not re-run the whole study: the point is to check that this specific failure is gone, not to re-audit the product.

## Practice

### Turn one study into four findings

Take your notes from three sessions, cluster the observations, and write four findings with counts and severities.

Done when: each finding names an element, cites a count, and has a severity you can defend in one sentence.

### Write the fix list

For the top four findings, write the change, the owner and the date, keeping the fix separate from the finding.

Done when: the list has no finding without a count and no fix without an owner.

## Common mistakes

- **A list of every observation** — the team cannot start and fixes the easy ones; fix: cluster into findings and rank by frequency times severity.
- **Ranking by frequency only** — a rare blocking failure stays unfixed; fix: rate the effect as well as the frequency.
- **Merging the finding with the fix** — a wrong fix discards a valid finding; fix: record the failure and the proposal separately.
- **Chasing cosmetic issues first** — the session's real finding waits; fix: fix blocking and serious issues before cosmetic ones.
- **Re-running the whole study after a fix** — time is spent re-auditing instead of checking the fix; fix: re-test only the tasks that failed.

## Go deeper

- **Running the session** (`03-design-ux/33-usability-testing/01-running-the-session`) — the notes this analysis works from.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — the track this chapter closes.
- **Usability** (`03-design-ux/11-usability`) — the three components the findings measure.
- **Heuristic Evaluation** (`03-design-ux/34-heuristic-evaluation`) — a complementary source of findings when sessions are not possible.
