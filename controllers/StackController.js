const { CreateStackCommand, ListStacksCommand, UpdateStackCommand, DescribeStackEventsCommand, GetTemplateCommand, ValidateTemplateCommand,
    DescribeStacksCommand, DeleteStackCommand, UpdateTerminationProtectionCommand, ListStackResourcesCommand } = require("@aws-sdk/client-cloudformation");
const { cloudformationClientIni } = require("../libs/cloudformationClient");
const { successResponse, errorResponse } = require("../utils/Response");
const { stackStatusFilter } = require("../utils/StackStatusFilter");

var fs = require('fs');

exports.index = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackStatusFilter: stackStatusFilter
        };
        const command = new ListStacksCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success get list of stacks", response.StackSummaries));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.store = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const file = req.files.codeFile;
        const params = {
            StackName: req.body.name,
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8'),
            DisableRollback: req.body.disable_rollback,
            EnableTerminationProtection: req.body.protect
            // TemplateURL: req.body.url
        };
        const command = new CreateStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.status(202).send(successResponse("Accepted", "Stack will be created soon", response.StackId));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.validateTemplate = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const file = req.files.codeFile;
        const params = {
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8'),
        };
        const command = new ValidateTemplateCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("Accepted", "Validation successful", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.show = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name
        };
        const command = new DescribeStacksCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success describe your stack", response.Stacks));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showEvents = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name,
            NextToken: req.headers["next-token"]
        };
        const command = new DescribeStackEventsCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success describe your stack events", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showResources = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name
        };
        const command = new ListStackResourcesCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success describe your stack resources", response.StackResourceSummaries));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showTemplate = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name
        };
        const command = new GetTemplateCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success describe your stack template", response.TemplateBody));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.update = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const file = req.files.codeFile;
        const params = {
            StackName: req.body.name,
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8'),
            DisableRollback: req.body.disable_rollback
            // TemplateURL: req.body.url
        };
        const command = new UpdateStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.status(202).send(successResponse("Accepted", "Stack will be updated soon", response.StackId));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.destroy = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name
        };
        const command = new DeleteStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.status(202).send(successResponse("Accepted", "Stack will be deleted soon"));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.updateTerminationProtection = async (req, res) => {
    try {
        const cloudformationClient = cloudformationClientIni(req.sub);
        const params = {
            StackName: req.params.name,
            EnableTerminationProtection: req.query.protect
        };
        const command = new UpdateTerminationProtectionCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send(successResponse("OK", "Success update termination protection", response.StackId));
    } catch (error) {
        console.error(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};