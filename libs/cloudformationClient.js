const { CloudFormationClient } = require("@aws-sdk/client-cloudformation");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const dotenv = require('dotenv');
dotenv.config();

const cloudformationClient = new CloudFormationClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv(),
    maxAttempts: 3
});

module.exports = {
    cloudformationClient
}