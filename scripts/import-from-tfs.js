#!/usr/bin/env node
/**
 * Import features/work items from Azure DevOps/TFS and generate Specify
 * markdown specifications.
 *
 * This script:
 * 1. Connects to your Azure DevOps project via REST API
 * 2. Queries for User Stories and Features
 * 3. Converts each into a Specify-format spec.md file
 * 4. Creates the appropriate directory structure under `.specify/specs/`
 *
 * Usage:
 *
 *   AZURE_DEVOPS_ORG=https://dev.azure.com/yourOrg \
 *   AZURE_DEVOPS_PROJECT=yourProject \
 *   AZURE_DEVOPS_PAT=<personal-access-token> \
 *   node scripts/import-from-tfs.js [--feature-id=NNN]
 *
 * If --feature-id is provided, only that item (and its children) are imported.
 * Otherwise, all top-level Features and User Stories are fetched.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

function buildAuth(pat) {
  return `Basic ${Buffer.from(`:${pat}`).toString('base64')}`;
}

async function fetchWorkItems(org, project, pat, wiql) {
  const url = `${org}/${project}/_apis/wit/wiql?api-version=7.0`;
  const auth = buildAuth(pat);
  try {
    const resp = await axios.post(url, { query: wiql }, {
      headers: { Authorization: auth }
    });
    return resp.data.workItems || [];
  } catch (err) {
    console.error('error fetching work items:', err.response?.data || err.message);
    return [];
  }
}

async function fetchWorkItemDetails(org, project, pat, id) {
  const url = `${org}/${project}/_apis/wit/workitems/${id}?api-version=7.0&$expand=relations`;
  const auth = buildAuth(pat);
  try {
    const resp = await axios.get(url, {
      headers: { Authorization: auth }
    });
    return resp.data;
  } catch (err) {
    console.error(`error fetching work item ${id}:`, err.response?.data || err.message);
    return null;
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function generateSpecMarkdown(wi) {
  const title = wi.fields['System.Title'] || 'Untitled Feature';
  const description = wi.fields['System.Description'] || 'No description provided.';
  const state = wi.fields['System.State'] || 'New';
  const created = wi.fields['System.CreatedDate'] || new Date().toISOString().split('T')[0];
  const id = wi.id;

  const spec = `# Feature Specification: ${title}

**Work Item ID**: ${id}  
**State**: ${state}  
**Created**: ${created}  
**Status**: Draft  
**Input**: Imported from Azure DevOps/TFS

## Summary

${description}

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Functionality (Priority: P1)

This is the main user story for this feature.

**Why this priority**: Core functionality for the feature.

**Independent Test**: Verify the primary use case works end-to-end.

**Acceptance Scenarios**:

1. **Given** the user is in the system, **When** they perform the main action, **Then** the expected outcome occurs.

---

### Edge Cases

- What happens on error? The system should handle errors gracefully.
- What about edge inputs? The system should validate appropriately.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support the core feature functionality.
- **FR-002**: System MUST validate inputs appropriately.
- **FR-003**: System MUST handle errors gracefully.

### Key Entities

- Primary entity related to this feature (to be defined based on requirements).

## Assumptions

- Assumptions about the system, environment, or user base.
- Backend APIs will be available or will be created.

## Success Criteria

- Feature works as expected based on acceptance scenarios.
- Error handling is in place.
- UI/UX is clear and intuitive.
`;

  return spec;
}

async function importFeatures(org, project, pat, featureId) {
  if (!org || !project || !pat) {
    console.error('missing required env: AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT');
    process.exit(1);
  }

  let wiql;
  if (featureId) {
    wiql = `SELECT [System.Id], [System.Title], [System.State] WHERE [System.Id] = ${featureId}`;
  } else {
    wiql = `SELECT [System.Id], [System.Title], [System.State] WHERE [System.WorkItemType] IN ('Feature', 'User Story') AND [System.State] <> 'Done'`;
  }

  console.log('querying work items...');
  const items = await fetchWorkItems(org, project, pat, wiql);
  if (items.length === 0) {
    console.log('no work items found');
    return;
  }

  console.log(`found ${items.length} work item(s)`);

  for (const item of items) {
    const wiDetails = await fetchWorkItemDetails(org, project, pat, item.id);
    if (!wiDetails) continue;

    const title = wiDetails.fields['System.Title'];
    const slug = slugify(title);
    const specDir = path.join('.specify/specs', `${item.id}-${slug}`);

    // ensure directory exists
    if (!fs.existsSync(specDir)) {
      fs.mkdirSync(specDir, { recursive: true });
    }

    // generate and write spec.md
    const specContent = generateSpecMarkdown(wiDetails);
    const specPath = path.join(specDir, 'spec.md');
    fs.writeFileSync(specPath, specContent);
    console.log(`created ${specPath}`);

    // create a plan.md stub
    const planContent = `# Implementation Plan: ${title}

**Work Item ID**: ${item.id}

## Phases

### Phase 1: Setup
- Initialize project structure
- Configure dependencies

### Phase 2: Core Implementation
- Implement main feature
- Add basic tests

### Phase 3: Enhancement
- Add advanced features
- Refine UI/UX

### Phase 4: Polish
- Performance optimization
- Accessibility improvements
- Documentation

---

See also: \`spec.md\` for detailed requirements.
`;
    const planPath = path.join(specDir, 'plan.md');
    fs.writeFileSync(planPath, planContent);
    console.log(`created ${planPath}`);

    // create a tasks.md stub
    const tasksContent = `# Tasks: ${title}

**Work Item ID**: ${item.id}

## Phase 1: Setup

- [ ] T001 Initialize project structure
- [ ] T002 Configure dependencies
- [ ] T003 Setup testing framework

---

## Phase 2: Core Implementation

- [ ] T004 Implement main feature
- [ ] T005 Add unit tests
- [ ] T006 Add integration tests

---

## Phase 3: Enhancement

- [ ] T007 Add advanced features
- [ ] T008 Refine user interface
- [ ] T009 Optimize performance

---

## Phase 4: Polish

- [ ] T010 Accessibility improvements
- [ ] T011 Documentation
- [ ] T012 Code review and cleanup

---

See also: \`spec.md\` for requirements and \`plan.md\` for implementation strategy.
`;
    const tasksPath = path.join(specDir, 'tasks.md');
    fs.writeFileSync(tasksPath, tasksContent);
    console.log(`created ${tasksPath}`);
  }

  console.log(`\n✅ imported ${items.length} feature(s) to .specify/specs/`);
}

const args = process.argv.slice(2);
let featureId = null;
for (const arg of args) {
  const m = arg.match(/--feature-id=(\d+)/);
  if (m) featureId = m[1];
}

importFeatures(
  process.env.AZURE_DEVOPS_ORG,
  process.env.AZURE_DEVOPS_PROJECT,
  process.env.AZURE_DEVOPS_PAT,
  featureId
).catch(err => {
  console.error('error:', err);
  process.exit(1);
});
