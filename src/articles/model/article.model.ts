import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreatearticleInput } from './create-article.input';
import { articleStatus } from './article.enum';

export type articleKey = {
  id: string;
};

@ObjectType({ implements: CreatearticleInput })
export class article extends CreatearticleInput {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field(/* istanbul ignore next */ () => articleStatus)
  status: articleStatus;

  @Field()
  createAt: string;
}
