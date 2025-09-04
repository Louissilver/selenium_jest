module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'reports/jest/coverage',
  coverageReporters: ['html', 'text', 'lcov'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/jest',
      filename: 'report.html',
      expand: true,
    }],
  ],
  testTimeout: 30000,
  transform: {}
};
