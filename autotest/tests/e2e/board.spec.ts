import { test, expect } from '@playwright/test';

const BaseUrl = 'https://demo.sboard.su';


test.describe('Создаем и удаляем доску', () => {
    test.use({ storageState: 'storagestate.json' });
    test(' Создаем и удаляем доску', async ({ page }) => {
        await page.goto(`${BaseUrl}/dashboard/personal-space`);
        await expect(page).toHaveURL(`${BaseUrl}/dashboard/personal-space`);
        console.log("Открыли личный кабинет");
        
        const createBoardButton = page.locator('button:has-text("Создать бесконечную доску")');
        await expect(createBoardButton).toBeVisible();
        const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        await createBoardButton.click()
        ]);
        console.log('Нажали кнопку, содали доску');
        await newPage.waitForURL(/https:\/\/demo.sboard\.su\/boards\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        await expect(newPage).toHaveURL(/https:\/\/demo.sboard\.su\/boards\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        console.log('Мы на доске');
        
        const boardTitle = newPage.locator('div[data-tooltip="Переименовать доску"]');
        await expect(boardTitle).toBeVisible();
        await boardTitle.click()
        const renameWindow = newPage.locator('div[class="sc-itdzXg ihxEqj"]');
        await expect(renameWindow).toBeVisible();
        console.log('Открыли модалку переименования');

        const boardNameInput = newPage.locator('input[name="title"]');
        await expect(boardNameInput).toBeVisible();
        await expect(boardNameInput).toBeFocused();
        await expect(boardNameInput).toBeEditable();
        console.log("Инпут активен");
        
        await boardNameInput.clear();
        await boardNameInput.fill('test board');
        await expect(boardNameInput).toHaveValue('test board');
        console.log('Удалили старое название и ввели новое');

        const createButton = newPage.locator('button:has-text("Переименовать")');
        await expect(createButton).toBeVisible();
        await createButton.click();
        console.log('Нажали кнопку "Переименовать"'); 
        
        const dashboardButton = newPage.locator('div[data-test-id="sboard-logo"]');
        await expect(dashboardButton).toBeVisible();
        await dashboardButton.click();
        await expect(newPage).toHaveURL(`${BaseUrl}/dashboard/personal-space`);
        console.log('Перешли в личный кабинет');
       
        const boardMenu = newPage.locator('button[title="Меню"]');
        await boardMenu.click();
        console.log('Нажали 3дот меню доски');

        await newPage
        .getByRole('listitem')
        .filter({ hasText: 'Удалить' })
        .click();
        console.log('Нажали конпку "Удалить"');

        const deleteWindow = newPage.locator('div[data-testid="modal-window"]');
        await expect(deleteWindow).toBeVisible();
        console.log("ОТкрыли модалку");

        const acceptDelete = newPage.locator('button:has-text("Принять")');
        await expect(acceptDelete).toBeVisible();
        await acceptDelete.click();
        console.log("Согласились на удаление");

        const deleteBoard = newPage.locator('p.sc-kFWlue.lgvkQR:has-text("меньше")');
        await expect(deleteBoard).not.toBeVisible();
        console.log('Доска удалена');
        
       

  });
});
