const model = require('../models/salesModel');
const error = require('../errors/index');

module.exports = {
  async getAll() {
    const sales = await model.getAll();

    return sales;
  },

  async getById(id) {
    const sales = await model.getById(id);

    if (sales.length <= 0) throw new error.NotFoundError('Sale not found');

    return sales;
  },
  async createSale(products) {
    const id = await model.createSaleId();
    await model.createSaleProducts(id, products);
    const sale = { id, itemsSold: products };
    return sale;
  },
};