import { AddressInput } from '@src/inputs-types/AddressInput';
import { User } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((_returns) => User)
  async getUser(@Arg('id') id: string): Promise<User> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { pk: `UserId-${id}`, sk: `UserMeta-${id}` },
      })
      .promise();
    return result.Item as User;
  }

  @Mutation((_returns) => User)
  async updateNickname(
    @Arg('id') id: string,
    @Arg('nickname', { nullable: true }) nickname: string,
  ): Promise<User> {
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { pk: `UserId-${id}`, sk: `UserMeta-${id}` },
        UpdateExpression: 'set nickname = :nickname',
        ExpressionAttributeValues: {
          ':nickname': nickname,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return result.Attributes as User;
  }

  @Mutation((_returns) => User)
  async updateAddress(
    @Arg('id') id: string,
    @Arg('address')
    { addressLine1, addressLine2, zipCode, state, city }: AddressInput,
  ): Promise<User> {
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { pk: `UserId-${id}`, sk: `UserMeta-${id}` },
        UpdateExpression: 'SET address = :address',
        ExpressionAttributeValues: {
          ':address': {
            addressLine1,
            addressLine2,
            zipCode,
            state,
            city,
          },
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return result.Attributes as User;
  }

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
