const { body, query } = require("express-validator");

exports.stackFormValidator = [
    body('name').notEmpty().withMessage('Stack Name is required'),
    body('codeFile').custom((value, { req }) => {
        filename = req.files.codeFile.name;
        allowedFileExtension = ['.json', '.yaml', '.yml'];
        if(!req.files){
            throw new Error("File resource is required");
        } else if (!allowedFileExtension.some(ext => filename.includes(ext))){
            throw new Error("File resource must be json or yaml");
        }

        return true;
    })
];

exports.stackQueryValidator = [
    query('name').notEmpty().withMessage('Stack Name is required')
];