# Copilot Instructions for Agenda Generator

## Project Overview

A React application that generates formatted agenda text in two formats by consuming data from Google Sheets via a Vercel serverless API. Users load a CSV URL once and can generate text in two formats with button clicks.

**Tech Stack:** React 17, Vite, TailwindCSS, Jest, Vercel Serverless Functions

---

## Build, Test & Lint Commands

### Development
```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
```

### Testing
```bash
npm test                            # Run all tests with Jest
npm test -- src/hooks/useGetSchedule.test.js   # Run single test file
npm test -- --testNamePattern="test name"      # Run tests matching a pattern
npm test -- --coverage             # Generate coverage report
```

### Building & Serving
```bash
npm run build            # Build production bundle to /dist
npm run serve            # Preview production build locally
```

### Linting
ESLint is configured in `.eslintrc.json`. Formatting is enforced via Prettier (configured as ESLint rule).

---

## Architecture

### Frontend Structure
- **Entry:** `src/main.jsx` → `src/App.jsx` 
- **Components:** `src/components/` - React components using PropTypes and Tailwind styling
  - `Form.jsx` - CSV URL input form with custom URL toggle
  - `Schedule.jsx` - Main schedule display orchestrator
  - `Activities.jsx` - Renders dependency groups (organizations)
  - `DependencyActivities.jsx` - Individual activity list per dependency
  - `Container.jsx` & `Footer.jsx` - Layout wrappers
- **Hooks:** `src/hooks/useGetSchedule.js` - Manages API calls, status, and data fetching
- **Utilities:** `src/utils/` - Pure functions for data transformation
  - `formatActivitiesTime()` - Time formatting
  - `sortByTime()` - Activity sorting
  - `getDependencyName()` - Extract org name from schedule object
  - `getFormatedDate()` - Format dates for display

### Backend (API)
- **Serverless Function:** `api/index.js` (Vercel)
  - Accepts `csvUrl` query param
  - Falls back to tomorrow's default Google Sheet if no URL provided
  - Fetches CSV, parses with PapaParse, sanitizes, and filters data
  - Returns JSON array of activities with properties removed

### Data Flow
1. User submits CSV URL in Form component
2. `useGetSchedule` hook calls `/api?csvUrl={url}`
3. API fetches CSV from Google Sheets, processes with PapaParse
4. Hook sets data state; components re-render Schedule with activities
5. Schedule component generates two formatted text versions (regular + WhatsApp)

---

## Key Conventions

### Component Patterns
- All components use **functional components** with React hooks
- Components accept `PropTypes` and validate them
- Styling uses **Tailwind utility classes** - no inline styles
- No TypeScript; plain JavaScript/JSX with `* as React` imports
- Components receive data and callbacks as props (no context)

### Hook Patterns  
- `useGetSchedule` uses destructured state with updater functions
- Effect dependency arrays are critical - check `csvUrl` and `getScheduleEnable`
- Axios `CancelToken` is used for cleanup on unmount to prevent memory leaks
- Always use `axios.CancelToken.source()` and call `cancel()` in cleanup

### Data Handling
- CSV data from Google Sheets arrives as flat objects per row
- Dependencies/organizations are identified by object keys that aren't numbers
- Activities are sorted by time (HH:mm format) for display
- Falsy values are removed from data before filtering
- Objects with no activities (all properties removed) are filtered out

### Testing
- Test environment is **jsdom** (configured in `jest.config.js`)
- Use `@testing-library/react-hooks` for hook testing
- Mock axios with `jest.mock('axios')` at top of test file
- Always mock `axios.CancelToken.source()` in `beforeEach` hook
- Tests should use `act()` for state updates and `waitFor()` for async assertions

### Linting Rules
- **Prettier:** 90-char line width, single quotes, trailing commas (es5)
- **ESLint:** React/hooks/a11y/tailwind linting enabled
- **Tailwind:** Class order is checked; contradicting classes error
- **Import order:** Warnings for unorganized imports with newlines between groups
- **React:** Props sorted alphabetically with callbacks last

### Styling Conventions
- Responsive design using Tailwind breakpoints (e.g., `sm:text-5xl`)
- Color palette: indigo/emerald primary, gray for secondary
- Container component wraps all content with consistent padding
- Form inputs use conditional styles based on state (e.g., `enableCustomUrl`)

---

## Important Notes

### Dependency Version Constraints
- React 17.0.2 (not React 18+) - affects testing library version choices
- Node 22.x required (check `package.json` engines field)

### Common Patterns to Follow
- Use `React.useState()` and `React.useEffect()` with full namespace
- Avoid creating new objects/functions in render - use memoization if passed to children
- API calls only trigger when `getScheduleEnable` is true AND `csvUrl` is set
- Always clean up axios requests with `CancelToken` to prevent "can't perform state update on unmounted component" warnings

### Testing Considerations
- Hook tests must mock `axios.CancelToken.source()` properly with token and cancel method
- `waitFor()` should be imported from `@testing-library/react`, not `react-hooks`
- Tests use `act()` wrapper for state updates triggered by prop changes or async operations
