import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Gift {
  @Field((_type) => ID)
  giftId: string;

  @Field({ nullable: true })
  productUrl: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  lastRoundStolen: number;

  @Field()
  ownerId: string;

  @Field()
  roomCode: string;

  @Field({ nullable: true })
  recipientId: string;

  @Field()
  isRevealed: boolean;
}
