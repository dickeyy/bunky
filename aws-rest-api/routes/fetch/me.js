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

exports.me = async function(req, res) {
    const sessionId = req.headers.authorization;

    if (sessionId == null) {
      return res.status(503).json({
        message: 'Unathorized',
      })
    }
  
    // validate session
    const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});
  
    if (sessionData) {
  
      const doc = await db.collection("users").findOne( { uId: sessionData.userId } )
  
      if (doc === null) {
        return res.status(404).json({
          message: 'User not found',
        })
      }
  
      const encryptPass = decryptData(doc.encryptPassword, getMasterPass());
  
      return res.status(200).json({
        message: 'User fetched',
        doc,
        masterPass: encryptData(getMasterPass(), doc.encryptPassword),
      });
    }
}

