const { promisify } = require("util");
const { scrypt, randomBytes } = require("crypto");

const asyncScript = promisify(scrypt);

module.exports = {
    async tohash(password) {
        const salt = randomBytes(8).toString('hex');
        const buf = Buffer.from(await asyncScript(password, salt, 64))

        return `${buf.toString('hex')}.${salt}`;
    },
    async compare(storedPassword, suppliedPassword) {
        const [hashedpassword, salt] = storedPassword.split('.');
        const buf = Buffer.from(await asyncScript(suppliedPassword, salt, 64));

        return buf.toString('hex') === hashedpassword;
    }
}