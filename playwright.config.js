import { defineConfig } from '@playwright/test';

export default defineConfig({

    // 30 seconds timeout
    timeout: 30 * 1000,

    // Retry failed tests once
    retries: 1,

    // Reporters
    reporter: [
        ['html', { open: 'never' }],
        ['list'],
        ['junit', { outputFile: 'test-results/junit.xml' }]
    ],

    // Browser settings
    use: {

        // Screenshot on failure
        screenshot: 'only-on-failure',

        // Video on failure
        video: 'retain-on-failure',

        // Trace for debugging
        trace: 'on-first-retry',
    },

    // Test folder
    testDir: 'tests',

    // Parallel execution
    workers: 2,
});
