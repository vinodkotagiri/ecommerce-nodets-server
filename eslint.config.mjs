import globals from 'globals';
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,  // Use Node.js globals
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Define your custom rules here
    },
  },
];
