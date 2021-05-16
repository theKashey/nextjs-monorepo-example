'use strict';

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');

const { compilerOptions: baseTsConfig } = require('./tsconfig.json');

// Take the paths from tsconfig automatically from base tsconfig.json
// @link https://kulshekhar.github.io/ts-jest/docs/paths-mapping
const getTsConfigBasePaths = () => {
  return pathsToModuleNameMapper(baseTsConfig.paths, {
    prefix: '<rootDir>/',
  });
};

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  name: 'blog-app:unit',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: './src',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.css$': '<rootDir>/../config/jest/css-transform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/../config/jest/file-transform.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss|less)$'],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    // For @testing-library/react
    '^@/test-utils$': '<rootDir>/../config/jest/test-utils',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    ...getTsConfigBasePaths(),
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx,js,jsx}', '!**/*.test.ts'],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
};

module.exports = config;
