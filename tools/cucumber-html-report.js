import report from 'multiple-cucumber-html-reporter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate Cucumber HTML report from JSON results
 */
function generateCucumberReport() {
  const reportOptions = {
    jsonDir: path.join(__dirname, '../reports/cucumber/'),
    reportPath: path.join(__dirname, '../reports/cucumber/'),
    metadata: {
      browser: {
        name: process.env.BROWSER || 'chrome',
        version: 'Latest',
      },
      device: 'Local Test Machine',
      platform: {
        name: process.platform,
        version: process.version,
      },
    },
    customData: {
      title: 'Selenium + Jest + Cucumber Test Results',
      data: [
        { label: 'Project', value: 'Gadget Shop E2E Tests' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Cycle', value: 'Smoke Tests' },
        { label: 'Execution Start Time', value: new Date().toLocaleString() },
      ],
    },
  };

  try {
    report.generate(reportOptions);
    console.log('✅ Cucumber HTML report generated successfully!');
    console.log(`📊 Report location: ${reportOptions.reportPath}`);
  } catch (error) {
    console.error('❌ Error generating Cucumber HTML report:', error.message);
    process.exit(1);
  }
}

// Run the report generation if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCucumberReport();
}

export { generateCucumberReport };
