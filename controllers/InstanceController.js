const { DescribeInstancesCommand, StartInstancesCommand, TerminateInstancesCommand,
        StopInstancesCommand, RebootInstancesCommand } = require("@aws-sdk/client-ec2");
const { ec2ClientIni } = require("../libs/ec2Client");
const { successResponse, errorResponse } = require("../utils/Response");

exports.index = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const command = new DescribeInstancesCommand({});
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success get instances list", response.Reservations));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.show = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new DescribeInstancesCommand(params);
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success show instances", response.Reservations));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.startInstance = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new StartInstancesCommand(params);
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success start instance", response.StartingInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.stopInstance = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new StopInstancesCommand(params);
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success stop instance", response.StoppingInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.rebootInstance = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new RebootInstancesCommand(params);
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success reboot instance", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.terminateInstance = async(req, res) => {
    try {
        const ec2Client = ec2ClientIni(req.sub);
        const params = {
            InstanceIds: [req.params.id]
        };
        const command = new TerminateInstancesCommand(params);
        const response = await ec2Client.send(command);
        return res.send(successResponse("OK", "Success terminate instance", response.TerminatingInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};