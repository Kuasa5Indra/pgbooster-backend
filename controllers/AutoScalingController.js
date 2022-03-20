const { DescribeAutoScalingInstancesCommand, DescribeAutoScalingGroupsCommand,
        TerminateInstanceInAutoScalingGroupCommand } = require("@aws-sdk/client-auto-scaling");
const { autoscalingClientIni } = require("../libs/autoscalingClient");
const { successResponse, errorResponse } = require("../utils/Response");

exports.instances = async(req, res) => {
    try {
        const autoscalingClient = autoscalingClientIni(req.sub);
        const command = new DescribeAutoScalingInstancesCommand({});
        const response = await autoscalingClient.send(command);
        return res.send(successResponse("OK", "Success get autoscaling instances list", response.AutoScalingInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.groups = async(req, res) => {
    try {
        const autoscalingClient = autoscalingClientIni(req.sub);
        const command = new DescribeAutoScalingGroupsCommand({});
        const response = await autoscalingClient.send(command);
        return res.send(successResponse("OK", "Success get autoscaling groups list", response.AutoScalingGroups));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showInstance = async(req, res) => {
    try {
        const autoscalingClient = autoscalingClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new DescribeAutoScalingInstancesCommand(params);
        const response = await autoscalingClient.send(command);
        return res.send(successResponse("OK", "Success get instance", response.AutoScalingInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showAutoScaling = async(req, res) => {
    try {
        const autoscalingClient = autoscalingClientIni(req.sub);
        const params = {
            AutoScalingGroupNames: [req.params.name]
        };
        const command = new DescribeAutoScalingGroupsCommand(params);
        const response = await autoscalingClient.send(command);
        return res.send(successResponse("OK", "Success get autoscaling", response.AutoScalingGroups));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.terminateInstance = async(req, res) => {
    try {
        const autoscalingClient = autoscalingClientIni(req.sub);
        const params = {
            InstanceId: req.params.id,
            ShouldDecrementDesiredCapacity: false
        };
        const command = new TerminateInstanceInAutoScalingGroupCommand(params);
        const response = await autoscalingClient.send(command);
        return res.send(successResponse("OK", "Success terminate instance", response.Activity));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};