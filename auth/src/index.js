const { json } = require("body-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const signUpRouter = require("../routes/signup");
const signInRouter = require("../routes/signin");
const signOutRouter = require("../routes/signout");
const currentUser = require("../routes/currentUser");
const app = require("express")();
const cors = require('cors');
require("dotenv").config();

// middlewares
app.use(cors());
app.use(json())
app.set('trust proxy', true)
app.use(cookieSession({
    signed: false
}))

//routes

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(currentUser);

app.post("/events", async (req, res) => {
    console.log("Received Event:", req.body.type);
    res.send({})
})

//error handler
app.use((err, req, res, next) => {
    if (err)
        next(err);

    res.status(400).send({ message: "Something Went Wrong" });
})

// database setup
try {
    mongoose.connect(`mongodb://mongodb:27017/Users`, {
        useNewUrlParser: true,

    })
    console.log("Connection to Database is Successful");
} catch (err) {
    console.log(err);
}

app.listen(4009, () => {
    console.log("Running Auth");
})