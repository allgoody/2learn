## Example 1 — A funnel with a unit and a place to look

A team is about to change the checkout and wants one number to watch during the release. The export below is one row per session. Write the funnel definition, count it in people, and mark where to look without calling it the cause.

```text
Export: sessions, 24 hours (illustrative)
open_basket 4200   open_checkout 3100   address 1900
pay 800            confirmed 760
```

### Solution

```text
Funnel: add to basket -> open checkout -> enter address -> pay
        -> confirmed
Unit:   one person, first attempt only, 24-hour window
Guardrail: support contacts that mention checkout

Step            People  Step rate
add to basket    3000     -
open checkout    2400    80%
enter address    1500    63%
pay               600    40%   <- study this step
confirmed         570    95%
```

The unit is stated before the count, so a colleague can recount the same events the same way next month, and the step rates show which fall is worth five sessions. The largest fall is marked as a place to look, not as the fix, because a drop-off locates a problem and never explains one. The usual mistake is to count sessions as people — shared devices inflate the top of the funnel — and then to redefine the unit between releases, so an apparent improvement is only a new definition.
