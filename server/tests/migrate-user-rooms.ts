import * as AWS from 'aws-sdk';
import { UpdateTableInput } from 'aws-sdk/clients/dynamodb';

const serviceConfigOptions = {
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
};

const dynamodb = new AWS.DynamoDB(serviceConfigOptions);

const params: UpdateTableInput = {
  TableName: 'white-elephant-dev',
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'roomCode', AttributeType: 'S' },
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: 'UserRooms',
        Projection: {
          ProjectionType: 'KEYS_ONLY',
        },
        KeySchema: [
          { AttributeName: 'userId', KeyType: 'HASH' },
          { AttributeName: 'roomCode', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  ],
};

dynamodb.updateTable(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to update table. Error JSON:',
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log(
      'Table update complete. Table description JSON:',
      JSON.stringify(data, null, 2),
    );
  }
});
