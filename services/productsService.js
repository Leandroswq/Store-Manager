const joi = require('joi');
const model = require('../models/productsModel');
const error = require('../errors/index');

module.exports = {
  async nameValidation(name) {
    const required = joi.string().required().validate(name);
    if (required.error) throw new error.BadRequestError('"name" is required');

    const minLength = joi.string().required().min(5).validate(name);
    if (minLength.error) {
      throw new error.UnprocessableEntity(
        '"name" length must be at least 5 characters long',
      );
    }
    return true;
  },

  validateProductId(products) {
    products.forEach((product) => {
      const isNull = joi.number().integer().required().validate(product.productId);

      if (isNull.error) {
        throw new error.BadRequestError('"productId" is required');
      }
    });

    return true;
  },

  validateProductQuantity(products) {
    products.forEach((product) => {
      const isNull = joi.number().integer().required().validate(product.quantity);

      if (isNull.error) {
        throw new error.BadRequestError('"quantity" is required');
      }

      if (product.quantity <= 0) {
        throw new error.BadRequestError(
          '"quantity" must be greater than or equal to 1',
        );
      }
    });

    return true;
  },
  
  async validateProductsExist(products) {
    const rows = await model.getAllById(products);
    if (rows.length !== products.length) throw new error.NotFoundError('Product not found');

    return true;
  },

  async getAll() {
    const products = await model.getAll();

    if (products.length === 0) {
      throw new error.NotFoundError('Product not found');
    }
    return products;
  },

  async getById(id) {
    const product = await model.getById(id);

    if (product.length === 0) {
      throw new error.NotFoundError('Product not found');
    }
    return product[0];
  },

  async createProduct(name) {
    const response = await model.createProduct(name);
    const product = { id: response, name };

    return product;
  },
};
