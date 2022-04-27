import { awsClient } from '../database';
const dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

describe('DynamoDB Client', () => {
  it('is configured correctly in production', () => {
    expect(dynamoDb.toString().includes('localhost')).toBeFalsy();
  });
});
