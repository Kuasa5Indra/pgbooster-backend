const { RDSClient } = require("@aws-sdk/client-rds");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const dotenv = require('dotenv');
dotenv.config();

const rdsClient = new RDSClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
})

module.exports = { rdsClient }