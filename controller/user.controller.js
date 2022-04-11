const { request, response } = require("express");
const User = require('../model/user.model');
const transporter = require('../mail/mail');


exports.sendOtp = (request, response, next) => {
    const email = request.params.email;
    const mobile = "+91" + request.params.number

    request.session.otp = Math.floor((Math.random() * 10000) + 1);
    const message = "hello " + request.params.name + " Your One Time Password is :-" + request.session.otp;
    console.log(message);
    const mailData = {
        from: 'kushwahshailendra732@gmail.com',
        to: email,
        subject: "EMAIL VERIFICATION",
        text: message

    };
    transporter.sendMail(mailData, function(err, info) {
        if (err) {
            console.log(err)
            return response.status(500).json({ message: "error" });

        } else
            return response.status(200).json({ message: "sucesss" })
    });








};
exports.ragistrationByOtp = (request, response, next) => {
    const mobile = "+91" + request.body.number
    console.log(request.session.otp)
    console.log(request.body.otp)
    if (request.session.otp == request.body.otp) {
        const user = new User();
        user.name = request.body.name;
        user.email = request.body.email;
        user.number = request.body.number;
        user.password = request.body.password;
        user.save()
            .then(result => {
                let message = "Congrats! " + result.name + " Your ragistratate email is " + result.email + " and your password is " + result.password;








            })
            .catch(err => {
                return response.status(500).json(err)
            });


    } else {
        return response.status(404).json({ message: "Otp Not Correct" });
    }
};
exports.customerSignIn = (request, response, next) => {
    Customer.findOne({
            customerEmail: request.body.customerEmail,
            customerPassword: request.body.customerPassword
        })
        .then(result => {


            if (result) {
                console.log(result);
                let id = result._id;

                console.log(id);
                request.session.customer = id;
                return response.status(302).json(result);
            } else
                return response.status(204).json({ message: "User not found" })
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "Oops Something Went Wrong" });
        })
};