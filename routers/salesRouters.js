const express = require('express');
const controllers = require('../controllers/salesControllers');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', controllers.createSale);
router.get('/:id', controllers.getById);

module.exports = router;