import { Room } from '@src/object-types';
import { awsClient } from '@src/utils/aws-client';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { customAlphabet } from 'nanoid';

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
          pk: `RoomCode-${roomCode}`,
          sk: `RoomMeta-${roomCode}`,
          gameOptions,
          roomName,
          roomCode,
        },
        // Prevents overriding an existing record
        ConditionExpression: 'pk <> :pk AND sk <> :sk',
        ExpressionAttributeValues: {
          ':pk': `RoomCode-${roomCode}`,
          ':sk': `RoomMeta-${roomCode}`,
        },
      })
      .promise();
    await this.dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          pk: `UserId-${hostId}`,
          sk: `RoomMeta-${roomCode}`,
          roomCode,
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
