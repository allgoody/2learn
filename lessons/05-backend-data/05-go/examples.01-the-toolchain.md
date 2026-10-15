## Example 1 — One binary for the deployment target

A small orders service builds and runs on a developer's laptop, which is x86-64, while the deployment host is Linux on arm64. The release step copies whatever the laptop produced. Write the build command that emits the artefact the host can run, and say what makes the result self-contained.

```bash
$ go build -o orders ./cmd/orders
$ ./orders
listening on port 8080          # works on the build machine

$ ./orders                      # after copying to the deployment host
cannot execute binary file: Exec format error
```

### Solution

```bash
$ GOOS=linux GOARCH=arm64 go build -ldflags "-s -w" -o dist/orders ./cmd/orders
$ file dist/orders
dist/orders: ELF 64-bit LSB executable, ARM aarch64, statically linked   (illustrative)
```

The two settings on the command name the target operating system and architecture, and the linker flags leave debug information out, so one small file is copied to a host that needs nothing installed. Compilation resolved every dependency into that file, which is why the image it goes into can contain nothing else. What usually goes wrong is leaving the target platform until release: the failure then appears as an Exec format error in the pipeline, where a rebuild is expensive, rather than at the build.

## Example 2 — A diff with one kind of change

A handler arrives with the author's own spacing, and the pull request reindents the file while also changing the calculation. Produce the file as the formatter leaves it, and arrange the change so a reviewer sees one kind of difference.

```go
func Total(items []Item) Money {
    var sum Money
  for _,it:=range items {
        sum = sum.Add(it.Price)
    }
      return sum
}
```

### Solution

```go
func Total(items []Item) Money {
	var sum Money
	for _, it := range items {
		sum = sum.Add(it.Price)
	}
	return sum
}
```

The formatter's output is deterministic, so applying it in a commit of its own leaves the behavioural change in a diff that contains only that change, and the same command runs in every editor and in continuous integration. Hand-formatting produces the opposite: the check rewrites the file again, and the reviewer has to work out which differences matter.
