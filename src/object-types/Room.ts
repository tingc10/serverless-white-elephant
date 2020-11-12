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
  unselectedTokens: string[];

  @Field({ nullable: true })
  turnIndex: number;

  // Should not be queryable
  tokenOrders: string[];
}
