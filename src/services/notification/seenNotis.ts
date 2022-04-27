import { Field, InputType } from 'type-graphql';
import Notification from './notification';

@InputType()
export default class SeenNotificationInput implements Partial<Notification> {
  @Field()
  seen: boolean;
}
