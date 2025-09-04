import { config } from './env.js';

// Global test timeout
jest.setTimeout(config.defaultTimeout);

// Global test setup
beforeAll(() => {
  console.log('Starting Jest test suite...');
});

afterAll(() => {
  console.log('Jest test suite completed.');
});

// Global test configuration
global.testConfig = config;
