const dotenv = require("dotenv").config();

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

// Connect DB
const db = connectDb();

// onboard/set_location
exports.set_location = async function(req, res) {
    const { sessionId, location, longitude, latitude, } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const userData = await db.collection('users').findOne({uId: sessionData.uId});

    if (userData) {
      const encryptPass = decryptData(userData.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          locationData: {
            cityState: encryptData(location, encryptPass),
            longitude: encryptData(longitude, encryptPass),
            latitude: encryptData(latitude, encryptPass),
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
}