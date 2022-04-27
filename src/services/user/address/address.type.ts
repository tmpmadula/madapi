import { ObjectType, ID, Field } from 'type-graphql';
import location from './location.type';

@ObjectType()
export default class Address {
  @Field((type) => ID)
  id: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  location: location;
}
