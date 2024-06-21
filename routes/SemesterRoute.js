const express = require("express")
const semester_route = express();
const bodyParser = require("body-parser");
semester_route.use(bodyParser.json());
semester_route.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
semester_route.use(express.static('public'))

const semester_controller = require("../controllers/SemesterController")

semester_route.post('/courses', semester_controller.semesterCourses,)
semester_route.post('/getCourses', semester_controller.getsSmesterCourses,)








module.exports = semester_route

