import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Following {
  @Field((type) => ID, { nullable: true })
  following_id: string;
}
