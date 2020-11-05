import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Room {
  @Field((_type) => ID)
  roomCode: string;

  @Field()
  roomName: string;

  @Field((_type) => [String], { nullable: 'items' })
  gameOptions: string[];

  @Field((_type) => [String], { nullable: true })
  turnTokens: string[];

  @Field({ nullable: true })
  turnIndex: number;
}
