## Example 1 — Labelling the evidence by its strength

A one-pager presents three claims as if they were equal, which is how opinion gets the same weight as observed behaviour. Evidence has three levels: behaviour in your product, behaviour observed in research, and opinion. Label the claims below, strongest first, and name the one that still needs a test.

```text
Why we should add saved payment methods
  - customers keep asking support for it
  - 42% of repeat buyers abandon at the card step
  - in eight sessions, six participants re-entered their card
    rather than going to get it
```

### Solution

```text
Evidence, strongest first
  behaviour in product  42% of repeat buyers abandon at the card step
  research              6 of 8 participants re-entered the card
  opinion               customers keep asking support for it

Supports: the problem is real and costly.
Does not support: that storing a card is the answer. The research
shows people dislike re-typing, not that they accept storage, so
that claim needs a test of its own.
```

Sorting by level makes the argument match the evidence and exposes the gap between "the problem is real" and "this solution fixes it". The failure is letting the loudest claim stand in for the strongest, so the analytics lose to a recollection.

## Example 2 — Writing the prediction before the build

The team has agreed what to build but has not written down what success looks like, so the result will be judged by whoever speaks last. A prediction with a measure and a threshold is what lets the plan fail. Turn the notes below into a one-page decision brief with its counter-evidence.

```text
Plan: remember card details for repeat buyers, ship in six weeks.
Support wants it. One engineer says people may find it creepy.
Success will be obvious once it is live, we will see.
```

### Solution

```text
Goal        Fewer abandoned repeat purchases at the payment step.
Prediction  Remembering card details raises repeat checkout
            completion from 58% to at least 65% within four weeks.
If it does not move, we stop and revert rather than adding prompts.
Measure     checkout completion for returning buyers, weekly.

Counter-evidence  One engineer expects distrust of stored cards;
                  two research participants declined to save one.
Alternatives not chosen  one-tap reorder; keeping the last order in
                  the account instead of a full re-checkout.

Review date  1 May. Outcome recorded either way.
```

The brief states the measure and threshold before the work starts, so the result can contradict the plan rather than being interpreted after it. The mistake is writing the prediction once the numbers arrive, which makes every decision look correct.
