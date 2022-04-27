import { InputType, Field } from 'type-graphql';

import Following from './followingInput';

@InputType()
export default class FollowingInput {
  @Field((type) => [Following], { nullable: true })
  Followings: Following[];
}
