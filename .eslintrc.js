module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: '16.5.2'
    }
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: [
    'react'
  ],
  rules: {
    'class-methods-use-this': 0,
    'react/jsx-no-target-blank': 0,
    'no-console': 0,
  }
};
