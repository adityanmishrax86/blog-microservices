const jwt = require('jsonwebtoken');
const router = require("express").Router();
const axios = require('axios');
const User = require("../models/user");
const { compare } = require("../service/password");
require("dotenv").config();

router.get("/auth/signin", (req, res) => {
    res.send("Success");
})

router.post("/auth/signin", async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email
    })

    if (!existingUser) {
        return res.status(401).send({ message: "Invalid Creds" });
    }

    const matchPassword = await compare(existingUser.password, password)

    if (!matchPassword)
        return res.status(401).send({ message: "Invalid Creds" });

    const userJWT = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY
    )

    req.session = {
        jwt: userJWT
    }

    await axios.post('http://event-bus:4005/events', {
        type: 'UserLoggedIn',
        data: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
        }
    })
    res.status(200).send(existingUser);
})

module.exports = router;