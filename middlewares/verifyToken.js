const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({ status: "error", message: "Token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;  
        next();
    } catch (error) {
        res.status(401).json({ status: "error", message: "Unauthorized, invalid token" });
    }
};

module.exports = { verifyToken };


module.exports = {verifyToken};
