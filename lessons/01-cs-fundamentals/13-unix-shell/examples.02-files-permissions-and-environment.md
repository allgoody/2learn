## Example 1 — A script that will not start

A deployment fails immediately with `Permission denied` on a script that runs fine when passed to the interpreter, and the releases directory it writes into refuses to be entered. The listing below shows both. Say which bits are missing, give the fix, and name the change you would not make.

```bash
ls -l deploy.sh
# -rw-r--r-- 1 deploy deploy 218 deploy.sh
#  rw- r-- r--  -> 6 4 4, so mode 644: no execute bit for owner, group or others

./deploy.sh
# bash: ./deploy.sh: Permission denied

bash deploy.sh
# deploy: starting            the interpreter reads the script, so it needs read alone and works

ls -ld releases
# drw-rw-r-- 2 deploy deploy 4096 releases
#  d          the entry is a directory
#  rw- rw- r-- -> 6 6 4, so mode 664: again no execute bit anywhere

cd releases
# bash: cd: releases: Permission denied
```

### Solution

```bash
chmod +x deploy.sh      # adds 1 to each triple: 644 + 111 = 755
chmod +x releases       # 664 + 111 = 775, giving each class the pass-through bit

ls -ld deploy.sh releases
# -rwxr-xr-x 1 deploy deploy 218 deploy.sh
# drwxr--r-x 2 deploy deploy 4096 releases

# not this:
chmod 777 deploy.sh     # 777 is rwx for all 3 classes: every account on the machine may rewrite the deployment script
```

Reading the mode across gives the owner read and write but no execute, so a bare `./deploy.sh` is refused while `bash deploy.sh` succeeds because the interpreter only has to read the file — the same script, the same bytes, 1 bit apart. The directory shows the gap in another place: a directory's execute bit means "may pass through", so read alone lets the names be listed but not the contents entered, which is why `cd releases` fails there. The trap is reaching for 777 to get past the refusal, which solves the symptom and grants every account the right to rewrite the file.

## Example 2 — Works in the terminal, fails in the scheduler

A nightly script runs correctly from an interactive shell and fails under the scheduler with `command not found`. The 2 environments are printed below. Say which variable differs and why, then give the fix.

```bash
# interactive shell
echo "$PATH"
# /home/deploy/.local/bin:/usr/local/bin:/usr/bin:/bin
# 4 directories, split on the colons, and searched left to right

type -a backup-tool
# backup-tool is /home/deploy/.local/bin/backup-tool
# 1 match: were a second copy exist at /usr/bin/backup-tool, the 1st directory would win

# the scheduled job
echo "$PATH"
# /usr/bin:/bin
# 2 directories, and the one holding the program is not among them

backup-tool
# backup-tool: command not found        the shell exits 127 when no directory on the path holds the name
```

### Solution

```bash
# name the program by its full path inside the job
/home/deploy/.local/bin/backup-tool

# or set the path where the job itself will read it, at the top of the script
PATH="/usr/local/bin:/usr/bin:/bin:/home/deploy/.local/bin"
export PATH
type backup-tool
# backup-tool is /home/deploy/.local/bin/backup-tool
```

A bare command name is looked up by walking the directories in `PATH` in order and taking the first file that matches, and the scheduled job starts with a minimal environment rather than the one your interactive shell built, so the personal directory is simply not on its list of 2. Naming the full path, or setting the path at the top of the script the job runs, makes the script independent of whichever shell launches it. The trap is adding the entry to an interactive configuration file, which the scheduler never reads: the fix appears to work when tested by hand and fails again the next night.
