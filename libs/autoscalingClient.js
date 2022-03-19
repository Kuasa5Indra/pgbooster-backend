const { AutoScalingClient } = require("@aws-sdk/client-auto-scaling");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
const dotenv = require('dotenv');
dotenv.config();

const autoscalingClient = new AutoScalingClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

const autoscalingClientIni = (sub) => {
    const autoscalingClient = new AutoScalingClient({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
    });
    return autoscalingClient;
}

module.exports = { autoscalingClient, autoscalingClientIni }