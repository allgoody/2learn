---
title: Deployment shape
prereqs: ["01-cs-fundamentals/25-software-architecture/02-data-and-state-ownership"]
---

## What it is

Deployment shape is the answer to two questions: what ships together, and what fails together. One deployable unit ships every feature as a single artefact; a set of services ships them separately, paying for that freedom by versioning every interface between them. The choice is operational rather than purely technical: it fixes how many people must agree before a release, how small a change can be, and how far a single failure spreads.

## Why it matters

The shape charges you in coordination before it charges you in anything else. When everything ships together, a release waits for the slowest change in it: with 5 teams each finishing something in the same fortnight, a fix that is ready on day 1 still waits for the batch unless the batch is cut for it. When a service fails in a way that takes its callers down with it, the independence was only on paper, and the system carries the operational cost of many deployable units while keeping the coupling of one — which is what most accidental distributed systems look like. Counting the wait and the spread, rather than comparing labels, is what makes the choice arguable.

## Core ideas

### Independent deployability has a price

Releasing one part without the others requires three things: the interface stays compatible across every version live at the same time, the data is owned by the part that is releasing, and callers tolerate that part being briefly absent or slow. Each of the three is countable.

```text
a rolling release keeps two versions alive at once
  instances on the old release:   n_old = 9
  instances on the new release:   n_new = 3
  instances live at once:         n_old + n_new = 9 + 3 = 12
  interface versions a call must work against: 2, until the last old instance is gone

tolerating a dependency that restarts
  instances the caller may reach:  n = 3
  chance one instance is restarting now: p = 0.01, which is 1 in 100
  retries allowed:                 k = 2
  attempts per call:               1 + k = 3
  a call fails only if all of them hit a restarting instance:
  p^(1 + k) = 0.01^3 = 0.000001, so 1 call in 1 000 000, against 1 in 100 with no retry
  (the model assumes each retry lands on a different instance; retrying the same
  restarting one changes nothing)
```

Those are the same requirements as owning a boundary, seen from the release calendar. If they are not met, the separate deployment is one you have to coordinate anyway — all of the cost and none of the benefit — and the count of pipelines went up while the count of independent releases stayed at 1.

### A monolith is a defensible default

One deployable unit with clear internal boundaries is easier to reason about, test and debug than the same code split across processes: a failure that crosses 3 modules is 1 process to inspect and 1 log to read, where the same failure across 3 services is 3 logs and 1 trace identifier to correlate. It is also the easier decision to revisit: a module with a clean boundary can be extracted, one at a time, when a real operational need arrives, whereas starting distributed is the decision that is hardest to walk back.

```text
5 teams, 2 releases a fortnight, 1 hotfix ready on day 1 of the fortnight

one unit:   each release carries the work of all 5 teams, so a release waits
            for the slowest of them; the hotfix rides the next release, and
            the worst case is the gap between the 2 releases:
            14 days / 2 = 7 days, so up to 7 working days of waiting
5 units:    the owning team's release waits for nothing but its own change,
            so the same hotfix ships within hours
            and the price is 5 pipelines, 5 alert rules, 5 upgrade schedules
```

The numbers do not settle the question — 7 days of waiting may well be cheaper than 5 pipelines — but they turn a preference into a trade you can describe. Choose the monolith until you can name the constraint it fails to satisfy.

### Failures do not respect boundaries by default

Splitting a system into pieces does not isolate failure; it creates new failure modes. A caller that waits for ever on an unresponsive dependency has propagated the failure across the boundary that was supposed to contain it, because the threads it is holding were needed for everything else. Isolation has to be designed: an explicit timeout, a bounded number of retries, and a defined degraded answer for each dependency.

```text
a server keeps one request on one thread
  threads available:              T = 200
  a healthy dependency answers in  t_ok  =  50 ms = 50 milliseconds = 0.05 s, with 1000 ms in a second
  a hung dependency answers in:    never

no timeout
  each hung request holds 1 thread: 1 thread gone per hung request
  after 200 hung requests: 200 / 200 = 100% of the threads are gone
  every later request, including the ones that never touch the dependency, waits

a 200 ms timeout, t_max = 200 ms = 0.2 s
  one thread completes 1 / t_max = 1 / 0.2 = 5 degraded requests per second
  all 200 threads: T * 5 = 200 * 5 = 1000 degraded requests per second
  healthy, one thread completes 1 / t_ok = 1 / 0.05 = 20 requests per second
  all 200 threads: T * 20 = 200 * 20 = 4000 requests per second
  so the hang costs 4000 - 1000 = 3000 requests per second of capacity
  while it lasts, and costs nothing else
```

