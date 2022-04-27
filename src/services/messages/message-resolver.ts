import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { awsClient } from '../../config/database';
import NotificationInput from '../notification/notification-input';

import Message from './message';
import MessageInput from './message-input';

@Resolver(Message)
export default class MessageResolver {
  constructor() {}
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((returns) => [Message])
  async getMessages() {
    const result = await this.dynamoDb.scan({ TableName: process.env.MESSAGE_TABLE }).promise();
    return result.Items;
  }

  @Query((returns) => Message)
  async getMessageById(@Arg('id') id: string) {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(params).promise();

    return r.Item;
  }

  @Query((returns) => [Message])
  async searchMessage(@Arg('SearchQuery') SearchQuery: string) {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      FilterExpression: 'contains(name, :use)',
      ExpressionAttributeValues: {
        ':use': SearchQuery
      }
    };

    const r = await this.dynamoDb.scan(params).promise();
    console.log(r.Items);
    return r.Items;
  }

  @Query((returns) => [Message])
  async getMessageByChat(@Arg('userid') userid: string, @Arg('uid') uid: string) {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      FilterExpression:
        '(contains(author, :t1) AND contains(receiver, :t2) ) OR (contains(author, :t3) AND contains(receiver, :t4))',
      ExpressionAttributeValues: {
        ':t1': userid,
        ':t2': uid,
        ':t4': userid,
        ':t3': uid
      }
    };

    const r = await this.dynamoDb.scan(params).promise();

    return r.Items;
  }

  @Query((returns) => [Message])
  async getMessageByUser(@Arg('userid') userid: string) {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      FilterExpression: 'contains(author, :t1)   OR  contains(receiver, :t4)',
      ExpressionAttributeValues: {
        ':t1': userid,

        ':t4': userid
      }
    };

    const r = await this.dynamoDb.scan(params).promise();

    return r.Items;
  }
  @Query((returns) => [Message])
  async Messages() {
    const result = await this.dynamoDb.scan({ TableName: process.env.MESSAGE_TABLE }).promise();
    return result.Items;
  }

  @Mutation((returns) => Message)
  async addMessage(
    @Arg('data') data: MessageInput,
    @Arg('alertData') alertData: NotificationInput
  ): Promise<Message> {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      Item: {
        id: data.id,
        author: data.author,
        receiver: data.receiver,
        message: data.message,
        isFirstMessage: data.isFirstMessage,
        seen: data.seen,
        addedAt: data.addedAt
      }
    };

    await this.dynamoDb.put(params).promise();

    return params.Item;
  }

  @Mutation((returns) => Boolean)
  async removeMessage(@Arg('id') id: string) {
    const params = {
      TableName: process.env.MESSAGE_TABLE,
      Key: { id },
      ReturnValues: 'ALL_OLD'
    };
    const response = await this.dynamoDb.delete(params).promise();
    return !!response.Attributes;
  }
}
