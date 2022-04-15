const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.post('/signup', userController.customerSignup);
router.post('/signin', userController.customerSignIn);
router.post('/signin-with-google', userController.customerSignInWithGoole);

module.exports = router;