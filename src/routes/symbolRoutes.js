const express = require('express');
const symbolController = require('../controllers/symbolController');

const router = express.Router();

router.get('/', symbolController.getSymbols);
router.post('/favorites', symbolController.addToFavorites);
router.delete('/favorites', symbolController.removeFromFavorites);
router.get('/favorites', symbolController.getFavorites);

module.exports = router;
