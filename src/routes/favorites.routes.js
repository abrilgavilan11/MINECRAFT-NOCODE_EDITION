const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller.js');
const {verifyToken} = require('../middlewares/auth.middleware.js');

router.get('/', verifyToken, favoritesController.getFavorites);
router.post('/:id', verifyToken, favoritesController.addFavorite);
router.delete('/:id', verifyToken, favoritesController.removeFavorite);

module.exports = router;