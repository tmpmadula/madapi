import { ObjectType, Field } from 'type-graphql';
import Service from './service.type';

@ObjectType()
export default class UserService {
  @Field((type) => [Service])
  services: Service[];
}

export interface Context {
  userService: UserService;
}
