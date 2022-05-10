import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteCommentInput {
  @Field(() => String)
  commentId: string;

  @Field(() => String)
  articleId: string;
}
