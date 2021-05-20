const { body, validationResult } = require("express-validator")
const jwt = require('jsonwebtoken');
const router = require("Express").Router();
const axios = require('axios');
const User = require("../models/user");

router.get("/auth", (req, res) => {
    res.send("Success");
})
router.post('/auth/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(403).send(errors.array())

        const { name, email, password } = req.body;
        let existingUser;
        try {
            existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(403).send({ message: "User Already Exists" });
            }
        } catch {
            return res.status(403).send({ message: "User Already Exists" });
        }

        const user = await User.create({ name, email, password });
        await user.save();

        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, 'asdf');

        req.session.jwt = userJWT;

        await axios.post('http://localhost:4005/events', {
            type: 'UserCreated',
            data: {
                name,
                email
            }
        })
        return res.status(201).send(user);

    })

module.exports = router;