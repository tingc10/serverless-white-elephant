import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: 'us-east-2',
};

if (process.env.STAGE_ENV === 'dev') {
  serviceConfigOptions.endpoint = 'http://localhost:8000';
}

export const awsClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
