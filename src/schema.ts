import { buildSchema } from 'type-graphql';
import UserResolver from './services/user/user-resolver';
import ArticleResolver from './services/articles/article-resolver';

import MessageResolver from './services/messages/message-resolver';
import NotificationResolver from './services/notification/notification-resolver';

export default async function setGlobalSchema() {
  // build TypeGraphQL executable schema
  (global as any).schema =
    (global as any).schema ||
    (await buildSchema({
      resolvers: [UserResolver, ArticleResolver, MessageResolver, NotificationResolver],
      validate: false
    }));
}
