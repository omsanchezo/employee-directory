# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite HMR on default port)
- **Mock API:** `npm run mock` (json-server on port 3001, serves `db.json`)
- **Build:** `npm run build` (runs `tsc -b` then `vite build`, output in `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript + React hooks rules)
- **Preview prod build:** `npm run preview`

## Tech Stack

- React 19 + TypeScript (~5.9) + Vite 7
- **State management:** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`). Store at `src/store/store.ts` with typed `RootState` and `AppDispatch`.
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Global import in `src/index.css`.
- **Forms:** React Hook Form + `@hookform/resolvers` with Zod validation
- **Tables:** TanStack React Table v8
- **Mock backend:** json-server serving `db.json` with `employees` and `departments` collections

## Architecture

This is an early-stage project scaffolded from the Vite React-TS template. The app entry point is `src/main.tsx` which wraps `<App>` in a Redux `<Provider>`. Currently the Redux store has no slices — add feature slices under `src/store/`.

The `db.json` file at the project root serves as the mock REST API (json-server). Employee fields: `id`, `firstName`, `lastName`, `email`, `position`, `department`, `startDate`, `status`.

## Code Style

- Use comments sparingly. Only comment complex code.

- When creating a new RTK Query endpoint, always add proper TypeScript types for the response.

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Documentation Lookup

- Always use context7 to check up-to-date docs when implementing or modifying code that uses RTK Query, React Hook Form, Zod, TanStack Table, or any third-party library.

## Git Policy

- NEVER commit or push unless the user explicitly requests it.

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development
