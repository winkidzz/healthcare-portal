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

## Type Definitions and Validation

### Parameter Types
```typescript
interface SequentialThinkingParams {
  thought: string;
  nextThoughtNeeded: boolean;
  thoughtNumber: number;
  totalThoughts: number;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  needsMoreThoughts?: boolean;
}
```

### Type Validation
```javascript
const validateParams = (params) => {
  // Required parameters
  if (typeof params.thought !== 'string' || params.thought.trim() === '') {
    throw new Error('thought must be a non-empty string');
  }
  
  if (typeof params.nextThoughtNeeded !== 'boolean') {
    throw new Error('nextThoughtNeeded must be a boolean');
  }
  
  if (!Number.isInteger(params.thoughtNumber) || params.thoughtNumber < 1) {
    throw new Error('thoughtNumber must be a positive integer');
  }
  
  if (!Number.isInteger(params.totalThoughts) || params.totalThoughts < 1) {
    throw new Error('totalThoughts must be a positive integer');
  }
  
  // Optional parameters
  if (params.isRevision !== undefined && typeof params.isRevision !== 'boolean') {
    throw new Error('isRevision must be a boolean if provided');
  }
  
  if (params.revisesThought !== undefined && 
      (!Number.isInteger(params.revisesThought) || params.revisesThought < 1)) {
    throw new Error('revisesThought must be a positive integer if provided');
  }
  
  // Additional validations...
};
```

### Example Usage
```javascript
// Valid parameters
const validParams = {
  thought: "Analyzing cursor rules",
  nextThoughtNeeded: true,
  thoughtNumber: 1,
  totalThoughts: 4
};

// Invalid parameters (will throw error)
const invalidParams = {
  thought: "",  // Empty string not allowed
  nextThoughtNeeded: "true",  // String instead of boolean
  thoughtNumber: 1.5,  // Float instead of integer
  totalThoughts: 0  // Must be positive
};
```

## Sequential Thinking Process

### Step 1: Initial Analysis
```javascript
{
  thought: "Analyzing current cursor rules configuration",
  nextThoughtNeeded: true,
  thoughtNumber: 1,
  totalThoughts: 4
}
```

### Step 2: Validation Check
```javascript
{
  thought: "Validating parameter types and constraints",
  nextThoughtNeeded: true,
  thoughtNumber: 2,
  totalThoughts: 4
}
```

### Step 3: Implementation Review
```javascript
{
  thought: "Reviewing implementation and error handling",
  nextThoughtNeeded: true,
  thoughtNumber: 3,
  totalThoughts: 4
}
```

### Step 4: Final Verification
```javascript
{
  thought: "Verifying complete process and documentation",
  nextThoughtNeeded: false,
  thoughtNumber: 4,
  totalThoughts: 4
}
```

## Error Handling Examples

### Type Errors
```javascript
// Invalid boolean
throw new Error('nextThoughtNeeded must be a boolean, got string');

// Invalid number
throw new Error('thoughtNumber must be a positive integer, got float');

// Invalid string
throw new Error('thought must be a non-empty string, got empty string');
```

### Validation Errors
```javascript
// Sequential numbering error
throw new Error('thoughtNumber must be sequential');

// Total thoughts error
throw new Error('totalThoughts must be >= thoughtNumber');

// Branch reference error
throw new Error('branchFromThought must be < current thoughtNumber');
```

## Best Practices for Implementation

1. Always validate parameter types before processing
2. Use strict type checking (=== instead of ==)
3. Handle all edge cases explicitly
4. Provide clear error messages
5. Document all validation rules
6. Test with both valid and invalid inputs
7. Maintain consistent error handling
8. Log validation failures for debugging
9. Use proper type definitions
10. Follow sequential numbering rules

## Parameter Structure and Validation

### Required Parameters
- `thought` (string): The current thinking step
  - Must be a non-empty string
  - Cannot contain only whitespace
  - Must be properly escaped if containing special characters
