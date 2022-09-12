const S3 = require('aws-sdk/clients/s3');
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// uploads to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };

    return s3.upload(uploadParams).promise();
}

// downloads from s3
function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream
exports.uploadFile = uploadFile
