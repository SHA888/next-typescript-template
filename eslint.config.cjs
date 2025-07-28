const js = require('@eslint/js');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const jestPlugin = require('eslint-plugin-jest');

// Common globals for browser and node
const commonGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021,
  React: 'writable',
  JSX: 'readonly',
  // Common browser globals that might be missing
  Blob: 'readonly',
  FileReader: 'readonly',
  FormData: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  XMLHttpRequest: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  fetch: 'readonly',
  Request: 'readonly',
  Response: 'readonly',
  Headers: 'readonly',
  // Next.js specific
  process: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  // Testing
  jest: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  describe: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  it: 'readonly',
  // Web workers and service workers
  self: 'readonly',
};

module.exports = [
  // Base configuration
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...commonGlobals,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'jest': jestPlugin,
    },
    rules: {
      // Add your custom rules here
    },
  },
  js.configs.recommended,
  
  // Override for test scripts
  {
    files: ['scripts/**/*.js', 'scripts/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...commonGlobals,
        // Add any additional globals needed for test scripts
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'off', // Allow console.log in test scripts
    },
  },
  // TypeScript and JavaScript files for the application
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: commonGlobals,
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-var-requires': 'warn',
      // JavaScript rules
      'no-undef': 'off', // Handled by TypeScript
      'no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      'no-prototype-builtins': 'off',
      'no-redeclare': 'off', // Handled by TypeScript
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js
      'react/prop-types': 'off', // Not needed with TypeScript
      // Other rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Configuration files
  {
    files: [
      '*.{js,ts}',
      '**/*.config.{js,ts}',
      '**/.*rc.js',
      '**/setupTests.{js,ts}',
      '**/jest.setup.{js,ts}',
    ],
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...commonGlobals,
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
      },
      parser: typescriptParser,
      parserOptions: {
        project: null, // Don't require tsconfig for config files
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
    },
  },

  // Test files
  {
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      jest: jestPlugin,
    },
    languageOptions: {
      globals: commonGlobals,
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // JavaScript rules
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      // Testing rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

  // Ignore patterns
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/types/**',
      '**/.vercel/**',
      '**/.vscode/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/jest.config.*',
      '**/jest.setup.*',
      '**/next-env.d.ts',
      '**/postcss.config.*',
      '**/tailwind.config.*',
      '**/tsconfig.*.json',
      '**/.eslintrc.*',
      '**/__mocks__/**',
      '**/__fixtures__/**',
    ],
  },
];
