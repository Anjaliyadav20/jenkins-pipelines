import { test, expect } from '@playwright/test';

test('Invalid Login Test (Should Fail)', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');

    // ❌ intentionally wrong expectation (fail karane ke liye)
    await expect(page).toHaveURL('/dashboard');
});