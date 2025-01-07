const Client = require("../models/ClientModel");

const register_client = async (req, res) => {
    try {
        const { name, email, mobile, } = req.body

        const newUser = new Client({
            name: name,
            email: email,
            mobile: mobile,
        });

        const clientData = await Client.findOne({ email: req.body.email });
        console.log("userData----", clientData);
        if (clientData) {
            res.status(200).send({ success: false, msg: "This email is already exists" });
        } else {
            // Save the new user instance to the database
            const user_data = await newUser.save();
            console.log(user_data)
            res.status(200).send({ success: true, data: user_data });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const get_clients = async (req, res) => {
    const allclients = await Client.find()  //Give all in all users
    res.status(200).send({ success: true, data: allclients });
}



module.exports = {
    register_client,
    get_clients

};
