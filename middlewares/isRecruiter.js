const Interview = require("../models/interview");

const isRecruiter = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({ status: "error", message: "Interview not found" });
        }

        if (!interview.recruiterId.equals(userId)) {
            return res.status(403).json({
                status: "error",
                message: "Only recruiters can modify interviews or submit evaluations",
            });
        }

        next(); 
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};


module.exports = {isRecruiter};
