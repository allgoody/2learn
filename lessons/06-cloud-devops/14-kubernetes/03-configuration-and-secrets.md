---
title: Configuration and secrets
prereqs: ["06-cloud-devops/14-kubernetes/02-scheduling-and-scaling"]
---

## What it is

A container image should be identical in every environment, so everything that differs — an endpoint, a feature flag, a database password — is supplied by the cluster at runtime. Kubernetes separates that into configuration, stored as key-value data, and secrets, stored as an encoded object with additional access controls. Both are consumed by a pod as environment values or as mounted files.

## Why it matters

The alternative is an image per environment, which means the artifact tested is not the artifact shipped, and a configuration mistake that only appears in production cannot be reproduced locally. Moving the difference into the cluster also makes it reviewable: configuration lives in version control alongside the manifest, and a change to it is a diff rather than an edit on a running machine. Secrets extend the same idea, with the important correction that encoding is not encryption and access must be controlled deliberately.

## Core ideas

### Configuration is data, and it can be mounted or injected

A configuration object holds plain key-value pairs that a pod reads as environment values or as files in a volume. A mounted file can be updated in place, whereas an environment value is fixed for the lifetime of the container — a distinction that decides whether a change needs a restart.

```text
config map  -> env var (fixed at start)  -> restart to change
            -> mounted file (updated)    -> reload supported by the app
```

### Secrets are a separate kind for a reason

A secret is stored separately so that access to it can be granted on its own and so that its contents are less likely to appear in logs and manifests. The contents are base64-encoded, not encrypted: anyone who can read the object can read the secret. Real protection comes from restricting who may read it and from an encryption key at the storage layer.

### Never commit a secret, and do not bake it into an image

A secret committed to a repository survives in history and must be rotated, not merely deleted. A secret in an image layer is readable by anyone who can pull the image. Both mistakes are common because they are convenient for a moment, and both turn an ordinary configuration change into an incident.

### External secret stores keep one source of truth

When a secret already exists in a cloud provider's secret manager, copying it into a cluster object creates two sources that drift. The pattern is to let the cluster read from the external store — either at deploy time or by an operator that synchronises it — so rotation happens in one place.

### The pod must fail clearly when configuration is missing

A pod that starts with an empty endpoint and fails on its first request is far harder to diagnose than one that refuses to start. Where the platform supports it, validating required configuration at startup and exiting non-zero turns a confusing runtime failure into an obvious scheduling problem.

### Configuration is part of the release, not an afterthought

A deployment's behaviour is the image plus its configuration, so the two should be versioned and rolled out together. A configuration change that requires a restart is a deployment and should be reviewed, recorded and reversible like one.

## Practice

### Move a setting out of the image

Take a service with an endpoint compiled into it. Move the value to a configuration object, consume it as an environment value, and confirm the same image can point at two different endpoints.

Done when: one image digest runs against two configurations and only the endpoint differs.

### Prove a secret is not in the image

Take an existing image and search its history and filesystem for a credential you know it uses.

Done when: the credential is absent from the image and present only in the cluster's secret object.

## Common mistakes

- **Committing a secret to the repository** — it remains in history and must be treated as leaked; fix: rotate it and load it from a secret store.
- **Building a secret into the image** — anyone who can pull the image has it; fix: inject it at runtime.
- **Treating base64 encoding as encryption** — the value is readable by anyone with access to the object; fix: restrict access and enable encryption at rest.
- **Copying secrets from an external store into the cluster** — two sources drift and rotation is missed; fix: read from the store directly or synchronise deliberately.
- **Exposing a configuration change as a silent behaviour change** — no diff, no review and no rollback; fix: version configuration with the deployment.

## Go deeper

- **Scheduling and scaling** (`06-cloud-devops/14-kubernetes/02-scheduling-and-scaling`) — the resource declarations a pod needs before configuration is even considered.
- **Kubernetes** (`06-cloud-devops/14-kubernetes`) — the platform these objects are part of.
- **Cloud Security & IAM** (`06-cloud-devops/12-cloud-security-iam`) — the wider discipline of giving an identity exactly the access it needs.
