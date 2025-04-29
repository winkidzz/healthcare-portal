import { test, expect } from '@playwright/test';

test.describe('Host App Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the home page', async ({ page }) => {
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check for any console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Verify the page loaded without errors
    expect(consoleErrors.length).toBe(0);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'host-app-home.png' });
  });

  test('should load preferences page', async ({ page }) => {
    await page.goto('http://localhost:3000/preferences');
    await page.waitForLoadState('networkidle');
    
    // Check for any console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Verify the page loaded without errors
    expect(consoleErrors.length).toBe(0);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'host-app-preferences.png' });
  });
}); 