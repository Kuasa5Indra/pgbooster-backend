// const BucketController  = require("../controllers/BucketController");
const StackController = require("../controllers/StackController");
const InstanceController = require("../controllers/InstanceController");
const AutoScalingController = require("../controllers/AutoScalingController");
const LoadBalancingController = require("../controllers/LoadBalancingController");
const CognitoController = require("../controllers/CognitoController");
const { stackFormValidator, stackQueryValidator } = require("../validator/StackValidation");
const { instanceShowValidator, instanceOperationValidator } = require("../validator/InstanceValidation");
const { validation } = require('../middleware/ValidationResult');
const { verifyAccessToken } = require("../middleware/Authentication");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({'message' : 'Hello World'});
});

// For Upload Test Purposes
// router.post('/buckets/upload', BucketController.store);
router.use(verifyAccessToken);
router.get('/stacks', StackController.index);
router.get('/stacks/describe/:name', stackQueryValidator, validation, StackController.show);
router.post('/stacks', stackFormValidator, validation, StackController.store);
router.post('/stacks/update', stackFormValidator, validation, StackController.update);
router.delete('/stacks/:name', stackQueryValidator, validation, StackController.destroy);
router.get('/stacks/update/:name', stackQueryValidator, validation, StackController.updateTerminationProtection);
router.get('/instances', InstanceController.index);
router.get('/instances/:id', instanceShowValidator, validation, InstanceController.show);
router.get('/instances/:id/start', instanceOperationValidator, validation, InstanceController.startInstance);
router.get('/instances/:id/stop', instanceOperationValidator, validation, InstanceController.stopInstance);
router.get('/instances/:id/reboot', instanceOperationValidator, validation, InstanceController.rebootInstance);
router.get('/instances/:id/terminate', instanceOperationValidator, validation, InstanceController.terminateInstance);
router.get('/autoscaling/instances', AutoScalingController.instances);
router.get('/autoscaling/instances/:id', instanceShowValidator, validation, AutoScalingController.showInstance);
router.delete('/autoscaling/instances/:id', instanceOperationValidator, validation, AutoScalingController.terminateInstance);
router.get('/autoscaling/groups', AutoScalingController.groups);
router.get('/autoscaling/groups/:name', AutoScalingController.showAutoScaling);
router.get('/loadbalancing', LoadBalancingController.loadbalancer);
router.get('/loadbalancing/groups', LoadBalancingController.groups);

module.exports = router;