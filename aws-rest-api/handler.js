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

const { getFileStream } = require('./s3');

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
  
})

// Auth onboarding routes
// Add name
app.post('/onboard/add_name', async (req, res) => {
  const { sessionId, firstName, lastName } = req.body;

  console.log(sessionId, firstName, lastName);

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          firstName: encryptData(firstName, encryptPass),
          lastName: encryptData(lastName, encryptPass),
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
          userData: {
            firstName: firstName,
            lastName: lastName,
          }
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

})

// add username
app.post('/onboard/add_username', async (req, res) => {
  const { sessionId, username } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          username: encryptData(username, encryptPass),
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
          userData: {
            username: username,
          }
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

})

// set user data
app.post('/onboard/set_user_data', async (req, res) => {
  const { sessionId, userData } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          userData: {
            age: encryptData(userData.age, encryptPass),
            pronouns: encryptData(userData.pronouns, encryptPass),
            jobTitle: encryptData(userData.jobTitle, encryptPass),
            company: encryptData(userData.company, encryptPass),
            school: encryptData(userData.school, encryptPass),
            bio: encryptData(userData.bio, encryptPass),
            gender: encryptData(userData.gender, encryptPass),
            sexuality: encryptData(userData.sexuality, encryptPass),
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
          userData: {
            userData: userData,
          }
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

})

//set living info
app.post('/onboard/set_living_data', async (req, res) => {
  const { sessionId, livingData } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());
      
      // Update user data
      const updateData = {
        $set: {
          livingData: {
            bedTime: encryptData(livingData.bedTime, encryptPass),
            wakeTime: encryptData(livingData.wakeTime, encryptPass),
            okayWithGuests: encryptData(livingData.okayWithGuests, encryptPass),
            howOftenHaveGuests: encryptData(livingData.howOftenHaveGuests, encryptPass),
            showerTime: encryptData(livingData.showerTime, encryptPass),
            cookOrder: encryptData(livingData.cookOrder, encryptPass),
            keepSpaceClean: encryptData(livingData.keepSpaceClean, encryptPass),
            noiseLevel: encryptData(livingData.noiseLevel, encryptPass),
            lgbtComfort: encryptData(livingData.lgbtComfort, encryptPass),
            smoker: encryptData(livingData.smoker, encryptPass),
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
          livingData: {
            livingData: livingData,
          }
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

})

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
app.post('/onboard/set_location', async (req, res) => {
  const { sessionId, location } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          location: encryptData(location, encryptPass),
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
          location: {
            location: location,
          }
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

})



app.get('/images/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
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