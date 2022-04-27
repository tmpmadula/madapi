import { InputType, Field, ID } from 'type-graphql';
import Address from './address.type';
import location from './location';
@InputType({ description: 'Address Input data' })
export default class AddAddressInput implements Partial<Address> {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  location: location;
}
