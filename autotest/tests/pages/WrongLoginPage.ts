import { Page, expect } from '@playwright/test';

export class WrongLoginPage {
  readonly page: Page;
  readonly emailInput = 'input[name="email"]'; 
  readonly passwordInput = 'input[name="password"]';
  readonly signInButton = 'button:has-text("Войти")'; 
  readonly errorMessage = 'div[type="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.signInButton).click();
  }

  async checkErrorMessage(expectedError: string) {
    await this.page.locator(this.errorMessage).waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.page.locator(this.errorMessage)).toHaveText(expectedError);
  }
}