import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ArticleSchema } from '../schema/article.schema';

export const ArticleTestImports = [
  ConfigModule.forRoot(),
  GraphQLModule.forRoot({
    autoSchemaFile: true,
  }),
  DynamooseModule.forRoot({
    local: 'http://localhost:8001',
    aws: { region: 'local' },
    model: {
      create: false,
      prefix: `${process.env.STAGE}-`,
      suffix: '-blog',
    },
  }),
  DynamooseModule.forFeature([
    {
      name: 'article',
      schema: ArticleSchema,
    },
  ]),
];
