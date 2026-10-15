## Example 1 — Data that outlives the container that wrote it

A job writes a report file next to its code, and the team cannot find the report after a redeploy. The commands below start the job, remove the container and start it again. Change the run so the second start still sees the file the first one wrote.

```bash
docker run --name report-job myjob:1.0
docker rm report-job
docker run --name report-job myjob:1.0
# the report written by the first run is gone
```

### Solution

```bash
docker volume create reports
docker run --name report-job --mount source=reports,target=/data myjob:1.0
docker rm report-job
docker run --name report-job --mount source=reports,target=/data myjob:1.0
# outcome: the second run reads report.csv written by the first
```

The named volume lives outside the writable layer, so removing and recreating the container leaves the report in place. The writable layer is a thin layer on top of the image and is discarded with the container, which is why the original lost the file. The mistake is mounting a directory the job does not write to; the mount must cover the path the job actually uses. Data that several containers need at once belongs in a managed store, with the volume kept for caches and scratch space.

## Example 2 — A name that does not resolve, and a failure that exits zero

A one-off migration container connects to a database and exits. On the default network it cannot resolve the database's name, and when the migration fails it still exits zero, so the surrounding system reports a successful run. Fix both problems.

```bash
docker run --name db mydb:1.0
docker run --rm --env DB_HOST=db mymigrate:1.0
# could not resolve host: db
# container exited 0 - reported as success
```

### Solution

```bash
docker network create app-net
docker run -d --name db --network app-net mydb:1.0
docker run --rm --network app-net --env DB_HOST=db mymigrate:1.0
# migration reaches db by container name on app-net
# on failure: exit 1 -> restart policy or alert fires
```

A user-defined network runs a name service that maps container names to addresses, so `db` resolves; the default network provides no such mapping and reaches containers by address only. The exit code is the one signal the surrounding system reads: zero means success, so a migration that swallowed its error would be indistinguishable from one that worked, and no restart or alert would ever fire. The mistake is diagnosing this as a database fault and never checking which network the containers joined.
