import { User } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import * as AWS from 'aws-sdk';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((_returns) => User)
  async getUser(@Arg('firstName') id: string): Promise<User> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { pk: `UserId-${id}` },
      })
      .promise();
    return {
      id: result.Item.userId,
      nickname: result.Item.nickname,
    };
  }

  // @Mutation((_returns) => String)
  // async changeNickname(
  //   @Arg('id') id: string,
  //   @Arg('nickname', { nullable: true }) nickname: string,
  // ): Promise<string> {
  //   await this.dynamoDb
  //     .update({
  //       TableName: process.env.DYNAMODB_TABLE,
  //       Key: { pk: `UserId-${id}`, sk: `UserMeta-${id}` },
  //       UpdateExpression: 'SET nickname = :nickname',
  //       ExpressionAttributeValues: {
  //         ':nickname': nickname,
  //       },
  //     })
  //     .promise();
  //   return nickname;
  // }

  @Mutation((_returns) => String)
  async addUser(@Arg('id') id: string): Promise<string> {
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          pk: `UserId-${id}`,
          sk: `UserMeta-${id}`,
        },
      })
      .promise();
    return id;
  }
}
