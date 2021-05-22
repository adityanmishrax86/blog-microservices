const { default: axios } = require("axios");

const router = require("express").Router();

router.post("/auth/signout", (req, res) => {
    req.session = null;

    axios.post("http://event-bus:4005/events", {
        type: "UserLoggedOut",
        data: {}
    })

    res.send({})
})



module.exports = router;