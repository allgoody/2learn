## Example 1 — Reading the mode that refused a service

A service named `reportd` fails at start with a permission error. Its directory and configuration file are listed below. Say who may do what, which fact caused the failure, and the one change that fixes it without widening access.

```bash
$ ls -ld /srv/reportd /srv/reportd/reportd.conf
drwxr-x--- 2 root  reportd     4096 /srv/reportd
-rw-r----- 1 root  root         812 /srv/reportd/reportd.conf
```

### Solution

```text
directory: owner root may traverse and list; group reportd may traverse; others none
config:    owner root may read and write; group root may read; the service gets nothing
cause:     the service runs as reportd, but the config belongs to root:root
fix:       chown root:reportd reportd.conf   (service reads via its group; mode unchanged)
```

The directory already admits the service's group, so only the file's ownership is wrong, and correcting the owner keeps the mode as it was. The usual mistake is to loosen the mode instead: the file becomes readable by every account on the host, and the group mismatch that caused the error is still there to be found later.

## Example 2 — Sharing a directory without making it world-readable

Two operators, `ana` and `ben`, need to read files in `/srv/exports`, and no other account may. The directory currently grants everyone read access. Show the group setup and the resulting permissions, and explain why the grant keeps working for files added tomorrow.

```text
current: drwxr-xr-x root:root /srv/exports, files created inside are root:root, mode 644
requirement: ana and ben may read; every other account is refused
```

### Solution

```bash
groupadd exports-read
usermod -aG exports-read ana
usermod -aG exports-read ben
chgrp exports-read /srv/exports
chmod 2750 /srv/exports
```

```text
result: drwxr-s--- root exports-read /srv/exports
new files inherit the exports-read group, so the set-group identifier keeps the grant valid
```

Groups are the practical tool for sharing: the set of readers is explicit and reviewable in one place rather than being "everyone but nobody objected". The set-group identifier on the directory makes files created inside inherit that group, so the grant survives the next upload without another command. The usual mistake is to make the directory world-readable, which is shorter to type and exposes every export to every account on the host.
