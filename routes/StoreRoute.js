const express = require("express")
const store_route = express();
const bodyParser = require("body-parser");
store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
store_route.use(express.static('public'))
const auth = require("../middleware/auth")
store_route.use(express.static('public'))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/StoreImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});