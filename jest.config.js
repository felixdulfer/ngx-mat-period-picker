module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@lib/(.*)$': '<rootDir>/projects/ng-mat-period-picker/src/lib/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: [
    '<rootDir>/projects/**/*.spec.ts',
    '<rootDir>/projects/**/*.test.ts',
  ],
  collectCoverageFrom: [
    'projects/ng-mat-period-picker/src/lib/**/*.ts',
    '!projects/ng-mat-period-picker/src/lib/**/*.spec.ts',
    '!projects/ng-mat-period-picker/src/lib/**/*.test.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
  // Mock CSS files
  moduleNameMapping: {
    '^@lib/(.*)$': '<rootDir>/projects/ng-mat-period-picker/src/lib/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Handle CSS parsing errors
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
