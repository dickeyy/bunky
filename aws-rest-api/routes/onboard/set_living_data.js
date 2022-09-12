const dotenv = require("dotenv").config();

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

// Connect DB
const db = connectDb();

// /onboard/set_living_data
exports.set_living_data = async function(req, res) {
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
}