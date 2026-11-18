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
    const toggleGroup = page.locator('mat-button-toggle-group.theme-toggle');
    await expect(toggleGroup).toBeVisible();
    await expect(toggleGroup.locator('mat-button-toggle[value="light"]')).toBeVisible();
    await expect(toggleGroup.locator('mat-button-toggle[value="system"]')).toBeVisible();
    await expect(toggleGroup.locator('mat-button-toggle[value="dark"]')).toBeVisible();
  });
});