- `nextThoughtNeeded` (boolean): Whether another thought is needed
  - Must be exactly `true` or `false`
  - Cannot be a string or number
  - Must be lowercase
- `thoughtNumber` (integer): Current thought number
  - Must be a positive integer (≥ 1)
  - Cannot be a string or float
  - Must be within the range of totalThoughts
- `totalThoughts` (integer): Total thoughts needed
  - Must be a positive integer (≥ 1)
  - Cannot be a string or float
  - Must be greater than or equal to thoughtNumber

### Optional Parameters
- `isRevision` (boolean): Whether this is a revision
  - Must be exactly `true` or `false` if provided
  - Cannot be a string or number
  - Must be lowercase
- `revisesThought` (integer): Thought number being revised
  - Must be a positive integer (≥ 1) if provided
  - Cannot be a string or float
  - Must be less than current thoughtNumber
- `branchFromThought` (integer): Thought number to branch from
  - Must be a positive integer (≥ 1) if provided
  - Cannot be a string or float
  - Must be less than current thoughtNumber
- `branchId` (string): Branch identifier
  - Must be a non-empty string if provided
  - Cannot contain only whitespace
  - Must be alphanumeric with hyphens or underscores
- `needsMoreThoughts` (boolean): Whether more thoughts are needed
  - Must be exactly `true` or `false` if provided
  - Cannot be a string or number
  - Must be lowercase

## Validation Rules
1. All required parameters must be provided
2. Parameter types must match exactly:
   - `nextThoughtNeeded` must be boolean (true/false)
   - `thoughtNumber` must be a positive integer
   - `totalThoughts` must be a positive integer
3. Optional parameters can be omitted or set to null
4. Revision parameters require both `isRevision` and `revisesThought`
5. Branch parameters require both `branchFromThought` and `branchId`
6. Parameter values must be properly formatted:
   - Booleans must be lowercase
   - Integers must be positive
   - Strings must be non-empty
7. Thought numbers must be sequential
8. Total thoughts must be greater than or equal to current thought number
9. Branch and revision numbers must be less than current thought number

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
11. Ensure proper parameter formatting
12. Maintain sequential thought numbering
13. Validate branch and revision numbers
14. Use proper string escaping when needed

## Error Handling
1. Invalid parameter types:
   - Return clear error messages
   - Specify expected type
   - Provide example of correct format
2. Missing required parameters:
   - List all missing parameters
   - Provide example of complete parameter set
3. Invalid parameter values:
   - Explain value constraints
   - Provide valid value examples
4. Sequential numbering errors:
   - Verify thought number sequence
   - Check total thoughts value
5. Branch and revision errors:
   - Validate reference numbers
   - Ensure proper parameter pairs

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

## 12. Cursor Rules Configuration

### 12.1 Project Structure Rules
- Maintain the following directory structure:
  ```
  /Users/sanantha/cursorprojects/
  ├── host-app/              # Main container app (Next.js 14.1.0)
  ├── preferences-mfe/       # Preferences micro-frontend (Next.js 15.3.1)
  ├── icd-tests-mfe/        # ICD Tests micro-frontend (Next.js 15.3.1)
  ├── shared-library/       # Shared components and utilities
  └── headless-core/        # Core business logic
  ```
- Keep all configuration files in their respective directories
- Maintain consistent file naming conventions

### 12.2 Port Configuration Rules
- Host App must run on port 3000
- Preferences MFE must run on port 3001
- ICD Tests MFE must run on port 3002
- No dynamic port assignment allowed
- Port conflicts must be resolved manually

### 12.3 Build Tool Rules
- Host App must use webpack (NEXT_PRIVATE_LOCAL_WEBPACK=true)
- Micro-frontends must use Turbopack (--turbopack flag)
- Module Federation warnings can be ignored
- Webpack/Turbopack configuration warnings can be ignored

### 12.4 Documentation Rules
- Update documentation when:
  - Port assignments change
  - Startup sequence changes
  - Build tool configuration changes
  - New issues are identified
  - New patterns are established
