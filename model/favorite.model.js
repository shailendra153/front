const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const favoriteSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'customers' },
    products: [
        { type: Schema.Types.ObjectId, ref: 'product' }
    ],


});
module.exports = mongoose.model("favorite", favoriteSchema);