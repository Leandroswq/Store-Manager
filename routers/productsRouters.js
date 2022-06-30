const express = require('express');
const controllers = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', controllers.getAll);

module.exports = router;