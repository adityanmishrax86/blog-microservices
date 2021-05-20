const jwt = require('jsonwebtoken');
const router = require("Express").Router();
const axios = require('axios');
const User = require("../models/user");
const { compare } = require("../service/password");

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
        'asdf'
    )

    req.session = {
        jwt: userJWT
    }

    await axios.post('http://localhost:4005/events', {
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