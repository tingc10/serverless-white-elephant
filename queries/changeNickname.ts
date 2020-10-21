import { dynamoDb } from './utils';

export const changeNickname = async (firstName: string, nickname: string): Promise<string> => {
  await dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
    UpdateExpression: 'SET nickname = :nickname',
    ExpressionAttributeValues: {
      ':nickname': nickname,
    },
  }).promise();
  return nickname;
};
