import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Article {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => ID)
  userid: string;

  @Field({ nullable: true })
  coverMedia: string;

  @Field()
  ArticleTags: string;

  @Field()
  details: string;

  @Field()
  startDate: number;

  @Field()
  endDate: number;

  @Field()
  addedAt: number;

  @Field()
  updatedAt: number;
}
