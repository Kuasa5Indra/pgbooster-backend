const { CreateStackCommand, ListStacksCommand, UpdateStackCommand,
    DescribeStacksCommand, DeleteStackCommand } = require("@aws-sdk/client-cloudformation");
const { cloudformationClient } = require("../libs/cloudformationClient");
const { successResponse, errorResponse } = require("../utils/Response");
const { stackStatusFilter } = require("../utils/StackStatusFilter");

var fs = require('fs');

exports.index = async (req, res) => {
    try {
        const params = {
            StackStatusFilter: stackStatusFilter
        };
        const command = new ListStacksCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success get list of stacks", response.StackSummaries));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};

exports.store = async (req, res) => {
    try {
        const file = req.files.codeFile;
        const params = {
            StackName: req.body.name,
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8')
            // TemplateURL: req.body.url
        };
        const command = new CreateStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.status(202).send(successResponse("Accepted", "Stack will be created soon", response.StackId));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};

exports.show = async (req, res) => {
    try {
        const params = {
            StackName: req.query.name
        };
        const command = new DescribeStacksCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success describe your stack", response.Stacks));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};

exports.update = async (req, res) => {
    try {
        const file = req.files.codeFile;
        const params = {
            StackName: req.body.name,
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8')
            // TemplateURL: req.body.url
        };
        const command = new UpdateStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.status(202).send(successResponse("Accepted", "Stack will be updated soon", response.StackId));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};

exports.destroy = async (req, res) => {
    try {
        const params = {
            StackName: req.query.name
        };
        const command = new DeleteStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success delete your stack"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};