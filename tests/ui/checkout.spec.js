const { test, expect } = require('../../fixtures/test-fixtures');
const { products, customer, TAX_RATE } = require('../../test-data/products');

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('user can place an order end to end @smoke', async ({ inventoryPage, cartPage, checkoutPage }) => {
    const selected = [products.backpack, products.bikeLight];
    for (const product of selected) {
      await inventoryPage.addToCart(product.id);
    }

    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(customer);

    const expectedSubtotal = selected.reduce((sum, p) => sum + p.price, 0);
    const expectedTax = Number((expectedSubtotal * TAX_RATE).toFixed(2));

    expect(await checkoutPage.getAmount(checkoutPage.subtotalLabel)).toBeCloseTo(expectedSubtotal, 2);
    expect(await checkoutPage.getAmount(checkoutPage.taxLabel)).toBeCloseTo(expectedTax, 2);
    expect(await checkoutPage.getAmount(checkoutPage.totalLabel)).toBeCloseTo(expectedSubtotal + expectedTax, 2);

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(inventoryPage.header.cartBadge).toBeHidden();
  });

  const missingFields = [
    { field: 'first name', data: { ...customer, firstName: '' }, error: 'Error: First Name is required' },
    { field: 'last name', data: { ...customer, lastName: '' }, error: 'Error: Last Name is required' },
    { field: 'postal code', data: { ...customer, postalCode: '' }, error: 'Error: Postal Code is required' },
  ];

  for (const { field, data, error } of missingFields) {
    test(`shows an error when ${field} is missing`, async ({ inventoryPage, cartPage, checkoutPage }) => {
      await inventoryPage.addToCart(products.backpack.id);
      await inventoryPage.header.openCart();
      await cartPage.checkout();
      await checkoutPage.fillCustomerInfo(data);

      await expect(checkoutPage.errorMessage).toHaveText(error);
    });
  }
});
