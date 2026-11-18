import { expect, test } from '@playwright/test';

test.describe('Demo App: Basic tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for a stable element to ensure the page is loaded before running tests.
    await expect(page.getByRole('heading', { name: /A Material 3 period picker for Angular/i })).toBeVisible();
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/ngx-mat-period-picker/);
  });

  test('should display a welcome heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /A Material 3 period picker for Angular/i })).toBeVisible();
  });

  test('should display the theme toggle in the toolbar', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Light mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'System preference' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dark mode' })).toBeVisible();
  });
});
