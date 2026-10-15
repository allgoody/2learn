## Example 1 — A checkout event plan, renamed and trimmed

A shop has tracked every button press as one auto-named event since launch, so no report can say which step people abandon. You have been asked to define the checkout event plan before the next release: the names, their parameters, and the conversions worth marking. Write the table.

```text
btn_click_1    home hero banner
btn_click_3    add to cart button
btn_click_7    checkout button
btn_click_11   place order button
(no parameters; each press is one event)
```

### Solution

```text
Event             Parameters                        Conversion
add_to_cart       item_id, value, currency          -
begin_checkout    value, currency, coupon           -
add_payment_info  payment_type                      -
purchase          transaction_id, value, currency   yes
```

The names describe what the person did, so moving a button in a redesign does not change the trail, and the parameters are the splits someone will want later — basket value, currency, coupon. Only `purchase` is marked as a conversion, which keeps the acquisition reports to the one outcome the business counts. The usual mistake is to keep the `btn_click` names and mark every step a conversion: the funnel then reads the markup, and the reports fill with noise nobody trusts.

## Example 2 — A consent gap and a doubled purchase

Consent is denied for one visitor before they accept the banner, and the purchase event on one order fires twice. The readings below are what the team took from the report. Work out what each reading means, and how the purchase event should be checked.

```text
session A   consent denied    purchases 0    read as "did not buy"
session B   consent granted   purchases 2    for one order confirmation
```

### Solution

```text
Consent denied   no analytics event is sent, so the session is absent
                 from the report rather than counted as a zero
Consent granted  one purchase per confirmation page load, with
                 transaction_id, value and currency populated
```

A denied session should leave a visible gap, and an absent row must never be read as a purchase that did not happen — that assumption is the first mistake, and it silently shrinks the counts. The doubled figure is a separate error: an event that fires twice doubles every rate built on it, and the duplicate is exposed by the parameter check, because both copies carry the same `transaction_id`. Verify each new event end to end before any report is built on it.
