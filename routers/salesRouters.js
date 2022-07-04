const express = require('express');
const controllers = require('../controllers/salesControllers');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', controllers.createSale);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.deleteProduct);
router.put('/:id', controllers.updateSaleProducts);

module.exports = router;