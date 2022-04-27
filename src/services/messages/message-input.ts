import { Field, ID, InputType } from 'type-graphql';
import Message from './message';

@InputType({ description: 'New recipe data' })
export default class AddMessageInput implements Partial<Message> {
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
