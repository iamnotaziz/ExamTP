const express = require("express");
const recruiterrouter = express.Router();
const { 
    createRecruiterController,
    getAllRecruitersController,
    recruiterLoginController 
} = require("../controllers/recruitersController");
const { verifyToken } = require("../middlewares/verifyToken");

recruiterrouter.post("/create", createRecruiterController); 
recruiterrouter.get("/", getAllRecruitersController); 
recruiterrouter.post("/login", recruiterLoginController); 
module.exports = recruiterrouter;
