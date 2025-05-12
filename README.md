# 🚀 Playwright Automation Framework

This project is built using [Playwright](https://playwright.dev/) for end-to-end testing. It includes both UI and API test coverage, login via POM, tooltip validation, and support for environment variables and self-healing locators.

---

## 🗂️ Project Structure

.
├── pages/
│ └── login.page.ts # Page Object Model for login
├── tests/
│ └── ui/
│ └── api-ui-assert.spec.ts # UI + API tooltip validation
├── utils/
│ ├── chart-utils.ts # Handles tooltip hover logic
│ ├── api-utils.ts # API call helper
│ └── selfHeal.ts # (Optional) LLM-based locator fallback
├── .env # Config values (credentials, URLs)
├── playwright.config.ts # Playwright global settings
└── README.md

## 🛠️ Setup

### 1. Install dependencies

```bash
npm install
npx playwright install
2. Add .env
Create a .env file with the following:

BASE_URL=https://qainsights.folio3.site
USERNAME=f3qa
PASSWORD=P@ssw0rd123
GROQ_API_KEY=your-groq-api-key (optional)

🧪 Run Tests
Run all tests
npx playwright test

Run a specific test
npx playwright test tests/ui/api-ui-assert.spec.ts

Run with UI
npx playwright test --headed

View HTML Report
npx playwright show-report

🔐 Login Flow (via test.beforeEach)
Example from api-ui-assert.spec.ts:

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.verifyLogin();
});
📊 UI & API Assertion

const uiData = await getTooltipValueOnHover(page, 'g.recharts-bar-rectangle');
const apiData = await fetchExecutionLogs();

expect(uiData.label).toBe('Pass');
expect(uiData.value).toBeCloseTo(apiPassRecord.value, 2);

🧠 (Optional) Groq Self-Healing Locators
Use Groq Cloud to auto-suggest locators if default ones break.

await selfHealingLocator(page, '#login-btn', 'Login button');

✅ Features
Playwright test framework

UI + API test validation

Reusable Page Objects

Grouped tests with test.describe()

LLM fallback for broken selectors

HTML + JSON reporting
