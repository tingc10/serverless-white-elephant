import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

const serviceConfigOptions: ServiceConfigurationOptions = {};

if (process.env.IS_OFFLINE) {
  serviceConfigOptions.endpoint = 'http://localhost:8000';
}

export const awsClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
