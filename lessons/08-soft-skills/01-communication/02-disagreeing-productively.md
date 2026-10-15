---
title: Disagreeing productively
prereqs: ["08-soft-skills/01-communication/01-explaining-to-any-audience"]
---

## What it is

Disagreeing productively is putting a real objection on the table so that the group can decide better, rather than winning or avoiding the argument. It means stating what you disagree with, what evidence would change your mind, and what you propose instead — and then accepting the decision if it goes the other way.

## Why it matters

Unspoken disagreement is expensive in two directions. A team that avoids conflict ships decisions nobody believes in, and the work is done half-heartedly by people who expect it to fail. A team that argues to win spends its meetings on status and its retros on blame. The skill in between is what makes a technical discussion a decision procedure rather than a contest, and it is the difference between a risk being raised in the meeting and being raised three weeks later.

## Core ideas

### Disagree with the proposal, not the person

Name the thing you object to, precisely. "I think this is wrong" is an attack; "this assumes the queue never exceeds ten thousand items, and we saw it exceed that at launch" is a technical objection that can be answered.

### Separate the levels of disagreement

Be explicit about which one you are at, so the conversation does not mix them.

```text
1 the goal is wrong              rare, needs the decision owner
2 the evidence is wrong          checkable, go and check it
3 the approach will not work     a technical argument, decide by test
4 the approach works but costs   a trade-off, decide by priorities
5 I would have done it differently  not an objection, a preference
```

Most long arguments are one person at level 2 and another at level 4.

### Say what would change your mind

This turns a position into a test. If nothing would change it, you are not disagreeing, you are blocking, and the group should treat it as such.

```text
"If the load test shows it holds at ten thousand concurrent items,
 I will withdraw the objection."
```

### Propose the alternative in the same breath

An objection without an alternative puts the work back on the other person and lengthens the argument. Bring the cheaper version, the narrower scope or the experiment.

### Commit and note the risk once the decision is made

Say plainly that you disagree and will support the decision, and record the risk with the date and the condition under which you revisit it. Continued re-arguing after the decision is what makes teams stop deciding.

## Practice

### Disagree about something real, in writing

Take a live disagreement and write it up as: the proposal, your objection with its level, the evidence you have, what would change your mind, and your alternative.

Done when: someone reading it can name the test that would settle the disagreement, and you have sent it.

### Write the post-decision note

For a decision that went against you, record the risk, the condition that would make it real, and the date to revisit it.

Done when: the note exists, the decision owner has seen it, and you can say you are supporting the decision.

## Common mistakes

- **Objecting without an alternative** — the discussion stalls and the objection looks like obstruction; fix: bring a proposal alongside it.
- **Attacking the person** — "you always rush this" ends the technical conversation; fix: name the assumption or the risk you object to.
- **Mixing the levels of disagreement** — a trade-off argument dressed as a technical one never resolves; fix: state which level you are at.
- **No falsifier** — a position nobody can test is a block; fix: say what evidence would change your mind.
- **Re-arguing after the decision** — the team stops deciding in front of you; fix: record the risk once and move on.

## Go deeper

- **Explaining to any audience** (`08-soft-skills/01-communication/01-explaining-to-any-audience`) — the clarity this depends on.
- **Communication** (`08-soft-skills/01-communication`) — the track this chapter closes.
- **Teamwork & Collaboration** (`08-soft-skills/02-teamwork-collaboration`) — the same script applied inside a team.
- **Stakeholder Management** (`04-product-process/07-stakeholder-management`) — disagreeing with people who have the power to decide.
