import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ArticleController } from './controller/article.controller';
import { ArticleResolver } from './resolver/article.resolver';
import { ArticleSchema } from './schema/article.schema';
import { ArticleService } from './service/article.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'article',
        schema: ArticleSchema,
      },
    ]),
  ],
  providers: [ArticleService, ArticleResolver],
  controllers: [ArticleController],
})
export class ArticleModule {}
