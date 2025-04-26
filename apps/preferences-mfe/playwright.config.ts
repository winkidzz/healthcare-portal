import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Run tests in parallel
  workers: 4,
  
  // Retry failed tests
  retries: 1,
  
  // Increase timeout for tests
  timeout: 30000,
  
  // Use a single browser for all tests
  use: {
    // Use a single browser instance
    browserName: 'chromium',
    
    // Base URL for tests
    baseURL: 'http://localhost:3001',
    
    // Disable video recording
    video: 'off',
    
    // Disable screenshots on failure
    screenshot: 'only-on-failure',
    
    // Disable trace recording
    trace: 'off',
    
    // Set viewport size
    viewport: { width: 1280, height: 720 },
  },
  
  // Configure test output
  reporter: 'list',
  
  // Configure test directory
  testDir: './tests',
  
  // Configure test files pattern
  testMatch: '**/*.spec.ts',
  
  // Configure web server
  webServer: {
    command: 'npm run dev',
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
};

export default config; 