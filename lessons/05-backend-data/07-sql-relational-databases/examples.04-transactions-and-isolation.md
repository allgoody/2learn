## Example 1 — The counter that lost an update

Two sessions read the same counter, add one, and write it back; the final value should be two. The transcript is from two terminals. Write the statement that makes the change atomic, and name two other ways to prevent it.

```text
session A                          session B
begin;                             begin;
select value from counters
 where id = 1;                     -> 10
                                   (session B reads the same 10)
update counters set value = 11;
                                   update counters set value = 11;
commit;                            commit;   -> final value 11
```

### Solution

```sql
update counters set value = value + 1 where id = 1;

-- one statement reads and writes, so the engine makes it atomic
```

The read and the write are one operation, so no other session can compute from the old value in between; where several statements really are needed, the same protection comes from locking the row, or from detecting the conflict at commit and retrying. Both sessions are correct alone, which is why a single-user test never shows this. What usually goes wrong is computing the new value in application code.

## Example 2 — Two transactions that take their locks in opposite orders

Two transfers between the same two accounts run at once. Each holds what the other needs, so the engine detects the cycle and aborts one. Rewrite them with a single agreed order, and say what the caller must still handle.

```text
session A: update accounts set balance = balance - 10 where id = 1;
           update accounts set balance = balance + 10 where id = 2;

session B: update accounts set balance = balance - 5  where id = 2;
           update accounts set balance = balance + 5  where id = 1;
```

### Solution

```sql
-- rule for every transfer: touch the lower account id first
begin;
update accounts set balance = balance - 10 where id = 1;
update accounts set balance = balance + 10 where id = 2;
commit;

begin;
update accounts set balance = balance + 5 where id = 1;
update accounts set balance = balance - 5 where id = 2;
commit;
```

With one agreed order the second transaction waits for the first instead of holding what the first needs, so no cycle can form. The caller must still expect an occasional abort for other reasons and retry it a bounded number of times, treating it as normal rather than as an error page. What usually goes wrong is retrying without a limit, or ordering the rows in only one code path that moves money.
