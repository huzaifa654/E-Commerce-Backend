const TimetableModel = require("../models/TimetableModel/TimetableModel");




const timeTableCourses = async (req, res) => {
    const { SemesterNo, Day, Time, Code, name } = req.body
    try {

        const timeTable = new TimetableModel({
            SemesterNo: SemesterNo,
            Day: Day,
            Time: Time,
            Code: Code,
            name: name

        });
        const semesterNo = await TimetableModel.findOne({ SemesterNo: SemesterNo });

        // Save the new user instance to the database
        const course_data = await timeTable.save();
        console.log(course_data)
        res.status(200).send({ success: true, message: "Semester Courses", data: course_data });





    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getTimeTableCourses = async (req, res) => {
    const { SemesterNo, } = req.body
    try {

        const semesterNo = await TimetableModel.find({ SemesterNo: SemesterNo });
        if (semesterNo) {
            res.status(200).send({ success: true, msg: "Semester Courses", data: semesterNo })

        } else {
            // Save the new user instance to the database
            res.status(404).send({ success: false, msg: "Semester Courses Not Found" })

        }

    } catch (error) {
        res.status(400).send(error.message);
    }
};







module.exports = {
    timeTableCourses,
    getTimeTableCourses,

};
