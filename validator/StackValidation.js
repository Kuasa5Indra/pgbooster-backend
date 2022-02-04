const { body, param, query } = require("express-validator");

exports.stackFormValidator = [
    body('name').notEmpty().withMessage('Stack Name is required')
    .matches(/[a-zA-Z\d]-+/).withMessage('The stack name can include letters (A-Z and a-z), numbers (0-9), and hyphens (-).'),
    body('codeFile').custom((value, { req }) => {
        filename = req.files.codeFile.name;
        allowedFileExtension = ['.json', '.yaml', '.yml'];
        if (!req.files) {
            throw new Error("File resource is required");
        } else if (!allowedFileExtension.some(ext => filename.includes(ext))) {
            throw new Error("File resource must be json or yaml");
        }

        return true;
    }),
    body('disable_rollback').isBoolean().withMessage('Set rollback is either true or false'),
    body('protect').optional({ nullable: true }).isBoolean().withMessage('Set protection is either true or false')
];

exports.stackTemplateValidator = [
    body('codeFile').custom((value, { req }) => {
        filename = req.files.codeFile.name;
        allowedFileExtension = ['.json', '.yaml', '.yml'];
        if (!req.files) {
            throw new Error("File resource is required");
        } else if (!allowedFileExtension.some(ext => filename.includes(ext))) {
            throw new Error("File resource must be json or yaml");
        }

        return true;
    }),
];

exports.stackQueryValidator = [
    param('name').notEmpty().withMessage('Stack Name is required')
    .matches(/[a-zA-Z\d]-+/).withMessage('The stack name can include letters (A-Z and a-z), numbers (0-9), and hyphens (-).'),
    query('protect').optional({ nullable: true }).isBoolean().withMessage('Set protection is either true or false')
];