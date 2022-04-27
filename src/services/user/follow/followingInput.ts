import { InputType, Field, ID } from 'type-graphql';
import Following from './following.type';
@InputType({ description: 'New recipe data' })
export default class AddFollowingInput implements Partial<Following> {
  @Field((type) => ID, { nullable: true })
  following_id: string;
}
