import {
  //BadRequestException,
  Body,
  Controller,
  Delete,
  //Get,
  Param,
  //Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { CreateCommentInput } from '../model/create-comment.input';
import { CommentService } from './../service/comment.service';
//import { DeleteCommentInput } from './../model/delete-comment.input';
import { CommentKey } from '../model/comment.model';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() body: CreateCommentInput) {
    return this.commentService.createComment(body);
  }

  @Delete()
  deleteComment(@Param('id') id: CommentKey) {
    return this.commentService.deleteComment(id);
  }
}
