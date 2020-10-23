import * as AWS from 'aws-sdk';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

  @Query((_returns) => String)
  async getGreeting(@Arg('firstName') firstName: string): Promise<string> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName },
      })
      .promise();
    const name = result.Item.nickname ?? result.Item;
    return `Hello, ${name}`;
  }

  @Mutation((_returns) => String)
  async changeNickname(
    @Arg('firstName') firstName: string,
    @Arg('nickname', { nullable: true }) nickname: string,
  ): Promise<string> {
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName },
        UpdateExpression: 'SET nickname = :nickname',
        ExpressionAttributeValues: {
          ':nickname': nickname,
        },
      })
      .promise();
    return nickname;
  }
}
