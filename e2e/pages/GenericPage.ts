import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GenericPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openPage(path: string) {
    await this.navigate(path);
    await this.waitForPageLoad();
  }

  async isPageHeadingVisible(): Promise<boolean> {
    return this.isElementVisible('h1, h2, [data-testid="page-heading"]');
  }

  async isPageLoaded(): Promise<boolean> {
    // Check page is not showing a loading spinner or error
    const hasError = await this.page.locator('[data-testid="error-page"], .error-boundary').isVisible();
    return !hasError;
  }

  async isButtonVisible(buttonText: string): Promise<boolean> {
    return this.isElementVisible(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`);
  }

  async clickButton(buttonText: string) {
    await this.clickElement(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`);
  }

  async isFormVisible(formSelector: string): Promise<boolean> {
    return this.isElementVisible(formSelector);
  }

  async isInputVisible(label: string): Promise<boolean> {
    return this.isElementVisible(
      `input[name*="${label.toLowerCase()}"], 
       input[placeholder*="${label}"], 
       label:has-text("${label}") + input,
       [data-testid="${label.toLowerCase()}-input"]`
    );
  }

  async typeInInput(selector: string, text: string) {
    const input = await this.page.waitForSelector(selector, { timeout: 10000 });
    await input.fill(text);
  }

  async getCurrentPath(): Promise<string> {
    const url = new URL(this.page.url());
    return url.pathname;
  }
}
