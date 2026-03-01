<!-- 
Sync Impact Report
==================
Version Change: (init) → 1.0.0 (MINOR: Initial constitution for React application with 5 core principles)
Modified Principles: N/A (initial document)
Added Sections: Code Quality & Styling Standards, Development Workflow & Review Process
Removed Sections: N/A
Templates Updated: 
  - ✅ plan-template.md (Constitution Check section updated with React-specific gates)
  - ✅ tasks-template.md (Phase 1 setup updated with principle-driven tasks)
  - ✅ spec-template.md (no specific updates needed - generic spec structure compatible)
Runtime Guidance:
  - ✅ best-practises/bes-practises.md (already aligned with constitution principles)
Follow-up: None
-->

# AI Test Spec Kit Constitution

## Core Principles

### I. Component Modularity & Reusability

Components MUST be small, focused, and independently testable. Each component has a single responsibility and exposes a clear, minimal API. Components MUST be designed for composition and reuse across the application. All components MUST be located in `src/components/` and follow naming conventions (PascalCase for components, camelCase for utilities).

### II. Functional Architecture with Hooks

All components MUST use React functional components with hooks. Class components are prohibited. State management MUST use `useState` and `useReducer` for local state; global state MUST use Context API or dedicated state libraries (Redux, Zustand). Custom hooks MUST be extracted and reused when logic is needed across multiple components. Hooks MUST follow React rules of hooks strictly (no conditional hooks, etc.).

### III. Test-Driven Development (NON-NEGOTIABLE)

Tests MUST be written before or alongside implementation. Unit tests MUST cover all component logic and utility functions with >80% coverage target. Integration tests MUST verify component interactions and user workflows. Tests MUST use React Testing Library for component testing and Jest for utilities. All tests MUST run successfully before code is merged.

### IV. Separation of Concerns

Code organization MUST follow clear directory structure: `src/components/` for UI components, `src/pages/` for page-level components, `src/services/` for business logic and API calls. Logic MUST NOT be embedded in components; it MUST be extracted to services or custom hooks. Routing logic MUST be centralized in dedicated route configuration files.

### V. Performance & Accessibility

Component re-renders MUST be optimized using `React.memo`, `useMemo`, and `useCallback` where justified. Long lists MUST use lazy loading or virtualization. Route-based code splitting MUST be implemented using React Router's lazy loading. Accessibility MUST follow WCAG 2.1 AA standards: all interactive elements MUST have semantic HTML tags, ARIA labels where needed, and keyboard navigation support. Color contrast ratios MUST meet AA standards.

## Code Quality & Styling Standards

- Consistent code style MUST be enforced using Prettier (formatter) and ESLint (linter). All code MUST pass linting before commit.
- CSS MUST use CSS Modules or styled-components for scoped styling to prevent class name collisions.
- Styles MUST be theme-aware and consistent across the application.
- No global styles except for HTML resets and theme variables.
- All assets (images, fonts) MUST be optimized and organized in `src/public/` or subfolders.
- Security: User input MUST always be validated. Sensitive data MUST NOT be exposed in frontend code or local storage.

## Development Workflow & Review Process

- All features MUST be developed on feature branches following naming convention: `feature/[description]` or `bugfix/[description]`.
- Pull requests MUST include: clear description, link to specification, test coverage report, and any breaking changes.
- Code review MUST verify: principle compliance, test coverage, accessibility compliance, performance impact, and security implications.
- CI/CD gates MUST pass: ESLint/Prettier check, tests passing (100% of new code), build succeeds.
- Deployment MUST occur only after PR approval and all checks pass.
- Best practices documentation reference: See `best-practises/bes-practises.md` for runtime guidance.

## Governance

This constitution is the source of truth for development standards and architecture decisions. All PRs and reviews MUST verify compliance with these principles. Deviations from the constitution MUST be documented and justified in the PR.

Amendments to this constitution MUST follow semantic versioning:
- **MAJOR**: Principle removals or backward-incompatible redefinitions
- **MINOR**: New principle or substantially expanded guidance
- **PATCH**: Clarifications, wording improvements, typo fixes

Amendment process: (1) Create proposal documenting rationale, (2) Get team approval, (3) Update this file and increment version, (4) Update dependent templates and documentation, (5) Commit with message: `docs: amend constitution to vX.Y.Z`.

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
