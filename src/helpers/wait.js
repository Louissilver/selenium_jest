import { until } from 'selenium-webdriver';

/**
 * Custom wait helper functions for enhanced waiting capabilities
 */
export class WaitHelper {
  constructor(driver, defaultTimeout = 30000) {
    this.driver = driver;
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * Wait for element to contain specific text
   * @param {By} locator - Element locator
   * @param {string} text - Expected text
   * @param {number} timeout - Custom timeout
   * @returns {Promise<WebElement>} Element containing the text
   */
  async waitForElementToContainText(locator, text, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      try {
        const element = await this.driver.findElement(locator);
        const elementText = await element.getText();
        return elementText.includes(text) ? element : false;
      } catch (error) {
        return false;
      }
    }, timeout, `Element with locator ${locator} did not contain text "${text}" within ${timeout}ms`);
  }

  /**
   * Wait for element to have specific attribute value
   * @param {By} locator - Element locator
   * @param {string} attribute - Attribute name
   * @param {string} value - Expected attribute value
   * @param {number} timeout - Custom timeout
   * @returns {Promise<WebElement>} Element with the attribute value
   */
  async waitForElementAttribute(locator, attribute, value, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      try {
        const element = await this.driver.findElement(locator);
        const attributeValue = await element.getAttribute(attribute);
        return attributeValue === value ? element : false;
      } catch (error) {
        return false;
      }
    }, timeout, `Element attribute "${attribute}" did not equal "${value}" within ${timeout}ms`);
  }

  /**
   * Wait for element to disappear
   * @param {By} locator - Element locator
   * @param {number} timeout - Custom timeout
   * @returns {Promise<boolean>} True when element disappears
   */
  async waitForElementToDisappear(locator, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      try {
        const elements = await this.driver.findElements(locator);
        return elements.length === 0;
      } catch (error) {
        return true;
      }
    }, timeout, `Element with locator ${locator} did not disappear within ${timeout}ms`);
  }

  /**
   * Wait for specific number of elements
   * @param {By} locator - Element locator
   * @param {number} count - Expected number of elements
   * @param {number} timeout - Custom timeout
   * @returns {Promise<WebElement[]>} Array of elements
   */
  async waitForElementCount(locator, count, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      try {
        const elements = await this.driver.findElements(locator);
        return elements.length === count ? elements : false;
      } catch (error) {
        return false;
      }
    }, timeout, `Expected ${count} elements but found different count within ${timeout}ms`);
  }

  /**
   * Wait for URL to contain specific text
   * @param {string} urlPart - Expected URL part
   * @param {number} timeout - Custom timeout
   * @returns {Promise<string>} Current URL
   */
  async waitForUrlToContain(urlPart, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes(urlPart) ? currentUrl : false;
    }, timeout, `URL did not contain "${urlPart}" within ${timeout}ms`);
  }

  /**
   * Wait for title to contain specific text
   * @param {string} titlePart - Expected title part
   * @param {number} timeout - Custom timeout
   * @returns {Promise<string>} Current title
   */
  async waitForTitleToContain(titlePart, timeout = this.defaultTimeout) {
    return this.driver.wait(async () => {
      const currentTitle = await this.driver.getTitle();
      return currentTitle.includes(titlePart) ? currentTitle : false;
    }, timeout, `Title did not contain "${titlePart}" within ${timeout}ms`);
  }

  /**
   * Wait with custom condition function
   * @param {Function} conditionFn - Custom condition function
   * @param {number} timeout - Custom timeout
   * @param {string} message - Error message
   * @returns {Promise<any>} Result of condition function
   */
  async waitForCustomCondition(conditionFn, timeout = this.defaultTimeout, message = 'Custom condition not met') {
    return this.driver.wait(conditionFn, timeout, message);
  }

  /**
   * Simple sleep/delay function
   * @param {number} milliseconds - Time to wait in milliseconds
   * @returns {Promise<void>}
   */
  async sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
