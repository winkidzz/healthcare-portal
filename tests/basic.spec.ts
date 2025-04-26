import { test, expect } from '@playwright/test';

test.describe('Healthcare Portal Basic Tests', () => {
  test('Host app loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Healthcare Portal/);
  });

  test('Preferences MFE is accessible', async ({ page }) => {
    await page.goto('/preferences');
    await expect(page.locator('text=Preferences')).toBeVisible();
  });

  test('ICD Tests MFE is accessible', async ({ page }) => {
    await page.goto('/icd-tests');
    await expect(page.locator('text=ICD Tests')).toBeVisible();
  });
}); 