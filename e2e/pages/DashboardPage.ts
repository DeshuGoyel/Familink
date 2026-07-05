import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Selectors
  private dashboardHeading = 'h1, h2, [data-testid="dashboard-heading"], .dashboard-title';
  private navMenu = 'nav, [role="navigation"], .sidebar, .nav-menu';
  private logoutButton = 'button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.navigate('/dashboard');
    await this.waitForPageLoad();
  }

  async isDashboardHeadingVisible(): Promise<boolean> {
    return this.isElementVisible(this.dashboardHeading);
  }

  async isNavMenuVisible(): Promise<boolean> {
    return this.isElementVisible(this.navMenu);
  }

  async clickNavItem(itemName: string) {
    await this.clickElement(`nav a:has-text("${itemName}"), .sidebar a:has-text("${itemName}")`);
  }

  async clickLogout() {
    await this.clickElement(this.logoutButton);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
