import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Message {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  author: string;

  @Field((type) => ID)
  receiver: string;

  @Field()
  message: string;

  @Field()
  isFirstMessage: boolean;

  @Field()
  seen: boolean;

  @Field()
  addedAt: number;
}
