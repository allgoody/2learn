## Example 1 — The advisory that is two levels down

The project's manifest lists a form library and a handful of direct dependencies. The scan run at release time reports nothing, yet a parsing library three levels down is on an old version. Scan the right file, and present the finding so it names what you actually got rather than what you asked for.

```text
manifest.json    direct dependencies only
  form library     ^4.2.0
  router           ^1.1.0
lockfile         resolved tree, including transitive packages
  parsing library  1.4.2   (pulled in by the form library)
```

### Solution

```text
Scan: the lockfile on every pull request, and again nightly
Finding (illustrative figures; substitute your own scan's record)
  package     parsing library (transitive, absent from the manifest)
  installed   1.4.2
  severity    high
  fixed in    1.5.0
  source      your scanner's advisory record; no link is pasted here
```

Scanning the resolved lockfile reports the version that will actually be deployed, including the transitive packages where most advisories sit. The nightly rescan matters because an advisory can be published after your dependency was pinned. The usual mistake is to scan the manifest and conclude the project is clean; it lists what you asked for, not the forty packages you received.

## Example 2 — Triage by reachability, not by count

The scan now returns eight findings, and the team's first response is to sort by severity and start at the top. That list will not be worked through. Classify each finding by whether the vulnerable code is reachable, so the work lands where exposure is real.

```text
8 findings, sorted by severity only:
  high    uploaded-file parser, in the API request path
  high    build-time code generator, development only
  medium  image-size reader, feature not used by the product
  medium  templating engine, reachable from stored user content
  ... four more
```

### Solution

```text
Finding (illustrative)                       Reachable?     Route to fix
uploaded-file parser, API path               yes            patch in 7 days
templating engine, stored user content       yes            patch in 7 days
image-size reader, unused feature            no             note, revisit at upgrade
build-time code generator, development only  no             patch at next build tool bump
```

Each row gets a reachability judgement, a fix version where one exists, and an owner, which turns a count into a queue. Where there is no fixed version, record the compensating control and the date to revisit. The usual mistake is to treat severity as risk: a high-severity advisory in a code path nothing calls is less urgent than a medium one an attacker can reach, and no scanner can tell the difference for you.
