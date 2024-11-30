const express = require("express");
const dotenv = require('dotenv');
const { database } = require('./config/database');

const routes = require("./routes");

dotenv.config();

database();

const app = express();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
