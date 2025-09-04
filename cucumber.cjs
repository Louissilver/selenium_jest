module.exports = {
  default: {
    paths: ['src/tests/features/**/*.feature'],
    require: ['src/tests/step-definitions/**/*.js', 'src/config/cucumber.js'],
    requireModule: ['dotenv/config'],
    format: [
      'progress-bar',
      'json:reports/cucumber/cucumber-report.json',
      'html:reports/cucumber/cucumber-report.html',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    strict: true,
    worldParameters: {},
    timeout: 60000, // 60 seconds timeout for steps
  },
};
