# Healthcare Portal

A modern healthcare portal built with micro-frontend architecture using Next.js.

## Project Structure

```
├── host-app/              # Main container application (Next.js 14.1.0)
├── preferences-mfe/       # Preferences micro-frontend (Next.js 15.3.1)
├── icd-tests-mfe/        # ICD Tests micro-frontend (Next.js 15.3.1)
├── shared-library/       # Shared components and utilities
└── headless-core/        # Core business logic
```

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Port Configuration

- Host App: http://localhost:3000
- Preferences MFE: http://localhost:3001
- ICD Tests MFE: http://localhost:3002

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies for all applications:
   ```bash
   # Host App
   cd host-app
   npm install

   # Preferences MFE
   cd ../preferences-mfe
   npm install

   # ICD Tests MFE
   cd ../icd-tests-mfe
   npm install

   # Shared Library
   cd ../shared-library
   npm install

   # Headless Core
   cd ../headless-core
   npm install
   ```

3. Start the development servers:
   ```bash
   # Start Preferences MFE
   cd preferences-mfe
   npm run dev

   # Start ICD Tests MFE
   cd ../icd-tests-mfe
   npm run dev

   # Start Host App
   cd ../host-app
   NEXT_PRIVATE_LOCAL_WEBPACK=true npm run dev
   ```

## Technology Stack

- **Framework**: Next.js (14.1.0 for host, 15.3.1 for MFEs)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tools**: 
  - Host App: webpack
  - MFEs: Turbopack
- **Integration**: Module Federation
- **Testing**: Playwright

## Development Guidelines

### Build Tools
- Host App must use webpack (NEXT_PRIVATE_LOCAL_WEBPACK=true)
- Micro-frontends use Turbopack (--turbopack flag)

### Design System
- **Colors**:
  - Primary: #0070f3
  - Secondary: #7928ca
  - Accent: #ff0080
- **Typography**: System fonts with scale from 2.5rem to 1rem
- **Accessibility**: WCAG 2.1 AA compliance

### Component Architecture
- Follows Atomic Design principles
- Shared components available in shared-library
- Business logic centralized in headless-core

## Testing

Run tests from the host-app directory:
```bash
cd host-app
npm run test
```

## Known Issues

1. Version mismatch between host (14.1.0) and MFEs (15.3.1)
2. Module Federation warnings with mixed build tools
3. Port conflicts may require manual resolution

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[License Type] - see LICENSE file for details 