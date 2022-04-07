const { request, response } = require('express');
const Cart = require('../model/cart.model');

exports.addItemInCart = async(request, response, next) => {
    let cart = await Cart.findOne({ customer: request.session.customer });
    if (!cart) {
        cart = new Cart();
    }
    cart.items.push(request.params.itemId)
        .then(result => {
            console.log(result);
            return response.status(201).json({ message: "item added successfully" });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ messgae: "OOps!Something went wrong" });
        });
};
exports.addPackageInCart = (request, response, next) => {};
exports.removeItemFromCart = (request, response, next) => {};
exports.removePackageFromCart = (request, response, next) => {};