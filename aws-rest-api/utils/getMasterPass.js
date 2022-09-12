const dotenv = require("dotenv").config();

function getMasterPass () {
    return process.env.MASTER_PASSWORD;
}

exports.getMasterPass = getMasterPass