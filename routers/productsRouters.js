const express = require('express');
const controllers = require('../controllers/productsControllers');
const middlewares = require('../middlewares/productMiddlewares');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', middlewares.nameValidation, controllers.createProduct);
router.get('/:id', controllers.getById);

module.exports = router;