import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

test.describe('Transfer Legacy E2E Journey Suite', () => {
  test('should_complete_the_entire_liveness_estate_setup_lifecycle_correctly', async ({ page }) => {
    // 1. Navigate to Onboarding
    await page.goto(`${BASE_URL}/onboarding`);
    await page.waitForLoadState('domcontentloaded');

    // 2. Register Account
    await page.fill('input[placeholder*="John" i]', 'John Doe');
    await page.fill('input[type="email"]', 'john.doe@test.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    
    // Begin Protocol -> OTP step
    await page.click('button:has-text("Begin Protocol")');
    
    // Wait for OTP input
    await page.waitForSelector('input[placeholder*="e.g. 123456" i]');
    await page.fill('input[placeholder*="e.g. 123456" i]', '123456');
    
    // Submit OTP -> Complete Onboarding
    await page.click('button:has-text("Verify & Create Vault")');

    // Proceed through onboarding steps
    await page.click('button:has-text("Next")'); // Step 2 (Compliance)
    
    // Step 3 (Assets)
    await page.fill('input[placeholder*="Ledger" i]', 'Main Crypto Wallet');
    await page.click('button:has-text("Next")');
    
    // Step 4 (Guardians)
    await page.fill('input[placeholder*="guardian" i]', 'guardian@trusted.com');
    await page.click('button:has-text("Next")');

    // Step 5 (Heirs)
    await page.fill('input[placeholder*="heir" i]', 'heir@estate.com');
    await page.click('button:has-text("Next")');
    
    // Finish onboarding -> Redirection to Dashboard
    await page.waitForURL(/dashboard/);
    await expect(page.locator('h1')).toContainText(/Dashboard|Welcome/i);

    // 3. Add Vault Account / Asset
    await page.click('a[href="/assets"], button:has-text("Assets")');
    await page.waitForURL(/assets/);
    await page.click('button:has-text("Add Asset")');
    await page.fill('input[name="name"]', 'Private BTC Key');
    await page.selectOption('select[name="type"]', 'Crypto');
    await page.fill('input[name="value"]', '120000');
    await page.fill('textarea[name="notes"]', 'Stored in vault box 4');
    await page.click('button[type="submit"]');
    
    // Verify toast or asset visibility
    await expect(page.locator('body')).toContainText(/secured/i);

    // 4. Invite & Accept Guardian
    await page.click('a[href="/guardians"], button:has-text("Guardians")');
    await page.waitForURL(/guardians/);
    await page.click('button:has-text("Invite Guardian")');
    await page.fill('input[name="name"]', 'Bob Guardian');
    await page.fill('input[name="email"]', 'bob@guardian.com');
    await page.click('button[type="submit"]');
    
    // Accept / Verify Guardian Node (Simulation)
    await page.click('button[title="Verify Node"]');
    await expect(page.locator('body')).toContainText(/verified/i);

    // 5. Configure Check-In Switch Settings
    await page.click('a[href="/check-in"], a[href="/checkin"]');
    await page.waitForURL(/check-in|checkin/);
    await page.click('button:has-text("Modify")');
    await page.click('button:has-text("monthly")'); // Adjust interval
    await expect(page.locator('body')).toContainText(/monthly/i);

    // 6. Logout
    await page.click('button:has-text("Logout"), button[title*="logout" i]');
    await page.waitForURL(/login/);

    // 7. Login and Verify Decrypted Data Persists
    await page.fill('input[type="email"]', 'john.doe@test.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/dashboard/);
    await page.click('a[href="/assets"]');
    
    // Assert real data exists
    await expect(page.locator('body')).toContainText('Private BTC Key');
  });
});
