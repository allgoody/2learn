## Example 1 — A private subnet that routes to the internet

Two subnets sit in one virtual network: the load balancer's and the application's. The second was named "private" at creation, but the table below is what actually routes. Read the table, then declare the association that makes the name true.

```text
subnet   intended  route table   default route   public?
lb-a     public    rt-public     igw             yes
app-a    private   rt-public     igw             yes
```

### Solution

```hcl
resource "aws_route_table" "private" {
  vpc_id = "<vpc-id>"
  # no route to the internet gateway: outbound goes via the translation gateway
}

resource "aws_route_table_association" "app_a" {
  subnet_id      = "<app-subnet-a>"
  route_table_id = aws_route_table.private.id
}
```

A subnet is public because its route table sends unrouted traffic to the gateway, not because of the label it was given, so moving the association is the whole fix and the application keeps outbound access through the translation gateway. The usual mistake is to trust the name from creation and never re-read the route table after someone attached a new one.

## Example 2 — A database port opened to an address range

The application tier must reach the database on its port and nothing else must. The table is the intended access, written as addresses because that was quick. Rewrite it as rules that still hold when an instance is replaced and its address changes.

```text
from          to   port   reason
10.0.0.0/16   db   5432   the application subnet
0.0.0.0/0     lb   443    the public service
```

### Solution

```hcl
resource "aws_security_group" "db" {
  # default deny: only the rule below is allowed in
}

resource "aws_security_group_rule" "db_from_app" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  security_group_id        = aws_security_group.db.id
  source_security_group_id = "<app-group>"
}
```

Referencing the application group rather than its address range means a replaced instance is still allowed and a machine outside the group is not, so a temporary opening never has to be remembered and closed. Administering these hosts through a bastion or a session manager rather than a public address keeps the same surface small. The usual mistake is to add an address range for a day of testing; it survives the deploy, its owner and reason are forgotten, and every subnet can reach the database.
