---
title: Secrets Management
type: skill
topic: security
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Secrets management is keeping API keys, database passwords, signing keys and tokens out of the repository, out of build artefacts and logs, and giving them a defined lifetime so that exposure is survivable. The artefact is a documented source of truth for secrets — a secret store or an environment configuration — plus a rotation procedure.

## Why it matters

A key in a repository is a key published to everyone who ever clones it. The mistake is extremely common because it is invisible locally: a `.env` file committed once, a connection string pasted into a config to make tests pass, a token in a CI log. The specific trap is that removing the file does not fix it — the value stays in the git history, in every clone and fork, and in the caches of every mirror. That is the point at which most readers have already failed, so the work is detection and rotation rather than prevention alone.

## Core ideas

### Keep secrets out of the repository by default

Load them from the environment or a secret store at runtime, and commit only a template listing the names with empty or placeholder values.

```text
Committed:      .env.example        DATABASE_URL=
                                     STRIPE_KEY=
Ignored:        .env                (in .gitignore, never committed)
Runtime:        the platform's secret store injects the real values
```

A `.gitignore` entry is a guard rail, not a control: it stops the accidental `git add .`, and nothing else.

### Removing the file does not remove the secret

The value lives in history. Any of three things must happen: rotate the credential so the exposed value is worthless, purge history on every clone, or accept the exposure knowingly. Rotation is nearly always the cheapest of the three.

```text
1. Rotate: issue a new key, deploy it, revoke the old one
2. Purge (if required): rewrite history AND have every collaborator re-clone
3. Neither: the key is public forever; treat it as such
```

### Give every secret a lifetime and an owner

Static, never-rotated credentials are the ones that turn up in old backups. Prefer short-lived tokens from the platform's identity service where available, and rotate the rest on a schedule.

### Detect before it is found for you

Enable provider-side scanning of public repositories and a pre-commit check for high-entropy strings. A secret pushed at 10:00 is usually scraped within minutes.

### Keep secrets out of logs and error reports

The commonest leak after the repository is a stack trace that includes the connection string, or a debug dump of the environment. Redact configuration in error output.

## Practice

### Search the history, not just the working tree

Look through the full git history for candidate secret patterns and for the names of your secret variables.

Done when: you have a list of every credential that has ever been committed, with a decision — rotate, purge, or accept — against each.

### Rotate one exposed credential end to end

Take one key on your list, issue a replacement, deploy it, verify the old one stops working, and revoke it.

Done when: the old value returns an authorisation error, and the new one is loaded from the secret store rather than a file.

## Common mistakes

- **Committing a `.env` file** — the key is published to everyone with a clone; fix: commit a template only, and ignore the real file.
- **Deleting the file and calling it fixed** — the value remains in history and in every clone; fix: rotate the credential.
- **One credential shared by every environment** — a staging leak exposes production; fix: separate credentials per environment.
- **No rotation** — a key is valid for years and discovered in a backup; fix: short lifetimes where possible, scheduled rotation otherwise.
- **Secrets echoed in logs or errors** — the leak happens after all the other controls passed; fix: redact configuration in log and error output.

## Go deeper

- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — the flaw classes that turn a leaked credential into an intrusion.
- **Dependency Scanning (SCA)** (`security/dependency-scanning-sca`) — the other way secrets and vulnerable code enter a project.
- **HTTPS & TLS** (`security/https-tls`) — a credential sent over a broken channel is exposed before it is even used.
- **Package Management (npm)** (`frontend/package-management-npm`) — where tokens for publishing packages live, and how they leak.
