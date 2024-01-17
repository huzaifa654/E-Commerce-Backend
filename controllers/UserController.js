const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const config = require("../config/Config")
const jwt = require("jsonwebtoken")
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

const update_Password=async(req,res)=>{
 
}
module.exports = {
    register_user,
    user_Login,
    update_Password
};
