const express = require('express');
const controllers = require('../controllers/salesControllers');

const router = express.Router();

router.post('/', controllers.createSale);

module.exports = router;