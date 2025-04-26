import { test, expect } from '@playwright/test';

test.describe('Application Startup Diagnostics', () => {
  test('host app starts correctly', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://localhost:3000');
    
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Check if the main heading is present
    await expect(page.getByRole('heading', { name: 'Healthcare Portal' })).toBeVisible();

    // Check for React errors
    const reactErrors = consoleErrors.filter(error => 
      error.includes('React') || 
      error.includes('Invalid hook call') ||
      error.includes('useContext')
    );
    
    if (reactErrors.length > 0) {
      console.log('React errors detected:', reactErrors);
      // Don't fail the test immediately, but log the errors
    }

    // Check for Module Federation errors
    const mfErrors = consoleErrors.filter(error => 
      error.includes('Module Federation') || 
      error.includes('remoteEntry') ||
      error.includes('preferences')
    );
    
    if (mfErrors.length > 0) {
      console.log('Module Federation errors detected:', mfErrors);
      // Don't fail the test immediately, but log the errors
    }

    // Check if preferences section is present and loading
    const preferencesSection = page.getByRole('heading', { name: 'Preferences' });
    await expect(preferencesSection).toBeVisible();
    
    // Check for loading state
    const loadingState = page.getByText('Loading preferences...');
    await expect(loadingState).toBeVisible();

    // Wait for preferences to load (or show error)
    try {
      await page.waitForSelector('text=User Preferences', { timeout: 5000 });
    } catch (error) {
      // If preferences don't load, check for error state
      const errorState = page.getByText('Failed to load preferences');
      await expect(errorState).toBeVisible();
    }

    // Check for network errors
    const networkErrors = consoleErrors.filter(error => 
      error.includes('Failed to load') || 
      error.includes('NetworkError') ||
      error.includes('404')
    );
    
    if (networkErrors.length > 0) {
      console.log('Network errors detected:', networkErrors);
      // Don't fail the test immediately, but log the errors
    }

    // Log any remaining console errors for debugging
    if (consoleErrors.length > 0) {
      console.log('All console errors during startup:', consoleErrors);
    }
  });

  test('preferences micro-frontend is accessible', async ({ page }) => {
    // Navigate directly to preferences MFE
    await page.goto('http://localhost:3001');
    
    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Check if preferences page loads
    await expect(page.getByRole('heading', { name: 'User Preferences' })).toBeVisible();

    // Check for React errors
    const reactErrors = consoleErrors.filter(error => 
      error.includes('React') || 
      error.includes('Invalid hook call')
    );
    
    if (reactErrors.length > 0) {
      console.log('React errors in preferences MFE:', reactErrors);
      // Don't fail the test immediately, but log the errors
    }

    // Log any remaining console errors for debugging
    if (consoleErrors.length > 0) {
      console.log('All console errors in preferences MFE:', consoleErrors);
    }
  });
}); 