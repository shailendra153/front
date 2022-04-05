const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("admins", adminSchema)