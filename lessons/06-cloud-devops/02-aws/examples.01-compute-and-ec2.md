## Example 1 — An instance sized for the worst week

A report service is busy for one hour each morning and idle otherwise. It was launched on the largest general-purpose size "to be safe", and it has run that way all month. Using the measured peak below, choose a size with modest headroom and say what the choice must leave unchanged.

```hcl
resource "aws_instance" "reports" {
  ami           = "<report-image>"
  instance_type = "m5.4xlarge" # illustrative: 16 vCPU, 64 GB
  subnet_id     = "<app-subnet-a>"
}
```

### Solution

```hcl
resource "aws_instance" "reports" {
  ami           = "<report-image>"
  instance_type = "t3.medium" # illustrative: 2 vCPU, 4 GB
  subnet_id     = "<app-subnet-a>"
}
```

The image and the subnet are untouched, so a replacement is identical and the machine stays disposable; only the size moved, and it now sits just above the measured peak. An hour a day is not a steady load, so a committed plan is the wrong instrument here and a smaller instance is the right first move. The usual mistake is to leave the oversized machine running because it already exists — the family and the region set the price, and capacity no measurement asked for can cost several times more.

## Example 2 — A server that can no longer be rebuilt

A worker has been patched by hand for six months and now differs from the image it was built from, so its replacement would behave differently. The workload runs for hours per invocation, which rules out the top rungs of the managed ladder. Turn the manual changes into something a launch reproduces.

```bash
# typed by hand on the running server, month after month, written down nowhere
install <runtime-version>
apply <config-edit>
install <security-update>
```

### Solution

```bash
#!/usr/bin/env bash
# image build steps, kept in version control and run at image build time
set -euo pipefail
install <runtime-version>
copy <config-file> /etc/<service>/
install <security-update>
```

Each manual step is now a line in the build, so a machine launched from the image behaves like the one that was tested and can be terminated without ceremony. The workload stays on the instance rung because a long-running job exceeds the shorter limits above it; reaching for a function would have been discovered as a rebuild, not a configuration change. The usual mistake is to treat the running server, rather than the image, as the artefact.
