import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';
import { CreateArticleInput } from '../model/create-article.input';
import { ArticleStatus } from '../model/article.enum';
import { Article, ArticleKey } from '../model/article.model';
import { UpdateArticleInput } from '../model/update-article.input';
@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article')
    private readonly model: Model<Article, ArticleKey>,
  ) {}

  create(input: CreateArticleInput) {
    const newArticle = this.model.create({
      ...input,
      id: uuid.v4(),
      status: ArticleStatus.Active,
      createAt: new Date().toISOString(),
    });

    return newArticle;
  }

  update(key: ArticleKey, input: UpdateArticleInput) {
    return this.model.update(key, input);
  }

  findOne(key: ArticleKey) {
    return this.model.get(key);
  }

  findByTargetId(targetId: string) {
    return this.model
      .query('targetId')
      .eq(targetId)
      .where('status')
      .eq(ArticleStatus.Active)
      .exec();
  }

  findByUserId(userId: string) {
    return this.model
      .query('userId')
      .eq(userId)
      .where('status')
      .eq(ArticleStatus.Active)
      .exec();
  }
}
