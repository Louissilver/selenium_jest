module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    'no-console': 'warn',
    'max-len': ['error', { code: 120 }],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': 'error',
    'no-undef': 'error',
  },
};
