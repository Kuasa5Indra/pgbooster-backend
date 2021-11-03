const { body, query } = require("express-validator");

exports.stackFormValidator = [
    body('name').notEmpty().withMessage('Stack Name is required'),
    body('codeFile').custom((value, { req }) => {
        allowedMimetypes = ['application/json', 'text/yaml'];
        if(!req.files){
            throw new Error("File resource is required");
        } else if (!allowedMimetypes.includes(req.files.codeFile.mimetype)){
            throw new Error("File resource must be json or yaml");
        }

        return true;
    })
];

exports.stackQueryValidator = [
    query('name').notEmpty().withMessage('Stack Name is required')
];