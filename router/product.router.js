const productController = require('../controller/product.controller');
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { request } = require('express');
const { categoryById } = require('../controller/category.controller');
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, cb) => {
        cb(null, true)
    }

});
router.post("/add-product", upload.single('productImage'), body('productName').notEmpty(), body('productPrice').notEmpty(), body('description').notEmpty(), body('categoryId').notEmpty(), productController.saveproduct);

router.post("/update-product", upload.single('productImage'), body('productName').notEmpty(), body('productPrice').notEmpty(), body('description').notEmpty(), body('categoryId').notEmpty(), productController.updateProduct);
router.get("/view-product", productController.viewProduct);
router.get("/delete-product/:productId", productController.deleteProduct);
router.get("/view-product-by-categoryId/:categoryId", productController.productByCategoryId);
router.get("/product-by-id/:productId", productController.productById)





module.exports = router;