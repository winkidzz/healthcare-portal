# App-based Micro-Frontend Template

## Overview
This template outlines the structure and guidelines for creating App-based micro-frontends in the Healthcare Portal.

## Architecture

### Routing Strategy
- **Type**: App-based (App Directory)
- **Location**: `src/app/`
- **Use Cases**:
  - Advanced routing features needed
  - Server Components required
  - Enhanced performance requirements

### Project Structure
```
src/
  app/            # App-based routing
    layout.tsx
    page.tsx
    [route]/
      page.tsx
  components/     # Reusable components
  lib/           # Shared utilities
  providers/     # Context providers
  styles/        # Global styles
  types/         # TypeScript types
```

## Configuration

### next.config.mjs
```javascript
const nextConfig = {
  experimental: {
    // App directory specific features
  }
};
```

## Best Practices

### 1. Server Components
- Use Server Components by default
- Mark Client Components with 'use client'
- Implement proper data fetching

### 2. Routing
- Use App Router features
- Implement proper loading states
- Handle errors appropriately

### 3. Performance
- Implement proper caching
- Use React Suspense
- Optimize bundle sizes

### 4. Testing
- Implement comprehensive testing
- Include server component tests
- Test loading and error states

## Integration Guidelines

### 1. Boundaries
- Define clear integration points
- Document API contracts
- Implement proper error handling

### 2. Communication
- Use shared libraries
- Implement proper state management
- Document data flow

### 3. Deployment
- Follow CI/CD guidelines
- Implement proper versioning
- Document deployment process

## Example Implementation

### Layout
```typescript
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Page
```typescript
// src/app/page.tsx
export default function Page() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
}
``` 