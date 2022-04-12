const Admin = require('../model/admn.model');
const User = require('../model/user.model');
const { validationResult } = require('express-validator');
const { response } = require('express');

exports.signup = (request, response, next) => {
    console.log(request.body)
    const admin = new Admin();
    admin.userName = request.body.userName;
    admin.email = request.body.email;
    admin.number = request.body.number;
    admin.password = request.body.password;
    admin.save()
        .then(result => {
            console.log(result)

            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json(err)
        })

}
exports.signin = (request, response, next) => {
    Admin.findOne({
            email: request.body.email,
            password: request.body.password
        })
        .then(result => {
            return response.status(201).json(result);
        })

}
exports.customerList = (request, response, next) => {

    User.find()
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        });

};