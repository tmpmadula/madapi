import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';
import { CreatearticleInput } from '../model/create-article.input';
import { articleStatus } from '../model/article.enum';
import { article, articleKey } from '../model/article.model';
import { UpdatearticleInput } from '../model/update-article.input';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article')
    private readonly model: Model<article, articleKey>,
  ) {}

  create(input: CreatearticleInput) {
    return this.model.create({
      ...input,
      id: uuid.v4(),
      status: articleStatus.Active,
      createAt: new Date().toISOString(),
    });
  }

  update(key: articleKey, input: UpdatearticleInput) {
    return this.model.update(key, input);
  }

  findOne(key: articleKey) {
    return this.model.get(key);
  }

  findByTargetId(targetId: string) {
    return this.model
      .query('targetId')
      .eq(targetId)
      .where('status')
      .eq(articleStatus.Active)
      .exec();
  }

  findByUserId(userId: string) {
    return this.model
      .query('userId')
      .eq(userId)
      .where('status')
      .eq(articleStatus.Active)
      .exec();
  }
}
