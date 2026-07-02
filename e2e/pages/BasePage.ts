import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173';
    await this.page.goto(`${baseUrl}${path}`);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickElement(selector: string) {
    await this.page.waitForSelector(selector, { timeout: 10000 });
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string) {
    await this.page.waitForSelector(selector, { timeout: 10000 });
    await this.page.fill(selector, value);
  }

  async getTextContent(selector: string): Promise<string | null> {
    await this.page.waitForSelector(selector, { timeout: 5000 });
    return await this.page.textContent(selector);
  }

  async hasNoConsoleErrors(): Promise<boolean> {
    let hasError = false;
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        hasError = true;
      }
    });
    return !hasError;
  }
}
