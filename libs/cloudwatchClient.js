const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
const dotenv = require('dotenv');
dotenv.config();

const cloudWatchClient = new CloudWatchClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

const cloudWatchClientIni = (sub) => {
    const cloudWatchClient = new CloudWatchClient({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
    });
    return cloudWatchClient;
}

module.exports = { cloudWatchClient, cloudWatchClientIni }
