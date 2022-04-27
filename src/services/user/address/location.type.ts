import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class Location {
  @Field()
  longX: string;

  @Field()
  latY: string;
}
