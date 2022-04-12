const express = require('express');
const cartController = require('../controller/cart.controller');
const router = express.Router();

router.post("/add-product", cartController.addItemInCart);
router.post("/remove-product", cartController.removeItemFromCart);
router.post('/view-cart', cartController.fetchCart)

module.exports = router;