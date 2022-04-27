import { InputType, Field, ID } from 'type-graphql';
import Chats from './chats.type';
@InputType({ description: 'New recipe data' })
export default class AddChatsInput implements Partial<Chats> {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  updatedAt: number;
}
