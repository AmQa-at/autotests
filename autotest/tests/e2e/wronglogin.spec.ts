import { test } from '@playwright/test';
import { WrongLoginPage } from '../pages/WrongLoginPage';

test('Wrong Log in', async ({ page }) => {
  const loginPage = new WrongLoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong@email.ru', '123456');
  await loginPage.checkErrorMessage("Неверная почта или пароль");
});