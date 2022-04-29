import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatearticleInput } from '../model/create-article.input';
import { article } from '../model/article.model';
import { UpdatearticleInput } from '../model/update-article.input';
import { ArticleService } from '../service/article.service';

@Resolver(() => article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(/* istanbul ignore next */ () => article)
  createarticle(@Args('input') input: CreatearticleInput) {
    return this.articleService.create(input);
  }

  @Mutation(/* istanbul ignore next */ () => article)
  updatearticle(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
    @Args('input') input: UpdatearticleInput,
  ) {
    return this.articleService.update({ id }, input);
  }

  @Query(/* istanbul ignore next */ () => article)
  article(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.articleService.findOne({ id });
  }

  @Query(/* istanbul ignore next */ () => [article])
  articleByUserId(@Args('userId') userId: string) {
    return this.articleService.findByUserId(userId);
  }

  @Query(/* istanbul ignore next */ () => [article])
  articleByTargetId(@Args('targetId') targetId: string) {
    return this.articleService.findByTargetId(targetId);
  }
}
