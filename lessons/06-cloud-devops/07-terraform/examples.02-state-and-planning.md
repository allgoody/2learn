## Example 1 — Two applies against one state file

State is a file on one engineer's machine, and a second engineer runs an apply at the same time. Both plans read the same state and both proceed. Explain what the missing lock allows, and where the state must live before either apply runs.

```text
engineer A: apply -> reads local state, plan: 2 to add
engineer B: apply -> reads local state, plan: 2 to add
both apply -> 4 resources exist, 2 of them duplicates
```

### Solution

```hcl
backend "remote" {
  # your own backend settings; substitute the values your team uses
}
```

```text
state now lives behind the backend, encrypted and access-controlled
A acquires the lock; B is refused until the lock is released
one apply proceeds; the other retries against fresh state
```

Remote state with locking is what stops two applies interleaving, which is the only way the duplicate pair gets created. Locking is not optional once more than one person applies. The state also holds the values the provider API returned — connection strings among them — in plain text, so it must never be committed and access to it must be restricted. The mistake is treating the local file as convenient rather than as a shared resource with a secret inside it.

## Example 2 — Adopting a resource that already exists

A database was created by hand before the configuration existed. A declaration has now been written to match its real settings, but the plan wants to create a second copy. Make the plan empty without recreating anything.

```text
config:  database "main" { size = "small" }   # hand-created, same settings
reality: one database, id db-7f31
plan:    + database.main   (1 to add)
```

### Solution

```text
$ terraform import database.main db-7f31
Imported database.main

$ terraform plan
Plan: 0 to add, 0 to change, 0 to destroy.

  database.main matches reality: id, size and retention all equal.
```

The state entry records which real object a declaration refers to, so writing that mapping stops the plan proposing a duplicate. Import only works because the declaration was written to match the real settings; importing first leaves the next plan full of differences. The mistake is importing an environment in bulk — adopt one resource, confirm an empty plan, then move to the next. The database's credentials are now in the state in plain text, so it belongs in a remote backend with encryption and access control, never in the repository.
