import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
@InterfaceType('BaseArticle')
export class CreateArticleInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  articleId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;
}
