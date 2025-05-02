#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

# Function to log errors
error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js 18 or higher."
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
if [[ "${NODE_VERSION%%.*}" -lt 18 ]]; then
    error "Node.js version must be 18 or higher. Current version: $NODE_VERSION"
fi

# Clean previous builds
log "Cleaning previous builds..."
rm -rf node_modules
rm -rf .next
rm -rf dist

# Install dependencies
log "Installing dependencies..."
npm install

# Build the application
log "Building the application..."
NEXT_PRIVATE_LOCAL_WEBPACK=true npm run build

# Verify build output
if [ ! -d ".next" ]; then
    error "Build failed: .next directory not found"
fi

log "Build completed successfully!" 