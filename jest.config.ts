import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.\.spec\.ts$',
  transform: {
    '^.+\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: ['**/.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/app.module.ts',
    'src/infrastructure/database/database.module.ts',
    'src/infrastructure/modules/*',
    'src/domain/dtos/buy-dto/*',
    'src/domain/dtos/common/*',
    'src/domain/dtos/product-dto/*',
    'src/domain/entities/*'
  ],
  coverageThreshold: {
    global: {
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};

export default config;