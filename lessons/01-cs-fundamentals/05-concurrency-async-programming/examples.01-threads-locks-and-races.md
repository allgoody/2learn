## Example 1 — A total that is wrong a few times in a million

Four threads each increment a shared counter 100 000 times, so the total owed is 4 * 100 000 = 400 000. A counter starts at 0, and each increment reads the counter, adds 1 in the thread's own register and writes the result back. The trace below shows two of those 400 000 increments interleaving. Say what total the program prints, and why a lock around the increment makes it exact.

```text
counter = 0
thread A: read counter -> 41      the counter stands at 41 when the two reads happen
thread B: read counter -> 41      B reads before A writes
thread A: write 42                A's increment lands
thread B: write 42                B's increment lands, and A's is overwritten

expected total: 4 * 100 000 = 400 000
observed total: 399 999 on that run, because 2 increments counted once
                a different run loses a different number of them, so the total moves
```

### Solution

```text
the read and the write are two separate steps. When they interleave, both
threads read the same value and one of the two writes is overwritten.

lock(mutex)
    counter = counter + 1     # read, add and write are now one step
unlock(mutex)

4 threads * 100 000 increments = 400 000 lock/unlock pairs, and each pair runs its
read, its add and its write while no other thread is inside the section, so the
counter passes through 1, 2, 3 ... and ends at exactly 400 000
```

An unsynchronised increment is a read followed by a write, and nothing forces one thread's pair to happen before another's, so 2 increments can collapse into 1 and the total lands short. A mutual-exclusion lock makes the read, the add and the write appear as a single step to every other thread, and it makes each thread's write visible to the next holder, so 400 000 increments end at 400 000 however the threads are scheduled. The trap is testing it: with 10 increments per thread instead of 100 000, the four threads usually finish before any pair overlaps, so the fault is caught only by a load worth building deliberately.

## Example 2 — Two threads each waiting for the other

Two threads move money between the same two accounts, each taking the account locks in whichever order it happens to need them. The accounts are numbered 1 and 2, and a transfer locks the account it takes money from and then the account it pays into. The trace shows a run that hangs. Say what condition causes the hang, and give the smallest change that removes it permanently.

```text
thread A: transfer(2, 1) -> lock account 2 ... then wants account 1
thread B: transfer(1, 2) -> lock account 1 ... then wants account 2

A holds account 2 and waits for account 1
B holds account 1 and waits for account 2   <- neither can move
```

### Solution

```text
a cycle in the wait graph: A waits for a lock B holds, and B waits for one A holds.
Four conditions hold at once — mutual exclusion, both threads holding one lock while
waiting for another, no way to take a lock back, and that cycle.

fix: number the accounts and take the two locks in that order, every time:
     thread A: transfer(2, 1) -> lock(min(2, 1)) = lock 1, then lock 2
     thread B: transfer(1, 2) -> lock(min(1, 2)) = lock 1, then lock 2
     whichever thread arrives second waits once for lock 1, then holds both and
     completes; a thread holding lock 1 only ever waits for lock 2, so no cycle forms
```

The hang is caused not by either lock alone but by the two paths taking them in different orders. One global order breaks the cycle, because no thread can hold the higher-numbered lock while waiting for the lower one; a try-lock that gives up and retries is the other standard answer. The trap is that the deadlock appears only when both paths run at the same instant, so a test that performs one transfer at a time never reproduces it.
