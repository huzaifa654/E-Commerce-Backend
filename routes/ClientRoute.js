const express = require("express")
const clint_route = express();
const bodyParser = require("body-parser");
clint_route.use(bodyParser.json());
clint_route.use(bodyParser.urlencoded({ extended: true }));
const clint_controller = require("../controllers/ClientControllers")

clint_route.post('/register_client',clint_controller.register_client);
clint_route.post('/get_clients',clint_controller.get_clients);

module.exports = clint_route
