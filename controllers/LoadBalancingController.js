const { DescribeLoadBalancersCommand, DescribeTargetGroupsCommand } = require("@aws-sdk/client-elastic-load-balancing-v2");
const { loadbalancingClient } = require("../libs/loadbalancingClient");
const { successResponse, errorResponse } = require("../utils/Response");

exports.loadbalancer = async(req, res) => {
    try {
        const command = new DescribeLoadBalancersCommand({});
        const response = await loadbalancingClient.send(command);
        return res.send(successResponse("OK", "Success get load balancers list", response.LoadBalancers));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};

exports.groups = async(req, res) => {
    try {
        const command = new DescribeTargetGroupsCommand({});
        const response = await loadbalancingClient.send(command);
        return res.send(successResponse("OK", "Success get target groups list", response.TargetGroups));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};