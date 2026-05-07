import { test, expect } from '@playwright/test';

test('Invalid Login Test (Fixed)', async ({ page }) => {
    // Page पर navigate करो
    await page.goto('https://the-internet.herokuapp.com/login');

    // Username field में 'wrong' भरो
    await page.fill('#username', 'wrong');

    // Password field में 'wrong' भरो
    await page.fill('#password', 'wrong');

    // Login button click करो
    await page.click('button[type="submit"]');

    // Error message check करो (typo fix: toContainText)
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});