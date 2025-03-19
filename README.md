This repository contains automated test scripts for the nopCommerce demo website using Playwright and TypeScript. The tests cover three scenarios:
1.	User Signup and Checkout
2.	Cart Functionality Validation
3.	Verify Filter by Price
________________________________________
**Table of Contents**
1.	Environment Setup
2.	Running the Tests
3.	Test Scenarios
4.	CI/CD Integration
5.	Known Issues
6.	Reporting and Artifacts
7.	Contact Information
________________________________________
**Environment Setup
Prerequisites**
•	Node.js: Ensure Node.js is installed on your machine. Download it from here.
•	Playwright: Playwright will be installed as part of the project setup.
Installation Steps
1.	Clone the repository:
git clone https://github.com/your-username/nopcommerce-playwright-tests.git
2.	Navigate to the project directory:
cd nopcommerce-playwright-tests
3.	Install dependencies:
npm install
4.	Install Playwright browsers:
npx playwright install
________________________________________
**Running the Tests
Run All Tests**
To execute all test scenarios, run the following command:
npx playwright test

**Run Specific Test Scenarios**
You can run individual test scenarios using the following commands:
•	Scenario 1: User Signup and Checkout
npx playwright test tests/scenario1.spec.ts
•	Scenario 2: Cart Functionality Validation
npx playwright test tests/scenario2.spec.ts
•	Scenario 3: Verify Filter by Price
npx playwright test tests/scenario3.spec.ts

**Run Tests in Debug Mode**
To debug the tests, use the following command:
npx playwright test --debug

**Run Tests in Headed Mode**
To view the browser while running the tests, use the --headed flag:
npx playwright test --headed
________________________________________
**Test Scenarios**
**Scenario 1: User Signup and Checkout**
1.	Navigate to the website.
2.	Register a new user.
3.	Search for the product "Build your own computer".
4.	Add the product to the cart and complete the checkout process.
5.	Verify successful order placement and check order history.
**Scenario 2: Cart Functionality Validation**
1.	Add multiple products to the cart.
2.	Modify the quantity of a product.
3.	Remove a product from the cart.
4.	Verify that the cart updates correctly.
**Scenario 3: Verify Filter by Price**
1.	Navigate to the "Jewelry" section.
2.	Adjust the price filter slider to the range 25to25to500.
3.	Verify that only 2 products are displayed.
________________________________________
**CI/CD Integration**
The tests are integrated with GitHub Actions for continuous integration. The workflow is defined in .github/workflows/playwright.yml.
Triggering the Pipeline
•	The pipeline runs automatically on every push to the main branch.
•	You can also trigger it manually from the Actions tab in GitHub.
Viewing Test Results
•	Test results, including screenshots, videos, and traces, are stored as artifacts in the GitHub Actions workflow.
•	To view the artifacts, navigate to the Actions tab, select the latest workflow run, and download the artifacts.
________________________________________
** Issues**

**Defect 1: CAPTCHA or Security Checks**
**Defect ID: DEF-001**
Title: CAPTCHA or Security Check Prevents Automated Execution
Module: User Registration
Environment: Windows 10, Playwright v1.41
Description: The website displays a CAPTCHA/security check during automated tests, preventing successful user registration. This causes timeouts and blocks automation.
Steps to Reproduce:
Open https://demo.nopcommerce.com/register using Playwright.
Fill in all required registration fields.
Submit the registration form.
Observe that the site prompts for CAPTCHA verification, causing test execution to fail.
Expected Result: The user should be able to register successfully without manual intervention.
Actual Result: CAPTCHA prompt prevents automation from completing the registration process.
Severity: High (Blocks automated test execution).
Priority: Medium.
Workaround: Disable CAPTCHA in the test environment (if possible) or manually solve CAPTCHA during test execution.
Attachments: Screenshots/log files (if applicable).

