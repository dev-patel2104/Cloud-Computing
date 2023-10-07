const { json } = require("express");
const AWS = require('aws-sdk');
const uuid = require('uuid');

const fileName = "first.txt";
const bucketName = 'a2-s3-bucket';

exports.storeData = async (req, res) => {
    try {
        const body = req.body;

        AWS.config.update({ region: 'us-east-1', credentials: new AWS.SharedIniFileCredentials() });
        const s3 = new AWS.S3();

        AWS.config.getCredentials(function (err) {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("Access key:", AWS.config.credentials.accessKeyId);
            }
        });

        const objectUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

        s3.putObject({
            Bucket: bucketName,
            Key: fileName,
            Body: body.data
        }, (putError, putSuccess) => {
            if (putError) {
                console.log(putError);
                return res.status(404).json();
            }
            console.log('Object added successfully:', putSuccess);
            return res.status(200).json({ s3uri: objectUrl });
        });
    }
    catch (error) {
        res.status(500).json();
    }
}

exports.appendData = async (req, res) => {
    try {
        const body = req.body;
        AWS.config.update({ region: 'us-east-1', credentials: new AWS.SharedIniFileCredentials() });
        const s3 = new AWS.S3();

        AWS.config.getCredentials((err) => {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("Access key:", AWS.config.credentials.accessKeyId);
            }
        });

        s3.getObject({
            Bucket: bucketName,
            Key: fileName
        }, (err, data) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                const updatedVal = data.Body.toString() + body.data;

                s3.putObject({
                    Bucket: bucketName,
                    Key: fileName,
                    Body: updatedVal
                }, (err, putSuccess) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    console.log('Object added successfully:', putSuccess);
                    return res.status(200).json();
                })
            }
        })

    }
    catch (error) {
        res.status(500).json();
    }
}

exports.searchData = async (req, res) => {
    try {
        const body = req.body;
        AWS.config.update({ region: 'us-east-1', credentials: new AWS.SharedIniFileCredentials() });
        const s3 = new AWS.S3();

        AWS.config.getCredentials((err) => {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("Access key:", AWS.config.credentials.accessKeyId);
            }
        });

        s3.getObject({
            Bucket: bucketName,
            Key: fileName
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                const val = data.Body.toString();
                const lines = val.split('\n');
                const regex = new RegExp(body.regex);
                console.log(regex);
                let isMatch = false;
                let currentLine;
                for (let i = 0; i < lines.length; i++) {
                    currentLine = lines[i];
                    isMatch = regex.test(currentLine);
                    if (isMatch) {
                        return res.status(200).json({ found: isMatch, result: currentLine });
                    }
                }

                return res.status(200).json({ found: isMatch, result: "" });
            }
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json();
    }
}

exports.deleteFile = async (req, res) => {
    try {
        const body = req.body;

        AWS.config.update({ region: 'us-east-1', credentials: new AWS.SharedIniFileCredentials() });
        const s3 = new AWS.S3();

        AWS.config.getCredentials(function (err) {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("Access key:", AWS.config.credentials.accessKeyId);
            }
        });

        const uri = body.s3uri;
        const parts = uri.split('/');
        const bucketName = parts[2].split('.')[0];
        const fileName = parts[3];
        console.log(fileName);

        s3.deleteObject({
            Bucket: bucketName,
            Key: fileName,
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json();
            }
            else {
                console.log(data);
                return res.status(200).json();
            }
        });

        return res.status(200).json();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json();
    }
}