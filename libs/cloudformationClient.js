const { CloudFormationClient } = require("@aws-sdk/client-cloudformation");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
// const { fromEnv } = require("@aws-sdk/credential-provider-env");
const dotenv = require('dotenv');
dotenv.config();

const cloudformationClient = new CloudFormationClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv(),
    maxAttempts: 3
});

const cloudformationClientIni = (sub) => {
    const cloudformationClient = new CloudFormationClient({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
        maxAttempts: 3
    });
    return cloudformationClient;
}

module.exports = {
    cloudformationClient, cloudformationClientIni
}