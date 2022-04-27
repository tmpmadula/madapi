import { InputType, Field, ID } from 'type-graphql';
import Follow from './follow.type';
@InputType({ description: 'New recipe data' })
export default class AddFollowInput implements Partial<Follow> {
  @Field((type) => ID, { nullable: true })
  follow_id: string;
}
