const adminController = require('../controller/admin.controller');
const express = require('express');
const router = express.Router();

router.post("/signup", adminController.signup);

module.exports = router;