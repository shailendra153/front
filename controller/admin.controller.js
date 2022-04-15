const Admin = require('../model/admn.model');
const User = require('../model/user.model');
const { validationResult } = require('express-validator');
const { response } = require('express');

exports.signup = (request, response, next) => {
    console.log(request.body)
    const admin = new Admin();
    admin.name = request.body.name;
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
                console.log('login Failure');
            }
        }).catch(err => {
            console.log(err + 'Somthing went wrong');
            return response.status(500).json(err);
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