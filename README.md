# Selenium + Jest + Cucumber Automation Framework

[![CI](https://github.com/Louissilver/selenium_jest/actions/workflows/ci.yml/badge.svg)](https://github.com/Louissilver/selenium_jest/actions/workflows/ci.yml)
[![PR Validation](https://github.com/Louissilver/selenium_jest/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/Louissilver/selenium_jest/actions/workflows/pr-validation.yml)
[![Release](https://github.com/Louissilver/selenium_jest/actions/workflows/release.yml/badge.svg)](https://github.com/Louissilver/selenium_jest/actions/workflows/release.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.x-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Selenium](https://img.shields.io/badge/Selenium-4.35.0-green)](https://www.selenium.dev/)
[![Jest](https://img.shields.io/badge/Jest-30.1.3-red)](https://jestjs.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-12.2.0-brightgreen)](https://cucumber.io/)

A comprehensive E2E automation framework built with Selenium WebDriver, Jest, and Cucumber.js following the Page Object Model (POM) pattern.

## 📋 Table of Contents

- [🚀 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🛠️ Setup](#️-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [⚙️ Configuration](#️-configuration)
- [🧪 Running Tests](#-running-tests)
  - [E2E Tests (Cucumber)](#e2e-tests-cucumber)
  - [Unit Tests (Jest)](#unit-tests-jest)
  - [Linting](#linting)
- [📊 Reports](#-reports)
- [🏗️ Architecture](#️-architecture)
  - [Page Object Model](#page-object-model)
  - [Configuration](#configuration)
  - [Helpers & Utilities](#helpers--utilities)
- [🚦 CI/CD Pipeline (GitHub Actions)](#-cicd-pipeline-github-actions)
  - [🔄 Continuous Integration](#-continuous-integration-ciyml)
  - [🔍 Pull Request Validation](#-pull-request-validation-pr-validationyml)
  - [🚀 Release Pipeline](#-release-pipeline-releaseyml)
  - [📊 CI/CD Features](#-cicd-features)
  - [🏃‍♂️ Running Tests by Tags](#️-running-tests-by-tags)
  - [🔧 CI Configuration](#-ci-configuration)
- [🔧 Development](#-development)
  - [Adding New Tests](#adding-new-tests)
  - [Code Quality](#code-quality)
- [📝 Example Test](#-example-test)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

- **Selenium WebDriver** for browser automation
- **Cucumber.js** for BDD-style feature files
- **Jest** for unit testing helpers and factories
- **Page Object Model** with separated Elements layer
- **HTML Reports** for both E2E and unit tests
- **ESLint** with Airbnb configuration
- **Husky** for Git hooks (pre-commit linting, commit message validation)
- **Environment-based configuration**
- **Screenshot capture** on test failures

## 📁 Project Structure

```
├── .husky/                     # Git hooks
├── .vscode/                    # VS Code settings
├── reports/                    # Test reports and screenshots
│   ├── cucumber/              # Cucumber HTML reports
│   ├── jest/                  # Jest HTML reports
│   └── screenshots/           # Failure screenshots
├── src/
│   ├── config/                # Configuration files
│   │   ├── env.js            # Environment configuration
│   │   ├── selenium.js       # WebDriver setup
│   │   ├── cucumber.js       # Cucumber hooks
│   │   └── jest.setup.js     # Jest setup
│   ├── data/
│   │   └── factories/        # Test data factories
│   │       └── userFactory.js
│   ├── elements/             # Element selectors
│   │   └── home.elements.js
│   ├── helpers/              # Utility functions
│   │   ├── wait.js          # Wait helpers
│   │   └── assert.js        # Assertion helpers
│   ├── pages/               # Page Object classes
│   │   ├── base.page.js     # Base page class
│   │   └── home.page.js     # Home page class
│   └── tests/
│       ├── features/        # Cucumber feature files
│       │   └── home.feature
│       └── step-definitions/ # Step definition files
│           └── home.steps.js
├── __tests__/               # Jest unit tests
│   └── userFactory.test.js
├── tools/                   # Utility scripts
│   └── cucumber-html-report.js
└── Configuration files...
```

## 🛠️ Setup

### Prerequisites

- Node.js (>= 18)
- Chrome/Firefox/Edge browser
- ChromeDriver/GeckoDriver/EdgeDriver (for local execution)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Initialize Husky:
   ```bash
   npm run prepare
   ```

## ⚙️ Configuration

Edit `.env` file to configure:

```env
BASE_URL=https://gadget-shop-complete-xf3n.bolt.host
BROWSER=chrome          # chrome, firefox, edge
HEADLESS=true          # true/false
DEFAULT_TIMEOUT=30000  # milliseconds
```

## 🧪 Running Tests

### E2E Tests (Cucumber)
```bash
# Run all E2E tests
npm run test:e2e

# Generate Cucumber HTML report
npm run report:cucumber
```

### Unit Tests (Jest)
```bash
# Run unit tests
npm run test:unit

# Run all tests
npm run test:all
```

### Linting
```bash
# Check code style
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📊 Reports

- **Cucumber Reports**: `reports/cucumber/index.html`
- **Jest Reports**: `reports/jest/report.html`
- **Screenshots**: `reports/screenshots/` (on test failures)

## 🏗️ Architecture

### Page Object Model
- **Elements Layer**: Centralized selectors (`src/elements/`)
- **Page Layer**: Page interactions (`src/pages/`)
- **Step Definitions**: Test orchestration (`src/tests/step-definitions/`)

### Configuration
- **Environment**: `src/config/env.js`
- **WebDriver**: `src/config/selenium.js`
- **Hooks**: `src/config/cucumber.js`

### Helpers & Utilities
- **Wait Helpers**: Custom wait conditions
- **Assert Helpers**: Enhanced assertions
- **Data Factories**: Test data generation with Faker.js

## 🔧 Development

### Adding New Tests

1. **Create Feature File**: Add `.feature` file in `src/tests/features/`
2. **Add Elements**: Define selectors in `src/elements/`
3. **Create Page Object**: Implement page class in `src/pages/`
4. **Write Step Definitions**: Add steps in `src/tests/step-definitions/`

### Code Quality

- ESLint with Airbnb configuration
- Pre-commit hooks for linting
- Conventional commit messages
- Automatic screenshot capture on failures

## 🚦 CI/CD Pipeline (GitHub Actions)

The framework includes comprehensive GitHub Actions workflows for automated testing and deployment:

### 🔄 Continuous Integration (`ci.yml`)
Triggered on push to `main` and `develop` branches:

- **Linting & Quality**: ESLint validation with Airbnb configuration
- **Commit Validation**: Commitlint checks for conventional commit messages
- **Unit Tests**: Jest tests with coverage reporting and HTML output
- **E2E Tests**: Cucumber + Selenium tests in headless Chrome
- **Artifacts**: Automatic upload of test reports and failure screenshots
- **Environment**: Node.js 20.x with Chrome/ChromeDriver setup

### 🔍 Pull Request Validation (`pr-validation.yml`)
Triggered on pull requests to `main` and `develop`:

- **Code Quality**: ESLint checks with inline PR comments
- **Commit Messages**: Commitlint validation for PR commits
- **Unit Testing**: Fast Jest execution for quick feedback
- **PR Comments**: Automated status updates on PR with test results

### 🚀 Release Pipeline (`release.yml`)
Triggered on Git tags (e.g., `v1.0.0`):

- **Full Test Suite**: Complete E2E and unit test execution
- **Release Notes**: Automatic generation from commit history
- **GitHub Release**: Creates release with artifacts and reports
- **Artifact Retention**: 90-day retention for release reports

### 📊 CI/CD Features

- **Parallel Execution**: Unit and E2E tests run in parallel for faster feedback
- **Headless Testing**: Chrome headless mode for reliable CI execution
- **Artifact Management**: Test reports, screenshots, and logs preserved
- **Multi-Environment**: Support for different test environments via secrets
- **Failure Handling**: Screenshot capture and detailed error reporting
- **Cache Optimization**: Node modules and browser binaries cached

### 🏃‍♂️ Running Tests by Tags

```bash
# Smoke tests (quick validation)
npm run test:e2e:smoke

# Regression tests (comprehensive)
npm run test:e2e:regression

# Critical path tests
npm run test:e2e -- --tags "@critical"
```

### 🔧 CI Configuration

The workflows are configured for:
- **Node.js**: LTS 20.x for stability
- **Browsers**: Chrome with ChromeDriver auto-installation
- **Timeouts**: 60-second step timeout, 30-second Jest timeout
- **Reporting**: JSON and HTML formats with artifact upload
- **Security**: Environment variables and secrets management

## 📝 Example Test

```gherkin
Feature: Home Page
  Scenario: Home page loads successfully
    Given I am on the home page
    When the page finishes loading
    Then I should see the main content
    And I should see the header
```

## 🤝 Contributing

1. Follow conventional commit messages
2. Run linting before commits
3. Add tests for new features
4. Update documentation as needed

## 📄 License

MIT License
