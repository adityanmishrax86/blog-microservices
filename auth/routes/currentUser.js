const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require('express').Router();

router.get("/auth/user", isAuthenticated, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
})

module.exports = router;