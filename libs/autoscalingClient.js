const { AutoScalingClient } = require("@aws-sdk/client-auto-scaling");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const autoscalingClient = new AutoScalingClient({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

module.exports = { autoscalingClient }