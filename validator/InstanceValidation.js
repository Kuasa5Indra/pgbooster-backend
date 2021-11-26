const { param } = require("express-validator");

exports.instanceShowValidator = [
    param('id').optional({ nullable: true }).matches(/[a-zA-Z\d]-+/)
];

exports.instanceOperationValidator = [
    param('id').notEmpty().matches(/[a-zA-Z\d]-+/)
];