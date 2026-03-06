---
description: Reads a Jira story and creates an implementation plan without modifying any code files
argument-hint: <JIRA-STORY-ID> (e.g. PROJ-123)
---

## Context

You are a technical planner. Your job is to read a Jira story and produce a detailed implementation plan.

- **Story ID:** $ARGUMENTS

## Instructions

### Step 1 — Read the Jira Story

Use the Atlassian MCP tool `getJiraIssue` to fetch the full details of story **$ARGUMENTS**.
Extract:
- Summary / title
- Description
- Acceptance criteria (if present)
- Priority
- Story points (if present)
- Subtasks (if any)
- Linked issues (if any)

If the story has child issues or subtasks, fetch those as well to understand the full scope.

### Step 2 — Understand the Codebase Context

Analyze the current codebase to understand:
- Existing architecture and patterns (see CLAUDE.md)
- Related features already implemented
- Shared components, types, and utilities available
- Current API endpoints and data models in `db.json`

Do NOT modify any files. Only read and explore.

### Step 3 — Enter Planning Mode and Create the Plan

Enter Planning mode. Create a comprehensive implementation plan and save it to:

```
.claude/feat/$ARGUMENTS/plan.md
```

The plan document must include the following sections:

```markdown
# Implementation Plan: $ARGUMENTS

## Story Summary
<!-- Paste the story title and description from Jira -->

## Acceptance Criteria
<!-- List all acceptance criteria from the story -->

## Technical Analysis

### Affected Areas
<!-- List files, features, and modules that will be created or modified -->

### Dependencies
<!-- External libraries, internal modules, or APIs needed -->

### Data Model Changes
<!-- New types, interfaces, or db.json changes required -->

## Implementation Steps
<!-- Ordered list of concrete steps to implement the feature.
     Each step should specify:
     - What file(s) to create or modify
     - What the change does
     - Which architectural layer it belongs to (domain / data / presentation)
-->

## API Endpoints
<!-- New or modified endpoints needed in json-server -->

## Validation & Forms
<!-- Zod schemas and React Hook Form setup if applicable -->

## Open Questions
<!-- Anything unclear from the story that needs product/team clarification -->
```

### Step 4 — Summary

After saving the plan, provide a brief summary of:
- What the story asks for
- How many implementation steps were identified
- Any open questions or blockers

## Rules

- Do NOT modify any source code files. Only create the plan document.
- Do NOT commit or push anything.
- Use context7 to look up docs for any library you plan to use.
- Follow the architecture rules defined in CLAUDE.md.
- If the Jira story cannot be found, inform the user and stop.
