import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CommentController } from './controller/comment.controller';

import { CommentResolver } from './resolver/comment.resolver';

import { CommentSchema } from './schema/comment.schema';

import { CommentService } from './service/comment.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'comment',
        schema: CommentSchema,
      },
    ]),
  ],
  providers: [CommentService, CommentResolver],
  controllers: [CommentController],
})
export class CommentsModule {}
