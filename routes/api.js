const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { CreateStackCommand } = require("@aws-sdk/client-cloudformation");
const { s3Client } = require("../libs/s3Client");
const { cloudformationClient } = require("../libs/cloudformationClient");

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.json({'message' : 'Hello World'});
});

// For Upload Test Purposes
router.post('/s3/upload', async (req, res) => {
    try {
        if(!req.files){
            return res.send({"message": "File not exists"});
        }
        const file = req.files.codeFile;
        tempFile = process.cwd() + '/tmp/' + file.name;
        await file.mv(tempFile);
        const fileStream = fs.createReadStream(tempFile);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: path.basename(tempFile),
            Body: fileStream,
        };
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        return res.send({"message": "Upload berhasil", "data": data});
    } catch (error) {
        console.log("Error", error);
    }
});

router.post('/cloudformation/stack', async (req, res) => {
    try {
        if(!req.files){
            return res.send({"message": "File not exists"});
        }
        const file = req.files.codeFile;
        const params = {
            StackName: req.body.name,
            TemplateBody: fs.readFileSync(file.tempFilePath, 'utf8')
            // TemplateURL: req.body.url
        };
        const command = new CreateStackCommand(params);
        const response = await cloudformationClient.send(command);
        return res.send({"message": "Stack akan segera dibuat", "data": response});
    } catch (error) {
        console.log("Error", error);
    }
});

module.exports = router;