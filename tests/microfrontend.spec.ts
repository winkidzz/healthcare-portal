import { test, expect } from '@playwright/test';

test.describe('Microfrontend Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load host app', async ({ page }) => {
    await expect(page).toHaveTitle(/Healthcare Portal/);
  });

  test('should load preferences microfrontend', async ({ page }) => {
    await page.goto('/preferences');
    await expect(page.locator('[data-testid="preferences-mfe"]')).toBeVisible();
  });

  test('should load ICD tests microfrontend', async ({ page }) => {
    await page.goto('/icd-tests');
    await expect(page.locator('[data-testid="icd-tests-mfe"]')).toBeVisible();
  });

  test('should handle navigation between microfrontends', async ({ page }) => {
    // Navigate to preferences
    await page.goto('/preferences');
    await expect(page.locator('[data-testid="preferences-mfe"]')).toBeVisible();

    // Navigate to ICD tests
    await page.goto('/icd-tests');
    await expect(page.locator('[data-testid="icd-tests-mfe"]')).toBeVisible();

    // Navigate back to home
    await page.goto('/');
    await expect(page).toHaveTitle(/Healthcare Portal/);
  });

  test('should maintain state between microfrontends', async ({ page }) => {
    // Set a preference
    await page.goto('/preferences');
    await page.locator('[data-testid="theme-toggle"]').click();
    const isDarkMode = await page.locator('[data-testid="theme-status"]').textContent();
    
    // Navigate to ICD tests and verify theme persists
    await page.goto('/icd-tests');
    const icdTestsTheme = await page.locator('[data-testid="theme-status"]').textContent();
    expect(icdTestsTheme).toBe(isDarkMode);
  });
}); 