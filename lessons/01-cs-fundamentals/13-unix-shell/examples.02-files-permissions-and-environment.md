## Example 1 — A script that will not start

A deployment fails immediately with `Permission denied` on a script that runs fine when passed to the interpreter. The listing below shows the file and its directory. Say which bit is missing, give the fix, and name the change you would not make.

```bash
ls -l deploy.sh
# -rw-r--r-- 1 deploy deploy 218 deploy.sh
./deploy.sh
# bash: ./deploy.sh: Permission denied

ls -ld releases
# drw-rw-r-- 2 deploy deploy 4096 releases
cd releases
# bash: cd: releases: Permission denied
```

### Solution

```bash
chmod +x deploy.sh        # execute for owner, group and others
chmod +x releases         # a directory needs execute to be entered

# not this: chmod 777 deploy.sh
```

Reading the permissions across gives the owner read and write but no execute, so a bare `./deploy.sh` is refused while `bash deploy.sh` works — the interpreter only needs to read the file. The directory shows the same gap in another place: without the execute bit on a directory nothing may pass through it, which is why `cd` fails there. The trap is reaching for world-writable permissions to get past the error, which would grant every account on the machine the right to rewrite the deployment script.

## Example 2 — Works in the terminal, fails in the scheduler

A nightly script runs correctly from an interactive shell and fails under the scheduler with `command not found`. Both environments are printed below. Say which variable differs and why, then give the fix.

```bash
# interactive
echo "$PATH"
# /home/deploy/.local/bin:/usr/local/bin:/usr/bin:/bin
which backup-tool
# /home/deploy/.local/bin/backup-tool

# scheduled job
echo "$PATH"
# /usr/bin:/bin
backup-tool
# backup-tool: command not found
```

### Solution

```bash
# name the program by its full path inside the job
/home/deploy/.local/bin/backup-tool

# or set what the job needs, at the top of the script
PATH="/usr/local/bin:/usr/bin:/bin:/home/deploy/.local/bin"
export PATH
```

A bare command name is looked up by walking the directories in `PATH` in order, and the scheduled job starts with a minimal environment rather than the one your interactive shell built, so the personal directory is simply not on the list. Naming the full path, or setting the path where the job itself will read it, makes the script independent of whichever shell happens to launch it. The trap is adding the entry to an interactive configuration file, which the scheduler never reads, so the fix appears to work when tested by hand and fails again the next night.
