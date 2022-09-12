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

exports.logout = async function(req, res) {
    const sessionId = req.headers.authorization;

    if (sessionId == null) {
      return res.status(403).json({
        message: 'Unathorized',
      })
    }
  
    // validate session
    const sessionData = await db.collection('sessions').findOne({sessionId: sessionId});
  
    if (sessionData) {
      // delete session
      db.collection("sessions").deleteOne({sessionId: sessionId}, function(err, obj) {
        if (err) {
          return res.status(500).json({
            message: 'Error deleting session',
            err
          })
        };
  
        return res.status(200).json({
          message: 'Session deleted',
        });
  
      });
    } else {
      return res.status(404).json({
        message: 'Session not found',
      })
    }
}