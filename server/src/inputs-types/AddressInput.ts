import { Address } from '@src/object-types';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddressInput implements Partial<Address> {
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
