# Quickstart: User Management Feature

These instructions help developers set up the project locally and run user management workflows.

## Setup

1. Clone repository and switch to feature branch:
   ```bash
   git checkout 1-user-management
   npm install
   ```
2. Install JSON Server globally or as dev dependency:
   ```bash
   npm install -g json-server
   # or npm install --save-dev json-server
   ```
3. Create a `db.json` file at project root with sample users:
   ```json
   {
     "users": []
   }
   ```

## Running the App with Mock API

1. Start JSON Server:
   ```bash
   json-server --watch db.json --port 5000
   ```
   (API endpoints available at `http://localhost:5000/users`)
2. In another terminal, start React development server:
   ```bash
   npm start
   ```
3. Navigate to `http://localhost:3000/manage-users` to exercise feature.

## Testing

- Run unit and integration tests:
  ```bash
  npm test
  ```
- CI should run `npm run lint` and `npm test` before merging.

## Notes

- Code follows constitution rules; new components go under `src/components`.
- Use `userService.js` to encapsulate API calls.
- Ensure tests cover both happy path and error handling.
