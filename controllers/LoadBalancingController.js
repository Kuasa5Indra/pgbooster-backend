const { DescribeLoadBalancersCommand, DescribeTargetGroupsCommand } = require("@aws-sdk/client-elastic-load-balancing-v2");
const { loadbalancingClientIni } = require("../libs/loadbalancingClient");
const { successResponse, errorResponse } = require("../utils/Response");

exports.loadbalancer = async(req, res) => {
    try {
        const loadbalancingClient = loadbalancingClientIni(req.sub);
        const command = new DescribeLoadBalancersCommand({});
        const response = await loadbalancingClient.send(command);
        return res.send(successResponse("OK", "Success get load balancers list", response.LoadBalancers));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.groups = async(req, res) => {
    try {
        const loadbalancingClient = loadbalancingClientIni(req.sub);
        const command = new DescribeTargetGroupsCommand({});
        const response = await loadbalancingClient.send(command);
        return res.send(successResponse("OK", "Success get target groups list", response.TargetGroups));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};