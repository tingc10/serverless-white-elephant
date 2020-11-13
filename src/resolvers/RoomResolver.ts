import { Gift, Room, User } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { customAlphabet } from 'nanoid';
import {
  getRoomGiftsKeys,
  getRoomKeys,
  getRoomUsersKeys,
} from '@src/utils/facet-keys';
import { shuffle } from '@src/utils/shuffle';

const filterGift = (gift: Gift): Partial<Gift> => {
  if (!gift.isRevealed) {
    return {
      giftId: gift.giftId,
      stolenFrom: gift.stolenFrom,
      roomCode: gift.roomCode,
      recipientId: gift.recipientId,
      isRevealed: gift.isRevealed,
    };
  }
  return gift;
};

@Resolver()
export class RoomResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Mutation((_returns) => Room)
  async createRoom(
    @Arg('hostId') hostId: string,
    @Arg('roomName') roomName: string,
    @Arg('gameOptions', () => [String], { nullable: true })
    gameOptions: string[] = [''],
  ): Promise<Partial<Room>> {
    const roomCode = customAlphabet(
      '1234567890abcdefghijklmnopqrstuvwxyz',
      6,
    )();
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          ...getRoomKeys(roomCode),
          gameOptions,
          roomName,
          roomCode,
        },
        // Prevents overriding an existing record
        ConditionExpression: 'pk <> :pk AND sk <> :sk',
        ExpressionAttributeValues: getRoomKeys(roomCode, true),
      })
      .promise();
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          ...getRoomUsersKeys(roomCode, hostId),
          userId: hostId,
          roomCode,
          isHost: true,
        },
      })
      .promise();
    return {
      roomCode,
      gameOptions,
      roomName,
    };
  }

  @Query((_returns) => Room)
  async getRoomMeta(@Arg('roomCode') roomCode: string): Promise<Partial<Room>> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
      })
      .promise();
    return result.Item;
  }

  @Query((_returns) => [Gift])
  async getRoomGifts(
    @Arg('roomCode') roomCode: string,
  ): Promise<Partial<Gift>[]> {
    const result = await this.dynamoDb
      .query({
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'pk = :roomcode and begins_with(sk, :prefix)',
        ExpressionAttributeValues: {
          ':roomcode': `RoomCode-${roomCode}`,
          ':prefix': 'GiftId-',
        },
      })
      .promise();
    const filteredGifts = result.Items.map(filterGift);
    return filteredGifts;
  }

  @Query((_returns) => Gift)
  async getRoomGift(
    @Arg('roomCode') roomCode: string,
    @Arg('giftId') giftId: string,
  ): Promise<Partial<Gift>> {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomGiftsKeys(roomCode, giftId),
      })
      .promise();
    const filteredGift = filterGift(result.Item as Gift);
    return filteredGift;
  }

  @Query((_returns) => [User])
  async getRoomUsers(
    @Arg('roomCode') roomCode: string,
  ): Promise<Partial<User>[]> {
    const result = await this.dynamoDb
      .query({
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'pk = :roomcode and begins_with(sk, :prefix)',
        ExpressionAttributeValues: {
          ':roomcode': `RoomCode-${roomCode}`,
          ':prefix': 'UserId-',
        },
      })
      .promise();
    return result.Items;
  }

  @Mutation((_returns) => Number)
  async setUserTurnIndex(
    @Arg('roomCode') roomCode: string,
    @Arg('userId') userId: string,
    @Arg('turnToken') turnToken: string,
  ): Promise<number> {
    const room = await this.getRoomMeta(roomCode);
    if (!room.unselectedTokens.length) {
      throw new Error('Tokens have all been assigned');
    }
    const turnIndex = room.tokenOrders.indexOf(turnToken);
    if (turnIndex === -1) {
      throw new Error('Invalid turn token');
    }
    const removeTokenIndex = room.unselectedTokens.indexOf(turnToken);
    if (removeTokenIndex === -1) {
      throw new Error('Token has already been assigned');
    }
    room.unselectedTokens.splice(removeTokenIndex, 1);
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomUsersKeys(roomCode, userId),
        UpdateExpression: 'set turnIndex = :turnIndex',
        ConditionExpression:
          'attribute_exists(userId) and attribute_not_exists(turnIndex)',
        ExpressionAttributeValues: {
          ':turnIndex': turnIndex,
        },
      })
      .promise();
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
        UpdateExpression: 'set unselectedTokens = :unselectedTokens',
        ExpressionAttributeValues: {
          ':unselectedTokens': room.unselectedTokens,
        },
      })
      .promise();
    return turnIndex;
  }

  @Mutation((_returns) => Room)
  async startGame(@Arg('roomCode') roomCode: string): Promise<Partial<Room>> {
    const roomUsers = await this.getRoomUsers(roomCode);
    const userCount = roomUsers.length;
    if (!userCount) {
      throw new Error('Need more users to start game!');
    }
    const randomToken = customAlphabet(
      '1234567890abcdefghijklmnopqrstuvwxyz',
      4,
    );
    const tokenOrders = [];
    for (let i = 0; i < userCount; i += 1) {
      tokenOrders.push(randomToken());
    }
    const unselectedTokens = shuffle(tokenOrders);
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: getRoomKeys(roomCode),
        UpdateExpression:
          'set tokenOrders = :tokenOrders, turnIndex = :turnIndex, unselectedTokens = :unselectedTokens',
        ConditionExpression:
          'attribute_not_exists(tokenOrders) and attribute_not_exists(unselectedTokens)',
        ExpressionAttributeValues: {
          ':tokenOrders': tokenOrders,
          ':turnIndex': 0,
          ':unselectedTokens': unselectedTokens,
        },
      })
      .promise();
    return {
      roomCode,
      unselectedTokens,
    };
  }
}
