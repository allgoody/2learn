## Example 1 — One variable in, one output out

An environment needs a network and one machine, and the region differs between environments. Write the declaration so the region is an input, the machine's address is an output, and the machine attaches to a subnet that references the network. Then read what changes when the region value changes.

```hcl
resource "network" "main" {
  cidr = "10.0.0.0/16"
}

resource "instance" "app" {
  network = network.main.id
  region  = "eu-west-1"
}
```

### Solution

```hcl
variable "region" {
  type    = string
  default = "eu-west-1"
}

resource "network" "main" {
  cidr   = "10.0.0.0/16"
  region = var.region
}

resource "subnet" "app" {
  network = network.main.id
}

resource "instance" "app" {
  subnet = subnet.app.id
  region = var.region
}

output "address" {
  value = instance.app.address
}
```

```text
Plan: 1 to add, 0 to change, 2 to destroy

  - instance.app
  - network.main

region sits in the network's immutable settings, and the instance
references the subnet on that network, so both are replaced. Stop here.
```

The variable is the one value that genuinely differs between environments and the output is the address somebody needs after an apply, which keeps the interface to two lines. Referencing `subnet.app.id` rather than copying an identifier means the dependency is declared, not assumed. The plan is the contract: `network.main` is the resource that changes, and an unexpected destroy is the moment to stop rather than a detail to approve. The mistake is applying this plan without reading it because the values looked reasonable.

## Example 2 — A rename that the plan treats as replacement

A resource block is renamed so the local name matches the service, and nothing else changes. The plan after the edit is below. Say what will happen and how to rename without recreating the machine.

```hcl
resource "instance" "api" {   # was resource "instance" "app"
  subnet = subnet.app.id
}
```

### Solution

```text
Plan: 1 to add, 0 to change, 1 to destroy

  + instance.api
  - instance.app

$ terraform state mv 'instance.app' 'instance.api'
$ terraform plan
No changes. Infrastructure is up to date.
```

A resource's address is its type and local name, and state maps that address to the real object; a new name is a new address, so the old machine is proposed for destruction and a fresh one created. Moving the existing record to the new address keeps the machine and makes the next plan empty. The mistake is approving the plan because the settings look unchanged — once the address no longer matches, the settings are irrelevant and the running machine is replaced.
