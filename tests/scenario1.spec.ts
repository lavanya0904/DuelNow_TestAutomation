import { test, expect } from '@playwright/test';

// Top-level configuration for all tests in this file
test.use({
  headless: false, // Run in non-headless mode
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Set a custom user agent
});

test.describe('Scenario 1: User Signup and Checkout', () => {
  test('Register, Search, Add to Cart, and Checkout', async ({ page }) => {
    test.setTimeout(180000); // Extend timeout to 180 seconds

    // Step 1: Navigate to the website
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure full page load

    // Step 2: Click on the "Register" link in the header
    await page.getByRole('link', { name: 'Register' }).click();

    // Debugging: Log current URL and title
    console.log('Current URL after clicking Register:', page.url());
    console.log('Page Title after clicking Register:', await page.title());

    // Step 3: Handle CAPTCHA or security check
    if ((await page.title()) === 'Just a moment...') {
      console.log('CAPTCHA or security check detected. Please solve it manually.');
      await page.pause(); // Pause the test and open the Playwright Inspector
    }

    // Step 4: Fill in valid user details and complete the registration
    // Wait for the registration form to be visible
    try {
      await page.waitForSelector('input#FirstName', { timeout: 120000, state: 'visible' });
    } catch (error) {
      console.error('Registration form did not load within the timeout period.');
      throw error;
    }

    // Log current URL and title for debugging
    console.log('Current URL:', page.url());
    console.log('Page Title:', await page.title());

    // Generate a random email to avoid duplicate registration errors
    const randomEmail = `testuser_${Date.now()}@example.com`;

    // Fill out the registration form
    await page.fill('input#FirstName', 'John');
    await page.fill('input#LastName', 'Doe');
    await page.fill('input#Email', randomEmail);
    await page.fill('input#Password', 'Password123!');
    await page.fill('input#ConfirmPassword', 'Password123!');

    // Submit the registration form
    await page.click('button#register-button');

    // Step 5: Verify successful registration and redirect to homepage
    await expect(page.locator('div.result')).toHaveText('Your registration completed');
    await page.click('input[type="button"][value="Continue"]').catch(() => {});

    // Step 6: Search for the keyword "computer" and validate the result
    await page.fill('input#small-searchterms', 'computer');
    await page.click('button[type="submit"]');
    await expect(page.locator('.product-title')).toHaveText('Build your own computer');

    // Step 7: Add the product to the shopping cart
    await page.click('button#add-to-cart-button-1');
    await expect(page.locator('.bar-notification.success')).toBeVisible(); // Verify success notification

    // Step 8: Proceed to checkout
    await page.click('a[href="/cart"]'); // Go to cart
    await page.click('button#checkout'); // Proceed to checkout

    // Step 9: Complete the checkout process
    // Fill in billing address details
    await page.fill('input#BillingNewAddress_FirstName', 'John');
    await page.fill('input#BillingNewAddress_LastName', 'Doe');
    await page.fill('input#BillingNewAddress_Email', randomEmail);
    await page.selectOption('select#BillingNewAddress_CountryId', { label: 'United States' });
    await page.fill('input#BillingNewAddress_City', 'New York');
    await page.fill('input#BillingNewAddress_Address1', '123 Main St');
    await page.fill('input#BillingNewAddress_ZipPostalCode', '10001');
    await page.fill('input#BillingNewAddress_PhoneNumber', '1234567890');

    // Continue to shipping method
    await page.click('button#billing-buttons-container >> text="Continue"');
    await page.waitForSelector('button#shipping-method-buttons-container', { state: 'visible' });

    // Select shipping method
    await page.click('input#shippingoption_1'); // Select "Next Day Air"
    await page.click('button#shipping-method-buttons-container >> text="Continue"');
    await page.waitForSelector('button#payment-method-buttons-container', { state: 'visible' });

    // Select payment method
    await page.click('input#paymentmethod_1'); // Select "Credit Card"
    await page.click('button#payment-method-buttons-container >> text="Continue"');
    await page.waitForSelector('button#payment-info-buttons-container', { state: 'visible' });

    // Fill in payment information
    await page.selectOption('select#CreditCardType', { label: 'Visa' });
    await page.fill('input#CardholderName', 'John Doe');
    await page.fill('input#CardNumber', '4111111111111111');
    await page.selectOption('select#ExpireMonth', { label: '12' });
    await page.selectOption('select#ExpireYear', { label: '2028' });
    await page.fill('input#CardCode', '123');
    await page.click('button#payment-info-buttons-container >> text="Continue"');

    // Step 10: Review the order and finalize the purchase
    await page.waitForSelector('button#confirm-order-buttons-container', { state: 'visible' });
    await page.click('button#confirm-order-buttons-container >> text="Confirm"');

    // Step 11: Verify successful order placement
    await expect(page.locator('div.order-completed')).toBeVisible();
    const orderNumber = await page.locator('div.order-number').textContent();
    console.log('Order placed successfully. Order Number:', orderNumber);

    // Step 12: Navigate to "My Account" → "Orders" to confirm the order appears in the order history
    await page.click('a[href="/customer/orders"]');
    await expect(page.locator('table.orders')).toContainText(orderNumber!);
  });
});