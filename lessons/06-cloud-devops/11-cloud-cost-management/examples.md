## Example 1 — Resizing from measurement rather than guess

A service's fleet was sized for a launch peak that never arrived. Given the provisioned shape against the observed peak, choose the next size down that still clears it, and say what would change the answer.

```text
illustrative figures
provisioned per instance: 8 vCPU, 32 GB, across 12 instances, on demand
observed peak over 30 days: 1.4 vCPU, 6 GB
the price follows the size, not the load
```

### Solution

```text
target: 2 vCPU, 8 GB per instance — clears the observed peak and keeps headroom for a spike
method: measure peak over a representative period, resize, then re-measure next month
leave on demand: no commitment, so a change of shape later costs nothing
revisit if: a new feature raises the peak, or the fleet's duty cycle changes
```

Provisioned capacity drifts above use because nothing revisits the original guess, and resizing needs neither a commitment nor an architecture change, which makes it the cheapest saving available. Keeping the resized fleet on demand preserves the freedom to be wrong about the next month. The usual mistake is to commit while large, then discover the committed shape no longer matches the workload.

## Example 2 — Scheduling a non-production environment

A development environment runs around the clock and is used only during working hours. Propose the schedule, name the owner and the fallback, and estimate the share of the month it saves.

```text
illustrative figures
environment: 14 instances, running every hour of the month (about 730 hours)
working hours: 10 hours a day, five days a week (about 217 hours)
```

### Solution

```text
stop at the end of the working day; start before it begins; do not run at weekends
saving: roughly seven tenths of the month's hours, applied to the whole environment
owner:  the team that uses it, named in the environment's tags
fallback: if a scheduled start fails, alert the owner, who can start it by hand
```

Non-production is the usual culprit because it is provisioned like production and used like an office, so scheduling removes most of its cost without touching production at all. Naming the owner matters as much as the schedule: an environment nobody owns is started by hand during one incident and then left running again. The usual mistake is to schedule it with no alert on a failed start, which loses a day of work and gets the schedule removed.
