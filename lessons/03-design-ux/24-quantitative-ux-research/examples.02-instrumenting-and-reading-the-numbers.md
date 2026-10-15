## Example 1 — Renaming checkout events and reading the jump

A checkout metric jumped after a release and the team wants to report it as a win. Three auto-named events are still shipping from the old page. Rename them so the trail survives the next redesign, then read the movement below.

```text
Shipped: green_cta_click, form_submit_2, done
Report:  conversions 900 -> 1,550, headline "checkout up 72%"
         (illustrative figures)
```

### Solution

```text
checkout.started   properties: channel, is_new_user, item_count
checkout.confirmed properties: channel, payment_method, value

Reading: visits 10,000 -> 31,000, so the rate went 9.0% -> 5.0%.
The paid campaign arrived with a lower completion rate and the
product did not change. Split by channel before quoting either.
```

The names describe what the person did, so moving a button in the next redesign will not break the history, and the properties carry the splits someone will ask for later. The movement is a denominator change rather than a behaviour change, and the aggregate hides it. The usual mistake is to ship `done` with no failure event paired to it, which leaves errors unable to become a rate, and to announce the jump before checking who is now included.
