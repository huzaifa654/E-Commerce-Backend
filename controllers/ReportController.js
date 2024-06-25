const Report = require('../models/ReportModel/ReportModel');
const UserModel = require('../models/UserModel');

const reportToChairman = async (req, res) => {
    const { email, report } = req.body
    try {

        const newReport = new Report({

            email: email,
            report: report
        });



        const user = await UserModel.findOne({ email: email });



        if (user) {
            const report_data = await newReport.save();
            console.log("report_data-", report_data)
            res.status(200).send({ success: true, message: `Report Successfully Submitted To Chairman` });
        } else {
            // Save the new user instance to the database
            res.status(404).send({ success: false, message: "Email doest not exist", });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    reportToChairman
}


