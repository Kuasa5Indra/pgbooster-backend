const { ElasticLoadBalancingV2Client } = require("@aws-sdk/client-elastic-load-balancing-v2");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const loadbalancingClient = new ElasticLoadBalancingV2Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

module.exports = { loadbalancingClient }