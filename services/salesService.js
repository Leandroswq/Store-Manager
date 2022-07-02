const model = require('../models/salesModel');

module.exports = {
  async createSale(products) {
    const id = await model.createSaleId();
    await model.createSaleProducts(id, products);
    const sale = { id, itemSold: products };
    return sale;
  },
};