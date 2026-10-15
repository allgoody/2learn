## Example 1 — When the inference is wrong

A retention model scores customers as "likely to churn" and sends them a discount. Nobody has written down what happens when the score is wrong. Take the feature below and write the failure mode, the recourse available to the person, and one design change that keeps the signal useful.

```text
Feature proposal
  input:    purchase gaps, support contacts
  inference: churn risk score
  decision:  automatic 20% discount for the top decile
```

### Solution

```text
Wrong for   a loyal customer who is simply unwell and has stopped ordering
Recourse    none: the discount appears, the reason never does
Change      surface the reason, or route the signal to support contact
             rather than to a silent automated decision
Record it   write the failure mode and the decision where the next team finds it
```

Every decision made from data has a failure mode attached to a person, and the ethical question is whether they can find out and contest it. Writing the failure mode down is what turns an unexamined feature into a decision someone has defensibly made. The usual mistake is to treat a lawful basis as the whole test; the law sets a floor, and a decision that is wrong in this way is a product risk as well as an ethical one.

## Example 2 — Collected versus inferred

A quarterly audit lists the attributes one system holds, and the team cannot say which were given by the person and which the system claimed about them. Sort the list, then mark what to do with each inferred attribute.

```text
Account fields: email, postcode, order dates, device type,
  "likely to churn", "prefers evening delivery", "price sensitive"
```

### Solution

```text
Collected   email, postcode, order dates, device type
              -> the person gave these; standard retention applies

Inferred    "likely to churn"           needed now    keep, tied to the current decision
            "prefers evening delivery" possibly useful delete within 90 days unless used
            "price sensitive"          speculative    remove; no present decision depends on it
```

Collected data is what the person gave you; inferred data is a claim you made about them, so it carries more risk and should be less, shorter-lived and more explainable. Marking each inference against a present decision stops the profile accumulating because it might be useful later. The usual mistake is to keep every inferred attribute indefinitely — those profiles are the hardest data to delete and the hardest to defend.
