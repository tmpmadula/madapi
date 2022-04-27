import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import User from './user';
import { awsClient } from '../../config/database';
import UserInput from './user-input';
import UserService from './myservice/userService';
import ServiceInput from './myservice/service';
import UserAddress from './address/addressService';
import AddressInput from './address/address';
import FollowService from './follow/followService';
import FollowInput from './follow/follow';
import FollowingInput from './follow/following';

import UserUpdateInput from './userUpdate-input';

@Resolver(User)
export default class UserResolver {
  //private readonly items: User[];
  constructor() {}
  private dynamoDb: AWS.DynamoDB.DocumentClient = awsClient;

  @Query((returns) => User)
  async getUser(@Arg('id') id: string) {
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(params).promise();
    return r.Item;
  }

  @Query((returns) => [User])
  async searchUser(@Arg('SearchQuery') SearchQuery: string) {
    const params = {
      TableName: process.env.USER_TABLE,
      FilterExpression: 'contains(firstname, :use) or contains(lastname, :lst)',

      ExpressionAttributeValues: {
        ':use': SearchQuery.toUpperCase(),
        ':lst': SearchQuery.toUpperCase()
      }
    };
    console.log(params);
    const r = await this.dynamoDb.scan(params).promise();
    console.log(r.Items);
    return r.Items;
  }

  @Query((returns) => [User])
  async getUsers() {
    const result = await this.dynamoDb.scan({ TableName: process.env.USER_TABLE }).promise();
    return result.Items;
  }

  @Mutation((returns) => User)
  async addUser(@Arg('data') data: UserInput): Promise<User> {
    const params = {
      TableName: process.env.USER_TABLE,
      Item: {
        id: data.id,
        firstname: data.firstname.toUpperCase(),
        lastname: data.lastname.toUpperCase(),
        email: data.email,
        contactnumber: data.contactnumber,
        addresses: data.addresses,
        chat: data.chat,
        services: data.services,
        followers: data.followers,
        following: data.following,
        avatar: data.avatar,
        username: data.firstname + '-' + data.id,
        planType: data.planType,
        active: data.active,
        addedAt: Date.now(),
        updatedAt: Date.now()
      }
    };

    await this.dynamoDb.put(params).promise();

    return params.Item;
  }

  @Mutation((returns) => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: UserUpdateInput) {
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id },
      UpdateExpression:
        'SET firstname = :fname, lastname = :lname,contactnumber = :cnumber ,avatar = :ava, active = :act,updatedAt = :update',
      ExpressionAttributeValues: {
        ':fname': data.firstname,
        ':lname': data.lastname,
        ':cnumber': data.contactnumber,
        ':ava': data.avatar,
        ':act': data.active,
        ':update': Date.now()
      }
    };

    await this.dynamoDb.update(params).promise();

    const paramsGet = {
      TableName: process.env.USER_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(paramsGet).promise();

    return r.Item;
  }
  @Mutation((returns) => Boolean)
  async removeUser(@Arg('id') id: string) {
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id },
      ReturnValues: 'ALL_OLD'
    };
    const response = await this.dynamoDb.delete(params).promise();
    return !!response.Attributes;
  }

  //Services
  @Mutation((returns) => UserService)
  async updateUserService(@Arg('id') id: string, @Arg('data') data: ServiceInput) {
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id },
      UpdateExpression: 'SET services =list_append(services, :value)',
      ExpressionAttributeValues: {
        ':value': data.services
      }
    };
    await this.dynamoDb.update(params).promise();

    return params;
  }

  //Address
  @Mutation((returns) => UserAddress)
  async updateUserAddress(@Arg('id') id: string, @Arg('data') data: AddressInput) {
    const params = {
      TableName: process.env.USER_TABLE,
      Key: { id },
      UpdateExpression: 'SET addresses = :value',
      ExpressionAttributeValues: {
        ':value': data.addresses
      }
    };
    console.log(params);
    await this.dynamoDb.update(params).promise();

    const paramsGet = {
      TableName: process.env.USER_TABLE,
      Key: { id }
    };
    const r = await this.dynamoDb.get(paramsGet).promise();

    return r.Item;
  }

  //Follow
  @Mutation((returns) => FollowService)
  async Follow(@Arg('user') user: FollowInput, @Arg('followingid') followingid: FollowingInput) {
    const follow = {
      TableName: process.env.USER_TABLE,
      Key: { id: followingid.Followings[0].following_id },
      UpdateExpression: 'SET followers =list_append(followers, :value)',
      ExpressionAttributeValues: {
        ':value': user.followers
      }
    };

    const following = {
      TableName: process.env.USER_TABLE,
      Key: { id: user.followers[0].follow_id },
      UpdateExpression: 'SET following =list_append(following, :value)',
      ExpressionAttributeValues: {
        ':value': followingid.Followings
      }
    };

    await this.dynamoDb.update(follow).promise();
    await this.dynamoDb.update(following).promise();
    return;
  }
  @Mutation((returns) => FollowService)
  async unfollow(@Arg('user') user: FollowInput, @Arg('followingid') followingid: FollowingInput) {
    for (let i = 0; i < followingid.Followings.length; i++) {
      const userUnfollow = {
        TableName: process.env.USER_TABLE,
        Key: {
          id: user.followers[0].follow_id
        },
        UpdateExpression: 'REMOVE following[' + i + ']',
        ReturnValues: 'UPDATED_NEW'
      };

      await this.dynamoDb.update(userUnfollow).promise();
    }
    for (let i = 0; i < user.followers.length; i++) {
      const Unfollowed = {
        TableName: process.env.USER_TABLE,

        Key: {
          id: followingid.Followings[0].following_id
        },

        UpdateExpression: 'REMOVE followers[' + i + ']',
        ReturnValues: 'UPDATED_NEW'
      };

      await this.dynamoDb.update(Unfollowed).promise();
    }

    return;
  }
}
