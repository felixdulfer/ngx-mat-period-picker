import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularEslint from '@angular-eslint/eslint-plugin';
import globals from 'globals';

export default [
  // Ignore build output and dependencies
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      'build/**/*',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      '.angular/cache/**/*',
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules for all .ts files using flat configs
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './projects/ngx-mat-period-picker/tsconfig.lib.json',
          './projects/ngx-mat-period-picker/tsconfig.spec.json',
          './projects/demo-app/tsconfig.app.json',
          './projects/demo-app/tsconfig.spec.json',
        ],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Angular globals
        ngDevMode: 'readonly',
        ngI18nClosureMode: 'readonly',
        Zone: 'readonly',
        COMPILED: 'readonly',
        goog: 'readonly',
        $localize: 'readonly',
        // Testing globals
        beforeEach: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['flat/recommended'].rules,
      ...tseslint.configs['flat/stylistic'].rules,
      // Disable some strict rules for Angular projects
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-undef': 'off', // TypeScript handles this
    },
  },

  // Angular rules for Angular files
  {
    files: ['projects/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './projects/ngx-mat-period-picker/tsconfig.lib.json',
          './projects/ngx-mat-period-picker/tsconfig.spec.json',
          './projects/demo-app/tsconfig.app.json',
          './projects/demo-app/tsconfig.spec.json',
        ],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Angular globals
        ngDevMode: 'readonly',
        ngI18nClosureMode: 'readonly',
        Zone: 'readonly',
        COMPILED: 'readonly',
        goog: 'readonly',
        $localize: 'readonly',
        // Testing globals
        beforeEach: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      '@angular-eslint': angularEslint,
    },
    rules: {
      ...angularEslint.configs.recommended.rules,
      // Disable some Angular rules that might be too strict
      '@angular-eslint/prefer-inject': 'warn',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
    },
  },
];
