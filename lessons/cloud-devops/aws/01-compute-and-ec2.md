---
title: Compute and EC2
prereqs: ["cloud-devops/aws"]
---

## What it is

EC2 is a virtual machine you rent by the second: you pick an instance family, an operating system image and a size, and AWS boots it for you. Around it sits a ladder of managed compute — autoscaling groups, container services, and functions — each one taking over a decision you would otherwise make yourself. Compute is where an AWS bill usually starts, so the first useful skill is not "start a server" but "choose the smallest thing that does the job".

## Why it matters

The instinct carried over from physical hardware is to size for the worst case and leave the machine running. In the cloud both halves of that instinct cost money: an oversized instance idles at its full price, and a stopped-then-forgotten instance keeps paying for its disk. The managed ladder exists because most workloads do not need a general-purpose server at all. Moving up the ladder removes patching, capacity planning and some failure handling, at the price of control and of some hard limits. Knowing where you sit on that ladder is the difference between a bill that tracks load and one that tracks your team's headcount.

## Core ideas

### An instance is a size, an image and a network position

Launching one means choosing how much CPU and memory (the instance family and size), what software it starts with (the Amazon Machine Image) and where it lives on the network. The machine is disposable by design: you can terminate it and create an identical one from the same image. That is only true if nothing important lives on its local disk.

```text
image (software)  +  instance type (hardware)  +  subnet (network)  ->  one instance
```

### Managed compute moves you up a ladder

Above raw instances come autoscaling groups, which replace failed machines and add more under load; orchestrators, which run containers without you owning hosts; and functions, which run only while handling a request. Each rung removes operational work and adds constraints. Choose the lowest rung that meets the requirement, because every rung above costs either control or predictability.

```text
ec2  ->  autoscaling group  ->  container service  ->  function
more ops ->  less ops
more control ->  less control
```

### Cost follows the shape of the workload

A steady workload is cheapest on a reserved or committed plan; a spiky one should scale to zero or near it; a batch job should not be a permanently running server. The instance's price also depends on its family and region, so the same work can cost several times more depending on where and how it runs. Right-sizing is an ongoing activity, not a one-off decision at launch.

### The image is the contract

Because the machine is disposable, everything it needs must be reproducible from its image or from a startup script. A server that has been patched by hand for six months is no longer reproducible, and its replacement will behave differently. Keeping the image definition in version control is what makes the disposability real.

### Limits are part of the interface

Every managed service has quotas — how many instances, how large, how long a function may run — and those quotas are part of the design. A workload that needs a longer-running function or a bigger instance than the service allows belongs on a lower rung, and discovering that after building on the wrong rung is expensive.

## Practice

### Size one instance from measurements

Take a service you know and its observed CPU and memory use at peak. Choose an instance family and size that fits that peak with modest headroom, and write down why you rejected the next size up.

Done when: you can state the peak utilisation you expect and the monthly cost difference between your choice and the next size up.

### Trace a request through the managed ladder

Pick a small HTTP endpoint and describe what it would look like as an instance, as a container behind a load balancer, and as a function. For each, list what you no longer operate and what you can no longer do.

Done when: you can name one requirement that rules out the function version, or state that none does.

## Common mistakes

- **Sizing for the worst case and leaving it running** — you pay for capacity that is idle most of the month; fix: size to measured peak and let autoscaling handle the spikes.
- **Keeping important state on the instance disk** — terminating the machine destroys it; fix: put state in a managed store and treat the instance as replaceable.
- **Patching by hand instead of rebuilding the image** — replacements stop matching the machines you tested; fix: define the image in version control and deploy from it.
- **Using a managed service for a workload it does not fit** — the quota or timeout appears late and forces a rebuild; fix: check the service's limits before committing to it.
- **Ignoring the region and instance family in the price** — the same workload can cost several times more; fix: compare the price deliberately rather than by habit.

## Go deeper

- **AWS** (`cloud-devops/aws`) — the account, the catalogue and the vocabulary this child assumes.
- **Storage and databases** (`cloud-devops/aws/02-storage-and-databases`) — where the state you just moved off the instance actually goes.
