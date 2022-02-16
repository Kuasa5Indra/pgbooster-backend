const { param } = require("express-validator");

exports.databaseShowValidator = [
    param('dbInstanceId').optional({ nullable: true }).matches(/[a-zA-Z\d]-+/)
];

exports.databaseOperationValidator = [
    param('dbInstanceId').notEmpty().matches(/[a-zA-Z\d]-+/)
];