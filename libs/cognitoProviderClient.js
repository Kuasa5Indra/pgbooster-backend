const { CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider");
const { fromEnv } = require("@aws-sdk/credential-provider-env");
const dotenv = require('dotenv');
dotenv.config();

const cognitoProviderClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

module.exports = { cognitoProviderClient }
