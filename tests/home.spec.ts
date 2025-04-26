import { test, expect } from '@playwright/test';

test('host app launches with correct structure', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/', { waitUntil: 'networkidle' });
  
  // Wait for the page to be fully loaded
  await page.waitForSelector('.min-h-screen', { state: 'visible', timeout: 30000 });

  // Check for the main title
  const title = await page.getByRole('heading', { name: 'Healthcare Portal' });
  await expect(title).toBeVisible();

  // Check for the welcome message and doctor's name
  await expect(page.getByText('Welcome,')).toBeVisible();
  await expect(page.getByText('Dr. Smith')).toBeVisible();

  // Check for the Applications sidebar
  const sidebarTitle = await page.getByRole('heading', { name: 'Applications' });
  await expect(sidebarTitle).toBeVisible();

  // Check for the default message
  const defaultMessage = await page.getByText('Select an application from the sidebar');
  await expect(defaultMessage).toBeVisible();

  // Verify sidebar buttons are present
  const preferencesButton = await page.getByRole('button', { name: 'Preferences' });
  const icdTestsButton = await page.getByRole('button', { name: 'ICD Tests' });
  await expect(preferencesButton).toBeVisible();
  await expect(icdTestsButton).toBeVisible();

  // Test navigation to Preferences
  await preferencesButton.click();
  await expect(page.getByText('User Preferences')).toBeVisible();
  await expect(page.getByText('Loading Settings...')).toBeVisible();

  // Test navigation to ICD Tests
  await icdTestsButton.click();
  await expect(page.getByText('ICD Tests')).toBeVisible();
  await expect(page.getByText('Loading Test List...')).toBeVisible();
}); 