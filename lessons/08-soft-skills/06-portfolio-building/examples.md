## Example 1 — Fill the slot most portfolios leave empty

A colleague is adding a project to their portfolio and has sent you a draft that describes what they built and how well it went. Rewrite it as a case study with four slots, so a reader can judge the decisions.

```text
Draft page
"We built an ordering app for a café, with a menu, a basket and checkout.
The design is clean and the app is fast. It went well."
```

### Solution

```text
Café order app — repeat orders
Problem      22% of repeat orders were abandoned at the payment step
             (illustrative figures); the goal was to cut that
Constraints  one developer, 6 weeks, no changes to the payments provider
Options and decision  saved cards, remembering details without storage,
             a reorder shortcut. Chose the shortcut: it needed no storage
             decision and fitted 3 weeks. Saved cards rejected: they
             required a provider change we did not have.
Outcome      abandonment fell to 14% over six weeks, counted by the app
             itself (illustrative numbers); what I would change is
             testing the shortcut with five users before building it.
```

The four slots are the problem, the constraints, the options with the decision, and the outcome. The slot most portfolios leave empty is constraints, and it is the one that makes the rest legible: with six weeks and a frozen payments provider on the page, the shortcut reads as a judgement rather than an obvious feature. The usual mistake is describing the output — "clean and fast" — which answers whether the work is polished, not whether the reader would want your decisions on their team.
