const CognitoController = require("../controllers/CognitoController");
const { verifyAccessToken } = require("../middleware/Authentication");
const { loginValidator, registerValidator, confirmRegisterValidator,
        forgotPasswordValidator, resetPasswordValidator, changePasswordValidator,
        newPasswordValidator, resendCodeValidator, refreshTokenValidator } = require("../validator/CognitoValidation");
const { validation } = require("../middleware/ValidationResult");

var express = require('express');
var router = express.Router();

router.post('/login', loginValidator, validation, CognitoController.signIn);
router.post('/register', registerValidator, validation, CognitoController.signUp);
router.post('/register/confirm', confirmRegisterValidator, validation, CognitoController.confirmSignUp);
router.post('/forgot-password', forgotPasswordValidator, validation, CognitoController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, validation, CognitoController.confirmForgotPassword);
router.post('/change-password', verifyAccessToken, changePasswordValidator, validation, CognitoController.changePassword);
router.post('/respond/new-password', newPasswordValidator, validation, CognitoController.newPasswordChallenge);
router.get('/user', verifyAccessToken, CognitoController.getUser);
router.get('/refresh-token', refreshTokenValidator, validation, CognitoController.refreshToken);
router.post('/resend-code', resendCodeValidator, validation, CognitoController.resendConfirmationCode);
router.get('/logout', verifyAccessToken, CognitoController.signOut);

module.exports = router;