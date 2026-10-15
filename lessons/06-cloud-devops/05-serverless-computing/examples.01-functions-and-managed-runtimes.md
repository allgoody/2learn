## Example 1 — Shaping a handler around its event

A small HTTP service keeps one database connection open for the life of the process and answers a request for one order. You are moving it to a function runtime, where the next request may land on a fresh process. The original code is below. Rewrite it so the handler is shaped by the event and does not assume the run continues.

```js
// original: a long-lived server, connection opened once at startup
const db = connect(process.env.DB);
app.get("/orders/:id", (req, res) => res.json(db.getOrder(req.params.id)));
```

### Solution

```js
// module scope: reused if the runtime stays warm, rebuilt if it does not
let pool = null;
function getPool() {
  if (pool === null) pool = connect(process.env.DB, { max: 1 });
  return pool;
}

export async function handler(event) {
  const id = event.pathParameters.id;
  return { statusCode: 200, body: JSON.stringify(await getPool().getOrder(id)) };
}
```

The event is now the interface: the order id arrives on the event rather than through a route table, and the return value is the response. The connection is created lazily at module scope, so a warm runtime reuses it while a cold one still works. The mistake is building the connection inside the handler, which pays the handshake on every invocation and churns connections as load rises.

## Example 2 — Choosing the envelope before a timeout does

A nightly roll-up reads yesterday's events and writes one summary row. It is being proposed as a function on the platform's default settings, and nobody has checked whether the work fits the time and memory the runtime allows. Work out the envelope and the billing shape before agreeing.

```text
job:             read 4 hours of events, aggregate, write one summary
proposed:        single function, default memory, default timeout
expected volume: about 40 million events per night
```

### Solution

```text
step          what it needs                fits a function?
read + parse  streamed, 2-3 min per shard   yes, small handler
aggregate     seconds, little memory        yes
whole job     4 hours, tens of GB            no - a job or container

billing at this volume, illustrative only:
  per request + per gigabyte-second -> high and unpredictable
  one container for the window      -> flat and predictable
```

Splitting the read into shards keeps every invocation inside the timeout and memory envelope, and each shard finishes in seconds. The whole job is the part that does not fit: work measured in hours belongs in a job or a container, and discovering that from a production timeout is expensive. Before committing, compare the two prices at your own expected load — per-invocation billing rewards intermittent work and penalises steady volume.
