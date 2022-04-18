const categoryController = require('../controller/category.controller');
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { request } = require('express');
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, cb) => {
        cb(null, true)
    }

})

router.post("/add-category", upload.single('categoryImage'), body('categoryName').notEmpty(), categoryController.saveCategory);
router.get("/delete-category/:categoryId", categoryController.deleteCategory);
router.get("/view-category", categoryController.viewCategory);
router.post("/update-category", upload.single('categoryImage'), body('categoryName').notEmpty(), categoryController.updateCategory);
router.get("/category-by-id/:categoryId", categoryController.categoryById)


module.exports = router;