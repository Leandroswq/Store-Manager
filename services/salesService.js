const model = require('../models/salesModel');
const error = require('../errors/index');

const saleNotFound = 'Sale not found';

module.exports = {
  async getAll() {
    const sales = await model.getAll();

    return sales;
  },

  async getById(id) {
    const sales = await model.getById(id);

    if (sales.length <= 0) throw new error.NotFoundError(saleNotFound);

    return sales;
  },
  async createSale(products) {
    const id = await model.createSaleId();
    await model.createSaleProducts(id, products);
    const sale = { id, itemsSold: products };
    return sale;
  },

  async deleteSale(id) {
    const response = await model.deleteSale(id);

    if (response <= 0) throw new error.NotFoundError(saleNotFound);

    return response;
  },

  async updateSaleProducts(id, products) {
    await model.deleteSaleProducts(id);
    await model.createSaleProducts(id, products);
    const sale = { saleId: id, itemsUpdated: products };
    return sale;
  },
};
