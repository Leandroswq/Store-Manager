const service = require('../services/productsService');

module.exports = {
  async getAll(_req, res) {
    const products = await service.getAll();

    res.status(200).json(products);
  },

  async getById(req, res) {
    const { id } = req.params;
    const product = await service.getById(id);

    res.status(200).json(product);
  },

  async createProduct(req, res) {
    const { name } = req.body;
    await service.nameValidation(name);
    const response = await service.createProduct(name);

    res.status(201).json(response);
  },

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    await service.nameValidation(name);

    await service.updateProduct(id, name);
    res.status(200).json({ id, name });
  },

  async deleteProduct(req, res) {
    const { id } = req.params;
    await service.deleteProduct(id);

    res.sendStatus(204);
  },

  async searchProductsByName(req, res) {
    const { q } = req.query;

    const products = await service.searchProductsByName(q);

    res.status(200).json(products);
  },
};