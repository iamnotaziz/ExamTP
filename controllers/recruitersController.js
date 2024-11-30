const Recruiter = require("../models/recruiter");
const jwt = require('jsonwebtoken')

const createRecruiterController = async (req, res) => {
    try {
        const { name, email } = req.body;

        const recruiter = await Recruiter.create({ name, email });

        res.json({
            status: "success",
            data: recruiter,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getAllRecruitersController = async (req, res) => {
    try {
        const recruiters = await Recruiter.find();
        res.json({
            status: "success",
            data: recruiters,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


const recruiterLoginController = async (req, res) => {
    try {
        const { email } = req.body;

        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) {
            return res.json({ status: "error", message: "Recruiter not found" });
        }

        const token = jwt.sign({ id: recruiter._id, role: "recruiter" }, process.env.JWT_KEY, {
            expiresIn: "1h",
        });

        res.json({
            status: "success",
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports = {
    createRecruiterController,
    getAllRecruitersController,
    recruiterLoginController
};
