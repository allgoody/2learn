## Example 1 — Moving state out of the instance

A service writes each upload to its own local disk and records the path in its database. Behind a load balancer the download works only when the request reaches the instance that accepted it. Decide where the file belongs and rewrite the two steps.

```text
POST /uploads   -> write /var/data/uploads/91a2.pdf, store that path
GET  /uploads   -> read the path from the database, open it locally
```

### Solution

```text
POST /uploads   -> put the object in managed object storage, store the
                   key 91a2.pdf in the database
GET  /uploads   -> read the key, fetch the object from the store
```

State that must survive an instance now lives in a service designed to survive it, and any instance can serve any download. Keeping uploads on the local disk is the common slip: the file exists on exactly one instance, so the second instance returns a missing-file error and the deployment can never be scaled down.

## Example 2 — Draining before the instance disappears

A worker consumes jobs from a queue and holds one in memory while it runs. It ignores the platform's shutdown signal, and a rolling replacement reports failed jobs at every step. Rewrite the worker's shutdown path.

```py
def run():
    while True:
        job = queue.take()
        process(job)
```

### Solution

```py
stopping = False

def request_stop():
    global stopping
    stopping = True          # stop accepting new work

def run():
    while not stopping:
        job = queue.take()
        process(job)
    queue.requeue_in_flight()  # hand back the unfinished job
```

Because the loop now stops taking work and returns the job it holds, the platform's grace period can finish cleanly and no job is lost when the instance is removed. Ignoring the signal is the usual mistake: the process is killed mid-job, and every rolling deployment drops in-flight work that looks like a queue problem rather than a shutdown problem.

Substitute your own service names and store details where these sketches use placeholders.
