const { s3Client } = require("../libs/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { successResponse, errorResponse } = require("../utils/Response");

var path = require('path');
var fs = require('fs');

exports.store = async (req, res) => {
    try {
        if(!req.files){
            return res.status(400).send(errorResponse("Bad Request", "File not exists"));
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
        return res.send(successResponse("OK", "Upload Success", data));
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse("Internal Server Error", "There is something wrong on server"));
    }
};
