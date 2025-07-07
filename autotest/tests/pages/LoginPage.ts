import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = 'input[name="email"]'; 
  readonly passwordInput = 'input[name="password"]';
  readonly signInButton = 'button:has-text("Войти")'; 
  
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

  async checkLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard\/personal-space/);
  }
}