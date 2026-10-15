## Example 1 — A document that describes instead of decides

A team keeps an architecture page in the wiki. It is two years old and wrong. A newcomer asks why the checkout calls an inventory service synchronously, and nobody can answer. Replace the page with what actually helps.

```text
docs/architecture.md   (last edited 2 years ago)
  "the system has three services and a shared cache"

reality today: five services, the cache removed, a queue added
question the newcomer asked: "why sync, not a cached copy?"
```

### Solution

```text
docs/decisions/0007-sync-order-lookups.md
context:       pricing needs the customer tier at checkout time
options:       sync call (simple, adds a failure mode); cached copy (fast, may be stale)
decision:      sync call with a 200ms timeout and a fallback tier
consequences:  checkout fails open to a default tier; a cache can be added later
```

A description of the current system is out of date the moment it is drawn, and it is not what readers are missing — they can read the code. What cannot be reconstructed is the weighing of alternatives: why this call and not a cached copy, why this boundary and not a simpler one. Recording one decision, its rejected options and what it costs answers the newcomer's question in a paragraph, and it stays useful for years precisely because it never claims to describe the system as it is now.

## Example 2 — A record quietly edited to match reality

A decision is reversed, and the original record is updated so the file is not misleading. Six months later the same change is proposed again. Explain what the edit destroyed, then show what should have been written instead.

```text
docs/decisions/0003-use-redis-for-sessions.md
  original text: "decision: sessions in Redis"
  edited text:   "decision: sessions in the database"   (file rewritten in place)
  # the reasoning for Redis, and for leaving it, is gone
```

### Solution

```text
0003-use-redis-for-sessions.md              unchanged
0011-sessions-in-the-database.md            supersedes 0003
  context:       Redis added a dependency the team could not operate overnight
  options:       managed Redis cluster; sessions in the primary database
  decision:      sessions in the primary database
  consequences:  more load on the primary; no cache invalidation to reason about
```

Editing an old record to match today's reality destroys the only evidence of why the earlier choice was made, which is usually the part that matters. Writing a new record that names what superseded it keeps both decisions and the reason for the change, so the history of decisions becomes the explanation for the system's shape. The rule is cheap and absolute: never rewrite a record, even when it now reads as wrong.
