const express = require("express");
const category_route = express();
const body_parser = require("body-parser");
category_route.use(body_parser.json());
category_route.use(body_parser.urlencoded({ extended: true }))
const auth = require("../middleware/auth");
const categoryController = require("../controllers/CategoryController")
category_route.post("/Add_Category", auth, categoryController.Add_Category);
module.exports = category_route