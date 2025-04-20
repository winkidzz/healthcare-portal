# Next.js Application Design Specifications

## 1. Project Goals
The project aims to create a modular healthcare application with the following components:

### 1.1 Core Components
- **Host Application**: Next.js container application that serves as the main entry point
- **Preferences Micro-frontend**: User preferences and settings management
- **ICD Tests Micro-frontend**: ICD (International Classification of Diseases) test management and results
- **Headless Core Library**: Core business logic and shared functionality
- **Shared Library**: Common utilities, components, and types

### 1.2 Key Objectives
- Implement a scalable micro-frontend architecture
- Ensure seamless integration between components
- Maintain consistent user experience across all modules
- Enable independent development and deployment of micro-frontends
- Provide robust state management across components

## 2. Project Overview
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint
- **Architecture**: Micro-frontend with Module Federation

## 3. Architecture

### 3.1 Directory Structure
```
host-app/                  # Main container application
├── src/
│   ├── app/              # App Router directory
│   ├── components/       # Shared components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript definitions

preferences-mfe/          # Preferences Micro-frontend
├── src/
│   ├── components/       # MFE-specific components
│   ├── pages/           # MFE pages
│   └── types/           # MFE types

icd-tests-mfe/           # ICD Tests Micro-frontend
├── src/
│   ├── components/      # MFE-specific components
│   ├── pages/          # MFE pages
│   └── types/          # MFE types

headless-core/           # Headless Core Library
├── src/
│   ├── api/            # API integrations
│   ├── services/       # Business logic
│   └── types/          # Core types

shared-library/          # Shared Library
├── src/
│   ├── components/     # Shared UI components
│   ├── hooks/         # Shared React hooks
│   ├── utils/         # Shared utilities
│   └── types/         # Shared type definitions
```

### 3.2 Micro-frontend Integration
- Use Module Federation for dynamic loading of micro-frontends
- Implement shared state management between host and MFEs
- Define clear communication protocols between components
- Ensure proper error boundaries and loading states

### 3.3 Component Architecture
- **Atomic Design Principles**:
  - Atoms: Basic building blocks (buttons, inputs, etc.)
  - Molecules: Groups of atoms (forms, cards, etc.)
  - Organisms: Complex UI components (headers, footers, etc.)
  - Templates: Page layouts
  - Pages: Complete pages

## 4. Styling Guidelines

### 4.1 Tailwind CSS Configuration
- Use Tailwind's utility-first approach
- Maintain consistent spacing using the default scale
- Follow mobile-first responsive design principles
- Implement shared design tokens across all components

### 4.2 Color Palette
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

### 4.3 Typography
- **Font Family**: System fonts with fallbacks
- **Heading Sizes**:
  - h1: 2.5rem
  - h2: 2rem
  - h3: 1.75rem
  - h4: 1.5rem
- **Body Text**: 1rem (16px)

## 5. Component Specifications

### 5.1 Shared Components
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface CardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}
```

### 5.2 Micro-frontend Components
- Each MFE should implement its own component library
- Share common components through the shared library
- Maintain consistent styling across all MFEs

## 6. State Management

### 6.1 Global State
- Use React Context for shared state
- Implement proper state synchronization between MFEs
- Handle loading and error states consistently

### 6.2 MFE State
- Each MFE manages its own internal state
- Implement proper state hydration from the host
- Use consistent state management patterns

## 7. Performance Guidelines
- Implement proper image optimization
- Use Next.js Image component for images
- Implement code splitting
- Optimize bundle size
- Use proper caching strategies
- Minimize shared dependencies
- Implement lazy loading for MFEs

## 8. Accessibility Standards
- WCAG 2.1 AA compliance
- Proper ARIA labels
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility

## 9. Testing Strategy
- Unit tests for components
- Integration tests for features
- Performance testing
- Accessibility testing
- MFE integration testing
- Cross-browser compatibility testing

## 10. Documentation
- Component documentation
- API documentation
- Setup instructions
- Deployment guidelines
- MFE integration guide
- State management documentation
