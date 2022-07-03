const model = require('../models/salesModel');

module.exports = {
  async getAll() {
    const sales = await model.getAll();

    return sales;
  },

  async createSale(products) {
    const id = await model.createSaleId();
    await model.createSaleProducts(id, products);
    const sale = { id, itemsSold: products };
    return sale;
  },
};