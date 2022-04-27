import { ObjectType, Field } from 'type-graphql';
import Follow from './follow.type';
import Following from './following.type';

@ObjectType()
export default class FollowService {
  @Field((type) => [Follow])
  followers: Follow[];
  @Field((type) => [Following])
  following: Following[];
}

export interface Context {
  followService: FollowService;
}
