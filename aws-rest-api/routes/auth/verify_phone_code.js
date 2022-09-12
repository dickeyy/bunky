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

// /auth/verify_phone_code
exports.verify_phone_code = async function(req, res) {
    // Get the number from body
  const { number, code } = req.body;

  const num1 = number.replace(/\s/g, '');
  const num2 = num1.replace(/\(/g, '');
  const num2_1 = num2.replace(/\)/g, '');
  const num3 = num2_1.replace(/-/g, '');

  const userDoc = await db.collection('users').findOne({phoneNumber: num3});

  if (userDoc) {
    twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks
    .create({to: num3, code: code})
    .then(verification_check => {
      if (verification_check.status === 'approved') {

        const sessionData = {
          sessionId: genSessionId(),
          userId: userDoc.uId,
        }
    
        db.collection("sessions").insertOne(sessionData, function(err, docRes) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving session',
              err
            })
          } else {
            return res.status(200).json({
              message: 'Verification code approved',
              sessionData
            })
          }
        });
      } else {
        return res.status(403).json({
          message: 'Verification code not approved',
        })
      }
    })
  } else {


    // Make a request to the twilio api
    twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks
      .create({to: num3, code: code})
      .then(verification_check => {
        // Send the response
        if (verification_check.status === 'approved') {

          const encryptPass = genPass();

          // console.log(device.Device.brand)

          // save user Data
          const user = {
            uId: uidgen.generateSync(),
            phoneNumber: num3,
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
                sessionData: sessionData.sessionId,
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
  }
}