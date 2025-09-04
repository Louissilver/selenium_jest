import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import edge from 'selenium-webdriver/edge.js';
import { config } from './env.js';

/**
 * Creates and configures a WebDriver instance based on environment settings
 * @returns {Promise<WebDriver>} Configured WebDriver instance
 */
export async function createDriver() {
  let driver;
  const capabilities = new Capabilities();

  switch (config.browser.toLowerCase()) {
  case 'chrome': {
    const chromeOptions = new chrome.Options();
    if (config.headless) {
      chromeOptions.addArguments('--headless=new');
    }
    chromeOptions.addArguments(
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    );
      
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    break;
  }
  case 'firefox': {
    const firefoxOptions = new firefox.Options();
    if (config.headless) {
      firefoxOptions.addArguments('--headless');
    }
    firefoxOptions.addArguments('--width=1920', '--height=1080');
      
    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(firefoxOptions)
      .build();
    break;
  }
  case 'edge': {
    const edgeOptions = new edge.Options();
    if (config.headless) {
      edgeOptions.addArguments('--headless=new');
    }
    edgeOptions.addArguments(
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    );
      
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(edgeOptions)
      .build();
    break;
  }
  default:
    throw new Error(`Unsupported browser: ${config.browser}`);
  }

  // Set implicit wait timeout
  await driver.manage().setTimeouts({
    implicit: config.defaultTimeout,
    pageLoad: config.defaultTimeout * 2,
    script: config.defaultTimeout,
  });

  return driver;
}

/**
 * Quits the WebDriver instance safely
 * @param {WebDriver} driver - The WebDriver instance to quit
 */
export async function quitDriver(driver) {
  if (driver) {
    try {
      await driver.quit();
    } catch (error) {
      console.warn('Error while quitting driver:', error.message);
    }
  }
}
