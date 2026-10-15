## Example 1 — A waterfall read by size instead of order

A throttled cold load produces the recording below. The team reduced the largest transfer by half and the metric barely moved. Explain what the waterfall shows, then name the change worth making instead. Treat the panel state as illustrative, not as a measurement of your own site.

```text
illustrative throttled cold load
index.html   ████
app.css          ████
app.js             ██████████
hero.avif                 ████████
```

### Solution

```text
the reading
app.css starts only after the HTML and blocks the first paint  -> make it smaller or inline the critical part
hero.avif is discovered last but is the largest contentful element -> preload it and load it eagerly
app.js parses for the whole window while nothing is painted      -> defer it until after first paint
```

A request's position on the timeline usually matters more than its size: a small stylesheet that blocks rendering costs more than a large image that arrives in parallel with everything else. That is why halving the biggest transfer changed nothing — the element the metric waits for was still discovered last, behind two blocking predecessors. Reading the waterfall in the order the browser experienced it, rather than the order the code is written, is the skill; the question for each row is what it was waiting for and what was waiting on it. The size, format and cache status are the second pass, not the first.

## Example 2 — One laboratory run with a warm cache

A change is declared a success because a single recording looked faster. Nobody re-checks the other metrics, and the improvement disappears in production. Say what the measurement protocol is missing, then make the comparison trustworthy. The numbers below are a shape, not your project's data.

```text
run 1 (cache enabled, no throttling):  1.1 s to first paint
change applied
run 2 (same conditions):               0.9 s
conclusion: 18% faster
```

### Solution

```text
protocol
- cold load: disable the cache, since a first visit is what most new users get
- throttling: CPU and network presets, because field data is dominated by devices you do not own
- three runs minimum, compare the median rather than a single sample
- re-measure all three metrics, because one fix can move another the wrong way
```

Field data and laboratory data answer different questions: the field tells you whether real users on real devices are having a bad experience, and the lab tells you why. A warm-cache, unthrottled run measures the machine rather than the product, and a single sample has enough variance to hide a regression inside an apparent improvement — so fix the protocol, change one thing, and re-measure everything.
