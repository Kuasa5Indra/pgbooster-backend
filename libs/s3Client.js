const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

module.exports = {
    s3Client
}