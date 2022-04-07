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


exports.saveproduct = async(request, response, next) => {
    let image = ""
    console.log(request.file.path)
    await cloudinary.v2.uploader.upload(request.file.path)
        .then(result => {

            image = result.url;
            console.log(image)
        })
        .catch(err => {
            console.log(err)
        })
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    let product = new Product()
    product.productName = request.body.productName;
    product.productPrice = request.body.productPrice;
    product.description = request.body.description;
    product.productImage = image;
    product.categoryId = request.body.categoryId
    console.log(request.body.categoryId)
    if (request.body.discont)
        product.discont = request.body.discont;

    if (request.body.quantity)
        product.quantity = request.body.quantity;

    product.save()
        .then(result => {
            return response.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "InternalServer Error" })
        })
};

exports.updateProduct = async(request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    let image = request.body.oldImage;
    if (request.file) {
        await cloudinary.v2.uploader.upload(request.file.path)
            .then(result => {

                image = result.url;
                console.log(image)
            })
            .catch(err => {
                console.log(err)
            })
    }



    let productName = request.body.productName;
    let productPrice = request.body.productPrice;
    let description = request.body.description;
    let categoryId = request.body.categoryId
    let discount = request.body.discount;
    let quantity = request.body.quantity;
    if (!discount)
        discount = 0;
    if (!quantity)
        quantity = 1;


    Product.updateOne({ _id: request.body.productId }, {
            $set: {
                productName: productName,
                productPrice: productPrice,
                description: description,
                productImage: image,
                categoryId: categoryId,
                discount: discount,
                quantity: quantity
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

exports.viewProduct = (request, response, next) => {

    Product.find().populate('categoryId')
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        });


}
exports.deleteProduct = (request, response, next) => {
    Product.deleteOne({ _id: request.params.productId })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: "Success" });
            else
                return response.status(404).json({ message: "Not Found" });

        })
        .catch(err => {

            return response.status(500).json({ message: "Internal Server Error" });
        });
};
exports.productByCategoryId = (request, response, next) => {
    Product.find({ categoryId: request.params.categoryId }).populate('categoryId')
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        });


};

exports.productById = (request, response, next) => {
    let productId = request.params.productId;
    Product.findOne({ _id: productId }).populate('categoryId')
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