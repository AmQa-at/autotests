import { test, expect } from '@playwright/test';

const BaseUrl = 'https://demo.sboard.su/api/public/v1';
const SecondUrl = 'https://demo.sboard.su/api/boards/v1';
const PublicApiKey = 'nrcJyviefJvuvVzNofjVdI4oHLVpBlJK';
const userId = 313;

test.describe('Создаем и удаляем доску', () => {
 test.use({ storageState: 'storagestate.json' });
  test('Создаем и удаляем доску', async ({ request }) => {
       const createResponse = await request.post(`${BaseUrl}/boards/createBoard`, {
      data: {
        userId: userId,
        title: 'vvvvvvvvv',
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
    const boardId = createBody.data.boardId;
    
    const deleteResponse = await request.delete(`${SecondUrl}/boards/${boardId}`, {
        headers: { 
        'Content-Type': 'application/json; charset=utf-8',
       },
       });

       expect(deleteResponse.status()).toBe(200);
       const deleteBody = await deleteResponse.json();
       expect(deleteBody.status).toBe(0);

  });
});