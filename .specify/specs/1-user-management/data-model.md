# Data Model: User Management

## Entities

- **User**
  - `id` (string | number) - unique identifier
  - `name` (string) - full name of the user
  - `email` (string) - valid email address

## Relationships

No relationships for initial feature; users are standalone.

## Validation Rules

- `name` must be non-empty.
- `email` must match standard email regex and be unique (backend validation).

## State Transitions

- Creation: new `User` entered via form -> POST to `/users` -> added to list.
- Update: modify fields -> PUT to `/users/:id` -> list refreshes.
- Deletion: confirm removal -> DELETE `/users/:id` -> removed from list.

