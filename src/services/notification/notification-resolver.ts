import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import Notification from './notification';
import { awsClient } from '../../config/database';
import SeenNotificationInput from './seenNotis';

@Resolver(Notification)
export default class NotificationResolver {
  constructor() {}
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((returns) => [Notification])
  async getAllNotifications() {
    const result = await this.dynamoDb
      .scan({ TableName: process.env.NOTIFICATION_TABLE })
      .promise();
    return result.Items;
  }

  @Query((returns) => [Notification])
  async getNotificationByUser(
    @Arg('userid') userid: string,
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    const params = {
      TableName: process.env.NOTIFICATION_TABLE,
      FilterExpression: 'userid = :use',
      ExpressionAttributeValues: {
        ':use': userid
      }
    };
    const r = await this.dynamoDb.scan(params).promise();

    return r.Items.slice(offset, offset + limit);
  }

  @Mutation((returns) => Notification)
  async notificationSeen(@Arg('id') id: string, @Arg('data') data: SeenNotificationInput) {
    const params = {
      TableName: process.env.NOTIFICATION_TABLE,
      Key: { id },
      UpdateExpression: 'SET seen = :sen',
      ExpressionAttributeValues: {
        ':sen': data.seen
      }
    };

    await this.dynamoDb.update(params).promise();

    const paramsGet = {
      TableName: process.env.NOTIFICATION_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(paramsGet).promise();

    return r.Item;
  }
}
