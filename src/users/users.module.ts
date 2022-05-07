import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { User, UserSchema } from './users.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    DynamooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    CommonModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, DynamooseModule],
})
export class UsersModule {}
