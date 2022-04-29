import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
@InterfaceType('Basearticle')
export class CreatearticleInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  targetId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;
}
