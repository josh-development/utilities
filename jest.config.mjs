/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  displayName: 'unit test',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/packages/**/tests/**/*.test.ts', '<rootDir>/packages/**/tests/**/*.test.js'],
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.ts'],
  setupFilesAfterEnv: ['jest-extended/all'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.base.json'
    }
  },
  coveragePathIgnorePatterns: ['<rootDir>/packages/provider/src/lib/decorators/'],
  reporters: ['default', 'github-actions']
};

export default config;
