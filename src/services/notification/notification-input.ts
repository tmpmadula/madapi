import { Field, ID, InputType } from 'type-graphql';
import Notification from './notification';
import { NotificationType } from './notificationType.enum';

@InputType()
export default class AddNotificationInput implements Partial<Notification> {
  @Field((type) => ID)
  id: string;

  @Field()
  author: string;

  @Field()
  userid: string;

  @Field((type) => NotificationType)
  notificationType: NotificationType;

  @Field()
  seen: boolean;
}
