import { ObjectType, ID, Field } from 'type-graphql';

@ObjectType()
export default class Chats {
  @Field((type) => ID)
  id: string;

  @Field()
  updatedAt: number;
}
