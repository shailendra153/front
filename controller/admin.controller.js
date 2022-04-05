const Admin = require('../model/admn.model');
const { validationResult } = require('express-validator');

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