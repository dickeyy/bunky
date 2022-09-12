const CryptoJS = require("crypto-js");

function encryptData(data, pass) {
    var encryptedData = CryptoJS.AES.encrypt(data, pass).toString();
    return encryptedData;
}

function decryptData(data, pass) {
    var bytes  = CryptoJS.AES.decrypt(data, pass);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

// Exports
exports.encryptData = encryptData
exports.decryptData = decryptData