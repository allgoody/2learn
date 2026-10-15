---
title: Teamwork & Collaboration
type: skill
topic: soft-skills
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Teamwork is sharing context so other people can act without you, unblocking them when you are the obstacle, and disagreeing without stalling the work. The artefact is not a feeling of goodwill; it is a written update, a review done the same day, and a script for the conversation you have been avoiding.

## Why it matters

A team's throughput is set by how long work waits on other people. A pull request sitting two days for review, a question in the wrong channel, an unspoken objection that resurfaces after the release — each is a queue, and queues are what slow a team down far more than typing speed. Collaboration skills are how the queues are kept short, and the specific failure they prevent is the one where everyone is busy and the work is standing still.

## Core ideas

### Share context, not status

A useful update says what changed that others depend on: a decision, an interface that moved, a risk that appeared, and what you need from whom. "Working on it" is not an update.

```text
Changed   the refund endpoint now rejects gift-card payments (REQ-PAY-014)
Needed    Priya to check the support script before Thursday
At risk   the audit-log item may not fit this sprint; will confirm Friday
```

### Unblock others before starting your own next thing

Treat a blocked colleague as a priority over your own queue, and say when you cannot. The cost of a five-minute unblock is far below the cost of a day of waiting, and waiting is invisible in every status report.

### Review the same day

A review is a queue with a person on the other end. An hour of your time today beats a day of someone else's tomorrow, and small pull requests are fast to review, so the two habits reinforce each other.

### Use a script for the conversation you are avoiding

Write the opening line before the meeting. It is the part that stops people having the conversation at all.

```text
Opening  "I want to talk about the missed dates on the migration.
          I am not looking for a reason, I want to work out what
          we change so it does not happen again."
Then     listen; ask what got in the way
Then     agree one change and who owns it
Close    "so we will try X for the next one; I will check in Friday"
```

### Disagree in the room, then commit

Unspoken disagreement becomes passive resistance three weeks later. Raise it with the objection and an alternative, and state clearly when you are supporting a decision you argued against.

## Practice

### Write the script for one conversation you have been avoiding

Write the opening line, the two questions you will ask, the one change you want to agree, and the closing line.

Done when: you have had the conversation and left it with one owned action and a date.

### Run one week of context-sharing updates

For one week, end each day with three lines: what changed that others depend on, what you need, what is at risk.

Done when: at least one colleague has acted on your update without asking you a question.

## Common mistakes

- **Status updates instead of context** — nobody can act on "working on it"; fix: say what changed, what you need and what is at risk.
- **Letting a review wait days** — a person is blocked on your queue; fix: review the same day.
- **Avoiding the difficult conversation** — the behaviour continues and resentment accumulates; fix: write the opening line first and use it.
- **Agreeing in the meeting and objecting afterwards** — decisions unravel in private; fix: raise the objection in the room, then commit.
- **Treating help as an interruption** — the blocked colleague stays blocked and the queue grows; fix: a five-minute unblock outranks the next item in your own list.

## Go deeper

- **Communication** (`soft-skills/communication`) — read this first; the techniques these scripts are built from.
- **Disagreeing productively** (`soft-skills/communication/02-disagreeing-productively`) — the longer form of the disagreement script.
- **Mentoring** (`soft-skills/mentoring`) — the one-to-one version of the same work.
- **Code Review** (`cs-fundamentals/code-review`) — where the review habit meets the code.
