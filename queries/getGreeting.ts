import { dynamoDb } from './utils';

export const getGreeting = async (firstName: string): Promise<string> => {
  const result = await dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
  }).promise();
  const name = result.Item.nickname ?? result.Item;
  return `Hello, ${name}`;
};
