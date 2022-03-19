const { EC2Client } = require("@aws-sdk/client-ec2");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
const dotenv = require('dotenv');
dotenv.config();

const ec2Client = new EC2Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

const ec2ClientIni = (sub) => {
    const ec2Client = new EC2Client({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
    });
    return ec2Client;
}

module.exports = { ec2Client, ec2ClientIni }