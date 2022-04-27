import { Field, ID, InputType } from 'type-graphql';
import Article from './article';
//import User from '../../models/user/user';

@InputType()
export default class ArticleInput implements Partial<Article> {
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
}
