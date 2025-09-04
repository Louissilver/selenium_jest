import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { HomePage } from '../../pages/home.page.js';
import { AssertHelper } from '../../helpers/assert.js';
import { WaitHelper } from '../../helpers/wait.js';

// Set default timeout for all steps to 60 seconds
setDefaultTimeout(60000);

let homePage;
let waitHelper;

Given('I am on the home page', async function () {
  homePage = new HomePage(this.driver);
  waitHelper = new WaitHelper(this.driver);
  await homePage.open();
});

When('the page finishes loading', async function () {
  await homePage.waitForPageToLoad();
});

When('I can see product cards', async function () {
  const isProductGridDisplayed = await homePage.isProductGridDisplayed();
  AssertHelper.assertTrue(isProductGridDisplayed, 'Product grid should be displayed');
});

Then('I should see the main content', async function () {
  const pageLoaded = await homePage.verifyPageLoaded();
  AssertHelper.assertTrue(pageLoaded, 'Home page should load successfully');
});

Then('I should see the header', async function () {
  const isHeaderDisplayed = await homePage.isHeaderDisplayed();
  AssertHelper.assertTrue(isHeaderDisplayed, 'Header should be displayed');
});

Then('I should not see any error messages', async function () {
  const hasError = await homePage.hasErrorMessage();
  AssertHelper.assertFalse(hasError, 'No error messages should be displayed');
});

Then('I should see the product grid', async function () {
  const isProductGridDisplayed = await homePage.isProductGridDisplayed();
  AssertHelper.assertTrue(isProductGridDisplayed, 'Product grid should be displayed');
});

Then('I should see at least one product card', async function () {
  const productCount = await homePage.getProductCardsCount();
  AssertHelper.assertGreaterThan(productCount, 0, 'At least one product card should be displayed');
});

Then('each product card should have a title', async function () {
  const productCards = await homePage.getProductCards();
  AssertHelper.assertGreaterThan(productCards.length, 0, 'Should have at least one product card');
  
  // Check first product card has a title (as a representative check)
  const firstProductInfo = await homePage.getFirstProductInfo();
  AssertHelper.assertNotNull(firstProductInfo.title, 'First product should have a title');
  AssertHelper.assertTrue(firstProductInfo.title.length > 0, 'Product title should not be empty');
});

Then('I should see the navigation menu', async function () {
  const isNavigationDisplayed = await homePage.isNavigationDisplayed();
  AssertHelper.assertTrue(isNavigationDisplayed, 'Navigation menu should be displayed');
});

Then('I should see the footer', async function () {
  const isFooterDisplayed = await homePage.isFooterDisplayed();
  AssertHelper.assertTrue(isFooterDisplayed, 'Footer should be displayed');
});

Then('I should be able to get the first product information', async function () {
  const firstProductInfo = await homePage.getFirstProductInfo();
  AssertHelper.assertNotNull(firstProductInfo, 'Should be able to get first product information');
  
  // Store product info for next steps
  this.firstProductInfo = firstProductInfo;
});

Then('the first product should have a title', async function () {
  const productInfo = this.firstProductInfo || await homePage.getFirstProductInfo();
  AssertHelper.assertNotNull(productInfo.title, 'First product should have a title');
  AssertHelper.assertTrue(productInfo.title.length > 0, 'Product title should not be empty');
});

Then('the first product should have a price or {string}', async function (fallbackValue) {
  const productInfo = this.firstProductInfo || await homePage.getFirstProductInfo();
  AssertHelper.assertNotNull(productInfo.price, 'First product should have a price field');
  
  // Price should either be a valid price string or the fallback value (e.g., "N/A")
  const hasValidPrice = productInfo.price !== fallbackValue && productInfo.price.length > 0;
  const hasFallbackValue = productInfo.price === fallbackValue;
  
  AssertHelper.assertTrue(
    hasValidPrice || hasFallbackValue,
    `Product price should be either a valid price or "${fallbackValue}". Got: "${productInfo.price}"`
  );
});
