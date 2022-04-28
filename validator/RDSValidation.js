const { param } = require("express-validator");

exports.databaseShowValidator = [
    param('dbInstanceId').optional({ nullable: true })
];

exports.databaseOperationValidator = [
    param('dbInstanceId').notEmpty()
];

exports.databaseSnapshotOperationValidator = [
    param('dbSnapshot').notEmpty()
];