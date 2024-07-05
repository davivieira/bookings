import { defaults } from 'jest-config';

export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/api/',
    '<rootDir>/src/types/',
    '<rootDir>/src/store/',
  ],
  collectCoverageFrom: [
    'src/**/*.(j|t)s?(x)',
    '!src/api/**/*.*',
    '!src/types/**/*.*',
    '!src/utils/**/*.*',
    '!src/styles/**/*.*',
    '!src/pages/**/*.*',
    '!src/features/**/*.*',
    '!src/**/*.env.ts',
    '!src/vite-env.d.ts',
    '!src/**/*.styles.ts',
    '!src/**/*.styles.tsx',
    '!src/reactQuery.ts',
    '!src/store.ts',
    '!src/App.tsx',
    '!src/main.tsx',
  ],
};
