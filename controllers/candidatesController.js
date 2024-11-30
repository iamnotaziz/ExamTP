const Candidate = require("../models/candidate");
const jwt = require('jsonwebtoken')

const createCandidateController = async (req, res) => {
    try {
        const { name, email } = req.body;

        const candidate = await Candidate.create({ name, email });

        res.json({
            status: "success",
            data: candidate,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getCandidateByIdController = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        res.json({
            status: "success",
            data: candidate,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getAllCandidatesController = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json({
            status: "success",
            data: candidates,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const deleteCandidateByIdController = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            data: candidate,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const updateCandidateByIdController = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: "success",
            data: candidate,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const getCandidateHistoryController = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id).populate("interviewHistory.interviewId");
        res.json({
            status: "success",
            data: candidate?.interviewHistory || [],
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};

const candidateLoginController = async (req, res) => {
    try {
        const { email } = req.body;

        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(404).json({ status: "error", message: "Candidate not found" });
        }

        const token = jwt.sign({ id: candidate._id, role: "candidate" }, process.env.JWT_KEY, {
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
    createCandidateController,
    getCandidateByIdController,
    getAllCandidatesController,
    deleteCandidateByIdController,
    updateCandidateByIdController,
    candidateLoginController,
    getCandidateHistoryController,
};
