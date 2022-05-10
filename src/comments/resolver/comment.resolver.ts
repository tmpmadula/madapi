import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateCommentInput } from '../model/create-comment.input';
import { CommentService } from '../service/comment.service';
import { Comment, CommentKey } from '../model/comment.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment, { description: 'add a comment to existing comment' })
  async createComment(@Args('input') createCommentInput: CreateCommentInput) {
    return this.commentService.createComment(createCommentInput);
  }

  @Mutation(() => Comment, { description: 'delete a comment ' })
  async deleteComment(
    //   @Args('input') deleteCommentInput: DeleteCommentInput,
    id: CommentKey,
  ): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }
}
