import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { open: 'never' }]],
}); import { defineConfig } from '@playwright/test';

export default defineConfig({
    // 2 seconds का timeout हर test के लिए
    timeout: 30 * 1000,

    // 3 बार retry करो अगर test fail हो
    retries: 1,

    // Reporters configuration
    reporter: [
        ['html', { open: 'never' }],  // HTML report generate करो
        ['list'],  // Console में list format में दिखाओ
        ['junit', { outputFile: 'test-results/junit.xml' }]  // JUnit format (Jenkins के लिए)
    ],

    // Browser configuration
    use: {
        // हर action के बाद screenshot ले
        screenshot: 'only-on-failure',
        // Video record करो
        video: 'retain-on-failure',
        // Trace record करो (debugging के लिए)
        trace: 'on-first-retry',
    },

    // Test directory
    testDir: 'tests',

    // Parallel में tests चलाएँ
    workers: 2,
});