const Interview = require("../models/interview");

const conflitsHoraire = async (req, res, next) => {
    const { date, time, recruiterId } = req.body;

    try {
        const existingInterview = await Interview.findOne({ 
            date,
            time,
            recruiterId
        });

        if (existingInterview) {
            return res.json({
                status: "error",
                message: "This time slot is already taken by another interview for this recruiter.",
            });
        }

        next();
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


module.exports = {conflitsHoraire};
