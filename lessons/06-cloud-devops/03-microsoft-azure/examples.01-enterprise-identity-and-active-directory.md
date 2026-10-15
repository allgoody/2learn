## Example 1 — A leaver who still has access

Three internal tools grant access to named people, and one of them still lists a colleague who left last month. The table is the directory's current state. Rewrite the grants so that removing one membership removes every access at once.

```text
tool      granted to
wiki      ana, ben, cara
reports   ana, cara
deploy    ben
```

### Solution

```hcl
resource "azuread_group" "platform_engineers" {
  display_name = "platform-engineers"
}

resource "azuread_group_member" "ana" {
  group_object_id  = azuread_group.platform_engineers.object_id
  member_object_id = "<ana-object-id>"
}
# each tool grants access to the group, never to a person
```

Permission now attaches to a group whose purpose can be named and reviewed, so joining, moving and leaving are membership changes and the audit trail stays meaningful. The leaver is removed from the group and every tool that trusts it closes at once, instead of a list of applications being worked through from memory. The usual mistake is to grant "just this once" to an individual, which is exactly how the departed colleague kept an account.

## Example 2 — A sign-in that only asks for a password

Staff reach an internal tool with a password, and the directory already knows which device each of them uses. The policy below is what is configured. Rewrite it so that a valid password from an unknown device is not enough.

```text
policy: staff-tools-sign-in
  users:  all staff
  grant:  a valid password
```

### Solution

```hcl
resource "azuread_conditional_access_policy" "staff_tools" {
  display_name = "staff-tools-sign-in"
  # conditions: the application, plus a managed or compliant device

  grant_controls {
    operator          = "AND"
    built_in_controls = ["mfa"]
  }
}
```

The policy now asks whether a sign-in is plausible for this person on this device, using context the directory already holds, instead of only whether the password matched. Adding each internal tool to single sign-on compounds the same value: one password, one reset flow and one offboarding step per tool disappear, while the directory becomes harder to leave. The usual mistake is to treat a second factor as the whole policy — a stolen session from a healthy account still passes it, so conditions on the device are what close the gap.
