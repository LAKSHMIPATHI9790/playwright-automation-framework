const { test, expect } = require('../../fixtures/test-fixtures');
const { users, invalidLogins } = require('../../test-data/users');

// These tests check the login screen itself, so start without the saved session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in @smoke', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  for (const { title, username, password, error } of invalidLogins) {
    test(`shows an error for ${title}`, async ({ loginPage, page }) => {
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toHaveText(error);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }

  test('user is logged out and cannot go back to inventory', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.header.logout();

    await expect(loginPage.loginButton).toBeVisible();

    await inventoryPage.goto();
    await expect(loginPage.errorMessage).toContainText("You can only access '/inventory.html' when you are logged in");
  });
});
