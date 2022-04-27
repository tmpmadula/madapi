import { InputType, Field } from 'type-graphql';

import Chats from './chatsInput';

@InputType()
export default class ChatsInput {
  @Field((type) => [Chats], { nullable: true })
  chat: Chats[];
}
