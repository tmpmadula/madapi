import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';

import UserResolver from './services/user/user-resolver';

import ArticleResolver from './services/articles/article-resolver';

import {
  DynamoDBConnectionManager,
  DynamoDBEventProcessor,
  DynamoDBEventStore,
  DynamoDBSubscriptionManager,
  PubSub,
  Server
} from 'aws-lambda-graphql';
import { ApiGatewayManagementApi } from 'aws-sdk';

import { awsClient } from './config/database';
import MessageResolver from './services/messages/message-resolver';
import NotificationResolver from './services/notification/notification-resolver';

const eventStore = new DynamoDBEventStore({
  dynamoDbClient: awsClient
});
//const eventProcessor = new DynamoDBEventProcessor();
const subscriptionManager = new DynamoDBSubscriptionManager({
  dynamoDbClient: awsClient
});
const connectionManager = new DynamoDBConnectionManager({
  apiGatewayManager: process.env.IS_OFFLINE
    ? new ApiGatewayManagementApi({
        endpoint: 'http://localhost:3001'
      })
    : undefined,
  dynamoDbClient: awsClient,
  subscriptions: subscriptionManager
});
export const pubSub = new PubSub({ eventStore });
const serverPlaygroundOptions = process.env.IS_OFFLINE
  ? {
      playground: {
        subscriptionEndpoint: 'ws://localhost:3001'
      }
    }
  : {};

const schema = buildSchemaSync({
  resolvers: [UserResolver, ArticleResolver, MessageResolver, NotificationResolver]
});

const server = new Server({
  schema,
  context: ({ event }) => ({
    headers: event.headers,
    event,
    pubSub
  }),
  connectionManager,
  eventProcessor: new DynamoDBEventProcessor(),
  subscriptionManager,
  ...serverPlaygroundOptions
});

export const handleHttp = server.createHttpHandler({
  cors: {
    origin: '*',
    methods: 'OPTIONS,GET,POST',
    allowedHeaders:
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'
  }
});
export const handleWebSocket = server.createWebSocketHandler();
export const handleDynamoDBStream = server.createEventHandler();
