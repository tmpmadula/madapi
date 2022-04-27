/*import * as AWS from 'aws-sdk';

const dynamodbOfflineOptions = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
};

const isOffline = () => process.env.IS_OFFLINE;

if (isOffline()) {
  AWS.config.update({
    accessKeyId: 'localAccessKey',
    secretAccessKey: 'localSecretAccessKey',
    region: 'localRegion'
  });
}

const dynamoDb = isOffline()
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

export default dynamoDb;*/

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

const serviceConfigOptions: ServiceConfigurationOptions = {};

if (process.env.IS_OFFLINE) {
  serviceConfigOptions.endpoint = 'http://localhost:8000';
}

export const awsClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
