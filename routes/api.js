// const BucketController  = require("../controllers/BucketController");
const StackController = require("../controllers/StackController");
const InstanceController = require("../controllers/InstanceController");
const AutoScalingController = require("../controllers/AutoScalingController");
const LoadBalancingController = require("../controllers/LoadBalancingController");
const RDSController = require("../controllers/RDSController");
const MetricsController = require("../controllers/MetricsController");
const { stackFormValidator, stackQueryValidator, stackTemplateValidator } = require("../validator/StackValidation");
const { instanceShowValidator, instanceOperationValidator } = require("../validator/InstanceValidation");
const { databaseShowValidator, databaseOperationValidator, databaseSnapshotOperationValidator,
    databaseClusterShowValidator, databaseClusterOperationValidator, } = require("../validator/RDSValidation");
const { validation } = require('../middleware/ValidationResult');
const { verifyAccessToken } = require("../middleware/Authentication");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({'message' : 'Hello World'});
});

// For Upload Test Purposes
// router.post('/buckets/upload', BucketController.store);
// router.get('/metrics/test', MetricsController.metricsTest);
router.use(verifyAccessToken);
router.get('/stacks', StackController.index);
router.get('/stacks/describe/:name', stackQueryValidator, validation, StackController.show);
router.get('/stacks/describe/:name/events', stackQueryValidator, validation, StackController.showEvents);
router.get('/stacks/describe/:name/resources', stackQueryValidator, validation, StackController.showResources);
router.get('/stacks/describe/:name/template', stackQueryValidator, validation, StackController.showTemplate);
router.post('/stacks', stackFormValidator, validation, StackController.store);
router.post('/stacks/validate', stackTemplateValidator, validation, StackController.validateTemplate);
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
router.get('/databases', RDSController.index);
router.get('/databases/:dbInstanceId', databaseShowValidator, validation, RDSController.show);
router.get('/databases/:dbInstanceId/start', databaseOperationValidator, validation, RDSController.startDbInstance);
router.get('/databases/:dbInstanceId/stop', databaseOperationValidator, validation, RDSController.stopDbInstance);
router.get('/databases/:dbInstanceId/reboot', databaseOperationValidator, validation, RDSController.rebootDbInstance);
router.get('/databases/:dbInstanceId/failover', databaseOperationValidator, validation, RDSController.failoverDbInstance);
router.get('/databases/:dbInstanceId/events', databaseOperationValidator, validation, RDSController.showEvents);
router.get('/database/snapshots', RDSController.snapshots);
router.delete('/database/snapshots/:dbSnapshot', databaseSnapshotOperationValidator, validation, RDSController.deleteSnapshot);
router.get('/database-clusters', RDSController.indexCluster);
router.get('/database-clusters/:dbClusterId', databaseClusterShowValidator, validation, RDSController.showCluster);
router.get('/database-clusters/:dbClusterId/start', databaseClusterOperationValidator, validation, RDSController.startDbCluster);
router.get('/database-clusters/:dbClusterId/stop', databaseClusterOperationValidator, validation, RDSController.stopDbCluster);
router.get('/database-clusters/:dbClusterId/reboot', databaseClusterOperationValidator, validation, RDSController.rebootDbCluster);
router.get('/database-clusters/:dbClusterId/failover', databaseClusterOperationValidator, validation, RDSController.failoverDbCluster);
router.get('/database-clusters/:dbClusterId/events', databaseClusterOperationValidator, validation, RDSController.showClusterEvents);
router.get('/database-cluster/snapshots', RDSController.clusterSnapshots);
router.delete('/database-cluster/snapshots/:dbSnapshot', databaseSnapshotOperationValidator, validation, RDSController.deleteClusterSnapshot);
router.get('/metrics/db', MetricsController.metricsDb);

module.exports = router;
