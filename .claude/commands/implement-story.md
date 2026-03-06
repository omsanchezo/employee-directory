---
description: Implements a planned Jira story, then runs code quality and UI/UX reviews
argument-hint: <JIRA-STORY-ID> (e.g. CHL-1)
---

## Context

You are a senior full-stack developer. Your job is to implement a previously planned Jira story and ensure quality through automated reviews.

- **Story ID:** $ARGUMENTS

## Prerequisites

This command expects a plan file to already exist at:

```
.claude/feat/$ARGUMENTS/plan.md
```

If the plan does not exist, inform the user and suggest running `/plan-story $ARGUMENTS` first. Do NOT proceed without a plan.

## Instructions

### Step 1 — Read the Plan

Read the implementation plan from `.claude/feat/$ARGUMENTS/plan.md`.
Understand:
- The story summary and acceptance criteria
- All implementation steps (in order)
- Data model changes needed
- API endpoints to create or modify
- Validation and form requirements

### Step 2 — Understand Current Codebase

Before writing any code, read the relevant existing files mentioned in the plan:
- Existing feature structures in `src/features/`
- Shared components in `src/shared/`
- The Redux store at `src/store/store.ts`
- The mock database at `db.json`
- Any other files the plan references

### Step 3 — Implement the Plan

Follow the implementation steps from the plan **in order**. For each step:

1. Use context7 to check up-to-date docs for any library being used (RTK Query, React Hook Form, Zod, TanStack Table, etc.)
2. Create or modify the files as specified
3. Follow the apsys architecture rules from CLAUDE.md:
   - `domain/` — TypeScript interfaces and types
   - `data/` — RTK Query API slice
   - `presentation/` — React components and pages
4. Use proper TypeScript types everywhere — no `any`
5. Use RTK Query for ALL server state
6. Use React Hook Form + Zod for ALL forms

After implementing all steps, register any new API slices in the Redux store if needed.

### Step 4 — Verify the Build

Run `npm run build` to verify there are no TypeScript or build errors.
If there are errors, fix them before proceeding.

Run `npm run lint` to verify there are no linting issues.
If there are issues, fix them before proceeding.

### Step 5 — Code Quality Review

Use the `code-quality-review` skill to review all code created or modified during implementation.
This will check:
- Architecture layer compliance
- TypeScript strictness
- RTK Query conventions
- Form patterns
- Deprecated patterns

Collect all findings from the review.

### Step 6 — UI/UX Review

Use the `ui-ux-reviewer` agent to visually review the implemented UI.
Make sure the dev server is running on `http://localhost:5173` before launching the agent.
The agent will:
- Take desktop and mobile screenshots
- Test keyboard navigation and accessibility
- Provide feedback on visual design, UX, accessibility, and responsiveness

Collect all findings from the review.

### Step 7 — Present Issues to the User

Combine findings from both reviews (code quality + UI/UX) into a single numbered list.
For each issue include:
- **#** — Sequential number
- **Source** — `Code Quality` or `UI/UX`
- **Severity** — Critical, Improvement, or Minor
- **Description** — What the issue is
- **Suggested Fix** — How to fix it
- **File** — Affected file(s) and line(s) if applicable

Present the list sorted by severity (Critical first) and ask the user:

> "Here are the issues found during review. Please tell me which ones to fix (e.g., `1, 3, 5` or `all` or `none`)."

### Step 8 — Fix Selected Issues

Fix only the issues the user selected. After fixing:
1. Run `npm run build` again to ensure no regressions
2. Run `npm run lint` again
3. Briefly summarize what was fixed

### Step 9 — Update the Plan

Update the plan file at `.claude/feat/$ARGUMENTS/plan.md` to add a `## Implementation Status` section at the bottom:

```markdown
## Implementation Status

- **Status:** Implemented
- **Date:** [current date]
- **Files Created/Modified:**
  - [list of files]
- **Review Issues Fixed:** [list of issue numbers fixed, or "none"]
- **Review Issues Deferred:** [list of issue numbers not fixed, or "none"]
```

## Rules

- Do NOT commit or push unless the user explicitly requests it.
- Do NOT skip the review steps — they are mandatory.
- Use context7 to look up docs for any library you use.
- Follow the architecture rules defined in CLAUDE.md strictly.
- If the build or lint fails, fix the errors before moving to reviews.
- Present ALL review issues to the user — do not silently fix or ignore any.
