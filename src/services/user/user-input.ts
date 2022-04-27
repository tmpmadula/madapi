import { InputType, Field, ID } from 'type-graphql';
import { IsInt, IsEmail } from 'class-validator';
import Address from './address/addressInput';
import Chats from './chats/chatsInput';
import Service from './myservice/serviceInput';
import Follow from './follow/followInput';
import Following from './follow/followingInput';
import { PlanType } from './planType.enum';

@InputType()
export default class UserInput {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsInt()
  contactnumber: number;

  @Field((type) => [Service], { nullable: true })
  services: Service[];

  @Field((type) => [Address], { nullable: true })
  addresses: Address[];

  @Field((type) => [Chats], { nullable: true })
  chat: Chats[];

  @Field((type) => [Follow], { nullable: true })
  followers: Follow[];

  @Field((type) => [Following], { nullable: true })
  following: Following[];

  @Field({ nullable: true })
  active: boolean;

  @Field((type) => PlanType, { nullable: true })
  planType: PlanType;
}