That last subtraction is the whole difference between services that are separate and services that are independent. It is designed deliberately, at each outbound call, not inherited from the shape of the diagram.

### Environments and configuration are part of the shape

What differs between development, staging and production decides how safely you can test, because every difference is a branch that nothing has exercised. Configuration read from the environment, and a build promoted from one environment to the next rather than rebuilt, keep the artefact you tested identical to the one you run.

```text
environments: development, staging, production

differences that are configuration, read at start-up and named:
  database URL, credentials, replica count, log level     4 settings
  the artefact: 1 build, promoted, so the same bytes run in all 3 environments

differences that live inside the build:
  development and staging run SQLite; production runs PostgreSQL
  the PostgreSQL query planner has therefore been exercised 0 times before
  production, and the 2 staging environments measured a different planner
  any query whose plan differs between the two engines is a defect that
  staging cannot see, however long it runs
```

The fewer the differences, the more a staging result predicts production. The number to watch is how many settings change between environments, because each one is a claim that its two values behave alike — and the claim is only as good as the last time the second value was tested.

### Blast radius is a design choice

Ask, for each part: if this fails or is wrong, what else stops or corrupts? That reach is the blast radius, and a single database for everything means one bad migration is everyone's outage.

```text
one database, read by 12 services: s = 12
  a migration locks one table for 2 minutes
  services that stall for those 2 minutes: 12
  minutes in 30 days: 30 days * 1 440 minutes a day = 43 200
  availability of each service that month:
  (43 200 - 2) / 43 200 = 43 198 / 43 200 = 0.99995
  the 2 minutes are paid once and appear in all 12 services' numbers

payments on its own database: s = 1
  the same 2 minutes appear in 1 service's numbers
  and the other 11 services never see them
```

Placing a boundary around the most damaging failure — payments, authentication, a data pipeline — is often a better reason to split than performance or team size, because what it buys is measurable: the number of services that stop when that one thing goes wrong falls from 12 to 1.

## Practice

### Name the constraint

Write down what your system needs that a single deployable unit cannot provide: a team that must ship without waiting, a component with a different scaling profile, or a failure that must be contained. Put a number beside each candidate — a release cadence in releases per week, a load in requests per second, an outage in minutes that other services must not share.

Done when: the list is either empty or holds at least 1 constraint you can measure, with its number written next to it.

### Make a failure isolated

Pick one external dependency your system calls. Set an explicit timeout, cap the number of retries, define a degraded answer for that dependency, then make it unavailable and watch what the rest of the system does.

Done when: the system still serves requests with the timeout in place, the degraded path is visible in a metric or a log line, and you can state the requests per second the server completes while the dependency is down.

## Common mistakes

- **Distributing before there is an operational reason** — the complexity is paid up front for a benefit never collected: 5 pipelines and 5 alert rules, while a hotfix still waits for 2 other services; fix: start with 1 deployable unit and extract on demand.
- **Splitting without owning the data** — the services share a schema, so 1 migration needs 3 coordinated deploys and none of them ships alone; fix: treat data ownership as part of the deployment boundary.
- **Calling a dependency without a timeout** — at 200 threads with no timeout, 200 hung calls remove 200 / 200 = 100% of the capacity and unrelated requests stop too; fix: set an explicit timeout and cap retries at every outbound call.
- **Diverging environments** — a staging result does not predict production, because the query planner that runs in production has been exercised 0 times before it runs there; fix: promote 1 build through the environments and keep the differences in configuration.
- **Ignoring the blast radius of a shared resource** — 1 bad migration on a database read by 12 services stalls all 12, where a separate database would have stalled 1; fix: place boundaries around the failure you most need to contain.

## Go deeper

- **Data and state ownership** (`01-cs-fundamentals/25-software-architecture/02-data-and-state-ownership`) — ownership is what makes independent deployment possible, so read it first.
- **Documenting decisions** (`01-cs-fundamentals/25-software-architecture/04-documenting-decisions`) — deployment shape is a decision people will question later, and the reasoning needs to survive the questioner.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`06-cloud-devops/10-networking-fundamentals-http-dns-tls`) — the transport behaviour your timeouts and retries are actually working with.
