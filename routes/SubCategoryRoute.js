const express = require("express");
const subCategoryRoute = express();
const bodyParser = require("body-parser");
subCategoryRoute.use(bodyParser.json());
subCategoryRoute.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../middleware/auth")
const subCategoryController = require("../controllers/SubCategoryController")
subCategoryRoute.post("/sub_category", auth, subCategoryController.create_subcategory)
module.exports = subCategoryRoute;