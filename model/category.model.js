const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    categoryImage: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("category", categorySchema);