**Defect 2: Timeout Errors Due to waitForSelector**
**Defect ID: DEF-002**
Title: Timeout Errors in Playwright Due to waitForSelector
Module: Search, Checkout, Order History
Environment: Windows 10, Playwright v1.41
Description: Some Playwright tests fail due to timeouts when waiting for elements using waitForSelector(). This issue occurs intermittently, especially on slower networks.
Steps to Reproduce:
Run Playwright tests that require searching for a product or checking order history.
The test waits for elements using await page.waitForSelector(selector, { timeout: 15000 }).
On some occasions, the element is not found within the timeout period, causing the test to fail.
Expected Result: The selector should be located within the timeout duration, and the test should proceed without failure.
Actual Result: Tests fail due to timeout errors when waitForSelector() does not find the expected elements.
Severity: Medium (Causes flaky tests).
Priority: High.
Workaround: Increase the timeout value or verify that the selectors are correct. Alternatively, use await page.waitForLoadState('domcontentloaded') before interacting with elements.
Attachments: Screenshots/log files (if applicable).

**Reporting and Artifacts**
**Test Reports**
•	Playwright generates an HTML report after each test run. To view the report, run:
npx playwright show-report
**Screenshots and Videos**
•	Screenshots and videos are automatically captured for failed tests and stored in the test-results directory.
**Traces**
•	Playwright traces are available for debugging. To view traces, use:
npx playwright show-trace

**Challenges Faced:**
1. Handling CAPTCHA During User Registration
Issue: The registration process on nopCommerce requires solving a CAPTCHA, which prevents automation from completing the process.
Solution:
Bypassed CAPTCHA by using a pre-created test account.
Alternative: Used third-party CAPTCHA-solving services (if allowed in real-world scenarios).

2. Dynamic Element Handling (Timeouts & Waiting)
Issue: Some elements took longer to load (e.g., the price filter slider and order confirmation page).
Solution:
Used await page.waitForSelector() to ensure elements are fully loaded before interaction.
Added { timeout: 20000, state: 'visible' } where needed.

3. Test Failures Due to Hardcoded Selectors
Issue: Certain elements' attributes (IDs, classes) were dynamic.
Solution:
Used Playwright locators (page.locator()) instead of hardcoded CSS/XPath.
Preferred text-based locators for more stable element identification.

4.Data Management for Unique User Creation
Issue: Registering new users required unique email addresses.
Solution:
Generated random emails dynamically (testuser_{Date.now()}@example.com).
Alternative: Used a pre-configured test account.

5.CI/CD Integration with GitHub Actions
Issue: Setting up Playwright testing in GitHub Actions.
Solution:
Implemented .github/workflows/playwright.yml to automate test execution in CI/CD.
Used npx playwright install --with-deps to install required dependencies.

**** Assumptions Made****
Guest Checkout is Disabled

Assumed user registration is required before purchase.
Default Shipping & Payment Options Are Available

Assumed at least one shipping and payment method is always available.
Site is Consistently Available

Assumed no major downtime or UI changes in nopCommerce.
Currency & Pricing Stay the Same

Assumed price filters ($25 - $500) would consistently show two products.

**Improvements Made to Enhance the Framework**

**1.Improved Error Handling**
Added try-catch blocks for handling unexpected site errors.
Example:
try {
    await page.click('button#checkout');
} catch (error) {
    console.error("Checkout button not found", error);
}

**2. Added Reporting & Debugging Tools**
Enabled Playwright's built-in reporting:
reporter: [['html', { outputFolder: 'playwright-report' }]]
Captured Screenshots & Videos on failure:
use: { screenshot: 'only-on-failure', video: 'retain-on-failure' }

**3. Implemented Parallel Test Execution**
Reduces execution time.
Configured Playwright to run tests in parallel:
fullyParallel: true
workers: 4

**4.Attempted Page Object Model (POM) Implementation**
To improve code reusability and maintainability.
Created a pages/ folder and attempted to organize locators and functions into:
registerPage.ts
searchPage.ts
checkoutPage.ts
However, encountered issues with Playwright’s context handling across multiple pages.
Future Improvement:
Refactor tests to ensure POM implementation is fully effective.