- Follow the established documentation hierarchy:
  - `projectbrief.md`: High-level project overview
  - `productContext.md`: Product goals and user experience
  - `systemPatterns.md`: Technical architecture and patterns
  - `techContext.md`: Technical stack and setup
  - `activeContext.md`: Current work and recent changes
  - `rules.md`: Cursor configuration rules

### 12.5 Development Rules
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Maintain consistent component structure
- Follow atomic design principles
- Implement proper error boundaries
- Use proper state management patterns

### 12.6 Testing Rules
- Run tests from host-app directory
- Use Playwright for E2E testing
- Follow established testing patterns
- Maintain test coverage
- Document test results

### 12.7 Error Handling Rules
- Document all known issues
- Update activeContext.md with new issues
- Follow established error handling patterns
- Implement proper error boundaries
- Maintain error tracking

### 12.8 Version Management Rules
- Document version differences
- Track compatibility issues
- Update documentation when versions change
- Maintain version compatibility matrix

### 12.9 Memory Bank Update Rules
- Update relevant files when changes occur
- Maintain consistency across all files
- Cross-reference related information
- Keep documentation up to date
- Follow established patterns

### 12.10 Sequential Thinking MCP Rules
- Use sequential thinking for complex problem-solving
- Document thought process in activeContext.md
- Follow established parameter structure
- Validate all parameters before execution
- Maintain logical progression between thoughts

### 12.11 Performance Rules
- Implement proper image optimization
- Use Next.js Image component
- Implement code splitting
- Optimize bundle size
- Use proper caching strategies

### 12.12 Accessibility Rules
- WCAG 2.1 AA compliance
- Proper ARIA labels
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

This document should be updated as the project evolves and new requirements or configurations are added.

## Parameter Handling Guidelines

### 1. Question Type Classification
```typescript
interface QuestionType {
  type: 'analysis' | 'implementation' | 'debugging' | 'configuration';
  complexity: 'simple' | 'moderate' | 'complex';
  requiresSequentialThinking: boolean;
}
```

### 2. Sequential Thinking Parameters
```typescript
interface SequentialThinkingParams {
  thought: string;          // Current thought/analysis step
  nextThoughtNeeded: false; // Must be boolean false, not string "false"
  thoughtNumber: number;    // Integer >= 1
  totalThoughts: number;    // Integer >= thoughtNumber
  isRevision?: boolean;     // Optional boolean
  revisesThought?: number;  // Optional integer >= 1
  branchFromThought?: number; // Optional integer >= 1
  branchId?: string;       // Optional non-empty string
}
```

### 3. Parameter Validation Rules

#### 3.1 Boolean Parameters
```javascript
// Correct
nextThoughtNeeded: false
isRevision: true

// Incorrect - Will Cause Errors
nextThoughtNeeded: "false"
isRevision: "true"
```

#### 3.2 Numeric Parameters
```javascript
// Correct
thoughtNumber: 1
totalThoughts: 4

// Incorrect - Will Cause Errors
thoughtNumber: "1"
totalThoughts: 1.5
```

#### 3.3 String Parameters
```javascript
// Correct
thought: "Analyzing system configuration"
branchId: "feature-analysis"

// Incorrect - Will Cause Errors
thought: ""  // Empty string
branchId: " " // Whitespace only
```

### 4. Question Processing Flow

1. Question Analysis
```javascript
{
  thought: "Analyzing question requirements",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 4
}
```

2. Parameter Validation
```javascript
{
  thought: "Validating required parameters",
  nextThoughtNeeded: false,
  thoughtNumber: 2,
  totalThoughts: 4
}
```

3. Implementation Planning
```javascript
{
  thought: "Planning implementation steps",
  nextThoughtNeeded: false,
  thoughtNumber: 3,
  totalThoughts: 4
}
```

