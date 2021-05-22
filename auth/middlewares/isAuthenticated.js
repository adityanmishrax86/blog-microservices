const jwt = require('jsonwebtoken');
require("dotenv").config();

const isAuthenticated = (req, res, next) => {
    if (!req.session?.jwt)
        next();

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
    } catch { }

    next();
}

module.exports = isAuthenticated;