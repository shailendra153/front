const Category = require('../model/category.model');
const Product = require('../model/product.model');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary');
const { request } = require('express');
const { response } = require('express');
cloudinary.config({
    cloud_name: "shailendra153",
    api_key: "934837375542371",
    api_secret: "zHeIVGAQP0FDhsmIV-a38EYA24w"
});



exports.saveCategory = async(request, response, next) => {
    let image = ""
    await cloudinary.v2.uploader.upload(request.file.path)
        .then(result => {
            image = result.url;
        })
        .catch(err => {
            console.log(err)
        })
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    const category = new Category();
    category.categoryName = request.body.categoryName;
    category.categoryImage = image;
    category.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(500).json({ message: "Internal Server Error" });
        });
};

exports.deleteCategory = (request, response, next) => {
    Category.deleteOne({ _id: request.params.categoryId })
        .then(result => {
            if (result.deletedCount) {
                Product.deleteMany({ categoryId: request.params.categoryId })
                    .then(res => {

                        return response.status(202).json({ message: "Success" });
                    })
                    .then(err => {
                        console.log(err);
                    })
            } else
                return response.status(204).json({ message: "Not Found" });

        })
        .catch(err => {

            return response.status(500).json({ message: "Internal Server Error" });
        });
};
exports.updateCategory = async(request, response, next) => {
    let image;


    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors)
        return response.status(400).json({ errors: errors.array() });
    }

    const categoryName = request.body.categoryName;
    image = request.body.oldImage;
    console.log("old Image := " + image)
    if (request.file) {

        await cloudinary.v2.uploader.upload(request.file.path)
            .then(result => {
                image = result.url;
            })
            .catch(err => {
                console.log(err)
            })
    }


    Category.updateOne({ _id: request.body.categoryId }, {
            $set: {
                categoryName: categoryName,
                categoryImage: image
            }

        })
        .then(result => {

            if (result.modifiedCount)
                return response.status(202).json({ message: "Success" });
            else
                return response.status(404).json({ message: "Not Found" })
        })
        .catch(err => {
                console.log(err);
                return response.status(500).json({ message: "Internal Server Error" })
            }

        )

};
exports.viewCategory = (request, response, next) => {

    Category.find()
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        });


}
exports.categoryById = (request, response, next) => {
    let categoryId = request.params.categoryId;
    Category.findOne({ _id: categoryId })
        .then(result => {
            if (result)
                return response.status(202).json(result)
            else
                return response.status(404).json({ message: "Not Found" })
        })
        .catch(err => {
            return response.status(500).json({ message: "Internal Server Error" })
        })


};