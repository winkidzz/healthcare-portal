# Healthcare Portal System Patterns

## Architecture Overview
The system follows a micro-frontend architecture with the following components:

```
/Users/sanantha/cursorprojects/
├── host-app/              # Main container app (Next.js 14.1.0)
├── preferences-mfe/       # Preferences micro-frontend (Next.js 15.3.1)
├── icd-tests-mfe/        # ICD Tests micro-frontend (Next.js 15.3.1)
├── shared-library/       # Shared components and utilities
└── headless-core/        # Core business logic
```

## Module Federation Configuration

### Host App Configuration
```javascript
remotes: {
  preferences: `preferences@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
  icdTests: `icdTests@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
}
```

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

## Port Configuration
- Port 3000: Host App (http://localhost:3000)
- Port 3001: Preferences MFE (http://localhost:3001)
- Port 3002: ICD Tests MFE (http://localhost:3002)

## Development Patterns

### Starting Applications
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

### Build Tools
- Host App: Webpack (NEXT_PRIVATE_LOCAL_WEBPACK=true)
- Micro-frontends: Turbopack (--turbopack flag)

## Component Architecture

### Atomic Design Principles
1. **Atoms**: Basic building blocks (buttons, inputs, etc.)
2. **Molecules**: Groups of atoms (forms, cards, etc.)
3. **Organisms**: Complex UI components (headers, footers, etc.)
4. **Templates**: Page layouts
5. **Pages**: Complete pages

### Shared Components
- Located in shared-library
- Used across all micro-frontends
- Maintain consistent styling and behavior

## State Management

### Global State
- React Context for shared state
- Proper state synchronization between MFEs
- Consistent loading and error states

### MFE State
- Each MFE manages its own internal state
- State hydration from host
- Consistent state management patterns

## Performance Patterns
1. Code splitting
2. Lazy loading for MFEs
3. Optimized bundle size
4. Proper caching strategies
5. Minimized shared dependencies

## Error Handling
1. Independent module error boundaries
2. Graceful degradation
3. Clear error messages
4. Automatic recovery where possible

## Testing Patterns
1. Unit tests for components
2. Integration tests for features
3. Performance testing
4. Accessibility testing
5. MFE integration testing 