---
title: Networking and VPC
prereqs: ["06-cloud-devops/02-aws/02-storage-and-databases"]
---

## What it is

A virtual private cloud is a private network you define inside AWS: a range of addresses, subdivided into subnets, with rules about what may talk to what. Instances, databases and load balancers are all attached to it. Because the cloud network is software, it is also a security boundary: the difference between a database reachable from the internet and one reachable only from your application is a few rules you control.

## Why it matters

Almost every cloud security incident starts with something being reachable that should not have been. A storage bucket left public, a database port opened "temporarily", a management interface on a public address — these are network decisions, and they are made in a console that makes the permissive option the convenient one. The network is also the place where the cost hides: traffic that crosses an availability zone or leaves the region is charged, and traffic that stays inside the cloud is not.

## Core ideas

### A VPC is an address range, and subnets cut it up

You choose the address range once, and every subnet takes a slice of it. A subnet is confined to one availability zone, which is what makes it the unit of failure isolation: put two instances in two subnets in different zones and one zone's failure does not take the service down. This is why the range is worth planning before resources fill it.

```text
10.0.0.0/16
  subnet a  10.0.1.0/24  (zone a)
  subnet b  10.0.2.0/24  (zone b)
```

### Public and private subnets differ by routing, not by name

A subnet is public if its route table sends unrouted traffic to an internet gateway, and private if it does not. The distinction is a route table entry, not a label, which is why a "private" subnet with the wrong route is quietly public. The usual shape is load balancers in public subnets and everything else in private ones, with outbound access provided by a network address translation gateway.

### Security groups are the actual firewall

A security group is a set of allow rules attached to a resource; nothing is allowed that is not named. Rules reference other security groups as well as addresses, so "the database accepts connections from instances in the application group" can be stated directly instead of by IP range. Default-deny is the model: start with no ingress and add exactly the paths you need.

```text
database group: allow 5432 from app group only
app group:      allow 8080 from load-balancer group only
```

### Reach private resources without exposing them

To reach a private subnet for administration, use a bastion host or a session manager rather than a public address. To let consumers reach your service, use a load balancer that holds the public address and forwards to private targets. To let a private service fetch from the internet, use the translation gateway and its route. Each of these is a pattern for keeping the public surface small.

### Network traffic has a price

Addresses and transfers are billed: traffic between zones, traffic to the internet and public addresses left unassociated all cost. Keeping chatty services in one zone is cheaper and less available; spreading them costs more and fails better. Naming that trade explicitly is what turns a network diagram into a cost and reliability decision.

## Practice

### Draw the smallest usable network

Design a VPC for one web application and its database: two availability zones, one public subnet per zone for the load balancer, private subnets for the application and data, and one route out for updates.

Done when: you can point at the rule that stops the database being reachable from the internet and the rule that lets the application fetch updates.

### Test a network rule

Change a security group so a port that was open is closed, and observe what breaks.

Done when: you can describe the failure you saw and name the smallest rule change that fixes it without reopening the whole range.

## Common mistakes

- **Calling a subnet private because of its name** — a route to an internet gateway makes it public regardless; fix: check the route table, not the label.
- **Opening a database port to an address range "for now"** — the range stays open and the note is forgotten; fix: reference a security group instead of a range.
- **Putting every resource in one availability zone** — a zone failure takes the whole system down; fix: spread tiers across at least two zones.
- **Using public addresses for administration** — the management surface is exposed to the internet; fix: reach private hosts through a bastion or session manager.
- **Ignoring cross-zone and egress charges** — the network line of the bill can rival compute; fix: plan traffic paths deliberately and review what actually crosses a boundary.

## Go deeper

- **Storage and databases** (`06-cloud-devops/02-aws/02-storage-and-databases`) — the resources these rules are protecting.
- **AWS** (`06-cloud-devops/02-aws`) — the catalogue this network is the connective tissue of.
- **Identity and cost** (`06-cloud-devops/02-aws/04-identity-and-cost`) — who is allowed to change these rules, and what the traffic costs.
