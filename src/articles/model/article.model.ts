import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateArticleInput } from './create-article.input';

export type ArticleKey = {
  id: string;
};

@ObjectType({ implements: CreateArticleInput })
export class Article extends CreateArticleInput {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field()
  createAt: string;
}
