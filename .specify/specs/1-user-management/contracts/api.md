# API Contract: User Management

This document outlines the backend endpoints and JSON payloads expected by the frontend.

## Endpoints

### GET /users
- **Description**: Retrieve list of users.
- **Response**: `200 OK`
  ```json
  [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ]
  ```

### POST /users
- **Description**: Create a new user.
- **Request Body**:
  ```json
  { "name": "Charlie", "email": "charlie@example.com" }
  ```
- **Response**: `201 Created`
  ```json
  { "id": 3, "name": "Charlie", "email": "charlie@example.com" }
  ```

### PUT /users/:id
- **Description**: Update an existing user.
- **Request Body** (partial or full):
  ```json
  { "name": "Alice A.", "email": "alice.a@example.com" }
  ```
- **Response**: `200 OK` with updated entity.

### DELETE /users/:id
- **Description**: Delete user by ID.
- **Response**: `204 No Content`.

## Error Responses

- `400 Bad Request` for validation errors; payload contains `{ "error": "message" }`.
- `404 Not Found` when user ID doesn't exist.
- `500 Internal Server Error` for unexpected conditions.
