const express = require('express');
const controllers = require('../controllers/productsControllers');
const middlewares = require('../middlewares/productMiddlewares');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', middlewares.nameValidation, controllers.createProduct);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.updateProduct);

module.exports = router;