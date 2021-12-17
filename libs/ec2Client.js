const { EC2Client } = require("@aws-sdk/client-ec2");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const dotenv = require('dotenv');
dotenv.config();

const ec2Client = new EC2Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

module.exports = { ec2Client }