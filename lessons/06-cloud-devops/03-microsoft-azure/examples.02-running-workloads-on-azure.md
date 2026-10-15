## Example 1 — A key in the application settings

A web application reaches a storage account with a key held in its configuration, so rotation is a project and every copy of the configuration is a secret. Give the application an identity the platform issues and manages, and grant that identity access to the storage account.

```hcl
resource "azurerm_linux_web_app" "orders" {
  name = "<orders-app>"
  # the application reads a storage key from its configuration settings
}
```

### Solution

```hcl
resource "azurerm_linux_web_app" "orders" {
  name = "<orders-app>"

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_role_assignment" "orders_storage" {
  principal_id         = azurerm_linux_web_app.orders.identity[0].principal_id
  role_definition_name = "<storage-reader-role>"
  scope                = "<storage-account-resource-id>"
}
```

The application obtains a token at runtime and nothing secret sits in configuration, so "where is the password" stops being a question and rotation stops being a task. Because the role is scoped to one resource, a leaked configuration would expose nothing reusable. The usual mistake is to keep the key as a fallback "in case the identity fails", which preserves the very credential the change was meant to remove.

## Example 2 — One resource group for everything

A web application and an unrelated reporting job share a resource group. Permissions cannot be scoped, cost cannot be separated and deleting the group would take both. Split the group by application and lifecycle.

```hcl
resource "azurerm_resource_group" "shared" {
  name     = "<shared-group>"
  location = "<region>"
}

resource "azurerm_linux_web_app" "orders" {
  name                = "<orders-app>"
  resource_group_name = azurerm_resource_group.shared.name
}

resource "azurerm_linux_web_app" "reporting" {
  name                = "<reporting-app>"
  resource_group_name = azurerm_resource_group.shared.name
}
```

### Solution

```hcl
resource "azurerm_resource_group" "orders" {
  name     = "<orders-group>"
  location = "<region>"
}

resource "azurerm_resource_group" "reporting" {
  name     = "<reporting-group>"
  location = "<region>"
}
# each application's resources move into its own group
```

Ownership, permission and cleanup now follow one boundary, so deleting a group removes exactly one application's resources and nothing another team relies on. Reading cost per group turns the monthly review into a short exercise rather than an investigation. The usual mistake is to group resources by type, which makes all three of those harder at once — and the correction is a move, so it is cheapest while the estate is small.
