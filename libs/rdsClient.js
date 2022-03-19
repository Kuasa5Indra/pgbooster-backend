const { RDSClient } = require("@aws-sdk/client-rds");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
const dotenv = require('dotenv');
dotenv.config();

const rdsClient = new RDSClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
})

const rdsClientIni = (sub) => {
    const rdsClient = new RDSClient({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
    })
    return rdsClient;
}

module.exports = { rdsClient, rdsClientIni }