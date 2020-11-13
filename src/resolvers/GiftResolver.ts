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
        UpdateExpression: 'set turnIndex + :i, stealsInRound = :resetSteals',
        ConditionExpression: 'turnIndex < totalParticipants',
        ExpressionAttributeValues: {
          ':i': '1',
          ':resetSteals': 0,
        },
      })
      .promise();
    return result.Attributes;
  }

  @Mutation((_returns) => Gift)
  async stealGiftFromUser(
    @Arg('giftId') giftId: string,
    @Arg('userId') userId: string,
    @Arg('roomCode') roomCode: string,
    @Arg('turnIndex') turnIndex: number,
  ): Promise<Partial<Gift>> {
    const room = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
      })
      .promise();
    if (room.Item.stealsInRound === 3) {
      throw new Error('Too many steals this turn, pick a new gift from pile');
    }
    const result = await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomGiftsKeys(roomCode, giftId),
        UpdateExpression:
          'set recipientId = :recipientId, lastRoundStolen = :lastRoundStolen',
        ConditionExpression:
          // Can only steal if someone is holding on the gift and
          // it has never been stolen or the person stealing was not the last to be stolen
          'attribute_exists(recipientId) and lastRoundStolen <> :lastRoundStolen',
        ExpressionAttributeValues: {
          ':recipientId': userId,
          ':lastRoundStolen': turnIndex,
        },
        ReturnValues: 'UPDATED_OLD',
      })
      .promise();
    const previousRecipient = result.Attributes.recipientId;
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomUsersKeys(roomCode, previousRecipient),
        UpdateExpression:
          'set userStolenFrom = list_append(if_not_exists(userStolenForm, :emptyList), :userId)',
        ExpressionAttributeValues: {
          ':emptyList': [],
          ':userId': userId,
        },
      })
      .promise();
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
        UpdateExpression:
          'set lastRobbedUser = :lastRobbedUser, stealsInRound = if_not_exists(stealsInRound, :initStealCount) + :i',
        ExpressionAttributeValues: {
          ':lastRobbedUser': previousRecipient,
          ':initStealCount': 0,
          ':i': 1,
        },
      })
      .promise();
    return {
      giftId,
    };
  }
}
