## Example 1 — Build the five slides backwards

You need approval for a schema change and a migration window. Build the five-slide outline, with the decision written above slide one and each slide title stating a finding.

```text
Ask       approval for the schema change and a two-week migration window
Audience  the team that owns the release calendar
```

### Solution

```text
Decision wanted: approve the schema change and a two-week migration
window, accepting a read-only period of about 20 minutes.

1 Context     the orders table has no place for partial refunds, so
              support corrects them by hand
2 Options     two new columns, or one column with a lookup; the real
              cost of each
3 Evidence    the migration rehearsal against a copy of the table
4 Recommendation  the two-column change; the lookup adds a join to
              every read
5 The ask     the decision, the window and the date
```

Naming the decision first means nobody forms a position before hearing the ask, and reading only the titles still follows the argument. The usual mistake is a chronological deck — what we tried, what we found, what we tried next — which spends the room's attention and reaches the ask last, or not at all.

## Example 2 — Turn topic titles into findings

These four slide titles describe areas. Rewrite each one as the sentence the slide proves, so a skimming reader follows the argument.

```text
1 Performance
2 The queue change
3 Results
4 Next steps
```

### Solution

```text
1 Latency got worse after the queue change
2 The change moved work off the request path and into a batch step
3 The extra wait sits in the batch step, not in the queue itself
4 I recommend reverting the batch size on Wednesday
```

A title that states the finding lets the body support it, and a reader who only sees the titles can still follow the whole argument. "Performance" and "Results" are chapter headings; they describe an area and force the audience to interpret while you talk. The usual mistake is leaving the conclusion in the body, where half the room has already decided against the slide.
