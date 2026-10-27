const { test, expect } = require('../../fixtures/test-fixtures');
const { products } = require('../../test-data/products');

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('adding products updates the cart badge @smoke', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await expect(inventoryPage.header.cartBadge).toHaveText('1');

    await inventoryPage.addToCart(products.bikeLight.id);
    await expect(inventoryPage.header.cartBadge).toHaveText('2');
  });

  test('removing a product from inventory updates the badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.addToCart(products.bikeLight.id);
    await inventoryPage.removeFromCart(products.backpack.id);

    await expect(inventoryPage.header.cartBadge).toHaveText('1');
  });

  test('cart page lists the added products', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.addToCart(products.fleeceJacket.id);
    await inventoryPage.header.openCart();

    await expect(cartPage.itemNames).toHaveText([products.backpack.name, products.fleeceJacket.name]);
  });

  test('removing the last product empties the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.boltTShirt.id);
    await inventoryPage.header.openCart();
    await cartPage.removeItem(products.boltTShirt.id);

    await expect(cartPage.items).toHaveCount(0);
    await expect(inventoryPage.header.cartBadge).toBeHidden();
  });
});
