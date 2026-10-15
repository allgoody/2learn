## Example 1 — Three questions, three methods

A team wants to know why checkout attempts fail, how often they fail, and whether a shorter address form fixes it. Three open questions are on the board and one study is planned. Write the question, the decision, the method, the number of participants and the blind spot for each, so the cheapest study runs first.

```text
Q1  why do first-time buyers stop at the address step?
Q2  how many buyers abandon at the address step?
Q3  does a shorter address form reduce abandonment?
Planned so far: a 20-question survey sent to the whole list, next week.
```

### Solution

```text
Q1  Question: where do first-time buyers abandon, and what stops them?
    Decision: which step to redesign next sprint. Method: 6 watched
    sessions. Blind spot: cannot say how often it happens.
Q2  Question: what share of buyers abandon at the address step?
    Decision: whether this is worth a sprint at all. Method: analytics
    on the step events. Blind spot: cannot say why.
Q3  Question: does the shorter form reduce abandonment?
    Decision: keep or revert the form. Method: experiment on the two
    variants. Blind spot: says nothing about the cause.

Sequence: Q1 first to learn what to measure, then Q2 to size it, then Q3.
```

The sequencing is the point: six watched sessions tell the team what to count, so the analytics query counts something that matters rather than whatever was easy to instrument. Every row carries a decision, which is what makes a question worth a study. The usual mistake is starting from the survey because it reaches the most people — it would return a precise proportion of a cause nobody has identified yet, and the number would be believable.
