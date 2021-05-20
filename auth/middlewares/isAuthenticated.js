const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
    if (!req.session?.jwt)
        next();

    try {
        const payload = jwt.verify(req.session.jwt, "asdf");
        req.currentUser = payload;
    } catch { }

    next();
}

module.exports = isAuthenticated;