## Example 1 — Reading the result against the brief

The test has stopped and the report shows twelve measures. Read it against what was agreed, then write the outcome record the team will find next quarter.

```text
Brief: primary measure checkout completion, threshold +2 points,
       revert below +0, two full weeks.

Report headline: time on the address step down 12%
```

### Solution

```text
Results after two full weeks (illustrative)
Variant           visitors   completion   vs control
control           7,180      9.0%         —
optional phone    7,240      9.4%         +0.4 points
interval on the difference: -0.5 to +1.3 points

Decision: revert. The primary measure did not clear its threshold.

Outcome record
tested: optional phone number on the address step
measure: completion +0.4 points, interval across zero
decision and owner: revert, growth team, 14 June
next: test the order of the address fields separately
```

The pre-agreed measure failed, so the speed gain is filed as a hint for the next test rather than kept as a win; the interval, not the point estimate, says nothing here is decided. The usual mistake is reading the report before the brief, which promotes the best-looking secondary measure to headline.

## Example 2 — A win that decays, and the segment that flatters it

The variant is ahead on the total and the weekly trend disagrees with it. Decide whether to ship, and resist the segment that looks best.

```text
Illustrative result, a change to button colour that everyone can see
            week 1   week 2
control     8.9%     9.1%
variant     13.4%    10.2%

Segment view, found while looking: mobile users, interval above zero
```

### Solution

```text
Read week by week: 13.4% then 10.2% is an effect decaying toward baseline
Read by segment:   mobile was not named in the brief

Decision: do not ship. Re-measure the colour in four weeks.
Next hypothesis: mobile users respond to the change; test it deliberately.
```

Plotting the two weeks shows an effect drifting back toward baseline, which is what curiosity looks like rather than a durable gain; the mobile split was discovered after the test, so it belongs in the next hypothesis. The usual mistake is shipping the segment's number, which turns a post-hoc finding into a product decision.
