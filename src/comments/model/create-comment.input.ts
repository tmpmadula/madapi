import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
@InterfaceType('BaseComment')
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  body: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  articleId: string;
}
