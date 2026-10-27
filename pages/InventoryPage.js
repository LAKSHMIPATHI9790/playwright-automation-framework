const { Header } = require('./components/Header');

class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  /** @param {'az' | 'za' | 'lohi' | 'hilo'} option */
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames() {
    return this.itemNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((p) => Number(p.replace('$', '')));
  }

  async addToCart(productId) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async removeFromCart(productId) {
    await this.page.getByTestId(`remove-${productId}`).click();
  }
}

module.exports = { InventoryPage };
