const { ElasticLoadBalancingV2Client } = require("@aws-sdk/client-elastic-load-balancing-v2");
const { fromIni, fromEnv } = require("@aws-sdk/credential-providers");
const dotenv = require('dotenv');
dotenv.config();

const loadbalancingClient = new ElasticLoadBalancingV2Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    credentials: fromEnv()
});

const loadbalancingClientIni = (sub) => {
    const loadbalancingClient = new ElasticLoadBalancingV2Client({
        credentials: fromIni({
            profile: "default",
            filepath: process.cwd() + "/.aws/" + sub + "/credentials",
            configFilepath: process.cwd() + "/.aws/" + sub + "/config",
        }),
    });
    return loadbalancingClient;
}

module.exports = { loadbalancingClient, loadbalancingClientIni }