const adminController = require('../controller/admin.controller');
const express = require('express');
const router = express.Router();

router.post("/signup", adminController.signup);
router.post('/signin', adminController.signin);
router.get("/view-customer", adminController.customerList);

module.exports = router;