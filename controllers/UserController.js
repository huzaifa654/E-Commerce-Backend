const User = require("../models/UserModel");
const config = require("../config/Config")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const fs = require("fs")
const randomstring = require("randomstring");

const sendResetPasswordMail = async (name, email, token) => {
    try {
        const Transport = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config?.emailUser,
                pass: config?.emailPassword
            }
        })
        const mailOptions = {
            from: config?.emailUser,
            to: email,
            subject: 'For Reset Password',
            html: '<p> Hey ' + name + ', Please copy the link and <a href="http://localhost:3000/api/resetPassword?token=' + token + '">resest your password </a>'

        }
        Transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("Mial has been sent", info.response)
            }
        })

    } catch (error) {
        res.status(400).send({ success: false, msg: error?.message })
    }
}


const register_user = async (req, res) => {
    const { firstName, lastName, seatNo, semester, semesterGPA, overAllGPA, skilledCourses, email, password } = req.body
    try {

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            seatNo: seatNo,
            semester: semester,
            semesterGPA: semesterGPA,
            overAllGPA: overAllGPA,
            skilledCourses: skilledCourses,
            email: email,
            password: password
        });

        console.log("newUser-------", newUser);

        const userEmail = await User.findOne({ email: email });
        const userSeatNo = await User.findOne({ seatNo: seatNo });



        if (userEmail || userSeatNo) {
            res.status(200).send({ success: false, message: `With this ${userEmail ? "email" : "Seat No"} user is already exists` });
        } else {
            // Save the new user instance to the database
            const user_data = await newUser.save();
            console.log(user_data)
            res.status(200).send({ success: true, message: "Account Created Successfully", data: user_data });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const user_Login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const UserEmail = await User.findOne({ email: email });
        const UserPassword = await User.findOne({ password: password });
        const UserResponse = await User.find({ email: email });

        if (UserEmail && UserPassword) {
            res.status(200).send(UserResponse)
        } else if (!UserEmail) {
            res.status(200).send({ success: false, msg: "Email is incorrect" })

        } else if (!UserPassword) {
            res.status(200).send({ success: false, msg: "Password is incorrect" })

        } else {
            res.status(200).send({ success: false, msg: "Invalid Credentilals" })

        }

        console.log("UserData------", UserResponse)


    } catch (error) {
        res.status(404).send(error)
        console.log("error------------", error)
    }
}




module.exports = {
    register_user,
    user_Login,

};
