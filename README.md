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
**Known Issues**
1.	CAPTCHA or Security Checks:
o	The website may display a CAPTCHA or security check during automated tests, causing timeouts.
o	Workaround: Disable CAPTCHA in the test environment (if possible) or handle it manually during test execution.
2.	Timeout Errors:
o	Some tests may fail due to timeout issues with waitForSelector.
o	Workaround: Increase the timeout value or verify that the selectors are correct.
________________________________________
**Reporting and Artifacts**
**Test Reports**
•	Playwright generates an HTML report after each test run. To view the report, run:
npx playwright show-report
**Screenshots and Videos**
•	Screenshots and videos are automatically captured for failed tests and stored in the test-results directory.
**Traces**
•	Playwright traces are available for debugging. To view traces, use:
npx playwright show-trace

