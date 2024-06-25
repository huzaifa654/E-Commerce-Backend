const express = require("express")
const report_route = express();
const bodyParser = require("body-parser");
report_route.use(bodyParser.json());
report_route.use(bodyParser.urlencoded({ extended: true }));

const report_controller = require("../controllers/ReportController")

report_route.post('/report', report_controller.reportToChairman)








module.exports = report_route

