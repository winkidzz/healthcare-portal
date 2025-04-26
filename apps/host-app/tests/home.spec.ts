import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:3000');

  // Check if the main heading is present
  await expect(page.getByRole('heading', { name: 'Healthcare Portal' })).toBeVisible();

  // Check if both micro-frontend sections are present
  await expect(page.getByRole('heading', { name: 'Preferences' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ICD Tests' })).toBeVisible();

  // Check if loading states are present
  await expect(page.getByText('Loading preferences...')).toBeVisible();
  await expect(page.getByText('Loading icdTests...')).toBeVisible();
}); 