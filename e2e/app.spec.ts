import { expect, test } from '@playwright/test';

test.describe('Demo App: Basic tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for a stable element to ensure the page is loaded before running tests.
    await expect(page.getByRole('heading', { name: /ngx-mat-period-picker Demo/i })).toBeVisible();
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DemoApp/);
  });

  test('should display a welcome heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /ngx-mat-period-picker Demo/i })).toBeVisible();
  });
});