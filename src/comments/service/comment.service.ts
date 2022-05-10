import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Comment, CommentKey } from '../model/comment.model';
//import { DeleteCommentInput } from './../model/comment/delete-comment.input';
import { CreateCommentInput } from '../model/create-comment.input';
import * as uuid from 'uuid';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment')
    private readonly commentModel: Model<Comment, CommentKey>, // private readonly articleModel: Model<Article, ArticleKey>,
  ) {}

  async createComment(input: CreateCommentInput): Promise<Comment> {
    const newComment = this.commentModel.create({
      ...input,
      id: uuid.v4(),

      createAt: new Date().toISOString(),
    });
    //  await this.articleModel.update(key, input);
    return newComment;
  }

  async deleteComment(key: CommentKey) {
    // await this.articleModel.update(key, input);
    await this.commentModel.delete(key);
    return true;
  }
}
