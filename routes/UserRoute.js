const express = require("express")
const user_route = express();
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
user_route.use(express.static('public'))
const auth = require("../middleware/auth")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/UserImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const user_controller = require("../controllers/UserController")
const upload = multer({ storage: storage })

user_route.post('/register', upload.single('image'), user_controller.register_user)

user_route.post('/login', user_controller.user_Login)

user_route.get('/test', auth, function (req, res) {
    res.status(200).send({ status: true, msg: "Authenticated" })
})
user_route.post('/updatePassword:id', auth, user_controller.update_Password)
user_route.post('/forgetPassword', auth, user_controller.forget_Password)



module.exports = user_route

