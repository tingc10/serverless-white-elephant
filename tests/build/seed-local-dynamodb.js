"use strict";
exports.__esModule = true;
var AWS = require("aws-sdk");
var serviceConfigOptions = {
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
};
var dynamodb = new AWS.DynamoDB(serviceConfigOptions);
var params = {
    TableName: 'white-elephant-dev',
    KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};
dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});
