const express = require('express');
const controllers = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', controllers.createProduct);

router.get('/search', controllers.searchProductsByName);

router.get('/:id', controllers.getById);
router.put('/:id', controllers.updateProduct);
router.delete('/:id', controllers.deleteProduct);
module.exports = router;