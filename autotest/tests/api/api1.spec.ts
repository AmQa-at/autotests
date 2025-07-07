import { test, expect } from '@playwright/test';

const BaseUrl = 'https://demo.sboard.su/api/public/v1';
const PublicApiKey = 'nrcJyviefJvuvVzNofjVdI4oHLVpBlJK';
const userId = 313;

test.describe('Создаем доску', () => {
 
  test('Создание доски', async ({ request }) => {
       const createResponse = await request.post(`${BaseUrl}/boards/createBoard`, {
      data: {
        userId: userId,
        title: 'playwright board',
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
    console.log('boardId:', createBody.data.boardId);
  });
});