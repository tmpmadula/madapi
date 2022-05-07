import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;

  @Field()
  tags: string;

  @Field()
  id: string;
}
