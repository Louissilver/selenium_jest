import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import fs from 'fs/promises';
import path from 'path';
import { createDriver, quitDriver } from './selenium.js';

let driver;

/**
 * Global setup before all scenarios
 */
BeforeAll(async function () {
  // Ensure reports directories exist
  const reportsDir = path.join(process.cwd(), 'reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');
  
  try {
    await fs.mkdir(reportsDir, { recursive: true });
    await fs.mkdir(screenshotsDir, { recursive: true });
    await fs.mkdir(path.join(reportsDir, 'cucumber'), { recursive: true });
  } catch (error) {
    console.warn('Error creating reports directories:', error.message);
  }
});

/**
 * Setup before each scenario
 */
Before(async function (scenario) {
  // Create a new driver instance for each scenario
  driver = await createDriver();
  
  // Attach driver to the world context
  this.driver = driver;
  this.scenario = scenario;
});

/**
 * Cleanup after each scenario
 */
After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === 'FAILED') {
    try {
      const screenshot = await this.driver.takeScreenshot();
      const screenshotPath = path.join(
        'reports',
        'screenshots',
        `${scenario.pickle.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.png`
      );
      
      await fs.writeFile(screenshotPath, screenshot, 'base64');
      
      // Attach screenshot to Cucumber report
      this.attach(screenshot, 'image/png');
    } catch (error) {
      console.warn('Error taking screenshot:', error.message);
    }
  }
  
  // Quit the driver
  await quitDriver(this.driver);
});

/**
 * Global cleanup after all scenarios
 */
AfterAll(async function () {
  // Any global cleanup can be done here
  console.log('All scenarios completed');
});
