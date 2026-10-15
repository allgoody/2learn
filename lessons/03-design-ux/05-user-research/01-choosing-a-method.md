---
title: Choosing a method
prereqs: []
---

## What it is

Choosing a method means writing down the question you are trying to answer, then picking the cheapest method that can answer it. The question decides the method; starting from a favourite method is how teams end up with a survey that cannot explain anything, or an interview study that cannot tell them how often something happens.

## Why it matters

The wrong method produces evidence that looks like data and cannot be used. A survey run before you know what matters gives you precise answers to the wrong questions; interviews run to size a market give you anecdotes. Choosing deliberately also makes the study small enough to finish: you can run five sessions this week only if you decided this week is about understanding, not proving.

## Core ideas

### Write the question first

One sentence, answerable, with a decision attached. If you cannot say what you would do differently depending on the answer, the study is not worth running.

```text
Weak:     "Do users like the new checkout?"
Strong:   "Where do first-time buyers abandon the checkout,
           so we know which step to redesign next sprint?"
Attached: if abandonment concentrates at the address step, redesign that.
```

### Behaviour questions need observation; opinion questions need scale

Understanding why someone struggles needs five to ten sessions of watching and asking. Knowing how many struggle needs hundreds of responses to one question. These are different studies and are usually confused.

```text
Question type         Method                 Typical n
What happens here?    observation, interviews  5-10
Why does it happen?   interviews               5-10
How often?            analytics, survey        100s-1000s
Which variant wins?   experiment               1000s
```

### Sequence discovery before measurement

Qualitative work tells you what to measure; quantitative work tells you how much it matters. Running the number first means measuring whatever was easy to instrument rather than what matters.

### Match effort to the size of the decision

A decision worth a week of engineering does not need a six-week study. Write the size of the change you are willing to make, then scale the research to it.

### Say what the method cannot tell you

Every method has a blind spot. Write it down next to the plan: interviews cannot tell you frequency, analytics cannot tell you why, surveys cannot tell you what people do. Naming the blind spot prevents the team from over-reading the result.

## Practice

### Turn three questions into three studies

Take three open questions from your backlog. For each, write the question, the decision attached, the method, the number of participants and the blind spot.

Done when: no two rows use the same method without a stated reason, and each row names a decision that changes if the answer comes back negative.

### Kill one study

Take a study already planned or in progress and try to argue it down to a cheaper method. Move one step earlier in the sequence if you can.

Done when: you have either reduced the planned cost or written one sentence saying why the more expensive method is required.

## Common mistakes

- **Starting from the method** — the answer is shaped by the tool rather than the question; fix: write the question and the decision before choosing anything.
- **Surveying to find out why** — you get ranked opinions with no explanation; fix: run interviews first and use the survey to size what they revealed.
- **Interviewing to size a market** — ten people cannot tell you a proportion; fix: use analytics or a survey once you know what to count.
- **No decision attached** — the study finishes and nothing changes; fix: name the decision and its owner before recruiting anyone.
- **Forgetting the blind spot** — the team treats qualitative findings as quantities; fix: state the blind spot in the plan and repeat it when presenting.

## Go deeper

- **User Research** (`03-design-ux/05-user-research`) — the track this method choice sits at the start of.
- **User Interviews** (`03-design-ux/20-user-interviews`) — the method to reach for when the question is why.
- **Survey Design** (`03-design-ux/21-survey-design`) — the method to reach for when the question is how many.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — the numbers side of the sequence.
- **Design Research** (`03-design-ux/19-design-research`) — framing the problem before any method is chosen.
