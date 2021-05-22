const mongoose = require("mongoose");
const password = require("../service/password");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await password.tohash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

const User = mongoose.model('User', userSchema);


module.exports = User;