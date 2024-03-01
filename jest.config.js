// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
};