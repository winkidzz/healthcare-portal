# Cursor Rules Configuration

## Memory Bank Usage Rules

### 1. Documentation Structure
- Use the memory bank folder as the single source of truth
- Follow the established documentation hierarchy:
  - `projectbrief.md`: High-level project overview
  - `productContext.md`: Product goals and user experience
  - `systemPatterns.md`: Technical architecture and patterns
  - `techContext.md`: Technical stack and setup
  - `activeContext.md`: Current work and recent changes
  - `rules.md`: Cursor configuration rules

### 2. Port Configuration Rules
- Host App must run on port 3000
- Preferences MFE must run on port 3001
- ICD Tests MFE must run on port 3002
- No dynamic port assignment allowed
- Port conflicts must be resolved manually

### 3. Startup Sequence Rules
1. Start Host App first:
   ```bash
   cd host-app && NEXT_PRIVATE_LOCAL_WEBPACK=true npm run dev
   ```

2. Start Preferences MFE:
   ```bash
   cd preferences-mfe && npm run dev
   ```

3. Start ICD Tests MFE:
   ```bash
   cd icd-tests-mfe && npm run dev
   ```

### 4. Build Tool Rules
- Host App must use webpack (NEXT_PRIVATE_LOCAL_WEBPACK=true)
- Micro-frontends must use Turbopack (--turbopack flag)
- Module Federation warnings can be ignored
- Webpack/Turbopack configuration warnings can be ignored

### 5. Documentation Update Rules
- Update documentation when:
  - Port assignments change
  - Startup sequence changes
  - Build tool configuration changes
  - New issues are identified
  - New patterns are established

### 6. Testing Rules
- Run tests from host-app directory
- Use Playwright for E2E testing
- Follow established testing patterns
- Maintain test coverage

### 7. Error Handling Rules
- Document all known issues
- Update activeContext.md with new issues
- Follow established error handling patterns
- Implement proper error boundaries

### 8. Version Management Rules
- Document version differences
- Track compatibility issues
- Update documentation when versions change
- Maintain version compatibility matrix

### 9. Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier
- Maintain consistent formatting
- Follow atomic design principles

### 10. Memory Bank Update Rules
- Update relevant files when changes occur
- Maintain consistency across all files
- Cross-reference related information
- Keep documentation up to date

### 11. Sequential Thinking MCP Rules

## Parameter Structure and Validation

### Required Parameters
- `thought` (string): The current thinking step
  - Must be a non-empty string
  - Cannot contain only whitespace
- `nextThoughtNeeded` (boolean): Whether another thought is needed
  - Must be exactly `true` or `false`
  - Cannot be a string or number
- `thoughtNumber` (integer): Current thought number
  - Must be a positive integer (≥ 1)
  - Cannot be a string or float
- `totalThoughts` (integer): Total thoughts needed
  - Must be a positive integer (≥ 1)
  - Cannot be a string or float

### Optional Parameters
- `isRevision` (boolean): Whether this is a revision
  - Must be exactly `true` or `false` if provided
  - Cannot be a string or number
- `revisesThought` (integer): Thought number being revised
  - Must be a positive integer (≥ 1) if provided
  - Cannot be a string or float
- `branchFromThought` (integer): Thought number to branch from
  - Must be a positive integer (≥ 1) if provided
  - Cannot be a string or float
- `branchId` (string): Branch identifier
  - Must be a non-empty string if provided
  - Cannot contain only whitespace
- `needsMoreThoughts` (boolean): Whether more thoughts are needed
  - Must be exactly `true` or `false` if provided
  - Cannot be a string or number

## Validation Rules
1. All required parameters must be provided
2. Parameter types must match exactly:
   - `nextThoughtNeeded` must be boolean (true/false)
   - `thoughtNumber` must be a positive integer
   - `totalThoughts` must be a positive integer
3. Optional parameters can be omitted or set to null
4. Revision parameters require both `isRevision` and `revisesThought`
5. Branch parameters require both `branchFromThought` and `branchId`

## Examples

### Basic Sequential Thinking
```json
{
  "thought": "Analyzing the current project state",
  "nextThoughtNeeded": true,
  "thoughtNumber": 1,
  "totalThoughts": 5
}
```

### Revision of Previous Thought
```json
{
  "thought": "Revising previous analysis",
  "nextThoughtNeeded": true,
  "thoughtNumber": 2,
  "totalThoughts": 5,
  "isRevision": true,
  "revisesThought": 1
}
```

### Branching Thought Process
```json
{
  "thought": "Exploring alternative approach",
  "nextThoughtNeeded": true,
  "thoughtNumber": 3,
  "totalThoughts": 5,
  "branchFromThought": 2,
  "branchId": "alternative-1"
}
```

## Best Practices
1. Start with a clear initial thought
2. Maintain logical progression between thoughts
3. Use revisions when needed to correct or clarify
4. Document branching points clearly
5. Keep track of total thoughts needed
6. Validate all parameters before execution
7. Use proper error handling for invalid parameters
8. Always use exact boolean values (true/false)
9. Always use integers for thought numbers
10. Never use strings for boolean or numeric values

