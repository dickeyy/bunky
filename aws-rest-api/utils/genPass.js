const CryptoJS = require("crypto-js");

function genPass() {
    var hashBase = CryptoJS.lib.WordArray.random(128 / 8);
  
    var hashPassword = CryptoJS.SHA3(hashBase).toString();
    var encryptPass = CryptoJS.SHA3(hashPassword).toString();
  
    return encryptPass;
}

exports.genPass = genPass;