import { Room } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { customAlphabet } from 'nanoid';
import { getRoomKeys, getRoomUsersKeys } from '@src/utils/facet-keys';

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

  // TODO: Remove host relationship
}
