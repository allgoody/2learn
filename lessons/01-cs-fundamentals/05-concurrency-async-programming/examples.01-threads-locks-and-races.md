## Example 1 — A total that is wrong a few times in a million

Four threads each increment a shared counter a hundred thousand times. The trace shows two of those increments interleaving. Say what total the program prints, and why a lock around the increment makes it exact.

```text
counter = 0
thread A: read counter -> 41
thread B: read counter -> 41
thread A: write 42
thread B: write 42        <- A's increment is lost

expected total: 400 000
observed total: varies between runs, always short of 400 000
```

### Solution

```text
the read and the write are two separate steps. When they interleave, both
threads read the same value and one write overwrites the other.

lock(mutex)
    counter = counter + 1     # read, add and write are now one step
unlock(mutex)
```

An unsynchronised increment is a read followed by a write, and nothing forces one thread's pair to happen before another's, so two increments can collapse into one. A mutual-exclusion lock makes the sequence appear as a single step to every other thread, and it makes each thread's write visible to the next holder. The trap is testing it: a small count usually prints the right answer, and the fault appears only under load.

## Example 2 — Two threads each waiting for the other

Two threads move money between the same two accounts, each taking the account locks in whichever order it happens to need them. The trace shows a run that hangs. Say what condition causes the hang, and give the smallest change that removes it permanently.

```text
thread A: lock(account_1) ... then wants account_2
thread B: lock(account_2) ... then wants account_1

A holds account_1 and waits for account_2
B holds account_2 and waits for account_1   <- neither can move
```

### Solution

```text
a cycle in the wait graph: A waits for a lock B holds, and B waits for
one A holds.

fix: define one global order and take both locks in it, always.
     thread A: lock(min(from, to)) then lock(max(from, to))
     thread B: the same order — one thread now waits, then completes
```

The hang is caused not by either lock alone but by the two paths taking them in different orders. One global order breaks the cycle, because no thread can hold the higher-numbered lock while waiting for the lower one; a try-lock that gives up and retries is the other standard answer. The trap is that the deadlock appears only when both paths run at the same instant, so a test that performs one transfer at a time never reproduces it.
