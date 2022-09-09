const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
var bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
var CryptoJS = require("crypto-js");
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

dotenv.config();

// Set up twilio
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

// Set up mongo
const mClient = new MongoClient(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mClient.connect()
const db = mClient.db("main");

// Set up app
const app = express();
var cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// generate new encrypt password
function genPass() {
  var hashBase = CryptoJS.lib.WordArray.random(128 / 8);

  var hashPassword = CryptoJS.SHA3(hashBase).toString();
  var encryptPass = CryptoJS.SHA3(hashPassword).toString();

  return encryptPass;
}

// Encrypt data
function encryptData(data, pass) {
  var encryptedData = CryptoJS.AES.encrypt(data, pass).toString();
  return encryptedData;
}

// Decrypt data
function decryptData(data, pass) {
  var bytes  = CryptoJS.AES.decrypt(data, pass);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

// Get Master Password
function getMasterPass() {
  const masterPass = process.env.MASTER_PASSWORD;
  return masterPass;
}

// Generate session data
function genSessionId() {
  var sessionId = uidgen.generateSync(64);
  return sessionId;
}

// base route
app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Hello World!",
    db: await db.collection('users').findOne()
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
app.post('/auth/verify_phone_code', async (req, res) => {

  // Get the number from body
  const { number, code } = req.body;

  // Make a request to the twilio api
  twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks
    .create({to: number, code: code})
    .then(verification_check => {
      // Send the response
      if (verification_check.status === 'approved') {

        const encryptPass = genPass();

        // save user Data
        const user = {
          uId: uidgen.generateSync(),
          phoneNumber: encryptData(number, encryptPass),
          isVerified: false,
          encryptPassword: encryptData(encryptPass, getMasterPass()),
          createdAt: new Date(),
          updatedAt: new Date(),
          pictures: [],
          likes: [],
          dislikes: [],
          matches: [],
        }

        const sessionData = {
          uId: user.uId,
          sessionId: genSessionId(),
        }

        const clientSesionData = {
          sessionId: sessionData.sessionId,
        }
        
        db.collection("users").insertOne(user, function(err, docRes) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving user',
              err
            })
          };

          db.collection("sessions").insertOne(sessionData, function(err, docRes) {
            if (err) {
              return res.status(500).json({
                message: 'Error saving session',
                err
              })
            };

            return res.status(200).json({
              message: 'User verified and created',
              sessionData: clientSesionData,
              verification_check
            });
          
          });

        });

      } else if(verification_check.status === 'pending') {
        return res.status(403).json({
          message: 'Invalid Code',
          verification_check
        })
      }
    })
  
})

// fetch user data
app.get('/fetch/user', async (req, res) => {
  // Get the id from body
  const { uId } = req.query;

  // get data from mongo
  const doc = await db.collection("users").findOne( { uId: uId } )

  if (doc === null) {
    return res.status(404).json({
      message: 'User not found',
    })
  }
    
  return res.status(200).json({
    message: 'User fetched',
    data: doc,
    masterPass: encryptData(getMasterPass(), doc.encryptPassword)
  });
})

// Set 404 Page
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// // Run the server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

module.exports.handler = serverless(app);