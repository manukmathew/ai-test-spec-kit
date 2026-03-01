#!/usr/bin/env node
/**
 * Read the tasks markdown produced by Specify and generate an Azure DevOps
 * import CSV file.  Optionally, when run with the appropriate environment
 * variables it will also call the Azure DevOps REST API to create actual
 * work items (User Stories) in your project.
 *
 * Usage:
 *
 *   AZURE_DEVOPS_ORG=https://dev.azure.com/yourOrg \
 *   AZURE_DEVOPS_PROJECT=yourProject \
 *   AZURE_DEVOPS_PAT=<personal-access-token> \
 *   node scripts/export-tasks-to-azure.js [.specify/.../tasks.md]
 *
 * If the PAT (or the other variables) is missing the script will still write
 * `azure-devops-import.csv` and then exit without attempting the API import.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

function parseTasks(markdown) {
  const lines = markdown.split("\n");
  const tasks = [];
  const checkboxRegex = /^\s*[-*]\s*\[( |x)\]\s*(T\d+)\s*(.*)$/i;
  for (const line of lines) {
    const m = line.match(checkboxRegex);
    if (m) {
      const id = m[2].trim();
      const title = m[3].trim();
      tasks.push({ id, title });
    }
  }
  return tasks;
}

async function importToAzure(tasks) {
  const org = process.env.AZURE_DEVOPS_ORG;
  const project = process.env.AZURE_DEVOPS_PROJECT;
  const pat = process.env.AZURE_DEVOPS_PAT;

  if (!org || !project || !pat) {
    console.warn('azure devops env variables not fully set; skipping API import');
    return;
  }

  const auth = Buffer.from(`:${pat}`).toString('base64');

  for (const t of tasks) {
    const patch = [
      { op: 'add', path: '/fields/System.Title', value: t.title },
      { op: 'add', path: '/fields/System.Description', value: `Imported task ${t.id}` },
      { op: 'add', path: '/fields/System.WorkItemType', value: 'User Story' }
    ];
    const url = `${org}/${project}/_apis/wit/workitems/$User%20Story?api-version=7.0`;
    try {
      const resp = await axios.post(url, patch, {
        headers: {
          'Content-Type': 'application/json-patch+json',
          Authorization: `Basic ${auth}`
        }
      });
      console.log(`created ${resp.data.id} - ${t.title}`);
    } catch (err) {
      console.error('error creating', t.title, err.response?.data || err.message);
    }
  }
}

function writeCsv(tasks, outPath) {
  const headers = ['Title','Description','Work Item Type','Iteration Path'];
  const rows = tasks.map(t => {
    const desc = `Imported task ${t.id}`;
    return [
      `"${t.title.replace(/"/g,'""')}"`,
      `"${desc.replace(/"/g,'""')}"`,
      '"User Story"',
      '"\\Default"'
    ].join(',');
  });
  const csv = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync(outPath, csv);
  console.log(`wrote ${outPath}`);
}

function readCsv(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length <= 1) return [];
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
  const titleIdx = headers.findIndex(h => /title/i.test(h));
  const tasks = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (titleIdx >= 0 && cols[titleIdx]) {
      let title = cols[titleIdx].trim();
      title = title.replace(/^"|"$/g, '');
      tasks.push({ title });
    }
  }
  return tasks;
}

async function main() {
  const taskFile = process.argv[2] || '.specify/specs/1-user-management/tasks.md';
  if (!fs.existsSync(taskFile)) {
    console.error('task file not found:', taskFile);
    process.exit(1);
  }

  let tasks;
  if (path.extname(taskFile).toLowerCase() === '.csv') {
    // use provided CSV directly
    tasks = readCsv(taskFile);
    // ensure the canonical output file exists
    if (taskFile !== 'azure-devops-import.csv') {
      fs.copyFileSync(taskFile, 'azure-devops-import.csv');
      console.log(`copied ${taskFile} -> azure-devops-import.csv`);
    }
  } else {
    const md = fs.readFileSync(taskFile, 'utf8');
    tasks = parseTasks(md);
    if (tasks.length === 0) {
      console.log('no tasks found to export');
      return;
    }
    writeCsv(tasks, 'azure-devops-import.csv');
  }

  await importToAzure(tasks);
}

main().catch(err => {
  console.error('unexpected error', err);
  process.exit(1);
});
