# Selenium + Jest + Cucumber Automation Framework

A comprehensive E2E automation framework built with Selenium WebDriver, Jest, and Cucumber.js following the Page Object Model (POM) pattern.

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

## 🚦 CI/CD Ready

The framework is configured for CI/CD with:
- Headless browser execution
- JSON and HTML report generation
- Screenshot artifacts on failures
- Exit codes for build status

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
