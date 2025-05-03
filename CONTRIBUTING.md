# Contributing to Healthcare Portal Monorepo

Thank you for considering contributing! This guide outlines the standards and process for contributing to the project.

---

## Coding Standards

- **TypeScript only**: All code must be written in TypeScript.
- **Shared types**: Use types from `packages/shared-library` for all shared data structures (e.g., `UserPreferences`).
- **React**: Only one version of React/ReactDOM, hoisted to the root. MFEs must expose pure components, not pages.
- **Module Federation**: Use the standard shared config for React, ReactDOM, and jsx-runtime. Exposes must point to components.
- **API**: All endpoints must use shared types for request/response shapes.
- **Testing**: All new features must include Playwright tests. Use robust selectors (`data-testid`, headings, labels).
- **Scripts**: Document all new scripts in the root `package.json` and/or `/scripts` directory.

---

## Pull Request Process

1. **Branch from `main`** for all new features and fixes.
2. **Write or update Playwright tests** for any UI or API changes.
3. **Run all tests locally** before submitting a PR:
   - `npm run dev` (start all apps)
   - `npx playwright test` (run all tests)
4. **Update documentation** (`README.md`, `/docs`, or inline comments) for any new features, types, or endpoints.
5. **Submit a pull request** with a clear description of the change.
6. **Code review**: At least one other team member must review and approve the PR.
7. **Merge**: Only after all tests pass and the PR is approved.

---

## Adding a New MFE
- Scaffold in `/apps`.
- Expose a pure React component.
- Add Playwright tests for startup and key UI.
- Update the host app to load the new MFE.
- Add any new shared types to the shared library.

## Adding a New API Endpoint
- Add a new file in `/apps/host-app/src/pages/api/`.
- Type the response using shared types from the shared library.
- Document the endpoint in the README.

## Updating User Preferences Structure
- Update `UserPreferences` in `shared-library`.
- Update all usages in MFEs, host, and API.
- Update Playwright tests if UI changes.
- Commit and push changes.

---

## Best Practices
- Use `data-testid` for key UI elements to make tests robust.
- Keep Playwright tests in sync with UI.
- Run all tests before merging or deploying.
- Document all new endpoints, types, and scripts.

---

## Questions?
Open an issue or reach out to the maintainers for help. 