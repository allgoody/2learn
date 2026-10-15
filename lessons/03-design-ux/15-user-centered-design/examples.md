## Example 1 — Rewriting a form from the task backwards

A sign-up form asks for eight fields, because the database has eight columns. Write the task first, then mark each field as needed, movable or removable so the form matches the steps that matter.

```text
Form fields: email, confirm email, password, confirm password,
  account number, company size, industry, job title

Stated task: "start using the product"
```

### Solution

```text
Task: create a login and reach the first screen
1. give an email
2. choose a password
3. confirm

Needed    email, password
Removable confirm email, confirm password, job title
Movable   company size, industry  -> later, optional, from settings
```

Anything the form asks for that is not on the task list is a candidate for deletion, and the two later fields move to settings where the user has reason to provide them. Letting the data model drive the form is the usual mistake: it mirrors the tables and asks for facts the person has to go and look up before they can start.

## Example 2 — A menu grouped by department

A settings menu was grouped by which team owns each area, so the user reads a list of departments. Regroup it by what the user is trying to do, and keep the department names out of the interface.

```text
Settings
  Payments team
  Account services
  Notifications platform
  Identity
```

### Solution

```text
Settings
  Your account        profile, sign-in, password
  Money              cards, billing, invoices
  Alerts             email, push, what you hear about
```

Reading the menu aloud as a goal shows the first list is an org chart, while the second names what the person came to change. The org chart leaks quietly: grouping by owner feels tidy to the team and forces the user to learn the company's structure instead of their own task.
