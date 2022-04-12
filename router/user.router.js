const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.get("/otp/:name/:email/:number", userController.sendOtp);
router.post("/ragistration", userController.ragistrationByOtp);
router.post('/signin', userController.customerSignIn)

module.exports = router;