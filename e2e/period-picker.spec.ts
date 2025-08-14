import { test, expect } from '@playwright/test';

test.describe('Demo App: NgxMatPeriodPicker', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo app's root page before each test.
    await page.goto('/');
    // Wait for a stable element to ensure the page is loaded before running tests.
    await expect(page.getByRole('heading', { name: /ngx-mat-period-picker Demo/i })).toBeVisible();
  });

  test('should display the period picker component', async ({ page }) => {
    // Since the demo page has multiple period pickers, we use .first() to target one.
    // This resolves the strict mode error where a locator points to multiple elements.
    const firstPeriodPicker = page.locator('ngx-mat-period-picker').first();
    await expect(firstPeriodPicker).toBeVisible();
    // Check for the first input within the first component.
    await expect(firstPeriodPicker.locator('input').first()).toBeVisible();
  });

  test('should open a picker, select a period, and update the input', async ({ page }) => {
    // Select the first period picker on the page.
    const firstPeriodPicker = page.locator('ngx-mat-period-picker').first();
    await expect(firstPeriodPicker).toBeVisible();

    // Target the first ngx-mat-year-month-picker of the first period picker on the page.
    const periodPickerNgxMatYearMonthPicker = firstPeriodPicker.locator('ngx-mat-year-month-picker').first();

    // 1. Click the input to open the period picker dialog.
    await periodPickerNgxMatYearMonthPicker.click();

    // 2. Wait for the custom picker component to appear.
    // Based on the library's README, the picker component's selector is 'ngx-mat-year-month-picker-dialog'.
    const picker = page.locator('ngx-mat-year-month-picker-dialog');
    await expect(picker).toBeVisible();

    // 3. Select a year, for example 2023.
    // This assumes the year is selectable via a button with its text.
    // You may need to adjust this selector based on your component's implementation.
    await picker.getByRole('button', { name: '2023' }).click();

    // 4. Select a month, for example March.
    // This assumes the month is selectable via a button with its abbreviated text.
    await picker.getByRole('button', { name: 'MAR' }).click();

    // 5. Verify the input value has been updated.
    // The value format 'MMM YYYY' is an assumption based on common date picker behavior.
    // Please adjust the expected value if your component formats it differently.
    await expect(periodPickerNgxMatYearMonthPicker.locator('input').first()).toHaveValue(/March 2023/i);

    // Close the picker dialog.
    await picker.getByRole('button', { name: 'OK' }).click();

    // 6. The picker dialog should be closed after selection.
    await expect(picker).not.toBeVisible();
  });

  test('should display translated button labels correctly', async ({ page }) => {
    // Find the German period picker example by looking for the heading first
    const germanHeading = page.getByRole('heading', { name: 'Period Picker with Translated Buttons (German)' });
    await expect(germanHeading).toBeVisible();

    // Then find the period picker that follows this heading
    const germanPeriodPicker = germanHeading.locator('xpath=../..').locator('ngx-mat-period-picker').first();
    await expect(germanPeriodPicker).toBeVisible();

    // Target the first ngx-mat-year-month-picker within the German period picker
    const germanField = germanPeriodPicker.locator('ngx-mat-year-month-picker').first();

    // Click to open the picker
    await germanField.click();

    // Wait for the picker to appear
    const picker = page.locator('ngx-mat-year-month-picker-dialog');
    await expect(picker).toBeVisible();

    // Verify that the button labels are translated to German
    await expect(picker.getByRole('button', { name: 'Bestätigen' })).toBeVisible();
    await expect(picker.getByRole('button', { name: 'Löschen' })).toBeVisible();

    // Close the picker
    await picker.getByRole('button', { name: 'Bestätigen' }).click();
    await expect(picker).not.toBeVisible();
  });
});
