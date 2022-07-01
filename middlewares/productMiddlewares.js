const validations = require('../services/productsService');

module.exports = {
  async nameValidation(req, _res, next) {
    const { name } = req.body;
    const response = await validations.nameValidation(name);

    if (!response) throw new Error('validação invalida');

    next();
  },
};
