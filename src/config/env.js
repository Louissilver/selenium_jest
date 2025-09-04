import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://gadget-shop-complete-xf3n.bolt.host',
  browser: process.env.BROWSER || 'chrome',
  headless: process.env.HEADLESS === 'true',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT, 10) || 30000,
};
