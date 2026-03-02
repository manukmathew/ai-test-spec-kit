#!/usr/bin/env bash
# Wrapper for importing features from Azure DevOps/TFS into Specify.
# This script pulls work items from your TFS project and generates Specify
# markdown specs.
#
# Usage:
#   # import all open features and user stories
#   AZURE_DEVOPS_ORG=https://dev.azure.com/yourOrg \
#   AZURE_DEVOPS_PROJECT=yourProject \
#   AZURE_DEVOPS_PAT=<your-pat> \
#   ./scripts/import-from-tfs.sh
#
#   # import a specific work item by ID
   AZURE_DEVOPS_ORG=https://dev.azure.com/yourOrg \
   AZURE_DEVOPS_PROJECT=yourProject \
   AZURE_DEVOPS_PAT=3333333 \
   ./scripts/import-from-tfs.sh --feature-id=123

# export variables so the Node script can see them
export AZURE_DEVOPS_ORG
export AZURE_DEVOPS_PROJECT
export AZURE_DEVOPS_PAT

node scripts/import-from-tfs.js "$@"
