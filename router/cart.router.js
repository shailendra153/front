const express = require('express');
const cartController = require('../controller/cart.controller');
const verify = require('../middleware/auth');
const router = express.Router();

router.post("/add-product", verify.tokenVerification, cartController.addItemInCart);
router.post("/remove-product", verify.tokenVerification, cartController.removeItemFromCart);
router.post('/view-cart', verify.tokenVerification, cartController.fetchCart)

module.exports = router;