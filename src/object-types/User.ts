import { Field, ID, ObjectType } from 'type-graphql';
import { Address } from './Address';

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  nickname: string;

  @Field((_type) => Address)
  address: Address;
}
