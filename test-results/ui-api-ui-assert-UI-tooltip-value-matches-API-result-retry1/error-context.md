# Test info

- Name: UI tooltip value matches API result
- Location: D:\hackathon-automation\tests\ui\api-ui-assert.spec.ts:18:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: '📊 QA Insights Dashboard' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: '📊 QA Insights Dashboard' })

    at LoginPage.verifyLogin (D:\hackathon-automation\pages\login.page.ts:19:7)
    at D:\hackathon-automation\tests\ui\api-ui-assert.spec.ts:15:21
```

# Page snapshot

```yaml
- heading "QA Insights" [level=2]
- textbox "Username": muhammadarsalan
- textbox "Password": P@ssw0rd123
- button "Login"
- paragraph: Invalid username or password
```

# Test source

```ts
   1 | import { Page, expect } from '@playwright/test';
   2 |
   3 | export class LoginPage {
   4 |   constructor(private page: Page) {}
   5 |
   6 |   async goto() {
   7 |     await this.page.goto(process.env.BASE_URL || '');
   8 |   }
   9 |
  10 |   async login(username: string, password: string) {
  11 |     await this.page.getByPlaceholder('Username').fill(username);
  12 |     await this.page.getByPlaceholder('Password').fill(password);
  13 |     await this.page.getByRole('button', { name: 'Login' }).click();
  14 |   }
  15 |
  16 |   async verifyLogin() {
  17 |     await expect(
  18 |       this.page.getByRole('heading', { name: '📊 QA Insights Dashboard' })
> 19 |     ).toBeVisible();
     |       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  20 |   }
  21 | }
  22 |
```