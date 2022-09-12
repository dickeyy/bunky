const dotenv = require("dotenv").config();
const multer  = require('multer')
const multerS3 = require('multer-s3')
const S3 = require('aws-sdk/clients/s3');

// Utils
const { connectDb } = require('../../utils/mongo');
const { encryptData, decryptData } = require('../../utils/encrypt');
const { getMasterPass } = require('../../utils/getMasterPass');

// Connect DB
const db = connectDb();

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

// /onboard/upload_profile_pic
exports.upload_profile_pic = async function (req, res, next) {}
