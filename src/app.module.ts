import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { NotificationModule } from './notification/notification.module';
import { ArticleModule } from './articles/article.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: {
        endpoint:
          process.env.IS_NOT_SLS === 'true'
            ? '/graphql'
            : `/${process.env.STAGE}/graphql`,
      },
    }),
    DynamooseModule.forRoot({
      local: process.env.IS_DDB_LOCAL === 'true',
      aws: { region: process.env.REGION },
      model: {
        create: false,
        prefix: `${process.env.STAGE}-`,
        suffix: '-blog',
      },
    }),
    NotificationModule,
    ArticleModule,
  ],
})
export class AppModule {}
