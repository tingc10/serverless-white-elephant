import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Address {
  @Field((_type) => String)
  addressLine1: string;

  @Field((_type) => String, { nullable: true })
  addressLine2: string;

  @Field((_type) => String)
  city: string;

  @Field((_type) => String)
  state: string;

  @Field((_type) => Number)
  zipCode: number;
}
