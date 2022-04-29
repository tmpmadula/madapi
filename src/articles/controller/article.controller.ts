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
import { CreatearticleInput } from '../model/create-article.input';
import { UpdatearticleInput } from '../model/update-article.input';
import { ArticleService } from '../service/article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() body: CreatearticleInput) {
    return this.articleService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatearticleInput) {
    return this.articleService.update({ id }, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne({ id });
  }

  @Get()
  find(@Query() { userId, targetId }: { userId?: string; targetId?: string }) {
    if (userId && !targetId) {
      return this.articleService.findByUserId(userId);
    }
    if (targetId && !userId) {
      return this.articleService.findByTargetId(targetId);
    }
    throw new BadRequestException();
  }
}
