const { DescribeDBInstancesCommand, StartDBInstanceCommand, StopDBInstanceCommand, RebootDBInstanceCommand,
        DescribeEventsCommand} = require("@aws-sdk/client-rds");
const { rdsClientIni } = require("../libs/rdsClient");
const { successResponse, errorResponse } = require("../utils/Response");

exports.index = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const command = new DescribeDBInstancesCommand({});
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get list of database instances", response.DBInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.show = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBInstanceIdentifier: req.params.dbInstanceId
        };
        const command = new DescribeDBInstancesCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database instance", response.DBInstances));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.startDbInstance = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBInstanceIdentifier: req.params.dbInstanceId
        };
        const command = new StartDBInstanceCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success start database instance", response.DBInstance));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.rebootDbInstance = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBInstanceIdentifier: req.params.dbInstanceId
        };
        const command = new RebootDBInstanceCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success reboot database instance", response.DBInstance));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.stopDbInstance = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBInstanceIdentifier: req.params.dbInstanceId
        };
        const command = new StopDBInstanceCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success stop database instance", response.DBInstance));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showEvents = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            SourceIdentifier: req.params.dbInstanceId,
            SourceType: 'db-instance'
        };
        const command = new DescribeEventsCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database events", response.Events));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};