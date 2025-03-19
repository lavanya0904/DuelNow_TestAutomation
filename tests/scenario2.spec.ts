import { test, expect } from '@playwright/test';

test.describe('Scenario 2: Cart Functionality Validation', () => {
  test('Add multiple products, verify cart, modify quantity, remove product', async ({ page }) => {
    test.setTimeout(120000); // Increase timeout to 120 seconds

    // 1. Navigate to the website
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure full page load

    // 2. Add multiple products to the shopping cart
    // Product 1: "Build your own computer"
    await page.fill('input#small-searchterms', 'computer');
    await page.click('button[type="submit"]');

    // Wait for the product link to be visible and click it
    await page.waitForSelector('.product-title a:has-text("Build your own computer")', { state: 'visible' });
    await page.click('.product-title a:has-text("Build your own computer")');

    // Add the product to the cart
    await page.click('button#add-to-cart-button-1');
    await expect(page.locator('.bar-notification.success')).toBeVisible(); // Verify success notification

    // Go back home
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure full page load

    // Product 2: "Apple MacBook Pro 13-inch"
    await page.fill('input#small-searchterms', 'Apple MacBook Pro 13-inch');
    await page.click('button[type="submit"]');

    // Wait for the product link to be visible and click it
    await page.waitForSelector('.product-title a:has-text("Apple MacBook Pro 13-inch")', { state: 'visible' });
    await page.click('.product-title a:has-text("Apple MacBook Pro 13-inch")');

    // Add the product to the cart
    await page.click('button#add-to-cart-button-4');
    await expect(page.locator('.bar-notification.success')).toBeVisible(); // Verify success notification

    // 3. Verify that the correct products and quantities are in the cart
    // Open the shopping cart
    await page.click('a[href="/cart"]');
    await page.waitForLoadState('networkidle'); // Ensure cart page is fully loaded

    // Expect 2 items in the cart
    const cartRows = page.locator('table.cart > tbody > tr');
    await expect(cartRows).toHaveCount(2);

    // 4. Modify the quantity of a product (e.g., first product from 1 to 2)
    const firstProductQuantity = cartRows.nth(0).locator('input.qty-input');
    await firstProductQuantity.fill('2');

    // Click update shopping cart if needed
    await page.click('button[name="updatecart"]');
    await expect(firstProductQuantity).toHaveValue('2'); // Verify the quantity updated

    // 5. Remove a product from the cart
    // Remove the second product
    const secondProductRemoveCheckbox = cartRows.nth(1).locator('input[name^="removefromcart"]');
    await secondProductRemoveCheckbox.check();

    // Update cart again
    await page.click('button[name="updatecart"]');

    // 6. Validate that the cart updates accordingly (now only 1 item remains)
    await expect(cartRows).toHaveCount(1);
  });
});