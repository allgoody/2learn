---
title: Data Ethics
type: skill
topic: 07-security
tier: small
status: drafted
aliases: []
prereqs: ["07-security/05-gdpr-data-privacy"]
related: []
---

## What it is

Data ethics is the set of questions legality does not answer: what you should collect, what you should infer from it, who should see it, and what happens to the people it describes when you are wrong. It applies to data you are perfectly entitled to hold.

## Why it matters

The law sets a floor and lags the technology by years. A lawful basis does not make it right to infer someone's pregnancy from purchase patterns, to score applicants on data they cannot see, or to keep a per-person behavioural profile indefinitely because the terms mentioned profiles. The practical risk is not only moral: decisions made from inferred data are frequently wrong, hard to explain and hard to appeal, which is a product risk as well as an ethical one.

## Core ideas

### Ask what happens when the inference is wrong

Every decision made from data has a failure mode attached to a person. Write it down and decide whether the person can find out and contest it.

```text
Inference   "likely to churn" -> a retention offer
Wrong for   a long-standing customer who is simply unwell
Recourse    none: the offer appears and the customer never knows why
Better      show the reason, or use the signal for support contact
             rather than for a silent decision
```

### Distinguish collected from inferred

Collected data is what the person gave you. Inferred data is a claim you made about them. The second carries more risk and should always be less, shorter-lived and more explainable.

### Minimise the inference surface

Ask whether each inferred attribute is needed for the decision in front of you, or is being collected because it might be useful later. Profiles accumulate and are the hardest thing to delete and to defend.

### Look for the asymmetry of power

The question is not only whether consent was given but whether it could meaningfully be refused. Employees, applicants and people with no alternative provider are not in a position to say no.

### Give someone the job of asking

Ethical questions have no owner by default, so nothing is decided. Name who is asked when a new data use is proposed, and write the grey-area decision down so the next team does not relitigate it.

## Practice

### Work through one grey-area use case

Take a data feature your team is considering. Write what it collects, what it infers, what decision it drives, what happens when it is wrong and whether the person can contest it.

Done when: you have either a written change to the design or a written justification for keeping it, stored where the next person will find it.

### Audit the inferred attributes in one system

List every attribute the system infers rather than collects, and mark each as needed-now, possibly-useful or speculative.

Done when: every speculative attribute has a deletion date or has been removed.

## Common mistakes

- **Treating legality as the whole test** — a lawful use can still be wrong; fix: ask the wrong-inference question as well.
- **Profiles built for possible future use** — the hardest data to justify and to delete; fix: collect only what a present decision needs.
- **No recourse for the person** — a decision about someone that they cannot see or challenge; fix: surface the reason or avoid automated decisions in that domain.
- **Ignoring the power imbalance** — consent from a person who cannot refuse is not consent; fix: consider the alternative available to them.
- **No owner for the question** — each team decides in isolation and inconsistently; fix: name who is asked and record the decision.

## Go deeper

- **GDPR & Data Privacy** (`07-security/05-gdpr-data-privacy`) — read this first; the legal floor these questions sit above.
- **The right to be forgotten, in a database** (`07-security/05-gdpr-data-privacy/02-the-right-to-be-forgotten-in-a-database`) — the mechanism that makes deletion possible.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — measuring behaviour, where the collection decisions begin.
- **Hotjar** (`03-design-ux/25-hotjar`) — recording real sessions, a place where inferred and collected data overlap.
