## Example 1 — An alert on a cause nobody can act on

An alert on high host CPU fires several times a week and the team has begun to ignore the notifications; nothing user-visible was wrong in any of those cases. The rule below is what is in place. Replace it with one alert on what users experience, with a threshold derived from the service's target rather than from last week's chart.

```text
alert: host CPU above 80 percent for 5 minutes
owner:  platform team
action: (none recorded)
```

### Solution

```text
alert:  checkout requests failing over five minutes above 0.1 percent
owner:  checkout team
action: read the last hour of deploys, then roll back or fix forward
not:    CPU above 80 percent anywhere
```

The alert now names a condition a user experiences, and the threshold comes from the failure the checkout target already tolerates rather than from the shape of the CPU graph, so it survives traffic growth. CPU can be high for good reasons and low while the service fails, which is why the cause rule lost its credibility. The usual mistake is to keep the cause alert as a backup, which restores the noise the change removed.

## Example 2 — A dashboard that begins at detail

The dashboard below was assembled during an incident from whatever data was to hand. Under pressure, nobody can tell from it in the first few seconds whether the system is healthy. Restructure it into layers and say what each layer answers.

```text
dashboard "infra"
  host-1 cpu     host-2 cpu     host-3 cpu
  host-1 memory  host-2 memory  host-3 memory
  host-1 disk    host-2 disk    host-3 disk
  host-1 network host-2 network host-3 network
```

### Solution

```text
overview  request rate, error rate, duration and saturation — one panel each, all services
          answers: is anything wrong?
service   the same four for checkout, split by route
          answers: where?
detail    per instance and per route, linked from the service layer
          answers: which instance, which customer path?
```

The overview answers the first question in seconds and the second layer answers the next, so the host panels become drill-down instead of the front page. The four signals — rate, errors, duration and saturation — cover most incidents for every service, which is why they belong at the top. The usual mistake is to build the detail layer first, because it is the data that already existed.
