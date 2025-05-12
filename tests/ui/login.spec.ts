import { test } from '@playwright/test';
import { LoginPage } from 'pages/login.page';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

test('User can log in to QA Insights', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.verifyLogin();
});
