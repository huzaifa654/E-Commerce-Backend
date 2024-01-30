const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
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
const CreateToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secret_jwt)
        return token
    } catch (error) {
        res.status(400).send(error?.message)
    }
}
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        throw new Error(error.message);
    }
};

const register_user = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            mobile: req.body.mobile,
            type: req.body.type,
        });

        console.log("req.file.type-------", req.file.type);

        const userData = await User.findOne({ email: req.body.email });

        console.log("userData----", userData);

        if (userData) {
            res.status(200).send({ success: false, msg: "This email is already exists" });
        } else {
            // Save the new user instance to the database
            const user_data = await newUser.save();
            console.log(user_data)
            res.status(200).send({ success: true, data: user_data });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const user_Login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const UserData = await User.findOne({ email: email });

        console.log("UserData------", UserData)

        if (UserData) {
            const passwordMatch = await bcrypt.compare(password, UserData.password);
            if (passwordMatch) {
                const tokenData = await CreateToken(UserData?._id)
                const userResult = {
                    _id: UserData?._id,
                    name: UserData?.name,
                    email: UserData?.email,
                    password: UserData?.password,
                    image: UserData?.image,
                    mobile: UserData?.mobile,
                    type: UserData?.type,
                    token: tokenData
                }
                console.log("userResult------", userResult)
                const response = {
                    success: true,
                    msg: "User Details",
                    data: userResult
                }
                res.status(200).send(response)
            } else {
                res.status(200).send({ success: false, msg: "Login details are incorrect" })

            }

        } else {
            res.status(200).send({ success: false, msg: "Login details are incorrect" })
        }
    } catch (error) {
        res.status(404).send(error)
        console.log("error------------", error)
    }
}

const update_Password = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const password = req.body.password;
        const data = await User.findOne({ _id: user_id });

        if (data) {
            const newPassword = await securePassword(password);
            const userData = await User.findByIdAndUpdate(
                { _id: user_id },
                { $set: { password: newPassword } },
                { new: true } // This option returns the updated document
            );

            console.log(userData);
            res.status(200).send({ success: true, msg: "Your Password has been updated successfully", data: userData });
        } else {
            res.status(400).send({ success: false, msg: "User Id not found!" });
        }

    } catch (error) {
        res.status(400).send(error?.message);
    }
};

const forget_Password = async (req, res) => {
    try {
        const email = req.body.email
        const userData = await User.findOne({ email: email })
        if (userData) {
            const randomString = randomstring.generate();
            const data = await User.updateOne(
                { email: email },
                { $set: { token: randomString } },
                { new: true })
            sendResetPasswordMail(userData?.name, userData?.email, randomString)
            res.status(200).send({ success: true, msg: "Please check your mail and reset your password" })

        } else {
            res.status(200).send({ success: false, msg: "email not found!" })

        }
    } catch (error) {
        res.status(400).send(error?.message)

    }
}

const reset_Password = async (req, res) => {
    try {
        const token = req.query.token
        const tokenData = await User.findOne({ token: token });

        if (tokenData) {
            const password = req.body.password;
            const newPassword = await securePassword(password);
            const UserData = await User.findByIdAndUpdate(
                { _id: tokenData._id },
                { $set: { password: newPassword, token: '' } },
                { new: true })
            console.log("UserData--------", UserData)

            res.status(200).send({ success: true, msg: "Your Passoword has been reset", data: UserData })

        } else {
            res.status(200).send({ success: true, msg: "Token has been expired" })

        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error?.message })
    }
}

const renew_token = async (id) => {
    try {
        const secret_jwt = config.secret_jwt
        const newSecretJwt = randomstring.generate();
        fs.readFile('config/Config.js', 'utf-8', function (err, data) {
            if (err) throw err
            var newValue = data.replace(new RegExp(secret_jwt, "g"), newSecretJwt)
            fs.writeFile('config/Config.js', newValue, 'utf-8', function (err, data) {
                if (err) throw err;
                console.log("Done!")
            })
        })
        const token = await jwt.sign({ _id: id }, newSecretJwt);
        console.log("token----------", token)
        return token
    } catch (error) {
        console.log("renew_token------", error)
        // throw error; // Re-throw the error to be handled by the caller
    }
}


const refresh_token = async (req, res) => {
    const user_id = req.body.user_id;
    try {
        const userData = await User.findById({ _id: user_id });
        if (!userData) {
            res.status(200).send({ success: false, msg: "User not found" });
        }
        const tokenData = await renew_token(user_id);
        console.log("tokenData-----", tokenData)
        const response = {
            user_id: user_id,
            token: tokenData
        };
        console.log("response123-----------", response)
        res.status(200).send({ success: true, msg: "Refresh token details", data: response });
    } catch (error) {
        console.log("error-----", error);
        // throw error
        // res.status(400).send({ success: false, msg: error.message });
    }
};





module.exports = {
    register_user,
    user_Login,
    update_Password,
    forget_Password,
    reset_Password,
    refresh_token
};
