
// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

const db = connectDb();

// Route /onboard/add_name
exports.add_name = async function(req, res) {
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
}