## Example 1 — Sorting the requests into additive and breaking

Three change requests arrive for the same library in one week. Before anyone touches code, each one has to be named: does it ship quietly, or does it need a version and a migration? Produce the classification and what it commits the owner to.

```text
1  add variant="quiet" to Button; nothing existing changes
2  rename the Badge prop "tone" to "variant"
3  fix the Card header border on the error state
```

### Solution

```text
1  additive   minor    ship without review
2  breaking   major    number it, write the migration, open a deprecation window
3  fix        patch    correct rendering of a documented state

Owner: system team. Breaking changes answered within five working days.
```

The new variant and the rendering fix can go out immediately, because nothing a consumer wrote stops working. The rename cannot: every call site passing `tone` breaks on upgrade, so it needs the next major number, a migration note and a window in which both spellings resolve. The usual failure is shipping the rename as a minor because it is small in the diff; size is not the test, whether existing calls break is.

## Example 2 — A deprecation with a date, not a wish

A token is being replaced. Six screens still use it, and the team has decided to leave the old name working while they migrate. Announce the deprecation and set the deadline. Produce the note consumers will read.

```text
Decision
  token grey-200 becomes surface-muted
  consumers: six screens
  owner: system team
  removal: end of the current quarter
```

### Solution

```text
Deprecated   grey-200
Replaced by  surface-muted
Removal      end of the current quarter; the old token stops resolving then
Migration    swap var(--grey-200) for var(--surface-muted)
             both names resolve until the removal date

Consumers must migrate before the removal date. The migration is
listed as a task on each consuming team, not as a suggestion.
```

Giving the replacement, the migration and a fixed removal date means a consumer knows exactly what to do and by when. Leaving it undated is the common mistake: the old token then resolves forever and the system quietly carries two names for one colour. Automate the check that fails when the old token is gone from the theme, but keep the decision to remove it a human one.
