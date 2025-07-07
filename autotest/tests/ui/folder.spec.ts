import { test, expect } from '@playwright/test';

const BaseUrl = 'https://demo.sboard.su';


test.describe('Создаем и открываем папку', () => {
    test.use({ storageState: 'storagestate.json' });
    test('Создаем папку', async ({ page }) => {
        await page.goto(`${BaseUrl}/dashboard/personal-space`);
        await expect(page).toHaveURL(`${BaseUrl}/dashboard/personal-space`);
        console.log("Открыли личный кабинет");

        const createFolderButton = page.locator('button:has-text("Создать новую папку")');
        await expect(createFolderButton).toBeVisible();
        await createFolderButton.click();
        console.log("Нажата кнопка на создание папки");

        const modalWindow = page.locator('div[data-testid="modal-window"]');
        await expect(modalWindow).toBeVisible();
        console.log("Открыли модалку");
        
        const folderNameInput = page.locator('input[name="title"]');
        await expect(folderNameInput).toBeVisible();
        await folderNameInput.click();
        console.log("Кликнули на инпут");

        await expect(folderNameInput).toBeFocused();
        await expect(folderNameInput).toBeEditable();
        console.log("Инпут активен");

        await folderNameInput.fill("Папка для досок");
        await expect(folderNameInput).toHaveValue("Папка для досок");
        console.log("Ввели текст");

        const createButton = page.locator('button[class="sc-gEvEer cvwxxO"]');
        await expect(createButton).toBeVisible();
        await createButton.click();
        const newFolder = page.locator('p.sc-kFWlue.lgvkQR:has-text("меньше")');
        await expect(newFolder).toBeVisible();
        console.log('Создали папку');

        await newFolder.click();
        console.log('Папка открыта');

  });
});
