const express = require("express")
const timetable_route = express();
const bodyParser = require("body-parser");
timetable_route.use(bodyParser.json());
timetable_route.use(bodyParser.urlencoded({ extended: true }));

const timetable_controller = require("../controllers/TimetableRoute")

timetable_route.post('/timeTablecourses', timetable_controller.timeTableCourses)
timetable_route.post('/getTimeTableCourses', timetable_controller.getTimeTableCourses,)








module.exports = timetable_route

