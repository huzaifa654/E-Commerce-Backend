const express = require("express")
const user_route = express();
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
user_route.use(express.static('public'))

const user_controller = require("../controllers/UserController")

user_route.post('/register', user_controller.register_user)

user_route.post('/login', user_controller.user_Login)



module.exports = user_route

