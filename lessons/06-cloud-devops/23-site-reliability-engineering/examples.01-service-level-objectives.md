## Example 1 — An objective that the average hides

A team wrote its first objective as an average response time. Two of the last three incidents were slow for a minority of users, and the objective never moved. The sketch below is what is written. Restate the indicator so the tail counts.

```text
illustrative figures
service    checkout
indicator  average response time of checkout requests
objective  under 200 ms, measured continuously
scope      all requests

last week          118 ms average
during the incident  97 ms average, with 4 percent of requests above 2 seconds
```

### Solution

```text
service    checkout, excluding internal health checks
indicator  proportion of requests served successfully within 300 ms
objective  99.9 percent over a rolling 30 days
scope      checkout requests from the storefront
measured from the request and duration data already collected
```

An average is a statement about the system, so an incident that affects a minority leaves it unmoved; a proportion within a threshold counts the slowest requests and the unluckiest users, which is what the objective is meant to promise. Stating the indicator as the user experiences it also forces the team to say which requests are in scope. The usual mistake is to set the threshold at today's observed latency, which turns the objective into a description of the present rather than an agreement.

## Example 2 — A target for a service with no traffic

A new internal service has no traffic statistics, and the team has proposed near-perfect availability because it sounds safe. Nothing currently measures availability at all. Write the objective the service can be held to, and say where its number came from.

```text
service       reporting-api
users         three internal teams, all still migrating
data today    request count per route, error count per route
proposal      "near-perfect availability"
```

### Solution

```text
start from a borrowed target   99.9 percent over 30 days, the platform's own objective
then measure                    the service's real behaviour for one month
indicator                       proportion of requests served successfully, from the counts already collected
owner                           the reporting-api team, named in the objective
revisit                         when the migrating teams depend on it in production
```

A target chosen for a service with no users is guesswork, so adopting a sibling's and then setting one informed by a month of real behaviour is the practical route, and it keeps the objective a living agreement. The indicator must be computable from data already being collected, or the objective is a wish nobody monitors; the request and error counts above are enough. The usual mistake is to pick an ambitious number first, then find that nothing computes it, and quietly stop mentioning the objective.
