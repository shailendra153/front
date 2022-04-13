const express = require('express');
const favoriteController = require('../controller/favorite.controller');
const router = express.Router();

router.post("/add-product", favoriteController.addItemInFavorite);
router.post("/remove-product", favoriteController.removeItemFromFavorite);
router.post('/view-favorite', favoriteController.fetchFavorite)

module.exports = router;