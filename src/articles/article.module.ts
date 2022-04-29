import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { articleController } from './controller/article.controller';
import { articleResolver } from './resolver/article.resolver';
import { ArticleSchema } from './schema/article.schema';
import { articleService } from './service/article.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'article',
        schema: ArticleSchema,
      },
    ]),
  ],
  providers: [articleService, articleResolver],
  controllers: [articleController],
})
export class ArticleModule {}
