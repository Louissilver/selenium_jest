/**
 * Custom assertion helper functions for enhanced test validations
 */
export class AssertHelper {
  /**
   * Assert that a value is truthy
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertTrue(actual, message = 'Expected value to be truthy') {
    if (!actual) {
      throw new Error(`${message}. Got: ${actual}`);
    }
  }

  /**
   * Assert that a value is falsy
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertFalse(actual, message = 'Expected value to be falsy') {
    if (actual) {
      throw new Error(`${message}. Got: ${actual}`);
    }
  }

  /**
   * Assert that two values are equal
   * @param {any} actual - Actual value
   * @param {any} expected - Expected value
   * @param {string} message - Error message
   */
  static assertEqual(actual, expected, message = 'Values are not equal') {
    if (actual !== expected) {
      throw new Error(`${message}. Expected: ${expected}, Got: ${actual}`);
    }
  }

  /**
   * Assert that two values are not equal
   * @param {any} actual - Actual value
   * @param {any} expected - Expected value
   * @param {string} message - Error message
   */
  static assertNotEqual(actual, expected, message = 'Values should not be equal') {
    if (actual === expected) {
      throw new Error(`${message}. Both values are: ${actual}`);
    }
  }

  /**
   * Assert that a string contains another string
   * @param {string} actual - Actual string
   * @param {string} expected - Expected substring
   * @param {string} message - Error message
   */
  static assertContains(actual, expected, message = 'String does not contain expected substring') {
    if (!actual.includes(expected)) {
      throw new Error(`${message}. Expected "${actual}" to contain "${expected}"`);
    }
  }

  /**
   * Assert that a string does not contain another string
   * @param {string} actual - Actual string
   * @param {string} expected - Substring that should not be present
   * @param {string} message - Error message
   */
  static assertNotContains(actual, expected, message = 'String should not contain substring') {
    if (actual.includes(expected)) {
      throw new Error(`${message}. Expected "${actual}" to not contain "${expected}"`);
    }
  }

  /**
   * Assert that a value is null
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertNull(actual, message = 'Expected value to be null') {
    if (actual !== null) {
      throw new Error(`${message}. Got: ${actual}`);
    }
  }

  /**
   * Assert that a value is not null
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertNotNull(actual, message = 'Expected value to not be null') {
    if (actual === null) {
      throw new Error(`${message}. Got: null`);
    }
  }

  /**
   * Assert that a value is undefined
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertUndefined(actual, message = 'Expected value to be undefined') {
    if (actual !== undefined) {
      throw new Error(`${message}. Got: ${actual}`);
    }
  }

  /**
   * Assert that a value is not undefined
   * @param {any} actual - Actual value
   * @param {string} message - Error message
   */
  static assertNotUndefined(actual, message = 'Expected value to not be undefined') {
    if (actual === undefined) {
      throw new Error(`${message}. Got: undefined`);
    }
  }

  /**
   * Assert that a number is greater than another number
   * @param {number} actual - Actual number
   * @param {number} expected - Expected minimum value
   * @param {string} message - Error message
   */
  static assertGreaterThan(actual, expected, message = 'Expected value to be greater') {
    if (actual <= expected) {
      throw new Error(`${message}. Expected ${actual} to be greater than ${expected}`);
    }
  }

  /**
   * Assert that a number is less than another number
   * @param {number} actual - Actual number
   * @param {number} expected - Expected maximum value
   * @param {string} message - Error message
   */
  static assertLessThan(actual, expected, message = 'Expected value to be less') {
    if (actual >= expected) {
      throw new Error(`${message}. Expected ${actual} to be less than ${expected}`);
    }
  }

  /**
   * Assert that an array has a specific length
   * @param {Array} array - Array to check
   * @param {number} expectedLength - Expected length
   * @param {string} message - Error message
   */
  static assertArrayLength(array, expectedLength, message = 'Array length does not match') {
    if (!Array.isArray(array)) {
      throw new Error(`${message}. Expected an array but got: ${typeof array}`);
    }
    if (array.length !== expectedLength) {
      throw new Error(`${message}. Expected length ${expectedLength}, got ${array.length}`);
    }
  }

  /**
   * Assert that an element is displayed
   * @param {WebElement} element - WebElement to check
   * @param {string} message - Error message
   */
  static async assertElementDisplayed(element, message = 'Element is not displayed') {
    const isDisplayed = await element.isDisplayed();
    if (!isDisplayed) {
      throw new Error(message);
    }
  }

  /**
   * Assert that an element is not displayed
   * @param {WebElement} element - WebElement to check
   * @param {string} message - Error message
   */
  static async assertElementNotDisplayed(element, message = 'Element should not be displayed') {
    const isDisplayed = await element.isDisplayed();
    if (isDisplayed) {
      throw new Error(message);
    }
  }

  /**
   * Assert that an element is enabled
   * @param {WebElement} element - WebElement to check
   * @param {string} message - Error message
   */
  static async assertElementEnabled(element, message = 'Element is not enabled') {
    const isEnabled = await element.isEnabled();
    if (!isEnabled) {
      throw new Error(message);
    }
  }

  /**
   * Assert that an element text matches expected value
   * @param {WebElement} element - WebElement to check
   * @param {string} expectedText - Expected text
   * @param {string} message - Error message
   */
  static async assertElementText(element, expectedText, message = 'Element text does not match') {
    const actualText = await element.getText();
    if (actualText !== expectedText) {
      throw new Error(`${message}. Expected: "${expectedText}", Got: "${actualText}"`);
    }
  }
}
