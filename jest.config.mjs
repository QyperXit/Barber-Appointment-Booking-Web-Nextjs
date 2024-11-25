import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/(.*)$': '<rootDir>/$1'
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
};

export default createJestConfig(config);