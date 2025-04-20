# Healthcare Portal Active Context

## Current Work Focus
- Successfully running micro-frontends with correct port assignments
- Managing Module Federation configuration
- Handling port configuration
- Optimizing build tool configurations
- Implementing cursor rules configuration

## Recent Changes
1. Successfully started micro-frontends:
   - Host App running on http://localhost:3000
   - Preferences MFE running on http://localhost:3001
   - ICD Tests MFE running on http://localhost:3002
2. Configured Module Federation with correct port mappings
3. Set up shared dependencies as singletons
4. Implemented port configuration for development
5. Created cursor rules configuration in memory bank

## Active Decisions
1. Using webpack in host app (NEXT_PRIVATE_LOCAL_WEBPACK=true)
2. Using Turbopack in micro-frontends (--turbopack flag)
3. Fixed port assignments:
   - Port 3000: Host App
   - Port 3001: Preferences MFE
   - Port 3002: ICD Tests MFE
4. Shared dependency configuration as singletons
5. Implemented cursor rules for memory bank usage

## Current Issues
1. Module Federation warnings about absolute path resolution (expected)
2. Webpack/Turbopack configuration warnings (expected)
3. Need to ensure port assignments are maintained
4. Need to update documentation with correct port assignments
5. Need to ensure cursor rules are followed consistently

## Next Steps
1. Document correct port assignments and startup sequence
2. Update Module Federation configuration documentation
3. Implement proper error boundaries
4. Set up comprehensive testing
5. Optimize bundle sizes
6. Ensure cursor rules are followed consistently

## Important Patterns
1. Micro-frontend architecture with Module Federation
2. Shared component library for consistency
3. Independent state management per MFE
4. Fixed port assignments for development
5. Memory bank documentation structure

## Learnings
1. Fixed port assignments are required for Module Federation
2. Module Federation warnings are expected and can be ignored
3. Build tool configuration warnings are expected
4. Port management is critical for micro-frontend integration
5. Memory bank documentation needs consistent updates

## Project Insights
1. Micro-frontend architecture provides flexibility
2. Independent deployment is possible
3. State management needs careful consideration
4. Performance optimization is ongoing
5. Documentation consistency is crucial

## Active Considerations
1. Document correct startup sequence
2. Update port configuration documentation
3. Testing strategy implementation
4. Performance monitoring setup
5. Cursor rules enforcement

## Recent Updates
- Successfully started all micro-frontends
- Configured correct port assignments
- Set up shared dependencies
- Implemented port configuration
- Created cursor rules configuration

## Current Focus Areas
1. Documentation updates
2. Module Federation configuration
3. Error handling
4. Testing infrastructure
5. Cursor rules implementation

## Correct Startup Sequence
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

## Cursor Rules
- Follow memory bank documentation structure
- Maintain port configuration rules
- Follow startup sequence rules
- Update documentation consistently
- Follow build tool rules 