const { body, header, param } = require("express-validator");

exports.loginValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8")
];

exports.registerValidator = [
    body('name').notEmpty().withMessage("Name is required").isString(),
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8"),
    body('phone_number').notEmpty().withMessage("Phone Number is required").isMobilePhone(),
    body('gender').notEmpty().withMessage("Gender is required").isIn(['male', 'female']),
    body('birthdate').notEmpty().withMessage("Birthdate is required").isDate()
];

exports.confirmRegisterValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('code').notEmpty().withMessage("Code is required for confirmation").isNumeric().withMessage("Code must be numeric")
];

exports.forgotPasswordValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
];

exports.resetPasswordValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8"),
    body('code').notEmpty().withMessage("Code is required for confirmation").isNumeric().withMessage("Code must be numeric")

];

exports.changePasswordValidator = [
    body('old_password').notEmpty().withMessage("Old Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8"),
    body('new_password').notEmpty().withMessage("New Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8")
        // .custom((value, {req}) => {
        //     if(value == req.body.old_password){
        //         throw new Error('New password must be different than old password');
        //     }
        //     return true;
        // }),
];

exports.newPasswordValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('new_password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Minimum length of password must be 8"),
    header('session').notEmpty().withMessage("Session is required")
];

exports.resendCodeValidator = [
    body('email').notEmpty().withMessage("Email is required").isEmail(),
];

exports.refreshTokenValidator = [
    header('refresh_token').notEmpty().withMessage("Refresh token is required to get new access token")
];

exports.adminCreateUser = [
    body('name').notEmpty().withMessage("Name is required").isString(),
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('phone_number').notEmpty().withMessage("Phone Number is required").isMobilePhone(),
    body('gender').notEmpty().withMessage("Gender is required").isIn(['male', 'female']),
    body('birthdate').notEmpty().withMessage("Birthdate is required").isDate()
]

exports.adminUpdateUser = [
    body('name').notEmpty().withMessage("Name is required").isString(),
    body('email').notEmpty().withMessage("Email is required").isEmail(),
    body('username').notEmpty().withMessage("Username is required as the username is your current email").isEmail(),
    body('phone_number').notEmpty().withMessage("Phone Number is required").isMobilePhone(),
    body('gender').notEmpty().withMessage("Gender is required").isIn(['male', 'female']),
    body('birthdate').notEmpty().withMessage("Birthdate is required").isDate()
]

exports.setCredentialsValidator = [
    body('config').custom((value, { req }) => {
        if (!req.files) {
            throw new Error("File is required");
        }
        const { config } = req.files;
        if (config.name != 'config') {
            throw new Error("File name must be config without file extension");
        }
        return true;
    }),
    body('credentials').custom((value, { req }) => {
        if (!req.files) {
            throw new Error("File is required");
        }
        const { credentials } = req.files;
        if (credentials.name != 'credentials') {
            throw new Error("File name must be credentials without file extension");
        } 

        return true;
    }),
]