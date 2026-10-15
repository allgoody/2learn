## Example 1 — A full root volume whose largest file has already gone

The root volume reports no free space, yet the largest named file under it accounts for a small part of the total, and deleting a large log changed nothing. Given the mount table, identify what is holding the space and the two safe ways to return it.

```text
mount table (illustrative figures)
mount point    size  used  free
/               40G   40G     0
/var/lib/data  200G   61G   139G
largest named file under /: 2G
```

### Solution

```text
cause: a process still holds a deleted file open; the name is gone, the blocks are not
check: list open files and match a deleted entry against the process writing the log
fix, without stopping it: truncate the file in place, which returns the blocks
fix, if a restart is allowed: restart the service so it closes and reopens the file
```

Removing the name does not free the blocks, because the inode is still referenced by the process that has it open; truncating in place returns the space without interrupting the service. Each mount fills independently, so the useful reading is the per-mount table rather than a single host figure. The usual mistake is to keep hunting for a large file that no longer exists, or to restart the service and lose the state that would explain why the log was large.

## Example 2 — Free space, and still no file can be created

A volume with gigabytes free refuses to create a new file. Determine the cause, the check that proves it, and the safe next step.

```text
volume: 40G total, 18G free
attempt to create a file: no space left on device
the directory in question: a cache holding millions of tiny session files
```

### Solution

```text
cause:  the filesystem is out of inodes, not bytes; every file consumed one
check:  compare inode use with byte use on that mount
action: remove the files whose purpose you can name, oldest first, and schedule it
note:   deleting a directory with millions of entries is slow; each one is unlinked
```

Inodes are consumed per file, so a cache of millions of tiny files exhausts the table while bytes remain free. The remedy is to delete files you can justify removing and to put that cleanup on a schedule, otherwise the same cache fills the table again. The usual mistake is to add storage: more bytes do not add inodes, and the volume returns to this state in the same way.
