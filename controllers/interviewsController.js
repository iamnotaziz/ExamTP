const Interview = require("../models/interview");
const Candidate = require("../models/candidate");

const createInterviewController = async (req, res) => {
    try {
        const { date, time, recruiterId, candidateId } = req.body;

        const conflict = await Interview.findOne({ date, time, recruiterId });
        if (conflict) {
            return res.json({ status: "error", message: "Time slot conflict detected" });
        }

        const interview = await Interview.create({ date, time, recruiterId, candidateId });
        await Candidate.findByIdAndUpdate(candidateId, { $push: { interviewHistory: { interviewId: interview._id } } });

        res.json({
            status: "success",
            data: interview,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const updateInterviewController = async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: "success",
            data: interview,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const deleteInterviewController = async (req, res) => {
    try {
        const interview = await Interview.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            data: interview,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const addFeedbackToInterviewController = async (req, res) => {
    try {
        const { feedback } = req.body;
        const interview = await Interview.findByIdAndUpdate(
            req.params.id,
            { $push: { feedback } },
            { new: true }
        );
        res.json({
            status: "success",
            data: interview,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

module.exports = {
    createInterviewController,
    updateInterviewController,
    deleteInterviewController,
    addFeedbackToInterviewController,
};
