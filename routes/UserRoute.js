const express = require("express")
const user_route = express();
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.use(express.static('public'))
const auth = require("../middleware/auth")

const user_controller = require("../controllers/UserController")

user_route.post('/register',  user_controller.register_user);
user_route.post('/getUsers',  user_controller.get_users);


user_route.post('/login', user_controller.user_Login)

user_route.get('/test', auth, function (req, res) {
    res.status(200).send({ status: true, msg: "Authenticated" })
})
user_route.post('/updatePassword', auth, user_controller.update_Password)
user_route.post('/forgetPassword', user_controller.forget_Password)
user_route.post('/resetPassword', user_controller.reset_Password)
user_route.post('/refreshToken', auth, user_controller.refresh_token)




module.exports = user_route

