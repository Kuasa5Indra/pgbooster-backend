const { DescribeDBInstancesCommand, StartDBInstanceCommand, StopDBInstanceCommand, RebootDBInstanceCommand,
        DescribeEventsCommand, DescribeDBSnapshotsCommand, DeleteDBSnapshotCommand,
        DescribeDBClusterSnapshotsCommand, DeleteDBClusterSnapshotCommand, DescribeDBClustersCommand,
        StartDBClusterCommand, StopDBClusterCommand, RebootDBClusterCommand, FailoverDBClusterCommand } = require("@aws-sdk/client-rds");
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

exports.failoverDbInstance = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBInstanceIdentifier: req.params.dbInstanceId,
            ForceFailover: true
        };
        const command = new RebootDBInstanceCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success failover database instance", response.DBInstance));
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

exports.indexCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const command = new DescribeDBClustersCommand({});
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get list of database clusters", response.DBClusters));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.showCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterIdentifier: req.params.dbClusterId
        };
        const command = new DescribeDBClustersCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database cluster", response.DBClusters));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.startDbCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterIdentifier: req.params.dbClusterId
        };
        const command = new StartDBClusterCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success start database cluster", response.DBCluster));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.rebootDbCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterIdentifier: req.params.dbClusterId
        };
        const command = new RebootDBClusterCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success reboot database cluster", response.DBCluster));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.failoverDbCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterIdentifier: req.params.dbClusterId
        };
        const command = new FailoverDBClusterCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success failover database cluster", response.DBCluster));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.stopDbCluster = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterIdentifier: req.params.dbClusterId
        };
        const command = new StopDBClusterCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success stop database cluster", response.DBCluster));
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

exports.showClusterEvents = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            SourceIdentifier: req.params.dbClusterId,
            SourceType: 'db-cluster'
        };
        const command = new DescribeEventsCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database cluster events", response.Events));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.snapshots = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const command = new DescribeDBSnapshotsCommand({});
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database snapshots", response.DBSnapshots));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.deleteSnapshot = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBSnapshotIdentifier: req.params.dbSnapshot
        };
        const command = new DeleteDBSnapshotCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success delete database snapshot", response.DBSnapshot));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.clusterSnapshots = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const command = new DescribeDBClusterSnapshotsCommand({});
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success get database cluster snapshots", response.DBClusterSnapshots));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};

exports.deleteClusterSnapshot = async (req, res) => {
    try {
        const rdsClient = rdsClientIni(req.sub);
        const params = {
            DBClusterSnapshotIdentifier: req.params.dbSnapshot
        };
        const command = new DeleteDBClusterSnapshotCommand(params);
        const response = await rdsClient.send(command);
        return res.send(successResponse("OK", "Success delete database cluster snapshot", response.DBClusterSnapshot));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
};