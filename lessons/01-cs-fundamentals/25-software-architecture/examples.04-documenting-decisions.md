## Example 1 — A document that describes instead of decides

A team keeps an architecture page in the wiki, last edited 2 years ago. It names 3 services, and the system has 5; the page has never mentioned the queue that was added or the cache that was removed. A newcomer asks why checkout calls the inventory service synchronously, and nobody can answer. Replace the page with what actually helps.

```text
docs/architecture.md   (last edited 2 years ago, 1 200 words)
  "the system has three services and a shared cache"

reality today: 5 services, the cache removed, a queue added
statements that no longer match: 3 (the service count, the cache, the queue)
question the newcomer asked: "why sync, not a cached copy?"
```

### Solution

```text
docs/decisions/0007-sync-order-lookups.md           210 words, about half a page
context:       pricing needs the customer tier at checkout time
options:       sync call (simple, adds a failure mode); cached copy (fast, may be stale)
decision:      sync call with a 200 ms timeout, 200 ms being 200 milliseconds, and a fallback tier
consequences:  checkout falls back to a default tier; a cache can be added later

answers the newcomer's question in 1 document, and none of its statements expire
```

A description of the current system is out of date the moment it is drawn, and it is not what readers are missing — they can read the code. What cannot be reconstructed is the weighing of alternatives: why this call and not a cached copy, why this boundary and not a simpler one. The old page ran to 1 200 words and answered 0 questions of this kind, while the 210-word record answers the newcomer's question and stays useful for years precisely because it never claims to describe the system as it is now. What usually goes wrong is writing a new description to replace the old one: it is corrected once, drifts again, and the next newcomer asks the same question in another 2 years.

## Example 2 — A record quietly edited to match reality

A decision is reversed, and the original record is updated in place so the file is not misleading. Six months later somebody proposes the same change again, unaware that it had already been tried and abandoned. Explain what the edit destroyed, then show what should have been written instead.

```text
docs/decisions/0003-use-redis-for-sessions.md
  original text: "decision: sessions in Redis"          written 2 years ago
  edited text:   "decision: sessions in the database"   file rewritten in place
  documents now holding the reason Redis was chosen: 0
  documents now holding the reason it was left:      0
  proposal to return to Redis raised again: 1, about 6 months later
```

### Solution

```text
0003-use-redis-for-sessions.md              unchanged, 1 document
0011-sessions-in-the-database.md            supersedes 0003, so 2 in total
  context:       Redis added a dependency the team could not operate overnight
  options:       a managed Redis cluster; sessions in the primary database
  decision:      sessions in the primary database
  consequences:  more load on the primary; no cache invalidation to reason about

the 6-month proposal is answered by reading 0011: 1 document, 0 meetings
```

Editing an old record to match today's reality destroys the only evidence of why the earlier choice was made, which is usually the part that matters. Writing a new record that names what it supersedes keeps both decisions and the reason for the change, so the 2 documents together explain the system's shape instead of the 0 an edit leaves behind. The rule is cheap and absolute: never rewrite a record, even when it now reads as wrong. What usually goes wrong is a well-meant tidy-up — the editor believes a stale record misleads readers, and removes the evidence the next reader needed most.
