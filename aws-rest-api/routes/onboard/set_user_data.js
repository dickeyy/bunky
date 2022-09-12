const dotenv = require("dotenv").config();

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

// Connect DB
const db = connectDb();

exports.set_user_data = async function(req, res) {
    const { sessionId, userData } = req.body;

  // Get user data
  const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});

  if (sessionData) {
    const doc = await db.collection('users').findOne({uId: sessionData.uId});

    if (doc) {
      const encryptPass = decryptData(doc.encryptPassword, getMasterPass());

      // Update user data
      const updateData = {
        $set: {
          personalData: {
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
}