## Cursor Configuration

### File Watching
- Monitor all memory bank files for changes
- Update related files when changes occur
- Maintain consistency across documentation

### Command Execution
- Follow documented startup sequence
- Use correct environment variables
- Maintain port assignments
- Follow build tool rules

### Documentation Management
- Keep all documentation in memory bank
- Update documentation when changes occur
- Maintain consistency across files
- Follow established patterns

### Error Handling
- Document all errors in activeContext.md
- Update documentation when errors are resolved
- Follow established error handling patterns
- Maintain error tracking

### Testing
- Follow documented testing procedures
- Update documentation with test results
- Maintain test coverage
- Follow testing patterns

# Healthcare Portal Project Rules and Configuration

## 1. Project Structure
```
/Users/sanantha/cursorprojects/
├── host-app/              # Main container app (Next.js 14.1.0)
├── preferences-mfe/       # Preferences micro-frontend (Next.js 15.3.1)
├── icd-tests-mfe/        # ICD Tests micro-frontend (Next.js 15.3.1)
├── shared-library/       # Shared components and utilities
└── headless-core/        # Core business logic
```

## 2. Current Port Assignments
- Preferences MFE: http://localhost:3001
- ICD Tests MFE: http://localhost:3002
- Host App: http://localhost:3005 (dynamic port assignment)

## 3. Development Commands

### 3.1 Starting Applications
```bash
# Start Preferences MFE
cd preferences-mfe && npm run dev
# Note: Uses Turbopack (--turbopack flag)

# Start ICD Tests MFE
cd icd-tests-mfe && npm run dev
# Note: Uses Turbopack (--turbopack flag)

# Start Host App
cd host-app && NEXT_PRIVATE_LOCAL_WEBPACK=true npm run dev
# Note: Uses webpack (NEXT_PRIVATE_LOCAL_WEBPACK=true)
```

### 3.2 Important Notes
- Host App uses Next.js 14.1.0 with webpack
- Micro-frontends use Next.js 15.3.1 with Turbopack
- Warning: "Webpack is configured while Turbopack is not" in micro-frontends
- Port conflicts are automatically resolved by Next.js

## 4. Module Federation Configuration

### 4.1 Host App (host-app/next.config.mjs)
```javascript
remotes: {
  preferences: `preferences@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
  icdTests: `icdTests@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
}
```

### 4.2 Shared Dependencies
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

## 5. Common Issues and Solutions

### 5.1 Port Conflicts
- Next.js automatically tries next available port
- Current port assignments:
  - 3000: Reserved
  - 3001: Preferences MFE
  - 3002: ICD Tests MFE
  - 3003-3005: Host App (dynamic)

### 5.2 Module Federation Warnings
- "Manifest will use absolute path resolution via its host at runtime"
- "Webpack is configured while Turbopack is not"
- These warnings are expected and can be ignored

### 5.3 Version Mismatch
- Host: Next.js 14.1.0
- MFEs: Next.js 15.3.1
- Consider aligning versions if issues arise

## 6. Development Workflow

### 6.1 Starting Order
1. Start Preferences MFE (port 3001)
2. Start ICD Tests MFE (port 3002)
3. Start Host App (dynamic port)

### 6.2 Environment Variables
- Host App requires: NEXT_PRIVATE_LOCAL_WEBPACK=true
- MFEs use: --turbopack flag

## 7. Testing

### 7.1 Test Configuration
- Use Playwright for E2E testing
- Configure tests to handle dynamic port assignment
- Implement proper waiting conditions for MFE loading

### 7.2 Test Execution
```bash
cd host-app && npm run test
```

## 8. Troubleshooting

### 8.1 Common Errors
- "Port is in use": Next.js will automatically try next available port
- "Could not read package.json": Ensure you're in the correct directory
- "cd: no such file or directory": Verify directory structure

### 8.2 Module Federation Issues
- Check remoteEntry.js paths in configuration
- Verify shared dependencies are properly configured
- Ensure webpack is enabled in host app

## 9. Design Specifications

### 9.1 Color Palette
```css
Primary Colors:
- Primary: #0070f3
- Secondary: #7928ca
- Accent: #ff0080

Neutral Colors:
- Background: #ffffff
- Text: #000000
- Gray: #666666
```

### 9.2 Typography
- Font Family: System fonts with fallbacks
- Heading Sizes:
  - h1: 2.5rem
  - h2: 2rem
  - h3: 1.75rem
  - h4: 1.5rem
- Body Text: 1rem (16px)

## 10. Performance Guidelines
- Implement proper image optimization
- Use Next.js Image component
- Implement code splitting
- Optimize bundle size
- Use proper caching strategies

## 11. Accessibility Standards
- WCAG 2.1 AA compliance
- Proper ARIA labels
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

This document should be updated as the project evolves and new requirements or configurations are added. 