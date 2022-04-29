const { param } = require("express-validator");

exports.databaseShowValidator = [
    param('dbInstanceId').optional({ nullable: true })
];

exports.databaseOperationValidator = [
    param('dbInstanceId').notEmpty()
];

exports.databaseClusterShowValidator = [
    param('dbClusterId').optional({ nullable: true })
];

exports.databaseClusterOperationValidator = [
    param('dbClusterId').notEmpty()
];

exports.databaseSnapshotOperationValidator = [
    param('dbSnapshot').notEmpty()
];