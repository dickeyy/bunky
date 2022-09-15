var AWS = require('aws-sdk');
const dotenv = require("dotenv").config();

AWS.config.update({region: process.env.AWS_BUCKET_REGION});

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

const db = connectDb();

// Route /mail/subscribe
exports.subscribe = async function(req, res) {
    const { email } = req.body;

    // Check if email already exists
    const emailData = await db.collection('mailList').findOne({email: encryptData(email, getMasterPass())});

    if (emailData) {
        return res.status(200).json({
            message: 'Email already exists',
        })
    } else {
        // Insert email
        db.collection("mailList").insertOne({email: encryptData(email, getMasterPass())}, function(err, docRes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error inserting email',
                    err
                })
            };

            var params = {
              Destination: { 
                ToAddresses: [
                  email,
                  /* more To email addresses */
                ]
              },
              Source: 'noreply@bunky.app', /* required */
              Template: 'aws_ses_template_subscribe', /* required */
              TemplateData: "{ \"email\": \"" + email + "\" }",
              ReplyToAddresses: [
                'hello@bunky.app'
              ],
            };

              // Create the promise and SES service object
              var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();
              
              // Handle promise's fulfilled/rejected states
              sendPromise.then(
                function(data) {
                  return res.status(200).json({
                    message: 'Email Subscribed',
                    data: {
                      email: email,
                      messageId: data.MessageId
                    }
                  });
                }).catch(
                  function(err) {
                  return res.status(500).json({
                    message: 'Error sending email',
                    err,
                    email: email
                });
              });
        });
    }
}