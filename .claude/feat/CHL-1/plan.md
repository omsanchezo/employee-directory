# Implementation Plan: CHL-1

## Story Summary
**Add real-time search filter to employees table**

As a user, I want a search input above the employees table that filters employees by name in real-time as I type, so I can quickly find the employee I'm looking for without scrolling through the entire list.

## Acceptance Criteria
- Search input is visible above the employees table
- Filters by first name OR last name (case-insensitive)
- Filtering happens in real-time as the user types (no submit button needed)
- When the search input is empty, all employees are displayed
- The input has clear placeholder text (e.g., "Search by name...")

## Technical Analysis

### Affected Areas
- `src/features/employees/presentation/pages/EmployeesPage.tsx` — Add search state and filtering logic
- No new files needed; this is a small UI addition to the existing page

### Dependencies
- No new libraries required. Uses React `useState` + `useMemo` (already imported in EmployeesPage).

### Data Model Changes
- None. Filtering is client-side on already-fetched data.

## Implementation Steps

### Step 1 — Add search state to EmployeesPage (presentation layer)
- **File:** `src/features/employees/presentation/pages/EmployeesPage.tsx`
- Add `const [searchTerm, setSearchTerm] = useState("")`
- Update the existing `filteredEmployees` memo to also filter by `searchTerm` against `firstName` and `lastName` (case-insensitive, using `.toLowerCase().includes()`)

### Step 2 — Add search input UI to EmployeesPage (presentation layer)
- **File:** `src/features/employees/presentation/pages/EmployeesPage.tsx`
- Add a text input above the table (alongside the existing department filter) with:
  - `placeholder="Search by name..."`
  - `value={searchTerm}` and `onChange` handler
  - Tailwind styling consistent with the existing department `<select>`

## API Endpoints
- No changes. Filtering is done client-side on the data from `GET /employees`.

## Validation & Forms
- Not applicable. This is a simple controlled input, no form submission or Zod schema needed.

## Verification
1. Run `npm run mock` and `npm run dev`
2. Verify search input appears above the table
3. Type a first name (e.g., "Ana") — only matching rows should show
4. Type a last name (e.g., "García") — matching rows should show
5. Clear the input — all employees should display
6. Combine with department filter — both filters should work together
7. Verify case-insensitive matching (e.g., "ana" matches "Ana")

## Open Questions
- None. The story is clear and well-scoped.

## Implementation Status

- **Status:** Implemented
- **Date:** 2026-03-05
- **Files Created/Modified:**
  - `src/features/employees/presentation/pages/EmployeesPage.tsx` (modified)
- **Review Issues Fixed:** 1, 2
- **Review Issues Deferred:** none