4. Execution
```javascript
{
  thought: "Executing planned steps",
  nextThoughtNeeded: false,
  thoughtNumber: 4,
  totalThoughts: 4
}
```

### 5. Error Prevention Guidelines

#### 5.1 Common Errors to Avoid
- Using string "true"/"false" for boolean values
- Using floating-point numbers for integer parameters
- Using empty or whitespace-only strings
- Using non-sequential thought numbers
- Setting totalThoughts less than thoughtNumber

#### 5.2 Parameter Type Checking
```javascript
function validateParameters(params) {
  // Boolean validation
  if (typeof params.nextThoughtNeeded !== 'boolean') {
    throw new Error('nextThoughtNeeded must be boolean');
  }

  // Number validation
  if (!Number.isInteger(params.thoughtNumber) || params.thoughtNumber < 1) {
    throw new Error('thoughtNumber must be positive integer');
  }

  // String validation
  if (typeof params.thought !== 'string' || params.thought.trim() === '') {
    throw new Error('thought must be non-empty string');
  }
}
```

### 6. Best Practices for Question Processing

1. Always validate parameter types before processing
2. Use strict type checking (===)
3. Maintain sequential thought numbering
4. Document parameter requirements clearly
5. Handle all edge cases explicitly
6. Provide clear error messages
7. Log validation failures
8. Test with various input types
9. Follow consistent naming conventions
10. Keep documentation up to date

### 7. Implementation Examples

#### 7.1 Simple Question
```javascript
{
  thought: "Analyzing simple configuration question",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 1
}
```

#### 7.2 Complex Analysis
```javascript
{
  thought: "Starting complex system analysis",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 5,
  branchFromThought: 1,
  branchId: "detailed-analysis"
}
```

#### 7.3 Revision Example
```javascript
{
  thought: "Revising previous analysis",
  nextThoughtNeeded: false,
  thoughtNumber: 2,
  totalThoughts: 3,
  isRevision: true,
  revisesThought: 1
}
```

### 8. Documentation Requirements

1. Parameter Types
   - Document all required and optional parameters
   - Specify exact types and constraints
   - Provide usage examples

2. Error Messages
   - Document common error scenarios
   - Provide troubleshooting steps
   - Include example corrections

3. Best Practices
   - Document recommended approaches
   - Include anti-patterns to avoid
   - Provide optimization tips

4. Updates
   - Document all parameter changes
   - Update examples accordingly
   - Maintain change history

### 9. Testing Guidelines

1. Parameter Validation
   - Test all parameter combinations
   - Verify error handling
   - Check edge cases

2. Sequential Processing
   - Verify thought sequence
   - Test branching logic
   - Validate revision handling

3. Documentation
   - Update test cases
   - Document test results
   - Maintain test coverage

This document should be updated as the project evolves and new requirements or configurations are added.

## Query Processing Rules

### 1. Sequential Thinking Enforcement
- All queries MUST use sequential thinking
- Default sequential thinking parameters must be used
- No direct responses without sequential thinking process

### 2. Default Sequential Thinking Parameters
```typescript
interface DefaultSequentialThinkingParams {
  thought: string;
  nextThoughtNeeded: false;
  thoughtNumber: number;
  totalThoughts: number;
}
```

### 3. Query Processing Steps

#### 3.1 Initial Analysis
```javascript
{
  thought: "Analyzing query requirements and context",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 4
}
```

#### 3.2 Context Gathering
```javascript
{
  thought: "Gathering relevant context and information",
  nextThoughtNeeded: false,
  thoughtNumber: 2,
  totalThoughts: 4
}
```

#### 3.3 Solution Planning
```javascript
{
  thought: "Planning solution approach and steps",
  nextThoughtNeeded: false,
  thoughtNumber: 3,
  totalThoughts: 4
}
```

#### 3.4 Implementation
```javascript
{
  thought: "Implementing planned solution",
  nextThoughtNeeded: false,
  thoughtNumber: 4,
  totalThoughts: 4
}
```

