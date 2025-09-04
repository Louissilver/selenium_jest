import { By } from 'selenium-webdriver';

/**
 * Home page element selectors
 * All selectors for the home page are centralized here
 */
export const homeElements = {
  // Header elements
  header: By.css('header'),
  logo: By.css('[data-testid="logo"], .logo, header img'),
  navigationMenu: By.css('nav, .navigation'),

  // Main content elements
  mainContent: By.css('main, .main-content, #main'),
  pageTitle: By.css('h1, .page-title, [data-testid="page-title"]'),

  // Product elements
  productGrid: By.css('.products, .product-grid, [data-testid="products-grid"]'),
  productCards: By.css('.product-card, .product-item, [data-testid*="product-card"], [name="product-card"]'),
  productTitle: By.css('.product-title, .product-name, h2, h3'),
  productPrice: By.css('.price, .product-price, [data-testid="product-price"]'),
  productImage: By.css('.product-image img, .product-img, [data-testid="product-image"]'),

  // Loading and error states
  loadingSpinner: By.css('.loading, .spinner, [data-testid="loading"]'),
  errorMessage: By.css('.error, .error-message, [data-testid="error"]'),

  // Footer elements
  footer: By.css('footer'),

  // Common interactive elements
  buttons: By.css('button'),
  links: By.css('a'),
};
