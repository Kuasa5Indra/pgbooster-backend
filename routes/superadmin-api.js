const CognitoController = require("../controllers/CognitoController");
const { verifyAdminAccessToken } = require("../middleware/Authentication");
const SuperAdminController = require("../controllers/SuperAdminController");
const { adminCreateUser, adminUpdateUser } = require("../validator/CognitoValidation");

const { validation } = require("../middleware/ValidationResult");

var express = require('express');
var router = express.Router();

router.post('/login', SuperAdminController.login);
router.get('/users', verifyAdminAccessToken, CognitoController.listUsers);
router.post('/users', verifyAdminAccessToken, adminCreateUser, validation, CognitoController.adminCreateUser);
router.get('/users/:username', verifyAdminAccessToken, CognitoController.adminGetUser);
router.put('/users/update', verifyAdminAccessToken, adminUpdateUser, validation, CognitoController.adminUpdateUserAttributes);
router.delete('/users/:username', verifyAdminAccessToken, CognitoController.adminDeleteUser);
router.get('/users/:username/enable', verifyAdminAccessToken, CognitoController.adminEnableUser);
router.get('/users/:username/disable', verifyAdminAccessToken, CognitoController.adminDisableUser);

module.exports = router;