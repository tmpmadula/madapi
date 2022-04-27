import { InputType, Field } from 'type-graphql';

import Follow from './followInput';

@InputType()
export default class FollowInput {
  @Field((type) => [Follow], { nullable: true })
  followers: Follow[];
}
