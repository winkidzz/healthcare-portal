import { test, expect } from '@playwright/test';

test.describe('Preferences App', () => {
  test('should load without errors', async ({ page }) => {
    // Navigate to the preferences page
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/page.png' });

    // Check for React error boundaries or error messages
    const errorMessages = await page.evaluate(() => {
      const errors = [];
      // Check for React error messages in the console
      const errorElements = document.querySelectorAll('[data-test-id="error-boundary"]');
      errorElements.forEach(el => errors.push(el.textContent));
      return errors;
    });

    // Fail the test if we find any React errors
    expect(errorMessages, 'No React errors should be present').toHaveLength(0);

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

    // Test React context functionality
    // Click theme toggle button and verify the theme changes
    const themeToggle = page.getByRole('button', { name: /theme/i });
    await themeToggle.click();
    
    // Verify the theme state has changed
    await expect(page.getByText('dark')).toBeVisible();

    // Test form interactions
    const nameInput = page.getByLabel('Name');
    await nameInput.fill('New Test User');
    await expect(nameInput).toHaveValue('New Test User');

    // Verify the mock data is displayed and can be interacted with
    await expect(page.getByText('test@example.com')).toBeVisible();
    await expect(page.getByText('Enabled')).toBeVisible();

    // Check console for React-specific errors
    const consoleMessages = await page.evaluate(() => {
      return (window as any).consoleErrors || [];
    });
    
    const reactErrors = consoleMessages.filter(msg => 
      msg.includes('React') || 
      msg.includes('Invalid hook call') ||
      msg.includes('Context')
    );
    
    expect(reactErrors, 'No React-specific errors in console').toHaveLength(0);
  });
}); 