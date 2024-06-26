const SemsterCourses = require("../models/SemesterCourses/SemesterCourses");




const semesterCourses = async (req, res) => {
    const { SemesterNo, Course1, Course2, Course3, Course4, Course5, Course6, } = req.body
    try {

        const Courses = new SemsterCourses({
            SemesterNo: SemesterNo,
            Course1: Course1,
            Course2: Course2,
            Course3: Course3,
            Course4: Course4,
            Course5: Course5,
            Course6: Course6,

        });
        const semesterNo = await SemsterCourses.findOne({ SemesterNo: SemesterNo });
        if (semesterNo) {
            res.status(200).send({ success: true, msg: "SemesterNo is Already exisist" })

        } else {
            // Save the new user instance to the database
            const course_data = await Courses.save();
            console.log(course_data)
            res.status(200).send({ success: true, message: "Semester Courses", data: course_data });
        }




    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getsSmesterCourses = async (req, res) => {
    const { SemesterNo, } = req.body
    try {

        const semesterNo = await SemsterCourses.find({ SemesterNo: SemesterNo });
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
    semesterCourses,
    getsSmesterCourses,

};
