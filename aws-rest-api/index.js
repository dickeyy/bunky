const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
var bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
var CryptoJS = require("crypto-js");
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
const multer  = require('multer')
const multerS3 = require('multer-s3')
const S3 = require('aws-sdk/clients/s3');

const { getFileStream } = require('./utils/s3');
const { connectDb } = require('./utils/mongo');

// Import Routes
const baseRoute = require('./routes/baseRoute');
const send_phone_code = require('./routes/auth/send_phone_code');
const verify_phone_code = require("./routes/auth/verify_phone_code");
const add_name = require("./routes/onboard/add_name");
const add_username = require("./routes/onboard/add_username");
const set_user_data = require("./routes/onboard/set_user_data");
const set_living_data = require("./routes/onboard/set_living_data");
const set_location = require("./routes/onboard/set_location");
const user_key = require("./routes/fetch/user_key");
const me = require('./routes/fetch/me');
const logout = require("./routes/auth/logout");
const subscribe = require('./routes/mail/subscribe');

// config env
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

// Set up AWS
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    limits: { fileSize: 15000000 },
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

// Middleware
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

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
app.get('/', baseRoute.home)

// phone auth route
app.post('/auth/send_phone_code', send_phone_code.send_phone_code)

// Verify a code
app.post('/auth/verify_phone_code', verify_phone_code.verify_phone_code)

// Add name
app.post('/onboard/add_name', add_name.add_name)

// add username
app.post('/onboard/add_username', add_username.add_username)

// set user data
app.post('/onboard/set_user_data', set_user_data.set_user_data)

//set living info
app.post('/onboard/set_living_data', set_living_data.set_living_data)

// upload profile pic
app.post('/onboard/upload_profile_pic', upload.array('image'), async (req, res, next) => {
  const sessionId = req.headers.authorization;

  const files = req.files;

  // verify session
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // const result = await uploadFile(file);

      // Update user data
      const updateData = {
        $set: {
          pictures: {
            key: encryptData(files[0].key, encryptPass),
            location: encryptData(files[0].location, encryptPass),
            bucket: encryptData(files[0].bucket, encryptPass),
            etag: encryptData(files[0].etag, encryptPass),
            test: 'test'
          },
          updatedAt: new Date(),
        }
      }

      db.collection("users").updateOne({uId: sessionData.uId}, updateData, function(err, docRes) {
        if (err) {
          return res.status(500).json({
            message: 'Error updating user',
            err
          })
        };

        return res.status(200).json({
          message: 'User updated',
        });

      });
    } else {
      return res.status(404).json({
        message: 'User not found',
      })
    }
  } else {
    return res.status(404).json({
      message: 'Session not found',
    })
  }

  console.log(result);
})

// set location
app.post('/onboard/set_location', set_location.set_location)

// fetch user data
app.get('/fetch/user/:id', user_key.user_key)

// fetch me
app.get('/fetch/me', me.me)

// logout
app.get('/auth/logout', logout.logout)

// Mail list subscribe
app.post('/mail/subscribe', subscribe.subscribe)

// Set 404 Page
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Set 500 page
app.use(function (err, req, res, next) {
  return res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    stack: err.stack,
  });
})

// // Run the server
app.listen(8080, () => {
  console.log("Server is running on port 3000");
});

module.exports.handler = serverless(app);