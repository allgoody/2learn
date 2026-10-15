## Example 1 — Naming what the confirmation says first

A teammate has drafted an order confirmation as four items all set at 16px, so nothing leads the eye. The sketch below is the current screen. Decide which element the user should see first, and re-rank the rest so each step down is visible.

```text
Order confirmed                16px
Arriving Tue 14 May            16px
Order #48213 · £86.50          16px
Back to your orders            16px
```

### Solution

```text
"Your order is confirmed"      24px, heaviest weight
"Arriving Tue 14 May"          17px, high contrast
Order #48213 · £86.50          13px, low contrast
Back to your orders            a text link, not a button
```

One element now wins unambiguously and three levels descend beneath it, so the user reads the statement, the date, the reference, then leaves. The failure to watch for is promoting two things at once — a large headline and a coloured button — which gives the screen two entry points and therefore no ranking at all.

## Example 2 — Re-spacing a card onto a scale

The card below uses gaps chosen by eye: 6, 14 and 27 pixels. The grouping meant is label-with-value, button-with-value, and card-to-section. Re-space it on a four-step scale without changing any colour or type size.

```text
Card
  "Delivery address"          6px below
  "24 Willow Road"            14px below
  [ Change ]                  27px below
Next section
```

### Solution

```text
Card
  "Delivery address"          4 below
  "24 Willow Road"            one group with its label
  [ Change ]                  8 below
Next section                  40 below
```

Every gap now comes from 4, 8, 16 or 40, so the address sits with its label and the button sits with the address, which is the grouping the screen actually means. Arbitrary values are what make a page feel almost-aligned: each one is defensible on its own and together they read as drift, while a scale makes the repetition invisible and the grouping deliberate.
