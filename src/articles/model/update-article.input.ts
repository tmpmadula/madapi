import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { articleStatus } from './article.enum';

@InputType()
export class UpdatearticleInput {
  @IsIn([articleStatus.Deleted])
  @IsEnum(articleStatus)
  @Field(/* istanbul ignore next */ () => articleStatus)
  status: articleStatus;
}
