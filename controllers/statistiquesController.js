const Interview = require("../models/interview");
const Candidate = require("../models/candidate");

const getStatisticsController = async (req, res) => {
    try {
        const totalInterviews = await Interview.countDocuments();

        const totalCandidates = await Candidate.countDocuments();

        const totalRecruiters = await Recruiter.countDocuments();

        const acceptedCandidates = await Candidate.countDocuments({ status: "Accepté" });
        const successRate = totalCandidates > 0 
            ? ((acceptedCandidates / totalCandidates) * 100).toFixed(2) 
            : 0;

        const interviewsByStatus = await Interview.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        res.json({
            status: "success",
            data: {
                totalInterviews,
                totalCandidates,
                totalRecruiters,
                successRate: `${successRate}%`,
                interviewsByStatus,
            },
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports = {
    getStatisticsController,
};
