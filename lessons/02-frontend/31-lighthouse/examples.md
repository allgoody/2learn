## Example 1 — Working down the report from the top

An audit reports three opportunities and the team fixes the render-blocking stylesheet because it sounds like the most important one. The score barely moves. Say how to read the report, then choose the item that pays. The run below is illustrative, not a measurement of your own site.

```text
Performance 62          (laboratory run, throttled, empty cache)

Opportunities
  Properly size images             est. 480 KiB
  Reduce unused JavaScript         est. 210 KiB
  Eliminate render-blocking CSS    est. 120 ms

Diagnostics
  Largest Contentful Paint   4.1 s
```

### Solution

```text
the reading
the score is a weighted summary; the list underneath is the output that can be acted on
"Properly size images" has the largest estimated saving and the LCP diagnostic agrees:
the metric the score is losing points on is the hero image, not the stylesheet

the change: serve a correctly sized hero, then re-run the identical audit
```

The score is a laboratory summary and the useful part is the list beneath it: each opportunity names the resources responsible and the saving it estimates, so the largest item is the one to fix first — and here the diagnostics confirm it, since the metric furthest from its threshold is the paint of the largest element. Re-running the same page and confirming the item has left the report turns a change into evidence.

## Example 2 — A single run treated as a measurement

The score drops from 78 to 75 after a change that should have helped, and the change is reverted. Say what is being mistaken for signal, then make the comparison trustworthy. The numbers are illustrative.

```text
run 1: 78      (before adding a lazy-loaded chart)
run 2: 75      (after)   -> reverted
```

### Solution

```text
protocol
- repeat the audit three times and compare medians, not single runs
- treat a few points as noise: the audit is one throttled simulation, not a measurement
- change one thing per comparison, and re-check the field data alongside the laboratory score
- put a floor in the pipeline: minimum accessibility score, maximum transferred bytes
```

A single laboratory run is noisy, so a change of a few points sits inside the run-to-run variation and reasoning from it produces pointless work. The audit is also a simulation rather than a visit: a page with good field data can still score poorly because of one slow third-party script. Read the opportunities, repeat the run, check the field metrics, and let a pipeline budget hold the numbers where the team agreed they should be — a perfect score is not the goal.
