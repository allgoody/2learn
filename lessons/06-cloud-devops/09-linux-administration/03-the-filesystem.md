---
title: The filesystem
prereqs: ["06-cloud-devops/09-linux-administration/02-processes-and-services"]
---

## What it is

Linux presents one directory tree, and storage devices are attached to places in that tree rather than occupying letters of their own. A file has an inode describing it and a name pointing at that inode, which is why two names can refer to one file and why deleting an open file does not free its space. Understanding the tree and its mounts is what makes "where did my disk space go" an answerable question.

## Why it matters

A full disk is one of the most common host outages, and the least mysterious once you know where to look. Logs grow, container images accumulate, deleted files stay open, temporary files are never cleaned. Because the tree is arranged by purpose — configuration in one place, variable data in another, logs in a third — that arrangement itself tells you what may be deleted without losing anything and what must be preserved. It also decides what a backup has to include.

## Core ideas

### The tree is a convention about what changes and what does not

System programs and libraries are separated from configuration, which is separated from variable data such as databases and logs, which is separated from temporary files. The convention exists so that a machine can be replaced or updated without destroying the data: reinstall the first two, preserve the third.

```text
programs   -> replaced on upgrade
configuration -> edited deliberately, usually preserved
variable data (databases, logs, uploads) -> must be backed up
temporary  -> may be deleted, though an open file is not freed
```

### A mount point is a storage decision

Attaching a device at a path means everything below that path lives on that device. Putting variable data on its own volume lets it grow without filling the root, and lets the volume be resized or snapshotted independently. Because of this, the useful view of a host is its list of mounts and how full each is, not one free-space number.

### Inodes are consumed as well as bytes

Each file consumes an inode, so a filesystem can be full while showing free space — the usual cause is a directory containing millions of tiny files. The same reasoning explains why deleting a directory with many files is slow: each one must be unlinked.

### Deleting a file does not free space while it is open

A process holding a deleted file keeps its blocks allocated until the process closes it or exits. This is why a log file can be removed and the disk can remain full, and why the answer is usually to truncate the file or restart the process rather than to look for the missing file.

```text
rm big.log        -> name gone, inode still referenced by the logging process
truncate big.log  -> size becomes zero, space returned
```

### Links make the naming layer explicit

A symbolic link is a name that points at another name; a hard link is a second name for the same inode. Both exist to avoid duplicating data or path conventions, and both confuse a directory listing that shows a file apparently in two places. Reading links as names rather than contents clears up most of it.

### Permissions on directories decide reachability

A file's mode is irrelevant if the directory path to it is not traversable by the process. This is why a correctly permissioned file in a private directory is protected by the directory, and why loosening a directory's mode to fix one access problem can expose everything beneath it.

## Practice

### Find what filled a filesystem

Fill or find a filesystem that is over ninety percent full, and determine whether the space is used by files, by inodes, or by a deleted file still held open.

Done when: you can name the largest consumer and the command that proved it, and you have not deleted anything whose purpose you could not explain.

### Separate variable data onto its own mount

Describe how you would move a growing data directory onto its own volume without losing data or changing the paths the application uses.

Done when: the mount table shows the directory on its own volume and the application needed no configuration change.

## Common mistakes

- **Deleting a large open file and expecting space back** — the process still holds the blocks; fix: truncate the file or restart the process.
- **Reading a single free-space figure for the host** — each mount fills independently; fix: check per mount and monitor the ones that grow.
- **Ignoring inode exhaustion** — free space remains while no file can be created; fix: check inode counts on filesystems holding many small files.
- **Loosening a directory's mode to fix one access error** — everything beneath it becomes reachable; fix: grant access on the specific file or group.
- **Storing variable data on the same volume as the system** — growth threatens the whole host; fix: give data its own mount and back it up there.

## Go deeper

- **Processes and services** (`06-cloud-devops/09-linux-administration/02-processes-and-services`) — the processes that hold deleted files open and write the growing logs.
- **Linux Administration** (`06-cloud-devops/09-linux-administration`) — the host whose storage this child describes.
- **Logs and troubleshooting** (`06-cloud-devops/09-linux-administration/04-logs-and-troubleshooting`) — where the evidence about a full disk or a permissions failure is actually recorded.
