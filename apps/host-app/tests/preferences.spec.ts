import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Enable detailed console logging
  page.on('console', msg => {
    console.log(`Browser console [${msg.type()}]: ${msg.text()}`);
  });
  
  // Log network requests
  page.on('request', request => {
    console.log(`Request: ${request.method()} ${request.url()}`);
  });
  
  // Log network responses
  page.on('response', response => {
    console.log(`Response: ${response.status()} ${response.url()}`);
  });
});

test('preferences component loads correctly', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000');
  
  // Wait for the loading state
  const loadingText = await page.getByText('Loading preferences...');
  await expect(loadingText).toBeVisible();
  
  // Wait for the preferences section to be visible
  const preferencesSection = await page.getByText('User Preferences');
  await expect(preferencesSection).toBeVisible({ timeout: 10000 });
  
  // Check if theme selector is present
  const themeSelector = await page.getByRole('combobox', { name: /theme/i });
  await expect(themeSelector).toBeVisible();
}); 