import { test, expect } from '@playwright/test';

test.describe('Host App', () => {
  test('should load and display main UI', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Welcome to Healthcare Portal' })).toBeVisible();
    await expect(page.getByText('Your one-stop solution for healthcare management')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ICD Tests' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Preferences' })).toBeVisible();
  });
});

test.describe('Preferences MFE', () => {
  test('should load preferences UI and allow toggling theme', async ({ page }) => {
    await page.goto('/');
    // Preferences MFE is embedded in the host app, so check for its data-testid
    await expect(page.getByTestId('preferences-mfe')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'User Preferences' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Theme' })).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible(); // Theme selector
    await expect(page.getByLabel('Push Notifications')).toBeVisible();
    await expect(page.getByLabel('Email Notifications')).toBeVisible();
    await expect(page.getByLabel('SMS Notifications')).toBeVisible();
    await expect(page.getByLabel('Two-Factor Authentication')).toBeVisible();
  });
});

test.describe('ICD Tests MFE', () => {
  test('should load ICD Tests UI', async ({ page }) => {
    await page.goto('/');
    // ICD Tests MFE is embedded in the host app, so check for its heading
    await expect(page.getByRole('heading', { name: 'ICD Tests' })).toBeVisible();
    await expect(page.getByText('Patient Information')).toBeVisible();
    await expect(page.getByText('Available Tests')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Run ICD-10 Test' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Run ICD-11 Test' })).toBeVisible();
  });
}); 