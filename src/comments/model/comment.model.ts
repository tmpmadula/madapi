import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CreateCommentInput } from './create-comment.input';

export type CommentKey = {
  id: string;
};

@ObjectType({ implements: CreateCommentInput })
export class Comment extends CreateCommentInput {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field()
  articleId: string;

  @Field()
  createAt: string;
}
