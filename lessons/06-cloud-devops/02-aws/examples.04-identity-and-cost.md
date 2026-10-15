## Example 1 — A workload that stores its own key

An application on an instance reads a long-lived access key from a file baked into its image, and the key grants more than the application actually calls. Give the instance a way to obtain credentials that nothing can leak and nobody has to rotate, and narrow what it may do.

```hcl
resource "aws_instance" "app" {
  ami           = "<app-image>"
  instance_type = "t3.small"
  # the application reads a long-lived key from a file in this image
}
```

### Solution

```hcl
resource "aws_iam_role" "app" {
  name = "app-runtime"
  # only the compute service may assume this role
}

resource "aws_iam_instance_profile" "app" {
  name = "app-runtime"
  role = aws_iam_role.app.name
}
# the instance carries the profile instead of the key file
```

There is now no secret in the image and nothing to rotate: the workload asks the platform for temporary credentials and the platform decides whether to grant them. Least privilege is iterative, so start from deny, grant the calls the logs demonstrably show, and remove the rest — a permission attached "to unblock a deploy" outlives the deploy. The usual mistake is to add the role while leaving the old key in place, so two paths remain.

## Example 2 — A disk nobody owns

A test created a large disk, never attached it to a machine and never deleted it, so it has appeared on the bill every month since. The review cannot say whose it is, so it cannot be removed. Change the declaration so the next resource of this kind can be attributed and retired.

```hcl
resource "aws_ebs_volume" "scratch" {
  availability_zone = "<zone-a>"
  size              = 100
}
```

### Solution

```hcl
resource "aws_ebs_volume" "scratch" {
  availability_zone = "<zone-a>"
  size              = 100

  tags = {
    owner       = "<team>"
    environment = "sandbox"
    project     = "<project>"
    expiry      = "<date>"
  }
}

# the monthly review reads the largest lines first and groups them by tag
```

An owner, an environment, a project and an expiry turn "whose is this?" into a lookup, and the expiry makes deletion a decision rather than a guess. Storage is billed by the month whether or not a disk is attached, so unattached resources accumulate quietly while attention stays on the obvious large lines, and tags are what let a review find them. The usual mistake is to require tags in a document rather than at creation, by which point the resource exists.
