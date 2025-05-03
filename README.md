# Healthcare Portal Monorepo

## Overview
A modern healthcare portal built with Next.js, Module Federation, and a microfrontend (MFE) architecture. This monorepo contains a host app and multiple MFEs, all sharing a unified type system and development standards.

---

## Project Structure

```
/apps
  /host-app           # Main portal (host) app
  /preferences-mfe    # Preferences microfrontend (MFE)
  /icd-tests-mfe      # ICD Tests microfrontend (MFE)
/packages
  /shared-library     # Shared types, utilities, and components
  /api-client         # (Optional) Shared API client logic
/tests                # Playwright and other end-to-end tests
/scripts              # Utility scripts for dev/ops
```

---

## Development Standards

### TypeScript
- All code must be written in TypeScript.
- Shared types (e.g., `UserPreferences`) must be imported from the shared library.

### React
- Only one version of React and ReactDOM, hoisted to the root.
- MFEs must expose pure components, not pages.
- No direct use of Next.js router/hooks in exposed MFE components; navigation is handled by the host.

### Module Federation
- All MFEs and the host must use the same shared config for React, ReactDOM, and jsx-runtime:
  ```js
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0', eager: true, strictVersion: true },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0', eager: true, strictVersion: true },
    'react/jsx-runtime': { singleton: true, requiredVersion: '^18.2.0', eager: true, strictVersion: true },
  }
  ```
- Exposes must point to components, not pages.

### API
- The `/api/preferences` endpoint in the host app must return the canonical `UserPreferences` structure.
- Any new API endpoints must be documented and typed.

### Testing
- All apps must have Playwright tests that:
  - Confirm the app starts and renders key UI.
  - Use robust selectors (`data-testid`, headings, labels).
  - Are kept up to date with UI changes.
- Run `npm run dev` to start all apps in the correct order for local development.
- Run `npx playwright test` to execute all end-to-end tests.

### Scripts
- Use `npm run dev` from the root to start all apps in the correct order (uses `concurrently`).
- Use `npm run build` for a full monorepo build (uses `turbo`).

---

## Key Scripts

- **Start all apps:**  `npm run dev`
- **Build all apps:**  `npm run build`
- **Run all tests:**   `npx playwright test`
- **Clean all builds:** `npm run clean`
- **Type check:**      `npm run typecheck`

---

## Shared Types & Source of Truth
- The `UserPreferences` type in `packages/shared-library/src/types/preferences.ts` is the single source of truth for user preferences.
- All apps and APIs must use this type for consistency and type safety.

---

## Adding a New MFE
1. Scaffold a new app in `/apps`.
2. Expose a pure React component via Module Federation.
3. Add the shared config for React/ReactDOM.
4. Add Playwright tests for startup and key UI.
5. Update the host app to load the new MFE.
6. Add any new shared types to the shared library.

---

## Adding a New API Endpoint
1. Add a new file in `/apps/host-app/src/pages/api/`.
2. Type the response using shared types from the shared library.
3. Document the endpoint in the README.

---

## Updating User Preferences Structure
1. Update `UserPreferences` in `shared-library`.
2. Update all usages in MFEs, host, and API.
3. Update Playwright tests if UI changes.
4. Commit and push changes.

---

## Best Practices
- Always use shared types.
- Keep Playwright tests in sync with UI.
- Document all new endpoints, types, and scripts.
- Use data-testid for key UI elements to make tests robust.
- Run all tests before merging or deploying.

---

## Contributing & Further Development
- See `CONTRIBUTING.md` for coding standards and review process.
- Add deeper guides in `/docs` as needed.
- Use this README as the main onboarding and standards reference.

---

## Troubleshooting
- If you see `ENOWORKSPACES` warnings, they are safe to ignore as long as the app starts.
- If Playwright tests fail, verify the UI and selectors, and update tests as needed.
- For any React hook or module federation errors, ensure all apps use the same React version and shared config.

---

## Contact
For questions, reach out to the project maintainers or open an issue in the repository.
