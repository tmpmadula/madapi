import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { UserSchema } from '../users.schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateUserInput extends OmitType(
  UserSchema.attributes,
  ['isActive', 'id', 'createdAt', 'updatedAt', 'image'],
  InputType,
) {
  @Field(() => GraphQLUpload)
  readonly image?: FileUpload;
}
