const dotenv = require("dotenv").config();
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');
const { genSessionId } = require('../../utils/sessionGen');
const { genPass } = require('../../utils/genPass');

// Connect DB
const db = connectDb();

// auth/send_phone_code
exports.send_phone_code = function(req, res) {

    // Get the number from body
    const { number } = req.body;

    const num1 = number.replace(/\s/g, '');
    const num2 = num1.replace(/\(/g, '');
    const num2_1 = num2.replace(/\)/g, '');
    const num3 = num2_1.replace(/-/g, '');

    // Make a request to the twilio api
    twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verifications
        .create({to: num3, channel: 'sms'})
        .then(verification => {
        
        // Send the response
        if (verification.status === 'pending') {
            return res.status(200).json({
            message: 'Verification code sent',
            verification
            })
        } else {
            return res.status(400).json({
            message: 'Verification code not sent',
            verification
            })
        }
        })

    // Send a response

}