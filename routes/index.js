const express = require("express");

const candidaterouter = require("./candidateRoutes");
const interviewrouter = require("./interviewRoutes");
const recruiterrouter = require("./recruiterRoutes");
const statisticsrouter = require("./statisticsRoutes");

const router = express.Router();



router.use("/candidates", candidaterouter);
router.use("/interviews", interviewrouter); 
router.use("/recruiters", recruiterrouter); 
router.use("/statistics", statisticsrouter); 

module.exports = router;
