---
description: "Task list for User Management feature"
---

# Tasks: User Management

**Input**: Design documents from `/specs/1-user-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

**Constitution Alignment (React v1.0.0):**
- All features must follow TDD principle (Principle III: NON-NEGOTIABLE)
- Code organization: components/, pages/, services/ (Principle IV: Separation of Concerns)
- Code quality gates: ESLint/Prettier (Code Quality Standards)

- [ ] T001 Create project structure: `src/components/`, `src/pages/`, `src/services/`, `tests/unit/`, `tests/integration/`
- [ ] T002 Initialize React project dependencies (React, React Router, Axios, Testing Library, Jest) in `package.json`
- [ ] T003 [P] Configure ESLint and Prettier for code style enforcement
- [ ] T004 [P] Configure Jest and React Testing Library for unit/integration tests (see `src/setupTests.js`)
- [ ] T005 [P] Setup CSS Modules or styled-components configuration
- [ ] T006 Create test file templates (`tests/unit/sample.test.js`, `tests/integration/sample.test.js`)
- [ ] T007 Add accessibility testing setup (`jest-axe` or similar) in tests configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T008 Create `src/services/userService.js` with stubbed methods (`getUsers`, `createUser`, `updateUser`, `deleteUser`)
- [ ] T009 [P] Install and configure Axios; add base URL constant in `src/services/userService.js`
- [ ] T010 [P] Setup React Router in `src/App.js` with basic `<Routes>` and a lazy-loaded `ManageUsers` page
- [ ] T011 [P] Add global error handling utility in `src/services/errorHandler.js`
- [ ] T012 Create `src/components` placeholder files for `UserForm.jsx`, `UserList.jsx`, `UserCard.jsx`
- [ ] T013 Configure JSON Server development script and `db.json` (add to README or quickstart)
- [ ] T014 Add common styles and CSS module support (update `src/index.css` if needed)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add new user (Priority: P1) 🎯 MVP

**Goal**: Allow administrator to add a user and view users list immediately

**Independent Test**: Fill out and submit the UserForm; new entry appears in UserList

### Tests for User Story 1

- [ ] T015 [P] [US1] Contract test for POST /users in tests/contract/test_user_api.js
- [ ] T016 [P] [US1] Integration test for creating a user and verifying list update in tests/integration/test_add_user.js

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implement `UserForm` component in `src/components/UserForm.jsx` with name/email inputs and validation
- [ ] T018 [P] [US1] Implement `UserList` component in `src/components/UserList.jsx` to render list of users
- [ ] T019 [P] [US1] Implement `UserCard` component in `src/components/UserCard.jsx` used by UserList
- [ ] T020 [US1] Hook up `UserForm` to `userService.createUser` and refresh list on success
- [ ] T021 [US1] Implement API call `getUsers` in `userService` and call from `ManageUsers` page
- [ ] T022 [US1] Add form validation and display error messages
- [ ] T023 [US1] Add loading indicator and success feedback
- [ ] T024 [US1] Add accessibility attributes (labels, aria-busy, etc.)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 4 - List all users (Priority: P1)

**Goal**: Fetch and display all users when page loads

**Independent Test**: Navigate to ManageUsers; user list is populated via API

- [ ] T025 [P] [US4] Integration test for loading page and rendering users from mock API
- [ ] T026 [P] [US4] Ensure `UserList` supports empty state message in `src/components/UserList.jsx`
- [ ] T027 [US4] Add call to `getUsers` in `ManageUsers.jsx` on mount
- [ ] T028 [US4] Handle API errors by showing user-friendly message

**Checkpoint**: User listing works independently

---

## Phase 5: User Story 2 - Update existing user (Priority: P2)

**Goal**: Allow editing of a user record

**Independent Test**: Edit a user and verify list updates

- [ ] T029 [P] [US2] Contract test for PUT /users/:id in tests/contract/test_user_api.js
- [ ] T030 [P] [US2] Integration test for editing a user in tests/integration/test_update_user.js
- [ ] T031 [US2] Add "Edit" button to `UserCard.jsx` triggering `UserForm` populated with existing data
- [ ] T032 [US2] Implement `userService.updateUser` call and refresh list on success
- [ ] T033 [US2] Validate email uniqueness/format during update
- [ ] T034 [US2] Add confirmation or feedback after successful update

**Checkpoint**: Updating users works independently

---

## Phase 6: User Story 3 - Delete user (Priority: P2)

**Goal**: Allow removal of a user from the list with confirmation

**Independent Test**: Delete button removes user and updates list

- [ ] T035 [P] [US3] Contract test for DELETE /users/:id in tests/contract/test_user_api.js
- [ ] T036 [P] [US3] Integration test for deleting a user in tests/integration/test_delete_user.js
- [ ] T037 [US3] Add "Delete" button to `UserCard.jsx` with confirmation dialog
- [ ] T038 [US3] Implement `userService.deleteUser` and refresh list on success
- [ ] T039 [US3] Handle deletion errors (e.g. 404) gracefully with message

**Checkpoint**: Deletion is functional and testable

---

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T040 [P] Add responsive styling to components (use CSS modules)
- [ ] T041 [P] Ensure keyboard navigation and ARIA attributes for accessibility
- [ ] T042 [P] Add unit tests for each component logic (`tests/unit/*.test.js`)
- [ ] T043 [P] Configure CI to run `npm run lint` and `npm test` on PRs
- [ ] T044 Update documentation (`README.md`, `quickstart.md`) with final instructions
- [ ] T045 [P] Refactor any duplicated logic into custom hooks or utilities

---

## Dependencies

1. Phase 1 (Setup) must complete before foundational work (Phase 2) begins.
2. Foundational tasks (T008–T014) must finish before any user story tasks.
3. User Story 1 & 4 (P1) serve as MVP; US2 & US3 can proceed once listing and creation are stable.

## Parallel Execution Examples

- Frontend developers can work on `UserForm` (T017) while others configure Axios (T009).
- Contract test tasks (T015, T029, T035) can run in parallel to component implementation.
- Styling tasks (T040) and accessibility fixes (T041) can be done alongside story work once components exist.

## Implementation Strategy

1. **MVP**: Complete Phase 1–4 delivering create & list functionality.
2. **Incremental Delivery**: Add edit (US2) then delete (US3) in subsequent iterations.
3. **Testing First**: Write failing tests from the start for each story and component.
4. **Refactor**: After core features, consolidate shared logic into hooks/services.

