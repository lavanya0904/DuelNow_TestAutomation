import { test, expect } from '@playwright/test';

test.describe('Scenario 3: Verify Filter by Price', () => {
  test('Filter jewelry by $25 to $500', async ({ page }) => {
    test.setTimeout(120000); // Increase timeout to 120 seconds

    // 1. Navigate to the website
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure full page load

    // 2. Click on the "Jewelry" menu
    await page.click('a:has-text("Jewelry")');
    await page.waitForLoadState('domcontentloaded');

    // 3. Open the price filter section (if it's inside a dropdown)
    const isFilterDropdown = await page.isVisible('button:has-text("Price")');
    if (isFilterDropdown) {
      await page.click('button:has-text("Price")');
    }

    // 4. Wait for the price filter to be visible
    try {
      await page.waitForSelector('label:has-text("$25.00 - $500.00")', { timeout: 60000 });
    } catch (error) {
      console.error('Price filter did not load within the timeout period.');
      throw error;
    }

    // 5. Click on the "$25 - $500" filter
    await page.locator('label:has-text("$25.00 - $500.00")').click();

    // 6. Verify that only 2 products are displayed in the results
    const productList = page.locator('.product-item');
    await expect(productList).toHaveCount(2);
  });
});