### 4. Query Type Handling

#### 4.1 Simple Queries
```javascript
{
  thought: "Processing simple query",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 2
}
```

#### 4.2 Complex Queries
```javascript
{
  thought: "Starting complex query analysis",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 5
}
```

#### 4.3 Debugging Queries
```javascript
{
  thought: "Analyzing debugging query",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 4
}
```

### 5. Query Processing Rules

1. Every query must follow sequential thinking process
2. Minimum of 2 thoughts required for any query
3. Complex queries may require more thoughts
4. Each thought must be properly documented
5. Thought sequence must be logical and progressive
6. All thoughts must be properly parameterized
7. Final thought must set nextThoughtNeeded to false
8. Total thoughts must be appropriate for query complexity
9. Thought numbers must be sequential
10. Each thought must contribute to query resolution

### 6. Query Validation

#### 6.1 Required Parameters
```javascript
function validateQueryParams(params) {
  // Must have sequential thinking parameters
  if (!params.thought || !params.nextThoughtNeeded || 
      !params.thoughtNumber || !params.totalThoughts) {
    throw new Error('Missing required sequential thinking parameters');
  }
  
  // Must use proper boolean value
  if (params.nextThoughtNeeded !== false) {
    throw new Error('nextThoughtNeeded must be false');
  }
  
  // Must have valid thought numbers
  if (!Number.isInteger(params.thoughtNumber) || 
      !Number.isInteger(params.totalThoughts)) {
    throw new Error('Thought numbers must be integers');
  }
}
```

#### 6.2 Thought Sequence Validation
```javascript
function validateThoughtSequence(thoughts) {
  // Must have at least 2 thoughts
  if (thoughts.length < 2) {
    throw new Error('Minimum 2 thoughts required');
  }
  
  // Must be sequential
  for (let i = 0; i < thoughts.length; i++) {
    if (thoughts[i].thoughtNumber !== i + 1) {
      throw new Error('Thought numbers must be sequential');
    }
  }
  
  // Last thought must set nextThoughtNeeded to false
  if (thoughts[thoughts.length - 1].nextThoughtNeeded !== false) {
    throw new Error('Final thought must set nextThoughtNeeded to false');
  }
}
```

### 7. Query Processing Examples

#### 7.1 Simple Query Example
```javascript
// Thought 1
{
  thought: "Analyzing simple configuration query",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 2
}

// Thought 2
{
  thought: "Providing configuration solution",
  nextThoughtNeeded: false,
  thoughtNumber: 2,
  totalThoughts: 2
}
```

#### 7.2 Complex Query Example
```javascript
// Thought 1
{
  thought: "Starting complex system analysis",
  nextThoughtNeeded: false,
  thoughtNumber: 1,
  totalThoughts: 4
}

// Thought 2
{
  thought: "Analyzing system components",
  nextThoughtNeeded: false,
  thoughtNumber: 2,
  totalThoughts: 4
}

// Thought 3
{
  thought: "Identifying potential issues",
  nextThoughtNeeded: false,
  thoughtNumber: 3,
  totalThoughts: 4
}

// Thought 4
{
  thought: "Providing comprehensive solution",
  nextThoughtNeeded: false,
  thoughtNumber: 4,
  totalThoughts: 4
}
```

### 8. Query Processing Best Practices

1. Always start with analysis thought
2. Follow logical progression
3. Document each thought clearly
4. Validate all parameters
5. Use appropriate number of thoughts
6. Maintain sequential numbering
7. Set nextThoughtNeeded to false
8. Provide clear thought descriptions
9. Follow established patterns
10. Update documentation as needed

This document should be updated as the project evolves and new requirements or configurations are added.

## Boolean Parameter Handling

### 1. Boolean Value Definition
```typescript
type BooleanValue = boolean;  // Must be true or false, not strings
```

