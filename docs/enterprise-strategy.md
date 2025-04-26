# Healthcare Portal Enterprise Strategy

## Architecture Overview

The Healthcare Portal follows a hybrid architecture approach, combining different strategies based on the specific needs of each micro-frontend (MFE).

## Routing Strategies

### Hybrid Mode Guidelines

1. **Page-based Routing (Pages Directory)**
   - Used for MFEs that require:
     - Module Federation compatibility
     - Simpler routing needs
     - Legacy system integration
   - Example: Preferences MFE
   - Location: `src/pages/`

2. **App-based Routing (App Directory)**
   - Used for MFEs that require:
     - Advanced routing features
     - Server Components
     - Enhanced performance
   - Example: ICD Test MFE
   - Location: `src/app/`

### Key Principles

1. **Consistency Within MFEs**
   - Each MFE must follow exactly one routing strategy
   - No mixing of pages and app directories within a single MFE
   - Clear documentation of chosen strategy in MFE's README

2. **Module Federation Compatibility**
   - Page-based MFEs are preferred for Module Federation
   - App-based MFEs should be designed with clear boundaries

3. **Documentation Requirements**
   - Each MFE must document its chosen strategy
   - Include reasoning for the chosen approach
   - Document any limitations or considerations

## Implementation Guidelines

### For Page-based MFEs
```typescript
// Structure
src/
  pages/
    index.tsx
    [route].tsx
  components/
  lib/
  // ... other directories
```

### For App-based MFEs
```typescript
// Structure
src/
  app/
    layout.tsx
    page.tsx
    [route]/
      page.tsx
  components/
  lib/
  // ... other directories
```

## Configuration Examples

### Page-based MFE (next.config.mjs)
```javascript
const nextConfig = {
  // Page-based configuration
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        // Module Federation config
      })
    );
    return config;
  }
};
```

### App-based MFE (next.config.mjs)
```javascript
const nextConfig = {
  // App-based configuration
  experimental: {
    // App directory specific features
  }
};
```

## Best Practices

1. **Clear Boundaries**
   - Define clear integration points between MFEs
   - Document communication patterns
   - Use shared libraries for common functionality

2. **Performance Considerations**
   - Optimize bundle sizes
   - Implement proper code splitting
   - Use appropriate caching strategies

3. **Testing Strategy**
   - Implement comprehensive testing
   - Include integration tests
   - Document test coverage requirements

4. **Documentation**
   - Maintain up-to-date README files
   - Document API contracts
   - Include setup and deployment instructions 