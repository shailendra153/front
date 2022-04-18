const { request, response } = require("express");
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');


exports.customerSignup = (request, response, next) => {
    const user = User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.number = request.body.number;
    user.password = request.body.password;
    user.save()
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Internal Server Error" });
        })

}


exports.customerSignIn = (request, response, next) => {
    User.findOne({
            email: request.body.email,
            password: request.body.password
        })
        .then(result => {
            if (result) {
                console.log(result);
                console.log('login Successful');
                let payload = { subject: result._id };
                let token = jwt.sign(payload, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');

                return response.status(201).json({
                    status: true,
                    result: result,
                    token: token
                });
            } else {
                return response.status(404).jsaon({ message: "User Not Found" })
            }
        }).catch(err => {
            console.log(err + 'Somthing went wrong');
            return response.status(500).json(err);
        })
};
exports.customerSignInWithGoole = (request, response, next) => {
    User.findOne({
            email: request.body.email
        })
        .then(result => {
            if (result) {
                console.log(result);
                console.log('login Successful');
                let payload = { subject: result._id };
                let token = jwt.sign(payload, 'adkgshubhambahutsamjhhdarhkabhigaltinhikrteckjbgjkab');

                return response.status(201).json({
                    status: true,
                    result: result,
                    token: token
                });
            } else {
                return response.status(404).json({ messgae: "User Not Found" })
            }
        }).catch(err => {
            console.log(err + 'Somthing went wrong');
            return response.status(500).json(err);
        })

};