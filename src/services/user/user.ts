import { ObjectType, Field, ID } from 'type-graphql';
import Address from './address/address.type';
import Chats from './chats/chats.type';
import Service from './myservice/service.type';
import Follow from './follow/follow.type';
import Following from './follow/following.type';
import { PlanType } from './planType.enum';

@ObjectType()
export default class User {
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  avatar: string;
  @Field()
  username: string;

  @Field()
  active: boolean;

  @Field()
  email: string;

  @Field()
  contactnumber: number;

  @Field((type) => [Service])
  services: Service[];

  @Field((type) => [Address], { nullable: true })
  addresses: Address[];

  @Field((type) => [Chats], { nullable: true })
  chat: Chats[];

  @Field((type) => [Follow], { nullable: true })
  followers: Follow[];

  @Field((type) => [Following], { nullable: true })
  following: Following[];

  @Field((type) => PlanType, { nullable: true })
  planType: PlanType;

  @Field()
  addedAt: number;

  @Field()
  updatedAt: number;
}

export interface Context {
  user: User;
}
