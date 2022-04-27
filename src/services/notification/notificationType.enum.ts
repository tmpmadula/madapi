import { registerEnumType } from 'type-graphql';

export enum NotificationType {
  Follow,
  Comment,
  Message
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'All possible notification Types'
});
