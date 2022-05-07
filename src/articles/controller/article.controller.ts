import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateArticleInput } from '../model/create-article.input';
import { UpdateArticleInput } from '../model/update-article.input';
import { ArticleService } from '../service/article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() body: CreateArticleInput) {
    return this.articleService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateArticleInput) {
    return this.articleService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne({ id });
  }

  @Get()
  find(
    @Query() { authorId, targetId }: { authorId?: string; targetId?: string },
  ) {
    if (authorId && !targetId) {
      return this.articleService.findByAuthorId(authorId);
    }
    if (targetId && !authorId) {
      return this.articleService.findByTargetId(targetId);
    }
    throw new BadRequestException();
  }
}
