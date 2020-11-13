import { Gift } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import {
  getRoomGiftsKeys,
  getRoomKeys,
  getRoomUsersKeys,
} from '@src/utils/facet-keys';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';

@InputType()
class GiftInput implements Partial<Gift> {
  @Field()
  name: string;

  @Field({ nullable: true })
  productUrl: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  description: string;
}

@Resolver()
export class GiftResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Mutation((_returns) => Gift)
  async addGiftAndUserToRoom(
    @Arg('ownerId') ownerId: string,
    @Arg('roomCode') roomCode: string,
    @Arg('giftInfo') { productUrl, name, imageUrl, description }: GiftInput,
  ): Promise<Partial<Gift>> {
    // TODO: Add validation that room and owner exists
    const giftId = uuid();
    const gift = {
      giftId,
      productUrl,
      name,
      imageUrl,
      description,
      ownerId,
      roomCode,
    };
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomUsersKeys(roomCode, ownerId),
        UpdateExpression:
          'set roomCode = :roomCode, userId = :userId, giftId = :giftId, isRevealed = :isRevealed',
        ConditionExpression: 'attribute_not_exists(giftId)',
        ExpressionAttributeValues: {
          ':roomCode': roomCode,
          ':userId': ownerId,
          ':giftId': giftId,
          ':isRevealed': false,
        },
      })
      .promise();
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          ...getRoomGiftsKeys(roomCode, giftId),
          ...gift,
        },
      })
      .promise();
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
        UpdateExpression: 'set totalParticipants + :i',
        ExpressionAttributeValues: {
          ':i': '1',
        },
      })
      .promise();
    return gift;
  }

  @Mutation((_returns) => Gift)
  async takeGiftFromUnrevealed(
    @Arg('giftId') giftId: string,
    @Arg('userId') userId: string,
    @Arg('roomCode') roomCode: string,
  ): Promise<Partial<Gift>> {
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomGiftsKeys(roomCode, giftId),
        UpdateExpression:
          'set isRevealed = :isRevealed, recipientId = :recipientId',
        ConditionExpression:
          'isRevealed <> :isRevealed and attribute_not_exists(recipientId)',
        ExpressionAttributeValues: {
          ':isRevealed': true,
          ':recipientId': userId,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
        UpdateExpression: 'set turnIndex + :i',
        ConditionExpression: 'turnIndex < totalParticipants',
        ExpressionAttributeValues: {
          ':i': '1',
        },
      })
      .promise();
    return result.Attributes;
  }
}
