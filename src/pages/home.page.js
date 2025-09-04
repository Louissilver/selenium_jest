import { BasePage } from './base.page.js';
import { homeElements } from '../elements/home.elements.js';
import { config } from '../config/env.js';

/**
 * Home Page class implementing Page Object Model pattern
 */
export class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = config.baseUrl;
  }

  /**
   * Navigate to the home page
   */
  async open() {
    await this.navigateTo(this.url);
    await this.waitForPageLoad();
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageToLoad() {
    await this.waitForElementVisible(homeElements.mainContent);
    await this.waitForPageLoad();
  }

  /**
   * Check if the header is displayed
   * @returns {Promise<boolean>} True if header is visible
   */
  async isHeaderDisplayed() {
    return this.isElementDisplayed(homeElements.header);
  }

  /**
   * Check if the logo is displayed
   * @returns {Promise<boolean>} True if logo is visible
   */
  async isLogoDisplayed() {
    return this.isElementDisplayed(homeElements.logo);
  }

  /**
   * Check if the navigation menu is displayed
   * @returns {Promise<boolean>} True if navigation is visible
   */
  async isNavigationDisplayed() {
    return this.isElementDisplayed(homeElements.navigationMenu);
  }

  /**
   * Get the page title text
   * @returns {Promise<string>} Page title text
   */
  async getPageTitleText() {
    try {
      return await this.getText(homeElements.pageTitle);
    } catch (error) {
      // If no specific page title element, return document title
      return this.getTitle();
    }
  }

  /**
   * Check if product grid is displayed
   * @returns {Promise<boolean>} True if product grid is visible
   */
  async isProductGridDisplayed() {
    return this.isElementDisplayed(homeElements.productGrid);
  }

  /**
   * Get all product cards
   * @returns {Promise<WebElement[]>} Array of product card elements
   */
  async getProductCards() {
    await this.waitForElementVisible(homeElements.productGrid);
    return this.findElements(homeElements.productCards);
  }

  /**
   * Get the number of product cards displayed
   * @returns {Promise<number>} Number of product cards
   */
  async getProductCardsCount() {
    const cards = await this.getProductCards();
    return cards.length;
  }

  /**
   * Get product information from the first product card
   * @returns {Promise<Object>} Product information object
   */
  async getFirstProductInfo() {
    const cards = await this.getProductCards();
    if (cards.length === 0) {
      throw new Error('No product cards found');
    }

    const firstCard = cards[0];

    try {
      // Get product title
      const titleElement = await firstCard.findElement(homeElements.productTitle);
      const title = await titleElement.getText();

      // Get product price
      let price = 'N/A';
      try {
        const priceElement = await firstCard.findElement(homeElements.productPrice);
        price = await priceElement.getText();
      } catch (error) {
        // Price element might not be found, continue with N/A
      }

      // Check if product image is displayed
      let hasImage = false;
      try {
        const imageElement = await firstCard.findElement(homeElements.productImage);
        hasImage = await imageElement.isDisplayed();
      } catch (error) {
        // Image element might not be found
      }

      return {
        title,
        price,
        hasImage,
      };
    } catch (error) {
      throw new Error(`Failed to get product information: ${error.message}`);
    }
  }

  /**
   * Check if the page is loading
   * @returns {Promise<boolean>} True if loading spinner is visible
   */
  async isPageLoading() {
    return this.isElementDisplayed(homeElements.loadingSpinner);
  }

  /**
   * Check if there's an error message displayed
   * @returns {Promise<boolean>} True if error message is visible
   */
  async hasErrorMessage() {
    return this.isElementDisplayed(homeElements.errorMessage);
  }

  /**
   * Get error message text if displayed
   * @returns {Promise<string|null>} Error message text or null
   */
  async getErrorMessage() {
    if (await this.hasErrorMessage()) {
      return this.getText(homeElements.errorMessage);
    }
    return null;
  }

  /**
   * Check if footer is displayed
   * @returns {Promise<boolean>} True if footer is visible
   */
  async isFooterDisplayed() {
    return this.isElementDisplayed(homeElements.footer);
  }

  /**
   * Verify that the home page has loaded successfully
   * @returns {Promise<boolean>} True if page loaded successfully
   */
  async verifyPageLoaded() {
    try {
      // Wait for main content to be visible
      await this.waitForElementVisible(homeElements.mainContent);

      // Verify that essential elements are present
      const hasHeader = await this.isHeaderDisplayed();
      const hasMainContent = await this.isElementDisplayed(homeElements.mainContent);

      return hasHeader && hasMainContent;
    } catch (error) {
      return false;
    }
  }
}
