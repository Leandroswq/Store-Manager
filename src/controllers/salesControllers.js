const services = require('../services/salesService');
const productServices = require('../services/productsService');
const salesService = require('../services/salesService');

module.exports = {
  async getAll(_req, res) {
    const sales = await services.getAll();

    res.status(200).json(sales);
  },

  async getById(req, res) {
    const { id } = req.params;
    const sales = await services.getById(id);

    res.status(200).json(sales);
  },

  async createSale(req, res) {
    const products = req.body;

    await productServices.validateProductId(products);
    await productServices.validateProductQuantity(products);
    await productServices.validateProductsExist(products);

    const sale = await services.createSale(products);

    res.status(201).json(sale);
  },

  async deleteSale(req, res) {
    const { id } = req.params;
    await services.deleteSale(id);

    res.sendStatus(204);
  },

  async updateSaleProducts(req, res) {
    const { id } = req.params;
    const products = req.body;

    await productServices.validateProductId(products);
    await productServices.validateProductQuantity(products);
    await productServices.validateProductsExist(products);
    await salesService.getById(id);

    const sale = await services.updateSaleProducts(id, products);

    res.status(200).json(sale);
  },
};