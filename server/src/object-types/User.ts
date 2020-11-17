import { Field, ID, ObjectType } from 'type-graphql';
import { Address } from './Address';

@ObjectType()
export class User {
  @Field((_type) => ID)
  userId: string;

  @Field()
  nickname: string;

  @Field((_type) => Address)
  address: Address;
}

@ObjectType()
export class RoomUser extends User {
  @Field()
  turnIndex: number;

  @Field((_type) => [String])
  userStolenFrom: string[];

  @Field()
  giftId: string;

  @Field()
  roomCode: string;

  @Field()
  isHost: boolean;
}
