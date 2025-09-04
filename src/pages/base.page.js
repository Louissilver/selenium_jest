import { until } from 'selenium-webdriver';
import { config } from '../config/env.js';

/**
 * Base Page class containing common functionality for all page objects
 */
export class BasePage {
  /**
   * @param {WebDriver} driver - Selenium WebDriver instance
   */
  constructor(driver) {
    this.driver = driver;
    this.timeout = config.defaultTimeout;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async navigateTo(url) {
    await this.driver.get(url);
  }

  /**
   * Wait for an element to be located and visible
   * @param {By} locator - Element locator
   * @param {number} timeout - Custom timeout (optional)
   * @returns {Promise<WebElement>} The found element
   */
  async waitForElement(locator, timeout = this.timeout) {
    return this.driver.wait(until.elementLocated(locator), timeout);
  }

  /**
   * Wait for an element to be visible
   * @param {By} locator - Element locator
   * @param {number} timeout - Custom timeout (optional)
   * @returns {Promise<WebElement>} The visible element
   */
  async waitForElementVisible(locator, timeout = this.timeout) {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  /**
   * Wait for an element to be clickable
   * @param {By} locator - Element locator
   * @param {number} timeout - Custom timeout (optional)
   * @returns {Promise<WebElement>} The clickable element
   */
  async waitForElementClickable(locator, timeout = this.timeout) {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  }

  /**
   * Find an element
   * @param {By} locator - Element locator
   * @returns {Promise<WebElement>} The found element
   */
  async findElement(locator) {
    return this.driver.findElement(locator);
  }

  /**
   * Find multiple elements
   * @param {By} locator - Element locator
   * @returns {Promise<WebElement[]>} Array of found elements
   */
  async findElements(locator) {
    return this.driver.findElements(locator);
  }

  /**
   * Click on an element
   * @param {By} locator - Element locator
   */
  async click(locator) {
    const element = await this.waitForElementClickable(locator);
    await element.click();
  }

  /**
   * Type text into an element
   * @param {By} locator - Element locator
   * @param {string} text - Text to type
   */
  async type(locator, text) {
    const element = await this.waitForElementVisible(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  /**
   * Get text from an element
   * @param {By} locator - Element locator
   * @returns {Promise<string>} Element text
   */
  async getText(locator) {
    const element = await this.waitForElementVisible(locator);
    return element.getText();
  }

  /**
   * Check if an element is displayed
   * @param {By} locator - Element locator
   * @returns {Promise<boolean>} True if element is displayed
   */
  async isElementDisplayed(locator) {
    try {
      const element = await this.findElement(locator);
      return element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the current page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return this.driver.getTitle();
  }

  /**
   * Get the current page URL
   * @returns {Promise<string>} Current URL
   */
  async getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }

  /**
   * Wait for page to load (wait for document ready state)
   * @param {number} timeout - Custom timeout (optional)
   */
  async waitForPageLoad(timeout = this.timeout) {
    await this.driver.wait(
      async () => {
        const readyState = await this.driver.executeScript('return document.readyState');
        return readyState === 'complete';
      },
      timeout,
    );
  }

  /**
   * Scroll to an element
   * @param {By} locator - Element locator
   */
  async scrollToElement(locator) {
    const element = await this.waitForElement(locator);
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
  }

  /**
   * Take a screenshot
   * @returns {Promise<string>} Base64 encoded screenshot
   */
  async takeScreenshot() {
    return this.driver.takeScreenshot();
  }
}
