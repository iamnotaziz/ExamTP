const express = require("express");
const interviewrouter = express.Router();
const { 
    createInterviewController,
    updateInterviewController,
    deleteInterviewController,
    addFeedbackToInterviewController 
} = require("../controllers/interviewsController");

const { verifyToken } = require("../middlewares/verifyToken");
const { conflitsHoraire } = require("../middlewares/conflitsHoraire");
const { isRecruiter } = require("../middlewares/isRecruiter");

interviewrouter.post("/create", verifyToken, conflitsHoraire, createInterviewController); 
interviewrouter.put("/:id", verifyToken, isRecruiter, conflitsHoraire, updateInterviewController); 
interviewrouter.delete("/:id", verifyToken, isRecruiter, deleteInterviewController); 
interviewrouter.post("/:id/feedback", verifyToken, isRecruiter, addFeedbackToInterviewController); 

module.exports = interviewrouter;
