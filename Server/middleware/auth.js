const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({message: "Auth Error"});

    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user; // setting the req.user so that the next callback function can directly access it
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({message: "Invalid Token"});
    }
};