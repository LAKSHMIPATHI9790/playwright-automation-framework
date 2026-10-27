const products = {
  backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: 9.99 },
  boltTShirt: { id: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { id: 'sauce-labs-fleece-jacket', name: 'Sauce Labs Fleece Jacket', price: 49.99 },
};

const customer = { firstName: 'Lakshmi', lastName: 'Pathi', postalCode: '600001' };

const TAX_RATE = 0.08;

module.exports = { products, customer, TAX_RATE };
