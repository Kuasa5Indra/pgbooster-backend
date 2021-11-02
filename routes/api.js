const BucketController  = require("../controllers/BucketController");
const StackController = require("../controllers/StackController");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({'message' : 'Hello World'});
});

// For Upload Test Purposes
router.post('/buckets/upload', BucketController.store);
router.get('/stacks', StackController.index);
router.get('/stacks/describe', StackController.show);
router.post('/stacks', StackController.store);
router.post('/stacks/update', StackController.update);
router.delete('/stacks', StackController.destroy);

module.exports = router;