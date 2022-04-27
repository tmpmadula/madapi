import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Follow {
  @Field((type) => ID, { nullable: true })
  follow_id: string;
}
