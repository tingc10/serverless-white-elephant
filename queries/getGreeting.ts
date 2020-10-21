// import { dynamoDb } from './utils';

import { IFieldResolver } from 'apollo-server-lambda';

export const getGreeting: IFieldResolver<void, Context> = async (_, { firstName }, { dynamoDb }) => {
  const result = await dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
  }).promise();
  const name = result.Item.nickname ?? result.Item;
  return `Hello, ${name}`;
};
