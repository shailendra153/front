const mongoose = require('mongoose');
// const { Schema } = require('mongoose');
const schema = mongoose.Schema;
const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true
    },
    productImage: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    categoryId: { type: schema.Types.ObjectId, ref: 'category' },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    review: [{
        reviewId: Number,
        // userId: { types: Schema.Types.ObjectId, ref: 'user' },
        review: String
    }]
});
module.exports = mongoose.model("product", productSchema);