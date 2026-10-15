## Example 1 — The `.env` that is already in the history

A history search turns up `config/.env` committed eight months ago, before the repository was given an ignore rule. Deleting the file today does nothing. Producing what was committed is the easy half. Show what belongs in the repository instead, and state plainly what still has to happen to the values.

```text
config/.env (committed at 3f2a1c9, still in history and every clone)
  DATABASE_URL=<value>
  STRIPE_KEY=<value>
```

### Solution

```text
config/.env.example            committed, safe to read
  DATABASE_URL=
  STRIPE_KEY=
.gitignore                     committed
  .env
Next steps, in order:
  1. Rotate every value from that commit - issue new, deploy, revoke old
  2. Purge history only if required, and have every collaborator re-clone
  3. Nothing else: the values are public forever; treat them as such
```

The template names the settings so a new developer knows what to provide, while the real values are injected at runtime by the platform's secret store. An ignore entry is a guard rail against the accidental `git add .`, not a control. The usual mistake is to call the job done once the file is deleted and ignored — the value lives in the history, in every fork and in every mirror's cache, so rotation is nearly always the cheapest of the three options.

## Example 2 — Rotating one exposed key end to end

You have a list of credentials that were exposed, and the first one is still valid because the team decided to "deal with it later". Rotate that one now: replace the value, deploy it, prove the old one is dead, and give the replacement an owner and a lifetime.

```text
Finding: the value committed at 3f2a1c9 is the key currently used in production
Owner:   the team that owns the payment service
```

### Solution

```text
1. Issue a replacement in the provider console and note its owner and date
2. Store it in the platform secret store; deploy so the service reads it there
3. Verify: a request using the new value succeeds
4. Verify: a request using the old value returns an authorisation error
5. Revoke the old value at the provider; record the rotation date and the owner
```

Rotating proves the exposure is closed, and the check that the old value returns an authorisation error is the only step that actually confirms it. Keeping the new value in the secret store rather than a file stops the next clone carrying it. The step teams skip is revocation: without it the old value stays valid and the rotation has changed nothing. Store the owner and lifetime beside the secret so the next rotation is scheduled rather than discovered.
