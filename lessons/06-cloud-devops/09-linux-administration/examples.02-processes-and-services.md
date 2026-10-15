## Example 1 — A process that did not come back after a reboot

A script started by hand in a login shell ran for weeks, survived the operator logging out, and then was simply absent after the host rebooted. Explain both behaviours from the process tree, and declare the command as a service so the third one does not happen.

```text
started by hand:  login shell -> ./sync-agent.sh    (parented by the shell)
after logout:     the shell is gone, the process was adopted and kept running
after reboot:     nothing starts it, so it is absent with no error anywhere
```

### Solution

```text
service sync-agent
  command: /usr/local/bin/sync-agent.sh
  user:    sync-agent
  restart: on failure
  output:  the system log, under the unit's name
```

Declaring the long-running command under the supervisor makes it start at boot, restart when it exits, and write its output where the next investigator will look. The tree explains the first behaviour: it only survived the logout because its parent died and it was reparented, not because anything was supervising it. The usual mistake is to add a line to a personal startup file and call that supervised — it still dies with the session.

## Example 2 — Stopping a worker without losing the batch

A worker is halfway through a batch of records when you need to stop it. The two signals below are what the operator can send. State what each does to the work in flight and how the log shows which one was used.

```text
worker log: batch started, 40 records
operator:   sends the gentle termination signal
worker log: shutdown requested; finishing batch of 40
worker log: batch committed; exiting with code 0
```

### Solution

```text
gentle signal:   the worker stops accepting new work, finishes the batch, exits 0
forceful signal: the process is destroyed at once; the 40 in-flight records are lost
evidence:        the last line names the completed batch and a zero exit code
```

The gentle signal asks for the same drain that any orchestrated shutdown asks for: stop taking new work, finish what is in flight, then exit. The zero exit code and the final log line record that the batch reached storage, which is what makes the stop verifiable. The usual mistake is to make the forceful signal the default because it returns the prompt faster, so the batch is dropped with nothing in the log to say so.
