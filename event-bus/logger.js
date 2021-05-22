const log4js = require("log4js");
log4js.configure({
    appenders: { system: { type: "file", filename: "system.log" } },
    categories: { default: { appenders: ["system"], level: "error" } }
});

const logger = log4js.getLogger("system");
module.exports = {
    logger
}