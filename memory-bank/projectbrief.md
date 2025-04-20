# Healthcare Portal Project Brief

## Project Overview
A modular healthcare application built with Next.js using a micro-frontend architecture. The application serves as a portal for healthcare professionals to manage user preferences and ICD (International Classification of Diseases) tests.

## Core Components
1. **Host Application**: Next.js container application serving as the main entry point
2. **Preferences Micro-frontend**: User preferences and settings management
3. **ICD Tests Micro-frontend**: ICD test management and results
4. **Shared Library**: Common utilities, components, and types
5. **Headless Core Library**: Core business logic and shared functionality

## Technical Stack
- **Framework**: Next.js (Host: 14.1.0, MFEs: 15.3.1)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: Micro-frontend with Module Federation
- **Build Tools**: 
  - Host: Webpack
  - MFEs: Turbopack

## Key Objectives
1. Implement a scalable micro-frontend architecture
2. Ensure seamless integration between components
3. Maintain consistent user experience across all modules
4. Enable independent development and deployment of micro-frontends
5. Provide robust state management across components

## Current Status
- Project is in active development
- Basic micro-frontend structure is implemented
- Module Federation is configured but needs optimization
- Version mismatch between host and micro-frontends needs resolution

## Success Criteria
1. All micro-frontends load correctly in the host application
2. State management works seamlessly across components
3. Independent deployment of micro-frontends is possible
4. Performance meets industry standards
5. Accessibility requirements are met 