### 2. Correct Boolean Usage
```javascript
// Correct
const params = {
  nextThoughtNeeded: false,  // boolean false
  isRevision: true,         // boolean true
};

// Incorrect - Will Cause Errors
const invalidParams = {
  nextThoughtNeeded: "false",  // string "false"
  isRevision: "true",         // string "true"
};
```

### 3. Boolean Validation
```javascript
function validateBoolean(value: any): boolean {
  if (typeof value !== 'boolean') {
    throw new Error('Value must be boolean, got ' + typeof value);
  }
  return value;
}
```

### 4. Sequential Thinking with Booleans
```javascript
// Correct usage
{
  thought: "Processing query",
  nextThoughtNeeded: false,  // Must be boolean false
  thoughtNumber: 1,
  totalThoughts: 2
}

// Incorrect usage - Will Cause Errors
{
  thought: "Processing query",
  nextThoughtNeeded: "false",  // String instead of boolean
  thoughtNumber: 1,
  totalThoughts: 2
}
```

### 5. Boolean Parameter Rules
1. Must use boolean literals (true/false)
2. Never use strings ("true"/"false")
3. Never use numbers (0/1)
4. Never use undefined or null
5. Always validate boolean type
6. Use strict equality (===)
7. Document boolean requirements
8. Test boolean handling
9. Handle boolean edge cases
10. Maintain boolean consistency

This document should be updated as the project evolves and new requirements or configurations are added.

## MCP Server Boolean Handling

### 1. Strict Boolean Parameters
```typescript
interface MCPBooleanParams {
  nextThoughtNeeded: boolean;  // Must be JavaScript boolean primitive
}

// Correct Usage:
const correctParams = {
  nextThoughtNeeded: false    // JavaScript boolean primitive
};

// Incorrect Usage:
const incorrectParams = {
  nextThoughtNeeded: "false"  // String - will cause error
};
```

### 2. MCP Server Validation
```javascript
function validateMCPBoolean(value) {
  // Check for exact boolean type
  if (Object.prototype.toString.call(value) !== '[object Boolean]') {
    throw new Error('Must be boolean primitive');
  }
  return value;
}
```

### 3. Sequential Thinking Implementation
```javascript
// Step 1: Initial Thought
const thought1 = {
  thought: "Starting analysis",
  nextThoughtNeeded: false,    // Must be boolean primitive
  thoughtNumber: 1,
  totalThoughts: 3
};

// Step 2: Processing
const thought2 = {
  thought: "Processing data",
  nextThoughtNeeded: false,    // Must be boolean primitive
  thoughtNumber: 2,
  totalThoughts: 3
};

// Step 3: Conclusion
const thought3 = {
  thought: "Completing analysis",
  nextThoughtNeeded: false,    // Must be boolean primitive
  thoughtNumber: 3,
  totalThoughts: 3
};
```

### 4. Boolean Type Enforcement
1. Use JavaScript boolean primitives only
2. Never use string representations
3. Never use numeric values
4. Never use object Boolean instances
5. Always validate before processing
6. Handle type errors explicitly
7. Document boolean requirements
8. Test with exact boolean values
9. Maintain type consistency
10. Log validation failures

### 5. Error Handling
```javascript
try {
  // Correct
  processThought({
    thought: "Analysis",
    nextThoughtNeeded: false,  // Boolean primitive
    thoughtNumber: 1,
    totalThoughts: 2
  });

  // Will throw error
  processThought({
    thought: "Analysis",
    nextThoughtNeeded: "false",  // String - invalid
    thoughtNumber: 1,
    totalThoughts: 2
  });
} catch (error) {
  console.error('Boolean validation failed:', error.message);
}
```

### 6. Testing Guidelines
1. Test with boolean primitives
2. Test with string values (should fail)
3. Test with numeric values (should fail)
4. Test with Boolean objects (should fail)
5. Test with undefined/null (should fail)
6. Verify error messages
7. Log validation results
8. Document test cases
9. Maintain test coverage
10. Update tests as needed

This document should be updated as the project evolves and new requirements or configurations are added. 