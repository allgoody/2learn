## Example 1 — The cluster whose control plane you run

A team runs Kubernetes themselves and owns an upgrade runbook that has nothing to do with their application: patching the API server, draining nodes, upgrading them one at a time and keeping the interface reachable. Declare the cluster whose control plane the provider operates, and say what work remains.

```bash
# the runbook for a control plane we own
upgrade control-plane
drain <node> --one-at-a-time
upgrade <node>
verify api-server reachable
```

### Solution

```hcl
resource "google_container_cluster" "api" {
  name     = "<cluster-name>"
  location = "<region>"

  # the control plane is upgraded, monitored and authenticated by the provider
  node_pool {
    name               = "default"
    initial_node_count = 3
  }
}
```

What remains is the worker capacity and the workloads on it, which is the part that scales with demand and that the team can reason about. The runbook disappears, and the same manifests run locally and against the managed cluster because the API is unchanged. The usual mistake is to keep operating the control plane out of habit: that work produces nothing a user can see, and for a workload with no custom operators a managed runtime one rung further would remove the nodes as well.

## Example 2 — A key mounted into the workload

A workload in the cluster reaches a data service with a long-lived key held as a cluster secret, so anyone who can read the namespace can read the key. Give the workload a platform identity instead, and name what part of the binding would not survive a move to another provider.

```hcl
resource "google_service_account_key" "api" {
  # a long-lived key, mounted into the workload as a cluster secret
}
```

### Solution

```hcl
resource "google_service_account" "api" {
  account_id = "<api-identity>"
}

resource "google_service_account_iam_member" "api_workload" {
  role   = "<workload-identity-role>"
  member = "serviceAccount:<api-identity>"
  # the cluster maps this identity onto the workload: no key is stored
}
```

The workload now obtains a token at runtime and nothing secret lives in the namespace, so the same identity model covers a query job, a container and a function. The manifest that uses it moves to another provider unchanged, but this binding does not: identity, load balancers and storage classes are the seams each provider implements its own way. The usual mistake is to expect the whole platform to be portable because the application is, and to meet the rewrite mid-migration.
