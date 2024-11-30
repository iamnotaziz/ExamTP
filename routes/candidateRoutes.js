const express = require("express");
const candidaterouter = express.Router();
const { 
    createCandidateController,
    getCandidateByIdController,
    getAllCandidatesController,
    deleteCandidateByIdController,
    updateCandidateByIdController,
    candidateLoginController,
    getCandidateHistoryController 
} = require("../controllers/candidatesController");
const { verifyToken } = require("../middlewares/verifyToken");

candidaterouter.post("/create", createCandidateController); 
candidaterouter.get("/:id", verifyToken, getCandidateByIdController); 
candidaterouter.get("/", verifyToken, getAllCandidatesController); 
candidaterouter.delete("/:id", verifyToken, deleteCandidateByIdController); 
candidaterouter.put("/:id", verifyToken,updateCandidateByIdController); 
candidaterouter.post("/login", candidateLoginController); 
candidaterouter.get("/:id/history", verifyToken, getCandidateHistoryController); 

module.exports = candidaterouter;
