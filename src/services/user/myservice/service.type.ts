import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Service {
  @Field((type) => ID)
  service_id: string;
}
