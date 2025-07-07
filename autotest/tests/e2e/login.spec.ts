import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Mark1@demo.ru', '123123');
  await loginPage.checkLoginSuccess();
  await page.context().storageState({ path: 'storagestate.json' });
});