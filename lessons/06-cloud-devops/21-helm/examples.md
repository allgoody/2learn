## Example 1 — A value that appears to be ignored

A release is promoted to production by passing the environment's values file and then the chart's own values file. The deployment comes up with one replica although production asks for four. The files and the command are below. Correct the command and show the evidence that settles the merge.

```yaml
# values.yaml            — the chart's defaults, applied first
replicaCount: 1
# values.production.yaml — the environment's overrides
replicaCount: 4
# command used: install ./chart -f values.production.yaml -f values.yaml
```

### Solution

```bash
$ helm template ./chart -f values.production.yaml
#   replicas: 4
# the chart's values.yaml is already the bottom layer, so passing it again overrides production;
# among -f files the last one wins, and command-line overrides beat them all
```

The chart is the parameterised set of manifests and the environment file is the record of what differs, so the merge has one intended winner and the command reversed it. Rendering without a cluster prints the merged result, which is the only reliable way to settle precedence. The usual mistake is to adjust the templates or add another override instead of printing what the merge actually produced.

## Example 2 — An upgrade that stopped halfway

An upgrade ran a database migration hook and then failed when the new version would not start. The next upgrade behaves unexpectedly, and someone suggests installing the chart again under a different release name. Read the history and recover without losing the record.

```text
$ helm history shop
REVISION  STATUS    DESCRIPTION
6         deployed  Upgrade complete
7         failed    Upgrade complete

$ helm upgrade shop ./chart
Error: the release is in a failed state
```

### Solution

```text
$ helm rollback shop 6
Rollback to revision 6 complete

$ helm upgrade shop ./chart -f values.production.yaml
Upgrade complete

$ helm history shop
6   superseded
7   failed
8   deployed
```

Hooks order the migration ahead of the new version, and an upgrade that fails between them leaves a release needing deliberate recovery. Rolling back re-submits the previous revision's rendered manifests, so the cluster returns to the state the history describes, and the record keeps both the failure and the recovery. Installing under a new name would hide the failed release and leave its objects in place. The usual mistake is to run the next command over a failed release and then debug the confusing result.
