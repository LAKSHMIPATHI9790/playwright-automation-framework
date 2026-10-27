const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('shows all 6 products @smoke', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('sorts products by name A to Z and Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const az = await inventoryPage.getProductNames();
    expect(az).toEqual([...az].sort());

    await inventoryPage.sortBy('za');
    const za = await inventoryPage.getProductNames();
    expect(za).toEqual([...az].reverse());
  });

  test('sorts products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
