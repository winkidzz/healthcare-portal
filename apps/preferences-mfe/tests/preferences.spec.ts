import { test, expect } from '@playwright/test';

// Configure the base URL for all tests
test.use({ baseURL: 'http://localhost:3002' });

test.describe('Preferences MFE - Enterprise Routing Strategy', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the preferences page
    await page.goto('/preferences');
    
    // Wait for Next.js to be ready
    await page.waitForFunction(() => {
      return window.hasOwnProperty('__NEXT_DATA__');
    });
  });

  test.skip('health check - app should load without errors', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL('/preferences');
  });

  test('should load the preferences page with correct routing', async ({ page }) => {
    // Wait for the app to be ready
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for the header to be ready using a more reliable selector
    await page.waitForSelector('header', { state: 'visible' });
    
    // Get all navigation links and verify their presence
    const navLinks = await page.getByRole('link').all();
    const linkTexts = await Promise.all(navLinks.map(link => link.textContent()));
    
    // Verify all expected links are present
    expect(linkTexts).toContain('Healthcare Portal');
    expect(linkTexts).toContain('Preferences');
    expect(linkTexts).toContain('Profile');
    
    // Verify the active link
    const activeLink = await page.getByRole('link', { name: 'Preferences' });
    await expect(activeLink).toHaveClass(/text-gray-900/);
  });

  test.skip('should maintain navigation state after page refresh', async ({ page }) => {
    // Wait for the header to be ready
    await page.waitForSelector('header');
    
    // Get the Preferences link and verify its state
    const preferencesLink = page.getByRole('link', { name: 'Preferences' });
    await expect(preferencesLink).toBeVisible();
    await expect(preferencesLink).toHaveClass(/text-gray-600/);
    
    // Refresh page and wait for network idle
    await page.reload({ waitUntil: 'networkidle' });
    
    // Wait for the header to be ready
    await page.waitForSelector('header');
    
    // Verify state is maintained
    await expect(preferencesLink).toBeVisible();
    await expect(preferencesLink).toHaveClass(/text-gray-600/);
    await expect(page.url()).toContain('/preferences');
  });

  test.skip('should handle navigation between routes correctly', async ({ page }) => {
    // Wait for the header to be ready
    await page.waitForSelector('header');
    
    // Get navigation links
    const preferencesLink = page.getByRole('link', { name: 'Preferences' });
    const profileLink = page.getByRole('link', { name: 'Profile' });
    
    // Navigate to Profile and wait for navigation to complete
    await Promise.all([
      page.waitForURL('**/profile'),
      profileLink.click()
    ]);
    
    // Verify active state updates
    await expect(profileLink).toHaveClass(/text-gray-600/);
    
    // Navigate back to Preferences and wait for navigation to complete
    await Promise.all([
      page.waitForURL('**/preferences'),
      preferencesLink.click()
    ]);
    
    // Verify active state updates
    await expect(preferencesLink).toHaveClass(/text-gray-600/);
  });

  test.skip('should maintain consistent navigation structure across routes', async ({ page }) => {
    // Wait for the header to be ready
    await page.waitForSelector('header');
    
    // Navigate through all routes
    const routes = ['Preferences', 'Profile'];
    
    for (const route of routes) {
      const navLink = page.getByRole('link', { name: route });
      await expect(navLink).toBeVisible();
      
      // Navigate and wait for URL change
      await Promise.all([
        page.waitForURL(`**/${route.toLowerCase()}`),
        navLink.click()
      ]);
      
      // Verify all navigation items are present
      for (const item of routes) {
        const itemLink = page.getByRole('link', { name: item });
        await expect(itemLink).toBeVisible();
      }
      
      // Verify active route highlighting
      await expect(navLink).toHaveClass(/text-gray-600/);
    }
  });

  test('should show correct navigation items', async ({ page }) => {
    await page.goto('/preferences');
    await page.waitForSelector('header.bg-white.shadow');
    
    const navItems = await page.getByRole('link').all();
    const navTexts = await Promise.all(navItems.map(item => item.textContent()));
    
    expect(navTexts).toContain('Healthcare Portal');
    expect(navTexts).toContain('Preferences');
    expect(navTexts).toContain('Profile');
  });

  test('should highlight active link', async ({ page }) => {
    await page.goto('/preferences');
    await page.waitForSelector('header.bg-white.shadow');
    
    const preferencesLink = page.getByRole('link', { name: 'Preferences' });
    await expect(preferencesLink).toHaveClass(/border-blue-500/);
  });

  test('should maintain active state after refresh', async ({ page }) => {
    await page.goto('/preferences');
    await page.waitForSelector('header.bg-white.shadow');
    
    const preferencesLink = page.getByRole('link', { name: 'Preferences' });
    await expect(preferencesLink).toHaveClass(/border-blue-500/);
    
    await page.reload();
    await page.waitForSelector('header.bg-white.shadow');
    await expect(preferencesLink).toHaveClass(/border-blue-500/);
  });

  test('should update active state when navigating', async ({ page }) => {
    await page.goto('/preferences');
    await page.waitForSelector('header.bg-white.shadow');
    
    const preferencesLink = page.getByRole('link', { name: 'Preferences' });
    await expect(preferencesLink).toHaveClass(/border-blue-500/);
    
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.waitForSelector('header.bg-white.shadow');
    
    const profileLink = page.getByRole('link', { name: 'Profile' });
    await expect(profileLink).toHaveClass(/border-blue-500/);
    await expect(preferencesLink).not.toHaveClass(/border-blue-500/);
  });
}); 