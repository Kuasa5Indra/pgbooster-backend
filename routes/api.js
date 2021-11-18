// const BucketController  = require("../controllers/BucketController");
const StackController = require("../controllers/StackController");
const InstanceController = require("../controllers/InstanceController");
const AutoScalingController = require("../controllers/AutoScalingController");
const { stackFormValidator, stackQueryValidator } = require("../validator/StackValidation");
const { validation } = require('../middleware/ValidationResult');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({'message' : 'Hello World'});
});

// For Upload Test Purposes
// router.post('/buckets/upload', BucketController.store);
router.get('/stacks', StackController.index);
router.get('/stacks/describe', stackQueryValidator, validation, StackController.show);
router.post('/stacks', stackFormValidator, validation, StackController.store);
router.post('/stacks/update', stackFormValidator, validation, StackController.update);
router.delete('/stacks', stackQueryValidator, validation, StackController.destroy);
router.get('/instances', InstanceController.index);
router.get('/instances/:id', InstanceController.show);
router.get('/instances/:id/start', InstanceController.startInstance);
router.get('/instances/:id/stop', InstanceController.stopInstance);
router.get('/instances/:id/reboot', InstanceController.rebootInstance);
router.get('/instances/:id/terminate', InstanceController.terminateInstance);
router.get('/autoscaling/instances', AutoScalingController.instances);
router.get('/autoscaling/instances/:id', AutoScalingController.showInstance);
router.get('/autoscaling/groups', AutoScalingController.groups);
router.get('/autoscaling/groups/:name', AutoScalingController.showAutoScaling);

module.exports = router;