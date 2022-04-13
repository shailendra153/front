const { request, response } = require('express');
const Favorite = require('../model/favorite.model');

exports.addItemInFavorite = async(request, response, next) => {
    let favorite = await Favorite.findOne({ user: request.body.userId });
    if (!favorite) {
        favorite = new Favorite();
        favorite.user = request.body.userId;
    }
    favorite.products.push(request.body.productId)
    favorite.save()
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ messgae: "Internal Server Error" });
        });
};
exports.fetchFavorite = (request, response, next) => {
    Favorite.find({ user: request.body.user }).populate('products')
        .then(result => {
            return response.status(202).json(result);
        })
        .catch(err => {
            return response.status(500).json(err)
        })

};


exports.removeItemFromFavorite = (request, response, next) => {
    Favorite.findByIdAndUpdate({ _id: request.body.favoriteId }, {
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