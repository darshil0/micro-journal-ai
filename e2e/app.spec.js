// e2e/app.spec.js
import { test, expect } from '@playwright/test';

test.describe('Micro Journal AI E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the index page for each test
    await page.goto('http://localhost:5173');
    // Clear local storage to ensure a clean slate
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:5173');
  });

  test('should allow a user to write, save, and delete a journal entry', async ({ page }) => {
    // 1. Write a new entry
    const entryText = 'This is a new journal entry written during an E2E test.';
    await page.getByPlaceholder(/How are you feeling right now?/i).fill(entryText);
    await page.getByRole('button', { name: /save entry/i }).click();

    // 2. Verify the entry was saved
    await expect(page.getByText(/Entry saved locally./i)).toBeVisible();

    // 3. Navigate to the history view
    await page.getByRole('button', { name: /history/i }).click();

    // 4. Check that the new entry is visible
    await expect(page.getByText(entryText)).toBeVisible();

    // 5. Delete the entry
    page.on('dialog', dialog => dialog.accept()); // Handle the confirm dialog
    await page.getByTitle(/Delete Entry/i).first().click();

    // 6. Verify the entry is no longer visible
    await expect(page.getByText(entryText)).not.toBeVisible();
    await expect(page.getByText(/Your journal is empty./i)).toBeVisible();
  });

  test('should generate an AI insight and take a screenshot', async ({ page }) => {
    // 1. Mock the API response
    await page.route('**/api/generate', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            content: [{
              text: '**Key Insight:**\\n* E2E testing is working.'
            }]
          }
        }),
      });
    });

    // 2. Write an entry to enable the insights button
    await page.getByPlaceholder(/How are you feeling right now?/i).fill('This is an entry to test AI insights.');
    await page.getByRole('button', { name: /save entry/i }).click();

    // 3. Navigate to the insights view
    await page.getByRole('button', { name: /insights/i }).click();

    // 4. Generate the insight
    await page.getByRole('button', { name: /Generate New Insights/i }).click();

    // 5. Verify the insight is visible
    await expect(page.getByText(/E2E testing is working./i)).toBeVisible();

    // 6. Take a screenshot for the test evidence document
    await page.screenshot({ path: 'test-evidence-insights.png' });
  });
});
