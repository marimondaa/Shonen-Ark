const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    roots: ['<rootDir>/__tests__', '<rootDir>/tests'],
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    testEnvironment: 'node',
    setupFiles: ['<rootDir>/tests/setup-env.js'],

    // Ignore Playwright tests
    testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],

    moduleNameMapper: {
        // Handle module aliases (if you have them in tsconfig.json)
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
