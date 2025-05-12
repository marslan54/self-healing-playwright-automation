import { test, expect } from '@playwright/test';
import { getTooltipValueOnHover } from '../../utils/chart-utils';
import { fetchExecutionLogs } from '../../utils/api-utils';
import { LoginPage } from 'pages/login.page';
import dotenv from 'dotenv';
dotenv.config()




test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await loginPage.verifyLogin();
  })

test('UI tooltip value matches API result', async ({ page }) => {
  await page.goto('https://qainsights.folio3.site/');

  const uiData = await getTooltipValueOnHover(page, 'g.recharts-bar-rectangle');

  // Validate against API data
  const apiData = await fetchExecutionLogs();

  // Find API record where status is "Pass"
  const apiPassRecord = apiData.find((entry: any) => entry.status === 'Pass');

  expect(apiPassRecord).toBeTruthy(); // Ensure "Pass" exists
  expect(uiData.label).toBe('Pass');
  expect(uiData.value).toBeCloseTo(apiPassRecord.count || apiPassRecord.value, 2); // Adjust key accordingly
});
