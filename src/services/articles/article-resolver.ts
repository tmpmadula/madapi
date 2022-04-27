import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
//import { v1 } from 'uuid';
import { awsClient } from '../../config/database';

import Article from './article';
import { Context } from '../user/user';
import ArticleInput from './article-input';

@Resolver(Article)
export default class ArticleResolver {
  constructor() {}
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((returns) => Article)
  async Article(@Arg('id') id: string) {
    const params = {
      TableName: process.env.Article_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(params).promise();
    return r.Item;
  }

  @Query((returns) => [Article])
  async Articles() {
    const result = await this.dynamoDb.scan({ TableName: process.env.Article_TABLE }).promise();
    return result.Items;
  }

  @Mutation((returns) => Article)
  async addArticle(@Arg('data') data: ArticleInput, @Ctx() { user }: Context): Promise<Article> {
    const params = {
      TableName: process.env.Article_TABLE,
      Item: {
        id: data.id,
        name: data.name,
        userid: data.userid,
        coverMedia: data.coverMedia,
        ArticleTags: data.ArticleTags,
        details: data.details,
        startDate: data.startDate,
        endDate: data.endDate,
        addedAt: Date.now(),
        updatedAt: Date.now()
      }
    };
    await this.dynamoDb.put(params).promise();
    return params.Item;
  }

  @Mutation((returns) => Article)
  async updateArticle(@Arg('id') id: string, @Arg('data') data: ArticleInput) {
    const params = {
      TableName: process.env.Article_TABLE,
      Item: {
        id: id,
        name: data.name,
        updatedAt: Date.now()
      }
    };
    await this.dynamoDb.put(params).promise();

    // Couldn't figure out a way to return the updated values with only the put action
    const paramsGet = {
      TableName: process.env.Article_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(paramsGet).promise();

    return r.Item;
  }

  @Mutation((returns) => Boolean)
  async removeArticle(@Arg('id') id: string) {
    const params = {
      TableName: process.env.Article_TABLE,
      Key: { id },
      ReturnValues: 'ALL_OLD'
    };
    const response = await this.dynamoDb.delete(params).promise();
    return !!response.Attributes;
  }
}
