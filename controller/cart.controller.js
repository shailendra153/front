const { request, response } = require('express');
const Cart = require('../model/cart.model');

exports.addItemInCart = async(request, response, next) => {
    let cart = await Cart.findOne({ user: request.body.userId });
    if (!cart) {
        cart = new Cart();
        cart.user = request.body.userId;
    }
    cart.products.push(request.body.productId)
    cart.save()
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ messgae: "Internal Server Error" });
        });
};
exports.fetchCart = (request, response, next) => {
    Cart.find({ user: request.body.user }).populate('products')
        .then(result => {
            return response.status(202).json(result);
        })
        .catch(err => {
            return response.status(500).json(err)
        })

};


exports.removeItemFromCart = (request, response, next) => {
    Cart.findByIdAndUpdate({ _id: request.body.cartId }, {
            $pullAll: {
                products: [
                    { _id: request.body.productId }
                ]
            }

        })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        });

};