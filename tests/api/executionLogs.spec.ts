import { test, expect } from '@playwright/test';

test('GET /execution-logs returns data and 200 status code', async ({ request }) => {
  const response = await request.get('https://qainsights-api.folio3.site/api/execution-logs');

  // ✅ Validate status code
  expect(response.status()).toBe(200);

  // ✅ Validate response is JSON
  const json = await response.json();
  expect(Array.isArray(json)).toBe(true); // Expecting a list of logs

  console.log('Sample response:', JSON.stringify(json[0], null, 2));
});
