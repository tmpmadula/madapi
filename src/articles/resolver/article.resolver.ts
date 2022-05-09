import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleInput } from '../model/create-article.input';
import { Article } from '../model/article.model';
import { UpdateArticleInput } from '../model/update-article.input';
import { ArticleService } from '../service/article.service';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(/* istanbul ignore next */ () => Article)
  createarticle(@Args('input') input: CreateArticleInput) {
    return this.articleService.create(input);
  }

  @Mutation(/* istanbul ignore next */ () => Article)
  updatearticle(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
    @Args('input') input: UpdateArticleInput,
  ) {
    return this.articleService.update({ id }, input);
  }

  @Query(/* istanbul ignore next */ () => Article)
  getArticle(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.articleService.findOne({ id });
  }

  @Query(/* istanbul ignore next */ () => [Article])
  articleByUserId(@Args('userId') userId: string) {
    return this.articleService.findByUserId(userId);
  }
}
