const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
var bodyParser = require('body-parser')

dotenv.config();

// Set up twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

// Set up app
const app = express();
var cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// base route
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: process.env.TWILIO_ACCOUNT_SID,
  });
});

// phone auth route
app.post('/auth/send_phone_code', (req, res) => {
  // Get the number from body
  const { number } = req.body;

  // Make a request to the twilio api
  twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
    .verifications
    .create({to: number, channel: 'sms'})
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

})

// Verify a code
app.post('/auth/verify_phone_code', (req, res) => {
  // Get the number from body
  const { number, code } = req.body;

  // Make a request to the twilio api
  twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks
    .create({to: number, code: code})
    .then(verification_check => {
      // Send the response
      if (verification_check.status === 'approved') {
        return res.status(200).json({
          message: 'Verification code sent',
          verification_check
        })
      } else if(verification_check.status === 'pending') {
        return res.status(403).json({
          message: 'Invalid Code',
          verification_check
        })
      }
    })
  
})

// Set 404 Page
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// // Run the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports.handler = serverless(app);