# Preferences Micro-Frontend

## Overview
The Preferences MFE is a page-based micro-frontend that handles user preferences and settings in the Healthcare Portal.

## Architecture

### Routing Strategy
- **Type**: Page-based (Pages Directory)
- **Location**: `src/pages/`
- **Reasoning**: 
  - Module Federation compatibility
  - Simpler routing needs
  - Integration with legacy systems

### Project Structure
```
src/
  pages/           # Page-based routing
    index.tsx
    preferences/
      index.tsx
  components/      # Reusable components
  lib/            # Shared utilities
  providers/      # Context providers
  styles/         # Global styles
  types/          # TypeScript types
```

## Configuration
- Uses Next.js Pages Router
- Implements Module Federation
- Follows enterprise strategy guidelines

## Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

### Testing
```bash
npm run test
```

## Integration
- Exposes `/preferences` route
- Uses Module Federation for integration
- Shares common dependencies with host

## Best Practices
- Follows page-based routing conventions
- Implements proper error boundaries
- Uses TypeScript for type safety
- Implements comprehensive testing 