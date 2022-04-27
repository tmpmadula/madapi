import { Field, ObjectType, ID } from 'type-graphql';
import { NotificationType } from './notificationType.enum';

@ObjectType()
export default class Notification {
  @Field((type) => ID)
  id: string;

  @Field()
  userid: string;

  @Field()
  author: string;

  @Field((type) => NotificationType)
  notificationType: NotificationType;

  @Field()
  seen: boolean;

  @Field()
  addedAt: Date;

  @Field()
  updatedAt: number;
}
