const express = require("express");
const statisticsrouter = express.Router();
const { getStatisticsController } = require("../controllers/statistiquesController");
const { verifyToken } = require("../middlewares/verifyToken");

statisticsrouter.get("/", verifyToken, getStatisticsController); 

module.exports = statisticsrouter;
