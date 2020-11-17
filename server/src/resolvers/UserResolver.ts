import { AddressInput } from '@src/inputs-types/AddressInput';
import { Room, User } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import { getUserKeys } from '@src/utils/facet-keys';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((_returns) => User)
  async getUser(@Arg('id') id: string): Promise<Partial<User>> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getUserKeys(id),
      })
      .promise();
    return result.Item;
  }

  @Query((_returns) => [Room])
  async getUserRooms(@Arg('userId') userId: string): Promise<Partial<Room>[]> {
    const result = await this.dynamoDb
      .query({
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: process.env.USER_ROOMS_GSI,
        KeyConditionExpression: 'userId = :userId',
        ProjectionExpression: 'roomCode, pk',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();
    return result.Items;
  }

  @Mutation((_returns) => User)
  async updateNickname(
    @Arg('id') id: string,
    @Arg('nickname', { nullable: true }) nickname: string,
  ): Promise<Partial<User>> {
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getUserKeys(id),
        UpdateExpression: 'set nickname = :nickname',
        ExpressionAttributeValues: {
          ':nickname': nickname,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return result.Attributes;
  }

  @Mutation((_returns) => User)
  async updateAddress(
    @Arg('id') id: string,
    @Arg('address')
    { addressLine1, addressLine2, zipCode, state, city }: AddressInput,
  ): Promise<Partial<User>> {
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getUserKeys(id),
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
    return result.Attributes;
  }

  @Mutation((_returns) => String)
  async addUser(@Arg('id') id: string): Promise<string> {
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: getUserKeys(id),
      })
      .promise();
    return id;
  }
}
