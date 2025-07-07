import { test, expect } from '@playwright/test';

const BaseUrl = 'https://demo.sboard.su';
const ApiUrl = 'https://demo.sboard.su/api/public/v1';
let boardId: string;
const PublicApiKey = 'nrcJyviefJvuvVzNofjVdI4oHLVpBlJK';
const userId = 313;

test.describe('Создаем и удаляем доску', () => {
    test.use({ storageState: 'storagestate.json' });
    test.beforeAll('Создаем доску для дальнейших тестов', async ({ request }) => {
      const createResponse = await request.post(`${ApiUrl}/boards/createBoard`, {
      data: {
        userId: userId,
        title: 'test board',
      },
      headers: { 
        'Content-Type': 'application/json',
        'Public-Api-Key': PublicApiKey,
       },
    });

    expect(createResponse.status()).toBe(201);
    const createBody = await createResponse.json();
    expect(createBody.status).toBe(0);
    expect(createBody.data.boardId).toBeDefined();
    boardId = createBody.data.boardId;
    console.log('Создали доску и задали переменной Id');
 });

    test(' Удаляем доску', async ({ page }) => {
        await page.goto(`${BaseUrl}/dashboard/personal-space`);
        await expect(page).toHaveURL(`${BaseUrl}/dashboard/personal-space`);
        console.log("Открыли личный кабинет");
                
        const boardMenu = page.getByRole('article').filter({ has: page.locator(`a[href*="${boardId}"]`)});
        await boardMenu.getByRole('button', { name: 'Меню' }).click();
        console.log('Нажали 3дот меню доски');

        await page
        .getByRole('listitem')
        .filter({ hasText: 'Удалить' })
        .click();
        console.log('Нажали конпку "Удалить"');

        const deleteWindow = page.locator('div[data-testid="modal-window"]');
        await expect(deleteWindow).toBeVisible();
        console.log("ОТкрыли модалку");

        const acceptDelete = page.locator('button:has-text("Принять")');
        await expect(acceptDelete).toBeVisible();
        await acceptDelete.click();
        console.log("Согласились на удаление");

        const deleteBoard = page.getByRole('article').filter({ hasText: `${boardId}` });
        await expect(deleteBoard).not.toBeVisible();
        console.log('Доска удалена');
        
       
  });
});
