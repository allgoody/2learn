## Example 1 — A session store built on object storage

A web application keeps each user's session as an object, rewritten after every request. Writes are small, keyed and frequent, and two requests in flight can overwrite each other. The declaration below is what is deployed. Replace it with storage whose access pattern matches small keyed updates, and say what happens to readers during a failure.

```hcl
resource "aws_s3_bucket" "sessions" {
  bucket = "<session-store-name>"
  # every session change rewrites the whole object
}
```

### Solution

```hcl
resource "aws_db_instance" "sessions" {
  identifier     = "<session-store-id>"
  engine         = "<engine>"
  instance_class = "db.t3.small" # illustrative
  multi_az       = true
}
```

Sessions are random small reads and writes keyed by user, which is the pattern a database is built for; object storage is a namespace of whole blobs, so renaming or editing one rewrites all of it and there is no in-place update to serialise two writers on. The standby answers reads during a failure, which is a separate promise from the durability of the bytes. The usual mistake is to treat object storage as a filesystem because it is cheap and already there.

## Example 2 — A backup nobody has restored

The nightly job copies the database dump to an object store with a thirty-day expiry, and nobody has ever read one back; the restore procedure exists only as a document. Change the arrangement so the retained copy is known to be readable, and say what retention costs once the copy is read often.

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  rule {
    id     = "expire-old-backups"
    status = "Enabled"
    expiration { days = 30 }
  }
  # versioning is off: an overwrite replaces the only copy
}
```

### Solution

```bash
# monthly drill, run against the retained copy rather than the live dump
copy <retained-object> <drill-path>
list <drill-path>          # the bytes, the permissions and the key must all work
restore <drill-database> --source <drill-path>
# keep two versions with a longer expiry, then read the restored rows back
```

A backup that has never been restored is a hope: encryption keys, permissions and the procedure all have to work at the moment they are needed, and the drill is what proves they do. Retention is cheap per gigabyte but retrieval and transfer are not, so a copy that is read every month belongs in a class that expects it. The usual mistake is to assume a backup exists because the service took one.
