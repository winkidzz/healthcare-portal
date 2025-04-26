import { test, expect } from '@playwright/test';

test.describe('Preferences App', () => {
  test('should load without errors', async ({ page }) => {
    // Navigate to the preferences page
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/page.png' });

    // Verify the basic page structure is present
    await expect(page.getByText('Preferences')).toBeVisible();
    await expect(page.getByText('User Settings')).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('Theme')).toBeVisible();
    await expect(page.getByText('Notifications')).toBeVisible();

    // Verify the mock data is displayed
    await expect(page.getByText('Test User')).toBeVisible();
    await expect(page.getByText('test@example.com')).toBeVisible();
    await expect(page.getByText('light')).toBeVisible();
    await expect(page.getByText('Enabled')).toBeVisible();
  });
}); 