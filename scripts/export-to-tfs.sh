#!/usr/bin/env bash
# Convenience wrapper for running the Node export utility with or without
# environment variables.  Place this file in the project root and make it
# executable (`chmod +x scripts/export-to-tfs.sh`).
#
# Usage:
#   # just produce the CSV
#   ./scripts/export-to-tfs.sh
#
#   # run and push to Azure DevOps (must supply PAT or set in environment)
#   AZURE_DEVOPS_ORG=https://dev.azure.com/yourOrg \
#   AZURE_DEVOPS_PROJECT=yourProject \
#   AZURE_DEVOPS_PAT=<your-pat> \
#   ./scripts/export-to-tfs.sh
#
#   # you can also pass a custom tasks file path (markdown or csv):
#   ./scripts/export-to-tfs.sh path/to/other/tasks.md
#   ./scripts/export-to-tfs.sh azure-devops-import.csv

TASK_FILE=${1:-.specify/specs/1-user-management/tasks.md}

# export variables so the Node script can see them
export AZURE_DEVOPS_ORG
export AZURE_DEVOPS_PROJECT
export AZURE_DEVOPS_PAT

node scripts/export-tasks-to-azure.js "$TASK_FILE"
