const model = require('../models/productsModel');
const error = require('../errors/index');

module.exports = {
  async getAll() {
    const products = await model.getAll();

    if (products.length === 0) throw new error.NotFoundError('Product not found');
    return products;
  },
};