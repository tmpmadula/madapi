import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './users.schema';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User, { description: 'create a new user' })
  async createUser(createUserInputType: CreateUserInput) {
    return this.userService.create(createUserInputType);
  }

  @Mutation(() => User, { description: 'update an existing user' })
  async updateUser(
    @Args('input')
    updateUserInputType: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInputType);
  }
}
