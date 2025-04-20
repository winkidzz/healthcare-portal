# Healthcare Portal Technical Context

## Technology Stack

### Core Technologies
- **Next.js**
  - Host App: 14.1.0 (webpack)
  - MFEs: 15.3.1 (Turbopack)
- **TypeScript**: Latest version
- **React**: Latest version
- **Tailwind CSS**: Latest version

### Build Tools
- **Webpack**: Used in host app
- **Turbopack**: Used in micro-frontends
- **Module Federation**: For micro-frontend integration

### Testing
- **Playwright**: For E2E testing
- **Jest**: For unit testing
- **React Testing Library**: For component testing

## Development Setup

### Directory Structure
```
/Users/sanantha/cursorprojects/
├── host-app/              # Main container app
├── preferences-mfe/       # Preferences micro-frontend
├── icd-tests-mfe/        # ICD Tests micro-frontend
├── shared-library/       # Shared components
└── headless-core/        # Core business logic
```

### Port Configuration
- Port 3000: Host App (http://localhost:3000)
- Port 3001: Preferences MFE (http://localhost:3001)
- Port 3002: ICD Tests MFE (http://localhost:3002)

### Environment Variables
- Host App: NEXT_PRIVATE_LOCAL_WEBPACK=true
- MFEs: --turbopack flag

## Dependencies

### Shared Dependencies
```javascript
shared: {
  react: {
    singleton: true,
    requiredVersion: false,
    eager: true,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: false,
    eager: true,
  },
}
```

### Development Dependencies
- @module-federation/nextjs-mf
- webpack
- typescript
- @types/react
- @types/node
- eslint
- prettier

## Technical Constraints

### Version Compatibility
- Next.js version differences between host and MFEs
- Module Federation warnings are expected

### Build System
- Webpack/Turbopack configuration warnings are expected
- Module Federation warnings about absolute path resolution

### Performance
- Bundle size optimization needed
- Code splitting implementation
- Caching strategy development

## Tool Usage Patterns

### Development Commands
1. Start Host App:
   ```bash
   cd host-app && NEXT_PRIVATE_LOCAL_WEBPACK=true npm run dev
   # Runs on http://localhost:3000
   ```

2. Start Preferences MFE:
   ```bash
   cd preferences-mfe && npm run dev
   # Runs on http://localhost:3001
   ```

3. Start ICD Tests MFE:
   ```bash
   cd icd-tests-mfe && npm run dev
   # Runs on http://localhost:3002
   ```

### Testing Commands
```bash
# Run tests
cd host-app && npm run test
```

## Known Issues

### Module Federation
- "Manifest will use absolute path resolution via its host at runtime"
- "Webpack is configured while Turbopack is not"
- These warnings are expected and can be ignored

### Port Configuration
- Fixed port assignments required:
  - 3000: Host App
  - 3001: Preferences MFE
  - 3002: ICD Tests MFE

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier
- Maintain consistent formatting

### Component Development
- Use functional components
- Implement proper TypeScript types
- Follow atomic design principles

### Testing
- Write unit tests for components
- Implement integration tests
- Maintain test coverage 