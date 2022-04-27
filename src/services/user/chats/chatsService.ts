import { ObjectType, Field, ID } from 'type-graphql';
import Chats from './chats.type';

@ObjectType()
export default class ChatsService {
  @Field((type) => ID)
  id: string;

  @Field((type) => [Chats])
  chat: Chats[];
}

export interface Context {
  chatsService: ChatsService;
}
