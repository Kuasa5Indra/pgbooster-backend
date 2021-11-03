const BucketController  = require("../controllers/BucketController");
const StackController = require("../controllers/StackController");
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

module.exports = router;