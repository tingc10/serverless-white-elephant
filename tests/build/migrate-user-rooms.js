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
    AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: 'UserRooms',
                Projection: {
                    ProjectionType: 'KEYS_ONLY'
                },
                KeySchema: [
                    { AttributeName: 'pk', KeyType: 'HASH' },
                    { AttributeName: 'sk', KeyType: 'RANGE' },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        },
    ]
};
dynamodb.updateTable(params, function (err, data) {
    if (err) {
        console.error('Unable to update table. Error JSON:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Table update complete. Table description JSON:', JSON.stringify(data, null, 2));
    }
});
